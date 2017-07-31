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
        * dream.dream-lib.cache的回调函数
        * 执行需要音乐素材的函数
        * 缓存完毕时,config.init为true
    * 参数:none
    * return:
        * true:资源已缓存
        * false:none
    * */
    var initModule = function () {
        config.init = true;
        dream.screenConfig.initLoad = true;
        return true;
    };

    /*
    * 作用:
    * 音乐载入好时取消事件监听并执行初始化函数
    * 参数:none
    * return:
        * true : 载入完成
        * false: 载入未完成
    * */
    var cache_ok = function () {
        config.photoNum--;
        if(config.photoNum<=0){
            for(var photo in cache){
                cache[photo].removeEventListener('load',cache_ok);
            }
            initModule();
            return true;
        }
        return false;
    };

    /*
    * 作用:
        * 该函数给每个资源注册事件监听,以监听载入情况
    * 参数:none
    * return:none
    * */
    var photoCache = function () {
        for(var photo in cache){
            cache[photo].addEventListener('load',cache_ok);
        }
    };

    /*
    * 作用:
        * 预读取所有需要的图片
    * 参数:
        * pictureName:图片名
        * pictureSrc:图片路径
    * return:
        * true:成功
        * false:失败
    * */
    var pre_pictureLoad = function (pictureName,pictureSrc) {
        config.photo = document.createElement('img');
        config.photo.id = pictureName;
        config.photo.src = pictureSrc;
        cache[pictureName] = config.photo;
        config.photoNum++;
        return true;
    };

    /*
    * 作用:
        * 获得指定的已缓存的图片
        * 如果不指定返回所有已缓存图片
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
        return false;
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
        photoCache:photoCache,
        initTest:initTest
    };
}());