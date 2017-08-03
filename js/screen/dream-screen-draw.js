/*用于绘制画面*/
dream.screen.draw = (function () {
    var config = {
        drawArray:[],
        finalDrawArray:[]
    } ;

    /*将画面更新函数放入计时器中*/
    var initDraw = function () {
        dream.timer.updateQueue(updateScreen,'updateScreen');
    };

    /*
    * 作用:
        * 清除所有canvas的上一帧画面
    * 参数:none
    * return:
        * true:
        * false:
    * */
    var clearLastFrame = function () {
        if(config.drawArray.length>0){
            dream.screenConfig.canvas.width = dream.screenConfig.canvas_width;
            // dream.screenConfig.leftCanvas.width = dream.screenConfig.left_canvas_width;
            dream.screenConfig.rightCanvas.width = dream.screenConfig.right_canvas_width;
        }
    };

    /*
    * 作用:
        * 更新画面,每个绘制函数,绘制完后就丢弃
    * 参数:none
    * return:
        * true:
        * false:
    * */
    var updateScreen = function () {
        if((config.drawArray.length>0)||(config.finalDrawArray.length>0)){
            clearLastFrame();
            while(0!==config.drawArray.length){
                var currentScreen = config.drawArray.shift();
                currentScreen();
            }
        }
        return true;
    };

    /*
    * 作用:
        * 将要绘制的图像压入drawArray末尾中,在updateScreen中执行
    * 参数:
        * img:html的img标签
        * x:x坐标
        * y:y坐标
        * width:宽
        * height:高
        * canvas:选择要在那个canvas上绘制
    * return:
        * true:
        * false:
    * */
    var drawScreen = function (img,x,y,width,height,canvas) {
        switch (canvas){
            case dream.screenConfig.canvasId:
                updateCanvas(img,x,y,width,height,canvas);
                break;
            case dream.screenConfig.leftCanvas:
                updateLeftCanvas(img,x,y,width,height,canvas);
                break;
            case dream.screenConfig.rightCanvas:
                updateRightCanvas(img,x,y,width,height,canvas);
                break;
            default:
                console.log('canvas not exist');
                break;
        }
    };
    /*updateCanvas系列函数都服务于drawScreen函数*/
    var updateCanvas = function (img,x,y,width,height) {
        config.drawArray.push(function () {
            dream.screen.ctx.drawImage(img,x,y,width,height);
        });
    };

    var updateLeftCanvas = function (img,x,y,width,height) {
        config.drawArray.push(function () {
            dream.screen.left_ctx.drawImage(img,x,y,width,height);
        });
    };

    var updateRightCanvas = function (img,x,y,width,height) {
        config.drawArray.push(function () {
            dream.screen.right_ctx.drawImage(img,x,y,width,height);
        });
    };

    return {
        initDraw:initDraw,
        drawScreen:drawScreen
    };
}());