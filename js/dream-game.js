/*
* 用于集成其他组件
* */
dream.game = (function () {

   /*
   * 作用:
      * 初始化音乐,画面与控制模块
   * 参数:none
   * return:
      * true:
      * false:
   * */
   var initModule = function () {
       dream.music.initMusic();
       dream.screen.initScreen();
       dream.control.initControl();
   };
   return {
       initModule:initModule
   } ;
}());