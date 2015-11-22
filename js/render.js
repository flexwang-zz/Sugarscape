var canvasId = 'sugarScape';
var c = document.getElementById(canvasId);
var ctx = c.getContext("2d");
var unit = 8;
var lineWidth = 1;
var halfLineWidth = lineWidth/2;
var halfUnit = unit/2;
var fullRadius = halfUnit-lineWidth;
var sugarColor = 'yellow';
var agentColor = 'blue';

function setCanvas()
{
    c.width = unit*cntX;
    c.height = unit*cntY;

    ctx.lineWidth= lineWidth;
}

function drawGrid()
{
    for (var i=0; i<=cntY; i++) {
        ctx.moveTo(0,i*unit);
        ctx.lineTo(c.width-halfLineWidth,i*unit);
        ctx.stroke();
    }

    for (var i=0; i<=cntX; i++) {
        ctx.moveTo(i*unit, 0);
        ctx.lineTo(i*unit, c.height-halfLineWidth);
        ctx.stroke();
    }
}

function drawCircle(centerX, centerY, radius, color)
{
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
}

/*
draw the sugar,
using radius to indicate abundance of the sugar
*/
function drawSugarRadius(src, max)
{
    for (var idx=0; idx<cntX*cntY; idx++) {
        var i = Math.floor(idx / cntX), j = idx % cntX;
        var cx = j*unit+halfUnit, cy = i*unit+halfUnit;
        var radius = fullRadius*Math.min(max, src[idx])/max;
        ctx.clearRect(j*unit, i*unit, unit, unit);
        drawCircle(cx, cy, radius, sugarColor);
    }
}

/*
draw the sugar,
using color to indicate abundance of the sugar
*/
function drawSugarColor(src, max)
{
    for (var idx=0; idx<cntX*cntY; idx++) {
        var i = Math.floor(idx / cntX), j = idx % cntX;
        var cx = j*unit+halfUnit, cy = i*unit+halfUnit;
        ctx.clearRect(j*unit, i*unit, unit, unit);
        var blue = 255-Math.floor(Math.min(max, src[idx])/max*255);
        var color = 'rgb(255,255,'+blue+')';
        //var color = 'rgb('+blue+',255,255)';
        drawCircle(cx, cy, fullRadius, color);
    }
}

function drawSugar()
{
    //drawSugarColor(sugarProduction, maxProduction);
    drawSugarColor(sugar, maxSugar);
}

function drawAgents()
{
    //alert('drawAgents');
    for (var i=0; i<agents.length; i++) {
        var x = agents[i].x, y = agents[i].y;
        var cx = x*unit+halfUnit, cy = y*unit+halfUnit;
        ctx.clearRect(x*unit, y*unit, unit, unit);
        drawCircle(cx, cy, fullRadius, agentColor);
    }
}

function draw()
{
    drawSugar();
    drawAgents();
}