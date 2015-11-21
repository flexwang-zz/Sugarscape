var cntX = 50;
var cntY = 50;
var sugar = Array(cntX*cntY);
var agentCnt = 250;
var agents;
//--------------------------test--------------------------------
function test_init_sugar()
{
    var max = 100;
    for (var i=0; i<cntX*cntY; i++)
        sugar[i] = Math.floor(Math.random() * max);      
}

function test_init_agent()
{
    agents = Array(agentCnt);
    for (var i=0; i<agents.length; i++) {
        var posX = Math.floor(Math.random()*cntX);
        var posY = Math.floor(Math.random()*cntY);
        agents[i] = {posX:posX, posY:posY};
    }
}

function test_draw_grid()
{
    test_init_sugar();
    test_init_agent();
    drawSugar(src, max);  
    //setTimeout(test_draw_grid, 1000);
    var x = Array(10)
    for (var i=0; i<x.length; i++) {
        alert(x[i]+'')
    }
}

//--------------------------------------------------------------
setCanvas();
test_draw_grid();