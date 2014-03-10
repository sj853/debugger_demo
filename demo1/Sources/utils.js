/**
 * Created by shang on 14-3-6.
 */
var Utils = {};

Utils.moveTime = function (p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)) / 100;
}

Utils.randPoint = function () {
    var winSize = cc.Director.getInstance().getWinSize();
    var x = Math.round(Math.random() * winSize.width);
    var y = Math.round(Math.random() * winSize.height);
    return cc.p(x, y);
}

Utils.createBug = function (id, img) {
    var bug = new BUG();
    bug.id = id;
    bug.name = "bug_" + bug.id;
    bug.init(img);
    return bug;
}