dream.screen = (function () {
    /*
    * screenConfig.initLoad为真时,dream.screen及其子类都已经准备好被调用
    * */
    dream.screenConfig = {
        initLoad:false,
        terrainRandomInitLoad:false,
        characterInitLoad:false,
        canvas_height:0,
        canvas_width:0
    };

    var config = {
        init:false,
        insertPlace:'#dream',
        photoName:{
            actor:'actor',
            bullet1:'bullet1',
            fire1:'fire1',
            terrain1:'terrain1',
            terrain2:'terrain2'
        },
        photoSrc:{
            actorSrc:'img/icon.jpg',
            bullet1Src:'img/bullet/bullet1/Gun2_03.png',
            fire1Src:'img/bullet/fire1/fire1_03.png',
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
    // var classify = function (regexPattern,savePlace) {
    //     var reg = new RegExp(regexPattern);
    //     for(var name in config.photoSrc){
    //         if(reg.test(config.photoSrc[name])){
    //             savePlace[name] = reg.exec(config.photoSrc[name])[1];
    //         }
    //     }
    //     return savePlace;
    // };


    var getTerrainName = function () {
        return config.terrainName;
    };

    // var getBackgroundName = function () {
    //     return config.backgroundName;
    // };

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
         * 初始化screen对象
     * 参数:
     * return:
         * true:图片准备完毕
         * false:
     * */
    var initScreen = function () {
        setDream_canvas();
        screenLoad();
        dream.timer.updateQueue(listenInit,'listenInit');
        return true;
    };

    /*
     * 作用:
         * 创建pixi对象,载入图片
     * 参数:
     * return:
         * true:图片准备完毕
         * false:
     * */
    var setDream_canvas = function () {
        // debugger;
        dream.screenConfig.pixiCanvas = new PIXI.Application(document.body.scrollWidth,document.body.scrollHeight);
        dream.screenConfig.canvas_width = document.body.scrollWidth;
        dream.screenConfig.canvas_height = document.body.scrollHeight;
        dream.screenConfig.pixiCanvas.view.style.position = "absolute";
        dream.screenConfig.pixiCanvas.view.style.display = "block";
        $(config.insertPlace).append(dream.screenConfig.pixiCanvas.view);
        config.init = true;
    };

    var initTest = function () {
        return config.init;
    };

    var listenInit = function () {
        var charInit = dream.screen.character.initTest();
        var loadInit = dream.screen.load.initTest();
        if((charInit==true)&&(loadInit===true)){
            dream.timer.removeQueue('listenInit');
            dream.screenConfig.initLoad = true;
            dream.screen.bullet.init();
            dream.screen.monster.initMonster();
        }
    };


    return {
        initScreen:initScreen,
        // getBackgroundName:getBackgroundName,
        // getTerrainName:getTerrainName,
        initTest:initTest
        // getPhotoName:getPhotoName
    };
}());