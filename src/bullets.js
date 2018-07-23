
var bulletImage = new Image();
bulletImage.src = "img/bullet.png";

// Bullet is a kind of guided projectile so that this always follow the target.
var Bullet = function( x, y, target, damage ) {
    this.objectType = "bullet";
    // x, y should be center position of the bullet
    this.x = x;
    this.y = y;
    this.z = 1000;  // z-order for drawing, when the object needs to be drawn on top of the screen like UI or bullet
    this.width = bulletImage.width;
    this.height = bulletImage.height;
    this.target = target;
    this.damage = damage;


    this.bulletRadius = 10;
    this.bulletSpeed = 200;     // 200 pixels per second

    this.to_be_removed = false;


    this.update = function ( deltaTime ) {
        var target_x = this.target.x + Math.floor( this.target.width / 2 );
        var target_y = this.target.y + Math.floor( this.target.height / 2 );

        var xDist = target_x - this.x;
        var yDist = target_y - this.y;
        var dist = Math.sqrt( xDist * xDist + yDist * yDist );

        this.x += this.bulletSpeed * deltaTime * xDist / dist ;
        this.y += this.bulletSpeed * deltaTime * yDist / dist;
        //console.log( "this = " + this.x + ", " + this.y + " ==> " + this.target.x + ", " + this.target.y + " : " + dist );

        if( isCollided( this, this.target.get_bounding_rect() ) )
        {
            this.target.takeDamage( this.damage );
            this.to_be_removed = true;
        }
    };

    this.render = function (context)
    {
        //context.beginPath();
        //context.arc( this.x, this.y, this.bulletRadius, 0, 2 * Math.PI );
        //context.fillStyle = 'black';
        //context.fill();

        context.drawImage( bulletImage, 0, 0,
            bulletImage.width, bulletImage.height,
            Math.floor(this.x), Math.floor(this.y), bulletImage.width, bulletImage.height );
    };
};



var kunaiImage = new Image();
kunaiImage.src = "img/kunai.png";

// Bullet is a kind of guided projectile so that this always follow the target.
var Kunai = function( x, y, target, damage ) {
    this.objectType = "bullet";
    // x, y should be center position of the bullet
    this.x = x;
    this.y = y;
    this.z = 1000;  // z-order for drawing, when the object needs to be drawn on top of the screen like UI or bullet
    this.width = 32;
    this.height = 64;
    this.target = target;
    this.damage = damage;
    this.angle = 0;


    this.bulletSpeed = 200;     // 200 pixels per second
    this.to_be_removed = false;


    this.update = function ( deltaTime ) {
        var target_x = this.target.x + Math.floor( this.target.width / 2 );
        var target_y = this.target.y + Math.floor( this.target.height / 2 );

        var xDist = target_x - this.x;
        var yDist = target_y - this.y;
        var dist = Math.sqrt( xDist * xDist + yDist * yDist );

        this.x += this.bulletSpeed * deltaTime * xDist / dist ;
        this.y += this.bulletSpeed * deltaTime * yDist / dist;

        this.angle = getAngleInRadian( this, this.target );
        if( xDist < 0 )
            this.angle += Math.PI;

        //console.log( "this = " + this.x + ", " + this.y + " ==> " + this.target.x + ", " + this.target.y + " : " + dist + ", angle = " + this.angle * 180 / Math.PI );

        if( isCollided( this, this.target.get_bounding_rect() ) )
        {
            this.target.takeDamage( this.damage );
            this.to_be_removed = true;
        }
    };

    this.render = function (context)
    {
        //context.beginPath();
        //context.arc( this.x, this.y, this.bulletRadius, 0, 2 * Math.PI );
        //context.fillStyle = 'black';
        //context.fill();

        context.save();
        context.translate( this.x, this.y );
        context.rotate( this.angle );
        context.translate( -this.x, -this.y );
        context.drawImage( kunaiImage, 0, 0,
            kunaiImage.width, kunaiImage.height,
            Math.floor(this.x), Math.floor(this.y), this.width, this.height );
        context.restore();
    };
};


var fireballImage = new Image();
fireballImage.src = "img/fireball.png";

var fireballExplosionImage = new Image();
fireballExplosionImage.src = "img/fireball_explosion.png";

// Bullet is a kind of guided projectile so that this always follow the target.
var Fireball = function( x, y, target, damage, range ) {
    this.objectType = "bullet";
    // x, y should be center position of the bullet
    this.x = x;
    this.y = y;
    this.z = 1000;  // z-order for drawing, when the object needs to be drawn on top of the screen like UI or bullet
    this.width = 32;
    this.height = 32;
    this.target = target;
    this.damage = damage;
    this.damageRange = range;
    this.angle = 0;
    this.spriteIndex = 0;
    this.max_num_sprites = 5;

    this.bulletSpeed = 200;     // 200 pixels per second
    this.to_be_removed = false;

    this.get_source_x = function () {
        return this.get_image_width() * (Math.floor(this.spriteIndex) % 5);
    };

    this.get_image_width =  function()
    {
        return Math.floor( fireballImage.width / this.max_num_sprites );
    };

    this.get_image_height =  function()
    {
        return fireballImage.height;
    };

    this.update = function ( deltaTime ) {
        var target_x = this.target.x + Math.floor( this.target.width / 2 );
        var target_y = this.target.y + Math.floor( this.target.height / 2 );

        var xDist = target_x - this.x;
        var yDist = target_y - this.y;
        var dist = Math.sqrt( xDist * xDist + yDist * yDist );

        this.x += this.bulletSpeed * deltaTime * xDist / dist ;
        this.y += this.bulletSpeed * deltaTime * yDist / dist;

        this.angle = getAngleInRadian( this, this.target );
        if( xDist < 0 )
            this.angle += Math.PI;

        //console.log( "this = " + this.x + ", " + this.y + " ==> " + this.target.x + ", " + this.target.y + " : " + dist + ", angle = " + this.angle * 180 / Math.PI );

        if( isCollided( this, this.target.get_bounding_rect() ) )
        {
            var center = new Pos( this.x + Math.floor( this.width / 2 ), this.y + Math.floor( this.height / 2 ) );
            var targets = FindNearbyZombies( center, this.damageRange );
            for( var i = 0; i < targets.length; i++)
                targets[i].takeDamage( this.damage );
            this.to_be_removed = true;

            gameObjects.push( new Effect( center, fireballExplosionImage, 10, 10, 1, 1 ) );
        }

        this.spriteIndex += 12 * deltaTime;
        if (this.spriteIndex >= this.max_num_sprites) {
            this.spriteIndex = 0;
        }
    };

    this.render = function (context)
    {
        //context.save();
        //context.translate( this.x, this.y );
        //context.rotate( this.angle );
        //context.translate( -this.x, -this.y );
        context.drawImage( fireballImage, this.get_source_x(), 0,
            this.get_image_width(), this.get_image_height(),
            Math.floor(this.x), Math.floor(this.y), this.width, this.height );
        //context.restore();
    };
};

function FindNearbyZombies( pos, range )
{
    var targets = [];
    for( var i = 0; i < gameObjects.length; i++ )
    {
        if( gameObjects[i].objectType == "zombie" && gameObjects[i].hp > 0 )
        {
            var zombie = gameObjects[i];
            var targetPos = new Pos( zombie.x + Math.floor( zombie.width / 2 ), zombie.y + Math.floor( zombie.height / 2 ) );
            var distSq = ( targetPos.x - pos.x ) * ( targetPos.x - pos.x ) + ( targetPos.y - pos.y ) * ( targetPos.y - pos.y );
            if( distSq <= range * range )
            {
                targets.push( zombie );
            }
        }
    }
    return targets;
}

