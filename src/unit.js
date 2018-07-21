var Zombie = function( unitType )
{
    return Object.create( ZombieInfo[unitType] );
};

var Boss = function( unitType )
{
    return Object.create( BossInfo[unitType] );
};

var Human = function( unitType )
{
    return Object.create( HumanTroopInfo[unitType] );
};

var Tower = function( towerType )
{
    return Object.create( TowerInfo[towerType] );
};

var ZombieInfo = {
    normal : {
        name : "normal",
        width : 128,
        height : 128,
        hp : 120,
		moveSpeed : 50,      // pixel per seconds
        attackRange : 200,
        attackSpeed : 2000,
        attackPower : 20,
		reward : 5
    },
    fast : {
        name : "fast",
        width : 128,
        height : 128,
        hp : 80,
        moveSpeed : 70,
        attackRange : 200,
        attackSpeed : 2000,
		attackPower : 10,
        reward : 7
    },
    heavy : {
        name : "heavy",
        width : 200,
        height : 200,
        hp : 300,
        moveSpeed : 10,
        attackRange : 150,
        attackSpeed : 2000,
		attackPower : 40,
        reward : 10
    },
    ranged : {
        name : "ranged",
        width : 128,
        height : 128,
        hp : 100,
        moveSpeed : 50,
        attackRange : 150,
        attackSpeed : 2000,
		attackPower : 10,
        reward : 7
    },
    healer : {
        name : "healer",
        width : 128,
        height : 128,
        hp : 150,
        moveSpeed : 50,
        attackRange : 300,
        attackSpeed : 2000,
        attackPower : 10,
        healRange : 150,
        reward : 10
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

var HumanTroopInfo = {
    normal : {
        name : "normal",
        width : 128,
        height : 128,
        hp : 120,
        moveSpeed : 90,      // pixel per seconds
        attackRange : 150,
        attackSpeed : 1000,
        attackPower : 15,
        cost : 50
    },
    fast : {
        name : "fast",
        width : 128,
        height : 128,
        hp : 80,
        moveSpeed : 120,
        attackRange : 150,
        attackSpeed : 500,
        attackPower : 10,
        cost : 70
    },
    heavy : {
        name : "heavy",
        width : 200,
        height : 200,
        hp : 300,
        moveSpeed : 60,
        attackRange : 150,
        attackSpeed : 2000,
        attackPower : 40,
        cost : 120
    },
    ranged : {
        name : "ranged",
        width : 128,
        height : 128,
        hp : 100,
        moveSpeed : 100,
        attackRange : 300,
        attackSpeed : 1000,
        attackPower : 5,
        cost : 80
    },
    wizard : {
        name : "wizard",
        width : 128,
        height : 128,
        hp : 100,
        moveSpeed : 100,
        attackRange : 300,
        attackSpeed : 1000,
        attackPower : 5,
        damageRange : 150,
        cost : 150
    }
};

var TowerInfo =
{
    normal : {
        name : "normal",
        hp : 100,
        width : 85,
        height : 133,
        attackRange : 200,      // 200 pixels
        attackSpeed : 1000,     // once per second
        attackPower : 10,
		cost : 50,
		build_interval : 5000
    },
    ranged : {
        name : "ranged",
        hp : 100,
        width : 85,
        height : 133,
        attackRange : 200,      // 200 pixels
        attackSpeed : 1000,     // once per second
        attackPower : 10,
        cost : 80,
        build_interval : 5000
    }
};

var BaseInfo =
[
    {
        name : "level0",
        hp : 300,
        width : 85,
        height : 133,
        attackRange : 200,      // 200 pixels
        attackSpeed : 1500,     // once per second
        attackPower : 25,
        cost : 1000,
        build_interval : 5000
    },
    {
        name : "level1",
        hp : 400,
        width : 85,
        height : 133,
        attackRange : 200,      // 200 pixels
        attackSpeed : 500,     // once per second
        attackPower : 25,
        cost : 1000,
        build_interval : 5000
    },
    {
        name : "level2",
        hp : 500,
        width : 85,
        height : 133,
        attackRange : 200,      // 200 pixels
        attackSpeed : 500,     // once per second
        attackPower : 25,
        cost : 1000,
        build_interval : 5000
    }
];