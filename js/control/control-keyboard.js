dream.control.keyboard  = (function () {
    var config = {
        /*
        * q暂时作为退出键
        * currentKey为当前按下的键
        * */
        keyboardMap: {
            currentKey:null,
            a: 97,
            s: 115,
            d: 100,
            q: 113
        },
        /*
        * moveX为横向移动速度
        * speed为加速度是moveX的执行倍数
        * */
       moveControl:{
           moveX:1,
           speed:15
       }
    };

    /*
    * 左移动函数
    * */
    var leftMove = function () {
        var edgeMinX = dream.controlConfig.actor.x - config.moveControl.moveX;
        for(var i=0;i<config.moveControl.speed;i++){
            if(edgeMinX<dream.controlConfig.moveLimit.edgeMinX){
                dream.controlConfig.actor.x = dream.controlConfig.moveLimit.edgeMinX
            }
            dream.controlConfig.actor.x -= config.moveControl.moveX;
            dream.screen.character.drawActor(dream.controlConfig.actor);
        }
    };

    /*
    * 右移动函数
    * */
    var rightMove = function () {
        var edgeMaxX = dream.controlConfig.actor.x + config.moveControl.moveX;
        for(var i=0;i<config.moveControl.speed;i++){
            if(edgeMaxX>dream.controlConfig.moveLimit.edgeMaxX){
                dream.controlConfig.actor.x = dream.controlConfig.moveLimit.edgeMaxX
            }
            dream.controlConfig.actor.x += config.moveControl.moveX;
            dream.screen.character.drawActor(dream.controlConfig.actor);
        }
    };

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
            case config.keyboardMap.a:
                leftMove();
                break;
            case config.keyboardMap.d:
                rightMove();
                break;
            default:
                dream.screen.character.drawActor(dream.controlConfig.actor);
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
        config.keyboardMap.currentKey = event.keyCode;
    };

    /*
    * 作用:
    * 松开键盘时,给currentKey赋予null
    * 参数:none
    * return:
        * true:
        * false:
    * */
    var keyUp = function () {
        config.keyboardMap.currentKey = null;
    };

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
        document.addEventListener('keypress',keyPress);
        document.addEventListener('keyup',keyUp);
        dream.timer.updateQueue(actorMove,'actorMove');
    };

    return {
        initActorControl:initActorControl
    };
}());