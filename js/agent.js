var dieAge          =   {start:60, end:80};
var reproduceAge    =   {start:20, end:35};
var reproduceProb   =   0.08;

function Agent(x, y, vision, harvest, consume, capacity, sugar)
{
    this.age        = 0;
    this.x          = x;
    this.y          = y;
    this.vision     = vision;
    this.harvest    = harvest;
    this.consume    = consume;
    this.capacity   = capacity;
    this.sugar      = Math.min(sugar, capacity);
    if (this.sugar > 0) alert('error');
}

Agent.prototype.getPos = function()
{
    return this.x + this.y*cntX;
}

Agent.prototype.setPos = function(idx)
{
    this.x = idx % cntX;
    this.y = Math.floor(idx/cntX);    
}

Agent.prototype.getVision = function()
{
    return Math.floor(this.vision);
}

Agent.prototype.getDie = function(idx)
{
    this.age++;
    if (this.age < dieAge.start) return false;
    else return this.age > random_int(dieAge.start, dieAge.end);
}

Agent.prototype.reproduce = function()
{
    if (this.age < reproduceAge.start 
        || this.age > reproduceAge.end
        || Math.random() > reproduceProb)
        return null;
    var dir = [
        {x:this.x-1, y:this.y}, 
        {x:this.x+1, y:this.y}, 
        {x:this.x, y:this.y-1}, 
        {x:this.x, y:this.y+1}];
    var validPos = Array();
    for (var i=0; i<dir.length; i++)
        if (dir[i].x < 0 || dir[i].x >= cntX || dir[i].y < 0 || dir[i].y >= cntY
            || hasAgent[dir[i].x + dir[i].y*cntX])
            continue;
        else
            validPos.push(dir[i]);
    if (validPos.length == 0) return null;
    var pos = validPos[random_int(0, validPos.length)];
    var lb = 0.9, ub = 1.1;
    var vision = clamp(this.vision*random(lb, ub), 1, visionRange);
    var harvest = clamp(this.harvest*random(lb, ub), 1, harvestRange);
    var consume = clamp(this.consume*random(lb, ub), 1, consumeRange);
    var capacity = clamp(this.capacity*random(lb, ub), 1, capacityRange);
    var portion = this.sugar * Math.random();
    var initSugar = portion;
    this.sugar -= portion;
    return new Agent(
        pos.x, 
        pos.y, 
        vision,
        harvest,
        consume,
        capacity,
        initSugar
        );
}

Agent.prototype.Migrate = function()
{
    var bestPos = [this.getPos()];
    var thisPos = this.getPos();
    var vision = this.getVision();
    //var diff = 
    for (var i=this.x-vision; i<=this.x+vision; i++) {
        if (i < 0 || i >= cntX) continue;
        for (var j=this.y-vision; j<=this.y+vision; j++) {
            var idx = i + j*cntX;
            if (j < 0 || j >= cntY || hasAgent[idx]) continue;
            if (sugar[bestPos[0]] < sugar[idx])
                bestPos = [idx];
            else if (sugar[bestPos[0]] == sugar[idx])
                bestPos.push(idx);
        }
    }
    hasAgent[thisPos] = false;
    var id = random_int(0, bestPos.length);
    hasAgent[bestPos[id]] = true;
    this.setPos(bestPos[id]);
}

Agent.prototype.getColor = function()
{
    if (this.age < reproduceAge.start) return 'green';
    else if (this.age > reproduceAge.end) return 'black';
    else return 'red';

    /*
    if (this.vision <= 2)
        return 'black';
    else if (this.vision <= 4)
        return 'red';
    else
        return 'blue';
    */
}

Agent.prototype.Consume = function()
{
    this.sugar -= this.consume;
    if (this.sugar <= 0) return false;
    else return true;
}

Agent.prototype.Harvest = function()
{
    var thisPos = this.getPos();
    var harvest = Math.min(this.capacity-this.sugar,
        Math.min(this.harvest, sugar[thisPos]));
    sugar[thisPos] -= harvest;
    this.sugar += harvest;
}
