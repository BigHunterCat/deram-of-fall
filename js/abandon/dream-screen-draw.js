/*用于绘制画面*/
dream.screen.draw = (function () {
    var config = {
        drawArray:[],
        finalDrawArray:[]
    } ;

    /*将画面更新函数放入计时器中*/
    var initDraw = function () {
        // dream.timer.updateQueue(updateScreen,'updateScreen');
    };



    return {
        initDraw:initDraw
        // drawScreen:drawScreen
    };
}());