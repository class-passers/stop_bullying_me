
var ZombieInfo = {
    normal : {
        name : "normal",
        width : 128,
        height : 128,
        hp : 120,
		moveSpeed : 80,      // pixel per seconds
        attackRange : 180,
        attackSpeed : 1.5,
        attackPower : 20,
		reward : 5
    },
    fast : {
        name : "fast",
        width : 128,
        height : 128,
        hp : 80,
        moveSpeed : 90,
        attackRange : 180,
        attackSpeed : 1,
		attackPower : 10,
        reward : 7
    },
    heavy : {
        name : "heavy",
        width : 200,
        height : 200,
        hp : 300,
        moveSpeed : 50,
        attackRange : 180,
        attackSpeed : 2,
		attackPower : 40,
        reward : 10
    },
    ranged : {
        name : "ranged",
        width : 128,
        height : 128,
        hp : 100,
        moveSpeed : 70,
        attackRange : 280,
        attackSpeed : 1.5,
		attackPower : 10,
        reward : 7
    },
    healer : {
        name : "healer",
        width : 128,
        height : 128,
        hp : 150,
        moveSpeed : 60,
        attackRange : 250,
        attackSpeed : 2,
        attackPower : 15,
        healRange : 150,        // this matters if his heal skill is an area of effect.
        reward : 10
    },
    wizard : {
        name : "wizard",
        width : 128,
        height : 128,
        hp : 100,
        moveSpeed : 60,
        attackRange : 280,
        attackSpeed : 1.5,
        attackPower : 7,
        damageRange : 150,
        cost : 150,
        reward : 10
    }

};

var ZombieBossInfo = {
    heavy : {
        name : "heavy",
        width : 300,
        height : 300,
        hp : 300,
        moveSpeed : 30,
        attackRange : 180,
        attackSpeed : 2,
        attackPower : 60,
		reward : 20
    }
};

var HumanTroopInfo = {
    normal : {
        name : "normal",
        width : 128,
        height : 128,
        hp : 120,
        moveSpeed : 60,      // pixel per seconds
        attackRange : 180,
        attackSpeed : 1,
        attackPower : 15,
        cost : 50,
        reward : 5
    },
    fast : {
        name : "fast",
        width : 128,
        height : 128,
        hp : 80,
        moveSpeed : 70,
        attackRange : 180,
        attackSpeed : 0.5,
        attackPower : 10,
        cost : 70,
        reward : 7
    },
    heavy : {
        name : "heavy",
        width : 200,
        height : 200,
        hp : 300,
        moveSpeed : 50,
        attackRange : 180,
        attackSpeed : 2,
        attackPower : 40,
        cost : 120,
        reward : 10
    },
    ranged : {
        name : "ranged",
        width : 128,
        height : 128,
        hp : 100,
        moveSpeed : 60,
        attackRange : 280,
        attackSpeed : 1,
        attackPower : 5,
        cost : 80,
        reward : 7
    },
    healer : {
        name : "healer",
        width : 128,
        height : 128,
        hp : 150,
        moveSpeed : 60,
        attackRange : 250,
        attackSpeed : 2,
        attackPower : 15,
        healRange : 150,        // this matters if his heal skill is an area of effect.
        cost : 80,
        reward : 10
    },
    wizard : {
        name : "wizard",
        width : 128,
        height : 128,
        hp : 100,
        moveSpeed : 60,
        attackRange : 280,
        attackSpeed : 1,
        attackPower : 5,
        damageRange : 150,
        cost : 150,
        reward : 10
    }
};


var HumanBossInfo = {
    heavy : {
        name : "heavy",
        width : 300,
        height : 300,
        hp : 300,
        moveSpeed : 30,
        attackRange : 180,
        attackSpeed : 2,
        attackPower : 60,
        cost : 200,
        reward : 20
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
        attackSpeed : 1,     // once per second
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
        attackSpeed : 1,     // once per second
        attackPower : 10,
        cost : 80,
        build_interval : 5000
    },
    wizard : {
        name : "wizard",
        hp : 100,
        width : 85,
        height : 133,
        attackRange : 200,      // 200 pixels
        attackSpeed : 1000,     // once per second
        attackPower : 10,
        cost : 100,
        build_interval : 6000
    }
};



var BaseInfo =
[
    {
        name : "level0",
        hp : 300,
        width : 300,
        height : 250,
        attackRange : 200,      // 200 pixels
        attackSpeed : 1.5,     // once per second
        attackPower : 20,
        cost : 1000,
        build_interval : 5000
    },
    {
        name : "level1",
        hp : 400,
        width : 300,
        height : 250,
        attackRange : 200,      // 200 pixels
        attackSpeed : 1.5,
        attackPower : 20,
        cost : 1000,
        build_interval : 5000
    },
    {
        name : "level2",
        hp : 500,
        width : 300,
        height : 250,
        attackRange : 200,      // 200 pixels
        attackSpeed : 1.5,
        attackPower : 20,
        cost : 1000,
        build_interval : 5000
    }
];