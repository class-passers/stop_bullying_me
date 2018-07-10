
var SearchNode = function( x, y, costFrom, costTo, parent )
{
    this.x = x;
    this.y = y;
    this.costFrom = costFrom;
    this.costTo = costTo;
    this.parent = parent;
};

function get_neighbors( mapGrid, width, height, node, end_node, isAttacker )
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
            if( isAttacker === true ) {
                if( mapGrid[next_y][next_x] === ROAD || mapGrid[next_y][next_x] === END )
                    neighbors.push(new SearchNode(next_x, next_y, node.costFrom + 1, get_heuristic(new Pos(next_x, next_y), end_node), node));
            }
            else {
                var extraCost = 1;
                // increases move cost to the road to avoid it for defender troops
                if( mapGrid[next_y][next_x] === ROAD || mapGrid[next_y][next_x] === END ){
                    extraCost = 50;
                }

                neighbors.push(new SearchNode(next_x, next_y, node.costFrom + extraCost, get_heuristic(new Pos(next_x, next_y), end_node), node));
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
                return new Pos(x, y);
            }
        }
    }
    return new Pos(-1, -1);
}

function get_heuristic( begin, end )
{
    // calculates heuristic using Manhattan distance
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
function search_path( mapGrid, startPos, endPos, isAttacker )
{
    var height = mapGrid.length;
    var width = mapGrid[0].length;

    var begin = new SearchNode( startPos.x, startPos.y, 0, get_heuristic( startPos, endPos ), null );
    var frontier = [ begin ];
    var visited = [];
    while( frontier.length > 0 )
    {
        var current = frontier[0];
        frontier.shift();
        visited.push( current );

        if( current.x === endPos.x && current.y === endPos.y )
        {
            var move_path = [];
            while( current.parent != null )
            {
                move_path.push( new Pos( current.x, current.y ) );
                current = current.parent;
            }

            move_path.reverse();
            //console.log("path from " + JSON.stringify(startPos) + " to " + JSON.stringify(endPos) + " = " + JSON.stringify(move_path) );
            return move_path;
        }

        var neighbors = get_neighbors( mapGrid, width, height, current, endPos, isAttacker );
        //console.log("neighbor of " + JSON.stringify(current) + " is " + JSON.stringify(neighbors));
        for( var i = 0; i < neighbors.length; i++ )
        {
            var neighbor = neighbors[i];
            if (contains(visited, neighbor)) {
                continue;
            }

            if (contains(frontier, neighbor)) {
                var exist_node = get_element(frontier, neighbor);
                //console.log("think wich is better " + JSON.stringify(exist_node) + " to " + JSON.stringify(neighbors[i]) );
                // if new way is better than the one in the frontier
                if (neighbor.costFrom < exist_node.costFrom) {
                    exist_node.costFrom = neighbor.costFrom;
                    exist_node.costTo = neighbor.costTo;
                    exist_node.parent = current;
                }
            }
            else {
                frontier.push(neighbor);
            }
        }

        // sort by distance to the goal
        frontier.sort( function(a, b){return a.costFrom + a.costTo - b.costFrom - b.costTo } );
    }
    console.log("cant find the path.");
    return [];
}
