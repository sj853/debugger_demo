/**
 * Created by shang on 14-3-6.
 */
var BUG = cc.Sprite.extend({
    id: 0,
    name: null,
    ctor: function () {
        this._super();
        cc.registerTargetedDelegate(cc.MENU_HANDLER_PRIORITY, false, this);
    },
    onTouchBegan: function (touch, event) {
        COMBO_KILL_NUM = 0;
        return true;
    },
    onTouchMoved: function (touch, event) {
    },
    onTouchEnded: function (touch, event) {
        if (this.isTouchedMe(touch)) {
            COMBO_KILL_NUM++;
            this.dispose();
        }
        return true;
    },
    autoMove: function () {
        this.bugMove(Utils.randPoint());
    },
    isTouchedMe: function (touch) {
        var touchPostion = touch.getLocation();
        //获取bug图片区域
        var bugArea = this.getBoundingBox();
        return touchPostion.x > bugArea.x && touchPostion.x < (bugArea.x + bugArea.width )
            && touchPostion.y > bugArea.y && touchPostion.y < (bugArea.y + bugArea.height);
    },
    bugMove: function (point) {
        this.stopMove();
        var animation = cc.Animate.create(cc.AnimationCache.getInstance().getAnimation("walking"));
        var bugSelfAction = cc.RepeatForever.create(animation);
        var bugMoveAction = cc.MoveTo.create(Utils.moveTime(this.getPosition(), point), point);
        var stopMoveCallBack = cc.CallFunc.create(this.autoMove, this);
        this.runAction(bugSelfAction);
        this.runAction(cc.Sequence.create(bugMoveAction, stopMoveCallBack));
    },
    stopMove: function () {
        this.stopAllActions();
    },
    dispose: function () {
        this.stopMove();
        cc.unregisterTouchDelegate(this);
        var animation = cc.Animate.create(cc.AnimationCache.getInstance().getAnimation("exp"));
        var CallBack = cc.CallFunc.create(this.expCallBack, this);
        this.runAction(cc.Sequence.create(animation, CallBack));
        //避免animation放完才开始统计
//        if (typeof this.combo == "function") {
//            this.combo();
//        }
    },
    expCallBack: function () {
        this.removeFromParent();
        this.release();

    }
});