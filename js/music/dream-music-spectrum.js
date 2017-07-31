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
        visualNumber:32
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
            config.audioHtml = dream.music.load.getMusic(audioName.battle1);
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
        drawCircle();
        config.audioHtml.play();
        visualSpectrum('testStyle');
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
                dream.timer.updateQueue(testStyle,'testStyle');
                break;
            default:
                dream.timer.updateQueue(defaultStyle,'defaultStyle');
                break;
        }
    };
    /*----Begin 样式----*/

    var testStyle = function () {
        var x_p = dream.screenConfig.left_canvas_width/2;
        var y_p = dream.screenConfig.left_canvas_height/2;
        var left_num = config.dataArrayFrequency.length/config.visualNumber;
        // dream.screen.left_ctx.translate(x,y);
        analyserData();
        var endPoint = 360/config.visualNumber;
        for(var i=0;i<config.visualNumber-1;i++){
        // for(var i=0;i<config.circlePosition.x.length-1;i++){
            dream.screen.ctx.moveTo(config.circlePosition.x[i],config.circlePosition.y[i]);
            var temp = (config.circlePosition.x[i]+config.circlePosition.x[i+1])/2;
            dream.screen.ctx.quadraticCurveTo(temp,config.dataArrayFrequency[i],config.circlePosition.x[i+1],config.circlePosition.y[i+1]);
            dream.screen.ctx.stroke();
        }
    };

    /*x=a+rcosθ y=b+rsinθ（圆心(a,b)半径r的圆）*/
    
    var drawCircle = function () {
        var x = dream.screenConfig.left_canvas_width/2;
        var y = dream.screenConfig.left_canvas_height/2;
        var radius = 200;
        config.circlePosition = {
            x:[],
            y:[]
        };
        var t = 360/config.visualNumber;
        for(var i=0;i<360;i++){
            var a = x + radius*Math.cos((i*t)*2*Math.PI/360);
            var b = y + radius*Math.sin((i*t)*2*Math.PI/360);
            config.circlePosition.x[i] = Math.floor(a);
            config.circlePosition.y[i] = Math.floor(b);
        }
        console.log( config.circlePosition.x);
        console.log( config.circlePosition.y);
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
            dream.screen.right_ctx.fillRect(right_x,y,right_width,right_height);
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