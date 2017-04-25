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
  this.renderer_ = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight);
  this.canvasWidth_ = window.innerWidth;
  this.canvasHeight_ = window.innerHeight;

  this.totalPuzzleRows = 6;
  this.totalPuzzleColumns = 6;
  this.flipCount_ = 0;

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

    console.log(event.target);
    // var base = new PIXI.BaseTexture(this.apiImage_);
    // var texture = new PIXI.Texture(base);
    // sprite = new PIXI.Sprite(texture);
    // this.container_.addChild(sprite);
    console.log(this.apiImage_);
    console.log("apiImage width & height: " + this.apiImage_.width + " " + this.apiImage_.height)
    this.apiImage_.width = 192;
    this.apiImage_.height = 192;
    this.instantiatePuzzlePiecesAndControlButtons(this.apiImage_.width, this.apiImage_.height, this.totalPuzzleRows, this.totalPuzzleColumns);
    console.log("After setting the apiImage width & height : " + this.apiImage_.width + " " + this.apiImage_.height)

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


    // flip random rows
    for (row = 0; row  < totalRow; row++) {
        if (Math.random() < 0.5) {
            for (col = 0; col < totalCol; col++) {
                flipPiece(this.pieces_[row][col]);
            }
            this.flipCount_++;
        }
    }
    // flip random cols
    for (col = 0; col  < totalCol; col++) {
        if (Math.random() < 0.5) {
            for (row = 0; row < totalRow; row++) {
                flipPiece(this.pieces_[row][col]);
            }
            this.flipCount_++;
        }
    }

    // randomly flip diagonal or not
    if (Math.random() < 0.5) {
        for (var i  = 0; i  < totalCol; i++) {
            flipPiece(this.pieces_[this.pieces_.length - i - 1][i]);
        }
        this.flipCount_++;
    }

    this.displayFlipSuggestionMessage();
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
    piece.width = 16;
    piece.height = 16;

    console.log("piece width & height: "+ piece.width + " " + piece.height);

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


games.Game.prototype.displayFlipSuggestionMessage = function () {
    var message = new PIXI.Text(
        "If you can find the solution with a less flip, there will be more points\n" +
        "Hint! Try to flip as few as these flips :D :" + this.flipCount_,
        {fontFamily: "Arial", fontSize: 30, fill: "yellow"}
    );
    message.position.set( this.canvasWidth_ / 4, this.canvasHeight_ / 2);
    this.container_.addChild(message);
};

function flipPiece(piece) {
    piece.flipped = !piece.flipped;
    if (piece.scale.x == 0) {
        piece.scale.x = 2;
    } else {
        piece.scale.x = 0;
    }
}


