dream.screen.monster = (function () {
    var config = {
        /*monsterDataReady为真时,才可以交给碰撞检测程序*/
        monsterDataReady:false,
        monsterArray:[],
        monsterSpeed:2,
        monsterNum:10,
        monsterCorpseNum:10000,
        makeSpeed:1,
        count:0,
        actorName:'actor'
    };

    var initMonster = function () {
        makeMonster();
        makeMonsterCorpse();

    };

    var makeMonsterCorpse = function () {
        config.containerMonsterCorpse = new PIXI.ParticleContainer(config.monsterCorpseNum);
        dream.screenConfig.pixiCanvas.stage.addChild(config.containerMonsterCorpse);
        config.monsterCorpseArray = [];
    };

    var makeMonster = function () {
        config.containerMonster = new PIXI.ParticleContainer(config.monsterNum);
        dream.screenConfig.pixiCanvas.stage.addChild(config.containerMonster);
        config.monsterArr = [];
        dream.timer.updateQueue(listenMonster,'listenMonster');
    };

    /*
    * 作用:
        * 生成monster
    * 参数:
    * return:
    * */
    var listenMonster = function () {
        config.count++;
        var timer = 60/config.makeSpeed;
        if(config.count===timer&&config.monsterArr.length<config.monsterNum){
            config.count = 0;
            config.monsterArr.push(initMonsterData());
        }
        if(config.monsterArr.length>0){
            monsterMove(config.monsterArr);
            monsterDieCheck();
        }
    };

    var initMonsterData = function () {
        var actor = dream.screen.load.getPhoto(config.actorName);
        var monster = {};
        monster.sprite = new PIXI.Sprite.fromImage('img/monster/zombie_1.png');
        config.containerMonster.addChild(monster.sprite);
        /*x,y是怪物的坐标.sx,sy是怪物的目标坐标*/
        var rowNum = 4;
        var randomBound_rowWidth = Math.floor(dream.screenConfig.canvas_width/rowNum);
        var randomBound_rowHeight = Math.floor(dream.screenConfig.canvas_height/rowNum);
        monster.sprite.x = randomBound_rowWidth*Math.floor(Math.random()*4);
        monster.sprite.y = randomBound_rowHeight*Math.floor(Math.random()*4);
        monster.sx = actor.x;
        monster.sy = actor.y;
        /*die为true,表示怪物死亡*/
        monster.die = false;
        monster.sprite.width = 60;
        monster.sprite.height = 105;
        monster.speedX = 0;
        monster.speedY = 0;
        return monster;
    };

    var monsterMove = function (monsterArray) {
        monsterArray = initMonsterMoveSpeed(monsterArray);
        config.monsterDataReady = false;
        for(var i=0;i<monsterArray.length;i++){
            monsterArray[i].sprite.x =
                monsterArray[i].sprite.x + monsterArray[i].speedX*(Math.random()*4);

            monsterArray[i].sprite.y =
                monsterArray[i].sprite.y + monsterArray[i].speedY*(Math.random()*4);
        }
        config.monsterArray = monsterArray;
        config.monsterDataReady = true;
    };

    /*
    * 作用:
    * 怪物死亡判断
    * 如果怪物使用,则将怪物移出可视范围并且放置尸体
    * */
    var monsterDieCheck = function () {
        var monster = dream.screen.collide.getMonsterCollideResult();
        if(monster!==false){
            /*更新die数据*/
            for(var i=0;i<monster.length;i++){
                config.monsterArray[i].die = monster[i].die;
                if(config.monsterArray[i].die===true){
                    var monsterCorpse = initMonsterCorpse();
                    monsterCorpse.sprite.x = config.monsterArray[i].sprite.x;
                    monsterCorpse.sprite.y = config.monsterArray[i].sprite.y;
                    monsterCorpse.sprite.width = config.monsterArray[i].sprite.width;
                    monsterCorpse.sprite.height = config.monsterArray[i].sprite.height;
                    console.log(monster.length);
                    config.monsterArray[i].sprite.x = Math.floor(Math.random()*dream.screenConfig.canvas_width);
                    config.monsterArray[i].sprite.y =  Math.floor(Math.random()*dream.screenConfig.canvas_height);
                    config.monsterArray[i].die = false;
                }
            }
        }
    };

    var initMonsterCorpse = function () {
        var monsterCorpse = {};
        monsterCorpse.sprite = new PIXI.Sprite.fromImage('img/monster/dead1.png');
        config.containerMonster.addChild(monsterCorpse.sprite);
        return monsterCorpse;
    };

    /*
    * 作用:
    * 初始化怪物速度
    * */
    var initMonsterMoveSpeed = function (monsterArray) {
        var speed = config.monsterSpeed;
        var actor = dream.screen.load.getPhoto(config.actorName);
        for(var i=0;i<monsterArray.length;i++){
            monsterArray[i].dx = (actor.x-monsterArray[i].sprite.x)*(actor.x-monsterArray[i].sprite.x);
            monsterArray[i].dy = (actor.y-monsterArray[i].sprite.y)*(actor.y-monsterArray[i].sprite.y);
            monsterArray[i].distance = Math.sqrt(monsterArray[i].dx+monsterArray[i].dy);
            monsterArray[i].move = Math.floor(monsterArray[i].distance/speed)+1;
            monsterArray[i].speedX = Math.floor((actor.x-monsterArray[i].sprite.x)/monsterArray[i].move);
            monsterArray[i].speedY = Math.floor((actor.y-monsterArray[i].sprite.y)/monsterArray[i].move);
        }
        return monsterArray;
    };

    var getMonsterArray = function () {
        if(config.monsterDataReady===false){
            return false;
        }
        return config.monsterArray;
    };

    return {
        initMonster:initMonster,
        getMonsterArray:getMonsterArray
    }
}());