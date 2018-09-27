import { loaders as Loaders, Texture } from 'pixi.js';
import { Piece } from './Piece';

export class Pawn extends Piece {
	public getTexture(atlas: Loaders.TextureDictionary): Texture {
		return atlas[`${this.color}-pawn.png`];
	}
}
