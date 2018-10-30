export default class Cursor {

  constructor(x=0, y=0, r=0,styles={})
  {
    this.x = x
    this.y = y
    this.r = r
    this.styles = styles
    this.child = null
    this.parent = null
  }

  createChild()
  {
    var child = this.clone()
    child.parent = this
    this.child = child
    return child
  }

  getParent()
  {
    return this.parent || this
  }

  from(cursor)
  {
    this.x = cursor.x
    this.y = cursor.y
    this.r = cursor.r
    this.styles = cursor.styles
  }

  forward(length)
  {
    this.x = this.x + Math.sin(this.r)*length
    this.y = this.y + Math.cos(this.r)*length
  }

  rotate(rad)
  {
    this.r += rad
  }

  reset(x=0,y=0,r=0)
  {
    this.x = x
    this.y = y
    this.r = r
  }

  setPosition(x,y)
  {
    this.x = x
    this.y = y
  }

  setRotation(r)
  {
    this.r = r
  }

  clone()
  {
    return new Cursor(this.x,this.y,this.r,this.styles)
  }

}