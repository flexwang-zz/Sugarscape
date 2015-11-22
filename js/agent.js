function Agent(x, y, vision, harvest, consume, capacity, sugar)
{
    this.x          = x;
    this.y          = y;
    this.vision     = vision;
    this.harvest    = harvest;
    this.consume    = consume;
    this.capacity   = capacity;
    this.sugar      = Math.min(sugar, capacity);
}

Agent.prototype.getPos = function()
{
    return this.x + this.y*cntX;
}

Agent.prototype.Migrate = function()
{
    var bestPos = this.getPos();
    var thisPos = this.getPos();
    //var diff = 
    for (var i=this.x-this.vision; i<=this.x+this.vision; i++) {
        if (i < 0 || i >= cntX) continue;
        for (var j=this.y-this.vision; j<=this.y+this.vision; j++) {
            if (j < 0 || j >= cntY) continue;
            var idx = i + j*cntX;
            if (!hasAgent[idx] && sugar[bestPos] <= sugar[idx])
                bestPos = idx;
        }
    }
    hasAgent[thisPos] = false;
    hasAgent[bestPos] = true;
    this.x = bestPos % cntX;
    this.y = Math.floor(bestPos/cntX);
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
