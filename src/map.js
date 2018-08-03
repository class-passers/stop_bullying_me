// EMPTY = 0;
// ROAD = 1;
// START = 10;
// END = 20;

var worldMap = {
    width : 0,
    height : 0,
    tileWidth : 0,
    tileHeight : 0,
    loaded : false,
    movePath : null,
	mapGrid : null,
    image : new Image()
};

function loadMapData()
{
    var jsonData = cur_level.map;

    worldMap.width = jsonData["layers"][0]["width"];
    worldMap.height = jsonData["layers"][0]["height"];
    worldMap.tileHeight = jsonData["tileheight"];
    worldMap.tileWidth = jsonData["tilewidth"];

    //console.log("w = " + worldMap.width + ", h = " + worldMap.height );
    worldMap.mapGrid = new Array( worldMap.height );
    for( var i = 0; i < worldMap.height; i++ ) {
        worldMap.mapGrid[i] = new Array( worldMap.width );
    }


    var mapData = jsonData["layers"][0]["data"];
    var mapTileType = jsonData["tilesets"][0]["tiles"];
    worldMap.image.src = "map/" + jsonData["tilesets"][0]["image"];
    //console.log("image = " + worldMap.image.src );
    worldMap.image.onload = function() {
        canvas.width = worldMap.image.width;
        canvas.height = worldMap.image.height;
        numLoadedAssets++;
    };
    numAllAssets++;

    for( var idx = 0; idx < mapData.length; idx++ )
    {
        var x = idx % worldMap.width;
        var y = Math.floor(idx / worldMap.width);
        // Tiled map data index starts from 1, wheres Tileset type id starts from 0
        // subtract by 1 to fix inconsistent issue on Tile map data and Tile id
        var tileData = mapData[idx] - 1;

        if( tileData in mapTileType )
        {
            worldMap.mapGrid[y][x] = parseInt( mapTileType[tileData]['type'] );
        }
        else
        {
            worldMap.mapGrid[y][x] = 0;
        }
    }
    //console.log(JSON.stringify(worldMap.mapGrid));

    const START = 10;
    const END = 20;
    var startPos = find_node( worldMap.mapGrid, START );
    var endPos = find_node( worldMap.mapGrid, END );

    worldMap.movePath = search_path( worldMap.mapGrid, startPos, endPos, true );
    //console.log("path = " + JSON.stringify( worldMap.movePath ));
    worldMap.loaded = true;
}


function get_world_next_position( index )
{
    if( worldMap.movePath !== null )
    {
        if( index < 0 )
        {
            console.log("went out of index");
            index = 0;
        }
        else if( index >= worldMap.movePath.length ) {
            console.log("went out of index");
            index = worldMap.movePath.length - 1;
        }
        var nextLocation = worldMap.movePath[index];
        // return bottom left position of the grid
        return new Pos( ( nextLocation.x * worldMap.tileWidth ), ( ( nextLocation.y + 1 ) * worldMap.tileHeight ) );
    }
    return new Pos( 0, 0 );
}

function is_reached_at_destination( moveIndex )
{
    return moveIndex >= worldMap.movePath.length;
}

function get_start_location()
{
    if( worldMap.movePath !== null )
    {
        var nextLocation = worldMap.movePath[0];

        return new Pos( Math.floor( nextLocation.x  * worldMap.tileWidth ) ,
            Math.floor( ( nextLocation.y + 1 ) * worldMap.tileHeight ) );
    }
    else
    {
        return null;
    }
}

function get_tile_index( x, y )
{
    var colIdx = clamp( Math.floor(x / worldMap.tileWidth), 0, worldMap.width - 1 );
    var rowIdx = clamp( Math.floor(y / worldMap.tileHeight), 0, worldMap.height - 1 );
    return new Pos( colIdx, rowIdx );
}

function get_tile_type( x, y )
{
    var pos = get_tile_index( x, y );
    return worldMap.mapGrid[ pos.y ][ pos.x ];
}

function find_grass_path( start, end )
{
    var startPos = get_tile_index( start.x, start.y );
    var endPos = get_tile_index( end.x, end.y );
    return search_path( worldMap.mapGrid, startPos, endPos, false );
}