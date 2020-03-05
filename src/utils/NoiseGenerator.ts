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

    const nx: number = x / width - 0.5;
    const ny: number = y / height - 0.5;
    const e: number =
      1 * this.noise(1 * nx, 1 * ny) +
      0.50 * this.noise(2 * nx, 2 * ny) +
      0.25 * this.noise(4 * nx, 4 * ny) +
      0.05 * this.noise(8 * nx, 8 * ny);
    // since were adding multiple octaves together its possible will produce value greater than one.
    // To reduce those values back into the expected spectrum we need divide them by a known constant
    const value: number = Math.pow((e / 1.30), exponent);
    // even with our best efforts, we can still be out of bounds, make sure that doesnt happen.
    return value > 0 ? Math.min(1, value) : Math.max(0, value);
  }

  private noise (nx: number, ny: number): number {
    return this.simplex.noise2D(nx, ny) / 2 + 0.5;
  }
}
