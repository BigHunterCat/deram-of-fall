dream.screen.terrainRandom.collisionDetection = (function () {


    /*
    * 作用:
        * 对角色进行检测,检查是否与stumbling有接触
        * 该函数理当在循环中被调用
    * 参数:
        * actor: 角色对象,应该包含x,y,width,height
        * stumbling:障碍物对象应该包含x,y,size(因为宽高一致所以width,height用size代替)
    * return:
        * true:
        * false:
    *  */
    var collisionDetection = function (actor,stumbling) {
        /*先确定x坐标,再确定y坐标*/
        var actor_x = actor.x+actor.width;
        var stumbling_x = stumbling.x+stumbling.size;
        if((actor_x-stumbling.x)>=0&&(stumbling_x-actor.x>=0)){
            var actor_y = actor.y+actor.height;
            if((stumbling.y-actor_y)<=0){
                // console.log('发生碰撞.');
            }
        }
    };

    return {
        collisionDetection:collisionDetection
    };
}());