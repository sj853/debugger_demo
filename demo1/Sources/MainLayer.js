var COMBO_KILL_NUM = 0;
var KILL_CAL = {
    ZERO: 0,
    DOUBLE: 2,
    TRIBLE: 3,
    ULTRAL: 4,
    PANTA: 5
};

var MainLayer = function () {
    cc.log("MainLayer");
    this.layer1 = this.layer1 || {};
};

MainLayer.prototype.onDidLoadFromCCB = function () {
    if (sys.platform == 'browser') {
        this.onEnter();
    }
    else {
        this.rootNode.onEnter = function () {
            this.controller.onEnter();
        };
    }

    this.rootNode.onExit = function () {
        this.controller.onExit();
    };

    this.rootNode.onSchedUpdate = function (dt) {
        this.controller.onUpdate(dt);
    }

    this.rootNode.onTouchesBegan = function (touches, event) {
        this.controller.onTouchesBegan(touches, event);
        return true;
    };

    this.rootNode.onTouchesMoved = function (touches, event) {
        this.controller.onTouchesMoved(touches, event);
        return true;
    }

    this.rootNode.onTouchesEnded = function (touches, event) {
        this.controller.onTouchesEnded(touches, event);
        return true;
    }


    this.rootNode.setTouchEnabled(true);
    this.rootNode.schedule(this.onUpdate, 1);
};

MainLayer.prototype.onEnter = function () {
    cc.SpriteFrameCache.getInstance().addSpriteFrames("Resources/bug_walking_texture.plist");
    cc.SpriteFrameCache.getInstance().addSpriteFrames("Resources/exp_texture.plist");
    cc.AnimationCache.getInstance().addAnimations("Resources/bug_walking.plist");
    cc.AnimationCache.getInstance().addAnimations("Resources/exp.plist");
    this.createBugs();
}

MainLayer.prototype.onUpdate = function (dt) {
    //由于schedule是callback过来  this已不是MainLayer
    this.controller.createBugs();
}

MainLayer.prototype.onExitClicked = function () {
//    cc.log("onExitClicked");
}


MainLayer.prototype.onExit = function () {
//    cc.log("onExit");
}

MainLayer.prototype.onTouchesBegan = function (touches, event) {
//    cc.log("touch began");
}

MainLayer.prototype.onTouchesMoved = function (touches, event) {
//    cc.log("touch moved");
}

MainLayer.prototype.onTouchesEnded = function (touches, event) {
//    cc.log("touch end bugslength " + bugs.length);
    //var location = touches[touches.length - 1].getLocation();
//    cc.log("touch loaction: " + location.x + " - " + location.y);
    this.playMusic();
}

MainLayer.prototype.bugMove = function (bug, x, y) {
    this.stopMove(bug);
    var animation = cc.Animate.create(cc.AnimationCache.getInstance().getAnimation("walking"));
    var bugSelfAction = cc.RepeatForever.create(animation);
    var bugMoveAction = cc.MoveTo.create(this.moveTime(bug.getPosition(), {x: x, y: y}), cc.p(x, y));
    var stopMoveCallBack = cc.CallFunc.create(this.stopMove, this, bug);
    bug.runAction(bugSelfAction);
    bug.runAction(cc.Sequence.create(bugMoveAction, stopMoveCallBack));
}


MainLayer.prototype.stopMove = function (bug) {
    bug.stopAllActions();
}

MainLayer.prototype.createBugs = function () {
//    for (var i = 0; i < 10; i++) {
    var bug = Utils.createBug(0, "Resources/bug.png");
    bug.setPosition(Utils.randPoint());
    bug.combo = this.playMusic;
    this.layer1.addChild(bug);
    bug.autoMove();
//    }
}

MainLayer.prototype.randPoint = function () {
    var winSize = cc.Director.getInstance().getWinSize();
    var x = Math.round(Math.random() * winSize.width);
    var y = Math.round(Math.random() * winSize.height);
    return cc.p(x, y);
}

MainLayer.prototype.moveTime = function (p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)) / 100;
}

MainLayer.prototype.playMusic = function () {
    cc.log(" COMBO_KILL_NUM " + COMBO_KILL_NUM);
    switch (COMBO_KILL_NUM) {
        case KILL_CAL.ZERO:
//            cc.AudioEngine.getInstance().playMusic("Resources/sound/ybjc.mp3");
            break;
        case KILL_CAL.DOUBLE:
            cc.AudioEngine.getInstance().playMusic("Resources/sound/Double_Kill.wav");
            break;
        case KILL_CAL.TRIBLE:
            cc.AudioEngine.getInstance().playEffect("Resources/sound/triple_kill.wav");
            break;
        case KILL_CAL.ULTRAL:
            cc.AudioEngine.getInstance().playEffect("Resources/sound/UltraKill.wav");
            break;
        case KILL_CAL.PANTA:
            cc.AudioEngine.getInstance().playEffect("Resources/sound/MegaKill.wav",false);
            break;


    }
}





