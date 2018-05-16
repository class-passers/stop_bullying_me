
var searchNode = function( x, y, costFrom, costTo, parent )
{
    this.x = x;
    this.y = y;
    this.costFrom = costFrom;
    this.costTo = costTo;
    this.parent = parent;
};

var position = function( x, y )
{
    this.x = x;
    this.y = y;
};

function get_neighbors( mapGrid, width, height, node, end_node )
{
    // find 8 directional neighbors
    const next_positions = [ [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1] ];
    var neighbors = [];
    const ROAD = 1;
    const END = 20;
    for( var i = 0; i < next_positions.length; i++ )
    {
        var next = next_positions[i];
        var next_x = next[0] + node.x;
        var next_y = next[1] + node.y;
        // bounding check

        if( next_x >= 0 && next_x < width && next_y >= 0 && next_y < height )
        {
            // add only if the node is a road
            if( mapGrid[next_y][next_x] === ROAD || mapGrid[next_y][next_x] === END )
            {
                neighbors.push( new searchNode( next_x, next_y, node.costFrom + 1, get_heuristic( new position( next_x, next_y), end_node ), node  )  );
            }
        }
    }
    return neighbors;
}

function find_node( mapGrid, nodeValue )
{
    for( var y = 0; y < mapGrid.length; y++ )
    {
        for( var x = 0; x < mapGrid[y].length; x++ )
        {
            if( mapGrid[y][x] === nodeValue )
            {
                return new position(x, y);
            }
        }
    }
    return position(-1, -1);
}

function get_heuristic( begin, end )
{
    // calculate heuristic using Manhattan distance
    return Math.abs( begin.x - end.x ) + Math.abs( begin.y - end.y );
}

function contains( nodes, target )
{
    for( var i = 0; i < nodes.length; i++ )
    {
        if( nodes[i].x === target.x && nodes[i].y === target.y )
            return true;
    }
    return false;
}

function get_element( nodes, target )
{
    for( var i = 0; i < nodes.length; i++)
    {
        if( nodes[i].x === target.x && nodes[i].y === target.y )
            return nodes[i];
    }
    return null;
}

// searches node list from start to end using A* Search
function search_path( mapGrid )
{
    var height = mapGrid.length;
    var width = mapGrid[0].length;

    const START = 10;
    const END = 20;

    var start_pos = find_node( mapGrid, START );
    var end_pos = find_node( mapGrid, END );

    var begin = new searchNode( start_pos.x, start_pos.y, 0, get_heuristic( start_pos, end_pos ), null );
    var frontier = [ begin ];
    var visited = [];
    while( frontier.length > 0 )
    {

        var current = frontier[0];
        frontier.shift();
        visited.push( current );

        if( current.x === end_pos.x && current.y === end_pos.y )
        {
            var move_path = [];
            while( current.parent != null )
            {
                move_path.push( current );
                current = current.parent;
            }

            move_path.reverse();
            //for( var i = 0; i < move_path.length; i++ )
            //{
            //    console.log("path = " + move_path[i].x + " , " + move_path[i].y );
            //}

            return move_path;
        }

        var neighbors = get_neighbors( mapGrid, width, height, current, end_pos );
        for( var i = 0; i < neighbors.length; i++ )
        {
            if( contains( visited, neighbors[i] ) )
            {
                continue;
            }

            if( contains( frontier, neighbors[i] ) )
            {
                var exist_node = get_element( frontier, neighbors[i] );
                // if new found way is better than the one in the exist
                if( neighbors[i].costFrom < exist_node.costFrom )
                {
                    exist_node.costFrom = neighbors[i].costFrom;
                    exist_node.costTo = neighbors[i].costTo;
                    exist_node.parent = current;
                }
            }
            else
            {
                frontier.push( neighbors[i] );
            }

        }

        frontier.sort( function(a, b){return a.costFrom + a.costTo - b.costFrom - b.costTo } );
    }
    console.log("cant find the path.");
    return null;
}