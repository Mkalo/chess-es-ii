import { loaders as Loaders, Texture } from 'pixi.js';
import { Piece } from './Piece';

export class Bishop extends Piece {
	public getTexture(atlas: Loaders.TextureDictionary): Texture {
		return atlas[`${this.color}-bishop.png`];
	}
}
