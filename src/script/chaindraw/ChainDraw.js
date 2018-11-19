import * as drawActions from './DrawActions'
import Cursor from './Cursor'
export default class ChainDraw {
  constructor(width,height,styles={},canvasCreator=null)
  {
    
    this.width = width
    this.height = height
    this.baseStyles = styles
    this.canvasCreator = canvasCreator
    this.canvas = this.createCanvas(this.width,this.height)
   
    this.chain = []
    this.repeats = []
    this.cursor = new Cursor(0,0,0,styles)

    this.layers = {
      default:this.canvas.getContext("2d")
    }
    this.currentLayer = this.layers.default
    this.currentLayer.beginPath()
    //this.currentLayer.strokeStyle="#FF0000";
    this._applyStyle(this.currentLayer,this.cursor.styles)

  }


  createCanvas(width,height)
  {
    if(this.canvasCreator)
    {
      return this.canvasCreator(width,height)
    }
    var canvas = document.createElement('canvas');
    canvas.width = width
    canvas.height = height
    return canvas
  }


  clear()
  {
    Object.keys(this.layers).forEach(layerName => {
      var ctx = this.layers[layerName]
      ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
      ctx.beginPath()
  })
    
  }

  reset()
  {
    this.cursor = new Cursor(0,0,0,this.baseStyles)
    this.chain = []
    this.repeats = []

    Object.keys(this.layers).forEach(layerName => {
        var ctx = this.layers[layerName]
        ctx.beginPath()
    })
    return this
  }

  layer(layerName)
  {
    if(this.layers[layerName] === undefined) {
      var canvas = this.createCanvas(this.width,this.height)
      this.layers[layerName] = canvas.getContext("2d")
      this.layers[layerName].beginPath()
    }
    this.chain.push(drawActions.layer(layerName))
    return this
  }

  ctx(ctxFunc)
  {
    this.chain.push(drawActions.ctx(ctxFunc))
    return this
  }

  clearLayer(layerName='default')
  {
    this.chain.push(drawActions.clearLayer(layerName))
    return this
  }

  moveTo(x,y)
  {
    this.chain.push(drawActions.moveTo(x,y))
    return this
  }


  forward(length)
  {
    this.chain.push(drawActions.forward(length))
    return this
  }

  translate(length)
  {
    this.chain.push(drawActions.translate(length))
    return this
  }

  rotate(rad)
  {
    this.chain.push(drawActions.rotate(rad))
    return this
  }

  lineStyle(style)
  {
    this.chain.push(drawActions.lineStyle(style))
    return this
  }

  newThread(styles=null)
  {
    this.chain.push(drawActions.newThread(styles))
    return this
  }

  endThread()
  {
    this.chain.push(drawActions.endThread())
    return this
  }

  repeat(count)
  {
    //this.chain.push(drawActions.repeat(count))
    this.repeats.push({index:this.chain.length,count:count})
    return this
  }

  endRepeat()
  {
    const lastRepeat = this.repeats.pop()
    let repeatContent = this.chain.slice(lastRepeat.index)
    for(var i=0;i<lastRepeat.count-1;i++)
    {
      this.chain = this.chain.concat(repeatContent)
    }

    return this  
  }

  _applyStyle(ctx,styles)
  {
    ctx.stroke()
    
    for(var i in styles)
    {
      ctx[i] = styles[i]
    }
    ctx.beginPath()
  }
  

  end()
  {
    for(var i=0;i<this.chain.length;i++)
    {
      let item = this.chain[i]
      switch(item.type)
      {
        case 'rotate':
          this.cursor.rotate(item.rad)
          break
        case 'forward':
          this.cursor.forward(item.length)
          this.currentLayer.lineTo(this.cursor.x,this.cursor.y)
          break
        case 'translate':
          this.cursor.forward(item.length)
          this.currentLayer.moveTo(this.cursor.x,this.cursor.y)
          break
        case 'move_to':
          this.cursor.setPosition(item.x,item.y)
          //this.currentLayer.beginPath();
          this.currentLayer.moveTo(this.cursor.x,this.cursor.y)
          break
        case 'new_thread':
   
          this.cursor = this.cursor.createChild()
       
          if(item.styles !== null) {
            this.cursor.styles = item.styles
          }

          this._applyStyle(this.currentLayer,this.cursor.styles)
          this.currentLayer.moveTo(this.cursor.x,this.cursor.y)
          break
        case 'end_thread':
          this.cursor = this.cursor.getParent()
          this._applyStyle(this.currentLayer,this.cursor.styles)
          this.currentLayer.moveTo(this.cursor.x,this.cursor.y)
          break
        case 'clear_layer':
      
          this.layers[item.layerName].clearRect(0,0,this.width,this.height)
          break
        case 'layer':
          this.currentLayer = this.layers[item.layerName]
          this._applyStyle(this.currentLayer,this.cursor.styles)
          this.currentLayer.moveTo(this.cursor.x,this.cursor.y)
          break
        case 'ctx':
          item.ctxFunc(this.currentLayer,this.cursor.x,this.cursor.y)
          break
      }
    }
    
    this.layers.default.stroke()
    Object.keys(this.layers).forEach(layerName => {
      
      if(layerName !== 'default'){
        var ctx = this.layers[layerName]
        ctx.stroke()
        this.layers.default.drawImage(ctx.canvas,0,0)
      }
    })

  }



}