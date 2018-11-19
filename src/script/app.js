import './../styles/app.scss'
import ChainDrawPlayer from './chaindraw/ChainDrawPlayer'
import * as demos from './demos'



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


var x = 1
for(var i in demos) {
  new ChainDrawPlayer('#demo-container',cyanStyle,300,300,demos[i])
  x++
}