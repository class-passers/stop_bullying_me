
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
    //console.log(JSON.stringify(jsonData));

    worldMap.width = jsonData["layers"][0]["width"];
    worldMap.height = jsonData["layers"][0]["height"];
    worldMap.tileHeight = jsonData["tileheight"];
    worldMap.tileWidth = jsonData["tilewidth"];


    //console.log("w = " + mapWidth + ", h = " + mapHeight );
    worldMap.mapGrid = new Array( worldMap.height );
    for( var i = 0; i < worldMap.height; i++ ) {
        worldMap.mapGrid[i] = new Array( worldMap.width );
    }

    var mapData = jsonData["layers"][0]["data"];
    var mapTileType = jsonData["tilesets"][0]["tiles"];
    worldMap.image.src = "map/" + jsonData["tilesets"][0]["image"];
    console.log("image = " + worldMap.image.src );
    worldMap.image.onload = function() {
        canvas.width = worldMap.image.width;
        canvas.height = worldMap.image.height;
    }

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

    worldMap.movePath = search_path( worldMap.mapGrid );
    //console.log("path = " + JSON.stringify( worldMap.movePath ));
    worldMap.loaded = true;
}


function get_next_position( index )
{
    if( worldMap.movePath !== null )
    {
        if( index < worldMap.movePath.length ) {
            var nextLocation = worldMap.movePath[index];
            // return bottom left position of the grid
            return new Pos( ( nextLocation.x * worldMap.tileWidth ), ( ( nextLocation.y + 1 ) * worldMap.tileHeight ) );
        }
        else
        {
            console.log("went out of index");
        }
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
        return new Pos( Math.floor(nextLocation.x * worldMap.tileWidth - worldMap.tileWidth * 2.5 ) ,
            Math.floor( nextLocation.y * worldMap.tileHeight + worldMap.tileHeight) );
    }
    else
    {
        return null;
    }
}