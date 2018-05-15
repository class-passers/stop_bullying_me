
var searchNode = function( x, y, costFrom, costTo, parent )
{
    this.x = x;
    this.y = y;
    this.costFrom = costFrom;
    this.costTo = costTo;
    this.parent = parent;
};

function get_neighbors( mapGrid, width, height, node )
{
    // find 8 directional neighbors
    var next_positions = [ [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1] ];
    var neighbors = [];
    const ROAD = 1;
    for( var next in next_positions )
    {
        var next_x = next[0] + node.x;
        var next_y = next[1] + node.y;
        // bounding check
        if( next_x >= 0 && next_x < width && next_y >= 0 && next_y < height )
        {
            // add only if the node is a road
            if( mapGrid[next_y][next_x] === ROAD )
            {
                neighbors.push( searchNode( next_x, next_y, node.costFrom + 1, 0, node  )  );
            }
        }
    }
    return neighbors;
}

function find_node( mapGrid, nodeValue )
{
    var height = mapGrid.length;
    var length = mapGrid[0].length;
    for( var y = 0; y < mapGrid.length; y++ )
    {
        for( var x = 0; x < mapGrid[y].length; x++ )
        {
            if( mapGrid[y][x] == nodeValue )
            {
                return [x,y];
            }
        }
    }
    return [-1,-1];
}

function get_heuristic( begin, end )
{
    // calculate heuristic using Manhattan distance
    return Math.abs( begin[0] - end[0] ) + Math.abs( begin[1] - end[1] );
}

function contains( nodes, target )
{
    for( var node in nodes )
    {
        if( node.x == target[0] && node.y == target[1] )
            return true;
    }
    return false;
}

// searches node list from start to end using A* Search
function search_path( mapGrid )
{
    var height = mapGrid.length;
    var length = mapGrid[0].length;
    const START = 10;
    const END = 20;

    var start_pos = find_node( mapGrid, START );
    var end_pos = find_node( mapGrid, END );

    var frontier = [ searchNode( start_pos[0], start_pos[1], 0, get_heuristic( start_pos, end_pos ), null ) ];
    var visited = [];
    while( frontier.length > 0 )
    {
        var current = frontier.shift();
        if( current.x == end_pos[0] && current.y == end_pos[1] )
        {
            var move_path = [];
            while( current.parent != null )
            {
                move_path.push( current );
                current = current.parent;
            }

            move_path.reverse();
            return move_path;
        }
        var neighbors = get_neighbors( current );
        for( var neighbor in neighbors )
        {
            if( contains( frontier, neighbor ) )
            {
                // if new found way is better than the one in the previous


            }
            else if( ( neighbor in visited ) == false )
            {
                frontier.push( neighbor );
            }
        }
    }
    return null;
}