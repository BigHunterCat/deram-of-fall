/*
* 用于角色的控制
* */
dream.screen.character = (function () {
    var config = {
        init:false
    };

    /*
    * 作用:
        * 图片就绪后执行的回调函数
    * 参数:none
    * return:
        * true:
        * false:
    * */
    var initModule = function () {
        config.init = true;
    };

    /*
    * 作用:
        * 监听图片资源是否被缓存好
        * 如果换成好就执行初始化函数
    * 参数:none
    * return:
        * true:
        * false:
    * */
    var listenCharacter = function () {
        if(dream.screen.load.initTest()){
            dream.timer.removeQueue('listenCharacter');
            dream.screenConfig.characterInitLoad = true;
            initModule();
        }
    };

    /*
    * 作用:
        * 绘制和控制actor
    * 参数:
        * actor:该对象目前包含角色图片,坐标和宽高,用于控制actor
    * return:
        * true:成功
        * false:失败
    * */
    var drawActor = function (actorObj) {
        dream.screen.draw.drawScreen(actorObj.chara,actorObj.x,actorObj.y,
            actorObj.width,actorObj.height,dream.screenConfig.canvasId);
    };

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

    /*
    * 作用:
        * 检查图片是否已被缓存
        * 输入图片名,则未被缓存时,返回false
        * 缓存时返回该图片
    * 参数:none
    * return:
        * true:已缓存
        * false:未缓存
    * */
    var testPhoto = function (photoName) {
        if(photoName===undefined){
            return dream.screen.load.initTest();
        }
        return dream.screen.load.getPhoto(photoName);
    };

    /*
    * 作用:
        * 查看dream.screen.character对象是否已经初始化
    * 参数:
    * return:
        * true:
        * false:
    * */
    var initTest = function () {
        return config.init;
    };

    return {
        initTest:initTest,
        getActor:getActor,
        drawActor:drawActor,
        testPhoto:testPhoto
    };
}());