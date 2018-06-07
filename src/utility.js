
function Rectangle( x, y, width, height )
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

// return an random integer number less than max value
function getRandom( maxValue )
{
    return Math.floor( Math.random() * maxValue );
}

// return a value between [minValue, maxValue]
function clamp( value, minValue, maxValue )
{
    return Math.max( Math.min( value, maxValue ), minValue );
}

// return a squared distance between two objects ( center to center )
// both objects should have properties for x, y, width and height
function getDistanceSquare( object1, object2 )
{
    var center_x1 = object1.x + Math.floor( object1.width / 2 );
    var center_y1 = object1.y + Math.floor( object1.height /2 );

    var center_x2 = object2.x + Math.floor( object2.width / 2 );
    var center_y2 = object2.y + Math.floor( object2.height /2 );

    return ( center_x2 - center_x1 ) * ( center_x2 - center_x1 ) + ( center_y2 - center_y1 ) * ( center_y2 - center_y1 );
}

function isCollided( rect1, rect2 )
{
    return !(rect1.x + rect1.width < rect2.x || rect1.x > rect2.x + rect2.width ||
        rect1.y + rect1.height < rect2.y || rect1.y > rect2.y + rect2.height );
}
