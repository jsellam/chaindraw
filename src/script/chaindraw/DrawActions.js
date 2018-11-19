

export const rotate = rad => ({type:'rotate',rad:rad})
export const forward = length => ({type:'forward',length:length})
export const moveTo = (x,y) => ({type:'move_to',x:x,y:y})
export const newThread = (styles) => ({type:'new_thread',styles:styles})
export const endThread = () => ({type:'end_thread'})
export const repeat = count => ({type:'repeat',count:count})
export const endRepeat = targetIndex => ({type:'end_repeat',targetIndex:targetIndex})
export const clearLayer = layerName => ({type:'clear_layer',layerName:layerName})
export const layer = layerName => ({type:'layer',layerName:layerName})
export const translate = length => ({type:'translate',length:length})
export const ctx = ctxFunc => ({type:'ctx',ctxFunc:ctxFunc})