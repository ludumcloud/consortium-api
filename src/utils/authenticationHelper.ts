import * as crypto from 'crypto';
import * as util from 'util';

const scrypt = util.promisify(crypto.scrypt);
const randomBytes = util.promisify(crypto.randomBytes);

// This should not be stored in code, but for development it is fine
export const signature: string = 'qdKAGo8ptMDyhXrqguU1MtzF1TxlM/KftLfi5ww1TIkgZJ1Gum4e6I6c9Z…YLigwgY27v/bhUdxQNuV2WTXTC6jnmuYFn4xRmtm6sbPiCDL3EooBiQ==';

export async function createSalt (): Promise<string> {
  const randomBuffer: Buffer = await randomBytes(256);
  return randomBuffer.toString('base64');
}

export async function hashPassword (password: string, salt: string): Promise<string> {
  const hashedPassword: Buffer = await scrypt(password, salt, 128) as Buffer;
  return hashedPassword.toString('base64');
}

export async function passwordEqual (suppliedPassword: string, prehashedPassword: string, salt: string): Promise<boolean> {
  const hashedPassword: string = await hashPassword(suppliedPassword, salt);
  return crypto.timingSafeEqual(
    Buffer.from(hashedPassword, 'base64'),
    Buffer.from(prehashedPassword, 'base64')
  );
}
