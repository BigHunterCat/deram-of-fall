/*
* return:
    * pre_photoReady:
        * 用于准备需要缓存的数据
    * photoCache:
        * 提交给缓存模块缓存
    * getPhoto:
        * 获得指定的图片
* */
dream.screen.load = (function () {
    /*
    * init用于确认是否已经初始化
    * */
    var config = {
        init :false,
        sourceName:'game_photo',
        sourceType:'photo',
        photoNum:0
    };
    /*
    * cache
    * */
    var cache = {

    };

    /*
    * 作用:
        * 初始化load
    * */
    var init = function () {

    };

    /*
    * 作用:
        * 预读取并添加所有需要的图片
    * 参数:
        * pictureName:图片名
        * pictureSrc:图片路径
    * return:
        * true:成功
        * false:失败
    * */
    var pre_pictureLoad = function (pictureName,pictureSrc) {
        cache[pictureName] = new PIXI.Sprite.fromImage(pictureSrc);
        config.init = true;
        return true;
    };

    /*
     * 作用:
         * 添加指定图片到canvas中
     * 参数:
         * pictureName:图片名
     * return:
         * true:成功
     * */
    var stage = function (pictureName) {
        dream.screenConfig.pixiCanvas.stage.addChild(cache[pictureName]);
    };

    /*
    * 作用:
        * 销毁指定图片
    * 参数:
        * pictureName:图片名
    * return:
        * true:成功
    * */
    var destroy = function (pictureName) {
        console.log('done');
        if(cache[pictureName]!==undefined){
            cache[pictureName].destroy();
        }
    };

    /*
    * 作用:
        * 获得指定的已缓存的图片精灵
        * 如果不指定返回所有已缓存图片精灵
    * 参数:
        * pictureName:图片名
    * return:
        * true:返回缓存
        * false:失败
    * */
    var getPhoto = function (pictureName) {
        if(config.init){
            if(pictureName!=='string'){
                error.getErrorMessage('parameter is not string');
            }
            return cache[pictureName];
        }
        return 'config.init is false.';
    };

    /*
     * 作用;
         * 查看dream.screen.load对象是否已经初始化
     * 参数:none
     * return:
         * true:
         * false:
     * */
    var initTest = function () {
        return config.init;
    };


    return {
        pre_pictureLoad:pre_pictureLoad,
        getPhoto:getPhoto,
        stage:stage,
        destroy:destroy,
        initTest:initTest
    };
}());