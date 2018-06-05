
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
            this.target.unitInfo.hp -= this.damage;
            //console.log("hit : " + JSON.stringify(this.target.unitInfo));
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


