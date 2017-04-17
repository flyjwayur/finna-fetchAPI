/**
 * Created by soo on 12.4.2017.
 */
// Use Phaser js

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create });

function preload() {
  // game.load.image('mushroom', 'https://api.finna.fi/Cover/Show?id=musketti.M012%3AHK6869%3A1.2&index=0&size=large');
  game.load.spritesheet("background", "https://api.finna.fi/Cover/Show?id=muusa.urn%3Auuid%3A7682B120-4F8E-4210-AD4D-1B118BA7699E&index=0&size=large",
    200, 200);
}

function create() {
  //  This simply creates a sprite using the mushroom image we loaded above and positions it at 200 x 200
  var test = game.add.sprite(200, 200, 'background', 1);
}
