/*
* return:
    * pre_musicReady:
        * 用于准备需要缓存的数据
    * musicCache:
        * 提交给缓存模块缓存
    * getMusic:
        * 获得指定的音乐
* */
dream.music.load = (function () {
    /*
    * init用于确认是否已经初始化
    * */
    var config = {
        init :false,
        sourceName:'game_music',
        sourceType:'music',
        musicNum:0
    };

    /*
    * cache用于保存已缓存的音乐
    * */
    var cache = {};

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
        dream.musicConfig.initLoad = true;
        return true;
    };

    /*
    * 作用:
        * pre_musicReady通过musicSrc读取音乐文件
        * 然后放入cache中
    * 参数:
        * musicName: 音乐名
        * musicSrc: 音乐路径
    * return:
        * true : 返回该对象
        * false: 失败
    * */
    var pre_musicReady = function (musicName,musicSrc) {
        if((typeof musicName!=='string')||(typeof musicSrc!=='string')){
            error.getErrorMessage('parameter is not string');
            return false;
        }
        var audio = document.createElement('audio');
        audio.id = musicName;
        audio.src= musicSrc;
        cache[musicName] = audio;
        config.musicNum++;
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
        config.musicNum--;
        if(config.musicNum<=0){
            for(var music in cache){
                cache[music].removeEventListener('canplaythrough',cache_ok);
            }
            initModule();
            return true;
        }
        return false;
    };

    /*
    * 作用:
        * 将请求的资源交给dream.cache进行缓存(废弃)
        * 该函数给每个资源注册事件监听,以监听载入情况
    * 参数:none
    * return:
        * true:
        * false:
    * */
    var musicCache = function () {
        for(var music in cache){
            cache[music].addEventListener('canplaythrough',cache_ok);
        }
    };

    /*
    * 作用:
        * 通过输入音乐名获得音乐audio字符串
    * 参数:
        * musicName:音乐名
    * return:
        * true:返回audio标签
        * false:失败
    * */
    var getMusic = function (musicName) {
        if(config.init){
            if(musicName!=='string'){
                error.getErrorMessage('parameter is not string');
            }
            return cache[musicName];
        }
        return false;
    };

    /*
    * 作用;
        * 查看dream.music.load对象是否已经初始化
    * 参数:none
    * return:
        * true:
        * false:
    * */
    var initTest = function () {
        return config.init;
    };

    return {
        getMusic : getMusic,
        pre_musicReady : pre_musicReady,
        musicCache:musicCache,
        initTest:initTest
    }
}());