
// return an random integer number less than max value
function getRandom( maxValue )
{
    return Math.floor( Math.random() * maxValue );
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
        rect1.y + rect1.height < rect1.target.y || rect1.y > rect2.y + rect2.height );
}
