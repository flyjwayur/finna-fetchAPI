/**
 * Created by soo on 12.4.2017.
 */

'use strict';

/*Game*/

var games = {};

games.Game = function(){

  //can constructor function only have properties?
  this.apiImage_ = null;
  this.pieces_ = [];
  this.loader_ = new PIXI.loaders.Loader();
  this.loader_.add('mushroom', 'mushroom2.png')
             .load(this.onAssetsLoaded_.bind(this));
  this.container_ = new PIXI.Container();
  this.renderer_ = new PIXI.CanvasRenderer(500, 500);

  this.totalPuzzleRows = 6;
  this.totalPuzzleColumns = 6;

  console.log("constructor");
  console.log(this);
  console.log(this.constructor);

};

games.Game.prototype.onAssetsLoaded_ = function(loader, resources) {
  console.log("assetLoaded");
  console.log(this);

  //Get Architecture images from Fingna API
  var testURL = "https://api.finna.fi/Cover/Show?id=muusa.urn%3Auuid%3A7682B120-4F8E-4210-AD4D-1B118BA7699E&index=0&size=large";
  this.apiImage_ = new Image();
  this.apiImage_.addEventListener("load", this.imageOnLoad.bind(this));
  this.apiImage_.src = testURL;

};

games.Game.prototype.imageOnLoad = function (event) {

    // console.log(event.target);
    // var base = new PIXI.BaseTexture(this.apiImage_);
    // var texture = new PIXI.Texture(base);
    // sprite = new PIXI.Sprite(texture);
    // this.container_.addChild(sprite);
    console.log(this.apiImage_);
    this.instantiatePuzzlePiecesAndControlButtons(192, 192, this.totalPuzzleRows, this.totalPuzzleColumns);

};

var game = new games.Game();


games.Game.prototype.instantiatePuzzlePiecesAndControlButtons = function(imageWidth, imageHeight, totalRow, totalCol){
    var pieceWidth = imageWidth/totalCol,
        pieceHeight = imageHeight/totalRow;

    for (var row = 0; row  < totalRow; row++) {
        this.pieces_.push([]);
        for (var col = 0; col < totalCol; col++) {
            this.pieces_[row].push(
                this.createSpriteFromSpriteSheet(pieceWidth, pieceHeight, row, col, totalRow, totalCol)
            );
        }
    }

  this.renderer_.render(this.container_);
  document.body.appendChild(this.renderer_.view);
};


games.Game.prototype.createSpriteFromSpriteSheet = function(width, height, row, col, totalRow, totalCol) {
    var rectangle = new PIXI.Rectangle(width * col, height* row, width, height);

    // Tell the texture to use that rectangular section

    // var texture = new PIXI.Texture(PIXI.BaseTexture.fromImage("assets/tileset.png"));
    // var base = this.base;
  var base = new PIXI.BaseTexture(this.apiImage_),
    texture = new PIXI.Texture(base);

  texture.frame = rectangle;

  var piece = new PIXI.Sprite(texture);

    piece.width = 32;
    piece.height = 32;

    // Center all pieces
    piece.x = this.container_.width / 2 - piece.width / 2 - (width * totalCol);
    piece.y = this.container_.height / 2 - piece.height / 2 - (height * totalRow);

    // Scale all pieces
    piece.scale.x = 2;
    piece.scale.y = 2;

    // Spread pieces evenly
    // Widen the space between pieces after scaling the pieces
    piece.x = piece.x + (width * col * 2);
    piece.y = piece.y + (height * row * 2);

  if (Math.random() < 0.25) {
    piece.visible = false;
  }

  console.log(piece);

    // add piece to stage
    this.container_.addChild(piece);

    return piece;
}




/*

//document.getElementById("pixi").appendChild(renderer_.view);

 var testURL = "https://api.finna.fi/Cover/Show?id=muusa.urn%3Auuid%3A7682B120-4F8E-4210-AD4D-1B118BA7699E&index=0&size=large";

 let base_image = new Image();
 base_image.addEventListener("load", imageOnLoad);
 base_image.src = testURL;

 function imageOnLoad(event) {
 console.log(event.target);
 console.log("base_image width & height "+ base_image.width, base_image.height);

 //var rectangle = new PIXI.Rectangle(100,100,100,100);
 //Tell the texture to use that rectangular section
 var base = new PIXI.BaseTexture(base_image),
 texture = new PIXI.Texture(base);
 //texture.frame = rectangle;
 var sprite = new PIXI.Sprite(texture);
 sprite.width = 192;
 sprite.height = 192;

 //myFunction();
 container_.addChild(sprite);
 renderer_.render(this.container_);
 }

 var flipSuggestions = 0;
 var countFlips = function(){
 flipSuggestions++;
 alert("I have been called " + flipSuggestions + " times")
 return flipSuggestions;
 }

 function myFunction()
 {
 for(var row = 0; row < 6; row++){
 if(Math.random()< 0.9){
 if(Math.random() < 0.8){
 countFlips();
 alert("Hei! I have been called " + countFlips() + " times")
 }
 }
 }
 }
 */
