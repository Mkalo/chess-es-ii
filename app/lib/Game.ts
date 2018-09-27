import { Application, Container, Graphics, loader as ResourceLoader, loaders as Loaders, Sprite, Texture } from 'pixi.js';
import { Board } from './Board';

export class Game {
	private app: Application;
	private stage: Container = new Container();
	private started: boolean = false;
	private loaded: boolean = false;
	private textures: Loaders.TextureDictionary | undefined = undefined;
	private board: Board = new Board();

	public constructor(app: Application) {
		this.app = app;
	}

	public onLoadComplete(): void {
		this.board.setTextureDictionary(this.textures as Loaders.TextureDictionary);
		this.board.draw(this.stage);
		this.animate();
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
				this.onLoadComplete();
			});
		}
	}

	public animate(): void {
		requestAnimationFrame(this.animate.bind(this));
		this.app.renderer.render(this.stage);
	}
}
