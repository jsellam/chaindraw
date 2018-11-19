import './../styles/app.scss'
import ChainDrawPlayer from './chaindraw/ChainDrawPlayer'
import * as demos from './demos'


if(window.demo){
  new ChainDrawPlayer('#demo-container',300,300,demos[window.demo])
}else{
  for(var i in demos) {
    new ChainDrawPlayer('#demo-container',300,300,demos[i])
  }
}
