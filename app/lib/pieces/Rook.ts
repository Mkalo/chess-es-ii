import { loaders as Loaders, Texture } from 'pixi.js';
import { Piece } from './Piece';

export class Rook extends Piece {
	public getTexture(atlas: Loaders.TextureDictionary): Texture {
		return atlas[`${this.color}-rook.png`];
	}
}
