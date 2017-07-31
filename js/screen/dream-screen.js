dream.screen = (function () {
    /*
    * screenConfig.initLoad为真时,dream.screen及其子类都已经准备好被调用
    * */
    dream.screenConfig = {
        initLoad:false,
        terrainRandomInitLoad:false,
        characterInitLoad:false,
        canvas_height:0,
        canvas_width:0,
        canvasId: '#dream_canvas'
    };

    var config = {
        insertPlace:'#dream',
        photoName:{
            actor:'actor',
            castle:'castle1',
            decorativeTile:'decorativeTile',
            terrain1:'terrain1',
            terrain2:'terrain2'
        },
        photoSrc:{
            // actorSrc:'img/icon_154_19.png',
            actorSrc:'img/icon.jpg',
            castleSrc:'img/background/Castle1.png',
            decorativeTileSrc:'img/background/DecorativeTile.png',
            terrain1:'img/terrain/terrain1.jpg',
            terrain2:'img/terrain/terrain2.jpg'
        },
        /*terrainName和backgroundNmae是给随机地形模块用于get图片使用的*/
        terrainName:{

        },
        backgroundName:{

        },
        photoSrcArray:[],
        photoNameArray:[]
    };

    /*
    * 作用:
        * 执行初始化函数获取canvas对象
    * 参数:none
    * return:
        * true:获得canvas对象
        * false:失败
    * */
    var screenLoad = function () {
        for(var src in config.photoSrc){
            config.photoSrcArray.push(config.photoSrc[src]);
        }
        for(var name in config.photoName){
            config.photoNameArray.push(config.photoName[name]);
        }
        for(var i=0;i<config.photoNameArray.length;i++){
            dream.screen.load.pre_pictureLoad(config.photoNameArray[i],config.photoSrcArray[i]);
        }
        dream.screen.load.photoCache();
        return true;
    };

    /*
    * 作用:
    * 将图片按照用途分类
    * 参数:
        * regexPattern:匹配模式;'img\/terrain\/([a-zA-z0-9]*\.)';
            * 只要按照img/文件夹名/文件的模式存储资源,那么就只需要更改正则表达式中的
            * 文件夹名就可以了,上面例子中的文件夹名是terrain,文件名只能是英文和数字的组合
        * savePlace:保存结果的对象
    * return:
        * true:获取regexp对象
        * false:失败
    * */
    var classify = function (regexPattern,savePlace) {
        var reg = new RegExp(regexPattern);
        for(var name in config.photoSrc){
            if(reg.test(config.photoSrc[name])){
                savePlace[name] = reg.exec(config.photoSrc[name])[1];
            }
        }
        return savePlace;
    };

    /*
    * 作用:
        * 图片缓存后进行画面的初始化
    * 参数:none
    * return:
        * true:
        * false:
    * */
    var initScreenListen = function () {
        if(dream.screenConfig.initLoad){
            dream.timer.removeQueue('initScreenListen');
            dream.screen.draw.initDraw();
            classify('img\/terrain\/([a-zA-z0-9]*\)',config.terrainName);
            classify('img\/background\/([a-zA-z0-9]*\)',config.backgroundName);
            dream.screen.terrainRandom.initTerrainRandom();
        }
    };

    var getTerrainName = function () {
        return config.terrainName;
    };

    var getBackgroundName = function () {
        return config.backgroundName;
    };

    /*
    * 作用:
        * 返回图片id
    * 参数:none
    * return:
        * true:
        * false:
    *
    * */
    var getPhotoName = function () {
        return config.photoName;
    };

    /*
     * 作用:
         * 创建context对象,载入图片,监听图片是否缓存
     * 参数:
     * return:
         * true:音乐准备完毕
         * false:
     * */
    var initScreen = function () {
        setDream_canvas();
        setLeft_canvas();
        setRight_canvas();
        screenLoad();
        dream.timer.updateQueue(initScreenListen,'initScreenListen');
        return true;
    };

    var setLeft_canvas = function () {
        dream.screenConfig .leftCanvas = document.getElementById('left_canvas');
        dream.screenConfig .leftCanvas.height = $(document).height();
        dream.screenConfig .leftCanvas.width = ($(document).width()/4);
        dream.screenConfig.left_canvas_height = dream.screenConfig .leftCanvas.height;
        dream.screenConfig.left_canvas_width = dream.screenConfig .leftCanvas.width;
        dream.screenConfig .leftCanvas .style.left = 0+'px';
        dream.screen.left_ctx = dream.screenConfig .leftCanvas.getContext('2d');
    };

    var setDream_canvas = function () {
        dream.screenConfig.canvas = document.getElementById('dream_canvas');
        dream.screenConfig.canvas.height = $(document).height();
        dream.screenConfig.canvas.width = ($(document).width()/2);
        dream.screenConfig.canvas_height = dream.screenConfig.canvas.height;
        dream.screenConfig.canvas_width = dream.screenConfig.canvas.width;
        dream.screenConfig.canvas.style.left = (dream.screenConfig.canvas.width/2)+'px';
        dream.screen.ctx = dream.screenConfig.canvas.getContext('2d');
    };

    var setRight_canvas = function () {
        dream.screenConfig .rightCanvas = document.getElementById('right_canvas');
        dream.screenConfig .rightCanvas .height = $(document).height();
        dream.screenConfig .rightCanvas .width = ($(document).width()/4);
        dream.screenConfig.right_canvas_height = dream.screenConfig .rightCanvas.height;
        dream.screenConfig.right_canvas_width = dream.screenConfig .rightCanvas.width;
        dream.screenConfig .rightCanvas.style.right = 0+'px';
        dream.screen.right_ctx = dream.screenConfig .rightCanvas.getContext('2d');
    };

    return {
        initScreen:initScreen,
        getBackgroundName:getBackgroundName,
        getTerrainName:getTerrainName,
        getPhotoName:getPhotoName
    };
}());