var levels = [
    {   // for level 0
        //max_zombies : 6,
        remaining_zombies : 15,
        populate_zombie_info : [
            {
                start : 0,          // when to start populating a zombie in seconds
                interval : 5,       // interval time for populating a zombie in seconds
                type : "normal",    // what type of zombie
                amount : 8,         // how many zombies are populated.
                timer : null        // just for timer variable
            },
            {
                start : 3,
                interval : 4,
                type : "fast",
                amount : 6,
                timer : null
            }
        ],
        populate_boss_info : [
            {
                start : 30,
                interval : 0,
                type : "heavy",
                amount : 1,
                timer : null
            }
        ],
        populate_timer : null,
        map : level0_map
    }
];
