/*
* 未测试
* 作用:
    * 合并API
* 参数:
    * API数组
* return:
    * true:成功
    * false:失败
* */
var api_merge = function (apiArray) {
    if(typeof apiArray.length!=='number'){
        error.getErrorMessage('parameter is not array');
        return false;
    }
    for(var i;i<apiArray.length-1;i++){
        $.extend(true,apiArray[i],apiArray[i+1])
    }
    return true;
};