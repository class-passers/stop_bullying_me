var Unit = function( unitType )
{
    return Object.create( UnitInfo[unitType] );
};

var Tower = function( towerType )
{
    return Object.create( TowerInfo[towerType] );
};

var UnitInfo = {
    normal : {
        name : "normal",
        width : 128,
        height : 128,
        hp : 120,
        moveSpeed : 50      // pixel per seconds
    },
    fast : {
        name : "fast",
        width : 128,
        height : 128,
        hp : 80,
        moveSpeed : 70
    },
    heavy : {
        name : "heavy",
        width : 200,
        height : 200,
        hp : 300,
        moveSpeed : 30

    },
    ranged : {
        name : "ranged",
        width : 128,
        height : 128,
        hp : 100,
        moveSpeed : 50
    }
};

var BossInfo = {
    heavy : {
        name : "heavy",
        hp : 300,
        moveSpeed : 30,
        attackRange : 60,
        attackSpeed : 1500,
        attackPower : 30,

    },
    ranged : {
        name : "ranged",
        hp : 100,
        moveSpeed : 45,
        attackRange : 250,
        attackSpeed : 500,
        attackPower : 10,
    }
};

var TowerInfo =
{
    normal : {
        name : "normal",
        hp : 100,
        attackRange : 200,      // 200 pixels
        attackSpeed : 1000,     // once per second
        attackPower : 15
    }
};
