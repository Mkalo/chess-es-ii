import { loaders as Loaders, Texture } from 'pixi.js';
import { Piece } from './Piece';

export class King extends Piece {
	public getTexture(atlas: Loaders.TextureDictionary): Texture {
		return atlas[`${this.color}-king.png`];
	}
}
