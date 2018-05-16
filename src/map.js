
var map_data_file = "map/level0.json";
var request = new XMLHttpRequest();
request.open('GET', map_data_file);
request.responsetype = 'json';
request.send();


var worldMap = {
    width : 0,
    height : 0,
    tileWidth : 0,
    tileHeight : 0,
    movePath : null
};

request.onload = function()
{
    var result = request.response;
    var jsonData = JSON.parse( result );
    //console.log(jsonData);

    worldMap.width = jsonData["layers"][0]["width"];
    worldMap.height = jsonData["layers"][0]["height"];
    worldMap.tileHeight = jsonData["tileheight"];
    worldMap.tileWidth = jsonData["tilewidth"];

    //console.log("w = " + mapWidth + ", h = " + mapHeight );
    var mapGrid = new Array( worldMap.height );
    for( var i = 0; i < worldMap.height; i++ ) {
        mapGrid[i] = new Array( worldMap.width );
    }

    var mapData = jsonData["layers"][0]["data"];
    var mapTileType = jsonData["tilesets"][0]["tiles"];
    for( var idx = 0; idx < mapData.length; idx++ )
    {
        var x = idx % worldMap.width;
        var y = Math.floor(idx / worldMap.width);
        // Tiled map data index starts from 1, wheres Tileset type id starts from 0
        // subtract by 1 to fix inconsistent issue on Tile map data and Tile id
        var tileData = mapData[idx] - 1;

        if( tileData in mapTileType )
        {
            mapGrid[y][x] = parseInt( mapTileType[tileData]['type'] );
        }
        else
        {
            mapGrid[y][x] = 0;
        }
    }

    worldMap.movePath = search_path( mapGrid );
    //console.log("path = " + JSON.stringify( worldMap.movePath ));
};


function get_next_position( index )
{
    if( worldMap.movePath !== null )
    {
        if( index < worldMap.movePath.length ) {
            var nextLocation = worldMap.movePath[index];
            return new position(nextLocation.x * worldMap.tileWidth + worldMap.tileWidth / 2, nextLocation.y * worldMap.tileHeight + worldMap.tileHeight / 2);
        }
        else
        {
            console.log("went out of index");
        }
    }
    return new position( 0, 0 );
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
        return new position(nextLocation.x * worldMap.tileWidth - worldMap.tileWidth * 2 , nextLocation.y * worldMap.tileHeight + worldMap.tileHeight / 2);
    }
    else
    {
        return null;
    }
}