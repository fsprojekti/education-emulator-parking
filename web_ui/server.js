const express = require('express')
const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');

// Express server init
const app = express()
const port = 3000


// Nunjucks template engine config
app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true,
    express: app
});
// read svg file
var mainImage = fs.readFileSync(__dirname + '/static/img/interface.svg', 'utf8');

// serve static
app.use(express.static(path.join(__dirname, 'static')));

//serve config
app.use('/config', express.static(path.join(__dirname, 'config')));


// serve index
app.get('/',(request,response)=>{
    response.render('index.html', {"slika": mainImage});
});

// debug message
app.listen(port, () => {
  console.log(`web_ui server running at at http://localhost:${port}`)
})