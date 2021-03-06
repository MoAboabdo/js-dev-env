import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';


const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler,{
  noInfo:true,
  publicPath:config.output.publicPath
}));

/* eslint-disable no-console */
app.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'../src/index.html'));
});

app.get('/users', function(req, res) {
  res.json([
    {"id": 1,"firstName":"Mo","lastName":"Aboabdo","email":"mo@gmail.com"},
    {"id": 2,"firstName":"osama","lastName":"smith","email":"os@gmail.com"},
    {"id": 3,"firstName":"Ahmed","lastName":"drakola","email":"ahmed@gmail.com"}
]);

})

app.listen(port,function(err) {
  if(err) {
    console.log(err);
  }else{
    open('http://localhost:' + port);
  }

});
