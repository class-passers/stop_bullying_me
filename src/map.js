console.log(level0_map);
/*
var map_data_file = "map/level0.json";
var request = new XMLHttpRequest();

request.open('GET', map_data_file);
request.responsetype = 'json';
request.send();


request.onreadystatechange = function()
{
    //console.log("onreadystatechange ");
    if (this.readyState === 4 && this.status === 200 && worldMap.loaded === false ) {
        loadMapData();
    }
};
//request.onload = function() {
    //console.log("onload");
    //loadMapData();
//};

*/

var worldMap = {
    width : 0,
    height : 0,
    tileWidth : 0,
    tileHeight : 0,
    loaded : false,
    movePath : null
};

loadMapData();
function loadMapData()
{
    //console.log("loadMapData");

    //var result = request.response;
    var jsonData = level0_map;
    console.log(jsonData);

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