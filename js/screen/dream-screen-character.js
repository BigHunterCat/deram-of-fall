/*
* 用于角色的控制
* */
dream.screen.character = (function () {
    var config = {
        init:false
    };


    /*
    * 作用:
        * 绘制和控制actor
    * 参数:
        * pictureName:角色图片
    * return:
        * true:成功
        * false:失败
    * */
    var drawActor = function (pictureName) {
        dream.screen.load.stage(pictureName)
    };

    var listenCharacter = function () {
        if(getActor!==undefined){
            dream.timer.removeQueue('listenCharacter');
            config.init = true;
        }
    };

    dream.timer.updateQueue(listenCharacter,'listenCharacter');

    /*
    * 作用:
        * 返回actor对象的id
    * 参数:
    * return:
        * true:
        * false:
    * */
    var getActor = function () {
        return dream.screen.load.getPhoto('actor');
    };

    var initTest = function () {
        return config.init;
    };


    return {
        getActor:getActor,
        initTest:initTest,
        drawActor:drawActor
    };
}());