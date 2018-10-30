import './../styles/app.scss'
import {Person} from './model/Person'
import ChainDraw from './chaindraw/ChainDraw'
var p = new Person("Jérémie","Sellam23")
document.write(p.getFullName());





const redStyle = {
  strokeStyle:"rgba(255,0,0,0.1)"
}

const blueStyle = {
  strokeStyle:"rgba(0,0,255,0.1)"
}

var chainDraw = new ChainDraw(300,300,redStyle)

var body = document.getElementsByTagName("body")[0];
body.appendChild(chainDraw.canvas);



var k = 0




const animate = () => {
chainDraw
  .reset()
  .clearLayer('default')
  //.clearLayer('extremity')
  //.clearLayer('extremity2')
  .layer('default')
  .moveTo(150,150)
  .rotate(k/100)
  .repeat(8)
    .rotate(Math.PI/8*2)
    .newThread()
      .forward(Math.cos(k*0.02)*50+50)
      .rotate(k/100)
      .forward(15)
      .layer('extremity')
      .forward(10)
      //.layer('extremity2')
      .rotate(k/10)
      .forward(10)
      .rotate(k/10)
      .newThread(blueStyle)
        .forward(10)
        .endThread()

      .layer('default')
      .endThread()
    .endRepeat()
  .end()
  k++
  requestAnimationFrame(animate)
}

animate()

