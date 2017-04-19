/**
 * Created by soo on 12.4.2017.
 */

var loader_ = new PIXI.loaders.Loader();
var stage_ = new PIXI.Container();
var renderer_ = new PIXI.CanvasRenderer(500, 500);
document.getElementById("pixi").appendChild(renderer_.view);

var testURL = "https://api.finna.fi/Cover/Show?id=muusa.urn%3Auuid%3A7682B120-4F8E-4210-AD4D-1B118BA7699E&index=0&size=large";

let base_image = new Image();
base_image.addEventListener("load", imageOnLoad);
base_image.src = testURL;

function imageOnLoad(event) {
    console.log(event.target);
    console.log("base_image width & height "+ base_image.width, base_image.height);

    var rectangle = new PIXI.Rectangle(100,100,100,100);
    //Tell the texture to use that rectangular section
    var base = new PIXI.BaseTexture(base_image),
        texture = new PIXI.Texture(base);
    texture.frame = rectangle;
    var sprite = new PIXI.Sprite(texture);

    myFunction();
    stage_.addChild(sprite);
    renderer_.render(stage_);
}




var countFlips = function(){
    var flipSuggestions = 0;
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
           }
       }
   }
}


