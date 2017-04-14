/**
 * Created by soo on 12.4.2017.
 */

const ul = document.getElementById('finna');
const url = 'https://api.finna.fi/v1/search?lookfor=sibelius&filter[]=online_boolean:%221%22&filter[]=format:%220/Image/%22';

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        let architectures = data.records;
        //console.log(JSON.stringify(data.records, null, 2));
        return architectures.map(function(building) {
            console.log(JSON.stringify(architectures, null, 2));
            let li = createNode('li'),
                img = createNode('img');
                //span = createNode('span');
            img.src = "http://api.finna.fi"+building.images[0];
            console.log(img.src);

            //span.innerHTML = `${author.name.first} ${author.name.last}`;
            append(li, img);
            //append(li, span);
            append(ul, li);
        })
    })
    .catch(function(error) {
        console.log(JSON.stringify(error));
    });

