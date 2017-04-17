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
  var base = new PIXI.BaseTexture(base_image),
    texture = new PIXI.Texture(base),
    sprite = new PIXI.Sprite(texture);
  stage_.addChild(sprite);
  renderer_.render(stage_);
}
