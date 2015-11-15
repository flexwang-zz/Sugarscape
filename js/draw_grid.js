var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var unit = 10;
var cntX = 51;
var cntY = 51;
var lineWidth = 2;
var halfLineWidth = lineWidth/2;

function drawGrid()
{
    c.width = unit*cntX+lineWidth;
    c.height = unit*cntY+lineWidth;

    ctx.lineWidth= lineWidth;
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

function fillGrid(src, max)
{
    for (var i=0; i<cntY; i++)
        for (var j=0; j<cntX; j++) {
            var idx = j+i*cntX;
            var rg = src[idx]*255/max
            var posX = j*unit+halfLineWidth, posY = i*unit+halfLineWidth;
            //alert('rgb('+rg+', '+rg+', 0)')
            ctx.fillStyle = 'rgb('+rg+', '+rg+', 0)'
            ctx.fillRect(posX, posY, unit-lineWidth, unit-lineWidth);
        }
}

drawGrid();
var src = Array(cntX*cntY)
for (var i=0; i<cntX*cntY; i++)
    src[i] = 100
var max = 100
fillGrid(src, max);