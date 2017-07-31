dream.music.ready = (function () {
    var config = {

    };
    /*
    * 作用:
        * 将准备好的音乐插入html
    * 参数:
        * musicName:音乐名
        * place要插入的html位置
    * return:
        * false:失败
        * true:返回该audio
    * */
    var musicInsert = function (musicName,place) {
        if(typeof musicName!=='string'){
            error.getErrorMessage('parameter is not string');
            return false;
        }
        if(typeof place!=='string'){
            error.getErrorMessage('parameter is not string');
            return false;
        }
        $(place).append(dream.music.load.getMusic(musicName));
        return $('#'+musicName)[0];
    };

    /*
    * 作用:
        * 播放音乐
    * 参数:
        * musicName:音乐名
    * return:
        * true:成功
        * false:
    * */
    var musicPlay = function (musicName) {
        dream.music.load.getMusic(musicName).play();
        return true;
    };


    return {
        musicInsert:musicInsert,
        musicPlay:musicPlay
    }
}());