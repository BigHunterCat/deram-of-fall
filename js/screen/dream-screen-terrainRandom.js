dream.screen.terrainRandom = (function () {
    var config = {
        /*
        * 需要使用initConfig初始化
        * 控制游戏的边界
        * edgeMaxX与edgeMinX是横向边界
        * stumblingX和stumblingY是放置障碍物的坐标
        * stumblingXNum是图块在水平位置能放的数量
        * deepMax是纵向边界
        * */
        screenLimit:{
            edgeMaxX:0,
            edgeMinX:0,
            edgeMaxY:0,
            edgeMinY:0,
            stumblingXNum:0,
            stumblingX:0,
            stumblingY:0,
            deepMax:1000
        },
        terrainNameArray:[],
        /*
        * 图块大小为40*40px
        * */
        terrainConfig:{
            size:0,
            rowNum:20
        },

        /*作为存放一组stumbling的容器*/
        stumblingArray:[]
    };

    /*
    * 作用:
        * 初始化terrainRandom对象所需要的数据
    * 参数:none
    * return:
        * true:
        * false:
    * */
    var initTerrainRandom = function () {
        initConfigScreenLimit();
        updateStumblingArray();
        dream.timer.updateQueue(drawStumbling,'drawStumbling');
    };

    /*
    * 作用:
        * 设置游戏边界
    * 参数:none
    * return:
        * true:
        * false:
    * */
    var initConfigScreenLimit = function () {
        config.terrainConfig.size = dream.screenConfig.canvas_width/config.terrainConfig.rowNum;
        config.screenLimit.edgeMinX = 0;
        config.screenLimit.edgeMaxX = dream.screenConfig.canvas_width - 40;
        config.screenLimit.edgeMinY = 0;
        config.screenLimit.edgeMaxY = parseInt($(dream.screenConfig.canvasId).css('height'));
        config.screenLimit.stumblingX = 0;
        config.screenLimit.stumblingY = config.screenLimit.edgeMaxY;
        config.screenLimit.stumblingXNum = Math.floor(config.screenLimit.edgeMaxX/config.terrainConfig.width);
    };

    /*
    * 作用:
        * 初始化障碍物属性
    * 参数:none
    * return:
        * true:被初始化的障碍物
        * false:
    * */
    var initConfigStumbling = function () {
        /*block为障碍物贴图*/
        var stumbling = {
            block:{},
            x:0,
            y:0,
            size:0,
            speed:5
        };
        config.terrainNameArray = getStumbling();
        stumbling.block = selectStumbling(config.terrainNameArray);
        stumbling.x = randomStumblingPos();
        stumbling.y = config.screenLimit.stumblingY;
        stumbling.size = config.terrainConfig.size;
        return stumbling;
    };

    /*
    * 作用:
        * 如果在initConfigStumbling中完成这步,会导致非预期的结果,因为所有对象都是同一个实例
        * 现在这样,是为了让每个对象都是独立的引用而不是同一个实例
    * 参数:none
    * return:
        * true:
        * false:
    * */
    var updateStumblingArray = function () {
        for(var i=0;i<20;i++){
            config.stumblingArray.push(initConfigStumbling());
        }
        return true;
    };


    /*
    * 作用:
        * 生成障碍物的x坐标
    * 参数:none
    * return:
        * true:x坐标
        * false:
    * */
    var randomStumblingPos = function () {
        var randomX = Math.floor(Math.random()*10);
        for(var i=0;i<Math.floor(Math.random()*10);i++){
            randomX = randomX+Math.floor(Math.random()*10);
        }
        while(randomX>dream.screenConfig.canvas_width){
            randomX = randomX/2;
        }
        randomX = Math.floor(randomX);
        return randomX*config.terrainConfig.size;
    };

    /*
    * 作用:
    * 获得图块名队列
    * 参数:none
    * return:
        * true:
        * false:
    * */
    var getStumbling = function () {
        var terrainName = dream.screen.getTerrainName();
        var terrainNameArray = [];
        for (var name in terrainName){
            terrainNameArray.push(terrainName[name]);
        }
        return terrainNameArray;
    };

    /*
    * 作用:
        * 随机选择障碍物
    * 参数:
        * terrainNameArray:障碍物名称数组
    * return:
        * true:障碍物(一个)
        * false:
    * */
    var selectStumbling = function (terrainNameArray) {
        var random = Math.floor(Math.random()*10);
        while(random>=config.terrainNameArray.length){
            random = Math.floor(Math.random()*10);
        }
        return dream.screen.load.getPhoto(terrainNameArray[random]);
    };

    /*
    * 作用:
        * 绘制障碍物
    * 参数:
        * terrainActor:img标签数组
        * randomX:x坐标数组
    * return:
        * true:
        * false:
    * */
    var drawStumbling = function () {
        dream.screenConfig.terrainRandomInitLoad = true;
        if(config.stumblingArray.length<1){
            /*终止计时器是为了方便测试*/
            dream.timer.removeQueue('drawStumbling');
        }
        for(var i=0;i<config.stumblingArray.length;i++){
            dream.screen.draw.drawScreen(
                config.stumblingArray[i].block,config.stumblingArray[i].x
                ,config.stumblingArray[i].y,config.stumblingArray[i].size,config.stumblingArray[i].size,dream.screenConfig.canvasId);


            dream.screen.terrainRandom.collisionDetection.collisionDetection(
                dream.controlConfig.actor,config.stumblingArray[i]);

            config.stumblingArray[i].y -= config.stumblingArray[i].speed;
            if(config.stumblingArray[i].y<=(-config.terrainConfig.size)){
                /*当只有一个元素时,config.stumblingArray[i] = config.stumblingArray.pop()这段代码
                * 明显是不合时宜的,因为这样会导致当只有一个元素时,该元素会无止境的执行下去
                * 所以有了下面这句代码*/
                if(config.stumblingArray.length===1){
                    config.stumblingArray.pop();
                    return true;
                }
                config.stumblingArray[i] = config.stumblingArray.pop();
            }
        }
        return true;
    };

    var getScreenLimit = function () {
        return config.screenLimit;
    };

    var getStumblingArray = function () {
        return config.stumblingArray;
    };

    return {
        initTerrainRandom:initTerrainRandom,
        getStumblingArray:getStumblingArray,
        getScreenLimit:getScreenLimit
    };
}());