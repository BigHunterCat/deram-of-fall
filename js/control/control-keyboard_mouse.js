dream.control.keyboard  = (function () {
    var config = {
        time:0,
        actorName:'actor',
        /*
        * currentKey为当前按下的键
        * */
        keyboardMap: {
            KeyCount:0,
            previousKey:null,
            currentKey:null,
            // w: 119,
            // s: 115,
            // a: 97,
            // d: 100
            w: 87,
            s: 83,
            a: 65,
            d: 68
        },
        mouseMap:{
            x:0,
            y:0,
            mousePrevious:null,
            mouseCurrent:null,
            mouseLeft:0,
            mouseRight:2,
            fire:true,
            fireRate:5
        },
        /*
        * moveX为横向移动速度
        * speed为加速度是moveX的执行倍数
        * */
       moveControl:{
           moveX:1,
           moveY:1,
           speed:5
       }
    };

    var move = {};

    move.up = function () {
        var actor =  dream.screen.load.getPhoto(config.actorName);
        for(var i=0;i<config.moveControl.speed;i++){
            if(actor.y<dream.controlConfig.moveLimit.edgeMinY){
                actor.y = dream.controlConfig.moveLimit.edgeMinY;
            }
            actor.y -= config.moveControl.moveY;
        }
    };

    move.down = function () {
        var actor =  dream.screen.load.getPhoto(config.actorName);
        for(var i=0;i<config.moveControl.speed;i++){
            if(actor.y>dream.controlConfig.moveLimit.edgeMaxY){
                actor.y = dream.controlConfig.moveLimit.edgeMaxY;
            }
            actor.y += config.moveControl.moveY;
        }
    };

    /*
    * 左移动函数
    * */
    move.left = function () {
        var actor =  dream.screen.load.getPhoto(config.actorName);
        for(var i=0;i<config.moveControl.speed;i++){
            if(actor.x<dream.controlConfig.moveLimit.edgeMinX){
                actor.x = dream.controlConfig.moveLimit.edgeMinX
            }
            actor.x -= config.moveControl.moveX;
        }
    };

    /*
    * 右移动函数
    * */
    move.right = function () {
        var actor =  dream.screen.load.getPhoto(config.actorName);
        for(var i=0;i<config.moveControl.speed;i++){
            if(actor.x>dream.controlConfig.moveLimit.edgeMaxX){
                actor.x = dream.controlConfig.moveLimit.edgeMaxX
            }
            actor.x += config.moveControl.moveX;
        }
    };
    /*Begin 键盘*/
    /*
    * 作用:
        * 通过判断按键来决定如何移动
    * 参数:none
    * return:
        * true:
        * false:
    * */
    var actorMove = function () {
        switch (config.keyboardMap.currentKey){
            case config.keyboardMap.w:
                move.up();
                break;
            case config.keyboardMap.s:
                move.down();
                break;
            case config.keyboardMap.a:
                move.left();
                break;
            case config.keyboardMap.d:
                move.right();
                break;
            default:
                break;
        }
    };

    /*
    * 作用:
    * 按下键盘时,给currentKey赋予按下的键位代码
    * 参数:none
    * return:
        * true:
        * false:
    * */
    var keyPress = function () {
        // console.log(event.keyCode);
        // console.log(config.keyboardMap.currentKey);
        config.keyboardMap.currentKey = event.keyCode;
    };

    /*
    * 作用:
        * 按照一定的时间间隔重置当前键位为null
    * 参数:none
    * return:
        * true:
        * false:
    * */
    var resetKey = function () {
        config.keyboardMap.currentKey = null;
    };
    /*End 键盘*/

    /*Begin 鼠标*/
    /*
    * 作用:
        * 如果是左键,就立即执行并清空mousePrevious,是右键就先保存,因为右键是一个填弹动作,一个点击一次
    * 参数:none
    * return:
        * true:
        * false:
    * */
    var mouseDown = function () {
        if(event.button===config.mouseMap.mouseRight){
            config.mouseMap.mousePrevious = event.button;
            return 'reload is ready.';
        }
        config.mouseMap.mousePrevious = null;
        config.mouseMap.mouseCurrent = event.button;
    };

    /*
    * 作用:
        * 如果上一次点击是右键就执行填弹,不是就什么都不干
    * 参数:none
    * return:
        * true:
        * false:
    * */
    var mouseUp = function () {
        if(config.mouseMap.mousePrevious===config.mouseMap.mouseRight){
            config.mouseMap.mouseCurrent = config.mouseMap.mousePrevious;
            config.mouseMap.mousePrevious = null;
            return 'reload is ready.';
        }
        config.mouseMap.mouseCurrent = null;
    };

    var shootingLeftMouse = function () {
        // console.log('shooting');
        var x = dream.controlConfig.actor.x;
        var y = dream.controlConfig.actor.y;
        dream.screen.bullet.readyTrajectory(config.mouseMap.x,config.mouseMap.y,x,y);
        config.mouseMap.fire = false;
    };

    var shootingRightMouse = function () {
        // console.log('reload');
        config.mouseMap.mouseCurrent = null;
        var x = dream.controlConfig.actor.x;
        var y = dream.controlConfig.actor.y;
        dream.screen.bullet.readyTrajectory(config.mouseMap.x,config.mouseMap.y,x,y,'shotgun');
    };

    var mousemove = function () {
        config.mouseMap.x = event.clientX;
        config.mouseMap.y = event.clientY;
    };
    /*
    * 作用:
    * 控制射速
    * */
    var fireRateControl = function () {
        var interval = 60/10;
        config.time++;
        if(config.time===interval){
            config.time = 0;
            config.mouseMap.fire = true;
        }
        return config.mouseMap.fire;
    };

    var actorShooting = function () {
        if(fireRateControl()){
            switch (config.mouseMap.mouseCurrent){
                case config.mouseMap.mouseLeft:
                    shootingLeftMouse();
                    break;
                case config.mouseMap.mouseRight:
                    shootingRightMouse();
                    break;
                default:
                    break;
            }
        }
    };
    /*End 鼠标*/
    /*
      * 作用:
          * 读取要控制的对象,并附加移动功能
          * 目前仅限图片
      * 参数:
          * actor:要控制的对象
      * return:
          * true:
          * false:
      * */
    var initActorControl = function () {
        document.addEventListener('keydown',keyPress);
        document.addEventListener('keyup',resetKey);
        document.addEventListener('mousedown',mouseDown);
        document.addEventListener('mouseup',mouseUp);
        document.addEventListener('mousemove',mousemove);
        dream.timer.updateQueue(actorMove,'actorMove');
        dream.timer.updateQueue(actorShooting,'actorShooting');
    };



    return {
        initActorControl:initActorControl
    };
}());