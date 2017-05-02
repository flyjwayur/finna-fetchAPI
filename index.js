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
  // this decide the puzzle size
  this.puzzleWidth = 300;
  this.puzzleHeight = 300;

  this.totalPuzzleRows = 6;
  this.totalPuzzleColumns = 6;
  this.flipCount_ = 0;

};

games.Game.prototype.onAssetsLoaded_ = function(loader, resources) {

  //Get Architecture images from Fingna API
  var testURL = "https://api.finna.fi/Cover/Show?id=muusa.urn%3Auuid%3A7682B120-4F8E-4210-AD4D-1B118BA7699E&index=0&size=large";
  this.apiImage_ = new Image();
  this.apiImage_.addEventListener("load", this.imageOnLoad.bind(this));
  this.apiImage_.src = testURL;

};

games.Game.prototype.imageOnLoad = function (event) {
  // var imageXRatio = this.apiImage_.width / this.puzzleWidth,
  //     imageYRatio = this.apiImage_.height / this.puzzleHeight;
  // var XScaleRate = 1 / imageXRatio,
  //   YScaleRate = 1 / imageYRatio;
  // console.log(XScaleRate + "   " + YScaleRate);
  // this.apiImage_.style.width = XScaleRate + '%';
  // this.apiImage_.style.width = '1%';
  // this.apiImage_.style.height = YScaleRate + '%';
  // this.apiImage_.style.height = '1%';

    this.instantiatePuzzlePiecesAndControlButtons.bind(this)(this.totalPuzzleRows, this.totalPuzzleColumns);
};

games.Game.prototype.instantiatePuzzlePiecesAndControlButtons = function(totalRow, totalCol){
    var pieceWidth = Math.floor(this.apiImage_.width / totalCol),
        pieceHeight = Math.floor(this.apiImage_.height / totalRow);
    for (var row = 0; row  < totalRow; row++) {
        this.pieces_.push([]);
        for (var col = 0; col < totalCol; col++) {
            this.pieces_[row].push(
                this.createSpriteFromSpriteSheet.bind(this)(pieceWidth, pieceHeight, row, col, totalRow, totalCol)
            );
        }
    }
  this.renderer_.render(this.container_);
  document.body.appendChild(this.renderer_.view);
};

games.Game.prototype.createSpriteFromSpriteSheet = function(width, height, row, col, totalRow, totalCol) {

  // little bit of math. changing image size directly or piece size before making sprite just crops the image
  // so this is inevitable
  var imageXRatio = this.apiImage_.width / this.puzzleWidth,
    imageYRatio = this.apiImage_.height / this.puzzleHeight;
  var XScaleRate = 1 / imageXRatio,
    YScaleRate = 1 / imageYRatio;

    var rectangle = new PIXI.Rectangle(width * col, height* row, width, height);

    // Tell the texture to use that rectangular section
  var base = new PIXI.BaseTexture(this.apiImage_),
    texture = new PIXI.Texture(base);
    texture.frame = rectangle;
  var piece = new PIXI.Sprite(texture);
    piece.width = width;
    piece.height = height;
    piece.scale.x = XScaleRate;
    piece.scale.y = YScaleRate;

    console.log("piece width & height: "+ piece.width + " " + piece.height);

    // Center all pieces
    // NOTE: using container width for centering is wrong, canvas width height is the correct one for using
    // console.log (this.container_.width + " " + width + " " + totalCol);
    // console.log (this.container_.height + " " + height + " " + totalRow);
    // Spread pieces evenly
    // Widen the space between pieces after scaling the pieces
    piece.x = piece.width * col;
    piece.y = piece.height * row;

    if(((row + col) % 2) == 0){
        piece.visible = false;
    }

    piece.interactive = true;

    piece.on('click', (event) => {
        console.log(event.target);
        console.log(event);
        event.target.visible = false;
        this.renderer_.render(this.container_);
        if(this.checkPuzzleIsSolved()){
            this.afterGameTypeNameCheckPointsMessage();
        }
    });

    // add piece to stage
    this.container_.addChild(piece);
    return piece;
}

games.Game.prototype.checkPuzzleIsSolved = function(){
  for(var i = 0; i < this.pieces_.length; i ++){
    for(var j =0; j< this.pieces_.length; j++){
      if(this.pieces_[i][j].visible == false)
       return true;
    }
  }
  return false;
};


games.Game.prototype.afterGameTypeNameCheckPointsMessage = function () {
     var message = new PIXI.Text(
         "Fabulous :) Now the puzzle is solved\n" +
         "Please type your name. Check the points and rank :D :" ,
         {fontFamily: "Arial", fontSize: 30, fill: "yellow"}
     );
     message.position.set( this.canvasWidth_ / 4, this.canvasHeight_ / 2);
     this.container_.addChild(message);
};

function flipPiece(piece) {
    // piece.flipped = !piece.flipped;
    // if (piece.scale.x == 0) {
    //     piece.scale.x = 2;
    // } else {
    //     piece.scale.x = 0;
    // }
}

var game = new games.Game();

// python -m SimpleHTTPServer