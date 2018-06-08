var levels = [
    {
        //max_zombies : 6,
        remaining_zombies : 14,
        populate_info : [
            {
                start : 0,          // when to start populating a zombie in seconds
                interval : 5,       // interval time for populating a zombie in seconds
                type : "normal",    // what type of zombie
                amount : 8,         // how many zombies
                timer : null        // just for timer variable,
            },
            {
                start : 3,
                interval : 4,
                type : "fast",
                amount : 6,
                timer : null
            },
        ],
        boss_zombie_type : "heavy",
        populate_timer : null,
        map : level0_map
    }
];
