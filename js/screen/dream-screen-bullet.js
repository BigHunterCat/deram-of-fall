dream.screen.bullet = (function () {
    var config = {
        /*bulletDataReady为真时,才可以交给碰撞检测程序*/
        bulletDataReady:false,
        actor:{},
        container:null,
        bullet:{},
        bulletArray:[],
        fire:{},
        bulletSpeed:15,
        reloadNum:0,
        bulletNum:15
    };

    /*
    * 作用:
    * 初始化
    * return:
    * true:成功
    * */
    var init = (function () {
        initContainer();
    });

    /*
    * 作用:
        * 获取子弹精灵
    * 参数:none
    * return:
        * true:成功
        * false:失败
    * */
    var initContainer = function () {
         config.fire = dream.screen.load.getPhoto('fire1');
         config.container = new PIXI.ParticleContainer(100000);
         dream.screenConfig.pixiCanvas.stage.addChild(config.container);
         return true;
     };


    var initBulletObj = function (sx,sy) {
        config.bullet = new PIXI.Sprite.fromImage('img/bullet/bullet1/Gun2_03.png');
        config.container.addChild(config.bullet);
        return {
            sprite:config.bullet,
            sx:sx,
            sy:sy,
            die:false,
            speedX:0,
            speedY:0
        };
    };

    /*
    * 作用:
        * 准备弹道数据
        * 每发射15发子弹装填一次
    * 参数:
        * sx:起始x
        * sy:起始y
        * x:终点x
        * y:终点y
    * return:
        * true:
        * false:
    * */
    var readyTrajectory = function (sx,sy,x,y,gunType) {
        if(gunType==='shotgun'){
            config.reloadNum = -1;
        }
        if(config.reloadNum<config.bulletNum){
            config.reloadNum++;
            var bulletObj = initBulletObj(sx,sy);
            config.bulletArray.push(bulletObj);
            bulletPath(x,y);
        }
    };


    /*
    * 作用:
        * 计算子弹飞行路径
    * 参数:none
    * return:none
    * */
    var bulletPath = function (x,y) {
        var length = config.bulletArray.length-1;
        config.bulletArray[length].sprite.x =  x;
        config.bulletArray[length].sprite.y =  y;
        config.bulletArray[length].sprite.width = 30;
        config.bulletArray[length].sprite.height = 30;
        var dx = (config.bulletArray[length].sx-x)*(config.bulletArray[length].sx-x);
        var dy = (config.bulletArray[length].sy-y)*(config.bulletArray[length].sy-y);
        var distance = Math.sqrt(dx+dy);
        var move = Math.floor(distance/config.bulletSpeed);
        var speedX = Math.floor((config.bulletArray[length].sx-x)/move);
        var speedY = Math.floor((config.bulletArray[length].sy-y)/move);
        config.bulletArray[length].speedX = speedX;
        config.bulletArray[length].speedY = speedY;
    };

    var check = function () {
        if(config.bulletArray.length!==0){
            var bound = initBound();
            config.bulletDataReady = false;
            for(var i=0;i<config.bulletArray.length;i++){
                if(config.bulletArray[i].sprite.x>bound.maxX||config.bulletArray[i].sprite.x<bound.minX||
                    config.bulletArray[i].sprite.y>bound.maxY||config.bulletArray[i].sprite.y<bound.minY){

                }
                config.bulletArray[i].sprite.x =
                    config.bulletArray[i].sprite.x + config.bulletArray[i].speedX;

                config.bulletArray[i].sprite.y =
                    config.bulletArray[i].sprite.y + config.bulletArray[i].speedY;
            }
            config.bulletDataReady = true;
            bulletDieCheck();
        }
    };

    var bulletDieCheck = function () {
        var bullet = dream.screen.collide.getBulletCollideResult();
        if(bullet!==false){
            // debugger;
            /*更新数据*/
            for(var i=0;i<config.bulletArray.length;i++){
                config.bulletArray[i].die = bullet[i].die;
                if(config.bulletArray[i].die){
                    config.bulletArray[i].x = dream.screenConfig.canvas_width+1000;
                    config.bulletArray[i].y = dream.screenConfig.canvas_height+1000;
                }
            }
        }
    };

    var getBulletArray = function () {
        if(config.bulletDataReady===false){
            return false;
        }
        return config.bulletArray;
    };

    /*
    * 作用:
        * 设置游戏边界
    * 参数:none
    * return:none
    * */
    var initBound = function () {
        var bound = {};
        bound.maxX = dream.controlConfig.moveLimit.edgeMaxX;
        bound.maxY = dream.controlConfig.moveLimit.edgeMaxY;
        bound.minX = dream.controlConfig.moveLimit.edgeMinX;
        bound.minY = dream.controlConfig.moveLimit.edgeMinY;
        return bound;
    };

    dream.timer.updateQueue(check,'check');

    return {
        init:init,
        readyTrajectory:readyTrajectory,
        getBulletArray:getBulletArray
    };
}());