var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var unit = 10;
var lineWidth = 1;
var halfLineWidth = lineWidth/2;
var halfUnit = unit/2;
var sugarColor = 'red';
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

function drawSugar(src, max)
{
    for (var idx=0; idx<cntX*cntY; idx++) {
        var i = Math.floor(idx / cntX), j = idx % cntX;
        var posX = j*unit+halfUnit, posY = i*unit+halfUnit;
        var radius = (halfUnit-lineWidth)*src[idx]/max;
        ctx.clearRect(j*unit, i*unit, unit, unit);
        drawCircle(posX, posY, radius, sugarColor);
    }
}

function drawAgents()
{
    for (var i=0; i<agents.length; i++) {
        var posX = agents[i].posX, pos
    }
}