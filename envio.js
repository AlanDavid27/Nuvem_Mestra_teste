const app = require('./app');

let data = {app};
console.log(data)
const urlPost = "https://us-central1-lms-nuvem-mestra.cloudfunctions.net/testApi";
const settings = {
    method:"POST",
    headers:{
        "content-Type":"apllication/json",
        "meuNome": "Alan David"
    },
    body: JSON.stringify(data)
};

fetch(urlPost,settings)
.then((response)=>{
    return response.json();
})
.then((info)=>{
    console.log(info);
}).catch((error)=>{
    console.log(error);
})