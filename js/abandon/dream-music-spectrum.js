/*
* 用于生成与音乐对应的频谱
* 并且可以设置频谱为多种样式
* */
/*
* audioSourceNode.connect(config.analyser);没有该代码的话,会导致没有频谱数据
* config.analyser.getByteFrequencyData(config.dataArray);被getByteFrequencyData转换后,dataArray的值应该是0-255
* 该代码产生频谱数据
* config.analyser.connect(config.AudioContext.destination);没有该代码的话,会导致没有声音
* 只有当音乐在播放时才会有频谱数据产生
* */
dream.music.spectrum = (function () {
    /*
    * AudioContext:AudioContext上下文
    * visualNumber:可视化频谱数量
    * audioHtml:img标签
    * analyser:频谱分析对象
    * */
    var config = {
        leftCanvasId:'#left_canvas',
        leftCanvas:null,
        rightCanvasId:'#right_canvas',
        rightCanvas:null,
        initSpectrum:false,
        AudioContext : null,
        analyser:null,
        audioHtml:null,
        visualNumber:8
    };

    /*
    * 定义频谱样式
    * */
    var spectrumStyleConfig = {

    };

    /*
    * 作用:
        * 播放和绘制音乐
    * 参数:
        * musicName:要绘制和播放的音乐名(可选)
    * return:
        * true:成功
        * false:失败
    * */
    var playAndDrawMusic = function (musicName) {
        if(musicName===undefined){
            var audioName = dream.music.getMusicName();
            config.audioHtml = dream.music.load.getMusic(audioName.Dragon_Slayer);
        }else{
            config.audioHtml = dream.music.load.getMusic(musicName);
        }
        var audioSourceNode = config.AudioContext.createMediaElementSource(config.audioHtml);
        config.analyser = config.AudioContext.createAnalyser();
        audioSourceNode.connect(config.analyser);
        config.analyser.connect(config.AudioContext.destination);
        config.dataArrayFrequency = new Uint8Array(config.analyser.frequencyBinCount);
        config.dataArrayTimeDomain = new Uint8Array(config.analyser.frequencyBinCount);
        /**/
        config.audioHtml.play();
        visualSpectrum('testStyle');
        // visualSpectrum();
    };

    /*
    * 作用:
        * 分析数据
    * 参数:none
    * return:
        * true:成功
        * false:失败
    * */
    var analyserData = function () {
        /*被getByteFrequencyData转换的后,dataArray的值应该是0-255*/
        config.analyser.getByteFrequencyData(config.dataArrayFrequency);
        config.analyser.getByteTimeDomainData(config.dataArrayTimeDomain);
    };



    /*
    * 作用:
    * 可视化样式选择
    * 参数:
        * styleName:要选择的样式名称
    * return:
        * true:成功
        * false:失败
    * */
    var visualSpectrum = function (styleName) {
        switch (styleName){
            case 'testStyle':
                // dream.timer.updateQueue(testStyle,'testStyle');
                testStyle();
                break;
            default:
                dream.timer.updateQueue(defaultStyle,'defaultStyle');
                break;
        }
    };
    /*----Begin 样式----*/

    var testStyle = function () {
        var GraphicsArray = [];
        var container = new PIXI.Container();
        var thing = new PIXI.Graphics();
        // container.mask = thing;
        for(var i=0;i<config.visualNumber;i++){
            GraphicsArray.push(new PIXI.Graphics());
            container.addChild(GraphicsArray[i]);
        }
        dream.screenConfig.pixiCanvas.stage.addChild(thing);
        dream.screenConfig.pixiCanvas.stage.addChild(container);
        var s = 0;
        var num = config.dataArrayFrequency.length/config.visualNumber;
        var randomArr = [];
        var rotation = [];
        var ii=0;
        while(ii!==(config.dataArrayFrequency.length-1)){
            var random  = Math.floor(Math.random()*(i*num))+300;
            if(random<800&&random>300){
                ii++;
                rotation.push(Math.random());
                randomArr.push(random);
            }
        }
        dream.timer.updateQueue(function () {
                analyserData();
                s+=0.01;
                for(var i=0;i<GraphicsArray.length;i++){
                    GraphicsArray[i].clear();
                    thing.clear();
                    GraphicsArray[i].beginFill(0xFF9933);
                    GraphicsArray[i].setTransform(dream.screenConfig.pixiCanvas.view.width/2,
                        dream.screenConfig.pixiCanvas.view.height/2,1,1,s+(i*Math.floor(1024/GraphicsArray.length)));
                    var temp = 2;
                    var width_SS = 100/temp;
                    GraphicsArray[i].drawEllipse(0, 0, width_SS, width_SS+(config.dataArrayFrequency[randomArr[i]]/temp));
                    thing.x = dream.screenConfig.pixiCanvas.view.width/2;
                    thing.y = dream.screenConfig.pixiCanvas.view.height/2;
                    thing.beginFill(0x8bc5ff, 0.4);
                    thing.drawEllipse(0, 0, 50, 50);
                    GraphicsArray[i].endFill();
                }
        }
    ,'testStyle');
        for(var i=0;i<GraphicsArray.length;i++){
            dream.screenConfig.pixiCanvas.stage.addChild(GraphicsArray[i]);
        }
    };

    /*
   * 作用:
       * 绘制频谱
   * 参数:none
   * return:
       * true:成功
       * false:失败
   * */
    var defaultStyle = function () {
        var left_num = config.dataArrayFrequency.length/config.visualNumber;
        var right_num = config.dataArrayTimeDomain.length/config.visualNumber;
        analyserData();
        var b_y = [];
        var b_x = [];
        var b_width = [];
        var b_left_height = [];
        /*只用绘制可视化的线条,所以config.visualNumber为循环条件*/
        for(var i=0;i<config.visualNumber;i++){
            var y = dream.screenConfig.left_canvas_height;
            var left_height = -(config.dataArrayFrequency[i*left_num]*2);
            var right_height = -(config.dataArrayTimeDomain[i*right_num]*2);
            var width = dream.screenConfig.left_canvas_width/config.visualNumber;
            var right_width = dream.screenConfig.right_canvas_width/config.visualNumber;
            var x = i*width;
            var right_x = i*right_width;
            dream.screen.left_ctx.fillRect(x,y,width,left_height);
            // dream.screen.right_ctx.fillRect(right_x,y,right_width,right_height);
            b_x.push(x);
            b_y.push(y);
            b_width.push(width);
            b_left_height.push(left_height);
        }

        for(var i=0;i<config.visualNumber-1;i++){
            var x1 = b_x[i] + b_width[i];
            var y1 = dream.screenConfig.left_canvas_height + b_left_height[i] - 50;
            var x2 = b_x[i+1] + b_width[i+1];
            var y2 = dream.screenConfig.left_canvas_height + b_left_height[i+1] - 50;
            var r = 1;
            if(b_left_height[i]<b_left_height[i+1]){
                dream.screen.left_ctx.arcTo(x1,y1,x2,y1,r);
            }
            if(b_left_height[i]>b_left_height[i+1]){
                dream.screen.left_ctx.arcTo(x1,y2,x2,y2,r);
            }

            dream.screen.left_ctx.stroke();
        }
    };

    /*----End 样式----*/

    /*
    * 作用:
        * 音乐模块初始化完成后执行频谱初始化操作
    * 参数:none
    * return:
        * true:成功
        * false:失败
    * */
    var listenSpectrum = function () {
        if(dream.musicConfig.initLoad&&dream.screenConfig.initLoad){
            dream.timer.removeQueue('listenSpectrum');
            playAndDrawMusic();
            return true;
        }
    };

    dream.timer.updateQueue(listenSpectrum,'listenSpectrum');

    /*
    * 作用:
    * 初始化AudioContext对象
    * 参数:none
    * return:
        * true:成功
        * false:失败
    * */
    (function getAudioContext() {
        try {
            window.AudioContext = window.AudioContext||window.webkitAudioContext;
            config.AudioContext = new window.AudioContext();
        }
        catch(e) {
            error.getErrorMessage('Web Audio API is not supported in this browser');
        }
    }());

    return {
        playAndDrawMusic:playAndDrawMusic,
        AudioContext:config.AudioContext
    };
}());