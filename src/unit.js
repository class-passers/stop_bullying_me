var Unit = function( unitType )
{
    return Object.create( UnitInfo[unitType] );
};

var Boss = function( unitType )
{
    return Object.create( BossInfo[unitType] );
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
		moveSpeed : 50,      // pixel per seconds
		attackPower : 10,
		cost : 5
    },
    fast : {
        name : "fast",
        width : 128,
        height : 128,
        hp : 80,
        moveSpeed : 70,
		attackPower : 5,
		cost : 7 
    },
    heavy : {
        name : "heavy",
        width : 200,
        height : 200,
        hp : 300,
        moveSpeed : 10,
		attackPower : 15,
		cost : 10
    },
    ranged : {
        name : "ranged",
        width : 128,
        height : 128,
        hp : 100,
        moveSpeed : 50,
		attackPower : 10,
		cost : 7
    }
};

var BossInfo = {
    heavy : {
        name : "heavy",
        width : 250,
        height : 250,
        hp : 300,
        moveSpeed : 30,
        attackRange : 150,
        attackSpeed : 2000,
        attackPower : 60,
		cost : 20
    },
    ranged : {
        name : "ranged",
        width : 160,
        height : 160,
        hp : 100,
        moveSpeed : 45,
        attackRange : 250,
        attackSpeed : 500,
        attackPower : 10,
		cost : 20
    }
};

var TowerInfo =
{
    normal : {
        name : "normal",
        hp : 100,
        attackRange : 200,      // 200 pixels
        attackSpeed : 1000,     // once per second
        attackPower : 15,
		cost : 50,
		build_interval : 5000
    }
};

var BaseInfo =
[
    {
        name : "level0",
        hp : 500,
        attackRange : 200,      // 200 pixels
        attackSpeed : 500,     // once per second
        attackPower : 25,
        cost : 1000,
        build_interval : 5000
    },
    {
        name : "level1",
        hp : 500,
        attackRange : 200,      // 200 pixels
        attackSpeed : 500,     // once per second
        attackPower : 25,
        cost : 1000,
        build_interval : 5000
    },
    {
        name : "level2",
        hp : 500,
        attackRange : 200,      // 200 pixels
        attackSpeed : 500,     // once per second
        attackPower : 25,
        cost : 1000,
        build_interval : 5000
    }
];