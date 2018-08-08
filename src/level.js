var levels = [
    {   // for level 1
        num_zombies : 15,
        remaining_zombies : 15,
        populate_zombie_info : [
            {
                start : 5,          // when to start populating a zombie in seconds
                interval : 5,       // interval time for populating a zombie in seconds
                type : "normal",    // what type of zombie
                amount : 8,         // how many zombies are populated.
                remaining : 8,
                timer : null        // just for timer variable
            },
            {
                start : 10,
                interval : 4,
                type : "fast",
                amount : 6,
                remaining : 6,
                timer : null
            }
        ],
        populate_boss_info : [
            {
                start : 35,
                interval : 0,
                type : "heavy",
                amount : 1,
                remaining : 1,
                timer : null
            }
        ],
        populate_timer : null,
        map : level0_map,
		start_money : 200
    },
    {   // for level 2
        num_zombies : 23,
        remaining_zombies : 23,
        populate_zombie_info : [
            {
                start : 5,          // when to start populating a zombie in seconds
                interval : 5,       // interval time for populating a zombie in seconds
                type : "normal",    // what type of zombie
                amount : 10,         // how many zombies are populated.
                remaining : 10,
                timer : null        // just for timer variable
            },
            {
                start : 10,
                interval : 4,
                type : "fast",
                amount : 10,
                remaining : 10,
                timer : null
            },
            {
                start : 25,
                interval : 5,
                type : "healer",
                amount : 1,
                remaining : 1,
                timer : null
            }

        ],
        populate_boss_info : [
            {
                start : 30,
                interval : 15,
                type : "heavy",
                amount : 2,
                remaining : 2,
                timer : null
            }
        ],
        populate_timer : null,
        map : level1_map,
        start_money : 250
    },
    {   // for level 3
        num_zombies : 30,
        remaining_zombies : 30,
        populate_zombie_info : [
            {
                start : 5,          // when to start populating a zombie in seconds
                interval : 5,       // interval time for populating a zombie in seconds
                type : "normal",    // what type of zombie
                amount : 15,         // how many zombies are populated.
                remaining : 15,
                timer : null        // just for timer variable
            },
            {
                start : 10,
                interval : 4,
                type : "fast",
                amount : 10,
                remaining : 10,
                timer : null
            },
            {
                start : 25,
                interval : 15,
                type : "healer",
                amount : 2,
                remaining : 2,
                timer : null
            }

        ],
        populate_boss_info : [
            {
                start : 30,
                interval : 15,
                type : "heavy",
                amount : 3,
                remaining : 3,
                timer : null
            }
        ],
        populate_timer : null,
        map : level2_map,
        start_money : 300
    }
];
