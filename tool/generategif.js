require('babel-register')({
  presets: [ 'env' ]
})

//var CCapture = require('ccapture.js')

var GIFEncoder = require('gifencoder');
const demos = require('../src/script/demos')
const ChainDraw = require('../src/script/chaindraw/ChainDraw').default
var Canvas = require('canvas').Canvas;
var fs = require('fs');
var path = require('path')


const canvasCreator = (width,height) => {
  return new Canvas(width,height)
}





console.log("hello demos")
Object.keys(demos).forEach(key => {
  var demo = demos[key]
  
  var encoder = new GIFEncoder(300, 300);
  encoder.createReadStream().pipe(fs.createWriteStream('static/'+key+'.gif'));
  encoder.start();
  encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
  encoder.setDelay(120);  // frame delay in ms
  encoder.setQuality(4); // image quality. 10 is default.

//var capturer = new CCapture({format:'webm'})
  var chainDraw = new ChainDraw(300,300,{},canvasCreator)
  for(var j=0;j<500;j++){
    demo(chainDraw,j)
  }
  
  for(var i=j;i<j+1000;i++)
  {
    demo(chainDraw,i)
    if(i%30 === 0){
      console.log('add frame',chainDraw.layers.default)
      encoder.addFrame(chainDraw.layers.default);
    }
  }
 encoder.finish();

 const out = fs.createWriteStream('static/'+key+'.jpg')
var stream = chainDraw.canvas.createJPEGStream()
stream.pipe(out)

 var template = fs.readFileSync('tool/template.html','utf8')
 template = template.replace(/{title}/g, key)
 fs.writeFileSync('static/'+key+'.html',template,'utf8')
})