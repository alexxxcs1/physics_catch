var ScreenSize = {width:750,height:1334};

var BaseUrl = 'http://packy.club/physics_catch/';

var pageLock=true;
function pageScoll(e)
{
    if(pageLock)
    {
        e.preventDefault(); //阻止页面滑动动作
    }
}

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

var af = new AlloyFinger(document.getElementById('stageSection'), {
    // touchStart: function () {

    // },
    // touchMove: function () { },
    // touchEnd:  function () { },
    // touchCancel: function () { },
    // multipointStart: function () { },
    // multipointEnd: function () { },
    // tap: function () { },
    // doubleTap: function () { },
    // longTap: function () { 

    // },
    // singleTap: function () { },
    // rotate: function (evt) {
    //     // console.log(evt.angle);
    // },
    // pinch: function (evt) {
    //     // console.log(evt.zoom);
    // },
    pressMove: function (evt) {
        console.log(evt.deltaX);
        stage.catchHand.shiftOffset += evt.deltaX/1000;
        // console.log(evt.deltaY);
    },
    swipe: function (evt) {
        // console.log("swipe" + evt.direction);
        // console.log(evt);
        console.log(evt.direction);
        
        if (evt.direction == 'Down') {
            console.log(stage.catchHand.mainBase);
            // stage.catchHand.mainBase.position
            if (stage.catchHand.catching) return;
            var tweenDown = new createjs.Tween.get(stage.catchHand.mainBase.position)
                                            .call(function() {
                                                stage.catchHand.catching = true;
                                            })
                                            .to([stage.catchHand.mainBase.position[0], 8.0], 1000)
                                            .wait(500)
                                            .call(function () {
                                                console.log(stage.catchHand.mainBase);
                                                stage.catchHand.mainBase.shapes[2].angle = Math.PI/180 * 1;
                                                stage.catchHand.mainBase.shapes[3].angle = -Math.PI/180 * 1;
                                            })
                                            .to([stage.catchHand.mainBase.position[0], 13.0], 1000)
                                            .wait(1000)
                                            .call(function () {
                                                for (var x = 0; x < stage.babyList.length; x++) {
                                                    stage.babyList[x].checkDinner();
                                                }
                                                stage.catchHand.catching = false;
                                                
                                                stage.catchHand.mainBase.shapes[2].angle = -Math.PI/180 * 8;
                                                stage.catchHand.mainBase.shapes[3].angle = Math.PI/180 * 8;

                                            });
            // stage.catchHand.mainBase.position = [0,0];
        }
    }
});

var load_list={
    'img':[
        {'name':'doodle','src':'doodle.png'},
        {'name':'Steps','src':'Steps.png'},
        {'name':'handShape','src':'handShape.png'},
        {'name':'handJoint','src':'handJoint.png'},
        {'name':'handFinger_left','src':'handFinger_left.png'},
        {'name':'handFinger_right','src':'handFinger_right.png'},
        {'name':'leftbtn','src':'leftbtn.png'},
        {'name':'rightbtn','src':'rightbtn.png'},
        {'name':'catchbtn','src':'catchbtn.png'},
    ],
    'group':[
        {'name':'dog','type':'.png','endid':'3','srcname':'dog'},
    ]
};

var stage =
{
    Width:750,
    Height:1334,
    Base:null,
    p2gScall:100,
    p2world:null,
    babyNum:65,
    catchHand: {
        catching:false,
        initpostion:[],
        canContrl:false,
        shiftOffset:0,
        mainBase: null,
        handShape: {
            g: null,
            f: null,
            offset:[0,2.3],
            angle:0,
        },
        handJoint: {
            g: null,
            f: null,
            offset:[0,-2],
            angle:0,
        },
        handFinger_left: {
            g: null,
            f: null,
            offset:[-0.5,-3],
            angle:-Math.PI/180 * 8,
        },
        handFinger_right: {
            g: null,
            f: null,
            offset:[0.5,-3],
            angle:Math.PI/180 * 8,
        },
        Finger_right:
        {
            p:null,
        },
        Finger_left:
        {
            p:null,
        }
    },
    
    spriteList:[
        // {
        //     name:'doodle',
        //     g_base:null,
        //     p_base:null,
        //     boxShape:null,
        //     initGraphics:function(sprite)
        //     {
        //         if (this.p_base) {
        //             sprite.set(
        //                 {
        //                     x: this.p_base.position[0]*stage.p2gScall,
        //                     y: Math.min(stage.Height,stage.Height - this.p_base.position[1]*stage.p2gScall),
        //                     rotation:-180/Math.PI*this.p_base.angle,
        //                 });
                        
        //         }else   //设置初始化位置
        //         {   
        //             this.g_base.x = 100;

        //             this.g_base.regX = sprite.getBounds().width/2;
        //             this.g_base.regY = sprite.getBounds().height/2;
        //         }
        //     },
        //     initPhysical:function()
        //     {
        //         if (this.g_base) {

        //             this.boxShape = new p2.Circle({
        //                 radius: this.g_base.getBounds().width/stage.p2gScall/2,
        //                 width: this.g_base.getBounds().width/stage.p2gScall,
        //                 height: this.g_base.getBounds().height/stage.p2gScall,
        //             });
        //             this.p_base = new p2.Body({
        //                 mass: 1,
        //                 position: [(this.g_base.x+100)/stage.p2gScall, (2*stage.Width-this.g_base.y)/stage.p2gScall],
        //                 angularVelocity: 0,
        //             });
               
        //             this.p_base.addShape(this.boxShape);
        //             stage.p2world.addBody(this.p_base);

        //         }
        //     }
        // },
        // {
        //     name:'dog0',
        //     g_base:null,
        //     p_base:null,
        //     boxShape:null,
        //     initGraphics:function(sprite)
        //     {
        //         if (this.p_base) {
        //             sprite.set(
        //                 {
        //                     x: this.p_base.position[0]*stage.p2gScall,
        //                     y: Math.min(stage.Height,stage.Height - this.p_base.position[1]*stage.p2gScall),
        //                     rotation:-180/Math.PI*this.p_base.angle,
        //                 });
                        
        //         }else   //设置初始化位置
        //         {   
        //             this.g_base.x = 400;
        //             this.g_base.regX = sprite.getBounds().width/2;
        //             this.g_base.regY = sprite.getBounds().height/2;
                    
        //         }
        //     },
        //     initPhysical:function()
        //     {
        //         if (this.g_base) {

        //             this.boxShape = new p2.Circle({
        //                 radius: this.g_base.getBounds().width/stage.p2gScall/2,
        //                 width: this.g_base.getBounds().width/stage.p2gScall,
        //                 height: this.g_base.getBounds().height/stage.p2gScall,
        //             });
        //             this.p_base = new p2.Body({
        //                 mass: 1,
        //                 position: [(this.g_base.x)/stage.p2gScall, (2*stage.Width-this.g_base.y-100)/stage.p2gScall],
        //                 angularVelocity: 0,
        //             });
                    
        //             this.p_base.addShape(this.boxShape);
        //             stage.p2world.addBody(this.p_base);

        //         }
        //     }
        // },
        // {
        //     name:'dog1',
        //     g_base:null,
        //     p_base:null,
        //     boxShape:null,
        //     initGraphics:function(sprite)
        //     {
        //         if (this.p_base) {
        //             sprite.set(
        //                 {
        //                     x: this.p_base.position[0]*stage.p2gScall,
        //                     y: Math.min(stage.Height,stage.Height - this.p_base.position[1]*stage.p2gScall),
        //                     rotation:-180/Math.PI*this.p_base.angle,
        //                 });
                        
        //         }else   //设置初始化位置
        //         {   
        //             this.g_base.x = 400;
        //             this.g_base.regX = sprite.getBounds().width/2;
        //             this.g_base.regY = sprite.getBounds().height/2;
                    
        //         }
        //     },
        //     initPhysical:function()
        //     {
        //         if (this.g_base) {

        //             this.boxShape = new p2.Circle({
        //                 radius: this.g_base.getBounds().width/stage.p2gScall/2,
        //                 width: this.g_base.getBounds().width/stage.p2gScall,
        //                 height: this.g_base.getBounds().height/stage.p2gScall,
        //             });
        //             this.p_base = new p2.Body({
        //                 mass: 1,
        //                 position: [(this.g_base.x)/stage.p2gScall, (2*stage.Width-this.g_base.y-100)/stage.p2gScall],
        //                 angularVelocity: 0,
        //             });
                    
        //             this.p_base.addShape(this.boxShape);
        //             stage.p2world.addBody(this.p_base);

        //         }
        //     }
        // },
        // {
        //     name:'dog2',
        //     g_base:null,
        //     p_base:null,
        //     boxShape:null,
        //     initGraphics:function(sprite)
        //     {
        //         if (this.p_base) {
        //             sprite.set(
        //                 {
        //                     x: this.p_base.position[0]*stage.p2gScall,
        //                     y: Math.min(stage.Height,stage.Height - this.p_base.position[1]*stage.p2gScall),
        //                     rotation:-180/Math.PI*this.p_base.angle,
        //                 });
                        
        //         }else   //设置初始化位置
        //         {   
        //             this.g_base.x = 400;
        //             this.g_base.regX = sprite.getBounds().width/2;
        //             this.g_base.regY = sprite.getBounds().height/2;
                    
        //         }
        //     },
        //     initPhysical:function()
        //     {
        //         if (this.g_base) {

        //             this.boxShape = new p2.Circle({
        //                 radius: this.g_base.getBounds().width/stage.p2gScall/2,
        //                 width: this.g_base.getBounds().width/stage.p2gScall,
        //                 height: this.g_base.getBounds().height/stage.p2gScall,
        //             });
        //             this.p_base = new p2.Body({
        //                 mass: 1,
        //                 position: [(this.g_base.x)/stage.p2gScall, (2*stage.Width-this.g_base.y-100)/stage.p2gScall],
        //                 angularVelocity: 0,
        //             });
                    
        //             this.p_base.addShape(this.boxShape);
        //             stage.p2world.addBody(this.p_base);

        //         }
        //     }
        // },
        // {
        //     name:'dog3',
        //     g_base:null,
        //     p_base:null,
        //     boxShape:null,
        //     initGraphics:function(sprite)
        //     {
        //         if (this.p_base) {
        //             sprite.set(
        //                 {
        //                     x: this.p_base.position[0]*stage.p2gScall,
        //                     y: Math.min(stage.Height,stage.Height - this.p_base.position[1]*stage.p2gScall),
        //                     rotation:-180/Math.PI*this.p_base.angle,
        //                 });
                        
        //         }else   //设置初始化位置
        //         {   
        //             this.g_base.x = 400;
        //             this.g_base.regX = sprite.getBounds().width/2;
        //             this.g_base.regY = sprite.getBounds().height/2;
                    
        //         }
        //     },
        //     initPhysical:function()
        //     {
        //         if (this.g_base) {

        //             this.boxShape = new p2.Circle({
        //                 radius: this.g_base.getBounds().width/stage.p2gScall/2,
        //                 width: this.g_base.getBounds().width/stage.p2gScall,
        //                 height: this.g_base.getBounds().height/stage.p2gScall,
        //             });
        //             this.p_base = new p2.Body({
        //                 mass: 1,
        //                 position: [(this.g_base.x)/stage.p2gScall, (2*stage.Width-this.g_base.y-100)/stage.p2gScall],
        //                 angularVelocity: 0,
        //             });
                    
        //             this.p_base.addShape(this.boxShape);
        //             stage.p2world.addBody(this.p_base);

        //         }
        //     }
        // }
        
    ],
    babyList:[],
    init:function()
    {
        $('#mycanvas').attr('width',$('#stageSection').width());
        $('#mycanvas').attr('height',$('#stageSection').height());

        stage.Base = new createjs.Stage('mycanvas');

        stage.Width = $('#mycanvas').width();
        stage.Height = $('#mycanvas').height();

        createjs.Touch.enable(stage.Base,true,false); 

        stage.Already();
    },
    Already:function()
    {
        
        stage.initP2world();
        stage.initCatchHand();
        for (var i = 0; i < stage.spriteList.length; i++) {
            stage.spriteList[i].g_base = new createjs.Bitmap(LoadedRes[stage.spriteList[i].name]);

            stage.spriteList[i].initGraphics(stage.spriteList[i].g_base);
            stage.spriteList[i].initPhysical();
            stage.Base.addChild(stage.spriteList[i].g_base);
        }
       
        for (var j = 0; j < stage.babyNum; j++) {
            var baby = {
                num:j,
            };
            baby.initPhysical = function(){
                if (this.g_base) {
                    this.boxShape = new p2.Circle({
                        radius: (this.g_base.getBounds().width / stage.p2gScall) *3/ 7,
                        width: this.g_base.getBounds().width / stage.p2gScall,
                        height: this.g_base.getBounds().height / stage.p2gScall,
                    });
                    this.p_base = new p2.Body({
                        mass: 1,
                        position: [(this.g_base.x + 100) / stage.p2gScall, (2 * stage.Width - this.g_base.y) / stage.p2gScall],
                        angularVelocity: 0,
                    });

                    this.p_base.addShape(this.boxShape);
                    stage.p2world.addBody(this.p_base);
                }
            };
            baby.initGraphics = function()
            {
                if (this.p_base) {
                    this.g_base.set({
                        x: this.p_base.position[0] * stage.p2gScall,
                        y: Math.min(stage.Height, stage.Height - this.p_base.position[1] * stage.p2gScall),
                        rotation: -180 / Math.PI * this.p_base.angle,
                    });
                        
                }else   //设置初始化位置
                {   
                    this.g_base = new createjs.Bitmap(LoadedRes.doodle);
                    this.g_base.x = Math.random()*stage.Width;
                    this.g_base.y = Math.random()*(stage.Height/2) + stage.Height/2;
                    this.g_base.regX = this.g_base.getBounds().width/2;
                    this.g_base.regY = this.g_base.getBounds().height/2;
                }
            };
            baby.initGraphics();
            baby.initPhysical();
        
            baby.checkDinner = function()
            {
                if (this.g_base.y<=stage.catchHand.handFinger_left.g.y-stage.catchHand.handFinger_left.g.regY+stage.catchHand.handFinger_left.g.getBounds().height/2) {
                    console.log('win');
                    alert('你抓住了'+this.num+'号大宝贝!!');
                }    
            }

            stage.Base.addChild(baby.g_base);

            stage.babyList.push(baby);
            
        }

        // stage.initBtn()

        var handleTick = function(e)
        {
            stage.updateGraphics();
            stage.Base.update(e);
        };
        createjs.Ticker.addEventListener("tick", handleTick);
        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
        createjs.Ticker.setFPS(60);
    },
    initBtn:function ()
    {
        var leftbtn = new createjs.Bitmap(LoadedRes.leftbtn);
        var rightbtn = new createjs.Bitmap(LoadedRes.rightbtn);
        var catchbtn = new createjs.Bitmap(LoadedRes.catchbtn);

        leftbtn.set({
            x: stage.Width / 5,
            y: stage.Height / 2+450,
            regX: leftbtn.getBounds().width / 2,
            regY: leftbtn.getBounds().height / 2,
        });
        rightbtn.set({
            x: stage.Width * 4 / 5,
            y: stage.Height / 2+450,
            regX: rightbtn.getBounds().width / 2,
            regY: rightbtn.getBounds().height / 2,
        });
        catchbtn.set({
            x: stage.Width / 2,
            y: stage.Height / 2+450,
            regX: catchbtn.getBounds().width / 2,
            regY: catchbtn.getBounds().height / 2,
        });

        leftbtn.addEventListener("pressmove",function()
        {   
            stage.LeftShiftHand();
        });
        rightbtn.addEventListener("pressmove", function(event) {
            stage.RightShiftHand();
        });
        catchbtn.addEventListener("pressup", function(event) {
            if (stage.catchHand.canContrl) {
                console.log(stage.catchHand.mainBase);
                // stage.catchHand.mainBase.position
            }
        });
        

        stage.Base.addChild(leftbtn);
        stage.Base.addChild(rightbtn);
        stage.Base.addChild(catchbtn);
        

        
    },
    initP2world:function ()
    {
        // var app = new p2.WebGLRenderer(function(){

            stage.p2world = new p2.World({
                gravity: [0, -15]
            });

            // this.setWorld(stage.p2world);
        // });
        
        console.log(stage.p2world);
        
        // Create bottom plane
        planeShape = new p2.Plane();
        planeBody = new p2.Body({
            position: [0, 0]
        });
        planeBody.addShape(planeShape);
        stage.p2world.addBody(planeBody);
    
        // Left plane
        var leftshape = new p2.Plane();
        var planeLeft = new p2.Body({
            angle: -Math.PI / 2,
            position: [0, 0]
        });
        planeLeft.addShape(leftshape);
        stage.p2world.addBody(planeLeft);

        // Right plane
        var rightshape = new p2.Plane();
        var planeRight = new p2.Body({
            angle: Math.PI / 2,
            position: [stage.Width / stage.p2gScall, 0]
        });
        planeRight.addShape(rightshape);
        stage.p2world.addBody(planeRight);

        // Top plane
        var topshape = new p2.Plane();
        var planeTop = new p2.Body({
            angle: -Math.PI,
            position: [0, stage.Height / stage.p2gScall]
        });
        planeTop.addShape(topshape);
        stage.p2world.addBody(planeTop);
        
    },
    updateGraphics:function ()
    {
        for (var i = 0; i < stage.spriteList.length; i++) {
            stage.spriteList[i].initGraphics(stage.spriteList[i].g_base);
        };
        for (var j = 0; j < stage.babyList.length; j++) {
            stage.babyList[j].initGraphics();
        }
        stage.p2world.step(1/60);
        if (GetQueryString('devgravity') == 'true') {
            stage.p2world.gravity = [stage.gamma,-stage.beta];
        }
        
        stage.catchHand.handShape.g.set({
            x: stage.catchHand.mainBase.shapes[0].body.position[0] * stage.p2gScall,
            y: Math.min(stage.Height, stage.Height - stage.catchHand.mainBase.shapes[0].body.position[1] * stage.p2gScall),
            rotation: -180 / Math.PI * stage.catchHand.mainBase.angle,
            regY: stage.catchHand.handShape.g.getBounds().width/2 + stage.catchHand.handShape.offset[1] * stage.p2gScall,
            regX: stage.catchHand.handShape.g.getBounds().width/2 - stage.catchHand.handShape.offset[0] * stage.p2gScall,
            scaleY:10,
        });  

        stage.catchHand.handJoint.g.set({
            x: stage.catchHand.mainBase.shapes[1].body.position[0] * stage.p2gScall,
            y: Math.min(stage.Height, stage.Height - stage.catchHand.mainBase.shapes[1].body.position[1] * stage.p2gScall),
            rotation: -180 / Math.PI * stage.catchHand.mainBase.angle,
            regY: stage.catchHand.handJoint.g.getBounds().width/2 + stage.catchHand.handJoint.offset[1] * stage.p2gScall,
            regX: stage.catchHand.handJoint.g.getBounds().width/2 - stage.catchHand.handJoint.offset[0] * stage.p2gScall
        }); 

        stage.catchHand.handFinger_left.g.set({
            x: stage.catchHand.mainBase.shapes[2].body.position[0] * stage.p2gScall,
            y: Math.min(stage.Height, stage.Height - stage.catchHand.mainBase.shapes[2].body.position[1] * stage.p2gScall),
            rotation: -180 / Math.PI * stage.catchHand.mainBase.shapes[2].angle,
            regY: stage.catchHand.handFinger_left.g.getBounds().width/2 + stage.catchHand.handFinger_left.offset[1] * stage.p2gScall,
            regX: stage.catchHand.handFinger_left.g.getBounds().width/2 - stage.catchHand.handFinger_left.offset[0] * stage.p2gScall
        }); 

        stage.catchHand.handFinger_right.g.set({
            x: stage.catchHand.mainBase.shapes[3].body.position[0] * stage.p2gScall,
            y: Math.min(stage.Height, stage.Height - stage.catchHand.mainBase.shapes[3].body.position[1] * stage.p2gScall),
            rotation: -180 / Math.PI * stage.catchHand.mainBase.shapes[3].angle,
            regY: stage.catchHand.handFinger_right.g.getBounds().width/2 + stage.catchHand.handFinger_right.offset[1] * stage.p2gScall,
            regX: stage.catchHand.handFinger_right.g.getBounds().width/2 - stage.catchHand.handFinger_right.offset[0] * stage.p2gScall
        });
        
        // var beginCatchTween = new createjs.Tween.get(stage.catchHand.mainBase.position)
        //                                         .to([stage.catchHand.mainBase.position[0],1],500)
        //                                         .call(function(){stage.catchHand.canContrl=true;
        //                                             console.log(stage.catchHand.mainBase);});
        // if (stage.catchHand.canContrl) {
            stage.catchHand.shiftOffset = stage.catchHand.shiftOffset*0.8;
            stage.catchHand.mainBase.position[0] = stage.catchHand.initpostion[0]+stage.catchHand.shiftOffset;
        // }
        // stage.LeftShiftHand();                                
    },
    initCatchHand:function()
    {
        //创建Graphics
        stage.catchHand.handShape.g = new createjs.Bitmap(LoadedRes.handShape);
        stage.catchHand.handJoint.g = new createjs.Bitmap(LoadedRes.handJoint);
        stage.catchHand.handFinger_left.g = new createjs.Bitmap(LoadedRes.handFinger_left);
        stage.catchHand.handFinger_right.g = new createjs.Bitmap(LoadedRes.handFinger_right);

        stage.catchHand.handShape.g.set({
            x:stage.Width/2,
            y:stage.Height/2-stage.catchHand.handShape.g.getBounds().height/2-400,
            regX:stage.catchHand.handShape.g.getBounds().width/2,
            regY:stage.catchHand.handShape.g.getBounds().height/2,
        });
        stage.catchHand.handJoint.g.set({
            x:stage.Width/2,
            y:stage.Height/2 + stage.catchHand.handJoint.g.getBounds().height/2,
            regX:stage.catchHand.handJoint.g.getBounds().width/2,
            regY:stage.catchHand.handJoint.g.getBounds().height/2,
        });
        stage.catchHand.handFinger_left.g.set({
            x:stage.Width/2 - stage.catchHand.handFinger_left.g.getBounds().width,
            y:stage.Height/2 + stage.catchHand.handJoint.g.getBounds().height+ stage.catchHand.handFinger_left.g.getBounds().height/2,
            regX:stage.catchHand.handFinger_left.g.getBounds().width/2,
            regY:stage.catchHand.handFinger_left.g.getBounds().height/2,
        });
        stage.catchHand.handFinger_right.g.set({
            x:stage.Width/2 + stage.catchHand.handFinger_right.g.getBounds().width,
            y:stage.Height/2 + stage.catchHand.handJoint.g.getBounds().height+ stage.catchHand.handFinger_right.g.getBounds().height/2,
            regX:stage.catchHand.handFinger_right.g.getBounds().width/2,
            regY:stage.catchHand.handFinger_right.g.getBounds().height/2,
        });

        stage.Base.addChild(stage.catchHand.handShape.g);
        stage.Base.addChild(stage.catchHand.handJoint.g);
        stage.Base.addChild(stage.catchHand.handFinger_left.g);
        stage.Base.addChild(stage.catchHand.handFinger_right.g);

        //创建Physical
        stage.catchHand.mainBase = new p2.Body({
            mass: 100,
            position: [(stage.catchHand.handShape.g.x)/stage.p2gScall, (2*stage.Width-stage.catchHand.handShape.g.y)/stage.p2gScall],
            fixedY: true,
            fixedRotation: true,
            angularVelocity: 0,
        });

        stage.catchHand.initpostion = stage.catchHand.mainBase.position;

        stage.catchHand.handShape.p = new p2.Box({
            width:  stage.catchHand.handShape.g.getBounds().width / stage.p2gScall,
            height: stage.catchHand.handShape.g.getBounds().height / stage.p2gScall,
        });

        stage.catchHand.handJoint.p = new p2.Box({
            width:  stage.catchHand.handJoint.g.getBounds().width / stage.p2gScall,
            height: stage.catchHand.handJoint.g.getBounds().height / stage.p2gScall,
        });
        
        stage.catchHand.handFinger_left.p = new p2.Box({
            width:  stage.catchHand.handFinger_left.g.getBounds().width/2 / stage.p2gScall,
            height: stage.catchHand.handFinger_left.g.getBounds().height / stage.p2gScall,
        });
        
        stage.catchHand.handFinger_right.p = new p2.Box({
            width:  stage.catchHand.handFinger_right.g.getBounds().width/2 / stage.p2gScall,
            height: stage.catchHand.handFinger_right.g.getBounds().height / stage.p2gScall,
        });
        var handShape_offset = [];


        stage.catchHand.mainBase.addShape(stage.catchHand.handShape.p,[0,0],0);
        stage.catchHand.mainBase.addShape(stage.catchHand.handJoint.p,[stage.catchHand.handJoint.offset[0],stage.catchHand.handJoint.offset[1]],stage.catchHand.handJoint.angle);
        stage.catchHand.mainBase.addShape(stage.catchHand.handFinger_left.p,[stage.catchHand.handFinger_left.offset[0],stage.catchHand.handFinger_left.offset[1]],stage.catchHand.handFinger_left.angle);
        stage.catchHand.mainBase.addShape(stage.catchHand.handFinger_right.p,[stage.catchHand.handFinger_right.offset[0],stage.catchHand.handFinger_right.offset[1]],stage.catchHand.handFinger_right.angle);

        console.log(stage.catchHand.mainBase);
        
        stage.p2world.addBody(stage.catchHand.mainBase);

    },
};

$(document).ready(function()
{
    if(window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function(event) {
            var a = document.getElementById('alpha');
            var b = document.getElementById('beta');
            var g = document.getElementById('gamma');
            alpha = event.alpha,
            beta = event.beta,
            gamma = event.gamma;
            stage.alpha = Math.round(alpha);
            stage.beta = Math.round(beta);
            stage.gamma = Math.round(gamma);
            }, false);
        }else{
           alert('你的瀏覽器不支援喔');
        }
    document.body.addEventListener('touchmove',function(e)
    {
        pageScoll(e);
    },false);

    ScreenSize.width = window.innerWidth;
    ScreenSize.height = window.innerHeight;

    $('#stageSection').css('width',750+'px');
    $('#stageSection').css('height',ScreenSize.height);

    $("#loaderScence").css('width',750+'px');
    $("#loaderScence").css('height',ScreenSize.height);
    $("#loaderScence").css('left',(ScreenSize.width-750)/2);

    if (GetQueryString('testmode')=='true') {
        loaderClass=new ResLoader(BaseUrl,true,5500,''); // 服务器项目地址，调试模式，本地服务器接口，项目名字
    }else{
        loaderClass=new ResLoader(BaseUrl,false);// 线上
    }

    loaderClass.load(load_list,function(process){
               $("#process").html(process+"%");				//把进度显示在id为process的section上
           },function(){
       stage.init();
       $("#loaderScence").fadeOut(1000);
   });
});
