import * as crypto from 'crypto';
import * as Honeycomb from 'honeycomb-grid';
import * as util from 'util';
import Tile from '../models/Tile';
import { Biomes } from '../types/map';
import HexagonalGrid from '../models/HexagonalGrid';

const Hex = Honeycomb.extendHex({
  orientation: 'flat',
  toJSON () {
    return Hex().cartesianToCube(this.x, this.y);
  }
});
const Grid = Honeycomb.defineGrid(Hex);

const randomBytes = util.promisify(crypto.randomBytes);
const DEFAULT_WIDTH = 7;
const DEFAULT_HEIGHT = 7;

export default class MapBuilder {
  private width: number;
  private height: number;
  private seed: string;
  private biomes: Biomes[];

  constructor () {
    this.biomes = [];
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

  addBiomes (biomes: Biomes | Biomes[]): MapBuilder {
    if (Array.isArray(biomes)) {
      this.biomes = biomes.concat(biomes);
    } else {
      this.biomes.push(biomes);
    }

    return this;
  }

  async build (): Promise<HexagonalGrid> {
    const seed: string = this.seed ? this.seed : await randomBytes(256).then((buffer: Buffer) => buffer.toString('hex'));
    const width: number = this.width || DEFAULT_WIDTH;
    const height: number = this.height || DEFAULT_HEIGHT;

    const grid: Honeycomb.Grid = Grid.rectangle({ height, width });
    const tiles: Tile[] = grid.map((hex: Honeycomb.Hex<any>): Tile => {
      const { q, r, s } = Hex().cartesianToCube(hex.x, hex.y);
      const tile = new Tile();
      tile.type = Biomes.Plains;
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

    await hexagonalGrid.save();

    return hexagonalGrid;
  }
}
