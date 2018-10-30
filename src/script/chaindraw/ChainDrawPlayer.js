import ChainDraw from './ChainDraw'

export default class ChainDrawPlayer {
  constructor(containerSelector,width,height,render)
  {

    this.togglePlayPause = this.togglePlayPause.bind(this)
    this.animate = this.animate.bind(this)

    this.chainDraw = new ChainDraw(width,height,{})
    this.render = render
    
    let container = document.querySelector(containerSelector)
    container.style.position = "relative"
    container.style.width = width+"px"
    container.style.height = height+"px"
    container.appendChild(this.chainDraw.canvas);
    container.addEventListener('click',this.togglePlayPause)
    
    this.overlay = document.createElement('div')
    this.overlay.style.width = "100%"
    this.overlay.style.height = "100%"
    this.overlay.style.position = "absolute"
    this.overlay.style.top = 0
    this.overlay.style.left = 0
    this.overlay.innerHTML = '<div style="width:100%;height:100%;background-color:rgba(0,0,0,0.3)"></div>'
    container.appendChild(this.overlay)



    for(var i=0;i<100;i++)
    {
      this.render(this.chainDraw,i)
    }

    this.k = i
    this.isPlaying = false
  }


  togglePlayPause()
  {
    this.isPlaying = !this.isPlaying
    if(this.isPlaying)
    {
      this.overlay.style.display = "none"
      this.animate()
    }
    else
    {
      this.overlay.style.display = "block"
      
    }
  }


  animate()
  {
    this.render(this.chainDraw,this.k)
    this.k++
    if(this.isPlaying) requestAnimationFrame(this.animate)
  }



}