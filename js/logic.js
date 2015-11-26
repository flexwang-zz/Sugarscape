//-------------------------global definition--------------------
var cntX            =   50;
var cntY            =   50;
var sugar           =   Array(cntX*cntY);
var sugarProduction =   Array(cntX*cntY);
var sugarCapacity   =   Array(cntX*cntY);
var hasAgent        =   Array(cntX*cntY);
var agentCnt        =   250;
var maxSugar        =   30;
var maxProduction   =   0.1;
var agents          =   Array(agentCnt);
var fps             =   5;

//--------------------------agent constant------------------------
var visionRange     =   6;
var harvestRange    =   10;
var consumeRange    =   8;
var capacityRange   =   30;
var initSugarRange  =   15;

//--------------------------sugar mine----------------------------
var sugarMineA = {
    x:          Math.floor(cntX/4),
    y:          Math.floor(cntY/4),
    initSugar:  maxSugar,
    production: maxProduction, 
    fallOff:    20};

var sugarMineB = {
    x:          Math.floor(cntX*3/4),
    y:          Math.floor(cntY*3/4),
    initSugar:  maxSugar,
    production: maxProduction,
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
        if (dist > nearest.fallOff) {
            sugarCapacity[i] = sugar[i] = 0;
            sugarProduction[i] = 0;

        } 
        else {
            var fallOff = (nearest.fallOff-dist)/nearest.fallOff;
            sugarCapacity[i] = sugar[i] = nearest.initSugar*fallOff;
            sugarProduction[i] = nearest.production*fallOff;
        }
    }
}

function test_init_sugar()
{
    test_init_sugar_sugarMine();         
}

function test_init_hasAgent()
{
    for (var i=0; i<cntX*cntY; i++)
        hasAgent[i] = false;
}

function test_init_agent()
{
    pos_arr = init_postion();
    for (var i=0; i<agents.length; i++) {
        var pos = pos_arr[i];
        var x = pos%cntX, y = Math.floor(pos/cntX);
        
        var vision      = random_int(1, visionRange+1);
        var harvest     = random_int(2, harvestRange+1);
        var consume     = random_int(1, consumeRange+1); //at least 1
        var capacity    = random_int(1, capacityRange+1);
        var initSugar   = random_int(1, capacity+1);

/*
        x = Math.floor(sugarMineA.x);
        y = Math.floor(sugarMineA.y);
        pos = x + y *cntX;
        consume = 1;
        harvest = 10;
        vision = 6;
        */
        //console.log('vision: '+vision);
        agents[i] = 
            new Agent(
                x, y, 
                vision,
                harvest,
                consume,
                capacity,
                initSugar);
        hasAgent[pos] = true;
    }
}

function process_one_frame()
{
    //console.log(agentCnt);
    process_one_frame_agent();
    draw();
    product_sugar();
    setTimeout(process_one_frame, 1000/fps);
}

function agent_die(i)
{
    hasAgent[agents[i].getPos()] = false;
    agents[i] = agents[agents.length-1];
    agents.pop();
    agentCnt--;
}

function agent_reproduct(i)
{
    var agent = agents[i].reproduce();
    if (agent) {
        hasAgent[agent.getPos()] = true;
        agents.push(agent);
        agentCnt++;
    }    
}

function process_one_frame_agent()
{
    for (var i=0; i<agentCnt; i++) {
        if (!agents[i].Consume() || agents[i].getDie()) {
            agent_die(i--);
        }
        else {
            agent_reproduct(i);
            agents[i].Harvest();
            agents[i].Migrate();
        }
    }
}

function process_one_frame_sugar()
{
   product_sugar();   
}

function test_draw_grid()
{
    test_init_sugar();
    test_init_agent();
    drawSugar(sugar, maxSugar);
    drawAgents();  
    process_one_frame();
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

function init_postion()
{
    var pos_candidate_arr = Array(cntX*cntY);
    for (var i=0; i<cntX*cntY; i++)
        pos_candidate_arr[i] = i;
    var pos_arr = Array();
    for (var i=0; i<agentCnt; i++) {
        var idx = Math.floor(Math.random()*(cntX*cntY-i));
        pos_arr[i] = pos_candidate_arr[idx];
        pos_candidate_arr[idx] = pos_candidate_arr[cntX*cntY-i-1];    
    }
    return pos_arr;
}

function product_sugar()
{
    for (var i=0; i<sugar.length; i++) 
        sugar[i] = Math.min(sugarCapacity[i], sugar[i]+sugarProduction[i]);
}
//--------------------------------------------------------------

setCanvas();
test_draw_grid();
