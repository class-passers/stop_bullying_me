
var map_data_file = "map/level0.json";
var request = new XMLHttpRequest();
request.open('GET', map_data_file);
request.responsetype = 'json';
request.send();

var mapGrid = null;
var mapWidth = 0;
var mapHeight = 0;
var movePath = null;
request.onload = function()
{
    var result = request.response;
    var jsonData = JSON.parse( result );
    var mapData = jsonData["layers"][0]["data"];

    mapWidth = jsonData["layers"][0]["width"];
    mapHeight = jsonData["layers"][0]["height"];
    //console.log("w = " + mapWidth + ", h = " + mapHeight );
    mapGrid = new Array( mapHeight );
    for( var i = 0; i < mapHeight; i++ ) {
        mapGrid[i] = new Array( mapWidth );
    }

    var mapTileType = jsonData["tilesets"][0]["tiles"];
    for( var idx = 0; idx < mapData.length; idx++ )
    {
        var x = idx % mapWidth;
        var y = Math.floor(idx / mapWidth);
        // Tiled map data index starts at 1, wheres Tileset data index start at 0
        // subtract by 1 to fix inconsistent issue on Tile map data and Tile data
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
    //console.log("map = " + mapGrid );

    movePath = search_path( mapGrid );
    //console.log("path = " + JSON.stringify(movePath ));
};

