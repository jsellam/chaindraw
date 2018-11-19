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
  .ctx((ctx) => {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 300, 300);
  })
  .layer('default')
  .moveTo(150,150)
  .rotate(k/100)
  .repeat(8)
    .rotate(Math.PI/8*2)
    .newThread(yellowStyle)
      .forward(Math.cos(k*0.02)*50+50)
      .rotate(k/100)
      .forward(15)
      .layer('extremity')
      .forward(10)
      .forward(10)
      .rotate(k/10)
      .newThread(redStyle)
        .forward(10)
        .endThread()
        .newThread(cyanStyle)
          .rotate(k/23)
          .forward(10)
          .endThread()
      .layer('default')
      .endThread()
    .endRepeat()
  .end()
}