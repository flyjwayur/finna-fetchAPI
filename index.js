/**
 * Created by soo on 12.4.2017.
 */
function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

const ul = document.getElementById('finna');
const url = 'https://api.finna.fi/v1/search?lookfor=sibelius&filter[]=online_boolean:%221%22&filter[]=format:%220/Image/%22';
fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        let architectures = data.records;
        return architectures.map(function(building) {
            console.log(JSON.stringify(architectures));
            let li = createNode('li'),
                img = createNode('img');
                //span = createNode('span');
            img.src = "https://finna.fi/Cover/Show?id="+building.id;
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

