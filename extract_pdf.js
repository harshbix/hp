const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('HP GRAPHICS portfolio.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(function(err){
    console.error("Error reading PDF", err);
});
