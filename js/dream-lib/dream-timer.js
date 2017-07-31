/*
* 该中央计时器装载的对象,必须具有属性名为id的属性和方法名为fn的方法
* 其他人要使用需要把dream.timer该成var timer
* return:
    * updateQueue:更新队列
    * removeQueue:移除队列
* */
dream.timer = (function () {
    /*
    * frame:帧率
    * queue:装载等待遍历执行的对象,该对想要必须具有一个ID和一个函数
    * time_self:用于删除计时器本身
    * objLength:用于计算还有多少对象在计时器中
    * */
    var config = {
        is_run:false,
        queue : {},
        frame : Math.floor(1000/60),
        objLength : 0
    };

    /*
    * 作用:
        * 按照frame的间隔遍历queue
    * 参数:none
    * return:none
    * */
    var star = function () {
        config.time_self = setInterval(run,config.frame);
    };

    /*
    * 作用：
        * 停止计时器运行
    * 参数：none
    * return：
        * true：成功
        * false：失败
    * */
    var stop = function () {
        clearInterval(config.time_self);
        config.is_run = false;
        return true;
    };

    /*
    * 作用:
        * 运行函数
        * 没有对象时,停止计时器
    * 参数:none
    * return:
        * true:
        * false:
    * */
    var run = function () {
        if(config.objLength<=0){
            // console.log('config.objLength:'+config.objLength);
            stop();
            console.log('queue no function.');
            return false;
        }
        for(var fn in config.queue){
            config.queue[fn]();
        }
    };

    /*
    * 作用:
        * 装载待遍历的对象
    * 参数:
        * fn:待遍历的函数
        * fnName:对象名
    * return:
        * true:
        * false:
    * */
    var updateQueue = function (fn,fnName) {
        config.objLength++;
        if(typeof fn!=='function'){
            error.getErrorMessage('parameter is error');
        }
        config.queue[fnName] = fn;
        if(config.is_run===false){
            star();
            config.is_run = true;
        }
        return true;
    };

    /*
    * 作用:
        * 移除queue中的对象
    * 参数:
        * id:要移除对象的id
    * return:
        * true:succeed
        * false:failed
    * */
    var removeQueue = function (objName) {
        delete config.queue[objName];
        config.objLength--;
        return true;
    };

    /*用于查看运行中的队列*/
    var getQueue = function () {
        return config.queue;
    };

    return {
        updateQueue:updateQueue,
        removeQueue:removeQueue,
        getQueue:getQueue
    };
}());