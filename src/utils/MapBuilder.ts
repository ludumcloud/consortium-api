import * as crypto from 'crypto';
import * as Honeycomb from 'honeycomb-grid';
import * as util from 'util';
import HexagonalGrid from '../models/HexagonalGrid';
import Tile from '../models/Tile';
import { calculateBiome } from './mapHelpers';
import NoiseGenerator, { NoiseGeneratorOptions } from './NoiseGenerator';

const Hex = Honeycomb.extendHex({
  orientation: 'flat',
});
const Grid = Honeycomb.defineGrid(Hex);

const randomBytes = util.promisify(crypto.randomBytes);
const DEFAULT_WIDTH: number = 7;
const DEFAULT_HEIGHT: number = 7;
const DEFAULT_EXPONENT: number = 3;

export default class MapBuilder {
  private width: number;
  private height: number;
  private exponent: number;
  private seed: string;

  setExponent (exponent: number): MapBuilder {
    this.exponent = exponent;
    return this;
  }

  setWidth (width: number): MapBuilder {
    this.width = width;
    return this;
  }

  setHeight (height: number): MapBuilder {
    this.height = height;
    return this;
  }

  setSeed (seed: string): MapBuilder {
    this.seed = seed;
    return this;
  }

  async build (): Promise<HexagonalGrid> {
    const seed: string = this.seed ? this.seed : await randomBytes(128).then((buffer: Buffer) => buffer.toString('hex'));
    const width: number = this.width || DEFAULT_WIDTH;
    const height: number = this.height || DEFAULT_HEIGHT;
    const exponent: number = this.exponent || DEFAULT_EXPONENT;

    // split the seed in half, one part for elevation the other moisture
    const length: number = seed.length / 2;
    const elevationGenerator: NoiseGenerator = new NoiseGenerator(seed.slice(0, length));
    const moistureGenerator: NoiseGenerator = new NoiseGenerator(seed.slice(length));

    const grid: Honeycomb.Grid = Grid.rectangle({ height, width });
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const hex: Honeycomb.Hex<any> = grid.get([x, y]);
        const generatorOptions: NoiseGeneratorOptions = {
          x,
          y,
          width,
          height,
          exponent
        };
        const elevation = elevationGenerator.calculate(generatorOptions);
        const moisture = moistureGenerator.calculate(generatorOptions);
        hex.biome = calculateBiome(elevation, moisture);
      }
    }

    const hexagonalGrid: HexagonalGrid = this.convertToORM(grid, seed, width, height);
    await hexagonalGrid.save();

    return hexagonalGrid;
  }

  private convertToORM (grid: Honeycomb.Grid, seed, width, height): HexagonalGrid {
    const tiles: Tile[] = grid.map((hex: Honeycomb.Hex<any>): Tile => {
      const {q, r, s} = Hex().cartesianToCube(hex.x, hex.y);
      const tile = new Tile();
      tile.type = hex.biome;
      tile.x = q;
      tile.y = s;
      tile.z = r;

      return tile;
    });

    const hexagonalGrid: HexagonalGrid = new HexagonalGrid();
    hexagonalGrid.seed = seed;
    hexagonalGrid.width = width;
    hexagonalGrid.height = height;
    hexagonalGrid.tiles = Promise.resolve(tiles);

    return hexagonalGrid;
  }
}
