dream.control  = (function () {
    dream.controlConfig = {
        actor:{
        },
        /*
        * moveLimit需要通过初始化函数初始化
        * */
        moveLimit:{
            edgeMinX:0,
            edgeMaxX:0,
            edgeMinY:0,
            edgeMaxY:0
        }
    };

    var config = {
        init:false,
        actorName:'actor'
    };

    var initControl = function () {
        dream.timer.updateQueue(listenControl,'listenControl');
    };

    var initTest = function () {
        return config.init;
    };

    var initMoveLimit = function () {
        dream.controlConfig.moveLimit.edgeMinX = 0;
        dream.controlConfig.moveLimit.edgeMaxX = dream.screenConfig.canvas_width - dream.controlConfig.actor.width;
        dream.controlConfig.moveLimit.edgeMinY = 0;
        dream.controlConfig.moveLimit.edgeMaxY = dream.screenConfig.canvas_height - dream.controlConfig.actor.height;
    };

    /*
    * 作用:
    * 初始化角色位置信息
    * */
    var initActorPosition = function () {
        dream.controlConfig.actor = dream.screen.character.getActor();
        dream.controlConfig.actor.x = dream.screenConfig.canvas_width/2;
        dream.controlConfig.actor.y = dream.screenConfig.canvas_height/10;
        dream.controlConfig.actor.width = Math.floor(dream.screenConfig.canvas_width/40);
        dream.controlConfig.actor.height = dream.controlConfig.actor.width;
        dream.screen.character.drawActor(config.actorName)
    };

    /*
    * 作用:
        * 在音乐和图片初始化后才执行控制初始化
    * 参数:none
    * return:
        * true:成功
        * false:失败
    * */
    var listenControl = function () {
        var screenInit = dream.screenConfig.initLoad;
        var musicInit = dream.musicConfig.initLoad;
        if((screenInit===true)&&(musicInit===true)){
            dream.timer.removeQueue('listenControl');
            config.init = true;
            clearUnnecessaryFunction();
            dream.control.keyboard.initActorControl();
            initActorPosition();
            initMoveLimit();

            return true;
        }
        return false;
    };

    var clearUnnecessaryFunction = function () {
        /*
        * 清除默认右键功能
        * */
        document.oncontextmenu=function(){
            return false;
        };
    };

    var getActor = function () {
        return  dream.controlConfig.actor;
    };

    return {
        initControl:initControl,
        initTest:initTest,
        getActor:getActor
    };
}());