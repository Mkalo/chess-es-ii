import { Container, Graphics, loaders as Loaders, Sprite, Texture } from 'pixi.js';

import { Bishop } from './pieces/Bishop';
import { King } from './pieces/King';
import { Knight } from './pieces/Knight';
import { Pawn } from './pieces/Pawn';
import { Piece } from './pieces/Piece';
import { Queen } from './pieces/Queen';
import { Rook } from './pieces/Rook';

export type BoardSlot_t = Piece | null;

export class Board {
	private textureDictionary: Loaders.TextureDictionary = {} as Loaders.TextureDictionary;
	private board: BoardSlot_t[][] = new Array<BoardSlot_t[]>(8);
	private readonly PIECE_WIDTH: number = 67;
	private	readonly PIECE_HEIGHT: number = 67;
	private readonly WHITE_TILE: number = 0xE7E7E7;
	private readonly BLACK_TILE: number = 0x7D7D7D;

	public constructor() {
		for (let i: number = 0; i < 8; i++) {
			this.board[i] = new Array<BoardSlot_t>(8);
			for (let j: number = 0; j < 8; j++) {
				this.board[i][j] = null;
			}
		}

		/* Instantiate black pieces. */

		this.board[0][0] = new Rook('black');
		this.board[0][1] = new Knight('black');
		this.board[0][2] = new Bishop('black');
		this.board[0][3] = new Queen('black');
		this.board[0][4] = new King('black');
		this.board[0][5] = new Bishop('black');
		this.board[0][6] = new Knight('black');
		this.board[0][7] = new Rook('black');

		for (let i: number = 0; i < 8; i++) {
			this.board[1][i] = new Pawn('black');
		}

		/* Instantiate white pieces */

		this.board[7][0] = new Rook('white');
		this.board[7][1] = new Knight('white');
		this.board[7][2] = new Bishop('white');
		this.board[7][3] = new Queen('white');
		this.board[7][4] = new King('white');
		this.board[7][5] = new Bishop('white');
		this.board[7][6] = new Knight('white');
		this.board[7][7] = new Rook('white');

		for (let i: number = 0; i < 8; i++) {
			this.board[6][i] = new Pawn('white');
		}
	}

	public setTextureDictionary(textureDictionary: Loaders.TextureDictionary): void {
		this.textureDictionary = textureDictionary;
	}

	public draw(stage: Container): void {
		for (let i: number = 0; i < 8; i++) {
			for (let j: number = 0; j < 8; j++) {
				const square: Graphics = new Graphics();
				square.beginFill(i & 1 ? (j & 1 ? this.WHITE_TILE : this.BLACK_TILE) : (j & 1 ? this.BLACK_TILE : this.WHITE_TILE));
				square.drawRect(this.PIECE_WIDTH * j, this.PIECE_HEIGHT * i, this.PIECE_WIDTH, this.PIECE_HEIGHT);
				stage.addChild(square);
			}
		}

		for (let i: number = 0; i < 8; i++) {
			for (let j: number = 0; j < 8; j++) {
				if (this.board[i][j] !== null) {
					const piece: Piece = this.board[i][j] as Piece;
					const texture: Texture = piece.getTexture(this.textureDictionary);
					const sprite: Sprite = new Sprite(texture);
					sprite.setTransform(this.PIECE_WIDTH * j, this.PIECE_HEIGHT * i, this.PIECE_WIDTH / texture.width, this.PIECE_HEIGHT / texture.height);
					stage.addChild(sprite);
				}
			}
		}
	}
}
