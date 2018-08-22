import { Application } from 'pixi.js';

import { Game } from './lib/Game';

const app: Application = new Application(536, 536, { backgroundColor : 0xFFFFFF });
app.view.style.position = 'absolute';
app.view.style.display = 'block';
document.body.appendChild(app.view);

const game: Game = new Game(app);
game.start();
