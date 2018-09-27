import { loaders as Loaders, Texture } from 'pixi.js';

export type PieceColor_t = 'black' | 'white';

export abstract class Piece {
	protected color: PieceColor_t;

	public constructor(color: PieceColor_t) {
		this.color = color;
	}

	public abstract getTexture(atlas: Loaders.TextureDictionary): Texture;
}
