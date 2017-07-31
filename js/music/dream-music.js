/*
* API说明:
* initMusic:
    * 负责装载音乐,返回true时,所有设置要的音乐都已经装载完毕
* getMusicName:
    * 返回音乐id
* */
dream.music = (function () {
    /*
    * musicConfig.initLoad为真时,dream.music及其子类都已经准备好被调用
    * */
    dream.musicConfig = {
        initLoad:false,
        audio:[]
    };

    /*
    * insertPlace:audio的插入位置
    * musicName:audio的id
    * musicSrc:audio的src
    * 上面两者只需要在config中设置,那么在执行initMusic后就能自动装载
    * */
    var config = {
        insertPlace:'#dream',
        musicName:{
            Red_Doors:'Red_Doors',
            Dragon_Slayer:'Dragon_Slayer',
            battle1:'battle1',
            battle3:'battle3'
        },
        musicSrc:{
            Red_DoorsSrc:'music/Red_Doors.mp3',
            Dragon_SlayerSrc:'music/Dragon_Slayer.mp3',
            battle1Src:'music/battle1.mp3',
            battle3Src:'music/battle3.mp3'
        },
        musicSrcArray:[],
        musicNameArray:[]
    };

    /*
    * 作用:
        * 音乐缓存后插入HTML
    * 参数:none
    * return:
        * true:
        * false:
    * */
    var initMusicListen = function () {
        if(dream.musicConfig.initLoad){
            dream.timer.removeQueue('initMusicListen');
            for(var i=0;i<config.musicNameArray.length;i++){
                dream.music.ready.musicInsert(config.musicNameArray[i],config.insertPlace);
            }
            // $('#'+config.musicName.Dragon_Slayer)[0].play();
        }
    };

    /*
    * 作用:
        * 载入音乐,并且当音乐载入好时,插入html
    * 参数:
    * return:
        * true:音乐准备完毕
        * false:
    * */
    var initMusic = function () {
        musicLoad();
        dream.timer.updateQueue(initMusicListen,'initMusicListen');
        return true;
    };

    /*
    * 作用:
        * 负责所有音乐的载入
    * 参数:none
    * return:
        * true:
        * false:
    * */
    var musicLoad = function () {
        for(var src in config.musicSrc){
            config.musicSrcArray.push(config.musicSrc[src]);
        }
        for(var name in config.musicName){
            config.musicNameArray.push(config.musicName[name]);
        }
        for(var i=0;i<config.musicNameArray.length;i++){
            dream.music.load.pre_musicReady(config.musicNameArray[i],config.musicSrcArray[i]);
        }
        dream.music.load.musicCache();
        return true;
    };

    /*
    * 作用:
        * 返回音乐id
    * 参数:none
    * return:
        * true:
        * false:
    *
    * */
    var getMusicName = function () {
        return config.musicName;
    };

    return {
        initMusic:initMusic,
        getMusicName:getMusicName
    };
}());