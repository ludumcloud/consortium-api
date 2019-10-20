import * as SimplexNoise from 'simplex-noise';

export interface NoiseGeneratorOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  exponent: number;
}

export default class NoiseGenerator {
  private readonly simplex: SimplexNoise;

  constructor (seed: string) {
    this.simplex = new SimplexNoise(seed);
  }

  public calculate (options: NoiseGeneratorOptions): number {
    const { x, y, width, height, exponent } = options;

    const nx = x / width - 0.5;
    const ny = y / height - 0.5;
    const e: number =
      this.noise(nx, ny) +
      0.5 * this.noise(2 * nx, 2 * ny) +
      0.25 * this.noise(4 * nx, 4 * ny) +
      0.12 * this.noise(8 * nx, 8 * ny);
    return Math.pow(e, exponent);
  }

  private noise (nx: number, ny: number): number {
    return this.simplex.noise2D(nx, ny) / 2 + 0.5;
  }
}
