/*
generate a random integer in range [lb, ub)
*/
function random_int(lb, ub)
{
    var offset = ub-lb;
    return Math.floor(Math.random()*offset) + lb;
}

/*
generate a random floating point number in range [lb, ub)
*/
function random(lb, ub)
{
    var offset = ub-lb;
    var ret = Math.random()*offset + lb;
    return ret;
}

function clamp(value, lb, ub)
{
    return Math.min(Math.max(lb, value), ub);
}

function lerp(t, v1, v2) {
    return (1.0 - t) * v1 + t * v2;
}