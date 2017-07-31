dream.control  = (function () {
    dream.controlConfig = {
        actor:{
            chara: null,
            x:0,
            y:0,
            width:40,
            height:40,
            final:false
        },
        /*
        * moveLimit需要通过初始化函数初始化
        * */
        moveLimit:{
            edgeMniX:0,
            edgeMaxX:0
        }
    };

    var config = {
        init:false
    };

    var initControl = function () {
        var canvas = $('#dream_canvas');
        dream.controlConfig.actor.x = Math.floor(parseInt(canvas.css('width'))/2);
        dream.controlConfig.actor.y = Math.floor(parseInt(canvas.css('height'))/5);
        dream.controlConfig.actor.width = Math.floor(parseInt(canvas.css('height'))/20);
        dream.controlConfig.actor.height = dream.controlConfig.actor.width;
        dream.timer.updateQueue(listenControl,'listenControl');
    };

    var initTest = function () {
        return config.init;
    };

    var initMoveLimit = function () {
        dream.controlConfig.moveLimit.edgeMinX = dream.screen.terrainRandom.getScreenLimit().edgeMinX;
        dream.controlConfig.moveLimit.edgeMaxX = dream.screen.terrainRandom.getScreenLimit().edgeMaxX;
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
            dream.controlConfig.actor.chara = dream.screen.character.getActor();
            dream.control.keyboard.initActorControl();
            initMoveLimit();
            return true;
        }
        return false;
    };

    return {
        initControl:initControl,
        initTest:initTest
    };
}());