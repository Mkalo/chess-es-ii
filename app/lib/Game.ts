import { Application, Container, Graphics, loader as ResourceLoader, loaders as Loaders, Sprite, Texture } from 'pixi.js';

export class Game {
	private app: Application;
	private stage: Container;
	private started: boolean = false;
	private loaded: boolean = false;
	private textures: Loaders.TextureDictionary | undefined = undefined;

	public constructor(app: Application) {
		this.app = app;
		this.stage = new Container();
	}

	public start(): void {
		if (!this.started) {
			this.started = true;
			ResourceLoader.add('assets/sprites.json').load(() => {
				this.loaded = true;
				if (ResourceLoader.resources['assets/sprites.json'].textures === undefined) {
					throw new Error('Failed to load assets/sprites.json textures');
				}
				this.textures = ResourceLoader.resources['assets/sprites.json'].textures;
				this.drawBoard();
				this.animate();
			});
		}
	}

	public drawBoard(): void {
		if (!this.loaded) throw Error('Assets not loaded, cannot draw board.');

		const pieces: string[][] = [
			['rook', 'knight', 'bishop', 'king', 'queen', 'bishop', 'knight', 'rook'],
			['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn']
		];

		const colors: string[] = ['black', 'white'];

		const pieceWidth: number = 67;
		const pieceHeight: number = 67;

		for (let i: number = 0; i < 8; i++) {
			for (let j: number = 0; j < 8; j++) {
				const square: Graphics = new Graphics();
				square.beginFill(i & 1 ? (j & 1 ? 0xE7E7E7 : 0x7D7D7D) : (j & 1 ? 0x7D7D7D : 0xE7E7E7));
				square.drawRect(pieceWidth * j, pieceHeight * i, pieceWidth, pieceHeight);
				this.stage.addChild(square);
			}
		}

		for (const color of colors) {
			let rowCount: number = color === 'black' ? 0 : 7;
			for (const row of pieces) {
				let columnCount: number = 0;
				for (const piece of row) {
					if (this.textures !== undefined) {
						const texture: Texture = this.textures[`${color}-${piece}.png`];
						const sprite: Sprite = new Sprite(texture);
						sprite.setTransform(pieceWidth * columnCount, pieceHeight * rowCount, pieceWidth / texture.width, pieceHeight / texture.height);
						this.stage.addChild(sprite);
						columnCount++;
					}
				}
				rowCount += color === 'black' ? 1 : -1;
			}
		}
	}

	public animate(): void {
		requestAnimationFrame(this.animate.bind(this));
		this.app.renderer.render(this.stage);
	}
}
