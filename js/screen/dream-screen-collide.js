dream.screen.collide = (function () {
    var config = {
        collideResult:{
            bulletResult:false,
            monsterResult:false
        }
    };

    var collideCheck = function (r1, r2) {
        //Define the variables we'll need to calculate
        var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

        //hit will determine whether there's a collision
        hit = false;

        //Find the center points of each sprite
        r1.centerX = r1.x + r1.width / 2;
        r1.centerY = r1.y + r1.height / 2;
        r2.centerX = r2.x + r2.width / 2;
        r2.centerY = r2.y + r2.height / 2;

        //Find the half-widths and half-heights of each sprite
        r1.halfWidth = r1.width / 2;
        r1.halfHeight = r1.height / 2;
        r2.halfWidth = r2.width / 2;
        r2.halfHeight = r2.height / 2;

        //Calculate the distance vector between the sprites
        vx = r1.centerX - r2.centerX;
        vy = r1.centerY - r2.centerY;

        //Figure out the combined half-widths and half-heights
        combinedHalfWidths = r1.halfWidth + r2.halfWidth;
        combinedHalfHeights = r1.halfHeight + r2.halfHeight;

        //Check for a collision on the x axis
        if (Math.abs(vx) < combinedHalfWidths) {

            //A collision might be occuring. Check for a collision on the y axis
            if (Math.abs(vy) < combinedHalfHeights) {

                //There's definitely a collision happening
                hit = true;
            } else {

                //There's no collision on the y axis
                hit = false;
            }
        } else {

            //There's no collision on the x axis
            hit = false;
        }

        //`hit` will be either `true` or `false`
        return hit;
    };

    var listenCollide = function () {
        var bulletArray = dream.screen.bullet.getBulletArray();
        var monsterArray = dream.screen.monster.getMonsterArray();
        if(bulletArray!==false&&monsterArray!==false){
            // console.log(bulletArray[0].sprite);
            // console.log(monsterArray[0].sprite);
            // debugger;
            var sign = undefined;
            config.collideResult.bulletResult = false;
            config.collideResult.monsterResult = false;
            for(var b=0;b<bulletArray.length;b++){
                for(var m=0;m<monsterArray.length;m++){
                    sign = collideCheck(bulletArray[b].sprite,monsterArray[m].sprite);
                    // console.log(sign);
                    // debugger;
                    bulletArray[b].die = sign;
                    monsterArray[m].die = sign;
                }
            }
            config.collideResult.bulletArray = bulletArray;
            config.collideResult.bulletResult = true;
            config.collideResult.monsterArray = monsterArray;
            config.collideResult.monsterResult = true;
            return true;
        }
        return false;
    };

    var getBulletCollideResult = function () {
        if(config.collideResult.bulletResult===false){
            return false;
        }
        return config.collideResult.bulletArray;
    } ;

    var getMonsterCollideResult = function () {
        if(config.collideResult.monsterResult===false){
            return false;
        }
        return config.collideResult.monsterArray;
    } ;

    dream.timer.updateQueue(listenCollide,'listenCollide');

    return {
        getBulletCollideResult:getBulletCollideResult,
        getMonsterCollideResult:getMonsterCollideResult
    }
}());