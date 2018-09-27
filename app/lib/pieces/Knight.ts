import { loaders as Loaders, Texture } from 'pixi.js';
import { Piece } from './Piece';

export class Knight extends Piece {
	public getTexture(atlas: Loaders.TextureDictionary): Texture {
		return atlas[`${this.color}-knight.png`];
	}
}
