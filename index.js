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

/*

// Use Pixi js

const ul = document.getElementById('finna');

//render images with pixi.js
var loader_ = new PIXI.loaders.Loader();
var stage_ = new PIXI.Container();
var renderer_ = PIXI.autoDetectRenderer(256, 256);
document.body.appendChild(renderer_.view);

var testURL = 'https://api.finna.fi/Cover/Show?id=musketti.M012%3AHK6869%3A1.2&index=0&size=large';

// var testURL = 'player.png';

//With Pixi.js : it works with 'player.png' but it does not work with api.finna.fi url
// loader_
// .add([{
//   url: testURL,
//   crossOrigin: true
// }])
// .on("progress", loadProgressHandler)
// .load(setup);

// function make_base() {
//   let base_image = new Image();
//   base_image.src = testURL;
//
//   return base_image;
// }

let base_image = new Image();
base_image.addEventListener("load", imageOnLoad);
base_image.src = testURL;

function imageOnLoad(event) {
  console.log(event.target);
}
let img = new Image();
img.crossOrigin = '';
img.src = 'https://api.finna.fi/Cover/Show?id=musketti.M012%3AHK6869%3A1.2&index=0&size=large';
img.onload = function() {
  var c = document.createElement('canvas');
  var ctx = c.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var imgURL = c.toDataURL();
  // var texture = new PIXI.Texture(PIXI.BaseTexture.fromImage(base_image));
  var sprite = new PIXI.Sprite.fromImage(imgURL);

  stage_.addChild(sprite);
  renderer_.render(stage_);
}
//
// var texture = new PIXI.Texture(PIXI.BaseTexture.fromImage(base_image));
// var sprite = new PIXI.Sprite(texture);
//
// stage_.addChild(sprite);
// renderer_.render(stage_);

function loadProgressHandler(loader, resource) {

  //Display the file `url` currently being loaded
  console.log("loading: " + resource.url);

  //Display the precentage of files currently loaded
  console.log("progress: " + loader.progress + "%");

  //If you gave your files names as the first argument
  //of the `add` method, you can access them like this
  //console.log("loading: " + resource.name);
}

function setup() {

  // var sprite = new PIXI.Sprite(loader_.resources[testURL].texture);
  //
  // stage_.addChild(sprite);
  // renderer_.render(stage_);
  var texture = new PIXI.Texture(PIXI.BaseTexture.fromImage(make_base()));
  var sprite = new PIXI.Sprite(texture);

  stage_.addChild(sprite);
  renderer_.render(stage_);
}

const url = 'https://api.finna.fi/v1/search?lookfor=sibelius&filter[]=online_boolean:%221%22&filter[]=format:%220/Image/%22';

let imageUrl = fetch(url)
.then((resp) => resp.json())
.then(function (data) {
  let architectures = data.records;
  let building = architectures[0];
  let imgUrl = "http://api.finna.fi" + building.images[0];
  // console.log(imgUrl);
  return imgUrl;
})
.catch(function (error) {
  console.log(JSON.stringify(error));
});

  */