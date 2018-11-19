import ChainDraw from './ChainDraw'


export default class ChainDrawPlayer {
  constructor(parentSelector,width,height,render)
  {

    this.clickPlay = this.clickPlay.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.animate = this.animate.bind(this)

    this.chainDraw = new ChainDraw(width,height)
    this.render = render
    
    let parent = document.querySelector(parentSelector)

    this.container = document.createElement('div')
    this.container.className = "chain-draw-player"
    parent.appendChild(this.container)
    this.container.style.position = "relative"
    this.container.style.width = width+"px"
    this.container.style.height = height+"px"
    this.container.style.outline = 0
    this.container.setAttribute('tabindex',0)
    this.container.appendChild(this.chainDraw.canvas);

   this.container.addEventListener('click',this.clickPlay)
 
    
    this.overlay = document.createElement('div')
    this.overlay.style.width = "100%"
    this.overlay.style.height = "100%"
    this.overlay.style.position = "absolute"
    this.overlay.style.top = 0
    this.overlay.style.left = 0
    this.overlay.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;background-color:rgba(0,0,0,0.1)"><svg style="width:60px;height:60px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 314.1 314.1"><path d="M293 78.5C249.6 3.4 153.6-22.3 78.5 21.1 3.4 64.4-22.3 160.4 21.1 235.5c43.3 75.1 139.4 100.8 214.5 57.5 75-43.4 100.8-139.4 57.4-214.5zm-73.2 187.3c-60.1 34.7-136.9 14.1-171.6-46-34.7-60.1-14.1-136.9 46-171.6 60.1-34.7 136.9-14.1 171.6 46 34.7 60.1 14.1 136.9-46 171.6zm-6.2-115.1l-82.2-47.9c-7.5-4.4-13.5-.9-13.5 7.8l.4 95.2c0 8.7 6.2 12.2 13.7 7.9l81.6-47.1c7.4-4.5 7.4-11.6 0-15.9z"/></svg></div>'
    this.container.appendChild(this.overlay)

  

    
    this.preRender()
    this.isPlaying = false
  }

  preRender()
  {
    this.chainDraw.clear()
    for(var i=0;i<100;i++)
    {
      this.render(this.chainDraw,i)
    }
  }

 
  onBlur()
  {
    this.isPlaying = false
    this.preRender()
    this.overlay.style.display = "block"

    this.container.addEventListener('click',this.clickPlay)
    this.container.removeEventListener('blur',this.onBlur)
  }


  clickPlay()
  {
    this.isPlaying = true
    this.container.removeEventListener('click',this.clickPlay)
    this.container.addEventListener('blur',this.onBlur)
    this.overlay.style.display = "none"
    this.chainDraw.clear()
    
    this.k = 0
    this.animate()
  }


  animate()
  {
    this.render(this.chainDraw,this.k)
    this.k++
    if(this.isPlaying) requestAnimationFrame(this.animate)
  }





}