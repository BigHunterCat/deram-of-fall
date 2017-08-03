window.onload = function () {
    test();
};


var test = function () {
    //Create the renderer
    var app = new PIXI.Application(800, 800);
    //Add the canvas to the HTML document
    document.body.appendChild(app.view);
    var sprites = new PIXI.particles.ParticleContainer(10000, {
        scale: true,
        position: true,
        rotation: true,
        uvs: true,
        alpha: true
    });
    var maggots = [];
    app.stage.addChild(sprites);
    var totalSprites = app.renderer instanceof PIXI.WebGLRenderer ? 10000 : 100;
    // var totalSprites = 100;
    for (var i = 0; i < totalSprites; i++) {

    }

    // app.ticker.add(function() {
    //     drawCircle();
    // });



    var x = 0;
    var xx = 0;
    var grap1 = new PIXI. Graphics();
    var grap2 = new PIXI. Graphics();
    app.ticker.add(function () {
        x+=1;
        x%=180;
        xx+=0.1;
        console.log(x);
        grap1.clear();
        // grap1.lineStyle(4, 0x99CCFF, 1);
        grap1.beginFill(0xFF9933);
        grap1.setTransform(app.view.width/2, app.view.height/2,1,1,xx);
        grap1.drawEllipse(0, 0, 100, 50+x);
        grap1.endFill();
        grap2.clear();
        // grap2.lineStyle(4, 0x99CCFF, 1);
        grap2.beginFill(0xFF9933);
        grap2.setTransform(app.view.width/2, app.view.height/2,1,1,1+xx);
        grap2.drawEllipse(0, 0, 100, 50+x);
        grap2.endFill();
    });


    app.stage.addChild(grap1);
    app.stage.addChild(grap2);

};




