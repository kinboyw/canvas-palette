var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var point = {x:0,y:0};
var flag = false;

widnowResize();

window.onresize = function(){
    widnowResize();
}

canvas.addEventListener('mousedown',function(e){
  flag=true;
  if(eraserEnable){
      ctx.clearRect(e.clientX-5,e.clientY-5,10,10);
  }
  else{
      point.x = e.clientX;
      point.y = e.clientY;
  }

});

canvas.addEventListener('mousemove',function(e){
  if(!flag){
    return;
  }
  if(eraserEnable){
    ctx.clearRect(e.clientX-5,e.clientY-5,10,10);
  }
  else{
    drawLine(point.x,point.y,e.clientX,e.clientY);
    point.x = e.clientX;
    point.y = e.clientY;
  }

});

canvas.addEventListener('mouseup',function(e){
  flag = false;
});  
canvas.addEventListener('ontouchdown',function(e){
    console.log(e);
})
/***************/
var eraserEnable = false;
eraser.onclick = function(){
    eraserEnable = true;
    action.className = "action x"
}
brush.onclick = function(){
    eraserEnable = false;
    action.className = "action";
}

/************/
function widnowResize(){
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
}
function drawLine(x1,y1,x2,y2){
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.strokeStyle = 'red';
  ctx.lineCap = 'round';
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.stroke();
}