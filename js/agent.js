function Agent(x, y, vision)
{
    this.x = x;
    this.y = y;
    this.vision = vision;
}

Agent.prototype.moveTo = function()
{
    var bestPos = this.x + this.y*cntX;
    for (var i=this.x-this.vision; i<=this.x+this.vision; i++) {
        if (i < 0 || i >= cntX) continue;
        for (var j=this.y-this.vision; j<=this.y+this.vision; j++) {
            if (j < 0 || j >= cntY) continue;
            var idx = i + j*cntX;
            if (sugar[bestPos] < sugar[idx])
                bestPos = idx;
        }
    }
    this.x = bestPos % cntX;
    this.y = Math.floor(bestPos/cntX);
}
