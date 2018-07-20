
var Pos = function( x, y )
{
    this.x = x;
    this.y = y;
};

var Rectangle = function( x, y, width, height )
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};

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

function getNormalizedVector( vec )
{
	var length = Math.sqrt( Math.pow(vec.x, 2) + Math.pow(vec.y, 2) );
	var normal = { x : vec.x/length, y : vec.y/length };
	return normal;
}

function isCollided( rect1, rect2 )
{
    return !(rect1.x + rect1.width < rect2.x || rect1.x > rect2.x + rect2.width ||
        rect1.y + rect1.height < rect2.y || rect1.y > rect2.y + rect2.height );
}

// get angle from source rect to target rect
function getAngleInRadian( source, target )
{
	// center pos of both rectangles
	var sourcePos = new Pos( source.x + Math.floor(source.width / 2), source.y + Math.floor(source.height / 2) );
	var targetPos = new Pos( target.x + Math.floor(target.width / 2), target.y + Math.floor(target.height / 2) );

	// sourcePos up vector - sourcePos
    // var sourceUp = new Pos( sourcePos.x, source.y );
	var vec1 = new Pos( 0, -Math.floor(source.height / 2) );
	// targetPos - sourcePos
	var vec2 = new Pos( targetPos.x - sourcePos.x, targetPos.y - sourcePos.y );
	var dotProduct = vec1.y * vec2.y;
	var len1 = vec1.y;
	var len2 = Math.sqrt( vec2.x * vec2.x + vec2.y * vec2.y );
	return Math.acos( dotProduct / ( len1 * len2 ) );
}

function isInside( x, y, rect)
{
	return (x > rect.x && x < (rect.x + rect.width) && y > rect.y && y < (rect.y + rect.height));
}

function wrapText(context, text, x, y, maxWidth, lineHeight) 
{
		var words = text.split('\n');
        var line = '';

        for(var n = 0; n < words.length; n++) 
		{
			var testLine = line + words[n] + ' ';
			var metrics = context.measureText(testLine);
			var testWidth = metrics.width;
			if (testWidth > maxWidth && n > 0) 
			{
				context.fillText(line, x, y);
				line = words[n] + ' ';
				y += lineHeight;
			}
			else 
			{
				line = testLine;
			}
        }
        context.fillText(line, x, y);
}