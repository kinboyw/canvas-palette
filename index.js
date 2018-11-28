var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var point =  {x:undefined, y:undefined}
var flag = false

widnowResize()
window.onload = ListenToUser;
window.onresize = function() {
    widnowResize()
}


/***********/

function ListenToUser() {
  if (window.ontouchstart === undefined) {
    canvas.addEventListener('mousedown', mousedown)
    canvas.addEventListener('mousemove', mousemove)
    canvas.addEventListener('mouseup', mouseup)
  }else {
    canvas.addEventListener('touchstart', touchstart)
    canvas.addEventListener('touchmove', touchmove)
    canvas.addEventListener('touchend', touchend)
  }
}

function mousedown(e) {
  flag = true
  if (eraserEnable) {
      ctx.clearRect(e.clientX-5, e.clientY-5, 10, 10)
  }
  else {
      point.x = e.clientX
      point.y = e.clientY
  }
}
function mousemove(e) {
  if ( ! flag) {
    return
  }
  if (eraserEnable) {
    ctx.clearRect(e.clientX-5, e.clientY-5, 10, 10)
  }
  else {
    drawLine(point.x, point.y, e.clientX, e.clientY)
    point.x = e.clientX
    point.y = e.clientY
  }
}
function mouseup(e) {
  flag = false
}

/*************/
function touchstart(e) {
  flag = true
  if (eraserEnable) {
      ctx.clearRect(e.touches[0].clientX-5, e.touches[0].clientY-5, 10, 10)
      //clearCircle(e.touches[0].clientX-5,e.touches[0].clientY-5,10)
  }
  else {
      point.x = e.touches[0].clientX
      point.y = e.touches[0].clientY
  }
}
function touchmove(e) {
  if ( ! flag) {
    return; 
  }
  if (eraserEnable) {
    ctx.clearRect(e.touches[0].clientX-5, e.touches[0].clientY-5, 10, 10)
    //clearCircle(e.touches[0].clientX-5,e.touches[0].clientY-5,10)
  }
  else {
    drawLine(point.x, point.y, e.touches[0].clientX, e.touches[0].clientY) 
    point.x = e.touches[0].clientX
    point.y = e.touches[0].clientY
  }
}
function touchend(e) {
  flag = false; 
}
/***************/
var eraserEnable = false; 
eraser.onclick = function() {
    eraserEnable = true 
    action.className = "action x"
}
brush.onclick = function() {
    eraserEnable = false
    action.className = "action"
}

red.onclick = function(){
  red.classList.add('active')
  yellow.classList.remove('active')
  green.classList.remove('active')
  ctx.strokeStyle = 'red'
  eraser.classList.remove('active')
  brush.classList.add('active')
  eraserEnable = false;
}

yellow.onclick = function(){
  red.classList.remove('active')
  yellow.classList.add('active')
  green.classList.remove('active')
  ctx.strokeStyle = 'yellow'
  eraser.classList.remove('active')
  brush.classList.add('active')
  eraserEnable = false;
}

green.onclick = function(){
  red.classList.remove('active')
  yellow.classList.remove('active')
  green.classList.add('active')
  ctx.strokeStyle = 'green'
  eraser.classList.remove('active')
  brush.classList.add('active')
  eraserEnable = false;
}

reset.onclick = function(){
  ctx.clearRect(0,0,canvas.width,canvas.height)
}
download.onclick = function(){
  var url = canvas.toDataURL('image/png')
  var a  = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '我的画'
  a.target = '_blank'
  a.click()
}
eraser.onclick = function(){
  eraserEnable = true;
  eraser.classList.add('active')
  brush.classList.remove('active')
}
brush.onclick = function(){
  eraserEnable = false;
  eraser.classList.remove('active')
  brush.classList.add('active')
}
/************/
function widnowResize() {
    var pageWidth = document.documentElement.clientWidth; 
    var pageHeight = document.documentElement.clientHeight; 
    canvas.width = pageWidth; 
    canvas.height = pageHeight; 
}
function drawLine(x1, y1, x2, y2) {
  ctx.lineWidth = 5
  ctx.beginPath()
  ctx.lineCap = 'round'
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
}
function clearCircle(x,y,radius){
  ctx.beginPath()
  ctx.arc(x,y,radius,0,2*Math.PI,false)
  ctx.clip()
  ctx.clearRect(x-radius-1,y-radius-1,radius*2+2,radius*2+2)
}
