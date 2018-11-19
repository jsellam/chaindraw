const cyanStyle = {
  strokeStyle:"rgba(42,183,202,0.1)"
}

const redStyle = {
  strokeStyle:"rgba(254,74,73,0.1)"
}

const yellowStyle = {
  strokeStyle:"rgba(254,215,102,0.1)"
}

const greyStyle = {
  strokeStyle:"rgba(230,230,234,0.1)"
}

export default function (chainDraw, k) {
  chainDraw
  .reset()
  .clearLayer('default')
  .layer('default')
  .moveTo(150,150)
  .rotate(k/100)
  .repeat(4)
    .rotate(Math.PI/4*2)
    .newThread(yellowStyle)
      
      .rotate(k/1000)
      .forward(Math.cos(k/100)*40+100)
      .rotate(1)
      .layer('extremity')
      .forward(30)
      .rotate(k/12)
      .forward(10)
      .rotate(k/100)
      .newThread(redStyle)
        .forward(6)
        .endThread()
        .newThread(cyanStyle)
          .rotate(k/203)
          .forward(16)
          .endThread()
      .layer('default')
      .endThread()
    .endRepeat()
  .end()
    
}