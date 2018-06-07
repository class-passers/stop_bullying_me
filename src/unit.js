var Unit = function( unitType )
{
    return Object.create( UnitInfo[unitType] );
};

var Tower = function( towerType )
{
    return Object.create( TroopInfo[towerType] );
};

var UnitInfo = {
    normal : {
        name : "normal",
        hp : 120,
        speed : 50      // pixel per seconds
    },
    fast : {
        name : "fast",
        hp : 80,
        speed : 70
    },
    heavy : {
        name : "heavy",
        hp : 300,
        speed : 30
    }
};

var TroopInfo =
{
    normal : {
        name : "normal",
        hp : 100,
        attackRange : 200,      // 200 pixels
        attackSpeed : 1000,     // once per second
        attackPower : 25
    }
};
