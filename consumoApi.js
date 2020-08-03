const fetch = require('node-fetch');

const url = 'https://brasil.io/api/dataset/covid19/caso/data/?state=PR&date=2020-05-10';

fetch(url)
    .then((res) => res.json())
    .then((json)=>console.log(json));


// const url1 = 'https://brasil.io/api/dataset/covid19/caso/data/?state=PR&date=2020-05-30';

//     fetch(url1)
//         .then((res) => res.json())
//         .then((json)=>console.log(json));


module.exports = fetch;