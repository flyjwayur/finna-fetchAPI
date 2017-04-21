/**
 * Created by soo on 12.4.2017.
 */

'use strict';

/*Game*/

var games = {};

games = function(){

  //can constructor function only have properties?

 this.pieces_ = [];
 this.loader_ = new PIXI.loaders.Loader();
 this.loader_.add('mushroom2.png')
             .once(this.onAssetsLoaded_);
 this.container_ = new PIXI.Container();
 this.renderer_ = new PIXI.CanvasRenderer(500, 500);

}
console.log(games.prototype);
games.prototype.instantiatePuzzlePiecesAndControlButtons = function(imageWidth, imageHeight, totalRow, totalCol){
    var pieceWidth = imageWidth/totalCol,
        pieceHeight = imageHeight/totalRow;

    for (var row = 0; row  < totalRow; row++) {
        pieces_.push([]);
        for (var col = 0; col < totalCol; col++) {
            pieces_[row].push(
                this.createSpriteFromSpriteSheet(pieceWidth, pieceHeight, row, col, totalRow, totalCol)
            );
        }
    }
};


games.prototype.createSpriteFromSpriteSheet = function(width, height, row, col, totalRow, totalCol) {
    var rectangle = new PIXI.Rectangle(width * col, height* row, width, height);
    //Tell the texture to use that rectangular section
    // var texture = new PIXI.Texture(PIXI.BaseTexture.fromImage("assets/tileset.png"));
    //var base = this.base;
    var texture = new PIXI.Texture(this.base);
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

    // boolean flag for solution checking
    piece.flipped = false;

    // add piece to stage
    this.container_.addChild(piece);

    return piece;
}



games.prototype.imageOnLoad = function (base_image) {
    return function (event) {
        console.log(event.target);
        var base = new PIXI.BaseTexture(base_image);
        var texture = new PIXI.Texture(base);
        var piece = new PIXI.Sprite(texture);
        console.log("piece "+ piece);
    };
};


games.prototype.onAssetsLoaded_ = function() {
    this.totalPuzzleRows = 6;
    this.totalPuzzleColumns = 6;

    //Get Architecture images from Fingna API
    var testURL = "https://api.finna.fi/Cover/Show?id=muusa.urn%3Auuid%3A7682B120-4F8E-4210-AD4D-1B118BA7699E&index=0&size=large";
    var base_image = new Image();
    base_image.addEventListener("load", this.imageOnLoad(base_image));
    base_image.src = testURL;

    this.instantiatePuzzlePiecesAndControlButtons(192, 192, this.totalPuzzleRows, this.totalPuzzleColumns);

    this.backgroundSprite_ = PIXI.Sprite.fromImage('mushroom2.png');
    document.body.appendChild(this.renderer_.view);


};





/*//document.getElementById("pixi").appendChild(renderer_.view);

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
