/**
 * Created by soo on 12.4.2017.
 */

//render images with pixi.js
var loader_ = new PIXI.loaders.Loader();
var stage_ = new PIXI.Container();
var renderer_ = PIXI.autoDetectRenderer(256, 256);
document.body.appendChild(renderer_.view);

var testURL = 'http://api.finna.fi/Cover/Show?id=musketti.M012%3AHK6869%3A1.2&index=0&size=large';

//With Pixi.js : it works with 'player.png' but it does not work with api.finna.fi url
loader_
    .add([{url: testURL,
        crossOrigin: true}])
    .on("progress", loadProgressHandler)
    .load(setup);

function loadProgressHandler(loader, resource) {

    //Display the file `url` currently being loaded
    console.log("loading: " + resource.url);

    //Display the precentage of files currently loaded
    console.log("progress: " + loader.progress + "%");

    //If you gave your files names as the first argument
    //of the `add` method, you can access them like this
    //console.log("loading: " + resource.name);
}


function setup(){

    var texture = new PIXI.Texture(PIXI.BaseTexture.fromImage(make_base()));
    //var sprite = new PIXI.Sprite( loader_.resources[testURL].texture);
    //texture.frame = rectangle;
    var sprite = new PIXI.Sprite(texture);

    stage_.addChild(sprite);
    renderer_.render(stage_);
}

function make_base()
{
    base_image = new Image();
    base_image.src = testURL;

    return base_image.src;
}

var canvas = document.getElementById('canvas');
var dataURL = canvas.toDataURL();
console.log(dataURL);

const ul = document.getElementById('finna');
const url = 'https://api.finna.fi/v1/search?lookfor=sibelius&filter[]=online_boolean:%221%22&filter[]=format:%220/Image/%22';

fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        let architectures = data.records;
        let building = architectures[0];
        let imgUrl = "http://api.finna.fi" + building.images[0];
        console.log(imgUrl);
        return imgUrl;
    })
    .catch(function(error) {
        console.log(JSON.stringify(error));
    });

