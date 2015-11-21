//-------------------------global definition--------------------
var cntX =      50;
var cntY =      50;
var sugar =     Array(cntX*cntY);
var agentCnt =  100;
var maxSugar =  100;
var agents =    Array(agentCnt);

var sugarMineA = {
    x:          cntX/4,
    y:          cntY/4,
    initSugar:  maxSugar,
    fallOff:    20};

var sugarMineB = {
    x:          cntX*3/4,
    y:          cntY*3/4,
    initSugar:  maxSugar,
    fallOff:    20};

var sugarMines = [sugarMineA, sugarMineB];
//--------------------------------------------------------------
//--------------------------test--------------------------------
function test_init_sugar_random()
{
    for (var i=0; i<cntX*cntY; i++)
        sugar[i] = Math.floor(Math.random() * maxSugar); 
}
function test_init_sugar_sugarMine()
{
    for (var i=0; i<cntX*cntY; i++) {
        var x = i%cntX, y = Math.floor(i/cntX);
        var nearest = get_nearest_sugarMine(x, y);
        var dist = get_dist(nearest.x, nearest.y, x, y);
        if (dist > nearest.fallOff) sugar[i] = 0; 
        else {
            var fallOff = (nearest.fallOff-dist)/nearest.fallOff;
            sugar[i] = Math.floor(nearest.initSugar*fallOff);
        }
    }
}
function test_init_sugar()
{
    test_init_sugar_sugarMine();         
}

function test_init_agent()
{
    for (var i=0; i<agents.length; i++) {
        var posX = Math.floor(Math.random()*cntX);
        var posY = Math.floor(Math.random()*cntY);
        var vision = Math.floor(Math.random()*6);
        //agents[i] = {x:posX, y:posY};
        agents[i] = new Agent(posX, posY, vision);
    }
}

function test_migrate()
{
    for (var i=0; i<agents.length; i++)
        agents[i].moveTo();
    drawSugar(sugar, maxSugar);
    drawAgents(); 
    setTimeout(test_migrate, 500);
}

function test_draw_grid()
{
    test_init_sugar();
    test_init_agent();
    drawSugar(sugar, maxSugar);
    drawAgents();  
    setTimeout(test_migrate, 500);
    /*
    var x = Array(10)
    for (var i=0; i<x.length; i++) {
        alert(x[i]+'')
    }
    */
}

//--------------------------------------------------------------
function get_dist(x0, y0, x1, y1)
{
    var dx = x0-x1, dy = y0 - y1;
    return Math.sqrt(dx*dx + dy*dy);
}
function get_nearest_sugarMine(x, y)
{
    var nearest_idx = 0;
    for (var i=0; i<sugarMines.length; i++) {
        if (get_dist(x, y, sugarMines[i].x, sugarMines[i].y)
            < get_dist(x, y, sugarMines[nearest_idx].x, sugarMines[nearest_idx].y))
            nearest_idx = i;
    }
    return sugarMines[nearest_idx];
    
}
//--------------------------------------------------------------

setCanvas();
test_draw_grid();