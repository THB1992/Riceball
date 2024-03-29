window.__require = function e(t, i, n) {
function a(s, r) {
if (!i[s]) {
if (!t[s]) {
var c = s.split("/");
c = c[c.length - 1];
if (!t[c]) {
var l = "function" == typeof __require && __require;
if (!r && l) return l(c, !0);
if (o) return o(c, !0);
throw new Error("Cannot find module '" + s + "'");
}
}
var h = i[s] = {
exports: {}
};
t[s][0].call(h.exports, function(e) {
return a(t[s][1][e] || e);
}, h, h.exports, e, t, i, n);
}
return i[s].exports;
}
for (var o = "function" == typeof __require && __require, s = 0; s < n.length; s++) a(n[s]);
return a;
}({
AIMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "978a9hGBgpJlKAyE0XGAAwZ", "AIMgr");
var n = [ [ !0, !1, .5, !1, 0, !1, !1, 0, !1, !0, !0, !0, 2, !1, !1, !0, 0 ], [ !0, !1, .5, !1, .5, !1, !1, 0, !1, !0, !0, !0, 2, !1, !1, !0, 0 ], [ !0, !1, .5, !1, .5, !0, !0, 12, !0, !0, !0, !0, 2, !1, !1, !0, 0 ], [ !1, !0, .5, !1, 2, !0, !0, 18, !0, !1, !1, !0, 2, !1, !1, !0, 0 ], [ !1, !0, .5, !0, 2, !0, !0, 24, !0, !1, !1, !0, 2, !0, !1, !0, 1 ], [ !1, !0, .5, !0, 2.5, !0, !0, 30, !0, !1, !1, !0, 3, !0, !0, !0, 1 ], [ !1, !0, .5, !0, 3, !0, !0, 36, !0, !1, !1, !1, 4, !0, !0, !1, 1 ] ], a = [ [ [ 2, 2, 2, 3, 4, 5 ], [ .01, .01, .01 ], [ !0, !0, !0 ] ], [ [ 3, 3, 3, 4, 5, 6 ], [ .01, .01, .01 ], [ !0, !0, !0 ] ], [ [ 5, 5, 5, 6, 7, 8 ], [ .01, .01, .01 ], [ !0, !0, !0 ] ], [ [ 6, 6, 6, 7, 8, 9 ], [ .01, .01, .01 ], [ !0, !0, !0 ] ], [ [ 8, 8, 8, 9, 10, 11 ], [ .01, .01, .01 ], [ !0, !0, !1 ] ], [ [ 9, 9, 9, 10, 11, 12 ], [ .01, .01, .01 ], [ !0, !0, !1 ] ], [ [ 10, 10, 10, 11, 12, 13 ], [ .01, .01, .01 ], [ !0, !0, !1 ] ] ], o = e("Tools"), s = (e("ConfigData"), 
e("PlayerData")), r = e("Types").AICfgType, c = e("GameData"), l = e("Types").AIFreshCfgType;
cc.Class({
extends: cc.Component,
properties: {
_conditionFindeNextPos: null,
_actionMove: null,
_curAction: null,
_actionSeq: []
},
init: function(e, t, i) {
c.instance.isShowLog() && console.log("ai level:" + t);
var h = n[t], d = a[t];
this._conditionFindeNextPos = o.getOrAddComponent(this.node, "ConditionFindNextPos");
this._conditionFindeNextPos.init(e);
if (h[r.AINear]) {
this._conditionNearAnotherAI = o.getOrAddComponent(this.node, "ConditionNearAnotherAI");
this._conditionNearAnotherAI.init();
}
this._conditionFindEscapePos = o.getOrAddComponent(this.node, "ConditionFindEscapePos");
this._conditionFindEscapePos.init();
h[r.Slow] && (this._conditionAISlow = o.getOrAddComponent(this.node, "ConditionAISlow"));
this._conditionNearBlock = o.getOrAddComponent(this.node, "ConditionNearBlock");
this._conditionNearBlock.init();
this._conditionFindNoDangerPos = o.getOrAddComponent(this.node, "ConditionFindNoDangerPos");
this._conditionFindNoDangerPos.init(e);
this._conditionNearLocalHero = o.getOrAddComponent(this.node, "ConditionNearLocalHero");
this._conditionNearLocalHero.init();
this._conditionInThenOutLocalHero = o.getOrAddComponent(this.node, "ConditionInThenOutLocalHero");
this._conditionInThenOutLocalHero.init();
if (h[r.HeroDefence]) {
this._conditionLocalHeroDefence = o.getOrAddComponent(this.node, "ConditionLocalHeroDefence");
this._conditionLocalHeroDefence.init();
}
this._conditionRandomBool = o.getOrAddComponent(this.node, "ConditionRandomBool");
this._conditionRandomBool.init();
this._condtionLastTimeHeroDefence = o.getOrAddComponent(this.node, "ConditionLastTimeHeroDefence");
this._condtionLastTimeHeroDefence.init();
this._condtionLastTimeNearLocalHero = o.getOrAddComponent(this.node, "CondtionLastTimeNearLocalHero");
this._condtionLastTimeNearLocalHero.init();
this._heroDefenceThinkTime = h[r.HeroDefenceThinking];
if (h[r.LowKnife]) {
this._conditionLowKnifeNum = o.getOrAddComponent(this.node, "ConditionLowKnifeNum");
this._conditionLowKnifeNum.init(i);
}
if (h[r.KnifeLess]) {
this._conditionKnifeLessThenLocalHero = o.getOrAddComponent(this.node, "ConditionKnifeLessThenLocalHero");
this._conditionKnifeLessThenLocalHero.init(i);
}
this._conditionLastTimeHeroAttack = o.getOrAddComponent(this.node, "ConditionLastTimeHeroAttack");
this._conditionLastTimeHeroAttack.init();
if (h[r.lessKnifeEscape]) {
this._conditionLastTimeAttackLocalHero = o.getOrAddComponent(this.node, "ConditionLastTimeAttackLocalHero");
this._conditionLastTimeAttackLocalHero.init();
}
if (h[r.PickKnife]) {
this._conditionNearKnife = o.getOrAddComponent(this.node, "ConditionNearKnife");
this._conditionNearKnife.init();
}
this._conditionHighKnifeNum = o.getOrAddComponent(this.node, "ConditionHighKnifeNum");
this._conditionHighKnifeNum.init(i);
this._conditionHighKnifeNumNoPick = o.getOrAddComponent(this.node, "ConditionHignKnifeNumNoPick");
this._conditionHighKnifeNumNoPick.init(i, h[r.NoPickKnifeNum]);
var u = !d[l.removeToward] || !d[l.removeToward][s.instance.playCount];
if (h[r.TowardHero] && u) {
this._conditionTowardLocalHero = o.getOrAddComponent(this.node, "ConditionTowardLocalHero");
this._conditionTowardLocalHero.init();
}
if (h[r.HeroDefenceSilly]) {
this._conditionLocalHeroDefenceSilly = o.getOrAddComponent(this.node, "ConditionLocalHeroDefenceSilly");
this._conditionLocalHeroDefenceSilly.init();
}
this._conditionHighKnifeNumLocalHero = o.getOrAddComponent(this.node, "ConditionHighKnifeNumLocalHero");
this._conditionHighKnifeNumLocalHero.init();
if (h[r.KnifeMoreSilly]) {
this._conditionKnifeMoreSilly = o.getOrAddComponent(this.node, "ConditionKnifeMoreSilly");
this._conditionKnifeMoreSilly.init();
}
this._conditionKnifeMoreThenLocalHero = o.getOrAddComponent(this.node, "ConditionKnifeMoreThenLocalHero");
this._conditionKnifeMoreThenLocalHero.init(i);
if (h[r.moreKnifeToward]) {
this._conditionKnifeMuchMoreThenLocalHero = this.node.addComponent("ConditionKnifeMoreThenLocalHero");
this._conditionKnifeMuchMoreThenLocalHero.init(i, 4);
this._conditionLowKnifeNumLocalHero = o.getOrAddComponent(this.node, "ConditionLowKnifeNumLocalHero");
this._conditionLowKnifeNumLocalHero.init();
}
if (h[r.peace]) {
this._conditionLastTimePeace = o.getOrAddComponent(this.node, "ConditionLastTimePeace");
this._conditionLastTimePeace.init();
}
this._conditionLastTimeToward = o.getOrAddComponent(this.node, "ConditionLastTimeToward");
this._conditionLastTimeToward.init();
this._towardTime = h[r.towardTime];
this._conditionHasToward = o.getOrAddComponent(this.node, "ConditionHasToward");
if (d[l.noPickNum] && d[l.noPickNum][s.instance.playCount]) {
this._conditionNoMoreKnife = o.getOrAddComponent(this.node, "ConditionNoMoreKnife");
this._conditionNoMoreKnife.init(d[l.noPickNum][s.instance.playCount]);
}
this._conditionKilled = o.getOrAddComponent(this.node, "ConditionKilled");
this._conditionKilled.init(i);
if (h[r.ReviveTotal]) {
this._conditionReviveTotal = o.getOrAddComponent(this.node, "ConditionReviveTotal");
this._conditionReviveTotal.init(h[r.ReviveTotal]);
}
this._actionMove = o.getOrAddComponent(this.node, "ActionMove");
this._actionMove.init();
this._actionDefence = o.getOrAddComponent(this.node, "ActionDefence");
this._actionDefence.init(h[r.DefenceTime]);
d[l.noDefence] && d[l.noDefence][s.instance.playCount] && this._actionDefence.init(d[l.noDefence][s.instance.playCount]);
this._doOneTimeCondition();
},
_doOneTimeCondition: function() {
if (this._conditionAISlow) {
this._conditionAISlow.doResult();
this._conditionAISlow.isTrue() && this.node.emit("changeSpeedRate", this._conditionAISlow.result);
}
if (this._conditionFindeNextPos) {
this._conditionFindeNextPos.doResult();
this._conditionFindeNextPos.isTrue() && this._actionMove.setNextPos(this._conditionFindeNextPos.result);
}
this._conditionLastTimePeace && this._conditionLastTimePeace.doResultWithParam(10);
},
updateGameLogic: function(e) {
this._switchCurAction(e);
this._updateCurAction(e);
this._checkNextAction(e);
},
_switchCurAction: function(e) {
if (this._conditionInThenOutLocalHero && this._conditionInThenOutLocalHero.isTrue()) {
this._actionSeq = [];
this._curAction && this._curAction.endAction();
this._conditionInThenOutLocalHero.clearResult();
}
if (this._conditionNearLocalHero && this._conditionNearLocalHero.isTrue()) {
if (this._conditionLowKnifeNum) {
this._conditionLowKnifeNum.doResult();
if (this._conditionLowKnifeNum.isTrue() && this._conditionFindEscapePos) {
this._conditionFindEscapePos.doResultWithParam([ this._conditionNearLocalHero.result ]);
if (this._conditionFindEscapePos.isTrue()) {
this._actionSeq = [];
this._actionMove.setNextPos(this._conditionFindEscapePos.result);
this._actionSeq.push(this._actionMove);
this._actionDefence.reset();
this._actionSeq.push(this._actionDefence);
this._curAction = this._actionSeq.shift();
this._curAction.startAction();
this._conditionNearLocalHero.clearResult();
this._conditionFindEscapePos.clearResult();
return;
}
}
}
if (this._conditionLocalHeroDefence) {
this._conditionLocalHeroDefence.doResult();
if (this._conditionLocalHeroDefence.isTrue()) {
this._condtionLastTimeNearLocalHero && this._condtionLastTimeNearLocalHero.doResultWithParam(this._heroDefenceThinkTime);
if (!this._condtionLastTimeNearLocalHero || this._condtionLastTimeNearLocalHero.isTrue()) {
if (this._condtionLastTimeHeroDefence && this._condtionLastTimeHeroDefence.isTrue()) {
this._condtionLastTimeHeroDefence.doResultWithParam(.5);
if ((!this._conditionLastTimePeace || this._conditionLastTimePeace.isTrue()) && this._conditionLowKnifeNumLocalHero) {
this._conditionLowKnifeNumLocalHero.doResult();
if (this._conditionLowKnifeNumLocalHero.isTrue() && this._conditionKnifeMuchMoreThenLocalHero) {
this._conditionKnifeMuchMoreThenLocalHero.doResult();
if (this._conditionKnifeMuchMoreThenLocalHero.isTrue()) {
this._actionSeq = [];
this._actionMove.setNextPos(this._conditionNearLocalHero.result.node.position);
this._actionSeq.push(this._actionMove);
this._curAction = this._actionSeq.shift();
this._curAction.startAction();
this._conditionNearLocalHero.clearResult();
return;
}
}
}
if (this._conditionRandomBool) {
this._conditionRandomBool.doResult();
if (this._conditionRandomBool.isTrue()) {
this._actionSeq = [];
this._actionMove.setNextPos(this.node.position);
this._actionSeq.push(this._actionMove);
this._actionDefence.reset();
this._actionSeq.push(this._actionDefence);
this._curAction = this._actionSeq.shift();
this._curAction.startAction();
this._conditionNearLocalHero.clearResult();
return;
}
this._conditionRandomBool.doResult();
if (this._conditionRandomBool.isTrue()) {
if (this._conditionFindNoDangerPos && this._actionMove && !this._actionMove.isActionEnd()) {
this._conditionFindNoDangerPos.doResultWithParam([ [ this._conditionNearLocalHero.result.node ], this._actionMove.getNextPos() ]);
if (this._conditionFindNoDangerPos.isTrue()) {
this._actionSeq = [];
this._actionMove.setRoutePos(this._conditionFindNoDangerPos.result);
this._actionSeq.push(this._actionMove);
this._actionDefence.reset();
this._actionSeq.push(this._actionDefence);
this._curAction = this._actionSeq.shift();
this._curAction.startAction();
this._conditionNearLocalHero.clearResult();
this._conditionFindNoDangerPos.clearResult();
return;
}
}
} else if (this._conditionFindEscapePos) {
this._conditionFindEscapePos.doResultWithParam([ this._conditionNearLocalHero.result ]);
if (this._conditionFindEscapePos.isTrue()) {
this._actionSeq = [];
this._actionMove.setNextPos(this._conditionFindEscapePos.result);
this._actionSeq.push(this._actionMove);
this._actionDefence.reset();
this._actionSeq.push(this._actionDefence);
this._curAction = this._actionSeq.shift();
this._curAction.startAction();
this._conditionNearLocalHero.clearResult();
this._conditionFindEscapePos.clearResult();
}
}
}
} else this._conditionNearLocalHero.clearResult();
return;
}
} else {
this._condtionLastTimeHeroDefence && this._condtionLastTimeHeroDefence.clearResult();
this._condtionLastTimeNearLocalHero && this._condtionLastTimeNearLocalHero.clearResult();
}
}
if (this._conditionLocalHeroDefenceSilly) {
this._conditionLocalHeroDefenceSilly.doResult();
if (this._conditionLocalHeroDefenceSilly.isTrue() && this._conditionHighKnifeNumLocalHero) {
this._conditionHighKnifeNumLocalHero.doResult();
if (this._conditionHighKnifeNumLocalHero.isTrue()) {
this._actionSeq = [];
this._actionMove.setNextPos(this._conditionNearLocalHero.result.node.position);
this._actionSeq.push(this._actionMove);
this._curAction = this._actionSeq.shift();
this._curAction.startAction();
this._conditionNearLocalHero.clearResult();
return;
}
}
}
if (this._conditionKnifeLessThenLocalHero) {
this._conditionKnifeLessThenLocalHero.doResult();
if (this._conditionKnifeLessThenLocalHero.isTrue()) {
this._conditionLastTimeAttackLocalHero && this._conditionLastTimeAttackLocalHero.doResultWithParam(.5);
if (!this._conditionLastTimeAttackLocalHero || this._conditionLastTimeAttackLocalHero.isTrue()) {
if (this._conditionLastTimeHeroAttack && this._conditionLastTimeHeroAttack.isTrue()) {
this._conditionLastTimeHeroAttack.doResultWithParam(1.5);
if (this._conditionRandomBool) {
this._conditionRandomBool.doResult();
if (this._conditionRandomBool.isTrue()) {
this._actionSeq = [];
this._actionMove.setNextPos(this.node.position);
this._actionSeq.push(this._actionMove);
this._actionDefence.reset();
this._actionSeq.push(this._actionDefence);
this._curAction = this._actionSeq.shift();
this._curAction.startAction();
this._conditionNearLocalHero.clearResult();
} else if (this._conditionFindEscapePos) {
this._conditionFindEscapePos.doResultWithParam([ this._conditionNearLocalHero.result ]);
if (this._conditionFindEscapePos.isTrue()) {
this._actionSeq = [];
this._actionMove.setNextPos(this._conditionFindEscapePos.result);
this._actionSeq.push(this._actionMove);
this._actionDefence.reset();
this._actionSeq.push(this._actionDefence);
this._curAction = this._actionSeq.shift();
this._curAction.startAction();
this._conditionNearLocalHero.clearResult();
this._conditionFindEscapePos.clearResult();
}
}
}
} else this._conditionNearLocalHero.clearResult();
return;
}
}
}
if (this._conditionKnifeMoreSilly && this._conditionKnifeMoreSilly.isTrue() && this._conditionKnifeMoreThenLocalHero) {
this._conditionKnifeMoreThenLocalHero.doResult();
if (this._conditionKnifeMoreThenLocalHero.isTrue() && this._conditionFindEscapePos) {
this._conditionFindEscapePos.doResultWithParam([ this._conditionNearLocalHero.result ]);
if (this._conditionFindEscapePos.isTrue()) {
this._actionSeq = [];
this._actionMove.setNextPos(this._conditionFindEscapePos.result);
this._actionSeq.push(this._actionMove);
this._actionDefence.reset();
this._actionSeq.push(this._actionDefence);
this._curAction = this._actionSeq.shift();
this._curAction.startAction();
this._conditionNearLocalHero.clearResult();
this._conditionFindEscapePos.clearResult();
return;
}
}
}
if ((!this._conditionLastTimePeace || this._conditionLastTimePeace.isTrue()) && this._conditionHasToward && !this._conditionHasToward.isTrue() && this._conditionTowardLocalHero && this._conditionTowardLocalHero.isTrue() && this._conditionLastTimeToward) {
this._conditionLastTimeToward.doResultWithParam(o.getRandomFloat(this._towardTime, this._towardTime + 1));
if (!this._conditionLastTimeToward.isTrue()) {
this._actionSeq = [];
this._actionMove.setNextPos(this._conditionNearLocalHero.result.node.position);
this._actionSeq.push(this._actionMove);
this._curAction = this._actionSeq.shift();
this._curAction.startAction();
this._conditionNearLocalHero.clearResult();
return;
}
this._conditionHasToward.doResultWithParam(!0);
this._actionSeq = [];
this._curAction && this._curAction.endAction();
}
this._conditionNearLocalHero.clearResult();
} else {
this._condtionLastTimeNearLocalHero && this._condtionLastTimeNearLocalHero.clearResult();
this._conditionLastTimeAttackLocalHero && this._conditionLastTimeAttackLocalHero.clearResult();
this._conditionLastTimeToward && this._conditionLastTimeToward.clearResult();
this._conditionHasToward && this._conditionHasToward.clearResult();
}
if (this._conditionNearBlock && this._conditionNearBlock.isTrue() && this._conditionFindNoDangerPos && this._actionMove && !this._actionMove.isActionEnd()) {
this._conditionFindNoDangerPos.doResultWithParam([ this._conditionNearBlock.result, this._actionMove.getNextPos() ]);
if (this._conditionFindNoDangerPos.isTrue()) {
this._actionSeq = [];
this._actionMove.setRoutePos(this._conditionFindNoDangerPos.result);
this._actionSeq.push(this._actionMove);
this._actionDefence.reset();
this._actionSeq.push(this._actionDefence);
this._curAction = this._actionSeq.shift();
this._curAction.startAction();
this._conditionNearBlock.clearResult();
this._conditionFindNoDangerPos.clearResult();
return;
}
this._actionSeq = [];
this._curAction && this._curAction.endAction();
}
if (this._conditionNearAnotherAI && this._conditionNearAnotherAI.isTrue() && (!this._conditionHighKnifeNum || !this._conditionHighKnifeNum.isTrue()) && this._conditionFindEscapePos) {
this._conditionFindEscapePos.doResultWithParam(this._conditionNearAnotherAI.result);
if (this._conditionFindEscapePos.isTrue()) {
this._actionSeq = [];
this._actionMove.setNextPos(this._conditionFindEscapePos.result);
this._actionSeq.push(this._actionMove);
this._actionDefence.reset();
this._actionSeq.push(this._actionDefence);
this._curAction = this._actionSeq.shift();
this._curAction.startAction();
this._conditionNearAnotherAI.clearResult();
this._conditionFindEscapePos.clearResult();
return;
}
}
if (!this._curAction) {
if (this._conditionNearKnife && this._conditionNearKnife.isTrue() && this._conditionHighKnifeNumNoPick && !this._conditionHighKnifeNumNoPick.isTrue()) {
this._actionMove.setNextPos(this._conditionNearKnife.result.node.position);
this._actionSeq.push(this._actionMove);
this._curAction = this._actionSeq.shift();
this._curAction.startAction();
this._conditionNearKnife.clearResult();
return;
}
if (this._conditionFindeNextPos) {
this._conditionFindeNextPos.doResult();
if (this._conditionFindeNextPos.isTrue()) {
this._actionMove.setNextPos(this._conditionFindeNextPos.result);
this._actionSeq.push(this._actionMove);
this._actionDefence.reset();
this._actionSeq.push(this._actionDefence);
this._curAction = this._actionSeq.shift();
this._curAction.startAction();
}
}
}
},
_updateCurAction: function(e) {
this._curAction && this._curAction.updateGameLogic(e);
},
_checkNextAction: function(e) {
if (this._curAction && this._curAction.isActionEnd()) if (this._actionSeq.length > 0) {
this._curAction = this._actionSeq.shift();
this._curAction.startAction();
} else this._curAction = null;
},
addNearOther: function(e) {
if (e.isLocal) {
this._conditionNearLocalHero && this._conditionNearLocalHero.doResultWithParam(e);
this._conditionInThenOutLocalHero && this._conditionInThenOutLocalHero.doResultWithParam(!0);
} else this._conditionNearAnotherAI && this._conditionNearAnotherAI.doResultWithParam(e);
},
leaveOther: function(e) {
e.isLocal && this._conditionInThenOutLocalHero && this._conditionInThenOutLocalHero.doResultWithParam(!1);
},
addNearBlock: function(e) {
this._conditionNearBlock && this._conditionNearBlock.doResultWithParam(e);
},
addNearKnife: function(e) {
this._conditionNearKnife && this._conditionNearKnife.doResultWithParam(e);
},
setLocalHero: function(e) {
this._conditionLocalHeroDefence && this._conditionLocalHeroDefence.setLocalHero(e);
this._conditionLocalHeroDefenceSilly && this._conditionLocalHeroDefenceSilly.setLocalHero(e);
this._conditionHighKnifeNumLocalHero && this._conditionHighKnifeNumLocalHero.setLocalHero(e);
this._conditionKnifeLessThenLocalHero && this._conditionKnifeLessThenLocalHero.setLocalHero(e);
this._conditionKnifeMoreThenLocalHero && this._conditionKnifeMoreThenLocalHero.setLocalHero(e);
this._conditionKnifeMuchMoreThenLocalHero && this._conditionKnifeMuchMoreThenLocalHero.setLocalHero(e);
this._conditionLowKnifeNumLocalHero && this._conditionLowKnifeNumLocalHero.setLocalHero(e);
},
getNoMoreKnifeNum: function() {
return this._conditionNoMoreKnife ? this._conditionNoMoreKnife.result : 999;
},
initWalls: function(e) {
1 === e && this.node.emit("initWalls", e);
},
onDie: function() {
if (this._conditionKilled) {
this._conditionKilled.doResult();
if (this._conditionKilled.isTrue()) {
this._actionSeq = [];
this._curAction && this._curAction.endAction();
this._conditionKilled.clearResult();
}
}
},
getReviveTotal: function() {
return this._conditionReviveTotal ? this._conditionReviveTotal.result : 0;
}
});
cc._RF.pop();
}, {
ConfigData: "ConfigData",
GameData: "GameData",
PlayerData: "PlayerData",
Tools: "Tools",
Types: "Types"
} ],
ActionBaseComponent: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "3a957SKyE5MxoQ54Qptlwk7", "ActionBaseComponent");
var n = e("Types").ActionState;
cc.Class({
extends: cc.Component,
properties: {
actionState: n.Begin
},
updateGameLogic: function(e) {
return this.actionState;
},
startAction: function() {
this.actionState = n.Ing;
},
isActionIng: function() {
return this.actionState === n.Ing;
},
endAction: function() {
this.actionState = n.End;
},
isActionEnd: function() {
return this.actionState === n.End;
}
});
cc._RF.pop();
}, {
Types: "Types"
} ],
ActionDefence: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "61cb5P52pVEd7HVGVzt1YB1", "ActionDefence");
var n = e("ActionBaseComponent");
cc.Class({
extends: n,
properties: {
_defenceTime: 2,
_defenceCount: 2
},
init: function(e) {
this._defenceTime = e;
},
reset: function() {
this._defenceCount = this._defenceTime;
},
updateGameLogic: function(e) {
if (this.isActionIng()) {
this._defenceCount -= e;
this._defenceCount <= 0 && this.endAction();
}
return this.actionState;
}
});
cc._RF.pop();
}, {
ActionBaseComponent: "ActionBaseComponent"
} ],
ActionMove: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "8212e7vBZFNub9HBtkijeWd", "ActionMove");
var n = e("ActionBaseComponent"), a = e("GameData"), o = e("Tools"), s = e("Types").MapType;
cc.Class({
extends: n,
properties: {
_curPos: null,
_nextPos: null,
_moveDir: null,
_routePos: null
},
init: function() {
this.move = o.getOrAddComponent(this.node, "HeroMove");
this._Width = .9 * a.instance.mapWidth;
this._height = .9 * a.instance.mapHeight;
this._min = cc.v2(-this._Width / 2, -this._height / 2);
this._max = cc.v2(this._Width / 2, this._height / 2);
this.node.on("setMapSize", this.setMapSize, this);
this.node.on("initWalls", this.initWalls, this);
},
initWalls: function(e) {
this.wallType = e;
this.setMapSize([ this._Width, this._height ]);
},
moveMag: function() {
return this.move ? this.move.getCurSpeed() / a.instance.logicFps * (this.move.getCurSpeed() / a.instance.logicFps) + 30 : 1e3;
},
setMapSize: function(e) {
var t = e[0], i = e[1];
this._Width = this.getReal(t);
this._height = this.getReal(i);
this._min = cc.v2(-this._Width / 2, -this._height / 2);
this._max = cc.v2(this._Width / 2, this._height / 2);
this.fixNextPos();
},
getReal: function(e) {
var t = .9 * e;
this.wallType && this.wallType === s.Circle && (t /= 1.5);
return t;
},
fixNextPos: function() {
this._nextPos = this._nextPos.clampf(this._min, this._max);
this._routePos = this._routePos ? this._routePos.clampf(this._min, this._max) : null;
},
setNextPos: function(e) {
this._nextPos = e;
},
getNextPos: function() {
return this._nextPos;
},
setRoutePos: function(e) {
this._routePos = e;
},
updateGameLogic: function(e) {
if (this.isActionIng()) if (this._checkIfFind()) this.endAction(); else {
this._CalMoveDir();
this.node.emit("onMoveBy", {
dPos: this._moveDir
});
}
return this.actionState;
},
endAction: function() {
this._super();
this.node.emit("onStopMoving");
},
_checkIfFind: function() {
this._curPos = this.node.position;
return this._nextPos.sub(this._curPos).magSqr() <= this.moveMag();
},
_CalMoveDir: function() {
this._curPos = this.node.position;
this._moveDir = this._routePos ? this._routePos.sub(this._curPos) : this._nextPos.sub(this._curPos);
this._routePos = null;
}
});
cc._RF.pop();
}, {
ActionBaseComponent: "ActionBaseComponent",
GameData: "GameData",
Tools: "Tools",
Types: "Types"
} ],
ActiveByOwner: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "bec90TEHwBF/J+2wL5l858f", "ActiveByOwner");
cc.Class({
extends: cc.Component,
properties: {
player: null,
_isDefence: !0
},
init: function(e, t) {
this.player = e;
this.activeNode = t;
this.activeNode.active = !1;
},
update: function(e) {
if (this.player.beKilled()) {
if (this._isDefence) {
this._isDefence = !1;
this.activeNode.active = !1;
}
} else if (this._isDefence !== this.player.isDefence) {
this._isDefence = this.player.isDefence;
this.activeNode.active = this._isDefence;
}
}
});
cc._RF.pop();
}, {} ],
AdBtn: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "fb707r8QT1Ouqga2F1avY+c", "AdBtn");
cc.Class({
extends: cc.Component,
properties: {
text: cc.Node,
offset: 5
},
update: function(e) {
var t = this.node.width + this.offset + this.text.width;
this.node.x = -t / 2 + this.node.width / 2;
this.text.x = this.node.x + this.node.width / 2 + this.offset + this.text.width / 2;
}
});
cc._RF.pop();
}, {} ],
AddEntitySystem: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "1eb918+7xhNY6TNYM+XOZvM", "AddEntitySystem");
var n = e("Tools"), a = e("UIUtil"), o = e("PlayerData"), s = e("ConfigData"), r = e("GameData"), c = e("Types").PoolType, l = e("Types").GrowType, h = e("PlatformMgr"), d = cc.Class({
extends: cc.Component,
statics: {
instance: null,
init: function(e) {
d.instance = e;
}
},
properties: {
mapNode: cc.Node,
itemNode: cc.Node,
playerUIDown: cc.Node,
playerEffectDown: cc.Node,
playerNode: cc.Node,
weaponNode: cc.Node,
playerUIUpNode: cc.Node,
playerEffectUpNode: cc.Node,
playerEffectUpSecondNode: cc.Node,
playerCtxParent: cc.Node,
mapPrefab: cc.Prefab,
wallNode: cc.Node,
blockNode: cc.Node,
effectNode: cc.Node,
defencePrefab: cc.Prefab,
diePrefab: cc.Prefab,
nameLabelPrefab: cc.Prefab,
nameNode: cc.Node,
heroKnifeNumPrefab: cc.Prefab,
heroFrenzyPrefab: cc.Prefab,
rankIconPrefab: cc.Prefab,
playerIconNode: cc.Node,
buffNode: cc.Node,
boxNode: cc.Node,
bigEffectPrefab: cc.Prefab,
fastEffectPrefab: cc.Prefab,
hardEffectPrefab: cc.Prefab,
magnetEffectPrefab: cc.Prefab,
bigEffectTextPrefab: cc.Prefab,
fastEffectTextPrefab: cc.Prefab,
hardEffectTextPrefab: cc.Prefab,
magnetEffectTextPrefab: cc.Prefab,
defenceTipsPrefab: cc.Prefab,
frenzyEffectPrefab: cc.Prefab,
defenceStartPrefab: cc.Prefab,
attackStartPrefab: cc.Prefab,
arrowKnifePrefab: cc.Prefab,
powerArrowPrefab: cc.Prefab,
dangerousPrefab: cc.Prefab,
pikaEffectPrefab: cc.Prefab,
ctxPrefab: cc.Prefab,
nezhaEffectPrefab: cc.Prefab,
heroFlagPrefab: cc.Prefab,
heroFlagNode: cc.Node,
heroKeyPrefab: cc.Prefab,
heroKeyNode: cc.Node,
ultraEffectPrefab: cc.Prefab,
guideNode: cc.Node,
guidePrefab: cc.Prefab,
yellowManEffectPrefab: cc.Prefab
},
init: function(e, t, i, n) {
this.poolMgr = i;
this.mapType = n;
this.setMapSize(e, t);
this.mapZone = [ [ 0, 0 ], [ 2, 2 ], [ 2, 0 ], [ 0, 2 ], [ 2, 1 ], [ 0, 1 ], [ 1, 0 ], [ 1, 2 ] ];
this.blockTypes = [ c.BLOCK, c.BLOCK_01, c.BLOCK_02, c.BLOCK_03, c.BLOCK_04, c.BLOCK_05, c.BLOCK_06, c.BLOCK_07, c.BLOCK_08 ];
this.tempKnifes = [];
},
setMapSize: function(e, t) {
this.mapWidth = e;
this.mapHeight = t;
this.mapXs = [ -e / 2, -e / 4, e / 4, e / 2 ];
this.mapYs = [ -t / 2, -t / 4, t / 4, t / 2 ];
this.blockXs = [ 1 * -e / 4, 1 * e / 4, n.getRandomInt(-e / 6, e / 6) ];
this.blockYs = [ n.getRandomInt(-t / 6, t / 6), n.getRandomInt(-t / 6, t / 6), n.getRandomBool() ? 1 * -t / 4 : 1 * t / 4 ];
},
cleanUp: function() {
this.mapNode.destroyAllChildren();
this.playerNode.destroyAllChildren();
this.weaponNode.destroyAllChildren();
this.nameNode.destroyAllChildren();
this.playerIconNode.destroyAllChildren();
this.playerUIUpNode.destroyAllChildren();
this.playerEffectUpSecondNode.destroyAllChildren();
this.playerEffectUpNode.destroyAllChildren();
this.itemNode.destroyAllChildren();
this.playerUIDown.destroyAllChildren();
this.playerEffectDown.destroyAllChildren();
this.wallNode.destroyAllChildren();
this.blockNode.destroyAllChildren();
this.effectNode.destroyAllChildren();
this.buffNode.destroyAllChildren();
this.boxNode.destroyAllChildren();
this.heroFlagNode.destroyAllChildren();
this.heroKeyNode.destroyAllChildren();
this.guideNode.destroyAllChildren();
},
addMap: function(e, t, i) {
var n = cc.instantiate(this.mapPrefab), a = n.getComponent("EntityMap");
n.parent = this.mapNode;
a.init(e, t, i);
return a;
},
_addEntityPlayer: function(e, t, i, r, c, l, h, d, u, f, p, m, g, y, v) {
var k = this.poolMgr.getPlayer(), C = k.getComponent("EntityPlayer");
k.parent = this.playerNode;
k.position = cc.v2(l, h);
var S = this.poolMgr.getFollowPlayer(), w = S.getComponent("EntityFollowPlayer");
S.parent = this.weaponNode;
var T = cc.instantiate(this.nameLabelPrefab);
T.parent = this.nameNode;
var N = T.getComponent("PlayerName");
N.nickname.string = c;
var _ = n.getOrAddComponent(T, "MoveWithOwnerNode");
_.init(k, N);
var b = n.getOrAddComponent(T, "ScaleByOwner");
b.init(k);
var R = cc.instantiate(this.rankIconPrefab);
R.parent = this.playerIconNode;
var P = R.getComponent("PlayerRankIcon");
C._rankComp = P;
a.loadResSprite(P.icon, d.url);
(_ = n.getOrAddComponent(R, "MoveWithOwnerNode")).init(k, P);
(b = n.getOrAddComponent(R, "ScaleByOwner")).init(k);
var D = cc.instantiate(this.heroKnifeNumPrefab);
D.parent = this.playerUIUpNode;
var L = D.getComponent("HeroKnifeNum");
L.init(C);
(_ = n.getOrAddComponent(D, "MoveWithOwnerNode")).init(k, L);
n.getOrAddComponent(D, "ScaleByOwner").init(k);
var I = cc.instantiate(this.heroFlagPrefab);
I.parent = this.heroFlagNode;
var A = I.getComponent("HeroFlag");
a.loadResFlag(A.icon, u);
(_ = n.getOrAddComponent(I, "MoveWithOwnerNode")).init(k, A);
(b = n.getOrAddComponent(I, "ScaleByOwner")).init(k);
C._flagNode = I;
C._flagComp = A;
if (v) {
var M = cc.instantiate(this.heroKeyPrefab);
M.parent = this.heroKeyNode;
var B = M.getComponent("HeroKey");
(_ = n.getOrAddComponent(M, "MoveWithOwnerNode")).init(k, B);
(b = n.getOrAddComponent(M, "ScaleByOwner")).init(k);
C._keyNode = M;
C._keyComp = B;
}
w.init(C);
var x = o.instance.rankData.id >= s.instance.clientData.frenzyLimit;
C.init(e, t, w, i, r, N, d, R, u, f, p, m, g, y, x, v);
if (e) {
var E = cc.instantiate(this.heroFrenzyPrefab);
E.parent = this.playerUIUpNode;
var F = E.getComponent("HeroFrenzyBar");
F.init(C);
(_ = n.getOrAddComponent(E, "MoveWithOwnerNode")).init(k, F);
n.getOrAddComponent(E, "ScaleByOwner").init(k);
C._frenzyBar = E;
E.active = !1;
if (d.id < s.instance.clientData.tipsRankLimit) {
var K = cc.instantiate(this.defenceTipsPrefab);
K.parent = this.playerUIUpNode;
C._defenceTips = K;
K.active = !1;
(_ = n.getOrAddComponent(K, "MoveWithOwnerNode")).init(k, K.getComponent(cc.Sprite));
n.getOrAddComponent(K, "ScaleFix").init(k);
}
} else {
var G = cc.instantiate(this.powerArrowPrefab);
G.parent = this.playerEffectUpSecondNode;
P = G.getComponent("PowerArrow");
C._powerArrow = P;
}
this._createEffect(C);
return C;
},
_createEffect: function(e) {
e._defenceEffect = this._createEntityEffect(this.defencePrefab, "EntityEffect", e, this.playerEffectUpNode);
n.getOrAddComponent(e._defenceEffect.node, "ActiveByOwner").init(e, e._defenceEffect.activeNode);
e._dangerousEffect = this._createEntityEffect(this.dangerousPrefab, "EntityEffect", e, this.playerEffectUpSecondNode);
e._bigEffect = this._createEntityEffect(this.bigEffectPrefab, "EntityEffect", e, this.playerEffectUpNode);
e._fastEffect = this._createEntityEffect(this.fastEffectPrefab, "EntityEffect", e, this.playerEffectUpNode);
e._hardEffect = this._createEntityEffect(this.hardEffectPrefab, "EntityEffect", e, this.playerEffectUpNode, !1);
var t = n.getOrAddComponent(e._hardEffect.node, "ScaleFix");
t.init(e.node);
e._magnetEffect = this._createEntityEffect(this.magnetEffectPrefab, "EntityEffect", e, this.playerEffectUpNode, !1);
(t = n.getOrAddComponent(e._magnetEffect.node, "ScaleFix")).init(e.node);
e._bigEffectText = this._createEntityEffect(this.bigEffectTextPrefab, "EntityEffect", e, this.playerEffectUpNode);
e._fastEffectText = this._createEntityEffect(this.fastEffectTextPrefab, "EntityEffect", e, this.playerEffectUpNode);
e._hardEffectText = this._createEntityEffect(this.hardEffectTextPrefab, "EntityEffect", e, this.playerEffectUpNode);
e._magnetEffectText = this._createEntityEffect(this.magnetEffectTextPrefab, "EntityEffect", e, this.playerEffectUpNode);
e._yellowManEffect = this._createEntityEffect(this.yellowManEffectPrefab, "EntityEffect", e, this.playerEffectUpNode);
e._frenzyEffect = this._createEntityEffect(this.frenzyEffectPrefab, "EntityEffect", e, this.playerEffectUpNode, !1);
(t = n.getOrAddComponent(e._frenzyEffect.node, "ScaleFix")).init(e.node);
var i = cc.instantiate(this.diePrefab), a = i.getComponent("EntityEffect");
i.parent = this.playerEffectUpNode;
e._dieEffect = a;
n.getOrAddComponent(i, "MoveWithOwnerNode").init(e.node, a);
i.active = !1;
e.changeEffectColor();
e._pikaKeepEffect = this._createEntityEffect(this.pikaEffectPrefab, "EntityEffect", e, this.playerEffectUpSecondNode);
e._pikaAttackEffect = this._createEntityEffect(this.ctxPrefab, "EntityEffect", e, this.playerEffectUpSecondNode);
e._nezhaAttackEffect = this._createEntityEffect(this.nezhaEffectPrefab, "EntityEffect", e, this.playerUIDown);
e._ultraAttackEffect = this._createEntityEffect(this.ultraEffectPrefab, "EntityEffect", e, this.playerEffectUpSecondNode);
},
_createEntityEffect: function(e, t, i, a) {
var o = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4], s = cc.instantiate(e), r = s.getComponent(t);
s.parent = a;
n.getOrAddComponent(s, "MoveWithOwnerNode").init(i.node, r);
if (o) {
n.getOrAddComponent(s, "ScaleByOwner").init(i.node);
}
return r;
},
AddLocalPlayer: function(e) {
var t = o.instance.knifeSkin, i = o.instance.name, n = o.instance.rankData, a = o.instance.heroSkin, c = o.instance.iconUrl, h = o.instance.country, d = this._addEntityPlayer(!0, 999, 1, t, i, 0, 0, n, h, a, c, 0, 0);
d.myGuideComp = this._addPlayerGuide(d);
d.myGuide = d.myGuideComp.node;
var u = o.instance.getGrowLevelDataByType(l.Speed);
u && d.changeGrowSpeedAddition(u.realParam);
var f = s.instance.getCurStage(o.instance.playCount, s.instance.clientData.adverReviveLimit);
d._stage = f;
r.instance.localHeroTid = 1;
return d;
},
_addPlayerGuide: function(e) {
var t = cc.instantiate(this.guidePrefab), i = t.getComponent("EntityGuide");
t.parent = this.guideNode;
t.active = !1;
i.init(e);
return i;
},
fliterSkin: function(e, t) {
if (r.instance.isInReview || s.instance.clientData.hideSpecialSkin) {
e && e.isHideInReview && (e = s.instance.knifeSkinDatas[0]);
t && t.isHideInReview && (t = null);
}
if (h.isIOS()) {
e && e.isHideInIOS && (e = s.instance.knifeSkinDatas[0]);
t && t.isHideInIOS && (t = null);
}
if (h.isApp()) {
e && e.isHideInAndroidApp && (e = s.instance.knifeSkinDatas[0]);
t && t.isHideInAndroidApp && (t = null);
}
},
AddRemotePlayer: function(e, t, i, a) {
for (var c = [], l = 0, h = 0, d = null, u = [], f = [], p = s.instance.getLevelCfg(o.instance.level), m = 0; m < e; m++) {
var g = s.instance.getRandomKnifeSkin(t), y = {};
if ((y = m < i ? s.instance.getRandomHeroSkin(a, o.instance.heroSkin.id) : null) && y.suit && Math.random() < .5) {
var v = s.instance.getSuitData(y.suit);
g = s.instance.getKnifeSkinById(v.knifeSkin);
}
this.fliterSkin(g, y);
var k = s.instance.getRandomAIName(), C = s.instance.getRandomAIRank(m);
if (u) {
for (;n.arrContains(u, k); ) k = s.instance.getRandomAIName();
u.push(k);
}
if (f) {
for (var S = s.instance.getRandomAIIcon(); n.arrContains(f, S); ) S = s.instance.getRandomAIIcon();
f.push(S);
}
l = n.getRandomInt(this.mapXs[this.mapZone[m][0]], this.mapXs[this.mapZone[m][0] + 1]);
h = n.getRandomInt(this.mapYs[this.mapZone[m][1]], this.mapYs[this.mapZone[m][1] + 1]);
var w = m;
p && (w = (w = w < p.strongNum ? 6 : w) >= 7 - p.weakNum ? 0 : w);
r.instance.isShowLog() && p && console.log("level:" + w + " strong: " + p.strongNum + " weak: " + p.weakNum);
var T = s.instance.getRandomCountry(), N = m === e - 1 && o.instance.canShowKeyInAI();
d = this._addEntityPlayer(!1, 100 + m, m + 2, g, k, l, h, C, T, y, S, 0, 0, w, N);
c[m] = d;
d.myGuideComp = this._addPlayerGuide(d);
d.myGuide = d.myGuideComp.node;
}
return c;
},
_addEntityKnife: function(e) {
var t = this.poolMgr.getKnife(), i = t.getComponent("EntityKnife");
t.parent = this.itemNode;
i.init(e, this.itemNode);
i.initWalls(this.mapType, this.mapWidth, this.mapHeight);
return i;
},
AddTempKnife: function() {},
_returnTempKnife: function() {
return this._addEntityKnife(0);
},
AddKnife: function(e) {
for (var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], i = [], a = 0; a < e; a++) {
var o = this._returnTempKnife();
o.node.position = cc.v2(n.getRandomInt(-this.mapWidth / 3, this.mapWidth / 3), n.getRandomInt(-this.mapHeight / 3, this.mapHeight / 3));
o.node.rotation = n.getRandomInt(0, 360);
i[a] = o;
if (t) {
var s = cc.instantiate(this.arrowKnifePrefab);
s.active = !1;
s.parent = this.effectNode;
o._arrowEffect = s;
}
}
return i;
},
_addEntityWall: function(e) {
var t = this.poolMgr.getWall(), i = t.getComponent("EntityWall");
t.parent = this.wallNode;
i.init(e, this.mapWidth, this.mapHeight);
return t;
},
_addEntityCircleWall: function(e) {
var t = this.poolMgr.getCircleWall(), i = t.getComponent("EntityCircleWall");
t.parent = this.wallNode;
i.init(this.mapWidth, this.mapHeight);
return t;
},
AddWall: function(e) {
var t = [];
switch (e) {
case 0:
for (var i = 0; i < 4; i++) {
var n = this._addEntityWall(i);
i < 2 ? n.y = (0 === i ? 1 : -1) * (this.mapHeight / 2 + n.height / 2) : n.x = (3 === i ? 1 : -1) * (this.mapWidth / 2 + n.width / 2);
t.push(n);
}
break;

case 1:
n = this._addEntityCircleWall(i);
t.push(n);
}
return t;
},
AddBlock: function(e) {
for (var t = [], i = 0, n = 0, a = null, o = 0; o < e; o++) {
i = this.blockXs[o % this.blockXs.length];
n = this.blockYs[o % this.blockYs.length];
a = this._addEntityBlock(i, n);
t[o] = a;
}
return t;
},
_addEntityBlock: function(e, t) {
var i = null;
0 === this.mapType ? i = this.poolMgr.getBlock(this.blockTypes[n.getRandomInt(0, 100) % this.blockTypes.length]) : (i = this.poolMgr.getCircleBlock()).children[1].rotation = Math.floor(360 * Math.random());
var a = i.getComponent("EntityBlock");
i.parent = this.blockNode;
a.init(e, t);
return a;
},
_addEntityCollisionEffect: function(e, t) {
var i = this.poolMgr.getCollEffect();
i.parent = this.effectNode;
var n = this.effectNode.convertToNodeSpaceAR(e);
i.position = n;
i.rotation = t;
return i;
},
addCollisionEffect: function(e, t) {
var i = this._addEntityCollisionEffect(e, t);
i.getComponent("EntityEffect").initAsAnim();
return i;
},
addDodgeEffect: function(e) {
var t = this.poolMgr.getDodgeEffect();
t.parent = this.effectNode;
var i = this.effectNode.convertToNodeSpaceAR(e);
t.position = i;
t.getComponent("EntityEffect").initAsAnim();
return t;
},
addRebornEffect: function(e) {
var t = this.poolMgr.getRebornEffect();
t.parent = this.effectNode;
var i = this.effectNode.convertToNodeSpaceAR(e);
t.position = i;
t.getComponent("EntityEffect").initAsAnim();
return t;
},
addDestroyDefenceEffect: function(e) {
var t = this.poolMgr.getDestroyDefenceffect();
t.parent = this.playerEffectUpSecondNode;
var i = this.effectNode.convertToNodeSpaceAR(e);
t.position = i;
t.getComponent("EntityEffect").initAsAnim();
return t;
},
addNeZhaEffect: function(e) {
var t = this.poolMgr.getNeZhaffect();
t.parent = this.playerEffectUpSecondNode;
var i = this.effectNode.convertToNodeSpaceAR(e);
t.position = i;
t.getComponent("EntityEffect").initAsAnim();
return t;
},
_addEntityShowKnifeEffect: function(e) {
var t = this.poolMgr.getShowKnifeEffect();
t.parent = this.effectNode;
var i = e;
t.position = i;
return t;
},
addShowKnifeEffect: function(e) {
var t = this._addEntityShowKnifeEffect(e);
t.getComponent("EntityEffect").initAsAnim();
return t;
},
_addEntityBuff: function(e) {
var t = this.poolMgr.getBuff(), i = t.getComponent("EntityBuff");
t.parent = this.buffNode;
i.init(e);
return i;
},
AddBuff: function(e, t) {
for (var i = [], a = 0; a < e; a++) {
var o = this._addEntityBuff(t);
o.node.position = cc.v2(n.getRandomInt(-this.mapWidth / 3, this.mapWidth / 3), n.getRandomInt(-this.mapHeight / 3, this.mapHeight / 3));
i[a] = o;
}
return i;
},
_addEntityBox: function(e) {
var t = this.poolMgr.getBox(), i = t.getComponent("EntityBox");
t.parent = this.boxNode;
i.init(e);
return i;
},
AddBox: function(e, t) {
for (var i = [], a = 0; a < e; a++) {
var o = s.instance.getBoxDataById(t), r = this._addEntityBox(o);
r.node.position = cc.v2(n.getRandomInt(-this.mapWidth / 3, this.mapWidth / 3), n.getRandomInt(-this.mapHeight / 3, this.mapHeight / 3));
i[a] = r;
}
return i;
}
});
cc._RF.pop();
}, {
ConfigData: "ConfigData",
GameData: "GameData",
PlatformMgr: "PlatformMgr",
PlayerData: "PlayerData",
Tools: "Tools",
Types: "Types",
UIUtil: "UIUtil"
} ],
AdvertMgr: [ function(e, t, i) {
(function(i) {
"use strict";
cc._RF.push(t, "36a96U5S9hH5qhkQLhkfp09", "AdvertMgr");
var n = e("ConfigData"), a = e("Types").PlatformType, o = e("Types").ChannelType, s = e("PlatformMgr"), r = e("PlayerData"), c = e("GameData"), l = e("AudioEngine"), h = e("Types").AdverType, d = cc.Class({
statics: {
instance: null,
init: function() {
if (null === d.instance) {
d.instance = new d();
d.instance.init();
}
("undefined" == typeof window ? i : window).AdvertMgr = d;
},
cleanUp: function() {
d.instance = null;
},
_closeCallback: null,
_errCallback: null,
normalAdverCallBack: function(e) {
d.instance.isShowAdvert = !1;
if (e) {
d._closeCallback(!0);
setTimeout(function() {
s.hawkeye_report_advert_end(d._adId);
}, 200);
} else d._closeCallback(!1);
},
errorAdverCallBack: function() {
d.instance.isShowAdvert = !1;
d._errCallback();
},
oepnAdCallBack: function(e) {
if (!r.instance.isShowOpenAdCold) {
e ? console.log("openad  success callback") : console.log("openad  fail callback");
r.instance.isShowOpenAdCold = e;
d.instance.isShowingOpenAd = !1;
}
},
onTotalAdsRevenueCallBack: function(e) {
console.log(" onTotalAdsRevenueCallBack ", e);
r.instance.dayTotalAdsRevenue = e;
},
onBitVerseConnectCallBack: function(e) {
console.log(" onBitVerseConnectCallBack ", e);
r.instance.bitverseWallet = e;
}
},
properties: {
isShowingOpenAd: !1,
isShowAdvert: !1,
canGetAdver: !0,
adverPool: []
},
init: function() {
window.PlatformApi = this;
this.isShowingOpenAd = !1;
this.isShowAdvert = !1;
this.canGetAdver = !0;
this.preLoad();
},
preLoad: function() {
switch (s.platformType) {
case a.ANDROID:
switch (s.channelType) {
case o.RiceBall:
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/activity/UpltvAdverManager", "loadAd", "()V");
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/activity/UpltvAdverManager", "loadInteractionAd", "()V");
break;

case o.RiceBall_1:
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/activity/AdTimingAdverManager", "loadAd", "()V");
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/activity/AdTimingAdverManager", "loadInteractionAd", "()V");
break;

case o.RiceBall_2:
}
break;

case a.IOS:
switch (s.channelType) {
case o.RiceBall:
case o.RiceBall_1:
jsb.reflection.callStaticMethod("UpltvRewardedViedioAd", "loadAd");
jsb.reflection.callStaticMethod("UpltvRewardedViedioAd", "loadInteractionAd");
break;

case o.RiceBall_2:
}
}
},
setUiMgr: function(e) {
this.uiMgr = e;
},
showUITips: function(e) {
this.uiMgr.showTips(e);
},
loadAdver: function(e, t) {
switch (s.platformType) {
case a.WECHAT:
case a.IOS:
case a.ANDROID:
t && t(this.canGetAdver);
break;

default:
t && t(!0);
}
},
openAdver: function(e) {
s.hawkeye_report_advert_open(e);
},
showAdver: function(e, t, i) {
var u = this;
console.log("showAdver", e);
this.uiMgr.openAdverBlock();
i && !n.instance.clientData.stopAdverToShare || (i = function() {
u.uiMgr.showTips(4);
});
var f = function(i) {
setTimeout(function() {
performance && performance.now && (cc.director._lastUpdate = performance.now());
if (i) {
r.instance.updateTotalAdverCount();
switch (e) {
case h.UnlockSkin:
case h.Revive:
case h.MultipGold:
case h.TryOutSkin:
case h.OfflineGold:
case h.Sign:
case h.RefreshDailyTask:
case h.MultipDailyTask:
r.instance.updateDayGetPrizeCount("广告");
}
}
t(i);
}, 100);
};
d._closeCallback = f;
d._errCallback = i;
d._adId = e;
switch (s.platformType) {
case a.WECHAT:
if (!(v = n.instance.getAdvertUnitId(e)) || this.isShowAdvert) return !1;
var p = this.adverPool[e], m = !1;
if (p) {
c.instance.isShowLog() && console.log("使用已加载的广告");
m = !0;
} else {
c.instance.isShowLog() && console.log("新建广告, 能否获取广告: " + this.canGetAdver);
p = wx.createRewardedVideoAd({
adUnitId: v
});
}
this.isShowAdvert = !0;
this.canGetAdver = !0;
var g = this, y = function t(i) {
p.offClose(t);
g.isShowAdvert = !1;
g.adverPool[e] = null;
if (i && i.isEnded || void 0 === i) {
f(!0);
setTimeout(function() {
s.hawkeye_report_advert_end(e);
}, 200);
} else f(!1);
};
p.onClose(y);
m ? p.show() : p.load().then(function() {
l.instance.stopAllSound();
p.show();
s.hawkeye_report_advert_show(e);
}).catch(function(e) {
p.offClose(y);
g.isShowAdvert = !1;
g.canGetAdver = !1;
i();
});
break;

case a.IOS:
if (!(v = n.instance.getAdvertUnitId(e)) || this.isShowAdvert) return !1;
this.isShowAdvert = !0;
setTimeout(function() {
u.isShowAdvert = !1;
console.log("isShowAdvert   false");
}, 100);
l.instance.stopAllSound();
switch (s.channelType) {
case o.RiceBall:
case o.RiceBall_1:
jsb.reflection.callStaticMethod("UpltvRewardedViedioAd", "showAd:", v);
break;

case o.RiceBall_2:
jsb.reflection.callStaticMethod("AdManage", "showRewardVideoAd:", v);
}
s.hawkeye_report_advert_show(e);
break;

case a.ANDROID:
var v;
if (!(v = n.instance.getAdvertUnitId(e)) || this.isShowAdvert) return !1;
this.isShowAdvert = !0;
setTimeout(function() {
u.isShowAdvert = !1;
console.log("isShowAdvert   false");
}, 100);
l.instance.stopAllSound();
switch (s.channelType) {
case o.RiceBall:
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/activity/UpltvAdverManager", "showAd", "(Ljava/lang/String;)V", v);
break;

case o.RiceBall_1:
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/activity/AdTimingAdverManager", "showAd", "()V");
break;

case o.RiceBall_2:
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManage", "showRewardVideoAd", "(Ljava/lang/String;)V", v);
}
s.hawkeye_report_advert_show(e);
break;

default:
f(!0);
}
},
showBanner: function() {
switch (s.platformType) {
case a.WECHAT:
this.destoryBanner();
if (c.instance.isLowHeight) return;
var e = {
x: 0,
y: 0,
width: 720,
height: 250
}, t = wx.getSystemInfoSync(), i = t.screenWidth, n = t.screenHeight, r = c.instance.isFitHeight ? .95 : 1;
e.height = i / e.width * e.height;
a.bannerAd = wx.createBannerAd({
adUnitId: "ea8f511a9aebbf1563b47ef1dea0872f",
style: {
left: 0,
top: n * r - e.height / 2,
width: i,
height: e.height
}
});
a.bannerAd.show();
break;

case a.ANDROID:
switch (s.channelType) {
case o.RiceBall:
case o.RiceBall_1:
break;

case o.RiceBall_2:
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManage", "showBannerAd", "(Ljava/lang/String;)V", "bottom");
}
break;

case a.IOS:
jsb.reflection.callStaticMethod("AdManage", "showBannerAd");
}
},
destoryBanner: function() {
switch (s.platformType) {
case a.WECHAT:
if (a.bannerAd) {
a.bannerAd.destroy();
a.bannerAd = null;
}
break;

case a.ANDROID:
switch (s.channelType) {
case o.RiceBall:
case o.RiceBall_1:
break;

case o.RiceBall_2:
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManage", "hideBannerAd", "()V");
}
break;

case a.IOS:
jsb.reflection.callStaticMethod("AdManage", "hideBannerAd");
}
},
showInterstitial: function() {
if (!r.instance.getVipWithoutInterstitial()) {
console.log("--------------showInterstitial----------------");
switch (s.platformType) {
case a.ANDROID:
switch (s.channelType) {
case o.RiceBall:
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/activity/UpltvAdverManager", "showInteractionAd", "()V");
break;

case o.RiceBall_1:
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/activity/AdTimingAdverManager", "showInteractionAd", "()V");
break;

case o.RiceBall_2:
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManage", "showInterstitialAd", "()V");
}
break;

case a.IOS:
jsb.reflection.callStaticMethod("AdManage", "showInterstitialAd");
}
}
},
showOpenApp: function() {
switch (s.platformType) {
case a.ANDROID:
switch (s.channelType) {
case o.RiceBall:
case o.RiceBall_1:
break;

case o.RiceBall_2:
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManage", "showOpenAppAd", "()V");
}
break;

case a.IOS:
jsb.reflection.callStaticMethod("AdManage", "showOpenAppAd");
}
},
destroyOpenApp: function() {
switch (s.platformType) {
case a.ANDROID:
switch (s.channelType) {
case o.RiceBall:
case o.RiceBall_1:
break;

case o.RiceBall_2:
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManage", "hideOpenAppAd", "()V");
}
break;

case a.IOS:
jsb.reflection.callStaticMethod("AdManage", "hideOpenAppAd");
}
},
loadOpenApp: function() {
switch (s.platformType) {
case a.ANDROID:
switch (s.channelType) {
case o.RiceBall:
case o.RiceBall_1:
break;

case o.RiceBall_2:
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManage", "loadOpenAppAd", "()V");
}
break;

case a.IOS:
jsb.reflection.callStaticMethod("AdManage", "loadOpenAppAd");
}
},
fireBaseEvent: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
if ("" != e) switch (s.platformType) {
case a.ANDROID:
switch (s.channelType) {
case o.RiceBall:
case o.RiceBall_1:
break;

case o.RiceBall_2:
t && i ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManage", "FAEventWithParam", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", e, t, i) : jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManage", "FAEvent", "(Ljava/lang/String;)V", e);
}
break;

case a.IOS:
t && i ? jsb.reflection.callStaticMethod("AdManage", "FAEventWithParam:sec:thir:", e, t, i) : jsb.reflection.callStaticMethod("AdManage", "FAEvent:", e);
}
},
getOpenAdRules: function() {
switch (s.platformType) {
case a.ANDROID:
case a.IOS:
switch (s.channelType) {
case o.RiceBall:
case o.RiceBall_1:
return !1;

case o.RiceBall_2:
return !r.instance.isFristGame() && 0 != r.instance.dayPlayCount;
}
break;

default:
return !1;
}
}
});
cc._RF.pop();
}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
AudioEngine: "AudioEngine",
ConfigData: "ConfigData",
GameData: "GameData",
PlatformMgr: "PlatformMgr",
PlayerData: "PlayerData",
Types: "Types"
} ],
AttackBoxCollisionHandleSystem: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "c5056lWCptGwrp0X2Qatw//", "AttackBoxCollisionHandleSystem");
var n = e("BaseCollisionHandleSystem");
cc.Class({
extends: n,
properties: {
_eventListName: {
default: "_attackBoxCollisionEvent",
override: !0
}
},
handelCollisionEvent: function(e) {
var t = e[0], i = e[1];
e[2] ? i.node.emit("emitEvent", [ "onCollByBlock", [ i, t, this.node ] ]) : i.node.emit("emitEvent", [ "onAttack", [ i, t, this.node ] ]);
},
updateGameLogic: function(e) {
this._super(e);
this._collisionEventMgr.clearAttackBoxEvent();
}
});
cc._RF.pop();
}, {
BaseCollisionHandleSystem: "BaseCollisionHandleSystem"
} ],
AttackRect: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d402diL1q1NipEZB67yVAMX", "AttackRect");
var n = e("BodyRectComponent");
cc.Class({
extends: n
});
cc._RF.pop();
}, {
BodyRectComponent: "BodyRectComponent"
} ],
AudioEngine: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "34af0w++W9NLpiLjhlY3b48", "AudioEngine");
var n = e("GameData"), a = cc.Class({
extends: cc.Component,
statics: {
instance: null
},
properties: {
musics: {
type: cc.AudioClip,
default: []
},
sounds: {
type: cc.AudioClip,
default: []
}
},
init: function() {
a.instance = this;
},
playMusic: function(e) {
var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
if (n.instance._audioOpen) {
return cc.audioEngine.playMusic(this.musics[e], t);
}
return -1;
},
stopMusic: function() {
n.instance._audioOpen && cc.audioEngine.stopMusic();
},
playSound: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
if (n.instance._audioOpen) {
return cc.audioEngine.playEffect(this.sounds[e], t);
}
return -1;
},
stopSound: function(e) {
n.instance._audioOpen && e && cc.audioEngine.stopEffect(e);
},
stopAllSound: function() {
n.instance._audioOpen && cc.audioEngine.stopAllEffects();
},
setEffectsVolume: function(e) {
cc.audioEngine.setEffectsVolume(e);
},
getEffectsVolume: function() {
return cc.audioEngine.getEffectsVolume();
}
});
cc._RF.pop();
}, {
GameData: "GameData"
} ],
BagItem: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "4ac092ObyVGAZZuaRNBYk+S", "BagItem");
var n = e("Tools"), a = e("Types").ItemType, o = e("ConfigData"), s = cc.Class({
statics: {
createItemsWithString: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ";", i = [];
if (!e) return i;
var a = e.split(t), o = !0, r = !1, c = void 0;
try {
for (var l, h = a[Symbol.iterator](); !(o = (l = h.next()).done); o = !0) {
var d = l.value;
if (d) {
var u = n.splitToNumList(d, ","), f = null;
if (u.length >= 3) {
f = s.createItem(u[0], u[1], u[2]);
i.push(f);
}
}
}
} catch (e) {
r = !0;
c = e;
} finally {
try {
!o && h.return && h.return();
} finally {
if (r) throw c;
}
}
return i;
},
createItemWithString: function(e) {
var t = n.splitToNumList(e, ",");
return s.createItem(t[0], t[1], t[2]);
},
createItem: function(e, t, i) {
var n = o.instance.getItemData(e, t), a = new s();
a.type = e;
a.id = t;
a.itemData = n;
a.num = i;
return a;
}
},
properties: {
type: a.KNIFE_SKIN,
id: 0,
num: 0,
itemData: null
}
});
cc._RF.pop();
}, {
ConfigData: "ConfigData",
Tools: "Tools",
Types: "Types"
} ],
BaseCollisionHandleSystem: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "0f5b31ryUhLqaR///6o4ouB", "BaseCollisionHandleSystem");
var n = e("CollisionEventManager");
cc.Class({
extends: cc.Component,
properties: {
_eventListName: ""
},
onLoad: function() {
this._collisionEventMgr = n.getInstance();
},
updateGameLogic: function(e) {
if (this._collisionEventMgr[this._eventListName]) {
var t = !0, i = !1, n = void 0;
try {
for (var a, o = this._collisionEventMgr[this._eventListName][Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
var s = a.value;
this.handelCollisionEvent(s);
}
} catch (e) {
i = !0;
n = e;
} finally {
try {
!t && o.return && o.return();
} finally {
if (i) throw n;
}
}
}
},
handelCollisionEvent: function(e) {}
});
cc._RF.pop();
}, {
CollisionEventManager: "CollisionEventManager"
} ],
BodyRectComponent: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "9994f/0X6lLFoSN8wdJFFvY", "BodyRectComponent");
var n = e("Tools");
cc.Class({
extends: cc.Component,
properties: {
_rect: cc.rect
},
init: function(e, t, i) {
var a = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1;
this.scale = o;
e *= o;
t *= o;
this._rect = new cc.rect(this.node.x - e / 2, this.node.y - t / 2, e, t);
this._canMove = i;
this.needGraphics = a;
if (this.needGraphics) {
this.ctx = n.getOrAddComponent(this.node, cc.Graphics);
this.ctx.lineWidth = 6;
this.ctx.strokeColor = cc.Color.RED;
this.ctx.rect(-this._rect.width / 2, -this._rect.height / 2, this._rect.width, this._rect.height);
this.ctx.stroke();
}
this.node.on("radiusChange", this.setRect, this);
},
setRect: function(e) {
e = Math.max(e, 180);
this._rect.width = e * this.scale * 2;
this._rect.height = e * this.scale * 2;
},
update: function(e) {
if (this._canMove) {
this._rect.center = this.node.position;
if (this.needGraphics) {
this.ctx.clear();
this.ctx.rect(-this._rect.width / 2, -this._rect.height / 2, this._rect.width, this._rect.height);
this.ctx.stroke();
}
}
},
contains: function(e) {
return this._rect.contains(e);
},
intersects: function(e) {
return this._rect.intersects(e);
},
getRect: function() {
return this._rect;
}
});
cc._RF.pop();
}, {
Tools: "Tools"
} ],
BuffColliderListener: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "acb4aJbQGNDvbyj+zPKmni5", "BuffColliderListener");
e("Types").KnifeState, e("GameData");
cc.Class({
extends: cc.Component,
properties: {},
init: function(e) {
this.buff = e;
this.node.on("onPickUpBuff", this.onPickUpBuff, this);
},
onPickUpBuff: function(e) {
this.node.emit("onByPick");
e.node.emit("emitEvent", [ "addBuff", this.buff.buffState ]);
}
});
cc._RF.pop();
}, {
GameData: "GameData",
Types: "Types"
} ],
CameraZoomCtrl: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "83010usGttJqr35NhprbiHV", "CameraZoomCtrl");
var n = e("Tools");
cc.Class({
extends: cc.Component,
properties: {
_maxSpeed: Number.MAX_VALUE,
_smoothTime: .15,
_curCameraRate: 1,
_targetCameraZoom: -1,
_currentVelocityRate: 0,
camera: cc.Camera,
_curSpeed: 1.4,
_needChange: !1
},
onLoad: function() {},
cleanUp: function() {
this.setCameraZoomImmediately(1);
},
setCameraZoom: function(e) {
this._targetCameraZoom = e;
this._needChange = !0;
},
resetCameraRate: function() {
this.setCameraZoom(1);
},
setCameraZoomImmediately: function(e) {
this._targetCameraZoom = e;
this._needChange = !1;
this._curCameraRate = e;
this.camera.zoomRatio = e;
},
update: function(e) {
if (this._needChange) {
var t = n.smoothDamp(this._curCameraRate, this._targetCameraZoom, this._currentVelocityRate, this._smoothTime, this._maxSpeed, this._curSpeed * e);
this._currentVelocityRate = t[1];
this._curCameraRate = t[0];
this.camera.zoomRatio = this._curCameraRate;
n.isFloatEqual(this._targetCameraZoom, this._curCameraRate) && (this._needChange = !1);
}
}
});
cc._RF.pop();
}, {
Tools: "Tools"
} ],
CameraZoomSystem: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "7df05Oky6dMYqVyeTX+HecQ", "CameraZoomSystem");
var n = e("Tools"), a = e("GameData");
cc.Class({
extends: cc.Component,
properties: {
_knifeNum: 0,
_isMove: !1,
_curZoom: 1,
_numZoom: 1,
_moveZoom: 1,
_zoomDirty: !1,
_zoomSpeedDirty: !1,
_knifeMin: 9,
_knifeMax: 20,
_zoomMultip: 1,
_newZoomMultip: 1
},
init: function(e, t) {
this.knifesComp = e.followPlayer.knivesCmp;
this.cameraZoomCtrl = t;
e.cameraZoomSys = this;
this._knifeNum = 0;
this._isMove = !1;
this._curZoom = 1;
this._knifeMin = a.instance.knifeMin;
this._knifeMax = a.instance.knifeMax;
},
setCameraZoomMultip: function(e) {
this._newZoomMultip = e;
this.zoomPer = this._newZoomMultip - this._zoomMultip;
},
update: function(e) {
if (this._newZoomMultip !== this._zoomMultip) {
this._zoomMultip += this.zoomPer * e;
this.zoomPer > 0 ? this._zoomMultip > this._newZoomMultip && (this._zoomMultip = this._newZoomMultip) : this._zoomMultip < this._newZoomMultip && (this._zoomMultip = this._newZoomMultip);
this._zoomDirty = !0;
}
if (this._knifeNum !== this.knifesComp.knives.length) {
this._zoomSpeedDirty = this.knifesComp.knives.length < this._knifeNum && this._isMove;
this._knifeNum = this.knifesComp.knives.length;
var t = n.inverseLerp(this._knifeMin, this._knifeMax, this._knifeNum);
t = n.clamp(0, 1, t);
a.instance.speedRate = cc.misc.lerp(1, 1.5, t);
this._numZoom = cc.misc.lerp(1, .55, t);
this._zoomDirty = !0;
}
if (this._isMove !== this.knifesComp.isMove) {
this._isMove = this.knifesComp.isMove;
this._moveZoom = this._isMove ? .85 : 1.15;
this._zoomDirty = !0;
this._zoomSpeedDirty = !1;
}
if (this._zoomDirty) {
this._zoomDirty = !1;
this._curZoom = this._numZoom * this._moveZoom;
if (this._zoomSpeedDirty) {
this._zoomSpeedDirty = !1;
this.cameraZoomCtrl.setCameraZoomImmediately(this._curZoom / this._zoomMultip);
} else this.cameraZoomCtrl.setCameraZoom(this._curZoom / this._zoomMultip);
}
}
});
cc._RF.pop();
}, {
GameData: "GameData",
Tools: "Tools"
} ],
Centered: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "29179DUXRJEq6bK60OHAieE", "Centered");
var n = cc.Node.EventType;
cc.Class({
extends: cc.Component,
editor: !1,
properties: {
interval: 5,
widthMax: 0
},
onEnable: function() {
this._addEventListeners();
this._doLayoutDirty();
},
onDisable: function() {
this._removeEventListeners();
},
_doLayoutDirty: function() {
this._layoutDirty = !0;
},
_addEventListeners: function() {
cc.director.on(cc.Director.EVENT_AFTER_UPDATE, this.updateLayout, this);
this.node.on(n.SIZE_CHANGED, this._doLayoutDirty, this);
this.node.on(n.ANCHOR_CHANGED, this._doLayoutDirty, this);
this.node.on(n.CHILD_ADDED, this._childAdded, this);
this.node.on(n.CHILD_REMOVED, this._childRemoved, this);
this.node.on(n.CHILD_REORDER, this._doLayoutDirty, this);
this._addChildrenEventListeners();
},
_removeEventListeners: function() {
cc.director.off(cc.Director.EVENT_AFTER_UPDATE, this.updateLayout, this);
this.node.off(n.SIZE_CHANGED, this._doLayoutDirty, this);
this.node.off(n.ANCHOR_CHANGED, this._doLayoutDirty, this);
this.node.off(n.CHILD_ADDED, this._childAdded, this);
this.node.off(n.CHILD_REMOVED, this._childRemoved, this);
this.node.off(n.CHILD_REORDER, this._doLayoutDirty, this);
this._removeChildrenEventListeners();
},
_addChildrenEventListeners: function() {
for (var e = this.node.children, t = 0; t < e.length; ++t) {
var i = e[t];
i.on(n.SCALE_CHANGED, this._doLayoutDirty, this);
i.on(n.SIZE_CHANGED, this._doLayoutDirty, this);
i.on(n.POSITION_CHANGED, this._doLayoutDirty, this);
i.on(n.ANCHOR_CHANGED, this._doLayoutDirty, this);
i.on("active-in-hierarchy-changed", this._doLayoutDirty, this);
}
},
_removeChildrenEventListeners: function() {
for (var e = this.node.children, t = 0; t < e.length; ++t) {
var i = e[t];
i.off(n.SCALE_CHANGED, this._doLayoutDirty, this);
i.off(n.SIZE_CHANGED, this._doLayoutDirty, this);
i.off(n.POSITION_CHANGED, this._doLayoutDirty, this);
i.off(n.ANCHOR_CHANGED, this._doLayoutDirty, this);
i.off("active-in-hierarchy-changed", this._doLayoutDirty, this);
}
},
_childAdded: function(e) {
e.on(n.SCALE_CHANGED, this._doLayoutDirty, this);
e.on(n.SIZE_CHANGED, this._doLayoutDirty, this);
e.on(n.POSITION_CHANGED, this._doLayoutDirty, this);
e.on(n.ANCHOR_CHANGED, this._doLayoutDirty, this);
e.on("active-in-hierarchy-changed", this._doLayoutDirty, this);
this._doLayoutDirty();
},
_childRemoved: function(e) {
e.off(n.SCALE_CHANGED, this._doLayoutDirty, this);
e.off(n.SIZE_CHANGED, this._doLayoutDirty, this);
e.off(n.POSITION_CHANGED, this._doLayoutDirty, this);
e.off(n.ANCHOR_CHANGED, this._doLayoutDirty, this);
e.off("active-in-hierarchy-changed", this._doLayoutDirty, this);
this._doLayoutDirty();
},
updateLayout: function(e) {
if (this._layoutDirty) {
this._layoutDirty = !1;
this.widthMax = 0;
var t = !0, i = !1, n = void 0;
try {
for (var a, o = this.node.children[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
var s = a.value;
s.active && (this.widthMax += s.width + this.interval);
}
} catch (e) {
i = !0;
n = e;
} finally {
try {
!t && o.return && o.return();
} finally {
if (i) throw n;
}
}
this.widthMax -= this.interval;
var r = -this.widthMax / 2, c = !0, l = !1, h = void 0;
try {
for (var d, u = this.node.children[Symbol.iterator](); !(c = (d = u.next()).done); c = !0) {
var f = d.value;
if (f.active) {
f.x = r + f.width / 2;
r += f.width + this.interval;
}
}
} catch (e) {
l = !0;
h = e;
} finally {
try {
!c && u.return && u.return();
} finally {
if (l) throw h;
}
}
}
}
});
cc._RF.pop();
}, {} ],
CollisionEventManager: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "367d2WgeaJHfoLyJbZv9lIQ", "CollisionEventManager");
var n = e("Types").KnifeColliderState, a = cc.Class({
statics: {
instance: null,
getInstance: function() {
if (null === a.instance) {
a.instance = new a();
a.instance.init();
}
return a.instance;
},
cleanUp: function() {
a.instance && Tools.cleanUp(a.instance);
a.instance = null;
}
},
properties: {
_heroCollisionEvent: [],
_knifeCollisionEvent: [],
_pickKnifeCollisionEvent: [],
_pickBuffCollisionEvent: [],
_attackBoxCollisionEvent: []
},
init: function() {
this.clear();
cc.director.getCollisionManager().enabled = !0;
},
addCollisionEvent: function(e, t) {
1 === t.node.groupIndex ? this._heroCollisionEvent.push([ e, t ]) : 2 === t.node.groupIndex ? t.collState === n.Attack ? e.collState && e.collState !== n.Attack || this._knifeCollisionEvent.push([ e, t ]) : t.collState === n.Land && this._pickKnifeCollisionEvent.push([ e, t ]) : 11 === t.node.groupIndex ? this._pickBuffCollisionEvent.push([ e, t ]) : 12 === t.node.groupIndex && 3 !== e.node.groupIndex && this._attackBoxCollisionEvent.push([ e, t ]);
},
addCollisionStayEvent: function(e, t) {
2 !== t.node.groupIndex || 5 !== e.node.groupIndex && 3 !== e.node.groupIndex ? 12 === t.node.groupIndex && 3 === e.node.groupIndex && this._attackBoxCollisionEvent.push([ e, t, !0 ]) : t.collState === n.Attack && this._knifeCollisionEvent.push([ e, t ]);
},
clearHeroEvent: function() {
this._heroCollisionEvent = [];
},
clearKnifeEvent: function() {
this._knifeCollisionEvent = [];
},
clearPickKnifeEvent: function() {
this._pickKnifeCollisionEvent = [];
},
clearPickBuffEvent: function() {
this._pickBuffCollisionEvent = [];
},
clearAttackBoxEvent: function() {
this._attackBoxCollisionEvent = [];
},
clear: function() {
this._heroCollisionEvent = [];
this._knifeCollisionEvent = [];
this._pickKnifeCollisionEvent = [];
this._pickBuffCollisionEvent = [];
this._attackBoxCollisionEvent = [];
}
});
cc._RF.pop();
}, {
Types: "Types"
} ],
CollisionManager: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "c7c57xcC2pFh43Pv+u1ZNLv", "CollisionManager");
var n = e("Contact"), a = n.CollisionType, o = cc.Node.EventType, s = cc.vmath, r = cc.v2();
function c(e, t, i, n, a, o) {
var s = e.x, r = e.y, c = e.width, l = e.height, h = t.m, d = h[0], u = h[1], f = h[4], p = h[5], m = d * s + f * r + h[12], g = u * s + p * r + h[13], y = d * c, v = u * c, k = f * l, C = p * l;
n.x = m;
n.y = g;
a.x = y + m;
a.y = v + g;
i.x = k + m;
i.y = C + g;
o.x = y + k + m;
o.y = v + C + g;
}
var l = cc.Class({
mixins: [ cc.EventTarget ],
properties: {
enabled: !1,
enabledDrawBoundingBox: !1
},
ctor: function() {
this._contacts = [];
this._colliders = [];
this._debugDrawer = null;
this._enabledDebugDraw = !1;
cc.director._scheduler && cc.director._scheduler.enableForTarget(this);
},
update: function(e) {
if (this.enabled) {
var t = void 0, i = void 0, n = this._colliders;
for (t = 0, i = n.length; t < i; t++) this.updateCollider(n[t]);
var o = this._contacts, s = [];
for (t = 0, i = o.length; t < i; t++) {
var r = o[t].updateState();
r !== a.None && s.push([ r, o[t] ]);
}
for (t = 0, i = s.length; t < i; t++) {
var c = s[t];
this._doCollide(c[0], c[1]);
}
this.drawColliders();
}
},
_doCollide: function(e, t) {
var i = void 0;
switch (e) {
case a.CollisionEnter:
i = "onCollisionEnter";
break;

case a.CollisionStay:
i = "onCollisionStay";
break;

case a.CollisionExit:
i = "onCollisionExit";
}
var n = t.collider1, o = t.collider2, s = n.node._components, r = o.node._components, c = void 0, l = void 0, h = void 0;
for (c = 0, l = s.length; c < l; c++) (h = s[c])[i] && h[i](o, n);
for (c = 0, l = r.length; c < l; c++) (h = r[c])[i] && h[i](n, o);
},
shouldCollide: function(e, t) {
var i = e.node, n = t.node, a = cc.game.collisionMatrix;
return i !== n && a[i.groupIndex][n.groupIndex];
},
initCollider: function(e) {
if (!e.world) {
var t = e.world = {};
t.aabb = cc.rect();
t.preAabb = cc.rect();
t.matrix = s.mat4.create();
t.radius = 0;
if (e instanceof cc.BoxCollider) {
t.position = null;
t.points = [ cc.v2(), cc.v2(), cc.v2(), cc.v2() ];
} else if (e instanceof cc.PolygonCollider) {
t.position = null;
t.points = e.points.map(function(e) {
return cc.v2(e.x, e.y);
});
} else if (e instanceof cc.CircleCollider) {
t.position = cc.v2();
t.points = null;
}
}
},
updateCollider: function(e) {
var t = e.offset, i = e.world, n = i.aabb, a = i.matrix;
e.node.getWorldMatrix(a);
var o = i.preAabb;
o.x = n.x;
o.y = n.y;
o.width = n.width;
o.height = n.height;
if (e instanceof cc.BoxCollider) {
var l = e.size;
n.x = t.x - l.width / 2;
n.y = t.y - l.height / 2;
n.width = l.width;
n.height = l.height;
var h = i.points, d = h[0], u = h[1], f = h[2], p = h[3];
c(n, a, d, u, f, p);
var m = Math.min(d.x, u.x, f.x, p.x), g = Math.min(d.y, u.y, f.y, p.y), y = Math.max(d.x, u.x, f.x, p.x), v = Math.max(d.y, u.y, f.y, p.y);
n.x = m;
n.y = g;
n.width = y - m;
n.height = v - g;
} else if (e instanceof cc.CircleCollider) {
s.vec2.transformMat4(r, e.offset, a);
i.position.x = r.x;
i.position.y = r.y;
var k = a.m, C = k[12], S = k[13];
k[12] = k[13] = 0;
r.x = e.radius;
r.y = 0;
s.vec2.transformMat4(r, r, a);
var w = Math.sqrt(r.x * r.x + r.y * r.y);
i.radius = w;
n.x = i.position.x - w;
n.y = i.position.y - w;
n.width = 2 * w;
n.height = 2 * w;
k[12] = C;
k[13] = S;
} else if (e instanceof cc.PolygonCollider) {
var T = e.points, N = i.points;
N.length = T.length;
for (var _ = 1e6, b = 1e6, R = -1e6, P = -1e6, D = 0, L = T.length; D < L; D++) {
N[D] || (N[D] = cc.v2());
r.x = T[D].x + t.x;
r.y = T[D].y + t.y;
s.vec2.transformMat4(r, r, a);
var I = r.x, A = r.y;
N[D].x = I;
N[D].y = A;
I > R && (R = I);
I < _ && (_ = I);
A > P && (P = A);
A < b && (b = A);
}
n.x = _;
n.y = b;
n.width = R - _;
n.height = P - b;
}
},
addCollider: function(e) {
var t = this._colliders;
if (-1 === t.indexOf(e)) {
for (var i = 0, a = t.length; i < a; i++) {
var s = t[i];
if (this.shouldCollide(e, s)) {
var r = new n(e, s);
this._contacts.push(r);
}
}
t.push(e);
this.initCollider(e);
}
e.node.on(o.GROUP_CHANGED, this.onNodeGroupChanged, this);
},
removeCollider: function(e) {
var t = this._colliders, i = t.indexOf(e);
if (i >= 0) {
t.splice(i, 1);
for (var n = this._contacts, s = n.length - 1; s >= 0; s--) {
var r = n[s];
if (r.collider1 === e || r.collider2 === e) {
r.touching && this._doCollide(a.CollisionExit, r);
n.splice(s, 1);
}
}
e.node.off(o.GROUP_CHANGED, this.onNodeGroupChanged, this);
}
},
onNodeGroupChanged: function(e) {
if (e.lastGroupIndex !== e.groupIndex) {
e.lastGroupIndex = e.groupIndex;
for (var t = e.getComponents(cc.Collider), i = 0, n = t.length; i < n; i++) {
var a = t[i];
if (!(cc.PhysicsCollider && a instanceof cc.PhysicsCollider)) {
this.removeCollider(a);
this.addCollider(a);
}
}
}
},
drawColliders: function() {
if (this._enabledDebugDraw) {
this._checkDebugDrawValid();
var e = this._debugDrawer;
e.clear();
for (var t = this._colliders, i = 0, n = t.length; i < n; i++) {
var a = t[i];
e.strokeColor = cc.Color.WHITE;
if (a instanceof cc.BoxCollider || a instanceof cc.PolygonCollider) {
var o = a.world.points;
if (o.length > 0) {
e.moveTo(o[0].x, o[0].y);
for (var s = 1; s < o.length; s++) e.lineTo(o[s].x, o[s].y);
e.close();
e.stroke();
}
} else if (a instanceof cc.CircleCollider) {
e.circle(a.world.position.x, a.world.position.y, a.world.radius);
e.stroke();
}
if (this.enabledDrawBoundingBox) {
var r = a.world.aabb;
e.strokeColor = cc.Color.BLUE;
e.moveTo(r.xMin, r.yMin);
e.lineTo(r.xMin, r.yMax);
e.lineTo(r.xMax, r.yMax);
e.lineTo(r.xMax, r.yMin);
e.close();
e.stroke();
}
}
}
},
_checkDebugDrawValid: function() {
if (!this._debugDrawer || !this._debugDrawer.isValid) {
var e = new cc.Node("COLLISION_MANAGER_DEBUG_DRAW");
e.zIndex = cc.macro.MAX_ZINDEX;
cc.game.addPersistRootNode(e);
this._debugDrawer = e.addComponent(cc.Graphics);
}
}
});
cc.js.getset(l.prototype, "enabledDebugDraw", function() {
return this._enabledDebugDraw;
}, function(e) {
if (e && !this._enabledDebugDraw) {
this._checkDebugDrawValid();
this._debugDrawer.node.active = !0;
} else if (!e && this._enabledDebugDraw) {
this._debugDrawer.clear(!0);
this._debugDrawer.node.active = !1;
}
this._enabledDebugDraw = e;
});
t.exports = l;
cc._RF.pop();
}, {
Contact: "Contact"
} ],
ConditionAISlow: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "a0400EaKRRAI7S80m6M/8PS", "ConditionAISlow");
var n = e("ConditionBaseComponent");
cc.Class({
extends: n,
properties: {},
doResult: function() {
this.result = .8;
}
});
cc._RF.pop();
}, {
ConditionBaseComponent: "ConditionBaseComponent"
} ],
ConditionBaseComponent: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "ea272kZDpxMhYrOoDjj6Kum", "ConditionBaseComponent");
cc.Class({
extends: cc.Component,
properties: {
result: null
},
doResult: function() {
this.result = null;
},
doResultWithParam: function(e) {
this.result = e;
},
clearResult: function() {
this.result = null;
},
isTrue: function() {
return this.result;
}
});
cc._RF.pop();
}, {} ],
ConditionFindEscapePos: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "5982687/HBMu76DpPAIaZ72", "ConditionFindEscapePos");
var n = e("ConditionBaseComponent"), a = e("GameData"), o = (e("Tools"), e("Types").MapType);
cc.Class({
extends: n,
properties: {},
init: function() {
this.setMapSize([ a.instance.mapWidth, a.instance.mapHeight ]);
this._speed = 3;
this.node.on("setMapSize", this.setMapSize, this);
this.node.on("initWalls", this.initWalls, this);
},
initWalls: function(e) {
this.wallType = e;
this.setMapSize([ this._Width, this._height ]);
},
setMapSize: function(e) {
var t = e[0], i = e[1];
this._Width = this.getReal(t);
this._height = this.getReal(i);
this._min = cc.v2(-this._Width / 2, -this._height / 2);
this._max = cc.v2(this._Width / 2, this._height / 2);
},
getReal: function(e) {
var t = .9 * e;
this.wallType && this.wallType === o.Circle && (t /= 1.5);
return t;
},
doResultWithParam: function(e) {
this.result;
var t = null, i = !0, n = !1, a = void 0;
try {
for (var o, s = e[Symbol.iterator](); !(i = (o = s.next()).done); i = !0) {
var r = o.value;
t = this.node.position.sub(r.node.position);
this.result = this.result ? this.result.addSelf(t).mulSelf(.5) : t;
}
} catch (e) {
n = !0;
a = e;
} finally {
try {
!i && s.return && s.return();
} finally {
if (n) throw a;
}
}
this.result = this.result.mulSelf(this._speed).addSelf(this.node.position).clampf(this._min, this._max);
}
});
cc._RF.pop();
}, {
ConditionBaseComponent: "ConditionBaseComponent",
GameData: "GameData",
Tools: "Tools",
Types: "Types"
} ],
ConditionFindNextPos: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "62311EwbJVOzIT3p7IXlUr8", "ConditionFindNextPos");
var n = e("ConditionBaseComponent"), a = e("GameData"), o = e("Tools"), s = e("Types").MapType;
cc.Class({
extends: n,
properties: {
_Width: 0,
_height: 0,
_min: null,
_max: null,
_dir: null
},
init: function(e) {
this._speed = e;
this.setMapSize([ a.instance.mapWidth, a.instance.mapHeight ]);
this.node.on("setMapSize", this.setMapSize, this);
this.node.on("initWalls", this.initWalls, this);
},
initWalls: function(e) {
this.wallType = e;
this.setMapSize([ this._Width, this._height ]);
},
setMapSize: function(e) {
var t = e[0], i = e[1];
this._Width = this.getReal(t);
this._height = this.getReal(i);
this._min = cc.v2(-this._Width / 2, -this._height / 2);
this._max = cc.v2(this._Width / 2, this._height / 2);
},
getReal: function(e) {
var t = .9 * e;
this.wallType && this.wallType === s.Circle && (t /= 1.5);
return t;
},
doResult: function() {
this._dir = cc.v2(o.getRandomInt(-100, 100), o.getRandomInt(-100, 100)).normalizeSelf();
this.result = this._dir.mulSelf(this._speed).mulSelf(o.getRandomFloat(2, 4)).addSelf(this.node.position).clampf(this._min, this._max);
}
});
cc._RF.pop();
}, {
ConditionBaseComponent: "ConditionBaseComponent",
GameData: "GameData",
Tools: "Tools",
Types: "Types"
} ],
ConditionFindNoDangerPos: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "85673a3mE5LBYe6XzuevzyL", "ConditionFindNoDangerPos");
var n = e("ConditionBaseComponent"), a = e("GameData"), o = e("Tools"), s = e("Types").MapType;
cc.Class({
extends: n,
properties: {},
init: function(e) {
this.setMapSize([ a.instance.mapWidth, a.instance.mapHeight ]);
this._speed = e;
this.node.on("setMapSize", this.setMapSize, this);
this.node.on("initWalls", this.initWalls, this);
},
initWalls: function(e) {
this.wallType = e;
this.setMapSize([ this._Width, this._height ]);
},
setMapSize: function(e) {
var t = e[0], i = e[1];
this._Width = this.getReal(t);
this._height = this.getReal(i);
this._min = cc.v2(-this._Width / 2, -this._height / 2);
this._max = cc.v2(this._Width / 2, this._height / 2);
},
getReal: function(e) {
var t = .9 * e;
this.wallType && this.wallType === s.Circle && (t /= 1.5);
return t;
},
doResultWithParam: function(e) {
var t = null;
this._curPos = this.node.position;
this.result = e[1].clone().subSelf(this._curPos).normalizeSelf();
var i = !0, n = !1, a = void 0;
try {
for (var s, r = e[0][Symbol.iterator](); !(i = (s = r.next()).done); i = !0) {
t = s.value.position.sub(this.node.position).normalizeSelf();
this.result = this.result.subSelf(t);
if (o.compareVec2(this.result, cc.Vec2.ZERO, .1)) {
this.result = !1;
break;
}
this.result = this.result.normalizeSelf();
}
} catch (e) {
n = !0;
a = e;
} finally {
try {
!i && r.return && r.return();
} finally {
if (n) throw a;
}
}
this.result && (this.result = this.result.mulSelf(this._speed).addSelf(this.node.position).clampf(this._min, this._max));
}
});
cc._RF.pop();
}, {
ConditionBaseComponent: "ConditionBaseComponent",
GameData: "GameData",
Tools: "Tools",
Types: "Types"
} ],
ConditionHasToward: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "983f2vgJKZAzLCv0m8d1k9q", "ConditionHasToward");
var n = e("ConditionBaseComponent");
cc.Class({
extends: n
});
cc._RF.pop();
}, {
ConditionBaseComponent: "ConditionBaseComponent"
} ],
ConditionHighKnifeNumLocalHero: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "5462a5a2/tI+KpKkhT11IXN", "ConditionHighKnifeNumLocalHero");
var n = e("ConditionBaseComponent");
cc.Class({
extends: n,
properties: {
_localHero: null
},
init: function() {},
setLocalHero: function(e) {
this._localHero = e;
},
doResult: function() {
this.result = !!this._localHero && this._localHero.getKnifeNum() > 6;
}
});
cc._RF.pop();
}, {
ConditionBaseComponent: "ConditionBaseComponent"
} ],
ConditionHighKnifeNum: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "e33b3aOJzxJQJ7qBx58SgpA", "ConditionHighKnifeNum");
var n = e("ConditionBaseComponent");
cc.Class({
extends: n,
properties: {
_player: null
},
init: function(e) {
this._player = e;
},
doResult: function() {
this.result = this._player.getKnifeNum() > 6;
}
});
cc._RF.pop();
}, {
ConditionBaseComponent: "ConditionBaseComponent"
} ],
ConditionHignKnifeNumNoPick: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "f3d4eBSmIJIH7SkFVH4Uo6N", "ConditionHignKnifeNumNoPick");
var n = e("ConditionHighKnifeNum");
cc.Class({
extends: n,
properties: {
_knifeNum: 10
},
init: function(e, t) {
this._player = e;
this._knifeNum = t;
},
doResult: function() {
this.result = this._player.getKnifeNum() > this._knifeNum;
}
});
cc._RF.pop();
}, {
ConditionHighKnifeNum: "ConditionHighKnifeNum"
} ],
ConditionInThenOutLocalHero: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "c73c9KTRyxGeriXGFXt2oeM", "ConditionInThenOutLocalHero");
var n = e("ConditionBaseComponent");
cc.Class({
extends: n,
properties: {
_heroIn: !1
},
init: function() {},
doResultWithParam: function(e) {
this._heroIn && !e && (this.result = !0);
this._heroIn = e;
}
});
cc._RF.pop();
}, {
ConditionBaseComponent: "ConditionBaseComponent"
} ],
ConditionKilled: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "85c99CW6jtMeI4V6Rrg7NV5", "ConditionKilled");
var n = e("ConditionBaseComponent");
cc.Class({
extends: n,
properties: {
_player: null
},
init: function(e) {
this._player = e;
},
doResult: function() {
this.result = this._player.beKilled();
}
});
cc._RF.pop();
}, {
ConditionBaseComponent: "ConditionBaseComponent"
} ],
ConditionKnifeLessThenLocalHero: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "2c861pnihNDMLLiTq41Ii2B", "ConditionKnifeLessThenLocalHero");
var n = e("ConditionBaseComponent");
cc.Class({
extends: n,
properties: {
_player: null,
_localHero: null
},
init: function(e) {
this._player = e;
},
setLocalHero: function(e) {
this._localHero = e;
},
doResult: function() {
this.result = !!this._localHero && this._player.getKnifeNum() < this._localHero.getKnifeNum() + 6;
}
});
cc._RF.pop();
}, {
ConditionBaseComponent: "ConditionBaseComponent"
} ],
ConditionKnifeMoreSilly: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "c777fqYYyVLiIvKhfV9Isrv", "ConditionKnifeMoreSilly");
var n = e("CondtionTrue");
cc.Class({
extends: n
});
cc._RF.pop();
}, {
CondtionTrue: "CondtionTrue"
} ],
ConditionKnifeMoreThenLocalHero: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d4e44n/t/lOd5QXYMYzFXdy", "ConditionKnifeMoreThenLocalHero");
var n = e("ConditionBaseComponent");
cc.Class({
extends: n,
properties: {
_player: null,
_localHero: null
},
init: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
this._player = e;
this._extraNum = t;
},
setLocalHero: function(e) {
this._localHero = e;
},
doResult: function() {
this.result = !!this._localHero && this._player.getKnifeNum() - this._localHero.getKnifeNum() >= this._extraNum;
}
});
cc._RF.pop();
}, {
ConditionBaseComponent: "ConditionBaseComponent"
} ],
ConditionLastTimeAttackLocalHero: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "deedcwPZv9LlKW1XnWhmRa7", "ConditionLastTimeAttackLocalHero");
var n = e("CondtionLastTimeNearLocalHero");
cc.Class({
extends: n
});
cc._RF.pop();
}, {
CondtionLastTimeNearLocalHero: "CondtionLastTimeNearLocalHero"
} ],
ConditionLastTimeHeroAttack: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "acca4sdNKVCZ4BmAozHQX1A", "ConditionLastTimeHeroAttack");
var n = e("ConditionLastTime");
cc.Class({
extends: n
});
cc._RF.pop();
}, {
ConditionLastTime: "ConditionLastTime"
} ],
ConditionLastTimeHeroDefence: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "76616iqzO1Dv5a+KWubsrPc", "ConditionLastTimeHeroDefence");
var n = e("ConditionLastTime");
cc.Class({
extends: n
});
cc._RF.pop();
}, {
ConditionLastTime: "ConditionLastTime"
} ],
ConditionLastTimePeace: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d0324OwkRpNBoe5uM2fbQe3", "ConditionLastTimePeace");
var n = e("ConditionLastTime");
cc.Class({
extends: n
});
cc._RF.pop();
}, {
ConditionLastTime: "ConditionLastTime"
} ],
ConditionLastTimeToward: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "0c595m1OVFGHZw3Ja/h+MRv", "ConditionLastTimeToward");
var n = e("ConditionBaseComponent");
cc.Class({
extends: n,
properties: {
needUpdate: !1
},
init: function() {
this.result = -1;
this.needUpdate = !1;
},
clearResult: function() {
this.result = -1;
this.needUpdate = !1;
},
doResultWithParam: function(e) {
if (!this.needUpdate) {
this.result = e;
this.needUpdate = !0;
}
},
isTrue: function() {
return this.result < 0;
},
update: function(e) {
this.needUpdate && (this.result -= e);
}
});
cc._RF.pop();
}, {
ConditionBaseComponent: "ConditionBaseComponent"
} ],
ConditionLastTime: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "ac8ed24hnFEmoDeLc/v8Yth", "ConditionLastTime");
var n = e("ConditionBaseComponent");
e("Tools"), cc.Class({
extends: n,
properties: {},
init: function() {
this.result = -1;
},
doResultWithParam: function(e) {
this.result = e;
},
isTrue: function() {
return this.result < 0;
},
update: function(e) {
this.result -= e;
}
});
cc._RF.pop();
}, {
ConditionBaseComponent: "ConditionBaseComponent",
Tools: "Tools"
} ],
ConditionLocalHeroDefenceSilly: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "24552u0ZS5LoI78dQBI9TvK", "ConditionLocalHeroDefenceSilly");
var n = e("ConditionLocalHeroDefence");
cc.Class({
extends: n
});
cc._RF.pop();
}, {
ConditionLocalHeroDefence: "ConditionLocalHeroDefence"
} ],
ConditionLocalHeroDefence: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "816c9eetDpHbYI+tXhVgTZH", "ConditionLocalHeroDefence");
var n = e("ConditionBaseComponent");
cc.Class({
extends: n,
properties: {
_localHero: null
},
init: function() {},
setLocalHero: function(e) {
this._localHero = e;
},
doResult: function() {
this.result = !!this._localHero && this._localHero.isDefence;
}
});
cc._RF.pop();
}, {
ConditionBaseComponent: "ConditionBaseComponent"
} ],
ConditionLowKnifeNumLocalHero: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "44663r8hmpNN7d0yYha8/B/", "ConditionLowKnifeNumLocalHero");
var n = e("ConditionBaseComponent");
cc.Class({
extends: n,
properties: {
_localHero: null
},
init: function() {},
setLocalHero: function(e) {
this._localHero = e;
},
doResult: function() {
this.result = !!this._localHero && this._localHero.getKnifeNum() < 3;
}
});
cc._RF.pop();
}, {
ConditionBaseComponent: "ConditionBaseComponent"
} ],
ConditionLowKnifeNum: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d1535gorLlL07MVWsMtH8Cv", "ConditionLowKnifeNum");
var n = e("ConditionBaseComponent");
cc.Class({
extends: n,
properties: {
_player: null
},
init: function(e) {
this._player = e;
},
doResult: function() {
this.result = this._player.getKnifeNum() < 3;
}
});
cc._RF.pop();
}, {
ConditionBaseComponent: "ConditionBaseComponent"
} ],
ConditionNearAnotherAI: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "8097e3CYCZFTJr+tsFgY3Tm", "ConditionNearAnotherAI");
var n = e("ConditionBaseComponent");
cc.Class({
extends: n,
properties: {},
init: function() {
this.result = [];
},
clearResult: function() {
this.result = [];
},
doResultWithParam: function(e) {
this.result || (this.result = []);
this.result.push(e);
},
isTrue: function() {
return this.result && this.result.length > 0;
}
});
cc._RF.pop();
}, {
ConditionBaseComponent: "ConditionBaseComponent"
} ],
ConditionNearBlock: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "c44eev1XeZJh6cUnIZH4Fx/", "ConditionNearBlock");
var n = e("ConditionBaseComponent");
cc.Class({
extends: n,
properties: {},
init: function() {
this.result = [];
},
clearResult: function() {
this.result = [];
},
doResultWithParam: function(e) {
this.result || (this.result = []);
this.result.push(e);
},
isTrue: function() {
return this.result && this.result.length > 0;
}
});
cc._RF.pop();
}, {
ConditionBaseComponent: "ConditionBaseComponent"
} ],
ConditionNearKnife: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "38dd8ZRjG9Pm6QuEuqAC1r0", "ConditionNearKnife");
var n = e("ConditionBaseComponent");
cc.Class({
extends: n,
properties: {},
init: function() {},
doResultWithParam: function(e) {
this.result = e;
}
});
cc._RF.pop();
}, {
ConditionBaseComponent: "ConditionBaseComponent"
} ],
ConditionNearLocalHero: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "52922FzstdGGIIpRwfTz58i", "ConditionNearLocalHero");
var n = e("ConditionBaseComponent");
cc.Class({
extends: n,
properties: {},
init: function() {},
doResultWithParam: function(e) {
this.result = e;
}
});
cc._RF.pop();
}, {
ConditionBaseComponent: "ConditionBaseComponent"
} ],
ConditionNoMoreKnife: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "01a40b+Y4FHJ5doUc+8p3St", "ConditionNoMoreKnife");
var n = e("ConditionBaseComponent");
cc.Class({
extends: n,
properties: {},
init: function(e) {
this.result = e;
}
});
cc._RF.pop();
}, {
ConditionBaseComponent: "ConditionBaseComponent"
} ],
ConditionRandomBool: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "ad7c9T0sjRBNrqbCIlP2DHs", "ConditionRandomBool");
var n = e("ConditionBaseComponent"), a = e("Tools");
cc.Class({
extends: n,
properties: {},
init: function() {},
doResult: function() {
this.result = a.getRandomBool();
}
});
cc._RF.pop();
}, {
ConditionBaseComponent: "ConditionBaseComponent",
Tools: "Tools"
} ],
ConditionReviveTotal: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "ba308JqblRMEJopKewbKfR5", "ConditionReviveTotal");
var n = e("ConditionBaseComponent");
cc.Class({
extends: n,
properties: {},
init: function(e) {
this.result = e;
}
});
cc._RF.pop();
}, {
ConditionBaseComponent: "ConditionBaseComponent"
} ],
ConditionTowardLocalHero: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "2445aj8rpBL7ZwS+W3Rn1BY", "ConditionTowardLocalHero");
var n = e("CondtionTrue");
cc.Class({
extends: n
});
cc._RF.pop();
}, {
CondtionTrue: "CondtionTrue"
} ],
CondtionLastTimeNearLocalHero: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "2d1b8RJhKFIvLdEviQyz+iT", "CondtionLastTimeNearLocalHero");
var n = e("ConditionBaseComponent"), a = e("Tools");
cc.Class({
extends: n,
properties: {
canBeDo: !0
},
init: function() {
this.result = -1;
this.canBeDo = !0;
},
doResultWithParam: function(e) {
if (this.canBeDo) {
var t = a.getRandomFloat(.8, 1.2);
this.result = e * t;
this.canBeDo = !1;
}
},
isTrue: function() {
return this.result < 0;
},
clearResult: function() {
this.canBeDo = !0;
this.result = -1;
},
update: function(e) {
this.result -= e;
}
});
cc._RF.pop();
}, {
ConditionBaseComponent: "ConditionBaseComponent",
Tools: "Tools"
} ],
CondtionTrue: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "273c5kQChdFqrcgLI8Tlwff", "CondtionTrue");
var n = e("ConditionBaseComponent");
cc.Class({
extends: n,
properties: {},
init: function() {},
isTrue: function() {
return !0;
}
});
cc._RF.pop();
}, {
ConditionBaseComponent: "ConditionBaseComponent"
} ],
ConfigData: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "e459aJJYt9EAYUiNN5fzLd7", "ConfigData");
var n = e("Tools"), a = e("GameData"), o = e("Types").ItemType, s = e("PlatformMgr"), r = e("LanguageMgr"), c = cc.Class({
statics: {
instance: null,
init: function() {
c.instance && (c.instance = null);
if (null === c.instance) {
c.instance = new c();
c.instance.init();
}
},
cleanUp: function() {
c.instance && n.cleanUp(c.instance);
c.instance = null;
}
},
properties: {
loadedConfigCount: 0,
loadingConfigCount: 0,
knifeMoveData: [],
knifeSkinDatas: [],
heroSkinDatas: [],
shopDatas: [],
tasks: [],
levelCfgs: [],
defaultLevel: 6,
clientData: null,
shareBaseDatas: []
},
init: function() {
var e = this;
this.loadingConfigCount = 0;
this.loadedConfigCount = 0;
this.loadCfgData("config/client", function(t, i) {
e.clientData = i[0];
for (var a = 0; a < e.clientData.growLevelUpWays.length; a++) {
var o = e.clientData.growLevelUpWays[a];
e.clientData.growLevelUpWays[a] = n.splitToNumList(o, "-");
}
});
this.loadCfgData("config/guide", function(t, i) {
e.guideData = i[0];
});
this.loadCfgData("config/ui-tips", function(t, i) {
e.uiTipDatas = i;
});
this.loadCfgData("config/rank", function(t, i) {
e.rankDatas = i;
});
this.loadCfgData("config/knife-skin", function(t, i) {
e.knifeSkinDatas = i;
e.knifeSkinDatas.sort(function(e, t) {
return e.sort - t.sort;
});
e.initKnifeSkinTasks();
});
this.loadCfgData("config/hero-skin", function(t, i) {
e.heroSkinDatas = i;
e.heroSkinDatas.sort(function(e, t) {
return e.sort - t.sort;
});
e.initHeroSkinTasks();
});
this.loadCfgData("config/knife-move", function(t, i) {
i && i[0] && (e.knifeMoveData = i[0]);
});
this.loadCfgData("config/ai-nick", function(t, i) {
e.aiNickDatas = i;
});
this.loadCfgData("config/ai-rank", function(t, i) {
e.airankDatas = i;
});
this.loadCfgData("config/star-rank", function(t, i) {
e.starRankDatas = i;
e.bigRankDatas = [];
for (var n = 0, a = -1; n < i.length; n++) {
var o = i[n];
if (o.isRankFirst) {
a++;
var s = {};
for (var r in o) s[r] = o[r];
e.bigRankDatas[a] = s;
} else if (o.unlockBox || 0 === o.unlockBox) {
e.bigRankDatas[a].unlockBox = o.unlockBox;
e.bigRankDatas[a].unlockBoxTips = o.unlockBoxTips;
}
}
});
this.shareBaseDatas = [];
this.loadCfgData("config/share-base", function(t, i) {
var n = !0, a = !1, o = void 0;
try {
for (var s, r = i[Symbol.iterator](); !(n = (s = r.next()).done); n = !0) {
var c = s.value;
e.shareBaseDatas[c.shareType] || (e.shareBaseDatas[c.shareType] = []);
e.shareBaseDatas[c.shareType].push(c);
}
} catch (t) {
a = !0;
o = t;
} finally {
try {
!n && r.return && r.return();
} finally {
if (a) throw o;
}
}
});
this.loadCfgData("config/level-cfg", function(t, i) {
e.levelCfgs = i;
e.defaultLevel = e.getLevelByHideScore(0);
});
this.loadCfgData("config/teaword", function(t, i) {
e.teaword = i;
});
this.loadCfgData("config/advert", function(t, i) {
e.adUnitIdDatas = i;
});
this.loadCfgData("config/rank-convert", function(t, i) {
e.rankConvertDatas = i;
});
this.loadCfgData("config/activity-sign", function(t, i) {
e.signDatas = i;
});
this.loadCfgData("config/activity-lateSign", function(t, i) {
e.lateSignDatas = i;
});
this.loadCfgData("config/activity-duanWu", function(t, i) {
e.activityDuanWuDatas = i;
});
this.loadCfgData("config/buff", function(t, i) {
e.buffDatas = i;
});
this.loadCfgData("config/box", function(t, i) {
e.boxDatas = i;
});
this.loadCfgData("config/grow", function(t, i) {
e.growDatas = i;
var n = function(t) {
t.file && e.loadCfgData("config/" + t.file, function(i, n) {
t.levelDatas = n;
4 === t.id && console.log(e.growDatas);
});
}, a = !0, o = !1, s = void 0;
try {
for (var r, c = e.growDatas[Symbol.iterator](); !(a = (r = c.next()).done); a = !0) {
n(r.value);
}
} catch (t) {
o = !0;
s = t;
} finally {
try {
!a && c.return && c.return();
} finally {
if (o) throw s;
}
}
});
this.loadCfgData("config/ai-player-grow", function(t, i) {
e.aiPlayerGrowDatas = i;
});
this.loadCfgData("config/ai-star-grow", function(t, i) {
e.aiStarGrowDatas = i;
});
this.loadCfgData("config/repay", function(t, i) {
e.repayDatas = i;
});
this.loadCfgData("config/map", function(t, i) {
e.mapDatas = i;
});
this.loadCfgData("config/wall", function(t, i) {
e.wallData = i[0];
});
this.loadCfgData("config/daily-task", function(t, i) {
e.dailyTaskData = i;
});
this.loadCfgData("config/suit", function(t, i) {
e.suitDatas = i;
});
this.loadCfgData("config/holiday-const", function(t, i) {
e.holidayDatas = i[0];
});
this.loadCfgData("config/holiday-pk", function(t, i) {
e.holidayPKRewardDatas = [];
if (t) console.error("holiday-world.json load fail"); else if (i) {
var n = 0;
e.holidayPKRewardDatas[n] = i[0];
for (var a = 1; a < i.length; a++) {
var o = i[a];
if (o.reward === e.holidayPKRewardDatas[n].reward) e.holidayPKRewardDatas[n].endRank = o.rank; else {
n++;
e.holidayPKRewardDatas[n] = i[a];
}
}
}
});
this.loadCfgData("config/holiday-world", function(t, i) {
e.holidayWorldRewardDatas = [];
if (t) console.error("holiday-world.json load fail"); else if (i) {
var n = 0;
e.holidayWorldRewardDatas[n] = i[0];
for (var a = 1; a < i.length; a++) {
var o = i[a];
if (o.reward === e.holidayWorldRewardDatas[n].reward) e.holidayWorldRewardDatas[n].endRank = o.rank; else {
n++;
e.holidayWorldRewardDatas[n] = i[a];
}
}
}
});
this.loadCfgData("config/holiday-world", function(t, i) {
e.holidayWorldRewardDatas = i;
});
this.loadCfgData("config/country", function(t, i) {
e.countryDatas = i;
});
this.loadCfgData("config/treasure-small", function(t, i) {
e.treasureSmallData = i;
});
this.loadCfgData("config/treasure-big", function(t, i) {
e.treasureBigData = i;
});
this.loadCfgData("config/language", function(t, i) {
e.languageDatas = {};
var n = !0, a = !1, o = void 0;
try {
for (var s, r = i[Symbol.iterator](); !(n = (s = r.next()).done); n = !0) {
var c = s.value;
e.languageDatas[c["en-us"]] = c;
}
} catch (t) {
a = !0;
o = t;
} finally {
try {
!n && r.return && r.return();
} finally {
if (a) throw o;
}
}
});
this.loadCfgData("config/shop", function(t, i) {
e.shopDatas = i;
});
},
loadCfgData: function(e, t, i) {
var n = this;
this.loadingConfigCount++;
cc.loader.loadRes(e, function(a, o) {
o.json ? o = o.json : o.text ? o = JSON.parse(o.text) : o instanceof cc.JsonAsset && (o = null);
t && t(a, o);
i && i(a, o);
cc.loader.release(e);
n.loadedConfigCount++;
});
},
getKnifeSkinById: function(e) {
return n.getItemById(this.knifeSkinDatas, e);
},
getHeroSkinById: function(e) {
return n.getItemById(this.heroSkinDatas, e);
},
getSuitData: function(e) {
return n.getItemById(this.suitDatas, e);
},
getRandomHeroSkin: function(e, t) {
var i = [], n = !0, a = !1, o = void 0;
try {
for (var s, r = this.heroSkinDatas[Symbol.iterator](); !(n = (s = r.next()).done); n = !0) {
var c = s.value;
c.id !== t && i.push(c);
}
} catch (e) {
a = !0;
o = e;
} finally {
try {
!n && r.return && r.return();
} finally {
if (a) throw o;
}
}
return i[Math.floor(Math.random() * Math.min(e - 1, i.length))];
},
getRandomKnifeSkin: function(e) {
var t = Math.floor(Math.random() * Math.min(e, this.knifeSkinDatas.length));
return this.knifeSkinDatas[t];
},
getRandomAIName: function() {
var e = Math.floor(Math.random() * this.aiNickDatas.length);
return this.aiNickDatas[e].aiNick;
},
getAINickById: function(e) {
return this.aiNickDatas[e] ? this.aiNickDatas[e].aiNick : "无名大侠";
},
getRandomAIRank: function(e) {
var t = this.airankDatas[e], i = t.range[0], n = t.range[1], a = Math.floor(Math.random() * (n - i)) + i;
return this.starRankDatas[a] ? this.starRankDatas[a] : this.starRankDatas[0];
},
getRandomShareBaseData: function(e) {
return this.shareBaseDatas && this.shareBaseDatas[e] ? n.getRandomItem(this.shareBaseDatas[e]) : null;
},
getLevelCfg: function(e) {
return this.levelCfgs[e > 0 ? e < this.levelCfgs.length ? e : this.levelCfgs.length - 1 : 0];
},
clampHideScore: function(e) {
return e = n.clamp(this.levelCfgs[0].score, this.levelCfgs[this.levelCfgs.length - 1].score, e);
},
clampLevel: function(e) {
return e = n.clamp(0, this.levelCfgs.length - 1, e);
},
getLevelByHideScore: function(e) {
for (var t = 0; t < this.levelCfgs.length; t++) {
var i = this.levelCfgs[t], n = this.levelCfgs[t + 1];
if (!n) return i.id;
if (e >= i.score && e < n.score) return i.id;
if (e < i.score) return i.id;
}
},
initKnifeSkinTasks: function() {
var e = !0, t = !1, i = void 0;
try {
for (var n, a = this.knifeSkinDatas[Symbol.iterator](); !(e = (n = a.next()).done); e = !0) {
var s = n.value;
if (1 === s.getWay) {
var r = {};
r.id = s.taskId;
r.param = s.taskParam;
r.rewardId = s.id;
r.rewardType = o.KNIFE_SKIN;
r.type = s.taskType;
r.introduce = s.taskShort;
this.tasks.push(r);
}
}
} catch (e) {
t = !0;
i = e;
} finally {
try {
!e && a.return && a.return();
} finally {
if (t) throw i;
}
}
},
initHeroSkinTasks: function() {
var e = !0, t = !1, i = void 0;
try {
for (var n, a = this.heroSkinDatas[Symbol.iterator](); !(e = (n = a.next()).done); e = !0) {
var s = n.value;
if (1 === s.getWay) {
var r = {};
r.id = s.taskId;
r.param = s.taskParam;
r.rewardId = s.id;
r.rewardType = o.HERO_SKIN;
r.type = s.taskType;
r.introduce = s.introduce;
this.tasks.push(r);
}
}
} catch (e) {
t = !0;
i = e;
} finally {
try {
!e && a.return && a.return();
} finally {
if (t) throw i;
}
}
},
getTasks: function() {
return this.tasks;
},
getAdvertUnitId: function(e) {
var t = !0, i = !1, n = void 0;
try {
for (var a, o = this.adUnitIdDatas[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
var s = a.value;
if (s.id === e) return s.adUnitId;
}
} catch (e) {
i = !0;
n = e;
} finally {
try {
!t && o.return && o.return();
} finally {
if (i) throw n;
}
}
return null;
},
getUITipStr: function(e) {
var t = this.uiTipDatas[e];
return t[r.curLang] ? t[r.curLang] : t.tip;
},
getUITipStrByFormat: function(e, t) {
return n.getStringByFormat(this.getUITipStr(e), t);
},
getReviveWayByCount: function(e) {
return n.getItemOrFinalItem(this.clientData.reviveWays, e);
},
getMultipGoldWayByCount: function(e) {
return n.getItemOrFinalItem(this.clientData.multipGoldWays, e);
},
getProtectWayByCount: function(e) {
return this.clientData.protectStarWays[e];
},
getRankDataByScore: function(e) {
for (var t = 0; t < this.rankDatas.length; t++) {
var i = this.rankDatas[t], n = this.rankDatas[t + 1];
if (!n) return i;
if (e >= i.score && e < n.score) return i;
}
},
getRankDataByStar: function(e) {
for (var t = 0; t < this.starRankDatas.length; t++) {
var i = this.starRankDatas[t], n = this.starRankDatas[t + 1];
if (!n) return i;
if (e >= i.star && e < n.star) return i;
}
},
getRankDataById: function(e) {
return this.starRankDatas[e];
},
getItemData: function(e, t) {
var i = null;
switch (e) {
case o.HERO_SKIN:
i = this.getHeroSkinById(t);
break;

case o.KNIFE_SKIN:
i = this.getKnifeSkinById(t);
break;

case o.MONEY:
i = {
name: "金币",
url: "texture/currency/gold"
};
break;

case o.ZONG_ZI:
i = {
name: "钻石",
url: "texture/currency/diamond"
};
}
return i;
},
getRandomTryKnifeSkinData: function(e, t) {
var i = 0, a = !0, o = !1, s = void 0;
try {
for (var r, c = e[Symbol.iterator](); !(a = (r = c.next()).done); a = !0) {
var l = r.value;
(h = this.getKnifeSkinById(l)).quality > i && (i = h.quality);
}
} catch (e) {
o = !0;
s = e;
} finally {
try {
!a && c.return && c.return();
} finally {
if (o) throw s;
}
}
i < t && (i = t);
var h, d = [], u = !0, f = !1, p = void 0;
try {
for (var m, g = this.knifeSkinDatas[Symbol.iterator](); !(u = (m = g.next()).done); u = !0) {
var y = m.value;
y.quality > i && (n.arrContains(e, y.id) || d.push(y));
}
} catch (e) {
f = !0;
p = e;
} finally {
try {
!u && g.return && g.return();
} finally {
if (f) throw p;
}
}
if (0 === d.length) {
var v = !0, k = !1, C = void 0;
try {
for (var S, w = this.knifeSkinDatas[Symbol.iterator](); !(v = (S = w.next()).done); v = !0) {
var T = S.value;
T.quality === i && (n.arrContains(e, T.id) || d.push(T));
}
} catch (e) {
k = !0;
C = e;
} finally {
try {
!v && w.return && w.return();
} finally {
if (k) throw C;
}
}
}
return h = n.getRandomItem(d);
},
getRandomTryHeroSkinData: function(e, t) {
var i = 0, a = !0, o = !1, s = void 0;
try {
for (var r, c = e[Symbol.iterator](); !(a = (r = c.next()).done); a = !0) {
var l = r.value;
(h = this.getHeroSkinById(l)).quality > i && (i = h.quality);
}
} catch (e) {
o = !0;
s = e;
} finally {
try {
!a && c.return && c.return();
} finally {
if (o) throw s;
}
}
i < t && (i = t);
var h, d = [], u = !0, f = !1, p = void 0;
try {
for (var m, g = this.heroSkinDatas[Symbol.iterator](); !(u = (m = g.next()).done); u = !0) {
var y = m.value;
y.quality > i && (n.arrContains(e, y.id) || d.push(y));
}
} catch (e) {
f = !0;
p = e;
} finally {
try {
!u && g.return && g.return();
} finally {
if (f) throw p;
}
}
if (0 === d.length) {
var v = !0, k = !1, C = void 0;
try {
for (var S, w = this.heroSkinDatas[Symbol.iterator](); !(v = (S = w.next()).done); v = !0) {
var T = S.value;
T.quality === i && (n.arrContains(e, T.id) || d.push(T));
}
} catch (e) {
k = !0;
C = e;
} finally {
try {
!v && w.return && w.return();
} finally {
if (k) throw C;
}
}
}
return h = n.getRandomItem(d);
},
convertScoreIdToStarId: function(e) {
var t = this.getRankDataByScore(e), i = !0, n = !1, a = void 0;
try {
for (var o, s = this.rankConvertDatas[Symbol.iterator](); !(i = (o = s.next()).done); i = !0) {
var r = o.value;
if (r.rankScoreId === t.id) return r.rankStarId;
}
} catch (e) {
n = !0;
a = e;
} finally {
try {
!i && s.return && s.return();
} finally {
if (n) throw a;
}
}
},
getBuffDataById: function(e) {
return n.getItemById(this.buffDatas, e);
},
getBoxDataById: function(e) {
return n.getItemById(this.boxDatas, e);
},
getRandomAIIcon: function() {
return n.getRandomInt(1, 389);
},
getGrowLevelData: function(e, t) {
var i = this.growDatas[e];
if (i && i.levelDatas) return n.getItemOrFinalItem(i.levelDatas, t);
},
getAiStarDataByPlayerStar: function(e) {
return n.getItemOrFinalItem(this.aiPlayerGrowDatas, e);
},
getAiGrowDataBystar: function(e) {
return n.getItemOrFinalItem(this.aiStarGrowDatas, e);
},
isGrowLevelUpByAdver: function(e, t) {
return !!this.clientData.growLevelUpWays[e] && n.arrContains(this.clientData.growLevelUpWays[e], t);
},
getRepayDataByRank: function(e) {
return n.getItemOrFinalItem(this.repayDatas, e);
},
getBigRankDatas: function() {
return this.bigRankDatas;
},
getBigRankDatasIndex: function(e) {
for (var t = 0; t < this.bigRankDatas.length; t++) if (this.bigRankDatas[t].id === e) return t;
},
getDailyShowTask: function(e) {
var t = e.completeGuideDailyTask, i = (e.rankStar, []);
if (3 === t.length) for (var n = 0; n < 3; n++) {
var a = this.getOneDailyTask(e, n);
a && i.push(a);
} else {
var o = !0, s = !1, r = void 0;
try {
for (var c, l = this.dailyTaskData[Symbol.iterator](); !(o = (c = l.next()).done); o = !0) {
var h = c.value;
if (-1 === h.degree) {
h.process = 0;
i.push(h);
}
}
} catch (e) {
s = !0;
r = e;
} finally {
try {
!o && l.return && l.return();
} finally {
if (s) throw r;
}
}
}
return i;
},
getOneDailyTask: function(e, t) {
var i = e.dailyShowTask, a = e.dailyOldTask, o = e.rankStar, s = e.dayRefreshTaskCount, r = [], c = !0, l = !1, h = void 0;
try {
for (var d, u = this.dailyTaskData[Symbol.iterator](); !(c = (d = u.next()).done); c = !0) {
var f = d.value;
if (f.stage == s && f.pattern === t && -1 !== f.degree && f.degree <= o && -1 === a.indexOf(f.id)) {
var p = !0, m = !0, g = !1, y = void 0;
try {
for (var v, k = i[Symbol.iterator](); !(m = (v = k.next()).done); m = !0) {
if (v.value.id === f.id) {
p = !1;
break;
}
}
} catch (e) {
g = !0;
y = e;
} finally {
try {
!m && k.return && k.return();
} finally {
if (g) throw y;
}
}
p && r.push(f);
}
}
} catch (e) {
l = !0;
h = e;
} finally {
try {
!c && u.return && u.return();
} finally {
if (l) throw h;
}
}
var C = n.getRandomInt(0, r.length);
r[C] && (r[C].process = 0);
return r[C];
},
getCurGrowStage: function(e, t) {
return 0;
},
getCurStage: function(e, t) {
var i = 0, o = 0, r = !0, c = !1, l = void 0;
try {
for (var h, d = t[Symbol.iterator](); !(r = (h = d.next()).done); r = !0) {
if (e < h.value) break;
i++;
}
} catch (e) {
c = !0;
l = e;
} finally {
try {
!r && d.return && d.return();
} finally {
if (c) throw l;
}
}
if (0 === i) o = 0; else {
var u = n.getRandomInt(0, 100);
o = u < this.clientData.stagePrecents[i] ? 1 : 2;
}
if (a.instance.isShowLog()) {
console.log("阶段数组:", t, "已玩场次：", e, "所属阶段:", i);
console.log("分享概率:", this.clientData.stagePrecents[i], "本次随机概率:", u, "最后获得方式:", [ "免费", "分享", "广告" ][o]);
}
s.isApp() && 1 === o && (o = 2);
return o;
},
getCurStageByPrizeCount: function(e) {
if (s.isApp()) return 2;
var t = this.clientData.dayShowWayLimit, i = e.dayGetPrizeCount, n = e.shareScore;
if (n > 0) {
a.instance.isShowLog() && console.log("分享积分为:" + n + "，此处显示分享");
return 1;
}
i += 1;
if (a.instance.isShowLog()) {
console.log("当天第", i, "次出现视频分享点");
console.log("视频分享配置数组，单数分享，双数广告，超过数组则按最后两位的配置进行循环");
console.log(t);
}
var o = 0, r = 0, c = !0, l = !0, h = !1, d = void 0;
try {
for (var u, f = t[Symbol.iterator](); !(l = (u = f.next()).done); l = !0) {
if (!(i > (r += u.value))) {
c = !1;
break;
}
o++;
}
} catch (e) {
h = !0;
d = e;
} finally {
try {
!l && f.return && f.return();
} finally {
if (h) throw d;
}
}
if (c) {
var p = t.length, m = (i - r) % (t[p - 1] + t[p - 2]);
m > t[p - 2] || 0 === m ? o -= 1 : o -= 2;
}
o++;
if (a.instance.isShowLog()) {
console.log("本次展示在数组中的位置 ", o);
console.log("本次展示最终获取方式 ", o % 2 ? "分享" : "广告");
}
return o % 2 ? 1 : 2;
},
isDuringDuanWuFestival: function(e) {
return n.isBetweenTwoTime(this.clientData.duanWuStartDate, this.clientData.duanWuEndDate, e);
},
isAfterDuanWuFestival: function(e) {
return n.isAfterOtherTime(this.clientData.duanWuEndDate, e);
},
isDuringHolidayRankTime: function(e) {
return n.isBetweenTwoTime(this.holidayDatas.startDate, this.holidayDatas.endDate, e);
},
isDuringHolidayRankBtnShowTime: function(e) {
return n.isBetweenTwoTime(this.holidayDatas.startDate, this.holidayDatas.endShowDate, e);
},
getHolidayRankDayCount: function() {
return n.getRealDayTimeCount(this.holidayDatas.startDate, this.holidayDatas.endDate);
},
getRandomTrySuitData: function(e) {
for (var t = [], i = 0; i < this.suitDatas.length; i++) e.isOwnSuit(i + 1) || t.push(this.suitDatas[i]);
return n.getRandomItem(t);
},
getPKRewardByRank: function(e) {
var t = !0, i = !1, n = void 0;
try {
for (var a, o = this.holidayPKRewardDatas[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
var s = a.value;
if (s.endRank) {
if (e >= s.rank && e <= s.endRank) return s;
} else if (e === s.rank) return s;
}
} catch (e) {
i = !0;
n = e;
} finally {
try {
!t && o.return && o.return();
} finally {
if (i) throw n;
}
}
},
getWorldRewardByRank: function(e) {
var t = !0, i = !1, n = void 0;
try {
for (var a, o = this.holidayWorldRewardDatas[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
var s = a.value;
if (s.endRank) {
if (e >= s.rank && e <= s.endRank) return s;
} else if (e === s.rank) return s;
}
} catch (e) {
i = !0;
n = e;
} finally {
try {
!t && o.return && o.return();
} finally {
if (i) throw n;
}
}
},
getRandomCountry: function() {
return n.getRandomItem(this.countryDatas).country;
},
getLanguageStr: function(e) {
var t = this.languageDatas[e];
return t[r.curLang] ? t[r.curLang] : e;
},
getTreasureBigDataByTurn: function(e) {
return n.getItemOrFinalItem(this.treasureBigData, e);
},
getShopDatas: function() {
return this.shopDatas;
},
getShopDataPriceByIndex: function(e) {
var t = 0, i = !0, n = !1, a = void 0;
try {
for (var o, s = this.shopDatas[Symbol.iterator](); !(i = (o = s.next()).done); i = !0) {
var r = o.value;
if (r.payIndex === e) {
t = r.price;
break;
}
}
} catch (e) {
n = !0;
a = e;
} finally {
try {
!i && s.return && s.return();
} finally {
if (n) throw a;
}
}
return t;
}
});
Object.defineProperty(cc.Label.prototype, "string", {
set: function(e) {
var t = this._string;
if (!this.langFlag && c.instance && c.instance.languageDatas && c.instance.languageDatas[e.toString()]) {
var i = c.instance.languageDatas[e + ""];
this._string = i[r.curLang] ? i[r.curLang] : e + "";
} else this._string = "" + e;
this.string !== t && this._lazyUpdateRenderData();
this._checkStringEmpty();
}
});
cc.Sprite.prototype.__superOnEnable = cc.RenderComponent.prototype.onEnable;
cc.Sprite.prototype.onEnable = function() {
var e = this;
e.__superOnEnable && e.__superOnEnable();
if (!e._spriteFrame || !e._spriteFrame.textureLoaded()) {
e.disableRender();
if (e._spriteFrame) {
e._spriteFrame.once("load", e._onTextureLoaded, e);
e._spriteFrame.ensureLoadTexture();
}
}
e._activateMaterial();
var t = "texture/language/" + r.curLang + "/" + (e._spriteFrame ? e._spriteFrame.name : "");
if (e.myUrl !== t && cc.loader._getResUuid(t, cc.SpriteFrame)) {
e.myUrl = t;
cc.loader.loadRes(t, cc.SpriteFrame, function(t, i) {
t || i && (e.spriteFrame = i);
});
}
};
cc._RF.pop();
}, {
GameData: "GameData",
LanguageMgr: "LanguageMgr",
PlatformMgr: "PlatformMgr",
Tools: "Tools",
Types: "Types"
} ],
Contact: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "108983W1QZDr7ih6xaAu3en", "Contact");
var n = cc.Intersection, a = e("Types").KnifeColliderState, o = cc.Enum({
None: 0,
CollisionEnter: 1,
CollisionStay: 2,
CollisionExit: 3
});
function s(e, t) {
this.collider1 = e;
this.collider2 = t;
this.touching = !1;
var i = e instanceof cc.BoxCollider || e instanceof cc.PolygonCollider, a = t instanceof cc.BoxCollider || t instanceof cc.PolygonCollider, o = e instanceof cc.CircleCollider, s = t instanceof cc.CircleCollider;
if (i && a) this.testFunc = n.polygonPolygon; else if (o && s) this.testFunc = n.circleCircle; else if (i && s) this.testFunc = n.polygonCircle; else if (o && a) {
this.testFunc = n.polygonCircle;
this.collider1 = t;
this.collider2 = e;
} else cc.errorID(6601, cc.js.getClassName(e), cc.js.getClassName(t));
}
s.prototype.test = function() {
if (this.collider1.notColliderFlag || this.collider2.notColliderFlag) return !1;
if (this.collider1.tag === this.collider2.tag) return !1;
if (this.collider1.collState && this.collider2.collState && this.collider1.collState === a.Land && this.collider2.collState === a.Land) return !1;
var e = this.collider1.world, t = this.collider2.world;
return !!e.aabb.intersects(t.aabb) && (this.testFunc === n.polygonPolygon ? this.testFunc(e.points, t.points) : this.testFunc === n.circleCircle ? this.testFunc(e, t) : this.testFunc === n.polygonCircle && this.testFunc(e.points, t));
};
s.prototype.updateState = function() {
var e = this.test(), t = o.None;
if (e && !this.touching) {
this.touching = !0;
t = o.CollisionEnter;
} else if (e && this.touching) t = o.CollisionStay; else if (!e && this.touching) {
this.touching = !1;
t = o.CollisionExit;
}
return t;
};
s.CollisionType = o;
t.exports = s;
cc._RF.pop();
}, {
Types: "Types"
} ],
DefenceRect: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "60b2ezSY7RNlawj1fRzezvI", "DefenceRect");
var n = e("BodyRectComponent");
cc.Class({
extends: n
});
cc._RF.pop();
}, {
BodyRectComponent: "BodyRectComponent"
} ],
1: [ function(e, t, i) {
"use strict";
function n(e, t) {
return Object.prototype.hasOwnProperty.call(e, t);
}
t.exports = function(e, t, i, o) {
t = t || "&";
i = i || "=";
var s = {};
if ("string" != typeof e || 0 === e.length) return s;
var r = /\+/g;
e = e.split(t);
var c = 1e3;
o && "number" == typeof o.maxKeys && (c = o.maxKeys);
var l = e.length;
c > 0 && l > c && (l = c);
for (var h = 0; h < l; ++h) {
var d, u, f, p, m = e[h].replace(r, "%20"), g = m.indexOf(i);
if (g >= 0) {
d = m.substr(0, g);
u = m.substr(g + 1);
} else {
d = m;
u = "";
}
f = decodeURIComponent(d);
p = decodeURIComponent(u);
n(s, f) ? a(s[f]) ? s[f].push(p) : s[f] = [ s[f], p ] : s[f] = p;
}
return s;
};
var a = Array.isArray || function(e) {
return "[object Array]" === Object.prototype.toString.call(e);
};
}, {} ],
2: [ function(e, t, i) {
"use strict";
var n = function(e) {
switch (typeof e) {
case "string":
return e;

case "boolean":
return e ? "true" : "false";

case "number":
return isFinite(e) ? e : "";

default:
return "";
}
};
t.exports = function(e, t, i, r) {
t = t || "&";
i = i || "=";
null === e && (e = void 0);
return "object" == typeof e ? o(s(e), function(s) {
var r = encodeURIComponent(n(s)) + i;
return a(e[s]) ? o(e[s], function(e) {
return r + encodeURIComponent(n(e));
}).join(t) : r + encodeURIComponent(n(e[s]));
}).join(t) : r ? encodeURIComponent(n(r)) + i + encodeURIComponent(n(e)) : "";
};
var a = Array.isArray || function(e) {
return "[object Array]" === Object.prototype.toString.call(e);
};
function o(e, t) {
if (e.map) return e.map(t);
for (var i = [], n = 0; n < e.length; n++) i.push(t(e[n], n));
return i;
}
var s = Object.keys || function(e) {
var t = [];
for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.push(i);
return t;
};
}, {} ],
3: [ function(e, t, i) {
"use strict";
i.decode = i.parse = e("./decode");
i.encode = i.stringify = e("./encode");
}, {
"./decode": 1,
"./encode": 2
} ],
EntityBase: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "3d37eFW5YJBMZRnZr67iRai", "EntityBase");
cc.Class({
extends: cc.Component,
properties: {
renderPos: null,
teamID: 0,
shouldRemove: !1
},
updateGameLogic: function(e) {},
setRenderPosition: function(e) {
this.renderPos = e;
},
getRenderPosition: function() {
return this.renderPos ? this.renderPos : this.node.position;
},
recycleSelf: function() {
this.node._pool ? this.node._pool.put(this.node) : this.node.removeFromParent();
}
});
cc._RF.pop();
}, {} ],
EntityBlock: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d6746cB9f5M5pnxjMCMi0ZV", "EntityBlock");
var n = e("Tools"), a = e("EntityBase");
cc.Class({
extends: a,
properties: {
defenceRects: []
},
init: function(e, t) {
this.node.position = cc.v2(e, t);
var i = this.node.getComponentsInChildren(cc.BoxCollider), a = null, o = e, s = e, r = t, c = t, l = !0, h = !1, d = void 0;
try {
for (var u, f = i[Symbol.iterator](); !(l = (u = f.next()).done); l = !0) {
var p = u.value;
o = Math.min(o, e + p.node.x - p.size.width / 2);
s = Math.max(s, e + p.node.x + p.size.width / 2);
r = Math.min(r, t + p.node.y - p.size.height / 2);
c = Math.max(c, t + p.node.y + p.size.height / 2);
p.node.parent = this.node.parent;
p.node.position = cc.v2(e + p.node.x, t + p.node.y);
(a = n.getOrAddComponent(p.node, "DefenceRect")).init(2 * p.size.width, 2 * p.size.height);
this.defenceRects.push(a);
}
} catch (e) {
h = !0;
d = e;
} finally {
try {
!l && f.return && f.return();
} finally {
if (h) throw d;
}
}
var m = this.node.getComponentsInChildren(cc.CircleCollider), g = !0, y = !1, v = void 0;
try {
for (var k, C = m[Symbol.iterator](); !(g = (k = C.next()).done); g = !0) {
var S = k.value;
o = Math.min(o, e + S.node.x - S.radius / 2);
s = Math.max(s, e + S.node.x + S.radius / 2);
r = Math.min(r, t + S.node.y - S.radius / 2);
c = Math.max(c, t + S.node.y + S.radius / 2);
S.node.parent = this.node.parent;
S.node.position = cc.v2(e + S.node.x, t + S.node.y);
(a = n.getOrAddComponent(S.node, "DefenceRect")).init(2 * S.radius, 2 * S.radius);
this.defenceRects.push(a);
}
} catch (e) {
y = !0;
v = e;
} finally {
try {
!g && C.return && C.return();
} finally {
if (y) throw v;
}
}
this.defenceRect = n.getOrAddComponent(this.node, "DefenceRect");
this.defenceRect.init(2 * (s - o), 2 * (c - r));
}
});
cc._RF.pop();
}, {
EntityBase: "EntityBase",
Tools: "Tools"
} ],
EntityBox: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "ab913YgpwJDd7LxbqDswW0R", "EntityBox");
var n = e("Tools"), a = e("EntityBase"), o = e("VibrateUtil");
cc.Class({
extends: a,
properties: {
blood: 0,
bloodLabel: cc.Label,
activeNodes: [ cc.Node ],
colliderNode: cc.Node
},
init: function(e) {
this.data = e;
this.blood = e.blood;
this.bloodLabel.string = e.blood;
this.id = e.id;
this.nodeLandCollider = n.getOrAddComponent(this.colliderNode, "NodeCollider");
this.nodeLandCollider.init(this.node, !0, !0);
var t = !0, i = !1, a = void 0;
try {
for (var o, s = this.activeNodes[Symbol.iterator](); !(t = (o = s.next()).done); t = !0) {
o.value.active = !1;
}
} catch (e) {
i = !0;
a = e;
} finally {
try {
!t && s.return && s.return();
} finally {
if (i) throw a;
}
}
this.activeNodes[this.id].active = !0;
this.anim = this.activeNodes[this.id].getComponent(cc.Animation);
this.anim.play(this.anim._clips[0]._name);
this.node.on("onAttack", this.onAttack, this);
this.node.on("onCollByKnife", this.onCollByKnife, this);
this.node.on("onCollByBlock", this.onCollByBlock, this);
},
onCollByBlock: function(e) {
var t = e[0], i = e[1];
if (this.blood > 0) {
var n = i.node.position.add(i.node.parent.position).sub(t.node.parent.position).normalize();
this.node.position = this.node.position.add(n.mul(-10));
}
},
onCollByKnife: function(e) {
var t = e[0], i = e[1];
if (this.blood > 0) {
var n = i.node.parent.getComponent("KnifeOwnerComponent").oldOwner.position.sub(t.node.parent.position).normalize();
this.node.position = this.node.position.add(n.mul(-10));
}
},
onAttack: function(e) {
var t = this, i = e[0], n = e[1], a = e[2], s = "knife" === n.node.group;
if (this.blood <= 1) {
if (!this.isPlaying) {
this.blood--;
s && o.vibrate(!0);
this.anim.once("finished", function() {
t.isPlaying = !1;
a.emit("onBoxDestroy", {
node: t.node,
data: t.data,
isLocal: s
});
t.recycleSelf();
});
this.isPlaying = !0;
this.anim.play(this.anim._clips[2]._name);
}
} else if (!this.isPlaying) {
this.blood--;
s && o.vibrate();
a.emit("throwKnife", [ i.node, n.node ]);
this.isPlaying = !0;
setTimeout(function() {
t.isPlaying = !1;
}, 100);
this.anim.play(this.anim._clips[1]._name);
}
this.bloodLabel.string = this.blood;
},
onDie: function(e) {},
update: function(e) {}
});
cc._RF.pop();
}, {
EntityBase: "EntityBase",
Tools: "Tools",
VibrateUtil: "VibrateUtil"
} ],
EntityBuff: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "4e685B8gGBBfIgZfyF3Dp/v", "EntityBuff");
var n = e("Tools"), a = e("EntityBase");
cc.Class({
extends: a,
properties: {
attackNode: cc.Node,
pickNode: cc.Node,
landNode: cc.Node,
skinNode: cc.Node
},
init: function(e) {
this.buffState = e;
var t = this.skinNode.children[e];
t && (t.active = !0);
this.nodeLandCollider = n.getOrAddComponent(this.landNode, "NodeCollider");
this.nodeLandCollider.init(this.node, !0);
this.buffColliderListener = n.getOrAddComponent(this.node, "BuffColliderListener");
this.buffColliderListener.init(this);
this.node.once("onByPick", this.onByPick, this);
},
onByPick: function() {
var e = this.skinNode.children[this.buffState];
e && (e.active = !1);
this.recycleSelf();
}
});
cc._RF.pop();
}, {
EntityBase: "EntityBase",
Tools: "Tools"
} ],
EntityCircleWall: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "665c0Ccsr9DzJ5jIAhk1dH7", "EntityCircleWall");
cc.Class({
extends: cc.Component,
properties: {
bgNode: cc.Node,
wallNode: cc.Node,
redBgNode: cc.Node,
blackNode: cc.Node,
redNode: cc.Node,
moveSpeed: 0
},
init: function(e, t) {
this.rate = 1.39;
e = this.rate * e;
t = this.rate * t;
this.bgNode.setContentSize(e, t);
this.redBgNode.setContentSize(e, t);
this.wallNode.setContentSize(e, t);
this.reds = this.redNode.children;
this.blacks = this.blackNode.children;
this.setNodes(this.reds, e, t);
this.setNodes(this.blacks, e, t);
},
setNodes: function(e, t, i) {
e[0].position = cc.v2(-t / 2, 0);
e[1].position = cc.v2(t / 2, 0);
e[0].setContentSize(t, 2 * i);
e[1].setContentSize(t, 2 * i);
e[2].position = cc.v2(0, -i / 2);
e[3].position = cc.v2(0, i / 2);
e[2].setContentSize(2 * t, i);
e[3].setContentSize(2 * t, i);
},
refreshNodes: function(e, t) {
var i = this.moveSpeed * t * this.rate;
e[0].x += i;
e[1].x -= i;
e[2].y += i;
e[3].y -= i;
},
setMoveSpeed: function(e) {
this.moveSpeed = e;
},
startRedBg: function() {
if (!this.redBgNode.active) {
this.redBgNode.active = !0;
var e = !0, t = !1, i = void 0;
try {
for (var n, a = this.reds[Symbol.iterator](); !(e = (n = a.next()).done); e = !0) {
n.value.active = !0;
}
} catch (e) {
t = !0;
i = e;
} finally {
try {
!e && a.return && a.return();
} finally {
if (t) throw i;
}
}
}
},
closeRedBg: function() {
if (this.redBgNode.active) {
this.redBgNode.active = !1;
var e = !0, t = !1, i = void 0;
try {
for (var n, a = this.reds[Symbol.iterator](); !(e = (n = a.next()).done); e = !0) {
n.value.active = !1;
}
} catch (e) {
t = !0;
i = e;
} finally {
try {
!e && a.return && a.return();
} finally {
if (t) throw i;
}
}
}
},
updateGameLogic: function(e) {
var t = this.bgNode.width - this.moveSpeed * e * 2 * this.rate, i = this.bgNode.height - this.moveSpeed * e * 2 * this.rate;
this.bgNode.setContentSize(t, i);
this.redBgNode.setContentSize(t, i);
this.wallNode.setContentSize(t, i);
this.refreshNodes(this.reds, e);
this.refreshNodes(this.blacks, e);
}
});
cc._RF.pop();
}, {} ],
EntityEffect: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "87749Dr3G5NJoh7eSYTEozV", "EntityEffect");
var n = e("EntityBase"), a = e("Tools"), o = e("Types").TEAM_COLOR;
cc.Class({
extends: n,
properties: {
activeNode: cc.Node
},
initAsAnim: function() {
this.play();
this.recycleAfterAnim();
},
initAsParticle: function() {
this.playParticle();
this.recycleAfterTime();
},
changeColor: function(e) {
a.setNodeColor(this.node, o[e]);
},
changeColorByHex: function(e) {
a.setNodeColor(this.node, new cc.Color().fromHEX(e));
},
play: function() {
this.activeNode.active = !0;
this.activeNode.getComponent(cc.Animation).play();
},
playOnce: function() {
var e = this;
this.activeNode.active = !0;
var t = this.activeNode.getComponent(cc.Animation);
t.once("finished", function() {
e.activeNode.active = !1;
});
t.play();
},
stop: function() {
this.activeNode.active = !1;
},
open: function() {
this.activeNode.active = !0;
var e = this.activeNode.getComponent(cc.Animation);
if (e) {
e.once("finished", function() {
e.play(e._clips[1]._name);
});
e.play(e._clips[0]._name);
}
},
closeNode: function() {
this.activeNode.active = !1;
},
close: function() {
var e = this.activeNode.getComponent(cc.Animation);
e && e.play(e._clips[2]._name);
},
recycleAfterAnim: function() {
var e = this.activeNode.getComponent(cc.Animation);
e && e.once("finished", this.recycleSelf, this);
},
playParticle: function() {
var e = this.activeNode.getComponent("cc.ParticleSystem");
e && e.resetSystem();
},
recycleAfterTime: function(e) {
if (!e) {
var t = this.node.getComponent("cc.ParticleSystem");
t && (e = Math.min(t.life, .5));
}
if (e) {
this.needUpdate = !0;
this.recycleTime = e;
}
},
update: function(e) {
if (this.needUpdate) {
this.recycleTime -= e;
if (this.recycleTime <= 0) {
this.needUpdate = !1;
this.recycleSelf();
}
}
}
});
cc._RF.pop();
}, {
EntityBase: "EntityBase",
Tools: "Tools",
Types: "Types"
} ],
EntityFollowPlayer: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "4d468NmnlVHzoantyNPTGsY", "EntityFollowPlayer");
var n = e("Tools"), a = e("EntityBase");
cc.Class({
extends: a,
properties: {
player: null
},
init: function(e) {
this.player = e;
n.getOrAddComponent(this.node, "MoveWithOwnerNode").init(this.node.parent, this, this.player);
this.knivesCmp = n.getOrAddComponent(this.node, "PlayerKnivesComponent");
this.knivesCmp.init(e);
this.knifeCollisionSoundCtrl = n.getOrAddComponent(this.node, "KnifeCollisionSoundCtrl");
this.knifeCollisionSoundCtrl.init();
this.heroRotate = n.getOrAddComponent(this.node, "HeroRotate");
n.getOrAddComponent(this.node, "HeroCollisionWallListener");
this.followPlayerScale = n.getOrAddComponent(this.node, "FollowPlayerScale");
this.node.on("addBuff", this.addBuff, this);
this.node.on("wallCollision", this.wallCollision, this);
this.node.on("onAttackBox", this.onAttackBox, this);
},
onAttackBox: function() {
this.player.node.emit("onAttackBox");
},
wallCollision: function(e) {
this.player.isCollisionWall = e;
},
updateGameLogic: function(e) {
this.knivesCmp.updateLogic(e);
this.heroRotate.updateLogic(e);
},
die: function() {
this.knivesCmp.emitAllKnivesRelease();
this.knifeCollisionSoundCtrl.stop();
},
addBuff: function(e) {
this.player.beKilled() || this.player.node.emit("updateBuffState", e);
},
changeColliderState: function(e) {
this.knivesCmp.changeColliderState(e);
}
});
cc._RF.pop();
}, {
EntityBase: "EntityBase",
Tools: "Tools"
} ],
EntityGuide: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "1fc21MuoW5GraSFRaxpz3n6", "EntityGuide");
var n = e("Tools"), a = e("GameData");
e("AudioEngine"), e("Types").SoundID, e("Types").NAME_COLOR, e("UIUtil"), e("Types").FrenzyAddType, 
e("Types").HeroSkinProperty, e("Types").HeroRebornEffectState, e("Types").StageType, 
e("Types").KnifeState;
cc.Class({
extends: cc.Component,
properties: {
ctx: cc.Graphics,
canDraw: !0,
beforeAnim: cc.Animation,
startAnim: cc.Animation,
endAnim: cc.Animation,
bgAnim: cc.Animation,
shadowNode: cc.Node,
colliderNode: cc.Node
},
init: function(e) {
this.player = e;
this.bodyCollider = this.colliderNode.getComponent(cc.Collider);
this.bodyCollider.tag = e.teamID;
this.heroMove = n.getOrAddComponent(this.node, "HeroMove");
this.heroMove.changeSpeedRate(1.5);
this.ctx.moveTo(this.node.position);
this.speedShadow = n.getOrAddComponent(this.node, "SpeedShadow");
this.speedShadow.init("texture/hero/effect-batman-06", this.shadowNode);
this.bgAnim.node.width = a.instance.screenWidth;
this.bgAnim.node.height = a.instance.screenHeight;
this.node.on("catchEnemy", this.catchEnemy, this);
},
setShadow: function(e) {
this.shadowNode.active = e;
},
catchEnemy: function(e) {
this.node.position = e;
this.player.node.emit("catchEnemyByBatMan");
},
playBeforeAnim: function() {
this.beforeAnim.node.active = !0;
this.beforeAnim.play();
},
playStartAnim: function() {
this.endAnim.node.active = !1;
this.startAnim.node.active = !0;
this.startAnim.play();
if (this.player.isLocal) {
this.bgAnim.node.active = !0;
this.bgAnim.play();
}
},
playEndAnim: function() {
var e = this;
this.endAnim.node.active = !0;
this.startAnim.node.active = !1;
this.endAnim.play();
this.endAnim.once("finished", function() {
e.node.active = !1;
e.bgAnim.node.active = !1;
});
},
setDraw: function(e) {
if (e) {
this.canDraw = !0;
this.ctx.moveTo(this.node.position);
} else this.canDraw = !1;
},
updateGameLogic: function(e) {
this.heroMove && this.heroMove.updateGameLogic(e);
this.speedShadow && this.speedShadow.updateGameLogic(e);
this.moveFix && this.moveFix.updateGameLogic(e);
this.player.myCamera && (this.bgAnim.node.scale = 1 / this.player.myCamera.camera.zoomRatio / this.node.scale);
},
updateDraw: function(e) {
if (this.canDraw) {
this.ctx.node.position = cc.v2(0, 0).sub(this.node.position);
this.ctx.lineTo(this.node.position);
this.ctx.stroke();
this.ctx.moveTo(this.node.position);
}
},
initWalls: function(e, t, i, a) {
switch (e) {
case 0:
this.moveFix = n.getOrAddComponent(this.node, "HeroMoveFix");
this.moveFix.init(this.colliderNode.getComponent(cc.Collider));
this.moveFix.initWalls(t);
break;

case 1:
this.moveFix = n.getOrAddComponent(this.node, "HeroMoveFixByCircle");
this.moveFix.init(this.colliderNode.getComponent(cc.Collider), this.player.followPlayer);
this.moveFix.refresh(i, a);
}
}
});
cc._RF.pop();
}, {
AudioEngine: "AudioEngine",
GameData: "GameData",
Tools: "Tools",
Types: "Types",
UIUtil: "UIUtil"
} ],
EntityKnife: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "693faGZvRNMQZcxjEpZO+kS", "EntityKnife");
var n = e("Tools"), a = e("EntityBase"), o = e("Types").KnifeState, s = (e("GameData"), 
e("Types").KnifeMomentState);
cc.Class({
extends: a,
properties: {
attackNode: cc.Node,
skinNode: cc.Node,
activeNode: cc.Node,
ctx: cc.Graphics,
ropeNode: cc.Node
},
init: function(e, t) {
this.itemNode = t;
this.teamID = e;
this.shouldRemove = !1;
this.nodeCollider = n.getOrAddComponent(this.attackNode, "NodeCollider");
this.nodeCollider.init(this.node, !0, !0);
this.node.on("changeTag", this.changeColliderTag, this);
this.node.on("changeKnifeAttackGroup", this.changeKnifeAttackGroup, this);
this.node.on("changeColliderState", this.changeColliderState, this);
this.addComponent();
this.knifeColliderListener = n.getOrAddComponent(this.node, "KnifeColliderListener");
this.knifeMoveCtrl = n.getOrAddComponent(this.node, "KnifeMoveCtrl");
this.knifeParentCtrl = n.getOrAddComponent(this.node, "KnifeParentCtrl");
this.knifeParentCtrl.init(this.itemNode);
this.knifeColliderNodeCtrl = n.getOrAddComponent(this.node, "KnifeColliderNodeCtrl");
this.knifeColliderNodeCtrl.init(this.attackNode);
this.knifeSkinCtrl = n.getOrAddComponent(this.skinNode, "KnifeSkinCtrl");
this.activeNode = this.skinNode;
this.defenceRect = n.getOrAddComponent(this.node, "DefenceRect");
this.defenceRect.init(2 * this.node.width, 2 * this.node.height, !0);
this.changeColliderTag(e);
},
initWalls: function(e, t, i) {
switch (e) {
case 0:
this.knifeFix = n.getOrAddComponent(this.node, "KnifeFixByWallCtrl");
break;

case 1:
this.knifeFix = n.getOrAddComponent(this.node, "KnifeFixByCircleWallCtrl");
this.knifeFix.init();
}
this.knifeFix.refresh(t, i);
this.knifeOutOfWall = n.getOrAddComponent(this.node, "KnifeOutOfWallComponent");
this.knifeOutOfWall.init(this, t, i);
},
refreshWalls: function(e, t) {
this.knifeFix.refresh(e, t);
this.knifeOutOfWall.refresh(this, e, t);
},
addComponent: function() {
n.getOrAddComponent(this.node, "KnifeCountComponent");
this.knifeStateComp = n.getOrAddComponent(this.node, "KnifeStateComponent");
this.knifeMomentStateComp = n.getOrAddComponent(this.node, "KnifeMomentStateComponent");
n.getOrAddComponent(this.node, "KnifeOwnerComponent");
},
isOnLand: function() {
return 0 === this.teamID && this.knifeStateComp && this.knifeStateComp.state === o.Normal;
},
changeColliderTag: function(e) {
this.teamID = e;
this.attackNode.getComponent(cc.Collider).tag = e;
},
changeID: function(e) {
this.idLabel.string = e;
this.attackNode.getComponent(cc.Collider).customID = e;
},
changeKnifeAttackGroup: function(e) {
this.nodeCollider.changeNodeGroup(e);
},
onKnifeViewChange: function(e) {},
updateGameLogic: function(e) {
this.knifeParentCtrl.updateLogic(e);
this.knifeMoveCtrl.updateLogic(e);
this.knifeColliderNodeCtrl.updateLogic(e);
this.knifeSkinCtrl.updateLogic(e);
this.knifeFix && this.knifeFix.updateLogic(e);
if (this.knifeOutOfWall) {
this.knifeOutOfWall.updateGameLogic(e);
if (this.knifeOutOfWall.isOut) {
this.shouldRemove = !0;
this.recycleSelf();
}
}
this.node.emit("resetDirty");
if (this.drawPos) {
this.ropeNode.active || (this.ropeNode.active = !0);
var t = this.drawPos.sub(this.node.position);
this.ropeNode.width = t.mag();
var i = t.angle(cc.v2(-1, 0)) * (180 / Math.PI);
t.y < 0 && (i = -i);
this.ropeNode.rotation = i - this.ropeNode.parent.rotation;
this.drawPos = null;
} else this.ropeNode.active && (this.ropeNode.active = !1);
},
draw: function(e) {
this.drawPos = e;
},
reLand: function() {
this.node.emit("changeTag", 0);
this.node.emit("updateState", o.Normal);
this.node.emit("updateMomentState", s.ReleaseFinish);
},
setSage: function(e) {},
changeColliderState: function(e) {
this.nodeCollider.node.active = e;
}
});
cc._RF.pop();
}, {
EntityBase: "EntityBase",
GameData: "GameData",
Tools: "Tools",
Types: "Types"
} ],
EntityMap: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "7e5f9cXCFtKtIjpISFI0JTt", "EntityMap");
e("Tools");
var n = e("EntityBase");
cc.Class({
extends: n,
properties: {
mapWidth: 0,
mapHeight: 0,
mapSprs: [ cc.Node ]
},
init: function(e, t, i) {
this.mapWidth = t;
this.mapHeight = i;
this.mapSprs[e].active = !0;
this.mapSprs[e].setContentSize(t, i);
}
});
cc._RF.pop();
}, {
EntityBase: "EntityBase",
Tools: "Tools"
} ],
EntityPlayer: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "8c98bHmilVHF5eXbFobErE9", "EntityPlayer");
var n = e("Tools"), a = e("EntityBase"), o = e("AudioEngine"), s = e("Types").SoundID, r = (e("Types").NAME_COLOR, 
e("PlayerData"), e("Types").FrenzyAddType), c = e("Types").HeroSkinProperty, l = e("Types").HeroRebornEffectState, h = e("Types").StageType, d = e("Types").KnifeState;
cc.Class({
extends: a,
properties: {
colliderNode: cc.Node,
isLocal: !0,
uid: 999,
followPlayer: null,
touchNode: cc.Node,
rank: 0,
isDead: !1,
isDefence: !0,
killNum: 0,
pickKnifeCount: 0,
killKnifeCount: 0,
maxPickKnifeCount: 0,
circleNode: cc.Node,
_dieEffect: cc.Node,
firstDead: !1,
waitToDie: !1,
reviveCount: 0,
invincible: !1,
invincibleTime: 0,
heroTeamIcon: cc.Sprite,
heroIcon: cc.Sprite,
scaleMultip: 2,
shadowNode: cc.Node,
isInView: !1,
goldAddition: 0,
isSage: !1,
activeNode: cc.Node,
ctx: cc.Graphics,
lightTime: 0,
redPope: cc.Node,
rayNode: cc.Node,
posArrowPool: []
},
init: function(e, t, i, a, o, s, r, c, l, h, d, u, f, p, m, g) {
this.isLocal = e;
this.uid = t;
this.followPlayer = i;
this.teamID = a;
this.aiLevel = p;
this.rankData = r;
this.rankIconNode = c;
this.rankIconNode.active = !1;
this.country = l;
this.skin = o;
this.heroSkin = h;
this.killNum = 0;
this.pickKnifeCount = 0;
this.killKnifeCount = 0;
this.maxPickKnifeCount = 0;
this.isKey = g;
this.reviveCount = 0;
this.name = s.nickname.string ? s.nickname.string : "player";
this.playerName = s;
this.changeName(this.name);
this.iconUrl = d;
this.attackPower = u;
this.defencePower = f;
this.heroMove = n.getOrAddComponent(this.node, "HeroMove");
this.heroScale = n.getOrAddComponent(this.node, "HeroScale");
this.heroScale.init(this);
this.moveFixByBlock = n.getOrAddComponent(this.node, "HeroMoveFixByBlock");
this.moveFixByBlock.init(this.colliderNode.getComponent(cc.Collider));
var y = n.getOrAddComponent(this.colliderNode, "NodeCollider");
y.init(this.node, !0);
this.nodeCollider = y;
this.bodyCollider = this.colliderNode.getComponent(cc.Collider);
this.bodyCollider.tag = a;
this.logicPlayer = n.getOrAddComponent(this.node, "LogicPlayer");
this.logicPlayer.init(this);
this.defenceRect = n.getOrAddComponent(this.node, "DefenceRect");
this.defenceRect.init(360, 360, !0);
this.attackRect = n.getOrAddComponent(this.node, "AttackRect");
this.attackRect.init(360, 360, !0, !1, 1.5);
this.buffComp = n.getOrAddComponent(this.node, "PlayerBuffComponent");
this.buffChangeListener = n.getOrAddComponent(this.node, "PlayerBuffChangeListener");
this.buffChangeListener.init(this);
if (m) {
this.playerFrenzyComp = n.getOrAddComponent(this.node, "PlayerFrenzyComponent");
this.playerFrenzyComp.init();
} else {
this.playerReviveFrenzyComp = n.getOrAddComponent(this.node, "PlayerReviveFrenzyComponent");
this.playerReviveFrenzyComp.init();
}
this.isDead = !1;
this.isInView = !1;
this.node.on("addBuff", this.addBuff, this);
this.node.on("addKnife", this.addKnife, this);
this.node.on("die", this.die, this);
this.node.on("isCollCircleWall", this.isCollCircleWall, this);
this.node.on("changeMagnet", this.changeMagnet, this);
this.node.on("killByGuide", this.killByGuide, this);
this.changeSkin();
this.suitComp = n.getOrAddComponent(this.node, "PlayerSuitComponent");
this.suitComp.init(this);
},
changeSkin: function() {
var e = this;
e.heroTeamIcon.node.active = !1;
e.heroIcon.node.active = !1;
if (e.heroSkin) {
cc.loader.loadRes(e.heroSkin.url, cc.SpriteFrame, function(t, i) {
if (t) cc.error(t); else if (i && e.heroSkin) {
e.heroIcon.spriteFrame = i;
e.heroIcon.node.active = !0;
}
});
switch (this.heroSkin.property) {
case c.Speed:
this.heroMove.changeSkinSpeedAddition(this.heroSkin.propertyParam / 100);
this.openShadow();
break;

default:
this.heroMove.changeSkinSpeedAddition(0);
this.closeShadow();
}
} else {
cc.loader.loadRes("texture/hero/player00" + e.teamID, cc.SpriteFrame, function(t, i) {
if (t) cc.error(t); else if (i && !e.heroSkin) {
e.heroTeamIcon.spriteFrame = i;
e.heroTeamIcon.node.active = !0;
}
});
this.heroMove.changeSkinSpeedAddition(0);
this.closeShadow();
}
this.changeSuit();
},
changeKnifeSkin: function(e) {
this.skin = e;
this.changeSuit();
},
changeSuit: function() {
this.skin && this.heroSkin && this.skin.suit && this.heroSkin.suit && this.skin.suit === this.heroSkin.suit ? this.suit = this.skin.suit : this.suit = null;
this.suitComp && this.suitComp.changeSuit();
},
changeEffectColor: function() {
if (this.heroSkin) {
this._defenceEffect.changeColorByHex(this.heroSkin.hexColor);
this._dieEffect.changeColorByHex(this.heroSkin.hexColor);
} else {
this._defenceEffect.changeColor(this.teamID);
this._dieEffect.changeColor(this.teamID);
}
},
startGame: function(e) {
this.isStartGame = !0;
this.followPlayer.node.emit("startGame", e);
this.rankIconNode.active = !0;
this.playerName.frameNode.active = !1;
this._frenzyBar && (this._frenzyBar.active = !0);
if (this.isLocal) {
this.moveByKeyboard = n.getOrAddComponent(this.node, "MoveByKeyboard");
this.moveByTouch = n.getOrAddComponent(this.touchNode, "MoveByTouch");
this.moveByTouch.init(this);
this.MoveStateNotice = n.getOrAddComponent(this.node, "MoveStateNotice");
this.MoveStateNotice.init(this, this.followPlayer.knivesCmp);
this.canFrenzyBorn ? this.node.emit("onFrenzyAdd", r.tryFrenzy) : this.canAddBornFrenzy && this.node.emit("onFrenzyAdd", r.born);
} else if (!e) {
this.aiMgr = n.getOrAddComponent(this.node, "AIMgr");
this.aiMgr.init(this.heroMove.moveSpeed, this.aiLevel, this);
}
},
beKilled: function() {
return this.isDead || this.firstDead;
},
die: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
if (!this.invincible && (!this.isInvincible() || t)) {
var i = this._stage !== h.Free || 0 === this.reviveCount;
if (this.firstDead || !i) {
if (!this.waitToDie && !this.isDead) {
this.isDead = !0;
this.moveByTouch && this.moveByTouch.touchEndEvent();
this.followPlayer.die();
this.buffComp.die();
this.suitComp.die();
this.aiMgr && this.aiMgr.onDie();
this.activeNode.active = !1;
this.bodyCollider.notColliderFlag = !0;
this.playerName.node.active = !1;
this.rankIconNode.active = !1;
this._flagNode.active = !1;
this._keyNode && (this._keyNode.active = !1);
if (e && e.node) {
n = e.node.parent.parent.getComponent("EntityFollowPlayer");
this.killer = n ? n.player : null;
this.killer && this.killer.addKillNum(this);
}
this._dieEffect.node.active = !1;
this._defenceTips && (this._defenceTips.active = !1);
this._defenceStartEffect && (this._defenceStartEffect.node.active = !1);
this._attackStartEffect && (this._attackStartEffect.node.active = !1);
this.isLocal && e && o.instance.playSound(s.Death);
this.deadCallbcak && this.deadCallbcak(this.node.position);
}
} else {
this.firstDead = !0;
this.waitToDie = !0;
this.reviveTime = 5;
this.waitToRevive = !1;
this.showRebornEffect = l.Close;
this.moveByTouch && this.moveByTouch.touchEndEvent();
this.rankIconNode.active = !1;
this._flagNode.active = !1;
this._keyNode && (this._keyNode.active = !1);
this.followPlayer.die();
this.buffComp.die();
this.suitComp.die();
this.aiMgr && this.aiMgr.onDie();
this.activeNode.active = !1;
this.bodyCollider.notColliderFlag = !0;
this.playerName.node.active = !1;
this._defenceTips && (this._defenceTips.active = !1);
this._defenceStartEffect && (this._defenceStartEffect.node.active = !1);
this._attackStartEffect && (this._attackStartEffect.node.active = !1);
if (e && e.node) {
var n = e.node.parent.parent.getComponent("EntityFollowPlayer"), a = e.node.parent.getComponent("EntityGuide");
this.killer = n ? n.player : a ? a.player : null;
this.killer && this.killer.addKillNum(this);
}
this._dieEffect.node.active = !0;
this._dieEffect.playParticle();
this.isLocal && e ? o.instance.playSound(s.Death) : o.instance.playSound(s.Kill);
}
}
},
revive: function(e) {
this.firstDead = !1;
this.waitToDie = !1;
this.activeNode.active = !0;
this.bodyCollider.notColliderFlag = !1;
this.playerName.node.active = !0;
this.followPlayer.node.active = !0;
this.rankIconNode.active = !0;
this._flagNode.active = !0;
this._dieEffect.node.active = !1;
this.reviveCount++;
this.flag = !1;
this._keyNode && (this._keyNode.active = this.isKey);
if (this.isLocal) {
this.invincible = !0;
this.invincibleTime = 2;
}
e && this.node.emit("onReviveFrenzyAdd", r.revive);
},
updateDieLogic: function(e) {
if (this.invincible) {
this.invincibleTime -= e;
this.invincibleTime < 0 && (this.invincible = !1);
}
},
setSage: function(e) {},
updateReviveLogic: function(e) {
if (this.firstDead) {
this.reviveTime -= e;
this.reviveTime < 0 ? this.waitToRevive = !0 : this.reviveTime < 2 && this.showRebornEffect === l.Close && (this.showRebornEffect = l.waitToShow);
}
},
initWalls: function(e, t, i, a) {
switch (e) {
case 0:
this.moveFix = n.getOrAddComponent(this.node, "HeroMoveFix");
this.moveFix.init(this.colliderNode.getComponent(cc.Collider));
this.moveFix.initWalls(t);
break;

case 1:
this.moveFix = n.getOrAddComponent(this.node, "HeroMoveFixByCircle");
this.moveFix.init(this.colliderNode.getComponent(cc.Collider), this.followPlayer);
this.moveFix.refresh(i, a);
}
this.aiMgr && this.aiMgr.initWalls(e);
this.myGuideComp && this.myGuideComp.initWalls(e, t, i, a);
},
refreshWalls: function(e, t) {
this.moveFix.refresh(e, t);
this.myGuideComp.moveFix.refresh(e, t);
},
addKnife: function(e) {
this.isNoMoreKnife() ? e.getComponent("EntityKnife").reLand() : this.followPlayer.knivesCmp.addKnife(e);
},
addBuff: function(e) {
this.beKilled() || this.node.emit("updateBuffState", e);
},
updateGameLogic: function(e, t) {
var i = t.knifes;
this.updateDieLogic(e);
!this.beKilled() && this.aiMgr && this.aiMgr.updateGameLogic(e);
this.heroMove.updateGameLogic(e);
this.heroScale.updateGameLogic(e);
this.moveFixByBlock.updateGameLogic(e);
this.moveFix && this.moveFix.updateGameLogic(e);
this.moveGuideFix && this.moveGuideFix.updateGameLogic(e);
this.followPlayer.updateGameLogic(e);
this.logicPlayer.updateLogic(e);
this.speedShadow && this.speedShadow.updateGameLogic(e);
this.canMagnet && this.updateMagnetLogic(e, i);
this.buffComp.updateGameLogic(e);
this.beKilled() || this.suitComp.updateGameLogic(e, t, i);
if (this.updateKey) {
t.updateKeyCount(this.otherKeyNode);
this.updateKey = !1;
}
},
getKnifeNum: function() {
return this.followPlayer.knivesCmp.getKnifeNum();
},
stopControl: function() {
this.isStopCtrl = !0;
this.moveByKeyboard.enabled = !1;
this.moveByTouch.enabled = !1;
this.MoveStateNotice.enabled = !1;
},
changeName: function(e) {
this.name = e || "player";
this.playerName.nickname.string = this.name;
var t = 10 * n.getStrlen(this.name) + 10;
this.playerName.frameNode.width = t;
this._rankComp.bg.width = t;
this._rankComp.icon.node.x = t / 2;
this._flagComp.icon.node.x = -t / 2;
this.nameDirty = !0;
},
setLocalHero: function(e) {
!this.isLocal && this.aiMgr && this.aiMgr.setLocalHero(e);
},
setInView: function(e) {
this.isInView = e;
},
heroStartMove: function() {
if (!this.isStopCtrl) {
this.isDefence = !1;
this.invincible = !1;
this._defenceTips;
if (this._attackStartEffect && !this.isDead) {
this._defenceStartEffect && (this._defenceStartEffect.node.active = !1);
this._attackStartEffect.node.active = !0;
this._attackStartEffect.play();
}
}
},
heroStopMove: function() {
if (!this.isStopCtrl) {
this.isDefence = !0;
this._defenceTips && (this.isCollisionWall, this.isDead);
if (this._defenceStartEffect && !this.isCollisionWall & !this.isDead) {
this._attackStartEffect && (this._attackStartEffect.node.active = !1);
this._defenceStartEffect.node.active = !0;
this._defenceStartEffect.play();
}
}
},
setFinalRank: function(e) {
if (!this.flag) {
this.flag = !0;
this.rank = e;
}
},
setKillCallback: function(e) {
this.killCallbcak = e;
},
setDeadCallback: function(e) {
this.deadCallbcak = e;
},
setChangeKnifeCountCallback: function(e) {
this.changeKnifeCountCallback = e;
},
addKillNum: function(e) {
if (this.isLocal && e.isKey) {
e.isKey = !1;
this.updateKey = !0;
this.otherKeyNode = e.node;
}
this.killNum++;
this.node.emit("onFrenzyAdd", r.kill);
this.killCallbcak && this.killCallbcak();
},
addKnifeNum: function(e) {
if (this.isLocal) {
this.pickKnifeCount++;
this.maxPickKnifeCount = Math.max(this.maxPickKnifeCount, e);
}
},
addKillKnifeNum: function() {
this.isLocal && this.killKnifeCount++;
},
isHard: function() {
var e = !1;
this.buffChangeListener && (e = this.buffChangeListener.isHard());
return e;
},
isInvincible: function() {
var e = !1;
this.buffChangeListener && (e = this.buffChangeListener.isInvincible());
return e;
},
isFrenzy: function() {
var e = !1;
this.playerFrenzyComp ? e = this.playerFrenzyComp.isFrenzy() : this.playerReviveFrenzyComp && (e = this.playerReviveFrenzyComp.isFrenzy());
return e;
},
isNoMoreKnife: function() {
return !this.isInView && this.aiMgr && this.getKnifeNum() >= this.aiMgr.getNoMoreKnifeNum();
},
canRevive: function() {
return this.aiMgr && this.reviveCount < this.aiMgr.getReviveTotal();
},
refreshPowerArrow: function(e) {
this._powerArrow && this._powerArrow.refresh(this, e);
},
closePowerArrow: function() {
this._powerArrow && this._powerArrow.close();
},
changeAttackPower: function(e) {
this.attackPower = e;
},
changeDefencePower: function(e) {
this.defencePower = e;
},
setGoldAddition: function(e) {
this.goldAddition = e;
},
changeGrowSpeedAddition: function(e) {
this.heroMove.changeGrowSpeedAddition(e);
},
isCollCircleWall: function(e) {
this.followPlayer.node.emit("isCollCircleWall", e);
},
showTips: function(e) {
if (!this.beKilled() && this._defenceTips && this.tipsType !== e) {
this.tipsType = e;
this._defenceTips.active || (this._defenceTips.active = !0);
var t = this._defenceTips.children[1].children, i = this._defenceTips.children[0];
if (t) for (var n = 0; n < t.length; n++) {
var a = t[n];
if (!a) return;
if (n === e) {
a.active = !0;
i && (i.width = 50 + a.width);
} else a.active = !1;
}
}
},
closeTips: function(e) {
if (null !== this.tipsType) {
this.tipsType = null;
if (this._defenceTips) {
this._defenceTips.active = !1;
for (var t = this._defenceTips.children[1].children, i = 0; i < t.length; i++) {
var n = t[i];
if (!n) return;
n.active = !1;
}
}
}
},
changeMagnet: function(e) {
this.canMagnet = e;
},
updateMagnetLogic: function(e, t) {
var i = this.heroScale.newScaleMultip, n = (this.node.scale - i) / 1.5 + i, a = !0, o = !1, s = void 0;
try {
for (var r, c = t[Symbol.iterator](); !(a = (r = c.next()).done); a = !0) {
var l = r.value;
if (0 === l.teamID && l.knifeStateComp.state === d.Normal && !l.knifeColliderNodeCtrl.attackCollider.notColliderFlag) {
var h = l.node.position.sub(this.node.position);
if (h.mag() < 380 * n) {
0;
h = h.normalize().mul(20);
var u = l.node.position.sub(h);
l.knifeMoveCtrl.finalPosition = u;
}
}
}
} catch (e) {
o = !0;
s = e;
} finally {
try {
!a && c.return && c.return();
} finally {
if (o) throw s;
}
}
},
updateLightingLogic: function(e, t, i) {},
showNameNode: function(e) {
this.playerName.node.active = e;
this._flagNode.active = e;
},
setScale: function(e) {
this.node.emit("changeScaleMultip", e);
this.followPlayer.node.emit("changeScaleMultip", e);
},
changeColliderState: function(e) {
this.nodeCollider.node.active = e;
this.followPlayer.changeColliderState(e);
},
killByGuide: function() {
this.node.emit("onStopMove", !0);
},
changePosArrTarget: function(e) {
for (var t = this.posArrowPool.length, i = 0; i < t; i++) {
this.posArrowPool[i].changeLocalPlayer(e);
}
},
openShadow: function() {
this.speedShadow = n.getOrAddComponent(this.node, "SpeedShadow");
this.speedShadow.init(this.heroSkin.url, this.shadowNode);
},
closeShadow: function() {
this.speedShadow && this.speedShadow.close();
},
changeOpacity: function(e) {
this.node.opacity = e;
this.followPlayer.node.opacity = e;
}
});
cc._RF.pop();
}, {
AudioEngine: "AudioEngine",
EntityBase: "EntityBase",
PlayerData: "PlayerData",
Tools: "Tools",
Types: "Types"
} ],
EntityWall: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "085191Xg/pBXJiSdgq/vo9u", "EntityWall");
e("EntityBase");
cc.Class({
extends: cc.Component,
properties: {
spriteNode: cc.Node,
lightNode: cc.Node,
bgNode: cc.Node,
redLightNode: cc.Node,
redBgNode: cc.Node,
blackNode: cc.Node,
redNode: cc.Node,
wallCollider: cc.Collider,
moveSpeed: 0
},
init: function(e, t, i) {
this.wallCollider.tag = e;
switch (e) {
case 0:
this.wallCollider.node.scaleX = t / this.wallCollider.size.width;
this.lightNode.width = t;
this.bgNode.width = t;
this.redLightNode.width = t;
this.redBgNode.width = t;
this.spriteNode.rotation = 180;
this.blackNode.width = 2 * t;
this.redNode.width = 2 * t;
break;

case 1:
this.wallCollider.node.scaleX = t / this.wallCollider.size.width;
this.lightNode.width = t;
this.bgNode.width = t;
this.redLightNode.width = t;
this.redBgNode.width = t;
this.spriteNode.rotation = 0;
this.blackNode.width = 2 * t;
this.redNode.width = 2 * t;
break;

case 2:
this.wallCollider.node.scaleY = i / this.wallCollider.size.height;
this.lightNode.width = i;
this.bgNode.width = i;
this.redLightNode.width = i;
this.redBgNode.width = i;
this.spriteNode.rotation = 90;
this.blackNode.width = 2 * i;
this.redNode.width = 2 * i;
break;

case 3:
this.wallCollider.node.scaleY = i / this.wallCollider.size.height;
this.lightNode.width = i;
this.bgNode.width = i;
this.redLightNode.width = i;
this.redBgNode.width = i;
this.spriteNode.rotation = 270;
this.blackNode.width = 2 * i;
this.redNode.width = 2 * i;
}
},
setMoveSpeed: function(e) {
this.moveSpeed = e;
},
startRedBg: function() {
this.lightNode.active && (this.lightNode.active = !1);
this.redLightNode.active || (this.redLightNode.active = !0);
this.redBgNode.active || (this.redBgNode.active = !0);
this.redNode.active || (this.redNode.active = !0);
},
closeRedBg: function() {
this.lightNode.active || (this.lightNode.active = !0);
this.redLightNode.active && (this.redLightNode.active = !1);
this.redBgNode.active && (this.redBgNode.active = !1);
this.redNode.active && (this.redNode.active = !1);
},
updateGameLogic: function(e) {
switch (this.wallCollider.tag) {
case 0:
this.node.y -= this.moveSpeed * e;
break;

case 1:
this.node.y += this.moveSpeed * e;
break;

case 2:
this.node.x += this.moveSpeed * e;
break;

case 3:
this.node.x -= this.moveSpeed * e;
}
this.lightNode.width -= this.moveSpeed * e * 2;
this.lightNode.x += this.moveSpeed * e;
this.bgNode.width -= this.moveSpeed * e * 2;
this.redLightNode.width -= this.moveSpeed * e * 2;
this.redBgNode.width -= this.moveSpeed * e * 2;
}
});
cc._RF.pop();
}, {
EntityBase: "EntityBase"
} ],
EntityWorld: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "6eb3bnR4tBC2r2csWji7rUV", "EntityWorld");
var n = e("Tools"), a = e("GameData"), o = e("ConfigData"), s = e("PlayerData"), r = e("CollisionEventManager"), c = e("Types").KnifeState, l = e("Types").NoticeType, h = e("Types").SoundID, d = e("AudioEngine"), u = e("PlatformMgr"), f = (e("Types").TaskType, 
e("Types").ItemType), p = e("AdvertMgr"), m = e("AddEntitySystem"), g = e("Types").StageType, y = e("Types").CustomFunnelEvent;
cc.Class({
extends: cc.Component,
properties: {
followCameraCtrl: cc.Node,
mapWidth: 0,
mapHeight: 0,
localPlayer: null,
players: [],
knifes: [],
walls: [],
addEntityNode: cc.Node,
UIMgrNode: cc.Node,
audioNode: cc.Node,
poolMgr: cc.Node,
tempNode: cc.Node,
addBuffTime: 0,
addBuffTimeLimit: 0,
addBoxTime: 0,
addBoxTimeLimit: 0,
guideWall: cc.Node,
isDoHeartbeat: !0,
_heartbeatSendTimestamp: 0,
heartbeatInterval: 3e4,
m_alreadyStart: !1
},
onLoad: function() {
var e = this;
p.instance.destoryBanner();
this.isLoading = !0;
this.showGuideFlag = !0;
s.instance.checkDaySpan();
s.instance.initConfigData();
this.isGuide = s.instance.isGuide;
this.m_alreadyStart = !1;
u.hawkeye_getConfig(function(e) {
var t = e || {};
a.instance.isInReview = u.isIosApp() ? Number.parseInt(t.reviewVersion) === a.instance.clientVersionCode : Number.parseInt(t.reviewVersionAndroid) === a.instance.clientVersionCode;
void 0 !== t.revive_Ways && (o.instance.clientData.reviveWays = n.jsonToArray(t.revive_Ways));
void 0 !== t.multipGold_Ways && (o.instance.clientData.multipGoldWays = n.jsonToArray(t.multipGold_Ways));
void 0 !== t.protectStar_Ways && (o.instance.clientData.protectStarWays = n.jsonToArray(t.protectStar_Ways));
if (void 0 !== t.growLevelUp_Ways) for (var i = n.jsonToArray(t.growLevelUp_Ways), r = 0; r < i.length; r++) {
var c = i[r];
o.instance.clientData.growLevelUpWays[r] = n.splitToNumList(c, "-");
}
void 0 !== t.adverTrySkinLimit && (o.instance.clientData.adverTrySkinLimit = n.jsonToArray(t.adverTrySkinLimit));
void 0 !== t.adverReviveLimit && (o.instance.clientData.adverReviveLimit = n.jsonToArray(t.adverReviveLimit));
void 0 !== t.stopAdverToShare && (o.instance.clientData.stopAdverToShare = Number.parseInt(t.stopAdverToShare));
void 0 !== t.multipGoldLimit && (o.instance.clientData.multipGoldLimit = n.jsonToArray(t.multipGoldLimit));
void 0 !== t.frenzyLimit && (o.instance.clientData.frenzyLimit = Number.parseInt(t.frenzyLimit));
void 0 !== t.stagePrecents && (o.instance.clientData.stagePrecents = n.jsonToArray(t.stagePrecents));
void 0 !== t.dayShowWayLimit && (o.instance.clientData.dayShowWayLimit = n.jsonToArray(t.dayShowWayLimit));
void 0 !== t.share_random && (t.share_random = n.jsonToArray(t.share_random));
void 0 !== t.share_data && (t.share_data = n.jsonToArray(t.share_data));
if (void 0 !== t.dayMultAgainCDCount) {
o.instance.clientData.dayMultAgainCDCount = Number.parseInt(t.dayMultAgainCDCount);
if (s.instance.updateDayMultAgainCDCountFlag) {
s.instance.updateDayMultAgainCDCountFlag = !1;
s.instance.resetDayMultAgainCDCount(o.instance.clientData.dayMultAgainCDCount);
}
}
void 0 !== t.dayMultAgainMinPlayCount && (o.instance.clientData.dayMultAgainMinPlayCount = Number.parseInt(t.dayMultAgainMinPlayCount));
void 0 !== t.adverReviveFailToShare && (o.instance.clientData.adverReviveFailToShare = Number.parseInt(t.adverReviveFailToShare));
void 0 !== t.hideTrySkin && (o.instance.clientData.hideTrySkin = Number.parseInt(t.hideTrySkin));
void 0 !== t.hideAddTop && (o.instance.clientData.hideAddTop = Number.parseInt(t.hideAddTop));
var l = !0;
void 0 !== t.hideSpecialSkin && (l = Number.parseInt(t.hideSpecialSkin));
void 0 !== t.judgeArea && (o.instance.clientData.judgeArea = Number.parseInt(t.judgeArea));
void 0 !== t.judgeAreaTimeInterval && (o.instance.clientData.judgeAreaTimeInterval = t.judgeAreaTimeInterval);
var h = n.splitToNumList(o.instance.clientData.judgeAreaTimeInterval), d = s.instance.getCurWeekDay();
if (a.instance.isShowLog()) {
console.log("————————地域判断时间段配置：", JSON.stringify(h));
console.log("————————当前周几：", d);
}
o.instance.clientData.judgeArea && a.instance.isEnvironmentPublish() && n.arrContains(h, d) && !l ? u.getAreaInfo(function(e) {
if (e.city) switch (e.city) {
case "北京市":
case "上海市":
case "广州市":
case "深圳市":
l = !0;
} else if (e.province) switch (e.province) {
case "北京市":
case "上海市":
case "广东省":
l = !0;
}
o.instance.clientData.hideSpecialSkin = l;
}) : o.instance.clientData.hideSpecialSkin = l;
if (void 0 !== t.shareScoreConfig) {
i = n.splitToNumList(t.shareScoreConfig);
a.instance.isShowLog() && console.log("————————分享积分配置：", JSON.stringify(i));
o.instance.clientData.defaultShareScore = i[0];
o.instance.clientData.secondDayMinShareScore = i[1];
o.instance.clientData.maxShareScore = i[2];
}
s.instance.dayRefreshShareScore || u.getShareScore(function(e) {
var t = o.instance.clientData.defaultShareScore, i = o.instance.clientData.secondDayMinShareScore, n = o.instance.clientData.maxShareScore;
if (s.instance.isFirstDay()) {
e = t;
a.instance.isShowLog() && console.log("————————新玩家，初始分享积分：", e);
} else if (e < i && s.instance.isSecondDay()) {
e = i;
a.instance.isShowLog() && console.log("————————新玩家第二天，启用保底分享积分：", e);
} else {
e = Math.min(e, n);
a.instance.isShowLog() && console.log("————————使用上一天分享积分：", e);
}
s.instance.updateDayRefreshShareScore(e);
});
});
this.mapWidth = a.instance.mapWidth;
this.mapHeight = a.instance.mapHeight;
this.initMapParam();
this.gameTime = a.instance.gameTime;
this.width = a.instance.screenWidth;
this.height = a.instance.screenHeight;
this.worldRect = new cc.rect(-this.width / 2, -this.height / 2, this.width, this.height);
var t = this.poolMgr.getComponent("PoolMgr");
t.cleanUp();
t.init();
this.addEntitySys = n.getOrAddComponent(this.addEntityNode, "AddEntitySystem");
this.addEntitySys.cleanUp();
this.addEntitySys.init(this.mapWidth, this.mapHeight, t, this.mapType);
m.init(this.addEntitySys);
this.cleanUp();
this.uiMgr = n.getOrAddComponent(this.UIMgrNode, "UIMgr");
this.uiMgr.init(this);
this.uiMgr.cleanUp();
p.instance.setUiMgr(this.uiMgr);
u.getInviteInfo(function(t) {
s.instance.inviteDatas = t;
e.uiMgr.refreshRedDot();
});
this.taskMgr = n.getOrAddComponent(this.node, "TaskMgr");
this.taskMgr.init(this);
n.getOrAddComponent(this.audioNode, "AudioEngine").init();
this.addEntitySys.addMap(this.mapType, this.mapWidth, this.mapHeight);
this.localPlayer = this.addEntitySys.AddLocalPlayer();
this.players[0] = this.localPlayer;
this.uiMgr.addPlayerRankItem(this.localPlayer);
this.localPlayer.setKillCallback(function() {
s.instance.killCount++;
e.taskMgr.refreshTaskInGame();
});
this.localPlayer.setChangeKnifeCountCallback(function(t) {
e.addLocalPlayerKnifes(t);
});
this.curEquipHeroSkin = null;
this.curEquipKnifeSkin = null;
this.cameraZoomCtrl = this.followCameraCtrl.getComponent("CameraZoomCtrl");
this.cameraZoomCtrl.cleanUp();
this.followCameraCtrl.getComponent("FollowCameraCtrl").cleanUp();
r.getInstance().init();
this.heroCollisionHandleSystem = n.getOrAddComponent(this.node, "HeroCollisionHandleSystem");
this.knifeCollisionHandleSystem = n.getOrAddComponent(this.node, "KnifeCollisionHandleSystem");
this.pickKnifeCollisionHandleSystem = n.getOrAddComponent(this.node, "PickKnifeCollisionHandleSystem");
this.pickBuffCollisionHandleSystem = n.getOrAddComponent(this.node, "PickBuffCollisionHandleSystem");
this.attackBoxCollisionHandleSystem = n.getOrAddComponent(this.node, "AttackBoxCollisionHandleSystem");
this.killMsgListener = n.getOrAddComponent(this.node, "KillMsgListener");
this.killMsgListener.cleanUp();
n.getOrAddComponent(this.node, "CameraZoomSystem").init(this.localPlayer, this.cameraZoomCtrl);
this.playerRankSystem = n.getOrAddComponent(this.node, "PlayerRankSystem");
this.playerRankSystem.cleanUp();
this.gameRuleSystem = n.getOrAddComponent(this.node, "GameRuleSystem");
this.gameRuleSystem.cleanUp();
this.heroReviveSystem = n.getOrAddComponent(this.node, "HeroReviveSystem");
this.heroReviveSystem.cleanUp();
this.playerDistanceSystem = n.getOrAddComponent(this.node, "PlayerDistanceSystem");
this.playerDistanceSystem.cleanUp();
this.wallRuleSystem = n.getOrAddComponent(this.node, "WallRuleSystem");
this.node.on("throwKnife", this.throwKnife, this);
this.node.on("dodgeKnife", this.dodgeKnife, this);
this.node.on("destroyDefenceKnife", this.destroyDefenceKnife, this);
this.node.on("onBoxDestroy", this.onBoxDestroy, this);
this.node.on("onNeZhaAttack", this.onNeZhaAttack, this);
this.checkEnemyTime = 0;
this.checkKnifeTime = 0;
this.checkBlockTime = 0;
this.checkDefenceTime = 0;
this.addKnifeTime = 0;
a.instance.logUseTime("entityWorld.onload");
s.instance.isFristGame() && u.notifyFunnelEvent(y.World_Init);
this.isGuide ? this.guideLoad() : this.normalLoad();
this.startLoadPrefab();
s.instance.isFristGame() ? this.onStartBtnClick(null, null) : this.refreshPanel();
},
cleanUp: function() {
this.players = [];
this.knifes = [];
this.removeKnifes = [];
this.walls = [];
},
guideLoad: function() {
var e = this.addEntitySys.AddRemotePlayer(3, 1, 1, 1), t = 1, i = null, a = null, o = !0, r = !1, c = void 0;
try {
for (var l, h = e[Symbol.iterator](); !(o = (l = h.next()).done); o = !0) {
i = l.value;
this.players[t] = i;
i.node.active = !1;
i.followPlayer.node.active = !1;
t++;
}
} catch (e) {
r = !0;
c = e;
} finally {
try {
!o && h.return && h.return();
} finally {
if (r) throw c;
}
}
t = 0;
var d = s.instance.knifeSkin.initKnifeCount;
this.localPlayerKnifes = this.addEntitySys.AddKnife(d, !0);
var u = !0, f = !1, p = void 0;
try {
for (var m, g = this.localPlayerKnifes[Symbol.iterator](); !(u = (m = g.next()).done); u = !0) {
a = m.value;
this.knifes[t] = a;
n.getOrAddComponent(a.node, "KnifeInit").init(this.localPlayer);
t++;
0;
}
} catch (e) {
f = !0;
p = e;
} finally {
try {
!u && g.return && g.return();
} finally {
if (f) throw p;
}
}
var y = null, v = (d = 2, !0), k = !1, C = void 0;
try {
for (var S, w = e[Symbol.iterator](); !(v = (S = w.next()).done); v = !0) {
i = S.value;
y = this.addEntitySys.AddKnife(d, !0);
d = 20;
var T = !0, N = !1, _ = void 0;
try {
for (var b, R = y[Symbol.iterator](); !(T = (b = R.next()).done); T = !0) {
a = b.value;
this.knifes[t] = a;
n.getOrAddComponent(a.node, "KnifeInit").init(i);
t++;
0;
}
} catch (e) {
N = !0;
_ = e;
} finally {
try {
!T && R.return && R.return();
} finally {
if (N) throw _;
}
}
}
} catch (e) {
k = !0;
C = e;
} finally {
try {
!v && w.return && w.return();
} finally {
if (k) throw C;
}
}
this.closeKnifes = [];
this.landKnifes = this.addEntitySys.AddKnife(10, !0);
var P = !0, D = !1, L = void 0;
try {
for (var I, A = this.landKnifes[Symbol.iterator](); !(P = (I = A.next()).done); P = !0) {
a = I.value;
this.knifes[t] = a;
a.node.active = !1;
t++;
0;
}
} catch (e) {
D = !0;
L = e;
} finally {
try {
!P && A.return && A.return();
} finally {
if (D) throw L;
}
}
this.guideSystem = n.getOrAddComponent(this.node, "GuideSystem");
this.guideSystem.init(this);
this.isLoading = !1;
},
normalLoad: function() {
var e = this;
a.instance.logUseTime("start world load");
var t = s.instance.rankData;
a.instance.isShowLog() && console.log("level:" + t.name + " playerCount: " + t.playerCount);
var i = this.addEntitySys.AddRemotePlayer(t.playerCount - 1, t.aiSkinMax, t.aiHeroSkinRandomCount, t.aiHeroSkinMax), o = 1, r = null, c = null, l = 60, h = !0, d = !1, f = void 0;
try {
for (var p, m = i[Symbol.iterator](); !(h = (p = m.next()).done); h = !0) {
r = p.value;
this.players[o] = r;
this.uiMgr.addPlayerRankItem(r);
this.uiMgr.addHeroPosArr(this.localPlayer, r, this.cameraZoomCtrl.camera);
r.setDeadCallback(function(t) {
e.addDeadKnifes(t);
});
o++;
}
} catch (e) {
d = !0;
f = e;
} finally {
try {
!h && m.return && m.return();
} finally {
if (d) throw f;
}
}
o = 0;
var g = s.instance.knifeSkin.initKnifeCount + s.instance.extraKnifeCount;
this.localPlayerKnifes = this.addEntitySys.AddKnife(g);
var v = !0, k = !1, C = void 0;
try {
for (var S, w = this.localPlayerKnifes[Symbol.iterator](); !(v = (S = w.next()).done); v = !0) {
c = S.value;
this.knifes[o] = c;
n.getOrAddComponent(c.node, "KnifeInit").init(this.localPlayer);
o++;
l--;
}
} catch (e) {
k = !0;
C = e;
} finally {
try {
!v && w.return && w.return();
} finally {
if (k) throw C;
}
}
var T = null, N = !0, _ = !1, b = void 0;
try {
for (var R, P = i[Symbol.iterator](); !(N = (R = P.next()).done); N = !0) {
g = (r = R.value).skin.initKnifeCount;
T = this.addEntitySys.AddKnife(g);
var D = !0, L = !1, I = void 0;
try {
for (var A, M = T[Symbol.iterator](); !(D = (A = M.next()).done); D = !0) {
c = A.value;
this.knifes[o] = c;
n.getOrAddComponent(c.node, "KnifeInit").init(r);
o++;
l--;
}
} catch (e) {
L = !0;
I = e;
} finally {
try {
!D && M.return && M.return();
} finally {
if (L) throw I;
}
}
}
} catch (e) {
_ = !0;
b = e;
} finally {
try {
!N && P.return && P.return();
} finally {
if (_) throw b;
}
}
this.closeKnifes = [];
this.landKnifes = this.addEntitySys.AddKnife(l);
var B = !0, x = !1, E = void 0;
try {
for (var F, K = this.landKnifes[Symbol.iterator](); !(B = (F = K.next()).done); B = !0) {
c = F.value;
this.knifes[o] = c;
c.node.active = !1;
o++;
l--;
}
} catch (e) {
x = !0;
E = e;
} finally {
try {
!B && K.return && K.return();
} finally {
if (x) throw E;
}
}
this.walls = this.addEntitySys.AddWall(this.mapType);
this.blocks = this.addEntitySys.AddBlock(t.blockNum);
this.initAddBuffParam();
this.initAddBoxParam();
a.instance.logUseTime("end world load");
s.instance.isFristGame() && u.notifyFunnelEvent(y.World_Finish);
u.reportAnalytics();
this.isLoading = !1;
this.touchStartGame && this.onStartBtnClick(null, null);
},
refreshPanel: function() {
var e = this, t = s.instance.oldRankData, i = s.instance.rankData, n = s.instance.daySign, r = s.instance.showPanelSignFlag, c = t && i && t.id < i.id, l = (s.instance.offlineFlag, 
s.instance.getReceiveOfflineGoldTime(), o.instance.clientData.offlineGoldMultipLimit, 
o.instance.getCurStage(s.instance.playCount, o.instance.clientData.multipGoldLimit)), h = o.instance.clientData.hideAddTop, d = s.instance.hasRepay, f = null;
d || (f = o.instance.getRepayDataByRank(s.instance.rankData.id)).reward || s.instance.updateRepay();
var p = function(t) {
e.uiMgr.showPanelBuySkin(t);
}, m = function(t) {
e.uiMgr.showPanelSign(t);
}, y = function(t) {
e.taskMgr.refreshTaskInHome(t);
}, v = function(t) {
e.uiMgr.showPanelRepay(t);
}, k = function(t) {
e.uiMgr.showUnlockGrow(t);
}, C = function(t) {
e.uiMgr.showPanelAddTop(t);
s.instance.updateDayShowTop();
}, S = function(t) {
e.uiMgr.showPanelDailyTask(t);
}, w = function(t) {
e.uiMgr.showPanelEvaulate(t);
}, T = function() {
e.uiMgr.showWatchAdverCount();
}, N = function() {
s.instance.canShowPanelEvaulate() ? w(T) : T();
}, _ = function() {
s.instance.canShowPanelBuySkin() ? p(N) : N();
}, b = function() {
_();
}, R = function() {
b();
}, P = function() {
R();
}, D = function() {
if (n || r || l === g.Share || !s.instance.canShowPanelSign()) P(); else {
m(P);
s.instance.showPanelSignFlag = !0;
}
}, L = function() {
a.instance.isInReview || o.instance.clientData.hideSpecialSkin || !s.instance.canShowPanelDailyTask() ? D() : S(D);
}, I = function() {
h || !s.instance.canShowPanelAddTop() || a.instance.isInReview || u.isIOS() ? L() : C(L);
}, A = function() {
k(I);
}, M = function() {
!d && f && f.reward ? v(A) : A();
}, B = function() {
M();
}, x = function() {
y(B);
}, E = function() {
x();
}, F = function() {
E();
};
c ? function(t) {
e.uiMgr.showPanelLevelUp(t);
s.instance.oldRankData = null;
}(F) : F();
},
startLoadPrefab: function() {
this.uiMgr.startLoadPrefab();
},
onStartBtnClick: function(e, t) {
var i = this;
t && "1" == t && p.instance.fireBaseEvent("game_start");
var r = this;
if (this.isLoading) this.touchStartGame = !0; else if (!this.m_alreadyStart) {
this.m_alreadyStart = !0;
this.uiMgr.hideUserInfoBtn();
s.instance.isSecGame() && u.notifyFunnelEvent(y.GameTwo);
p.instance.destoryBanner();
var c = s.instance.playCount;
0 !== c && c <= o.instance.clientData.bornFrenzyLimit && (r.localPlayer.canAddBornFrenzy = !0);
this.isGuide && this.onStart();
if (0 !== s.instance.dayPlayCount) {
if (o.instance.getCurStage(s.instance.playCount, o.instance.clientData.adverReviveLimit) !== g.Free) {
var l = o.instance.clientData, h = s.instance.getTrySkinData();
if (!l.hideTrySkin && !a.instance.isInReview && s.instance.playCount >= l.trySkinMinPlayCount) {
var d = s.instance.dayPlayCount, m = n.getItemOrFinalItem(l.trySkinTimeInterval, h.trySkinCount), v = d - h.lastTryPlayCount >= m, k = !1;
s.instance.continuityLoseCount >= 2 && (k = !0);
if (v || k) {
t = o.instance.getRandomTrySuitData(s.instance);
s.instance.updateContinuityLoseCount();
s.instance.setTrySkinData(h);
if (t) {
var C, S, w = r.localPlayer.node.parent, T = r.localPlayer.followPlayer.node.parent;
this.uiMgr.showPanelTrySuit(t, function(e, t) {
i.uiMgr.activeGoldNode(!1);
i.uiMgr.activeDiamondNode(!1);
C = e;
S = t;
s.instance.addExtraKnife(6);
r.onEquipHeroSkin(e, !1);
r.onEquipKnifeSkin(t, !1);
r.changeLocalKnifesCount(t.initKnifeCount);
var n = 0;
r.localPlayerKnifes.length > 20 ? n = 1 : r.localPlayerKnifes.length > 9 && (n = (r.localPlayerKnifes.length - 9) / 13);
r.localPlayer.followPlayer.node.group = "ui";
r.localPlayer.followPlayer.node.parent = i.tempNode;
r.localPlayer.followPlayer.followPlayerScale.changeScaleMultip(1 - .45 * n);
r.localPlayer.node.group = "ui";
r.localPlayer.node.parent = i.tempNode;
r.localPlayer.heroScale.changeScaleMultip(1 - .45 * n);
r.localPlayer.node.y += 130;
}, function(e) {
i.uiMgr.activeGoldNode(!0);
i.uiMgr.activeDiamondNode(!0);
if (e) {
r.onEquipHeroSkin(C, !1);
r.onEquipKnifeSkin(S, !1);
r.changeLocalKnifesCount(S.initKnifeCount);
r.uiMgr.showActiveSuitEffect();
} else {
s.instance.addExtraKnife(-6);
r.onEquipHeroSkin(s.instance.heroSkin, !0);
r.onEquipKnifeSkin(s.instance.knifeSkin, !0);
r.changeLocalKnifesCount(s.instance.knifeSkin.initKnifeCount);
}
r.localPlayer.node.group = "default";
r.localPlayer.node.parent = w;
r.localPlayer.heroScale.changeScaleMultip(1);
r.localPlayer.node.y = 0;
r.localPlayer.followPlayer.node.group = "heroWall";
r.localPlayer.followPlayer.node.parent = T;
r.localPlayer.followPlayer.followPlayerScale.changeScaleMultip(1);
r.onLoadMatch();
});
return !0;
}
}
}
if (!l.hideTrySkin && !a.instance.isInReview && s.instance.playCount >= l.trySkinMinPlayCount) {
d = s.instance.dayPlayCount, m = n.getItemOrFinalItem(l.trySkinTimeInterval, h.trySkinCount);
if (v = d - h.lastTryPlayCount >= m) {
t = {};
var N = !1;
if (h.lastTrySkinType === f.HERO_SKIN) {
t = o.instance.getRandomTryKnifeSkinData(s.instance.ownKnifeSkins, l.tryKnifeSkinMinQuality);
h.lastTrySkinType = f.KNIFE_SKIN;
N = !1;
} else {
t = o.instance.getRandomTryHeroSkinData(s.instance.ownHeroSkins, l.tryHeroSkinMinQuality);
h.lastTrySkinType = f.HERO_SKIN;
N = !0;
}
s.instance.setTrySkinData(h);
if (t) {
w = r.localPlayer.node.parent, T = r.localPlayer.followPlayer.node.parent;
this.uiMgr.showPanelTryOut(t, function() {
i.uiMgr.activeGoldNode(!1);
i.uiMgr.activeDiamondNode(!1);
s.instance.addExtraKnife(6);
if (N) {
r.onEquipHeroSkin(t, !1);
r.changeLocalKnifesCount(s.instance.knifeSkin.initKnifeCount);
} else r.onEquipKnifeSkin(t, !1);
var e = 0;
r.localPlayerKnifes.length > 20 ? e = 1 : r.localPlayerKnifes.length > 9 && (e = (r.localPlayerKnifes.length - 9) / 13);
r.localPlayer.followPlayer.node.group = "ui";
r.localPlayer.followPlayer.node.parent = i.tempNode;
r.localPlayer.followPlayer.followPlayerScale.changeScaleMultip(1 - .45 * e);
if (N) {
r.localPlayer.node.group = "ui";
r.localPlayer.node.parent = i.tempNode;
r.localPlayer.heroScale.changeScaleMultip(1 - .45 * e);
}
r.localPlayer.node.y += 130;
}, function(e) {
i.uiMgr.activeGoldNode(!0);
i.uiMgr.activeDiamondNode(!0);
if (e) {
if (N) {
r.onEquipHeroSkin(t, !1);
r.changeLocalKnifesCount(s.instance.knifeSkin.initKnifeCount);
} else r.onEquipKnifeSkin(t, !1);
var a = n.getStringByFormat(o.instance.getUITipStr(9), t.name);
r.uiMgr.showTips(a);
} else {
s.instance.addExtraKnife(-6);
if (N) {
r.onEquipHeroSkin(s.instance.heroSkin, !0);
r.changeLocalKnifesCount(s.instance.knifeSkin.initKnifeCount);
} else r.onEquipKnifeSkin(s.instance.knifeSkin, !0);
}
if (N) {
r.localPlayer.node.group = "default";
r.localPlayer.node.parent = w;
r.localPlayer.heroScale.changeScaleMultip(1);
}
r.localPlayer.node.y = 0;
r.localPlayer.followPlayer.node.group = "heroWall";
r.localPlayer.followPlayer.node.parent = T;
r.localPlayer.followPlayer.followPlayerScale.changeScaleMultip(1);
r.onLoadMatch();
});
return !0;
}
}
}
this.onLoadMatch();
} else this.onLoadMatch();
} else this.onLoadMatch();
}
},
onLoadMatch: function() {
s.instance.isFristGame() && u.notifyFunnelEvent(y.UI_Match);
var e = this;
this.uiMgr.showPanelMatch(this.players, function() {
e.onStart();
});
},
onStart: function() {
var e = this, t = this.followCameraCtrl.getComponent("FollowCameraCtrl");
t.init(this.localPlayer.node, new cc.Rect(-this.mapWidth / 2, -this.mapHeight / 2, this.mapWidth, this.mapHeight));
this.localPlayer.myCamera = t;
r.getInstance().clear();
this.uiMgr.closePanelMatch();
this.uiMgr.startGame();
this.uiMgr.startCountDown(a.instance.gameTime);
var i = !0, o = !1, c = void 0;
try {
for (var l, f = this.players[Symbol.iterator](); !(i = (l = f.next()).done); i = !0) {
var p = l.value;
p.startGame(this.isGuide);
p.setLocalHero(this.localPlayer);
}
} catch (e) {
o = !0;
c = e;
} finally {
try {
!i && f.return && f.return();
} finally {
if (o) throw c;
}
}
var m = !0, g = !1, v = void 0;
try {
for (var k, C = this.landKnifes[Symbol.iterator](); !(m = (k = C.next()).done); m = !0) {
k.value.node.active = !0;
}
} catch (e) {
g = !0;
v = e;
} finally {
try {
!m && C.return && C.return();
} finally {
if (g) throw v;
}
}
this.killMsgListener.init(this.players, this.uiMgr);
var S = this, w = function() {
S.localPlayer._defenceTips && (S.localPlayer._defenceTips.active = !1);
S.playerRankSystem.updateGameLogic();
var e = function() {
s.instance.showPanelBuySkinFlag = !0;
s.instance.isFristGame() && u.notifyFunnelEvent(y.GameOverPanel);
S.startGame = !1;
S.localPlayer.stopControl();
S.uiMgr.openGameOverPanel();
s.instance.onGameOver(S.localPlayer);
};
if (1 !== S.localPlayer.rank || S.localPlayer.beKilled()) e(); else {
setTimeout(function() {
S.uiMgr.showPanelVictory();
s.instance.isFristGame() && u.notifyFunnelEvent(y.First_Game_Finish);
}, 500);
setTimeout(function() {
e();
}, 2e3);
}
};
this.guideGameOverCallF = function() {
var t = 1, i = !0, n = !1, a = void 0;
try {
for (var o, s = e.players[Symbol.iterator](); !(i = (o = s.next()).done); i = !0) {
o.value.rank = t;
t++;
}
} catch (e) {
n = !0;
a = e;
} finally {
try {
!i && s.return && s.return();
} finally {
if (n) throw a;
}
}
w();
};
if (!this.isGuide) {
this.playerRankSystem.init(this.players, this.localPlayer);
this.gameRuleSystem.init(w, this.localPlayer, this.players, a.instance.gameTime, function() {
S.uiMgr.openRevivePanel(function(t, i) {
if (t) {
var a = S.knifes.length, o = s.instance.knifeSkin.initKnifeCount, r = S.addEntitySys.AddKnife(o), c = !0, l = !1, h = void 0;
try {
for (var d, u = r[Symbol.iterator](); !(c = (d = u.next()).done); c = !0) {
var f = d.value;
e.knifes[a] = f;
n.getOrAddComponent(f.node, "KnifeInit").init(S.localPlayer);
a++;
}
} catch (e) {
l = !0;
h = e;
} finally {
try {
!c && u.return && u.return();
} finally {
if (l) throw h;
}
}
S.localPlayer.revive(i);
S.gameRuleSystem.onContinue();
S.uiMgr.showReviveNotice(S.localPlayer);
} else {
S.localPlayer.waitToDie = !1;
S.localPlayer.die(null, !0);
}
}, S.localPlayer.reviveCount);
});
this.heroReviveSystem.init(this.players, function(t, i) {
if (i) {
var a = S.knifes.length, o = t.skin.initKnifeCount, s = S.addEntitySys.AddKnife(o), r = !0, c = !1, l = void 0;
try {
for (var h, d = s[Symbol.iterator](); !(r = (h = d.next()).done); r = !0) {
var u = h.value;
e.knifes[a] = u;
n.getOrAddComponent(u.node, "KnifeInit").init(t);
a++;
}
} catch (e) {
c = !0;
l = e;
} finally {
try {
!r && d.return && d.return();
} finally {
if (c) throw l;
}
}
t.revive();
S.uiMgr.showReviveNotice(t);
} else {
t.waitToDie = !1;
t.die(null, !0);
}
}, function(e) {
S.rebornEffect(e);
});
this.playerDistanceSystem.init(this.players, this.localPlayer, this.blocks, this.knifes);
this.wallRuleSystem.init(this);
}
s.instance.onStartGame();
d.instance.playSound(h.Start);
this.startGame = !0;
s.instance.isFristGame() && u.notifyFunnelEvent(y.First_Game_Start);
},
update: function(e) {
this._removeEntity(e);
this._updateGameLogic(e);
this._updateHideNameLogic(e);
if (!this.isGuide) {
this._updateNoticeLogic(e);
this._updateAddKnifeLogic(e);
this._updateShowTaskLogic(e);
this._updateAddBuffLogic(e);
this._updateAddBoxLogic(e);
this._updateGuideNoticeLogic(e);
}
this._checkUpdateUserData(e);
this._reportHeart(e);
},
_removeEntity: function(e) {
if (this.removeKnifes && this.removeKnifes.length > 0) {
var t = !0, i = !1, n = void 0;
try {
for (var a, o = this.removeKnifes[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
var s = a.value, r = this.knifes.indexOf(s);
-1 !== r && this.knifes.splice(r, 1);
}
} catch (e) {
i = !0;
n = e;
} finally {
try {
!t && o.return && o.return();
} finally {
if (i) throw n;
}
}
this.removeKnifes = [];
}
},
_updateGameLogic: function(e) {
if (this.startGame) {
if (this.isGuide) this.guideSystem.updateGameLogic(e); else {
this.gameRuleSystem.updateGameLogic(e);
this.heroReviveSystem.updateGameLogic(e);
this.wallRuleSystem.updateGameLogic(e);
this.playerDistanceSystem.updateGameLogic(e);
this.playerRankSystem.updateGameLogic(e);
}
this.pickKnifeCollisionHandleSystem.updateGameLogic(e);
this.pickBuffCollisionHandleSystem.updateGameLogic(e);
this.heroCollisionHandleSystem.updateGameLogic(e);
this.knifeCollisionHandleSystem.updateGameLogic(e);
this.attackBoxCollisionHandleSystem.updateGameLogic(e);
}
var t = !0, i = !1, n = void 0;
try {
for (var a, o = this.players[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
var s = a.value;
s.updateGameLogic(e, this);
s.myGuideComp.updateGameLogic(e);
}
} catch (e) {
i = !0;
n = e;
} finally {
try {
!t && o.return && o.return();
} finally {
if (i) throw n;
}
}
var r = !0, c = !1, l = void 0;
try {
for (var h, d = this.knifes[Symbol.iterator](); !(r = (h = d.next()).done); r = !0) {
var u = h.value;
u.updateGameLogic(e);
u.shouldRemove && this.removeKnifes.push(u);
}
} catch (e) {
c = !0;
l = e;
} finally {
try {
!r && d.return && d.return();
} finally {
if (c) throw l;
}
}
this.startGame;
this.addEntitySys.AddTempKnife();
},
_updateNoticeLogic: function(e) {
if (this.startGame) {
this.gameTime -= e;
if (this.gameTime <= 31 && !this.flag_30) {
this.uiMgr.showImportantNotice(l.Time_30);
this.flag_30 = !0;
}
if (this.gameTime <= 11 && !this.flag_10) {
this.uiMgr.showImportantNotice(l.Time_10);
this.flag_10 = !0;
}
if (this.gameTime <= 4 && !this.flag_3) {
this.uiMgr.showCountDownNode();
this.flag_3 = !0;
}
if (this.startGame) {
this.checkEnemyTime += e;
this.checkKnifeTime += e;
this.checkBlockTime += e;
this.checkDefenceTime += e;
if (this.checkEnemyTime > 20) {
var t = !0, i = !1, a = void 0;
try {
for (var o, s = this.players[Symbol.iterator](); !(t = (o = s.next()).done); t = !0) {
var r = o.value;
if (r !== this.localPlayer && (!r.isDead && r.isInView)) {
this.checkEnemyTime = 0;
this.uiMgr.addSpecialNotice(l.Enemy);
}
}
} catch (e) {
i = !0;
a = e;
} finally {
try {
!t && s.return && s.return();
} finally {
if (i) throw a;
}
}
}
if (this.checkKnifeTime > 20) {
var h = !0, d = !1, u = void 0;
try {
for (var f, p = this.knifes[Symbol.iterator](); !(h = (f = p.next()).done); h = !0) {
var m = f.value;
if (n.isInMyView(this.localPlayer, m, this.worldRect, this.width, this.height, this.cameraZoomCtrl.camera) && m.knifeStateComp.state === c.Normal) {
this.checkKnifeTime = 0;
this.uiMgr.addSpecialNotice(l.Knife);
}
}
} catch (e) {
d = !0;
u = e;
} finally {
try {
!h && p.return && p.return();
} finally {
if (d) throw u;
}
}
}
if (this.checkBlockTime > 20) {
var g = !0, y = !1, v = void 0;
try {
for (var k, C = this.blocks[Symbol.iterator](); !(g = (k = C.next()).done); g = !0) {
var S = k.value;
if (n.isInMyView(this.localPlayer, S, this.worldRect, this.width, this.height, this.cameraZoomCtrl.camera)) {
this.checkBlockTime = 0;
this.uiMgr.addSpecialNotice(l.Block);
}
}
} catch (e) {
y = !0;
v = e;
} finally {
try {
!g && C.return && C.return();
} finally {
if (y) throw v;
}
}
}
if (this.checkDefenceTime > 20 && this.localPlayer.isDefence) {
this.checkDefenceTime = 0;
this.uiMgr.addSpecialNotice(l.Defence);
}
}
}
},
_updateAddKnifeLogic: function(e) {
if (this.startGame) {
this.addKnifeTime += e;
if (this.addKnifeTime >= s.instance.rankData.addKnifeInterval) {
this.addKnifeTime = 0;
var t = this.addEntitySys.AddKnife(1), i = this.knifes.length, n = !0, a = !1, o = void 0;
try {
for (var r, c = t[Symbol.iterator](); !(n = (r = c.next()).done); n = !0) {
var l = r.value;
this.knifes[i] = l;
i++;
}
} catch (e) {
a = !0;
o = e;
} finally {
try {
!n && c.return && c.return();
} finally {
if (a) throw o;
}
}
}
}
},
_updateHideNameLogic: function(e) {
var t = !0, i = !1, a = void 0;
try {
for (var o, s = this.players[Symbol.iterator](); !(t = (o = s.next()).done); t = !0) {
var r = o.value;
r !== this.localPlayer && (r.isDead || (n.isInMyView(this.localPlayer, r, this.worldRect, this.width, this.height, this.cameraZoomCtrl.camera, !0) ? r.setInView(!0) : r.setInView(!1)));
}
} catch (e) {
i = !0;
a = e;
} finally {
try {
!t && s.return && s.return();
} finally {
if (i) throw a;
}
}
},
_updateShowTaskLogic: function(e) {
var t = this;
if (!this.isShowTask && this.taskMgr.showList[0]) {
this.isShowTask = !0;
var i = this;
this.uiMgr.showTaskNotice(this.taskMgr.showList[0], function() {
t.taskMgr.showList.splice(0, 1);
i.isShowTask = !1;
});
}
},
_updateAddBuffLogic: function(e) {
if (this.startGame && this.canAddBuff) {
this.addBuffTime += e;
if (this.addBuffTime > this.addBuffTimeLimit) {
var t = this.addEntitySys.AddBuff(1, this.addBuffId);
t[0].node.position = this.getRandomPosNearLocalPlayer(t[0].node, this.localPlayer.node, this.cameraZoomCtrl.camera);
t[0].node.scale = 0;
var i = cc.scaleTo(.2, 1).easing(cc.easeBackOut(3));
t[0].node.runAction(i);
this.initAddBuffParam();
}
}
},
_updateAddBoxLogic: function(e) {
if (this.startGame && this.canAddBox) {
this.addBoxTime += e;
if (this.addBoxTime > this.addBoxTimeLimit) {
var t = this.addEntitySys.AddBox(1, this.addBoxId);
t[0].node.position = this.getRandomPosNearLocalPlayer(t[0].node, this.localPlayer.node, this.cameraZoomCtrl.camera);
t[0].node.scale = 0;
var i = cc.scaleTo(.2, 1).easing(cc.easeBackOut(3));
t[0].node.runAction(i);
this.initAddBoxParam();
}
}
},
_updatePowerArrowLogic: function(e) {
var t = !0, i = !1, n = void 0;
try {
for (var a, o = this.players[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
var s = a.value;
s !== this.localPlayer && (s.isInView && !s.isDead ? s.refreshPowerArrow(this.localPlayer) : s.closePowerArrow());
}
} catch (e) {
i = !0;
n = e;
} finally {
try {
!t && o.return && o.return();
} finally {
if (i) throw n;
}
}
},
_updateGuideNoticeLogic: function(e) {
if (this.startGame) {
if (this.localPlayer.followPlayer.knivesCmp.knives.length <= 10) this.localPlayer.showTips(0); else if (this.localPlayer.isDefence) {
this.localPlayer.showTips(2);
this.showGuideFlag = !1;
} else this.showGuideFlag ? this.localPlayer.showTips(1) : this.localPlayer.closeTips();
}
},
initMapParam: function() {
this.mapType = 0;
this.mapId = 0;
if (0 !== s.instance.playCount) if (s.instance.newMap) {
this.mapType = s.instance.newMap;
s.instance.newMap = 0;
} else {
var e = [], t = o.instance.mapDatas, i = s.instance.rankData.mapPool;
if (i) {
var r = !0, c = !1, l = void 0;
try {
for (var h, d = i[Symbol.iterator](); !(r = (h = d.next()).done); r = !0) {
var u = h.value;
e.push(t[u]);
}
} catch (e) {
c = !0;
l = e;
} finally {
try {
!r && d.return && d.return();
} finally {
if (c) throw l;
}
}
var f = n.getRandomItemByWeight(e);
if (f) {
this.mapType = f.id;
this.mapWidth = f.width;
this.mapHeight = f.height;
}
a.instance.isShowLog();
}
}
},
initAddBuffParam: function() {
var e = [], t = o.instance.buffDatas, i = s.instance.rankData.buffPool;
if (i) {
this.canAddBuff = !0;
var r = !0, c = !1, l = void 0;
try {
for (var h, d = i[Symbol.iterator](); !(r = (h = d.next()).done); r = !0) {
var u = h.value;
e.push(t[u]);
}
} catch (e) {
c = !0;
l = e;
} finally {
try {
!r && d.return && d.return();
} finally {
if (c) throw l;
}
}
var f = n.getRandomItemByWeight(e);
if (f) {
this.addBuffId = f.id;
this.addBuffTime = 0;
this.addBuffTimeLimit = n.getRandomInt(f.refreshTime[0], f.refreshTime[1]);
}
if (a.instance.isShowLog()) {
console.log(e);
console.log("随机buff：", f.name, "刷新时间:", this.addBuffTimeLimit);
}
} else this.canAddBuff = !1;
},
initAddBoxParam: function() {
var e = [], t = o.instance.boxDatas, i = s.instance.rankData.boxPool;
this.canAddBox = !0;
if (i) {
this.canAddBox = !0;
var r = !0, c = !1, l = void 0;
try {
for (var h, d = i[Symbol.iterator](); !(r = (h = d.next()).done); r = !0) {
var u = h.value;
e.push(t[u]);
}
} catch (e) {
c = !0;
l = e;
} finally {
try {
!r && d.return && d.return();
} finally {
if (c) throw l;
}
}
var f = n.getRandomItemByWeight(e);
if (f) {
this.addBoxId = f.id;
this.addBoxTime = 0;
this.addBoxTimeLimit = n.getRandomInt(f.refreshTime[0], f.refreshTime[1]);
}
if (a.instance.isShowLog()) {
console.log(e);
console.log("随机box：", f.name, "刷新时间:", this.addBoxTimeLimit);
}
} else this.canAddBox = !1;
},
restartGame: function() {
r.getInstance().clear();
d.instance.stopAllSound();
var e = cc.director.getCollisionManager();
e._contacts = [];
e._colliders = [];
this.uiMgr.closeGameOverPanel();
this.uiMgr.openPanelKeyCount(!1);
s.instance.isSecGame() && u.notifyFunnelEvent(y.BackToHome);
this.onLoad();
},
gameOver: function() {},
posInMyView: function(e) {
var t = this.localPlayer.node.convertToNodeSpaceAR(e), i = this.width * this.cameraZoomCtrl.camera.zoomRatio, n = this.height * this.cameraZoomCtrl.camera.zoomRatio;
return t.x <= i / 2 && t.x >= -i / 2 && t.y <= n / 2 && t.y >= -i / 2;
},
throwKnife: function(e) {
var t, i;
if (2 !== e.length) {
t = e.parent.convertToWorldSpaceAR(e.position);
i = 0;
} else {
var a = n.getCenterParam(e);
t = a[0];
i = a[1];
}
this.addEntitySys.addCollisionEffect(t, i);
},
dodgeKnife: function(e) {
var t = n.getCenterParam(e)[0];
if (this.posInMyView(t)) {
this.addEntitySys.addDodgeEffect(t).scale = this.localPlayer.node.scale;
}
},
destroyDefenceKnife: function(e) {
var t;
if (2 !== e.length) t = e.parent.convertToWorldSpaceAR(e.position); else {
t = n.getCenterParam(e)[0];
}
this.addEntitySys.addDestroyDefenceEffect(t).scale = this.localPlayer.node.scale;
},
onNeZhaAttack: function(e) {
var t = e.parent.convertToWorldSpaceAR(e.position);
this.addEntitySys.addNeZhaEffect(t);
},
reduceMapSize: function(e) {
this.mapWidth -= e;
this.mapHeight -= e;
this.addEntitySys.setMapSize(this.mapWidth, this.mapHeight);
var t = !0, i = !1, n = void 0;
try {
for (var a, o = this.players[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
var s = a.value;
s.refreshWalls(this.mapWidth, this.mapHeight);
s.node.emit("setMapSize", [ this.mapWidth, this.mapHeight ]);
}
} catch (e) {
i = !0;
n = e;
} finally {
try {
!t && o.return && o.return();
} finally {
if (i) throw n;
}
}
var r = !0, c = !1, l = void 0;
try {
for (var h, d = this.knifes[Symbol.iterator](); !(r = (h = d.next()).done); r = !0) {
h.value.refreshWalls(this.mapWidth, this.mapHeight);
}
} catch (e) {
c = !0;
l = e;
} finally {
try {
!r && d.return && d.return();
} finally {
if (c) throw l;
}
}
},
onEquipKnifeSkin: function(e, t) {
var i = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], n = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
t && s.instance.updateKnifeSkin(e, i);
n && this.changeLocalKnifesCount(e.initKnifeCount);
this.localPlayer.changeKnifeSkin(e);
this.localPlayer.followPlayer.getComponent("PlayerKnivesComponent").emitAllKnivesChangeSkin();
this.uiMgr.refreshProperty(e, !1);
},
onEquipHeroSkin: function(e, t) {
var i = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
t && s.instance.updateHeroSkin(e, i);
this.localPlayer.heroSkin = e;
this.localPlayer.changeSkin();
this.localPlayer.changeEffectColor();
this.refreshAIHeroSkin();
this.uiMgr.refreshProperty(e, !0);
},
addLocalPlayerKnifes: function(e) {
var t = this.addEntitySys.AddKnife(e), i = this.knifes.length, a = !0, o = !1, s = void 0;
try {
for (var r, c = t[Symbol.iterator](); !(a = (r = c.next()).done); a = !0) {
var l = r.value;
this.knifes[i] = l;
n.getOrAddComponent(l.node, "KnifeInit").init(this.localPlayer);
i++;
}
} catch (e) {
o = !0;
s = e;
} finally {
try {
!a && c.return && c.return();
} finally {
if (o) throw s;
}
}
},
changeLocalKnifesCount: function(e) {
e += s.instance.extraKnifeCount;
this._changeLocalKnifesCountReal(-this.localPlayerKnifes.length);
this._changeLocalKnifesCountReal(e);
},
_changeLocalKnifesCountReal: function(e) {
if (e > 0) {
var t = this.addEntitySys.AddKnife(e), i = this.knifes.length, a = !0, o = !1, s = void 0;
try {
for (var r, c = t[Symbol.iterator](); !(a = (r = c.next()).done); a = !0) {
var l = r.value;
this.knifes[i] = l;
this.localPlayerKnifes.push(l);
n.getOrAddComponent(l.node, "KnifeInit").init(this.localPlayer);
i++;
}
} catch (e) {
o = !0;
s = e;
} finally {
try {
!a && c.return && c.return();
} finally {
if (o) throw s;
}
}
} else if (e < 0) for (var h = (i = this.localPlayerKnifes.length) - 1; h >= i + e; h--) {
l = this.localPlayerKnifes[h];
this.localPlayerKnifes.splice(h, 1);
var d = this.knifes.indexOf(l);
-1 !== d && this.knifes.splice(d, 1);
l.node.getComponent("KnifeOwnerComponent").owner.emit("reduceKnife", l.node);
l.node.destroy();
}
},
refreshAIHeroSkin: function() {
var e = !0, t = !1, i = void 0;
try {
for (var n, a = this.players[Symbol.iterator](); !(e = (n = a.next()).done); e = !0) {
var o = n.value;
if (o !== this.localPlayer && (o.heroSkin && this.localPlayer.heroSkin && o.heroSkin.id === this.localPlayer.heroSkin.id)) {
o.heroSkin = null;
o.changeSkin();
o.changeEffectColor();
}
}
} catch (e) {
t = !0;
i = e;
} finally {
try {
!e && a.return && a.return();
} finally {
if (t) throw i;
}
}
},
getRandomPosNearLocalPlayer: function(e, t, i) {
var a = this.localPlayer.logicPlayer.radius * this.localPlayer.node.scale / 2, o = this.localPlayer.logicPlayer.radius * this.localPlayer.node.scale / 2, s = this.width / i.zoomRatio / 2, r = this.height / i.zoomRatio / 2, c = cc.v2(n.getPositiveOrNegative() * n.getRandomInt(a, s), n.getPositiveOrNegative() * n.getRandomInt(o, r)), l = t.position.add(c), h = t.parent.convertToWorldSpaceAR(l);
return e.parent.convertToNodeSpaceAR(h);
},
_checkUpdateUserData: function(e) {
s.instance.checkDelayUpdateData(e);
s.instance.updateUserData();
s.instance.updatePKRankTime += e;
s.instance.pkSurplusTime -= 1e3 * e;
},
addDeadKnifes: function(e) {
var t = 0, i = this, a = function() {
var a = e.add(cc.v2(n.getRandomInt(-200, 200), n.getRandomInt(-200, 200)));
setTimeout(function() {
i.addEntitySys.addShowKnifeEffect(a);
}, 50 * t);
};
for (t = 0; t < 6; t++) a();
},
rebornEffect: function(e) {
var t = e.node.parent.convertToWorldSpaceAR(e.node.position);
this.addEntitySys.addRebornEffect(t);
},
_reportHeart: function(e) {
var t = this;
if (this.isDoHeartbeat) {
var i = n.getMilliTime();
if (i - this._heartbeatSendTimestamp >= this.heartbeatInterval) {
this._heartbeatSendTimestamp = i;
u.hawkeye_report_heartbeat();
u.getInviteInfo(function(e) {
s.instance.inviteDatas = e;
t.uiMgr.refreshRedDot();
});
}
}
},
onBoxDestroy: function(e) {
e.node;
switch (e.data.id) {
case 0:
this.addBoxKnife(e);
break;

case 1:
e.isLocal && this.addBoxGold(e);
break;

case 2:
this.addBoxBuff(e);
}
},
addBoxKnife: function(e) {
var t = this, i = e.node, a = e.data, o = i.position, s = n.getRandomInt(a.param[0], a.param[1] + 1), r = this.addEntitySys.AddKnife(s), c = this.knifes.length, l = 0, h = this, d = function(e) {
t.knifes[c] = e;
var i = o.add(cc.v2(100 * Math.cos(l / s * 2 * Math.PI), 100 * Math.sin(l / s * 2 * Math.PI)));
e.node.position = i;
e.activeNode.opacity = 0;
e.knifeColliderNodeCtrl.attackCollider.notColliderFlag = !0;
var n = function() {
if (e) {
e.activeNode.opacity = 255;
setTimeout(function() {
e.knifeColliderNodeCtrl.attackCollider.notColliderFlag = !1;
}, 400);
}
};
setTimeout(function() {
h.addEntitySys.addShowKnifeEffect(i);
setTimeout(n, 300);
}, 50 * l);
l++;
c++;
}, u = !0, f = !1, p = void 0;
try {
for (var m, g = r[Symbol.iterator](); !(u = (m = g.next()).done); u = !0) {
d(m.value);
}
} catch (e) {
f = !0;
p = e;
} finally {
try {
!u && g.return && g.return();
} finally {
if (f) throw p;
}
}
},
addBoxGold: function(e) {
var t = e.node.position, i = e.data, a = n.getRandomInt(i.param[0], i.param[1] + 1);
s.instance.updateGold(a);
s.instance.showGold -= a;
t.sub(this.localPlayer.node.position).mul(this.cameraZoomCtrl.camera.zoomRatio);
this.uiMgr.showGetMoneyEffect({
count: 200,
isMore: !0,
isLucky: !1
}, cc.v2(0, -200), !0);
},
addBoxBuff: function(e) {
var t = [], i = s.instance.rankData.buffPool;
if (i) {
var a = !0, o = !1, r = void 0;
try {
for (var c, l = i[Symbol.iterator](); !(a = (c = l.next()).done); a = !0) {
var h = c.value;
t.push({
id: h,
weight: e.data.param[h]
});
}
} catch (e) {
o = !0;
r = e;
} finally {
try {
!a && l.return && l.return();
} finally {
if (o) throw r;
}
}
var d = n.getRandomItemByWeight(t);
if (d) {
var u = this.addEntitySys.AddBuff(1, d.id);
u[0].landNode.active = !1;
u[0].node.position = e.node.position.add(cc.v2(0, 50));
u[0].node.scale = 0;
setTimeout(function() {
u[0].landNode.active = !0;
}, 300);
var f = cc.scaleTo(.2, 1).easing(cc.easeBackOut(3));
u[0].node.runAction(f);
}
}
},
getReward: function(e) {
switch (e.type) {
case f.MONEY:
var t = e.num;
s.instance.updateGold(t);
s.instance.showGold -= t;
var i = {
count: t,
isMore: !0,
isLucky: !1
};
this.uiMgr.showGetMoneyEffect(i, cc.v2(0, -200), !0);
break;

case f.HERO_SKIN:
if (!s.instance.isOwnHeroSkin(e.id)) {
s.instance.addHeroSkin(e.id);
this.onEquipHeroSkin(e.itemData, !0);
}
this.uiMgr.showReward(e.itemData);
s.instance.showPanelBuySkinFlag = !1;
break;

case f.KNIFE_SKIN:
if (!s.instance.isOwnKnifeSkin(e.id)) {
s.instance.addKnifeSkin(e.id);
this.onEquipKnifeSkin(e.itemData, !0, !0, !1);
}
this.uiMgr.showReward(e.itemData);
s.instance.showPanelBuySkinFlag = !1;
break;

case f.ZONG_ZI:
t = e.num;
s.instance.updateZongZi(t);
this.uiMgr.showTips(n.getStringByFormat(o.instance.getUITipStr(15), t));
}
},
showPanelTreasureBox: function() {
s.instance.canShowPanelTreasureBox() && this.uiMgr.showPanelTreasureBox();
},
updateKeyCount: function(e) {
s.instance.updateKeyCount();
this.uiMgr.showPanelKeyCount(e);
}
});
cc._RF.pop();
}, {
AddEntitySystem: "AddEntitySystem",
AdvertMgr: "AdvertMgr",
AudioEngine: "AudioEngine",
CollisionEventManager: "CollisionEventManager",
ConfigData: "ConfigData",
GameData: "GameData",
PlatformMgr: "PlatformMgr",
PlayerData: "PlayerData",
Tools: "Tools",
Types: "Types"
} ],
FollowCameraCtrl: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "70360Mk5QxHiZeAU1J0aXk4", "FollowCameraCtrl");
var n = e("Tools");
cc.Class({
extends: cc.Component,
properties: {
targetNode: cc.Node,
camera: cc.Camera,
_marginX: 640,
_marginY: 400,
_currentVelocityX: 0,
_currentVelocityY: 0,
_maxSpeed: Number.MAX_VALUE,
_smoothTime: .3,
_moveLimitRect: cc.rect,
_moveCamreaRate: 1,
_curCameraRate: 1,
_targetCameraRate: -1,
_currentVelocityRate: 0
},
cleanUp: function() {
this.node.position = cc.v2(0, 0);
this.targetNode = null;
},
init: function(e, t) {
var i = cc.find("Canvas");
this._marginX = i.width / 10;
this._marginY = i.height / 10;
this.targetNode = e;
this._moveLimitRect = new cc.rect(t.x + this._marginX, t.y + this._marginY, t.width - 2 * this._marginX, t.height - 2 * this._marginY);
var a = this.targetNode.position, o = n.clamp(this._moveLimitRect.xMin, this._moveLimitRect.xMax, a.x), s = n.clamp(this._moveLimitRect.yMin, this._moveLimitRect.yMax, a.y);
this.node.position = cc.v2(o, s);
this._moveCamreaRate = 100;
},
resetTargetNode: function(e) {
var t = this;
this.targetNode = e;
setTimeout(function() {
t._targetCameraRate = 1.6;
}, 200);
this._moveCamreaRate = 2;
},
resetCameraRate: function() {
this._targetCameraRate = 1;
},
lateUpdate: function(e) {
if (this.targetNode && this._moveLimitRect) {
var t = this.targetNode.position, i = n.clamp(this._moveLimitRect.xMin, this._moveLimitRect.xMax, t.x), a = n.clamp(this._moveLimitRect.yMin, this._moveLimitRect.yMax, t.y), o = n.smoothDamp(this.node.position.x, i, this._currentVelocityX, this._smoothTime, this._maxSpeed, this._moveCamreaRate * e), s = n.smoothDamp(this.node.position.y, a, this._currentVelocityY, this._smoothTime, this._maxSpeed, this._moveCamreaRate * e);
if (this._targetCameraRate > 0) {
var r = n.smoothDamp(this._curCameraRate, this._targetCameraRate, this._currentVelocityRate, this._smoothTime, this._maxSpeed, 1.4 * e);
this._currentVelocityRate = r[1];
this._curCameraRate = r[0];
this.camera.zoomRatio = this._curCameraRate;
}
this._currentVelocityX = o[1];
this._currentVelocityY = s[1];
this.node.position = cc.v2(o[0], s[0]);
}
}
});
cc._RF.pop();
}, {
Tools: "Tools"
} ],
FollowPlayerScale: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "e45fafeLZ1PGpmSEne7SgZY", "FollowPlayerScale");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.node.on("changeScaleMultip", this.changeScaleMultip, this);
this.changeScaleMultip(1);
},
changeScaleMultip: function(e) {
this.newScale = e;
this.scalePer = this.newScale - this.node.scale;
},
update: function(e) {
if (this.node.scale !== this.newScale) {
this.node.scale += this.scalePer * e;
this.scalePer > 0 ? this.node.scale > this.newScale && (this.node.scale = this.newScale) : this.node.scale < this.newScale && (this.node.scale = this.newScale);
}
}
});
cc._RF.pop();
}, {} ],
GSGame: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "41feeFZNfpMvpAU5mGKO4RQ", "GSGame");
e("Tools");
var n = e("UIUtil"), a = e("GameData"), o = e("PlayerData");
cc.Class({
extends: cc.Component,
properties: {
panelTop: cc.Node,
gameOverPanel: cc.Node,
panelNotice: cc.Node,
panelHeroPosArr: cc.Node,
panelGuide: cc.Node,
panelRevive: cc.Node,
panelTips: cc.Node,
panelTaskNotice: cc.Node,
panelVictory: cc.Node,
guideTime: 0,
countDownNode: cc.Node,
panelKill: cc.Node,
panelReviveTips: cc.Node,
effectKey: cc.Animation
},
init: function(e) {
this.world = e;
o.instance.isGuide && (this.panelTop.active = !1);
this.effectKey.node.parent.position = cc.v2(0, 200);
this.checkPad();
},
checkPad: function() {
this.panelKill.y = a.instance.isPad() ? 380 : 588;
this.panelReviveTips.y = a.instance.isPad() ? 350 : 380;
this.panelTop.getComponent(cc.Widget).top = a.instance.isLongScreen() ? 100 : 0;
},
cleanUp: function() {
this.panelTop.getComponent("PanelTop").cleanUp();
this.panelHeroPosArr.destroyAllChildren();
this.gameOverPanel && this.gameOverPanel.getComponent("PanelGameOver").cleanUp();
this.panelGuide && (this.panelGuide.active = !0);
this.guideTime = 0;
this.panelVictory && (this.panelVictory.active = !1);
this.panelKill.active = !0;
this.panelNotice && (this.panelNotice.active = !0);
},
startLoadPrefab: function() {
var e = this;
a.instance.logUseTime("start prefab load");
this.needLoadPanel = 0;
this.loadedPanel = 0;
var t = this, i = function() {
t.loadedPanel++;
if (t.needLoadPanel === t.loadedPanel) {
var e = t.node.children.length;
t.panelTips.setSiblingIndex(e);
t.panelNotice && t.panelNotice.setSiblingIndex(1);
t.panelKeyCount && (t.panelKeyCount.parent = t.node);
t.panelTreasureBox && (t.panelTreasureBox.parent = t.node);
}
};
if (!this.panelNotice) {
n.loadUIPrefab("prefab/ui/gsgame/PanelNotice", function(t) {
if (t) {
e.panelNotice = t;
e.panelNotice.parent = e.node;
o.instance.isGuide && (e.panelNotice.active = !1);
a.instance.logUseTime("panelNotice prefab loaded");
i();
}
});
this.needLoadPanel++;
}
this.panelTop.getComponent("PanelTop").startLoadPrefab();
if (!this.panelRevive) {
n.loadUIPrefab("prefab/ui/gsgame/PanelRevive", function(t) {
if (t) {
e.panelRevive = t;
e.panelRevive.parent = e.node;
a.instance.logUseTime("panelRevive prefab loaded");
i();
}
});
this.needLoadPanel++;
}
if (!this.gameOverPanel) {
n.loadUIPrefab("prefab/ui/gsgame/PanelGameOver", function(t) {
if (t) {
e.gameOverPanel = t;
e.gameOverPanel.parent = e.node;
a.instance.logUseTime("gameOverPanel prefab loaded");
i();
}
});
this.needLoadPanel++;
}
if (!this.panelGuide) {
n.loadUIPrefab("prefab/ui/gsgame/panelGuide", function(t) {
if (t) {
e.panelGuide = t;
e.panelGuide.parent = e.node;
e.panelGuide.y = a.instance.isPad() ? -213 : -313;
a.instance.logUseTime("panelGuide prefab loaded");
i();
}
});
this.needLoadPanel++;
}
if (!this.panelFirstGuide && o.instance.isGuide) {
n.loadUIPrefab("prefab/ui/gsgame/PanelFirstGuide", function(t) {
if (t) {
e.panelFirstGuide = t;
e.panelFirstGuide.parent = e.node;
a.instance.logUseTime("panelFirstGuide prefab loaded");
i();
}
});
this.needLoadPanel++;
}
if (!this.panelVictory) {
n.loadUIPrefab("prefab/ui/gsgame/PanelVictory", function(t) {
if (t) {
e.panelVictory = t;
e.panelVictory.parent = e.node;
a.instance.logUseTime("panelVictory prefab loaded");
i();
}
});
this.needLoadPanel++;
}
if (!this.panelTreasureBox) {
n.loadUIPrefab("prefab/ui/gsgame/PanelTreasureBox", function(t) {
if (t) {
e.panelTreasureBox = t;
a.instance.logUseTime("PanelTreasureBox prefab loaded");
i();
}
});
this.needLoadPanel++;
}
if (!this.panelKeyCount) {
n.loadUIPrefab("prefab/ui/gsgame/KeyCount", function(t) {
if (t) {
e.panelKeyCount = t;
a.instance.logUseTime("panelKeyCount prefab loaded");
i();
}
});
this.needLoadPanel++;
}
},
addPlayerRankItem: function(e) {
this.panelTop.getComponent("PanelTop").addPlayerRankItem(e);
},
openGameOverPanel: function() {
if (this.gameOverPanel) {
this.gameOverPanel.active = !0;
this.gameOverPanel.getComponent("PanelGameOver").init(this.world);
console.log("showBanner openGameOverPanel");
AdvertMgr.instance.showBanner();
}
},
showPanelTreasureBox: function() {
if (this.panelTreasureBox) {
this.panelTreasureBox.active = !0;
this.panelTreasureBox.getComponent("PanelTreasureBox").init(this.world);
}
},
closeGameOverPanel: function() {
this.gameOverPanel && (this.gameOverPanel.active = !1);
},
update: function(e) {
if (this.panelGuide && this.panelGuide.active) {
this.guideTime += e;
this.world.localPlayer.isDefence && (this.touchTime = this.guideTime);
this.guideTime > this.touchTime + 1 && (this.panelGuide.active = !1);
this.guideTime > 3 && (this.panelGuide.active = !1);
}
},
addHeroPosArr: function(e, t, i) {
this.panelHeroPosArr.getComponent("PanelHeroPosArr").addHeroPosArr(e, t, i);
},
addSpecialNotice: function(e) {
this.panelTop.getComponent("PanelTop").anyPanelOpen() || this.panelNotice && this.panelNotice.getComponent("PanelNotice").addSpecialNotice(e);
},
showImportantNotice: function(e) {
this.panelTop.getComponent("PanelTop").anyPanelOpen() || this.panelNotice && this.panelNotice.getComponent("PanelNotice").showImportantNotice(e);
},
closePanelNotice: function() {
if (this.panelNotice) {
var e = this.panelNotice.getComponent("PanelNotice");
e.isOpen && e.close();
}
},
startCountDown: function(e) {
this.panelTop.getComponent("PanelTop").startCountDown(e);
},
showKillMsg: function(e, t) {
this.closePanelNotice();
this.panelTop.getComponent("PanelTop").showKillMsg(e, t);
},
showKillNotice: function(e) {
this.panelTop.getComponent("PanelTop").showKillNotice(e);
},
showReviveNotice: function(e) {
this.closePanelNotice();
this.panelTop.getComponent("PanelTop").showReviveNotice(e);
},
openRevivePanel: function(e, t) {
if (this.panelRevive) {
this.panelRevive.active = !0;
this.panelRevive.getComponent("PanelRevive").init(e, t, this);
this.panelRevive.children[0].scale = 0;
var i = cc.scaleTo(.2, 1);
this.panelRevive.children[0].runAction(i);
}
},
showTips: function(e) {
this.panelTips.getComponent("PanelTips").init(e);
},
showTaskNotice: function(e, t) {
var i = cc.moveBy(.3, cc.v2(-200, 0)).easing(cc.easeBackOut()), n = cc.delayTime(2), a = cc.moveBy(.3, cc.v2(200, 0)).easing(cc.easeBackIn()), o = cc.callFunc(function() {
t();
});
this.panelTaskNotice.active = !0;
this.panelTaskNotice.runAction(cc.sequence(i, n, a, o));
this.panelTaskNotice.getComponent("PanelTaskNotice").init(e, t);
},
showCountDownNode: function() {
this.panelNotice && (this.panelNotice.active = !1);
this.countDownNode.active = !0;
},
onBigBuff: function() {
this.world.localPlayer.node.emit("updateBuffState", 0);
},
onFastBuff: function() {
this.world.localPlayer.node.emit("updateBuffState", 1);
},
onHardBuff: function() {
this.world.localPlayer.node.emit("updateBuffState", 2);
},
onMagnetBuff: function() {
this.world.localPlayer.node.emit("updateBuffState", 3);
},
onFrenzyBuff: function() {
this.world.localPlayer.node.emit("onFrenzyAdd", 3);
},
showGuideStart: function(e) {
this.panelFirstGuide && this.panelFirstGuide.getComponent("PanelFirstGuide").showGuideStart(e);
},
showGuideEnd: function(e) {
this.panelFirstGuide && this.panelFirstGuide.getComponent("PanelFirstGuide").showGuideEnd(e);
},
showGuideSpecial: function(e) {
this.panelFirstGuide && this.panelFirstGuide.getComponent("PanelFirstGuide").showGuideSpecial(e);
},
refreshGuideProcess: function(e) {
this.panelFirstGuide && this.panelFirstGuide.getComponent("PanelFirstGuide").refreshGuideProcess(e);
},
showPanelVictory: function() {
if (this.panelVictory) {
this.panelVictory.active = !0;
this.panelVictory.getChildByName("victory").getChildByName("victory").getComponent(cc.Animation).play("ani-victory", 0);
}
this.panelKill.active = !1;
this.panelNotice && (this.panelNotice.active = !1);
this.panelTop.getComponent("PanelTop").killNoticeNode.active = !1;
},
showPanelKeyCount: function(e) {
if (this.panelKeyCount) {
this.panelKeyCount.getComponent("KeyCount").show(this.effectKey.node.parent);
this.effectKey.play();
}
},
openPanelKeyCount: function(e) {
this.panelKeyCount && this.panelKeyCount.getComponent("KeyCount").open(e);
}
});
cc._RF.pop();
}, {
GameData: "GameData",
PlayerData: "PlayerData",
Tools: "Tools",
UIUtil: "UIUtil"
} ],
GSHome: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "6a153O4e0JGZpB+1ki7zURK", "GSHome");
var n = e("PlayerData"), a = e("UIUtil"), o = e("GameData"), s = e("ShareMgr"), r = e("Types").ShareType, c = e("Types").StageType, l = e("Types").AdverType, h = e("ConfigData"), d = e("Types").PlatformType, u = e("PlatformMgr"), f = e("Tools"), p = e("BagItem"), m = (e("Types").ItemType, 
e("AdvertMgr")), g = e("LanguageMgr"), y = e("Types").TaskType;
cc.Class({
extends: cc.Component,
statics: {
gameClubButton: null
},
properties: {
shopDiamondNode: cc.Node,
shopRootNode: cc.Node,
indexDownRootNode: cc.Node,
panelIndex: cc.Node,
panelShop: cc.Node,
panelKnifeShop: cc.Node,
panelHeroShop: cc.Node,
panelTips: cc.Node,
panelReward: cc.Node,
panelLevelUp: cc.Node,
panelSign: cc.Node,
panelSignRoot: cc.Node,
goldLabel: cc.Label,
nameEditBox: cc.EditBox,
versionLabel: cc.Label,
getMoneyAnim: cc.Animation,
getMoreMoneyAnim: cc.Animation,
getLuckyMoneyNode: cc.Node,
world: null,
audioOnNode: cc.Node,
audioOffNode: cc.Node,
vibrateOnNode: cc.Node,
vibrateOffNode: cc.Node,
restorePurchaseBtn: cc.Node,
noAdsBtn: cc.Node,
addKnifeNode: cc.Node,
friendRankNode: cc.Node,
gameClubNode: cc.Node,
myAppNode: cc.Node,
_extraKnife: !1,
rankBar: cc.Node,
rankNameLabel: cc.Label,
rankIconSprite: cc.Sprite,
rankProgressLabel: cc.Label,
rankStarNode: cc.Node,
rankNoStarNode: cc.Node,
panelCheat: cc.Node,
panelCheatBtn: cc.Node,
panelRankInfo: cc.Node,
panelRankInfoRedDot: cc.Node,
panelKnifeShopRedDot: cc.Node,
panelKnifeShopNewRedDot: cc.Node,
panelHeroShopRedDot: cc.Node,
panelHeroShopNewRedDot: cc.Node,
panelTryOut: cc.Node,
panelTryFrenzy: cc.Node,
panelTrySuit: cc.Node,
panelDailyTask: cc.Node,
panelInvite: cc.Node,
panelAddTop: cc.Node,
panelHolidayRank: cc.Node,
panelRewardDetail: cc.Node,
panelPKReward: cc.Node,
panelWorldReward: cc.Node,
panelPKNotice: cc.Node,
panelSubscribe: cc.Node,
panelSubscribeReward: cc.Node,
panelBuySkin: cc.Node,
panelEvaulate: cc.Node,
panelRechargeShop: cc.Node,
rechargeShopParent: cc.Node,
kingNode: cc.Node,
kingLabel: cc.Label,
panelFriend: cc.Node,
signTipsNode: cc.Node,
singTipsLabel: cc.Label,
signRedDot: cc.Node,
panelMatch: cc.Node,
panelProperty: cc.Node,
panelGetSkin: cc.Node,
watchAdverBtn: cc.Node,
watchAdverLabel: cc.Label,
danceNumberNode: cc.Node,
danceNumberLabel: cc.Label,
panelGrowUp: cc.Node,
panelOfflineGold: cc.Node,
settingNode: cc.Node,
vibrateBtn: cc.Node,
downNode: cc.Node,
panelRepay: cc.Node,
panelRank: cc.Node,
taskRedDot: cc.Node,
taskPIKAQI: cc.Node,
showMoneyTime: .5,
redDotLabel: cc.Label,
dailyTaskNode: cc.Node,
inviteBtnNode: cc.Node,
inviteRedDot: cc.Node,
goldCountNode: cc.Node,
goldAnimNode: cc.Node,
diamondCountNode: cc.Node,
diamondCountLabel: cc.Label,
addTopBtnNode: cc.Node,
addTopRedDot: cc.Node,
addTopRootNode: cc.Node,
diamondNode: cc.Node,
diamondLabel: cc.Label,
activeSuitAnim: cc.Animation,
holidayParentNode: cc.Node,
holidayBtn: cc.Node,
holidayWorkdBtn: cc.Node,
holidayCloseBtn: cc.Node,
userinfoBtns: [],
pkNoticeBtn: cc.Node,
pkNoticeLabel: cc.Label,
selectLanguageNode: cc.Node,
isNewShop: !0
},
init: function(e) {
var t = this;
m.instance.fireBaseEvent("app_enter");
m.instance.fireBaseEvent("page_show_prepare");
m.instance.getOpenAdRules() && (n.instance.isShowOpenAdCold ? console.log("already played openAppAd") : m.instance.showOpenApp());
this.world = e;
this.activeCount = 0;
this.activeGoldNode(!0);
this.activeDiamondNode(!0);
this.pkNoticeLabel.string = n.instance.remainPKDay;
this.goldCountNode.active = !0;
this.diamondCountNode.active = !0;
this.goldAnim = this.goldAnimNode.getComponent("GoldAnim");
this.nameEditBox.textLabel.langFlag = !0;
this.nameEditBox.placeholderLabel.langFlag = !0;
this.nameEditBox.string = n.instance.name;
this.versionLabel.string = o.instance.showVersion;
this.audioOnNode.active = o.instance._audioOpen;
this.audioOffNode.active = !this.audioOnNode.active;
this.vibrateOnNode.active = o.instance._vibrateOpen;
this.vibrateOffNode.active = !this.vibrateOnNode.active;
this.restorePurchaseBtn.active = u.isIosApp();
this.noAdsBtn.active = !n.instance.getVipWithoutInterstitial();
this.friendRankNode.active = !1;
this._extraKnife = n.instance.isExtraKnife;
this.holidayBtn.active = !1;
this.pkNoticeBtn.active = !1;
n.instance.getGoldParam && (n.instance.showGold -= n.instance.getGoldParam.count);
var i = n.instance.rankData, r = n.instance.rankStar;
this.rankNameLabel.string = i.name;
if (0 === i.levelUpStar) {
this.kingNode.active = !0;
this.refreshRankStar();
this.kingLabel.string = "x" + (r - i.star);
} else {
this.kingNode.active = !1;
this.refreshRankStar();
}
a.loadResSprite(this.rankIconSprite, i.url);
if (u.platformType === d.WECHAT) {
var c = wx.getMenuButtonBoundingClientRect();
console.log("========getMenuButtonBoundingClientRect=======", JSON.stringify(c));
var l = 150;
c.bottom && (l = c.bottom / o.instance.frameSize.height * 1280 + 50);
this.addTopRootNode.y = -l;
setTimeout(function() {
var e = f.getItem("userinfoBtn");
if (e) 1 === e && wx.getUserInfo({
success: function(e) {
if (e) {
t.changeName(e.userInfo.nickName);
n.instance.updateIconUrl(e.userInfo.avatarUrl);
f.setItem("userinfoBtn", 2);
}
}
}); else {
var i = function(e) {
if (e.userInfo) {
t.changeName(e.userInfo.nickName);
n.instance.updateIconUrl(e.userInfo.avatarUrl);
f.setItem("userinfoBtn", 1);
var i = !0, a = !1, o = void 0;
try {
for (var s, r = t.userinfoBtns[Symbol.iterator](); !(i = (s = r.next()).done); i = !0) {
var c = s.value;
c && c.destroy();
}
} catch (e) {
a = !0;
o = e;
} finally {
try {
!i && r.return && r.return();
} finally {
if (a) throw o;
}
}
}
};
if (t.userinfoBtns[0]) t.userinfoBtns[0].show(); else {
t.userinfoBtns[0] = t.createUserInfoButton(t.nameEditBox.node);
t.userinfoBtns[0].onTap(function(e) {
i(e);
});
}
if (h.instance.isDuringHolidayRankBtnShowTime()) if (t.userinfoBtns[1]) t.userinfoBtns[1].show(); else {
t.userinfoBtns[1] = t.createUserInfoButton(t.holidayBtn);
t.userinfoBtns[1].onTap(function(e) {
i(e);
t.onPanelHolidayRankBtnClick();
});
}
if (t.userinfoBtns[2]) t.userinfoBtns[2].hide(); else {
t.userinfoBtns[2] = t.createUserInfoButton(t.holidayWorkdBtn);
t.userinfoBtns[2].onTap(function(e) {
i(e);
t.panelHolidayRank.getComponent("PanelHolidayRank").onWorldNodeBtnClick();
});
t.userinfoBtns[2].hide();
}
if (t.userinfoBtns[3]) t.userinfoBtns[3].hide(); else {
t.userinfoBtns[3] = t.createUserInfoButton(t.holidayCloseBtn);
t.userinfoBtns[3].onTap(function(e) {
i(e);
t.panelHolidayRank.getComponent("PanelHolidayRank").close();
});
t.userinfoBtns[2].hide();
}
}
}, 500);
}
this.panelGrowUp.getComponent("PanelGrowUp").init(this.world);
this.panelRank.getComponent("PanelRank").init();
var p = (o.instance.screenHeight - 1280) / 2, g = p > 40 ? p - 40 : 0;
this.downNode.y = 144 - g;
this.refreshWatchAdverBtn();
this.refreshRedDot();
var y = this;
s.refreshRedDot = function() {
y.refreshRedDot();
y.panelAddTop.getComponent("PanelAddTop").refresh();
};
this.checkPad();
if (!n.instance.isFristGame()) {
console.log("showBanner setTimeout GSHome");
setTimeout(function() {
m.instance.showBanner();
}, 2e3);
}
},
checkPad: function() {
this.shopRootNode.y = o.instance.isPad() ? -200 : 0;
this.indexDownRootNode.y = o.instance.isPad() ? 250 : 180;
this.panelDailyTask.y = o.instance.isPad() ? -120 : 0;
this.shopDiamondNode.y = o.instance.isPad() ? 430 : 550;
this.panelSubscribe.y = o.instance.isPad() ? -100 : 0;
this.panelSign.getComponent(cc.Widget).top = o.instance.isPad() ? 150 : 0;
this.panelSignRoot.scale = o.instance.isPad() ? .9 : 1;
this.settingNode.width = o.instance.isPad() ? 165 : 245;
this.vibrateBtn.active = !o.instance.isPad();
this.panelBuySkin.y = o.instance.isPad() ? -100 : 0;
this.panelTips.y = o.instance.isPad() ? 340 : 480;
this.activeSuitAnim.node.y = o.instance.isPad() ? -100 : 0;
this.panelLevelUp.getComponent(cc.Widget).top = o.instance.isPad() ? 150 : 0;
this.panelGetSkin.getComponent(cc.Widget).top = o.instance.isPad() ? 150 : 0;
},
createUserInfoButton: function(e) {
var t, i, n, a, s, r = o.instance.ratio;
i = ((t = e.parent.convertToWorldSpaceAR(e.position)).x - e.width / 2) * r;
n = (o.instance.screenHeight - t.y - e.height / 2) * r;
a = e.width * r;
s = e.height * r;
return wx.createUserInfoButton({
type: "text",
text: "",
style: {
left: i,
top: n,
width: a,
height: s,
backgroundColor: "#00000000",
color: "#00000000",
borderRadius: 0,
textAlign: "center",
fontSize: 30,
lineHeight: 40
}
});
},
startLoadPrefab: function() {
var e = this;
o.instance.logUseTime("start home prefab load");
this.panelHeroShop || a.loadUIPrefab("prefab/ui/gshome/PanelHeroShop" + (this.isNewShop ? "_new" : ""), function(t) {
if (t) {
e.panelHeroShop = t;
e.panelHeroShop.parent = e.panelShop;
o.instance.logUseTime("panelHeroShop prefab loaded");
}
});
this.panelKnifeShop || a.loadUIPrefab("prefab/ui/gshome/PanelKnifeShop" + (this.isNewShop ? "_new" : ""), function(t) {
if (t) {
e.panelKnifeShop = t;
e.panelKnifeShop.parent = e.panelShop;
o.instance.logUseTime("panelKnifeShop prefab loaded");
}
});
this.panelRechargeShop || a.loadUIPrefab("prefab/ui/gshome/PanelShop", function(t) {
if (t) {
e.panelRechargeShop = t;
e.panelRechargeShop.parent = e.rechargeShopParent;
e.panelRechargeShop.active = !1;
e.panelRechargeShop.y = o.instance.isPad() ? -80 : 0;
o.instance.logUseTime("panelRechargeShop prefab loaded");
}
});
},
onPanelShopBtnClick: function(e, t) {
if (this.panelKnifeShop && this.panelHeroShop) {
this.panelProperty.active = !0;
this.panelHeroShop && this.panelHeroShop.getComponent("PanelHeroShop" + (this.isNewShop ? "_new" : "")).init(this.world);
this.panelKnifeShop && this.panelKnifeShop.getComponent("PanelKnifeShop" + (this.isNewShop ? "_new" : "")).init(this.world);
var i = cc.moveTo(.5, cc.v2(0, o.instance.screenOffset / 2 - 300)).easing(cc.easeCubicActionOut(3));
this.world.followCameraCtrl.runAction(i);
i = cc.moveTo(.5, cc.v2(0, o.instance.screenOffset)).easing(cc.easeCubicActionOut(3));
this.panelShop.runAction(i);
this.panelIndex.active = !1;
this.world.localPlayer.setScale(.8);
this.world.localPlayer.showNameNode(!1);
"1" === t ? this.onPanelHeroShopBtnClick() : this.onPanelKnifeShopBtnClick();
m.instance.destoryBanner();
}
},
onPanelKnifeShopBtnClick: function() {
this.panelKnifeShop && this.panelKnifeShop.getComponent("PanelKnifeShop" + (this.isNewShop ? "_new" : "")).init(this.world);
this.panelKnifeShop.active = !0;
this.panelHeroShop.active = !1;
m.instance.fireBaseEvent("page_show_knife");
n.instance.updateNewKnifeSkinCheck();
this.refreshRedDot();
},
onPanelHeroShopBtnClick: function() {
this.panelHeroShop && this.panelHeroShop.getComponent("PanelHeroShop" + (this.isNewShop ? "_new" : "")).init(this.world);
this.panelKnifeShop.active = !1;
this.panelHeroShop.active = !0;
m.instance.fireBaseEvent("page_show_hero");
n.instance.updateNewHeroSkinCheck();
this.refreshRedDot();
},
onPanelShopClose: function(e) {
var t = cc.moveTo(.5, cc.v2(0, -1500)).easing(cc.easeCubicActionOut(3));
this.panelShop.runAction(t);
this.panelIndex.active = !0;
this.panelProperty.active = !1;
t = cc.moveTo(.5, cc.v2(0, 0)).easing(cc.easeCubicActionOut(3));
this.world.followCameraCtrl.runAction(t);
this.world.localPlayer.showNameNode(!0);
this.world.localPlayer.setScale(1);
e ? this.panelKnifeShop.getComponent("PanelKnifeShop" + (this.isNewShop ? "_new" : "")).close() : this.panelHeroShop.getComponent("PanelHeroShop" + (this.isNewShop ? "_new" : "")).close();
},
onPanelRankInfoBtnClick: function() {
m.instance.fireBaseEvent("click_ranking_btn");
this.panelRank.active = !0;
this.panelRank.getComponent("PanelRank").refresh();
},
onAddKnifeBtnClick: function() {
var e = this, t = function(t) {
if (t) {
n.instance.setExtraKnife(6);
e.world.changeLocalKnifesCount(n.instance.knifeSkin.initKnifeCount);
e._extraKnife = !0;
e.addKnifeNode.active = !1;
}
};
switch (h.instance.getCurStageByPrizeCount(n.instance)) {
case c.Free:
t(!0);
break;

case c.Share:
s.share(r.AddKnife, t);
break;

case c.Adver:
m.instance.fireBaseEvent("click_addknives_btn");
m.instance.fireBaseEvent("click_adv_btn", "position_id", h.instance.getAdvertUnitId(l.AddKnife));
m.instance.showAdver(l.AddKnife, t);
}
},
OnEditNameBegan: function() {
m.instance.destoryBanner();
},
onEditName: function() {
var e = this.filter(this.nameEditBox.string);
e !== this.nameEditBox.string && this.showTips(21);
this.changeName(e);
},
changeName: function(e) {
console.log("showBanner changeName ");
m.instance.showBanner();
e = f.getShowNickName(e);
n.instance.updateName(e);
this.world.localPlayer.changeName(e);
this.nameEditBox.string = e;
},
filter: function(e) {
for (var t = h.instance.teaword, i = e, n = 0; n < t.length; n++) {
var a = new RegExp(t[n].replace(/([\(\)\*])/g, "\\$1"), "ig");
i = i.replace(a, "");
}
return i;
},
update: function(e) {
var t = n.instance.showGold, i = f.getGoldStr(t);
this.goldLabel.string = i;
this.diamondLabel.string = n.instance.zongZi;
this.diamondCountLabel.string = n.instance.zongZi;
if (this.nameEditBox.node.parent.active !== !u.isIOS()) {
this.nameEditBox.node.parent.active = !u.isIOS();
this.world.localPlayer.changeName("我");
}
var a = !this._extraKnife;
this.addKnifeNode.active !== a && (this.addKnifeNode.active = a);
a = !(o.instance.isInReview || h.instance.clientData.hideSpecialSkin);
this.dailyTaskNode.active !== a && (this.dailyTaskNode.active = a);
a = !(o.instance.isInReview || h.instance.clientData.hideSpecialSkin || n.instance.hasGetInviteReward() || u.isApp());
this.inviteBtnNode.active !== a && (this.inviteBtnNode.active = a);
a = !(o.instance.isInReview || h.instance.clientData.hideAddTop || !n.instance.canShowBtnAddTop() || u.isIOS() || u.isApp());
this.addTopBtnNode.active !== a && (this.addTopBtnNode.active = a);
},
onAudioBtnClick: function() {
this.audioOnNode.active = !this.audioOnNode.active;
this.audioOffNode.active = !this.audioOnNode.active;
o.instance.setAudio(this.audioOnNode.active);
},
onVibrateBtnClick: function() {
this.vibrateOnNode.active = !this.vibrateOnNode.active;
this.vibrateOffNode.active = !this.vibrateOnNode.active;
o.instance.setVibrate(this.vibrateOnNode.active);
},
showTips: function(e) {
this.panelTips.getComponent("PanelTips").init(e);
},
showReward: function(e, t, i) {
this.panelReward.active = !0;
this.panelReward.getComponent("PanelReward").init(e, t, i, this.world);
},
onShareBtnClick: function() {
var e = this;
s.share(r.HOME, function(t) {
t && e.showTips(1);
});
},
refreshGold: function() {
this._GSHome.refreshGold();
},
onResetToDefault: function() {
n.instance.showPanelSignFlag = !1;
n.instance.resetDataToDefault();
this.world.restartGame();
},
hideMyAppNode: function() {
this.myAppNode.active = !1;
},
showPanelLevelUp: function(e) {
this.panelLevelUp.active = !0;
this.panelLevelUp.getComponent("PanelLevelUp").init(e);
},
showPanelTryOut: function(e, t, i) {
this.panelTryOut.active = !0;
this.panelTryOut.getComponent("PanelTryOut").init(e, t, i);
},
showPanelTryFrenzy: function(e) {
this.panelTryFrenzy.active = !0;
this.panelTryFrenzy.getComponent("PanelTryFrenzy").init(e);
},
showPanelTrySuit: function(e, t, i) {
this.panelTrySuit.active = !0;
this.panelTrySuit.getComponent("PanelTrySuit").init(e, t, i);
},
showPanelSign: function(e) {
this.activeGoldNode(!1);
this.activeDiamondNode(!1);
this.panelSign.active = !0;
this.panelSign.getComponent("PanelSign").init(this.world, e);
},
showWatchAdverCount: function() {
var e = n.instance.changeAdverCount;
if (e > 0) {
n.instance.changeAdverCount = 0;
this.danceNumberLabel.string = "+" + e;
this.danceNumberNode.active = !0;
}
},
refreshWatchAdverBtn: function() {
this.watchAdverSkinData = h.instance.getKnifeSkinById(25);
if (n.instance.getTaskProcess(y.ADVERCOUNT) >= this.watchAdverSkinData.taskParam) {
this.watchAdverBtn.active = !1;
this.panelGetSkin.getComponent("PanelGetSkin").onCloseBtnClick();
} else this.watchAdverBtn.active = !0;
},
refreshRedDot: function() {
this.panelKnifeShopRedDot.active = !1;
this.panelKnifeShopNewRedDot.active = !1;
this.panelHeroShopRedDot.active = !1;
this.panelHeroShopNewRedDot.active = !1;
this.panelRankInfoRedDot.active = !1;
var e = !0, t = !1, i = void 0;
try {
for (var a, o = h.instance.knifeSkinDatas[Symbol.iterator](); !(e = (a = o.next()).done); e = !0) {
var s = a.value, r = n.instance.isOwnKnifeSkin(s.id), c = f.arrContains(n.instance.completeTaskIds, s.taskId);
if (!r && c) {
this.panelKnifeShopRedDot.active = !0;
break;
}
}
} catch (e) {
t = !0;
i = e;
} finally {
try {
!e && o.return && o.return();
} finally {
if (t) throw i;
}
}
var l = !0, d = !1, u = void 0;
try {
for (var m, g = h.instance.heroSkinDatas[Symbol.iterator](); !(l = (m = g.next()).done); l = !0) {
var y = m.value;
r = n.instance.isOwnHeroSkin(y.id), c = f.arrContains(n.instance.completeTaskIds, y.taskId);
if (!r && c) {
this.panelHeroShopRedDot.active = !0;
break;
}
}
} catch (e) {
d = !0;
u = e;
} finally {
try {
!l && g.return && g.return();
} finally {
if (d) throw u;
}
}
var v = !0, k = !1, C = void 0;
try {
for (var S, w = h.instance.knifeSkinDatas[Symbol.iterator](); !(v = (S = w.next()).done); v = !0) {
var T = S.value, N = T.newDate && f.isBeforeOtherTime(T.newDate, n.instance.getCurTime()), _ = T.id;
if (N && !f.arrContains(n.instance.hasCheckNewSkin, _)) {
this.panelKnifeShopNewRedDot.active = !0;
this.panelKnifeShopRedDot.active = !1;
break;
}
}
} catch (e) {
k = !0;
C = e;
} finally {
try {
!v && w.return && w.return();
} finally {
if (k) throw C;
}
}
var b = !0, R = !1, P = void 0;
try {
for (var D, L = h.instance.heroSkinDatas[Symbol.iterator](); !(b = (D = L.next()).done); b = !0) {
var I = D.value;
N = I.newDate && f.isBeforeOtherTime(I.newDate, n.instance.getCurTime()), _ = 1e4 + I.id;
if (N && !f.arrContains(n.instance.hasCheckNewSkin, _)) {
this.panelHeroShopNewRedDot.active = !0;
this.panelHeroShopRedDot.active = !1;
break;
}
}
} catch (e) {
R = !0;
P = e;
} finally {
try {
!b && L.return && L.return();
} finally {
if (R) throw P;
}
}
var A = n.instance.inviteDatas.length >= 3 && !n.instance.hasGetInviteReward(), M = n.instance.inviteDatas.length > n.instance.checkInviteLength;
this.inviteRedDot.active = !(!A && !M);
A = n.instance.canGetAddTopReward();
this.addTopRedDot.active = A;
var B = !0;
this.taskRedDot.active = !1;
var x = 0, E = n.instance.dailyShowTask, F = !0, K = !1, G = void 0;
try {
for (var O, H = E[Symbol.iterator](); !(F = (O = H.next()).done); F = !0) {
var U = O.value, W = U.process >= U.param;
r = f.arrContains(n.instance.dailyOldTask, U.id) || f.arrContains(n.instance.completeGuideDailyTask, U.id);
if (W && !r) {
this.taskRedDot.active = !0;
x += 1;
}
W || (B = !1);
}
} catch (e) {
K = !0;
G = e;
} finally {
try {
!F && H.return && H.return();
} finally {
if (K) throw G;
}
}
var z = h.instance.clientData.maxRefreshTaskCount, V = n.instance.dayRefreshTaskCount;
if (B && z - V > 0 && 0 === x) {
x = 1;
this.taskRedDot.active = !0;
}
this.redDotLabel.string = x;
this.taskPIKAQI.active = h.instance.isDuringDuanWuFestival(n.instance.getCurTime());
var q = n.instance.daySign;
this.signRedDot.active = !q;
var Z = this.signTipsNode.children;
Z[0].active = !1;
Z[1].active = !1;
Z[2].active = !1;
Z[3].active = !1;
if (!this.signRedDot.active) {
var j = n.instance.signCount, Y = h.instance.signDatas;
j >= 6 && (Y = h.instance.lateSignDatas);
if (0 === j) Z[0].active = !0; else if (1 === j) Z[1].active = !0; else if (5 === j) Z[2].active = !0; else {
Z[3].active = !0;
var X = Y[(j + 1) % 7], J = p.createItemWithString(X.reward);
this.singTipsLabel.string = J.num;
}
}
},
refreshRankStar: function() {
for (var e = n.instance.rankStar, t = n.instance.rankData, i = this.rankStarNode.children, a = this.rankNoStarNode.children, o = 40 / t.levelUpStar + 5, s = 0; s < i.length; s++) {
var r = e > t.star + s, c = s < t.levelUpStar;
if (i[s]) {
i[s].opacity = r && c ? 255 : 0;
if (1 === t.levelUpStar) {
i[s].x = 0;
i[s].y = 0;
} else {
i[s].x = s * o * 2 - o * (t.levelUpStar - 1);
0 === i[s].x ? i[s].y = 0 : i[s].y = Math.abs(i[s].x) / 2 - 7.5;
}
}
if (a[s]) {
a[s].opacity = c ? 255 : 0;
a[s].x = i[s].x;
a[s].y = i[s].y;
}
}
},
onPanelSignBtnClick: function() {
this.activeGoldNode(!1);
this.activeDiamondNode(!1);
this.panelSign.active = !0;
this.panelSign.getComponent("PanelSign").init(this.world);
},
onPanelDailyTaskBtnClick: function() {
this.panelDailyTask.active = !0;
this.panelDailyTask.getComponent("PanelDailyTask").init(this.world);
m.instance.fireBaseEvent("click_messions_btn");
},
onPanelInviteBtnClick: function() {
this.panelInvite.active = !0;
this.panelInvite.getComponent("PanelInvite").init(this.world);
},
onPanelFriendBtnClick: function() {
this.panelFriend.active = !0;
this.panelFriend.getComponent("PanelFriend").init(this.world);
},
showPanelMatch: function(e, t) {
this.panelMatch.active = !0;
this.panelMatch.getComponent("PanelMatch").cleanUp();
this.panelMatch.getComponent("PanelMatch").init(e, t);
},
closePanelMatch: function() {
this.panelMatch.active = !1;
},
refreshProperty: function(e, t) {
this.panelProperty.getComponent("PanelProperty").refreshProperty(e, t);
},
onPanelGetSkinBtnClick: function() {
m.instance.fireBaseEvent("click_artifact_btn");
var e = this;
this.panelGetSkin.active = !0;
this.panelGetSkin.getComponent("PanelGetSkin").init(this.watchAdverSkinData, function(t) {
e.refreshWatchAdverBtn();
e.world.taskMgr.refreshTaskInHome();
e.world.uiMgr.showTips(3);
}, function() {
e.world.uiMgr.showTips(4);
});
},
onPanelCheatClick: function() {
this.panelCheat.active = !0;
},
showOfflineMultip: function(e) {
this.panelOfflineGold.getComponent("PanelOfflineGold").showMultipNode(e);
},
onSettingBtnClick: function() {
m.instance.fireBaseEvent("click_setting_btn");
this.settingNode.active = !this.settingNode.active;
this.settingNode.active ? this.onEditLanguage(null, g.curIndex, !0) : this.isSetLanguage && cc.director.loadScene("Battle");
},
onConnectBtnClick: function() {
u.connectBitverse();
},
onEditLanguage: function(e, t) {
var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], n = Number(t);
g.setLang(n);
for (var a = 0; a < this.selectLanguageNode.children.length; a++) {
var o = this.selectLanguageNode.children[a];
if (a === n) {
o.children[0].active = !0;
o.children[1].active = !1;
} else {
o.children[0].active = !1;
o.children[1].active = !0;
}
}
i || (this.isSetLanguage = !0);
},
refreshOfflineGoldData: function() {
this.panelOfflineGold.getComponent("PanelOfflineGold").refreshData();
},
showPanelRepay: function(e) {
this.panelRepay.active = !0;
this.panelRepay.getComponent("PanelRepay").init(e, this.world);
},
showUnlockGrow: function(e) {
var t = this.panelGrowUp.getComponent("PanelGrowUp");
if (t && t.showCallFunc) {
t.showCallFunc(e);
t.showCallFunc = null;
} else e();
},
showPanelAddTop: function(e) {
this.panelAddTop.active = !0;
this.panelAddTop.getComponent("PanelAddTop").init(this.world, e);
},
showPanelInvite: function(e) {
this.panelInvite.active = !0;
this.panelInvite.getComponent("PanelInvite").init(this.world, e);
},
showPanelDailyTask: function(e) {
this.panelDailyTask.active = !0;
this.panelDailyTask.getComponent("PanelDailyTask").init(this.world, e);
},
showGetMoneyEffect: function(e) {
var t = this, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : cc.v2(0, -200), a = arguments[2];
if (0 === this.activeCount) {
if (a) {
this.activeCount++;
this.activeGoldNode(!0);
}
var s = n.instance.oldRankData, r = n.instance.rankData, c = s && r && s.id < r.id, l = cc.v2(-195, 565 + o.instance.screenHeight / 2 - 640), d = function() {
n.instance.showGold = n.instance.gold;
t.update();
a && setTimeout(function() {
t.activeCount--;
t.activeGoldNode(!1);
}, 400);
};
if (e.isLucky) {
this.goldAnim.onGetLucky(d, i, l);
if ((m = e.multip) && !c) {
var u = Math.ceil(e.count * (m - 1) / m), p = f.getStringByFormat(h.instance.getUITipStr(2), u);
this.showTips(p);
}
} else if (e.isMore) {
this.goldAnim.onGetMore(d, i, l);
var m;
if ((m = e.multip) && !c) {
u = Math.ceil(e.count * (m - 1) / m), p = f.getStringByFormat(h.instance.getUITipStr(2), u);
this.showTips(p);
}
} else this.goldAnim.onGetNormal(d, i, l);
if (this.panelGrowUp) {
var g = this.panelGrowUp.getComponent("PanelGrowUp");
g.refreshShowData(g.curType, !1);
}
}
},
activeGoldNode: function(e) {
this.goldCountNode.active = e;
},
activeDiamondNode: function(e) {
this.diamondCountNode.active = e;
},
onPanelRechargeShopBtnClick: function() {
this.panelRechargeShop.active = !0;
this.panelRechargeShop.getComponent("PanelShop").init(this.world, function() {
m.instance.showBanner();
console.log("showBanner onPanelRechargeShopBtnClick ");
});
m.instance.destoryBanner();
},
onAddTopBtnClick: function() {
this.panelAddTop.active = !0;
this.panelAddTop.getComponent("PanelAddTop").init(this.world);
},
showActiveSuitEffect: function() {
this.activeSuitAnim.play();
},
onPanelHolidayRankBtnClick: function() {
if (this.panelHolidayRank) {
this.panelHolidayRank.active = !0;
this.panelHolidayRank.getComponent("PanelHolidayRank").init(this.world);
for (var e = 2; e < 4; e++) {
var t = this.userinfoBtns[e];
t && t.show();
}
}
},
showPanelRewardDetail: function() {
if (this.panelRewardDetail) {
this.panelRewardDetail.active = !0;
this.panelRewardDetail.getComponent("PanelRewardDetail").init(this.world);
}
},
showPanelPKReward: function(e, t) {
if (this.panelPKReward) {
this.panelPKReward.active = !0;
this.panelPKReward.getComponent("PanelPkReward").init(e, t, this.world);
}
},
showPanelWorldReward: function(e, t) {
if (this.panelWorldReward) {
this.panelWorldReward.active = !0;
this.panelWorldReward.getComponent("PanelWorldReward").init(e, t, this.world);
}
},
showPanelHolidayRank: function(e, t) {
if (this.panelHolidayRank) {
this.panelHolidayRank.active = !0;
this.panelHolidayRank.getComponent("PanelHolidayRank").init(this.world, e, t);
for (var i = 2; i < 4; i++) {
var n = this.userinfoBtns[i];
n && n.show();
}
}
},
hidePanelHolidayUserinfoBtns: function() {
for (var e = 2; e < 4; e++) {
var t = this.userinfoBtns[e];
t && t.hide();
}
},
onPanelPKNoticeBtnClick: function() {
this.panelPKNotice.active = !0;
},
showPanelSubscribeReward: function(e) {
this.panelSubscribeReward.active = !0;
this.panelSubscribeReward.getComponent("PanelSubscribeReward").init(this.world, e);
},
showPanelSubscribe: function(e) {
this.panelSubscribe.active = !0;
this.panelSubscribe.getComponent("PanelSubscribe").init(this.world, e);
},
showPanelBuySkin: function(e) {
this.panelBuySkin.active = !0;
this.panelBuySkin.getComponent("PanelBuySkin").init(e, this.world);
},
showPanelEvaulate: function(e) {
this.panelEvaulate.active = !0;
this.panelEvaulate.getComponent("PanelEvaulate").init(e, this.world);
},
onRestorePurchaseBtnClick: function() {
var e = this;
PayMgr.instance.restoreProducts(function() {
e.noAdsBtn.active = !n.instance.getVipWithoutInterstitial();
e.showTips(22);
});
},
onNoADsBtnClick: function() {
var e = this;
PayMgr.instance.payByIndex(100, function(t) {
if (t) {
n.instance.updateVipWithoutInterstitial();
e.noAdsBtn.active = !n.instance.getVipWithoutInterstitial();
}
}, function() {
e.showTips(23);
});
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
BagItem: "BagItem",
ConfigData: "ConfigData",
GameData: "GameData",
LanguageMgr: "LanguageMgr",
PlatformMgr: "PlatformMgr",
PlayerData: "PlayerData",
ShareMgr: "ShareMgr",
Tools: "Tools",
Types: "Types",
UIUtil: "UIUtil"
} ],
GameData: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "5cfb4kp4ERN+5Ww8VUgrp0f", "GameData");
var n = e("Tools"), a = e("Types").Environment, o = cc.Class({
statics: {
instance: null,
init: function() {
if (null === o.instance) {
o.instance = new o();
o.instance.init();
}
},
cleanUp: function() {
o.instance && n.cleanUp(o.instance);
o.instance = null;
}
},
properties: {
mapWidth: 3600,
mapHeight: 6400,
_vibrateOpen: !0,
_audioOpen: !0,
logicFps: 60,
gameTime: 30,
initMapScreenNum: 7,
localHeroTid: 1,
screenWidth: 720,
screenHeight: 1280,
designSize: cc.size(720, 1280),
fatSize: cc.size(720, 1040),
isFitHeight: !1,
isLowHeight: !1,
screenSize: null,
knifeMin: 9,
knifeMax: 20,
speedRate: 1,
clientVersion: "0",
clientVersionCode: 0,
isInReview: !1,
resVersion: 0,
srcVersion: null,
environment: a.Publish
},
init: function() {
this.initMapScreenNum = 7;
this.mapWidth = 720 * this.initMapScreenNum;
this.mapHeight = 720 * this.initMapScreenNum;
this.frameSize = cc.view.getFrameSize();
this.screenSize = cc.view.getVisibleSizeInPixel();
var e = cc.find("Canvas");
this.screenWidth = e.width;
this.screenHeight = e.width * this.frameSize.height / this.frameSize.width;
this.ratio = this.frameSize.width / this.screenWidth;
this.screenOffset = (1280 - this.screenHeight) / 2;
var t = 1 * this.frameSize.height / this.frameSize.width, i = 1 * this.designSize.height / this.designSize.width, o = 1 * this.fatSize.height / this.fatSize.width;
if (!n.isFloatEqual(t, i)) {
this.isFitHeight = t > i;
this.isLowHeight = t < o;
}
console.log("ratio: " + this.ratio);
console.log("screen: " + this.screenWidth, this.screenHeight);
console.log("frameSize: " + this.frameSize);
console.log("screensize: " + this.screenSize);
var s = n.getItem("gameData");
if (s) {
var r = JSON.parse(s);
this._vibrateOpen = r._vibrateOpen;
this._audioOpen = r._audioOpen;
} else {
this._vibrateOpen = !0;
this._audioOpen = !0;
}
this.logicFps = 60;
this.gameTime = 90;
this.localHeroTid = 1;
this.knifeMin = 9;
this.knifeMax = 20;
this.speedRate = 1;
this.showVersion = "v1.0.18";
this.clientVersion = "10018";
this.resVersion = 6;
this.srcVersion = this.resVersion;
this.clientVersionCode = Number.parseInt(this.clientVersion);
this.isInReview = !1;
this.environment = a.Publish;
},
isShowLog: function() {
return this.isEnvironmentTest();
},
isEnvironmentTest: function() {
return this.environment === a.Test || this.environment === a.Develop;
},
isEnvironmentPublish: function() {
return this.environment === a.Publish || this.environment === a.Trial;
},
isEnvironmentCheckUpdate: function() {
return !0;
},
setAudio: function(e) {
o.instance._audioOpen = e;
this.saveGameData();
},
setVibrate: function(e) {
o.instance._vibrateOpen = e;
this.saveGameData();
},
saveGameData: function() {
var e = {
_vibrateOpen: this._vibrateOpen,
_audioOpen: this._audioOpen
};
n.setItem("gameData", JSON.stringify(e));
},
logUseTime: function(e) {
if (this._curTime && this.isShowLog()) {
var t = n.getTimestampMS();
console.log(e + "用时: " + (t - this._curTime) + " ms");
this._curTime = t;
}
},
isPad: function() {
return this.screenHeight < 1200 || this.screenHeight / this.screenWidth < 16 / 9;
},
isLongScreen: function() {
return this.screenHeight > 1300 || this.screenHeight / this.screenWidth > 16 / 9;
}
});
cc._RF.pop();
}, {
Tools: "Tools",
Types: "Types"
} ],
GameRuleSystem: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "bf3bea8pWtLs6ACPjZhM6LO", "GameRuleSystem");
e("Tools"), cc.Class({
extends: cc.Component,
properties: {
_countDownTime: 99,
players: []
},
cleanUp: function() {
this.players = [];
},
init: function(e, t, i, n, a) {
this._gameOverFunc = e;
this._localPlayer = t;
var o = !0, s = !1, r = void 0;
try {
for (var c, l = i[Symbol.iterator](); !(o = (c = l.next()).done); o = !0) {
var h = c.value;
this.players.push(h);
}
} catch (e) {
s = !0;
r = e;
} finally {
try {
!o && l.return && l.return();
} finally {
if (s) throw r;
}
}
this._countDownTime = n;
this._allDead = !1;
this._reviveFunc = a;
this.isRevive = !1;
this.isGameOver = !1;
},
updateGameLogic: function(e) {
if (!this.isGameOver) {
this._countDownTime -= e;
if (this._countDownTime <= 0) this.onGameOver(); else if (!this._localPlayer.firstDead || this.isRevive) if (this._localPlayer.isDead) this.onGameOver(); else {
this._allDead = !0;
var t = !0, i = !1, n = void 0;
try {
for (var a, o = this.players[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
var s = a.value;
if (!s.isLocal && !s.isDead) {
this._allDead = !1;
break;
}
}
} catch (e) {
i = !0;
n = e;
} finally {
try {
!t && o.return && o.return();
} finally {
if (i) throw n;
}
}
this._allDead && this.onGameOver();
} else this.onRevive();
}
},
onGameOver: function() {
if (this._gameOverFunc) {
this._gameOverFunc();
this._gameOverFunc = null;
this.isGameOver = !0;
}
},
onRevive: function() {
if (this._reviveFunc) {
this._reviveFunc();
this.isRevive = !0;
}
},
onContinue: function() {
this.isRevive = !1;
}
});
cc._RF.pop();
}, {
Tools: "Tools"
} ],
Gif: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "1fc82NvN/5FTYSZcPMNg6XY", "Gif");
var n = e("WeiShuSdk"), a = e("PlatformMgr");
cc.Class({
extends: cc.Component,
properties: {
btn: cc.Button,
app: cc.Label,
listCfg: [],
display: !1,
autoRef: !1,
seqSlot: !0,
bog: 5,
swTimes: 2,
anim: cc.Animation,
playTimes: 0
},
enableDisplay: function() {
this.cfg ? this.node.opacity = 255 : this.display = !0;
},
onLoad: function() {
this.node.opacity = 0;
if (!(n.userData.vidStamp && n.getTimeSpanAt0() < n.userData.vidStamp)) {
this.idx = -1;
this.processCfg();
this.btn.node.on("click", this.onNav, this);
}
},
onDisable: function() {
this.btn.node.off("click", this.onNav, this);
this.autoRef && this.anim.off("stop", this.chkAutoRef, this);
},
onEnable: function() {
this.btn.node.on("click", this.onNav, this);
this.autoRef && this.anim.on("stop", this.chkAutoRef, this);
},
processCfg: function() {
var e = n.baseUrl + "Gif2End/knife666_gif.json";
this.listCfg = [];
var t = this;
cc.loader.load(e, function(e, i) {
if (i && i.data) {
t.listCfg = i.data;
t.autoRef = !!i.autoRef;
t.seqSlot = !!i.seqSlot;
t.bog = i.bog;
t.swTimes = i.swTimes;
t.playTimes = 0;
t.regBoards();
t.anim.on("stop", t.chkAutoRef, t);
}
});
},
regBoards: function() {
if (this.listCfg) {
var e = this.listCfg.length;
this.seqSlot ? this.idx = this.idx >= e - 1 ? 0 : this.idx + 1 : this.idx = Math.random() * e | 0;
var t = this.listCfg[this.idx];
t && this.fetchAd(t);
}
},
fetchAd: function(e) {
if (1 == e.mod) {
if (this.anim.getAnimationState(e.raw)) {
this.playNext(e, e.raw);
return;
}
for (var t = [], i = 1; i < e.count; i++) t.push(n.baseUrl + "Gif2End/anim/" + e.raw + "/" + i + ".png");
var a = this;
cc.loader.load(t, function(i, n) {
for (var o = [], s = 0; s < e.count - 1; s++) {
var r = new cc.SpriteFrame(t[s]);
o.push(r);
}
var c = cc.AnimationClip.createWithSpriteFrames(o, e.interval);
c.name = e.raw;
c.speed = 1;
a.anim.addClip(c);
a.playNext(e, e.raw);
});
} else {
var o = e.raw.split(".")[0];
if (this.anim.getAnimationState(o)) {
this.playNext(e, o);
this.autoRef && this.scheduleOnce(this.regBoards, this.bog);
return;
}
var s = n.baseUrl + "Gif2End/img/" + e.raw, r = new cc.SpriteFrame(s), c = cc.AnimationClip.createWithSpriteFrames([ r ]);
c.name = o;
c.speed = 1;
this.anim.addClip(c);
this.playNext(e, o);
this.autoRef && this.scheduleOnce(this.regBoards, this.bog);
}
},
playNext: function(e, t) {
this.anim.play(t);
this.cfg = e;
this.app.string = e.name;
this.display && (this.node.opacity = 255);
},
chkAutoRef: function() {
if (this.autoRef) {
this.playTimes += 1;
if (1 == this.cfg.mod) if (this.playTimes < this.swTimes) this.anim.play(this.anim.currentClip.name); else {
this.playTimes = 0;
this.regBoards();
}
} else this.anim.play(this.anim.currentClip.name);
},
onNav: function() {
var e = this;
this.cfg && wx.navigateToMiniProgram && wx.navigateToMiniProgram({
appId: e.cfg.appid,
path: e.cfg.path,
success: function(t) {
console.log("nav successed");
a.adStatis(e.cfg);
},
fail: function(t) {
e.unschedule(e.regBoards);
e.playTimes = 0;
e.regBoards();
}
});
}
});
cc._RF.pop();
}, {
PlatformMgr: "PlatformMgr",
WeiShuSdk: "WeiShuSdk"
} ],
GoldAnim: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "e50d2RI5n5E1pKgsWO5DGZO", "GoldAnim");
cc.Class({
extends: cc.Component,
properties: {
coin: cc.Prefab,
editBox: cc.EditBox
},
start: function() {
this.arr = [];
for (var e = 0; e < 3; e++) {
this.arr[e] = [];
for (var t = 0; t < 20; t++) {
var i = cc.instantiate(this.coin);
i.parent = this.node;
i.opacity = 0;
this.arr[e].push(i);
}
}
},
onClick: function(e, t, i, n) {
for (var a = this, o = function(e) {
setTimeout(function() {
for (var o = function(o) {
var s = a.arr[e][o];
s.opacity = 255;
(r = cc.v2(250 * Math.cos(o / t * 2 * Math.PI) + i.x, 300 * Math.sin(o / t * 2 * Math.PI) + i.y)).y > 0 ? r.y += r.y / 2 : r.y += 100 * Math.random() + 100;
var c = cc.moveTo(.2 * Math.random() + .4, r).easing(cc.easeCircleActionInOut(1)), l = cc.moveTo(.2 * Math.random() + .6, n).easing(cc.easeCircleActionInOut(1)), h = cc.callFunc(function() {
s.opacity = 0;
});
s.position = i;
s.stopAllActions();
s.runAction(cc.sequence(c, l, h));
}, s = 0; s < t; s++) {
var r;
o(s);
}
}, 400 * e);
}, s = 0; s < e; s++) o(s);
},
update: function() {},
onset: function() {
cc.director.getScheduler().setTimeScale(Number.parseFloat(this.editBox.string));
},
onGetNormal: function(e, t, i) {
this.onClick(1, 10, t, i);
setTimeout(e, 1e3);
},
onGetMore: function(e, t, i) {
this.onClick(1, 20, t, i);
setTimeout(e, 1400);
},
onGetLucky: function(e, t, i) {
this.onClick(3, 20, t, i);
setTimeout(e, 1800);
}
});
cc._RF.pop();
}, {} ],
GuideSystem: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "5d0f12qqj5N7pdC/aKvuAnE", "GuideSystem");
var n = e("Tools"), a = e("Types").KnifeState, o = e("ConfigData"), s = e("PlayerData");
cc.Class({
extends: cc.Component,
properties: {},
init: function(e) {
this.world = e;
this.uiMgr = e.uiMgr;
this.state = 0;
this.localPlayer = e.localPlayer;
this.players = e.players;
this.knifes = e.landKnifes;
this.captureTime = 0;
this.fixTime = 0;
this.killTime = 0;
this.releaseTime = 0;
this.defenceTime = 0;
this.dir = 1;
this.wall = e.guideWall;
this.wall.active = !0;
this.wall.opacity = 100;
this.wall.width = 1520;
this.wall.height = 2640;
this.guideData = o.instance.guideData;
},
updateGameLogic: function(e) {
var t = this;
if (!this.allComplete) {
if (!this.flag) {
this.uiMgr.showGuideStart(0);
var i = !0, a = !1, o = void 0;
try {
for (var r, c = this.knifes[Symbol.iterator](); !(i = (r = c.next()).done); i = !0) {
var l = r.value;
l.node.position = cc.v2(n.getRandomInt(-360, 360), n.getRandomInt(-640, 640));
l._arrowEffect.position = l.node.position;
}
} catch (e) {
a = !0;
o = e;
} finally {
try {
!i && c.return && c.return();
} finally {
if (a) throw o;
}
}
this.flag = !0;
}
this.fixHeroMove(this.localPlayer);
switch (this.state) {
case 0:
this.captureTime += e;
var h = this.localPlayer.followPlayer.knivesCmp.knives.length;
if (h !== this.knifeLength) {
this.knifeLength = h;
var d = h + "/" + (12 + s.instance.extraKnifeCount);
this.uiMgr.refreshGuideProcess(d);
this.captureTime = 0;
}
if (this.captureTime > 5) this.fixKnife(e); else if (0 === this.captureTime) {
var u = !0, f = !1, p = void 0;
try {
for (var m, g = this.knifes[Symbol.iterator](); !(u = (m = g.next()).done); u = !0) {
m.value._arrowEffect.active = !1;
}
} catch (e) {
f = !0;
p = e;
} finally {
try {
!u && g.return && g.return();
} finally {
if (f) throw p;
}
}
}
h >= 12 + s.instance.extraKnifeCount && this.onComplete();
break;

case 1:
this.killTime += e;
var y = this.players[1].node, v = this.players[1].isDead;
if (!y.active && !v) {
y.active = !0;
this.players[1].followPlayer.node.active = !0;
y.position = this.localPlayer.node.position.add(cc.v2(0, 1e3));
y.emit("changeSpeedRate", this.guideData.firstSpeed);
}
this.fixAIMove(this.players[1], this.localPlayer);
v && this.onComplete();
if (this.killTime > 5 && !this.isComplete) {
this.uiMgr.showGuideSpecial(this.state);
this.killTime = 2;
}
break;

case 2:
if (this.flag_2) break;
this.releaseTime += e;
if (this.localPlayer.isDefence && this.releaseTime > 2) {
this.flag_2 = !0;
this.localPlayer.stopControl();
setTimeout(function() {
t.onComplete();
}, 1e3);
}
if (this.releaseTime > 5 && !this.isComplete) {
this.uiMgr.showGuideSpecial(this.state);
this.releaseTime = 2;
}
break;

case 3:
this.defenceTime += e;
if (!(y = this.players[2].node).active && !this.players[2].isDead) {
y.active = !0;
this.players[2].followPlayer.node.active = !0;
y.position = this.localPlayer.node.position.add(cc.v2(500, 1e3));
y.emit("changeSpeedRate", this.guideData.secondSpeed);
}
if (!(y = this.players[3].node).active && !this.players[3].isDead) {
y.active = !0;
this.players[3].followPlayer.node.active = !0;
y.position = this.localPlayer.node.position.add(cc.v2(-500, -1e3));
y.emit("changeSpeedRate", this.guideData.secondSpeed);
}
if (this.defenceTime > 2) {
this.fixAIMove(this.players[2], this.localPlayer);
this.fixAIMove(this.players[3], this.localPlayer);
}
(v = this.players[2].isDead && this.players[3].isDead) && this.onComplete();
this.localPlayer.node.on(cc.Node.EventType.TOUCH_START, function() {
t.isComplete || t.uiMgr.showGuideSpecial(t.state);
}, this);
break;

case 4:
this.allComplete = !0;
this.world.guideGameOverCallF();
}
}
},
onComplete: function() {
var e = this;
if (!this.isComplete) {
this.isComplete = !0;
this.uiMgr.showGuideEnd(this.state);
this.state > 3 || setTimeout(function() {
e.state++;
e.uiMgr.showGuideStart(e.state);
e.isComplete = !1;
}, 2e3);
}
},
fixHeroMove: function(e) {
this.wall.opacity = 100;
var t = e.node, i = e.colliderNode.getComponent(cc.Collider), n = i.radius * i.node.parent.scale, a = (this.wall.width - 80) / 2 - n - Math.abs(t.position.x);
if (a < 0) {
this.wall.opacity = 255;
this.uiMgr.showGuideSpecial(this.state);
t.x += t.x > 0 ? a : -a;
}
var o = (this.wall.height - 80) / 2 - n - Math.abs(t.position.y);
if (o < 0) {
this.wall.opacity = 255;
this.uiMgr.showGuideSpecial(this.state);
t.y += t.y > 0 ? o : -o;
}
},
fixAIMove: function(e, t) {
var i = t.node.position.sub(e.node.position).normalize();
e.node.emit("onMoveBy", {
dPos: i
});
},
fixKnife: function(e) {
var t = !0, i = !1, n = void 0;
try {
for (var o, s = this.knifes[Symbol.iterator](); !(t = (o = s.next()).done); t = !0) {
var r = o.value;
r.knifeStateComp.state === a.Normal && (r._arrowEffect.active || (r._arrowEffect.active = !0));
}
} catch (e) {
i = !0;
n = e;
} finally {
try {
!t && s.return && s.return();
} finally {
if (i) throw n;
}
}
}
});
cc._RF.pop();
}, {
ConfigData: "ConfigData",
PlayerData: "PlayerData",
Tools: "Tools",
Types: "Types"
} ],
HeroCollisionHandleSystem: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "90c23cuROVNU7VqVWpLJ3Pb", "HeroCollisionHandleSystem");
var n = e("BaseCollisionHandleSystem"), a = e("VibrateUtil"), o = e("GameData");
cc.Class({
extends: n,
properties: {
_eventListName: {
default: "_heroCollisionEvent",
override: !0
}
},
handelCollisionEvent: function(e) {
var t = this, i = e[0], n = e[1];
switch (i.node.group) {
case "knife":
case "ray":
if (i.tag === n.tag || 0 === i.tag) return;
i.tag === o.instance.localHeroTid && a.vibrate(!0);
if (!this.isKillingByGuide) {
n.node.emit("emitEvent", [ "die", i ]);
this.node.emit("killMessageShow", e);
}
break;

case "block":
n.node.emit("emitEvent", [ "fixByBlock", i ]);
break;

case "pickKnife":
if (i.tag === n.tag || 0 === i.tag) return;
if (this.isKillingByGuide) return;
this.isKillingByGuide = !0;
n.node.emit("emitEvent", [ "killByGuide", i ]);
setTimeout(function() {
i.tag === o.instance.localHeroTid && a.vibrate(!0);
n.node.emit("emitEvent", [ "die", i ]);
t.node.emit("killMessageShow", e);
t.isKillingByGuide = !1;
}, 1e3);
i.node.parent.emit("catchEnemy", n.node.parent.position);
}
},
updateGameLogic: function(e) {
this._super(e);
this._collisionEventMgr.clearHeroEvent();
}
});
cc._RF.pop();
}, {
BaseCollisionHandleSystem: "BaseCollisionHandleSystem",
GameData: "GameData",
VibrateUtil: "VibrateUtil"
} ],
HeroCollisionWallListener: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "69bb2ZXcVRFn4gtGfUyEd/9", "HeroCollisionWallListener");
cc.Class({
extends: cc.Component,
properties: {
collider: cc.CircleCollider,
_wallCollisionCount: 0
},
onLoad: function() {
this.collider = this.node.getComponent(cc.CircleCollider);
this.node.on("radiusChange", this.radiusChange, this);
},
radiusChange: function(e) {
this.collider.radius = e;
},
onCollisionEnter: function() {
0 === this._wallCollisionCount && this.noticeWallCollision(!0);
this._wallCollisionCount++;
},
onCollisionExit: function() {
this._wallCollisionCount--;
0 === this._wallCollisionCount && this.noticeWallCollision(!1);
},
noticeWallCollision: function(e) {
this.node.emit("wallCollision", e);
}
});
cc._RF.pop();
}, {} ],
HeroFlag: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "0380cn25/BGx6h7pXd1EctD", "HeroFlag");
cc.Class({
extends: cc.Component,
properties: {
icon: cc.Sprite
},
start: function() {}
});
cc._RF.pop();
}, {} ],
HeroFrenzyBar: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "62f325G1IVAJYvL48o+Cel0", "HeroFrenzyBar");
cc.Class({
extends: cc.Component,
properties: {
_player: null,
_frenzyComp: null,
frenzyBar: cc.Sprite,
activeNode: cc.Node
},
init: function(e) {
this._player = e;
this._frenzyComp = e.node.getComponent("PlayerFrenzyComponent");
},
update: function(e) {
if (this._active !== this._player.activeNode.active) {
this._active = this._player.activeNode.active && this._frenzyComp;
this.activeNode.active = this._active;
}
this._frenzyComp && this.frenzyBar && (this.frenzyBar.fillRange = this._frenzyComp.getFrenzyRate());
}
});
cc._RF.pop();
}, {} ],
HeroKey: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "41ac7uDOFBEub+fSrPYc/Ig", "HeroKey");
cc.Class({
extends: cc.Component,
properties: {},
die: function() {}
});
cc._RF.pop();
}, {} ],
HeroKnifeNum: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "fdb04yjgs9OPYgl5JAy6/Hy", "HeroKnifeNum");
cc.Class({
extends: cc.Component,
properties: {
_player: null,
knifeNumLab: cc.Label,
_knifeNum: -1,
crownNode: cc.Node,
activeNode: cc.Node
},
init: function(e) {
this._player = e;
},
update: function(e) {
if (this._active !== this._player.activeNode.active) {
this._active = this._player.activeNode.active;
this.activeNode.active = this._active;
}
if (this._knifeNum !== this._player.getKnifeNum()) {
this._knifeNum = this._player.getKnifeNum();
this.knifeNumLab.string = this._knifeNum;
}
this.crownNode.active !== (1 === this._player.rank) && (this.crownNode.active = 1 === this._player.rank);
}
});
cc._RF.pop();
}, {} ],
HeroMoveFixByBlock: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "c74aeix1J5Ns7KFdCNz8ZOy", "HeroMoveFixByBlock");
var n = e("Tools");
cc.Class({
extends: cc.Component,
properties: {
lastPos: cc.v2(0, 0),
_collider: null,
_collisionBlocks: [],
_fixDir: null,
_minX: null,
_maxX: null,
_minY: null,
_maxY: null,
_collisionFix: [],
_offset: 6,
_wallColliders: []
},
onLoad: function() {
this.node.on("fixByBlock", this.fixByBlock, this);
},
init: function(e) {
this._collider = e;
},
fixByBlock: function(e) {
n.arrContains(this._collisionBlocks, e) || this._collisionBlocks.push(e);
},
updateGameLogic: function(e) {
var t = !0, i = !1, n = void 0;
try {
for (var a, o = this._collisionBlocks[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
var s = a.value;
this.fixPositionByBlock(s);
}
} catch (e) {
i = !0;
n = e;
} finally {
try {
!t && o.return && o.return();
} finally {
if (i) throw n;
}
}
this.reset();
},
fixPositionByBlock: function(e) {
if (this.lastPos.x !== this.node.position.x || this.lastPos.y !== this.node.position.y) {
this.lastPos = this.node.position;
var t = this._collider.radius * this._collider.node.parent.scale, i = this.node.convertToWorldSpaceAR(this._collider.node.position), n = e.node.convertToNodeSpaceAR(i), a = null, o = 0, s = n.normalize();
if (e.radius) o = n.mag() - t - e.radius * e.node.scale; else {
if (n.x <= e.size.width / 2 && n.x >= -e.size.width / 2) {
var r = n.y >= 0 ? 1 : -1;
a = cc.v2(0, r);
o = Math.abs(n.y) - (e.size.height / 2 + t);
} else if (n.y <= e.size.height / 2 && n.y >= -e.size.height / 2) {
r = n.x >= 0 ? 1 : -1;
a = cc.v2(r, 0);
o = Math.abs(n.x) - (e.size.width / 2 + t);
} else {
var c = cc.v2((n.x >= 0 ? 1 : -1) * e.size.width / 2, (n.y >= 0 ? 1 : -1) * e.size.height / 2);
a = n.sub(c).normalize();
o = n.sub(c).mag() - t;
}
s = a.rotate(e.node.rotation);
}
if (!(o > 0)) {
o -= this._offset;
this.node.position = this.node.position.add(s.mul(-o));
}
}
},
checkNeedDie: function() {
var e = this.node.position;
(null !== this._minX && e.x < this._minX || null !== this._maxX && e.x > this._maxX || null !== this._minY && e.y < this._minY || null !== this._maxY && e.y > this._maxY) && this.die();
},
die: function() {
this.node.emit("die");
},
reset: function() {
this._collisionBlocks = [];
this._collisionFix = [];
this._minX = null;
this._maxX = null;
this._minY = null;
this._maxY = null;
}
});
cc._RF.pop();
}, {
Tools: "Tools"
} ],
HeroMoveFixByCircle: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "798564vaPNPY4uA17ovYpWR", "HeroMoveFixByCircle");
cc.Class({
extends: cc.Component,
properties: {
lastPos: cc.v2(0, 0)
},
init: function(e, t) {
this.followPlayer = t;
this._collider = e;
this.attackRadius = 0;
},
onLoad: function() {
this.node.on("radiusChange", this.radiusChange, this);
},
radiusChange: function(e) {
this.attackRadius = e;
},
refresh: function(e, t) {
this.width = e / 2;
this.height = t / 2;
},
updateGameLogic: function() {
if (this.lastPos.x !== this.node.position.x || this.lastPos.y !== this.node.position.y) {
this.lastPos = this.node.position;
var e = this._collider.radius * this._collider.node.parent.scale, t = this.node.position.normalize();
(n = this.width - e - this.node.position.mag()) < 0 && (this.node.position = this.node.position.add(t.mul(n)));
var i = 0;
this.followPlayer && (i = this.attackRadius * this.followPlayer.node.scale);
var n;
t = this.node.position.normalize();
if ((n = this.width - i - this.node.position.mag()) < 0) {
if (!this.isColl) {
this.isColl = !0;
this.node.emit("isCollCircleWall", !0);
}
} else if (this.isColl) {
this.isColl = !1;
this.node.emit("isCollCircleWall", !1);
}
}
}
});
cc._RF.pop();
}, {} ],
HeroMoveFix: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "801beZ2wztG3awu8hV9+di0", "HeroMoveFix");
var n = e("Tools");
cc.Class({
extends: cc.Component,
properties: {
lastPos: cc.v2(0, 0),
_collider: null,
_collisionBlocks: [],
_fixDir: null,
_minX: null,
_maxX: null,
_minY: null,
_maxY: null,
_collisionFix: [],
_offset: 6,
_wallColliders: []
},
onLoad: function() {},
init: function(e) {
this._collider = e;
},
initWalls: function(e) {
this._wallColliders = [];
var t = !0, i = !1, n = void 0;
try {
for (var a, o = e[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
var s = a.value;
this._wallColliders.push(s.getComponent("EntityWall").wallCollider);
}
} catch (e) {
i = !0;
n = e;
} finally {
try {
!t && o.return && o.return();
} finally {
if (i) throw n;
}
}
},
refresh: function(e) {},
fixByBlock: function(e) {
n.arrContains(this._collisionBlocks, e) || this._collisionBlocks.push(e);
},
updateGameLogic: function(e) {
if (this.lastPos.x !== this.node.position.x || this.lastPos.y !== this.node.position.y) {
this.lastPos = this.node.position;
var t = !0, i = !1, n = void 0;
try {
for (var a, o = this._wallColliders[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
var s = a.value;
this.fixPositionByWall(s);
}
} catch (e) {
i = !0;
n = e;
} finally {
try {
!t && o.return && o.return();
} finally {
if (i) throw n;
}
}
var r = !0, c = !1, l = void 0;
try {
for (var h, d = this._collisionBlocks[Symbol.iterator](); !(r = (h = d.next()).done); r = !0) {
var u = h.value;
this.fixPositionByBlock(u);
}
} catch (e) {
c = !0;
l = e;
} finally {
try {
!r && d.return && d.return();
} finally {
if (c) throw l;
}
}
this.checkNeedDie();
this.reset();
}
},
fixPositionByBlock: function(e) {
var t = this._collider.radius * this._collider.node.parent.scale, i = this.node.convertToWorldSpaceAR(this._collider.node.position), n = e.node.convertToNodeSpaceAR(i), a = null, o = 0;
if (n.x <= e.size.width / 2 && n.x >= -e.size.width / 2) {
var s = n.y >= 0 ? 1 : -1;
a = cc.v2(0, s);
o = Math.abs(n.y) - (e.size.height / 2 + t);
} else if (n.y <= e.size.height / 2 && n.y >= -e.size.height / 2) {
s = n.x >= 0 ? 1 : -1;
a = cc.v2(s, 0);
o = Math.abs(n.x) - (e.size.width / 2 + t);
} else {
var r = cc.v2((n.x >= 0 ? 1 : -1) * e.size.width / 2, (n.y >= 0 ? 1 : -1) * e.size.height / 2);
a = n.sub(r).normalize();
o = n.sub(r).mag() - t;
}
if (!(o > 0)) {
var c = a.rotate(e.node.rotation);
o -= this._offset;
this.node.position = this.node.position.add(c.mul(-o));
}
},
fixPositionByWall: function(e) {
var t = e, i = this._collider;
switch (t.tag) {
case 0:
this._maxY = t.node.parent.y - t.size.height / 2 - i.radius * i.node.parent.scale - this._offset;
this.node.y > this._maxY && (this.node.y = this._maxY);
break;

case 1:
this._minY = t.node.parent.y + t.size.height / 2 + i.radius * i.node.parent.scale + this._offset;
this.node.y < this._minY && (this.node.y = this._minY);
break;

case 2:
this._minX = t.node.parent.x + t.size.width / 2 + i.radius * i.node.parent.scale + this._offset;
this.node.x < this._minX && (this.node.x = this._minX);
break;

case 3:
this._maxX = t.node.parent.x - t.size.width / 2 - i.radius * i.node.parent.scale - this._offset;
this.node.x > this._maxX && (this.node.x = this._maxX);
}
},
checkNeedDie: function() {
var e = this.node.position;
(null !== this._minX && e.x < this._minX - 1 || null !== this._maxX && e.x > this._maxX + 1 || null !== this._minY && e.y < this._minY - 1 || null !== this._maxY && e.y > this._maxY + 1) && this.die();
},
die: function() {
this.node.emit("die");
},
reset: function() {
this._collisionWalls = [];
this._collisionBlocks = [];
this._collisionFix = [];
this._minX = null;
this._maxX = null;
this._minY = null;
this._maxY = null;
}
});
cc._RF.pop();
}, {
Tools: "Tools"
} ],
HeroMove: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "85b52CRGhZHnJuGKmKyoOXW", "HeroMove");
var n = e("GameData");
cc.Class({
extends: cc.Component,
properties: {
moveSpeed: 504,
moveSpeedRate: 1,
skinSpeedAddition: 0,
growSpeedAddition: 0,
attackBoxSpeedRate: 1,
finalAttackBoxSpeedRate: 1,
attackBoxTime: 0
},
onLoad: function() {
this.node.on("onMoveBy", this.onMoveByKeyboard, this);
this.node.on("onStopMoving", this.onStopMovingByKeyboard, this);
this.node.on("changeSpeedRate", this.changeSpeedRate, this);
this.node.on("onAttackBox", this.onAttackBox, this);
this.node.on("onStopMove", this.onStopMove, this);
},
init: function(e) {},
onStopMove: function(e) {
this.stopMove = e;
},
onAttackBox: function() {
console.log("撞到盒子");
this.isSlow = !0;
this.attackBoxTime = 0;
this.changeFinalAttackBoxSpeedRate(.4);
},
changeFinalAttackBoxSpeedRate: function(e) {
this.finalAttackBoxSpeedRate = e;
this.speedPer = e - this.attackBoxSpeedRate;
},
changeSpeedRate: function(e) {
this.moveSpeedRate = e;
},
changeSkinSpeedAddition: function(e) {
this.skinSpeedAddition = e;
},
changeGrowSpeedAddition: function(e) {
this.growSpeedAddition = e;
},
onMoveByKeyboard: function(e) {
this.onMoveBy(e.dPos);
},
onMoveBy: function(e) {
this._moveByPos = e;
},
onStopMovingByKeyboard: function() {
this._moveByPos = null;
},
onNodeMoveBy: function(e) {
if (this._moveByPos) {
var t = this._moveByPos.normalize();
this.node.x += this.moveSpeed * this.attackBoxSpeedRate * (this.moveSpeedRate + this.skinSpeedAddition + this.growSpeedAddition) * n.instance.speedRate * t.x * e;
this.node.y += this.moveSpeed * this.attackBoxSpeedRate * (this.moveSpeedRate + this.skinSpeedAddition + this.growSpeedAddition) * n.instance.speedRate * t.y * e;
}
},
updateGameLogic: function(e) {
this.stopMove || this.onNodeMoveBy(e);
},
getCurSpeed: function() {
return this.moveSpeed * (this.moveSpeedRate + this.skinSpeedAddition) * n.instance.speedRate;
}
});
cc._RF.pop();
}, {
GameData: "GameData"
} ],
HeroPosArrow: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "4749aseX3JBTY9W8MrmFYRu", "HeroPosArrow");
e("Tools");
var n = e("GameData"), a = e("UtilPhysics"), o = e("Types").TEAM_COLOR;
cc.Class({
extends: cc.Component,
properties: {
rootNode: cc.Node,
ballNode: cc.Node,
keyNode: cc.Node,
centerNode: cc.Node,
triangleNode: cc.Node,
_player: null,
_otherPlayer: null,
_camera: null,
_width: 0,
_height: 0,
_rect: null,
_worldRect: null,
_otherRect: null,
_needUpdate: !0,
localPos: null,
otherPos: null
},
init: function(e, t, i) {
var a = t.teamID;
this.ballNode.color = o[a];
this.triangleNode.color = o[a];
this.keyNode.active = t.isKey;
this.ballNode.active = !t.isKey;
this._player = e;
this._otherPlayer = t;
this._camera = i;
this._width = n.instance.screenWidth;
this._height = n.instance.screenHeight;
this._rect = new cc.rect(.9 * -this._width / 2, .9 * -this._height / 2, .9 * this._width, .9 * this._height);
this._worldRect = new cc.rect(-this._width / 2, -this._height / 2, this._width, this._height);
this._otherRect = new cc.rect(0, 0, t.defenceRect.getRect().width, t.defenceRect.getRect().height);
this._needUpdate = !0;
},
changeLocalPlayer: function(e) {
this._player = e;
},
getArrowPos: function(e, t, i) {
return a.checkMovePointCollideRectReturnHitPos(e, t.sub(e), i);
},
setActive: function(e) {
this.rootNode.active !== e && (this.rootNode.active = e);
},
update: function(e) {
if (this._needUpdate) {
if (this._otherPlayer.isDead) {
this.setActive(!1);
this._needUpdate = !1;
return;
}
if (this._otherPlayer.isKey !== this.keyNode.active) {
this.keyNode.active = this._otherPlayer.isKey;
this.ballNode.active = !this._otherPlayer.isKey;
}
this.localPos = this._player.node.position.sub(this._camera.node.position);
this.otherPos = this._otherPlayer.node.position.sub(this._camera.node.position);
this._worldRect.center = this.localPos;
this._worldRect.width = this._width / this._camera.zoomRatio;
this._worldRect.height = this._height / this._camera.zoomRatio;
this._otherRect.center = this.otherPos;
this._otherRect.width = this._otherPlayer.defenceRect.getRect().width;
this._otherRect.height = this._otherPlayer.defenceRect.getRect().height;
if (this._worldRect.intersects(this._otherRect)) this.setActive(!1); else {
this.setActive(!0);
var t = this.getArrowPos(this.localPos, this.otherPos, this._rect);
t[0] && (this.node.position = t[1]);
}
this._deg = cc.misc.radiansToDegrees(Math.atan2(this.otherPos.y, this.otherPos.x));
this.centerNode.rotation = -this._deg;
}
}
});
cc._RF.pop();
}, {
GameData: "GameData",
Tools: "Tools",
Types: "Types",
UtilPhysics: "UtilPhysics"
} ],
HeroReviveSystem: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "bd821rhg6dLdrmV9HRXoyV7", "HeroReviveSystem");
var n = e("Types").HeroRebornEffectState;
cc.Class({
extends: cc.Component,
properties: {
players: []
},
cleanUp: function() {
this.players = [];
},
init: function(e, t, i) {
var n = !0, a = !1, o = void 0;
try {
for (var s, r = e[Symbol.iterator](); !(n = (s = r.next()).done); n = !0) {
var c = s.value;
this.players.push(c);
}
} catch (e) {
a = !0;
o = e;
} finally {
try {
!n && r.return && r.return();
} finally {
if (a) throw o;
}
}
this._reviveFunc = t;
this._showRebornFunc = i;
},
updateGameLogic: function(e) {
var t = !0, i = !1, a = void 0;
try {
for (var o, s = this.players[Symbol.iterator](); !(t = (o = s.next()).done); t = !0) {
var r = o.value;
if (!r.isLocal && r.firstDead) if (r.canRevive()) {
r.updateReviveLogic(e);
r.waitToRevive && this.onRevive(r, !0);
if (r.showRebornEffect === n.waitToShow) {
r.showRebornEffect = n.Open;
this.onShowReborn(r);
}
} else this.onRevive(r, !1);
}
} catch (e) {
i = !0;
a = e;
} finally {
try {
!t && s.return && s.return();
} finally {
if (i) throw a;
}
}
},
onRevive: function(e, t) {
this._reviveFunc && this._reviveFunc(e, t);
},
onShowReborn: function(e) {
this._showRebornFunc && this._showRebornFunc(e);
}
});
cc._RF.pop();
}, {
Types: "Types"
} ],
HeroRotate: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "efaa3yoOiJI2LNjR0ED/6h8", "HeroRotate");
cc.Class({
extends: cc.Component,
properties: {
rotateSpeed: 150,
isStop: !1,
stopKeepTime: .1,
_stopTime: 0
},
onLoad: function() {
this.node.on("stopParentRotate", this.stopRotate, this);
},
stopRotate: function() {
this.isStop = !0;
this._stopTime = 0;
},
updateLogic: function(e) {
if (this.isStop) {
if (this._stopTime < this.stopKeepTime) {
this._stopTime += e;
return;
}
this.isStop = !1;
}
this.node.rotation += this.rotateSpeed * e;
this.node.rotation >= 360 && (this.node.rotation -= 360);
}
});
cc._RF.pop();
}, {} ],
HeroScale: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "97d14r1EH9P4qSrrNeqQEv9", "HeroScale");
e("Types").BuffState;
cc.Class({
extends: cc.Component,
properties: {
scaleMultip: 1,
newScaleMultip: 1
},
init: function(e) {
this.player = e;
this.node.on("changeScaleMultip", this.changeScaleMultip, this);
},
changeScaleMultip: function(e) {
this.newScaleMultip = e;
this.scalePer = this.newScaleMultip - this.scaleMultip;
},
updateGameLogic: function(e) {
if (this.newScaleMultip !== this.scaleMultip) {
this.scaleMultip += this.scalePer * e;
this.scalePer > 0 ? this.scaleMultip > this.newScaleMultip && (this.scaleMultip = this.newScaleMultip) : this.scaleMultip < this.newScaleMultip && (this.scaleMultip = this.newScaleMultip);
}
var t = this.player.followPlayer.knivesCmp.knives.length, i = .125 * (t < 8 ? 0 : t - 8) + 1;
i > 2.5 && (i = 2.5);
i *= this.scaleMultip;
this.node.scale !== i && (this.node.scale = i);
}
});
cc._RF.pop();
}, {
Types: "Types"
} ],
ItemDailyTask: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "e600c7y279LL4e2lgWl+RBL", "ItemDailyTask");
var n = e("ListItemBase"), a = e("PlayerData"), o = e("Types").ItemType, s = e("UIUtil"), r = new cc.Color().fromHEX("#b55b12"), c = new cc.Color().fromHEX("#2c325b");
cc.Class({
extends: n,
properties: {
nameLabel: cc.Label,
introduceLabel: cc.Label,
tipsNode: cc.Node,
taskStartLabel: cc.Label,
taskProgressLabel: cc.Label,
taskFinalLabel: cc.Label,
newNode: cc.Node,
rewardIcon: cc.Sprite,
rewardLabel: cc.Label,
isCompleteNode: cc.Node,
jumpBtn: cc.Node,
getBtn: cc.Node,
hasGetNode: cc.Node,
zongZiIcon: cc.Node,
coinIcon: cc.Node,
skinIcon: cc.Sprite,
refreshAnim: cc.Animation,
isProcessNode: cc.Node,
processBar: cc.Node,
adverIcon: cc.Node,
shareIcon: cc.Node
},
refresh: function(e, t, i, n, l) {
this.data = e;
this.item = t;
this.isGet = i;
this.isTrggle = n;
this.hasAdver = l;
this.nameLabel.string = e.name;
this.introduceLabel.string = e.tips;
var h = e.lastProcess, d = h < e.param ? h : e.param;
this.taskProgressLabel.string = "(" + (d || 0) + "/" + e.param + ")";
var u = h >= e.param;
this.jumpBtn.active = !u;
this.isCompleteNode.active = u;
this.isProcessNode.active = !u;
var f = e.lastProcess / e.param * this.isProcessNode.width;
this.processBar.width = f > this.isProcessNode.width ? this.isProcessNode.width : f;
if (e.lastProcess !== e.process) {
this.finalWidth = e.process / e.param * this.isProcessNode.width;
this.finalWidth = this.finalWidth > this.isProcessNode.width ? this.isProcessNode.width : this.finalWidth;
this.needUpdate = !0;
e.lastProcess = e.process;
a.instance.saveUserData("刷新每日任务上次进度");
}
var p = this.tipsNode.getComponentsInChildren(cc.LabelOutline), m = !0, g = !1, y = void 0;
try {
for (var v, k = p[Symbol.iterator](); !(m = (v = k.next()).done); m = !0) {
v.value.color = u ? r : c;
}
} catch (e) {
g = !0;
y = e;
} finally {
try {
!m && k.return && k.return();
} finally {
if (g) throw y;
}
}
this.hasGetNode.active = u && i;
this.getBtn.active = u && !i;
var C = -1 === e.degree, S = n && !C ? 3 * t.num : t.num;
if (i) {
var w = e.finalReceiveMult ? e.finalReceiveMult : 1;
S = t.num * w;
}
this.rewardLabel.string = "x" + S;
this.coinIcon.active = t.type === o.MONEY;
this.zongZiIcon.active = t.type === o.ZONG_ZI;
if (this.coinIcon.active || this.zongZiIcon.active) {
this.skinIcon.node.active = !1;
this.rewardLabel.node.active = !0;
} else {
this.rewardLabel.node.active = !1;
this.skinIcon.node.active = !0;
s.loadResSprite(this.skinIcon, t.itemData.url);
}
if (n && !C) {
this.adverIcon.active = l;
this.shareIcon.active = !l;
} else {
this.adverIcon.active = !1;
this.shareIcon.active = !1;
}
},
setJumpCallback: function(e) {
this.jumpCallback = e;
},
onJump: function() {
this.jumpCallback && this.jumpCallback();
},
playRefreshAnim: function() {
this.refreshAnim.play();
},
setIcon: function(e) {
this.adverIcon.active = e;
this.shareIcon.active = !e;
},
closeIcon: function() {
this.adverIcon.active = !1;
this.shareIcon.active = !1;
},
update: function(e) {
if (this.needUpdate) if (this.processBar.width < this.finalWidth) this.processBar.width += 400 * e; else {
this.needUpdate = !1;
this.processBar.width = this.finalWidth;
this.refresh(this.data, this.item, this.isGet, this.isTrggle, this.hasAdver);
if (this.needShowAnim) {
this.playRefreshAnim();
this.needShowAnim = !1;
}
}
}
});
cc._RF.pop();
}, {
ListItemBase: "ListItemBase",
PlayerData: "PlayerData",
Types: "Types",
UIUtil: "UIUtil"
} ],
ItemGuide: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "fe83e0wIF1HErcLrMVcpkYJ", "ItemGuide");
cc.Class({
extends: cc.Component,
properties: {
tipsLabel: cc.Label,
showEffect: cc.Animation,
checkNode: cc.Node,
checkEffect: cc.Animation
},
init: function() {}
});
cc._RF.pop();
}, {} ],
ItemHeroSkin_new: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "7bf27yBpylEoKgBKZ8A7sM9", "ItemHeroSkin_new");
var n = e("ListItemBase"), a = e("UIUtil"), o = e("Tools");
cc.Class({
extends: n,
properties: {
lockNodeBg: cc.Node,
lockNode: cc.Node,
barNode: cc.Node,
checkNode: cc.Node,
equipNode: cc.Node,
priceNode: cc.Node,
priceLabel: cc.Label,
restNode: cc.Node,
restLabel: cc.Label,
iconSprite: cc.Sprite,
taskLabel: cc.Label,
needCheckNode: cc.Node,
canUnLockNode: cc.Node,
propertyNode: cc.Node,
propertyLabel: cc.Label,
newNode: cc.Node,
goldIcon: cc.Node,
diamondIcon: cc.Node,
suitNode: cc.Node,
nullNode: cc.Node,
leftHandNode: cc.Node,
rightHandNode: cc.Node,
handAni: cc.Animation,
canBuyNode: cc.Node
},
onLoad: function() {
this.animTime = o.getRandomInt(5, 10);
},
init: function(e) {
this.node.active = !0;
if (e) {
this.nullNode.active = !1;
this.data = e;
e.price && (this.priceLabel.string = o.getGoldStr(e.price));
this.goldIcon.active = 0 === e.priceType;
this.diamondIcon.active = 1 === e.priceType;
a.loadResSprite(this.iconSprite, e.url);
this.leftHandNode.color = new cc.Color().fromHEX(e.handColor);
this.rightHandNode.color = new cc.Color().fromHEX(e.handColor);
for (var t = 0; t < this.suitNode.children.length; t++) this.suitNode.children[t] && (this.suitNode.children[t].active = t + 1 == e.suit);
} else this.nullNode.active = !0;
},
refresh: function(e, t, i, n, a, o) {
this.isGet = e;
this.lockNode.active = !e && !t;
this.lockNodeBg.active = !e && !t;
this.priceNode.active = !e && 1 !== this.data.getWay && 100 != this.data.getWay;
this.taskLabel.node.active = !e && 1 === this.data.getWay && !t;
this.needCheckNode.active = !(!e || !i);
this.canUnLockNode.active = !(e || !t);
this.canBuyNode.active = !1;
this.propertyNode.active = !!this.data.propertyTips;
this.suitNode.y = e || t ? -85 : -45;
this.newNode.active = !(e || !n);
if (a || "" === a) {
var s = this.data.taskShortOne ? this.data.taskShortOne : "", r = this.data.taskShortTwo ? this.data.taskShortTwo : "", c = "";
this.taskLabel.string = s;
c = this.taskLabel.string + a;
this.taskLabel.string = r;
c += this.taskLabel.string;
this.taskLabel.string = c;
}
if (this.restNode && this.restLabel) {
this.restNode.active = 100 == this.data.getWay && !e;
this.restNode.active && (this.restLabel.string = this.data.rest || 1e3);
}
},
setCheck: function(e) {
this.checkNode.active = e;
},
setEquip: function(e) {
this.equipNode.active = e;
},
setCanBuy: function(e) {
this.canBuyNode.active = e;
},
update: function(e) {
if (!this.isGet) {
this.animTime -= e;
if (this.animTime < 0) {
this.handAni.play();
this.animTime = o.getRandomInt(5, 15) + Math.random();
}
}
}
});
cc._RF.pop();
}, {
ListItemBase: "ListItemBase",
Tools: "Tools",
UIUtil: "UIUtil"
} ],
ItemHeroSkin: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "77be2fpUlRH5qQ+AQp4hXTz", "ItemHeroSkin");
var n = e("ListItemBase"), a = e("UIUtil"), o = e("Tools");
cc.Class({
extends: n,
properties: {
lockNode: cc.Node,
barNode: cc.Node,
checkNode: cc.Node,
equipNode: cc.Node,
priceNode: cc.Node,
priceLabel: cc.Label,
iconSprite: cc.Sprite,
taskLabel: cc.Label,
needCheckNode: cc.Node,
canUnLockNode: cc.Node,
propertyNode: cc.Node,
propertyLabel: cc.Label,
newNode: cc.Node,
goldIcon: cc.Node,
diamondIcon: cc.Node,
suitNode: cc.Node
},
init: function(e) {
this.data = e;
e.price && (this.priceLabel.string = o.getGoldStr(e.price));
e.propertyTips && (this.propertyLabel.string = e.propertyTips);
this.goldIcon.active = 0 === e.priceType;
this.diamondIcon.active = 1 === e.priceType;
a.loadResSprite(this.iconSprite, e.url);
for (var t = 0; t < this.suitNode.children.length; t++) this.suitNode.children[t] && (this.suitNode.children[t].active = t + 1 == e.suit);
},
refresh: function(e, t, i, n, a) {
this.isGet = e;
this.lockNode.active = !e && !t;
this.iconSprite.node.opacity = e || t ? 255 : 153;
this.barNode.active = !e && !t;
this.priceNode.active = !e && 1 !== this.data.getWay;
this.taskLabel.node.active = !e && 1 === this.data.getWay && !t;
this.needCheckNode.active = !(!e || !i);
this.canUnLockNode.active = !(e || !t);
this.propertyNode.active = !!this.data.propertyTips;
this.propertyNode.y = e || t ? -65 : 65;
this.suitNode.y = e || t ? -65 : 65;
this.newNode.active = !(e || !n);
if (a || "" === a) {
var o = this.data.taskShortOne ? this.data.taskShortOne : "", s = this.data.taskShortTwo ? this.data.taskShortTwo : "", r = "";
this.taskLabel.string = o;
r = this.taskLabel.string + a;
this.taskLabel.string = s;
r += this.taskLabel.string;
this.taskLabel.string = r;
}
},
setCheck: function(e) {
this.checkNode.active = e;
},
setEquip: function(e) {
this.equipNode.active = e;
}
});
cc._RF.pop();
}, {
ListItemBase: "ListItemBase",
Tools: "Tools",
UIUtil: "UIUtil"
} ],
ItemKnifeSkin_new: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "b7198ynnrRPRJgX1aS55k4p", "ItemKnifeSkin_new");
var n = e("ListItemBase"), a = e("Tools");
e("PlatformMgr");
cc.Class({
extends: n,
properties: {
lockNode: cc.Node,
checkNode: cc.Node,
equipNode: cc.Node,
priceNode: cc.Node,
priceLabel: cc.Label,
restNode: cc.Node,
restLabel: cc.Label,
iconSprite: cc.Sprite,
taskLabel: cc.Label,
needCheckNode: cc.Node,
canUnLockNode: cc.Node,
propertyNode: cc.Node,
propertyLabel: cc.Label,
newNode: cc.Node,
goldIcon: cc.Node,
diamondIcon: cc.Node,
suitNode: cc.Node,
nullNode: cc.Node,
canBuyNode: cc.Node
},
init: function(e) {
var t = this;
if (e) {
this.nullNode.active = !1;
this.data = e;
e.price && (this.priceLabel.string = a.getGoldStr(e.price));
this.goldIcon.active = 0 === e.priceType;
this.diamondIcon.active = 1 === e.priceType;
cc.loader.loadRes(e.url, cc.SpriteFrame, function(e, i) {
e ? cc.error(e) : i && (t.iconSprite.spriteFrame = i);
});
for (var i = 0; i < this.suitNode.children.length; i++) this.suitNode.children[i] && (this.suitNode.children[i].active = i + 1 == e.suit);
} else this.nullNode.active = !0;
},
refresh: function(e, t, i, n, a, o) {
this.isGet = e;
this.lockNode.active = !e && !t;
this.priceNode.active = !e && 1 !== this.data.getWay && 100 != this.data.getWay;
this.taskLabel.node.active = !e && 1 === this.data.getWay && !t;
this.needCheckNode.active = !(!e || !i);
this.canUnLockNode.active = !(e || !t);
this.canBuyNode.active = !1;
this.propertyNode.active = !!this.data.propertyTips;
this.suitNode.y = e || t ? -50 : -10;
this.newNode.active = !(e || !n);
if (a || "" === a) {
var s = this.data.taskShortOne ? this.data.taskShortOne : "", r = this.data.taskShortTwo ? this.data.taskShortTwo : "", c = "";
this.taskLabel.string = s;
c = this.taskLabel.string + a;
this.taskLabel.string = r;
c += this.taskLabel.string;
this.taskLabel.string = c;
}
if (this.restNode && this.restLabel) {
this.restNode.active = 100 == this.data.getWay && !e;
this.restNode.active && (this.restLabel.string = this.data.rest || 1e3);
}
},
setCheck: function(e) {
this.checkNode.active = e;
},
setEquip: function(e) {
this.equipNode.active = e;
},
setCanBuy: function(e) {
this.canBuyNode.active = e;
}
});
cc._RF.pop();
}, {
ListItemBase: "ListItemBase",
PlatformMgr: "PlatformMgr",
Tools: "Tools"
} ],
ItemKnifeSkin: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "33c462nfAFEzpaVv7usdwe1", "ItemKnifeSkin");
var n = e("ListItemBase"), a = e("Tools");
cc.Class({
extends: n,
properties: {
lockNode: cc.Node,
checkNode: cc.Node,
equipNode: cc.Node,
priceNode: cc.Node,
priceLabel: cc.Label,
iconSprite: cc.Sprite,
taskLabel: cc.Label,
needCheckNode: cc.Node,
canUnLockNode: cc.Node,
propertyNode: cc.Node,
propertyLabel: cc.Label,
newNode: cc.Node,
goldIcon: cc.Node,
diamondIcon: cc.Node,
suitNode: cc.Node
},
init: function(e) {
var t = this;
this.data = e;
e.price && (this.priceLabel.string = a.getGoldStr(e.price));
e.propertyTips && (this.propertyLabel.string = e.propertyTips);
this.goldIcon.active = 0 === e.priceType;
this.diamondIcon.active = 1 === e.priceType;
cc.loader.loadRes(e.url, cc.SpriteFrame, function(e, i) {
e ? cc.error(e) : i && (t.iconSprite.spriteFrame = i);
});
for (var i = 0; i < this.suitNode.children.length; i++) this.suitNode.children[i] && (this.suitNode.children[i].active = i + 1 == e.suit);
},
refresh: function(e, t, i, n, a) {
this.isGet = e;
this.lockNode.active = !e && !t;
this.iconSprite.node.opacity = e || t ? 255 : 153;
this.priceNode.active = !e && 1 !== this.data.getWay;
this.taskLabel.node.active = !e && 1 === this.data.getWay && !t;
this.needCheckNode.active = !(!e || !i);
this.canUnLockNode.active = !(e || !t);
this.propertyNode.active = !!this.data.propertyTips;
this.propertyNode.y = e ? -50 : 50;
this.suitNode.y = e || t ? -50 : 50;
this.newNode.active = !(e || !n);
if (a || "" === a) {
var o = this.data.taskShortOne ? this.data.taskShortOne : "", s = this.data.taskShortTwo ? this.data.taskShortTwo : "", r = "";
this.taskLabel.string = o;
r = this.taskLabel.string + a;
this.taskLabel.string = s;
r += this.taskLabel.string;
this.taskLabel.string = r;
}
},
setCheck: function(e) {
this.checkNode.active = e;
},
setEquip: function(e) {
this.equipNode.active = e;
}
});
cc._RF.pop();
}, {
ListItemBase: "ListItemBase",
Tools: "Tools"
} ],
ItemMatch: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d6f345O9MJFT6FUsEy6nzHp", "ItemMatch");
var n = e("UIUtil");
cc.Class({
extends: cc.Component,
properties: {
iconSprite: cc.Sprite
},
init: function(e) {
n.loadResPortrait(this.iconSprite, e);
this.iconSprite.node.active = !1;
},
showIcon: function() {
this.iconSprite.node.active = !0;
}
});
cc._RF.pop();
}, {
UIUtil: "UIUtil"
} ],
ItemPKRank: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "ef8cfPNIvpOoJaFsPWM00qo", "ItemPKRank");
var n = e("ListItemBase"), a = e("ConfigData"), o = e("UIUtil"), s = new cc.color().fromHEX("#FFFA77"), r = e("Tools"), c = e("PlayerData");
cc.Class({
extends: n,
properties: {
bgNode: cc.Node,
rankNode: cc.Node,
rankLabel: cc.Label,
nameLabel: cc.Label,
iconSprite: cc.Sprite,
killLabel: cc.Label
},
init: function(e) {
for (var t = 0; t < 2; t++) this.bgNode.children[t].active = (e.rank + t) % 2;
for (var i = 0; i < 3; i++) this.rankNode.children[i].active = i + 1 === e.rank;
if (-1 === e.rank) {
this.rankLabel.node.active = !0;
this.rankLabel.string = "未上榜";
} else {
this.rankLabel.node.active = e.rank > 3;
this.rankLabel.string = e.rank;
}
this.killLabel.string = e.score;
this.iconSprite.spriteFrame = null;
if (0 === e.realPlayer) {
this.iconSprite.iconUrl = e.id;
o.loadAIPortrait(this.iconSprite, e.id);
this.nameLabel.string = r.getShowNickName(a.instance.getAINickById(e.id));
} else if (e.isLocal) {
this.iconSprite.iconUrl = c.instance.iconUrl;
o.loadFriendPortrait(this.iconSprite, c.instance.iconUrl);
this.nameLabel.string = r.getShowNickName(c.instance.name);
} else {
this.iconSprite.iconUrl = e.headUrl;
o.loadFriendPortrait(this.iconSprite, e.headUrl);
this.nameLabel.string = r.getShowNickName(e.name);
}
this.bgNode.children[2].active = e.isLocal;
this.rankLabel.node.color = e.isLocal ? s : cc.Color.WHITE;
this.nameLabel.node.color = e.isLocal ? s : cc.Color.WHITE;
this.killLabel.node.color = e.isLocal ? s : cc.Color.WHITE;
}
});
cc._RF.pop();
}, {
ConfigData: "ConfigData",
ListItemBase: "ListItemBase",
PlayerData: "PlayerData",
Tools: "Tools",
UIUtil: "UIUtil"
} ],
ItemPKReward: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "303b1ZpT5tJJJsXdSs/70ii", "ItemPKReward");
var n = e("ListItemBase"), a = (e("UIUtil"), e("BagItem")), o = e("Types").ItemType;
cc.Class({
extends: n,
properties: {
rankLabel: cc.Label,
goldLabel: cc.Label,
diamondLabel: cc.Label
},
init: function(e) {
var t;
t = e.endRank ? "第" + e.rank + "-" + e.endRank + "名" : "第" + e.rank + "名";
this.rankLabel.string = t;
for (var i = a.createItemsWithString(e.reward), n = 0; n < i.length; n++) switch (i[n].type) {
case o.MONEY:
this.goldLabel.string = "x" + i[n].num;
break;

case o.ZONG_ZI:
this.diamondLabel.string = "x" + i[n].num;
}
}
});
cc._RF.pop();
}, {
BagItem: "BagItem",
ListItemBase: "ListItemBase",
Types: "Types",
UIUtil: "UIUtil"
} ],
ItemRankMini: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "a8bb4a42ApKkb2MOf/iY53q", "ItemRankMini");
var n = e("UIUtil");
cc.Class({
extends: cc.Component,
properties: {
iconSprite: cc.Sprite,
starCountLabel: cc.Label
},
init: function(e) {
n.loadResSprite(this.iconSprite, e.url);
this.starCountLabel.string = e.star;
}
});
cc._RF.pop();
}, {
UIUtil: "UIUtil"
} ],
ItemRankReward: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "89fe4ozx6VMZrF5cFPiD50i", "ItemRankReward");
var n = e("ListItemBase"), a = e("PlayerData"), o = (e("ConfigData"), e("UIUtil"));
cc.Class({
extends: n,
properties: {
skinRewardNode: cc.Node,
goldRewardNode: cc.Node,
skinIconSprite: cc.Sprite,
skinNameLabel: cc.Label,
goldCountLabel: cc.Label,
unLockNode: cc.Node,
hasGetNode: cc.Node,
iconSprite: cc.Sprite,
nameLabel: cc.Label,
goldLabel: cc.Label,
achieveNode: cc.Node,
notAchieveNode: cc.Node,
adverIcon: cc.Node,
normalIcon: cc.Node,
kingNode: cc.Node,
kingLabel: cc.Label,
unlockRootNode: cc.Node,
unlockBuffNode: cc.Node,
unlockBuffLabel: cc.Label,
unlockBuffIcon: cc.Node,
unlockMapNode: cc.Node,
unlockMapLabel: cc.Label,
unlockMapIcon: cc.Node
},
init: function(e, t, i) {
var n = this;
this.data = e;
this.item = t;
this.isSkin = i;
this.nameLabel.string = e.name;
this.goldLabel.string = "bonus coin" + Math.ceil(100 * e.goldMultiRate + 100) + "%";
o.loadResSprite(this.iconSprite, e.url);
this.skinRewardNode.active = !(!t || !i);
this.goldRewardNode.active = !(!t || i);
var s = 0 === e.levelUpStar, r = a.instance.rankStar - e.star >= 0;
this.goldLabel.node.y = s && r ? -120 : -92;
this.kingNode.active = !(!s || !r);
this.kingLabel.string = "x" + (a.instance.rankStar - e.star);
this.unlockRootNode.y = t ? this.isSkin ? -80 : -60 : 20;
if (t) {
e = t.itemData;
if (i) {
this.skinNameLabel.string = e.name;
cc.loader.loadRes(e.url, cc.SpriteFrame, function(e, t) {
e ? cc.error(e) : t && (n.skinIconSprite.spriteFrame = t);
});
} else this.goldCountLabel.string = t.num;
}
this.unlockBuffNode.active = !1;
if (this.data.unlockBuff || 0 === this.data.unlockBuff) {
this.unlockBuffNode.active = !0;
this.unlockBuffLabel.string = this.data.unlockTips;
this.unlockBuffIcon.children[this.data.unlockBuff].active = !0;
}
if (this.data.unlockMap || 0 === this.data.unlockMap) {
this.unlockMapNode.active = !0;
this.unlockMapLabel.string = this.data.unlockMapTips;
this.unlockMapIcon.children[this.data.unlockMap].active = !0;
}
},
refresh: function(e, t) {
this.achieveNode.active = !!t;
this.notAchieveNode.active = !this.achieveNode.active;
this.unLockNode.active = !(!this.item || e || !t);
this.hasGetNode.active = !(!this.item || !e);
this.adverIcon.active = !!this.isSkin;
this.normalIcon.active = !this.adverIcon.active;
}
});
cc._RF.pop();
}, {
ConfigData: "ConfigData",
ListItemBase: "ListItemBase",
PlayerData: "PlayerData",
UIUtil: "UIUtil"
} ],
ItemRank: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "0682dTnQ4FHn4QwYe8hK6wM", "ItemRank");
var n = e("UIUtil"), a = e("Tools"), o = e("PlayerData"), s = e("ConfigData");
cc.Class({
extends: cc.Component,
properties: {
iconSprite: cc.Sprite,
nameLabel: cc.Label,
goldRateLabel: cc.Label,
achieveNode: cc.Node,
keepNode: cc.Node,
kingNode: cc.Node,
kingLabel: cc.Label,
unlockRootNode: cc.Node,
unlockBuffNode: cc.Node,
unlockBuffLabel: cc.Label,
unlockBuffIcon: cc.Node,
unlockMapNode: cc.Node,
unlockMapLabel: cc.Label,
unlockMapIcon: cc.Node,
unlockSpecialNode: cc.Node,
unlockSpecialLabel: cc.Label,
unlockSpecialIcon: cc.Node,
unlockBoxNode: cc.Node,
unlockBoxLabel: cc.Label,
unlockBoxIcon: cc.Node,
unlockWaitNode: cc.Node,
rankStarNode: cc.Node,
rankNoStarNode: cc.Node
},
init: function(e, t, i) {
this.data = e;
this.isKeep = i;
var r = e.name;
this.nameLabel.string = r.replace(/[0-9]/gi, "");
this.goldRateLabel.string = a.getStringByFormat(s.instance.getUITipStr(12), Math.ceil(100 * e.goldMultiRate + 100));
n.loadResSprite(this.iconSprite, e.url);
this.achieveNode.active = t;
this.keepNode.active = i;
var c = 0 === e.levelUpStar;
this.kingNode.active = !!c;
var l = o.instance.rankStar - e.star;
l = l < 0 ? 0 : l;
this.kingLabel.string = "x" + l;
c || this.refreshRankStar();
},
refreshUnlock: function(e) {
this.unlockBuffNode.active = !1;
if (e.unlockBuff || 0 === e.unlockBuff) {
this.unlockBuffNode.active = !0;
this.unlockBuffLabel.string = e.unlockTips;
this.unlockBuffIcon.children[e.unlockBuff].active = !0;
}
this.unlockMapNode.active = !1;
if (e.unlockMap || 0 === e.unlockMap) {
this.unlockMapNode.active = !0;
this.unlockMapLabel.string = e.unlockMapTips;
this.unlockMapIcon.children[e.unlockMap].active = !0;
}
this.unlockSpecialNode.active = !1;
if (e.unlockSpecial || 0 === e.unlockSpecial) {
this.unlockSpecialNode.active = !0;
this.unlockSpecialLabel.string = e.unlockSpecialTips;
this.unlockSpecialIcon.children[e.unlockSpecial].active = !0;
}
this.unlockBoxNode.active = !1;
if (e.unlockBox || 0 === e.unlockBox) {
this.unlockBoxNode.active = !0;
this.unlockBoxLabel.string = e.unlockBoxTips;
this.unlockBoxIcon.children[e.unlockBox].active = !0;
}
this.unlockWaitNode.active = e.unlockWait;
},
refreshRankStar: function() {
for (var e = o.instance.rankStar, t = this.data, i = this.rankStarNode.children, n = this.rankNoStarNode.children, a = 60 / t.levelUpStar + 5, s = 0; s < i.length; s++) {
var r = e > t.star + s, c = s < t.levelUpStar;
if (i[s]) {
i[s].opacity = r && c ? 255 : 0;
if (1 === t.levelUpStar) {
i[s].x = 0;
i[s].y = 0;
} else {
i[s].x = s * a * 2 - a * (t.levelUpStar - 1);
0 === i[s].x ? i[s].y = 0 : i[s].y += Math.abs(i[s].x) / 2 - 7.5;
}
}
if (n[s]) {
n[s].opacity = c ? 255 : 0;
n[s].x = i[s].x;
n[s].y = i[s].y;
}
}
}
});
cc._RF.pop();
}, {
ConfigData: "ConfigData",
PlayerData: "PlayerData",
Tools: "Tools",
UIUtil: "UIUtil"
} ],
ItemRewardDetail: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "8340bZfpdlDnpo3HWjDM0cz", "ItemRewardDetail");
cc.Class({
extends: cc.Component,
properties: {
roundAndRank: cc.RichText,
codeLabel: cc.RichText
},
init: function(e) {
this.roundAndRank.string = '恭喜你在<color=#fff884>"第' + e.round + '轮"</c>世界PK中获得了第' + e.rank + "名";
this.codeLabel.string = "<color=#64ff76> 获奖码：" + e.codeKey + "</c>";
}
});
cc._RF.pop();
}, {} ],
ItemShopItem: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "8cf135jHlpOfqarsq5YEDk4", "ItemShopItem");
var n = e("PayMgr"), a = e("AdvertMgr"), o = e("PlayerData"), s = e("Types").AdverType, r = e("Tools"), c = e("ConfigData");
cc.Class({
extends: cc.Component,
properties: {
icon: cc.Sprite,
desc: cc.Label,
price: cc.Node,
free: cc.Node,
tv: cc.Node,
buyBtn: cc.Node,
remainTime: cc.Label,
_world: cc.Node,
_lastFreeDiamondTime: 0,
_curTime: ""
},
init: function(e, t) {
this._data = e;
this._world = t;
this.desc.getComponent(cc.Label).string = this._data.desc ? this._data.desc : "";
if (this._data.isAdItem) {
this.tv.active = !0;
this.free.active = !0;
this.price.active = !1;
this.buyBtn.active = o.instance.getCanGetFreeDiamond();
this._lastFreeDiamondTime = o.instance.getLastFreeDiamondTime();
} else this.price.getComponent(cc.Label).string = this._data.price ? this._data.price : "";
},
resetPrice: function(e) {
this._data.isAdItem || (this.price.getComponent(cc.Label).string = e);
},
resetIcon: function(e) {
this.icon.spriteFrame = e;
},
onBuyBtnClick: function() {
var e = this;
if (!n.instance.getIsPaying()) {
var t = function(t) {
n.instance.setIsPaying(!1);
if (t) {
a.instance.fireBaseEvent("purchase_product_success", "product_id", e._data.isAdItem ? "ads for diamond" : "diamonds");
if (e._data.isAdItem) {
o.instance.updateLastFreeDiamondTime();
e.setFreeBuyBtnActive(!1);
}
o.instance.updateZongZi(e._data.diamond);
e._world.uiMgr.showTips(r.getStringByFormat(c.instance.getUITipStr(15), e._data.diamond));
}
};
setTimeout(function() {
n.instance.setIsPaying(!1);
}, 1800);
if (this._data.isAdItem) {
a.instance.fireBaseEvent("purchase_product", "product_id", "ads for diamond");
a.instance.showAdver(s.ShopFreeDiamond, t);
} else {
a.instance.fireBaseEvent("purchase_product", "product_id", "diamonds");
n.instance.setIsPaying(!0);
n.instance.payByIndex(this._data.payIndex, t, function() {
n.instance.setIsPaying(!1);
e._world.uiMgr.showTips(r.getStringByFormat(c.instance.getUITipStr(23)));
});
}
}
},
setFreeBuyBtnActive: function(e) {
this._lastFreeDiamondTime = o.instance.getLastFreeDiamondTime();
this.buyBtn.active = e;
},
update: function(e) {
if (this._data.isAdItem && !this.buyBtn.active) {
if (o.instance.getCanGetFreeDiamond()) {
this.setFreeBuyBtnActive(!0);
return;
}
var t = r.getRemainTimeStr(o.instance.getCurTime(), this._lastFreeDiamondTime + 864e5);
if (t != this._curTime) {
this._curTime = t;
this.remainTime.string = this._curTime;
}
}
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
ConfigData: "ConfigData",
PayMgr: "PayMgr",
PlayerData: "PlayerData",
Tools: "Tools",
Types: "Types"
} ],
ItemSign: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "cefe9Xz72hGtrX+wWXVSeTn", "ItemSign");
var n = e("ListItemBase"), a = e("Tools"), o = e("ConfigData"), s = [ "1", "2", "3", "4", "5", "6", "7" ];
cc.Class({
extends: n,
properties: {
iconGold: cc.Node,
iconKnife: cc.Node,
iconHero: cc.Node,
iconFinalKnife: cc.Node,
iconFinalGold: cc.Node,
dayLabel: cc.Label,
dayBgNode: cc.Node,
countLabel: cc.Label,
checkNode: cc.Node,
getNode: cc.Node,
bgNode: cc.Node,
getBgNode: cc.Node
},
init: function(e, t, i) {
this.data = e;
this.item = t;
this.index = i;
this.dayLabel.string = a.getStringByFormat(o.instance.getUITipStr(10), s[i]);
if (0 === t.type) {
if (6 === i) {
this.iconFinalGold.active = !0;
this.getBgNode.width = 690;
this.getBgNode.height = 230;
this.checkNode.width = 690;
this.bgNode.width = 690;
} else this.iconGold.active = !0;
this.countLabel.string = t.num;
} else {
if (1 === i) this.iconKnife.active = !0; else if (2 === i) this.iconHero.active = !0; else if (6 === i) {
this.iconFinalKnife.active = !0;
this.getBgNode.width = 690;
this.getBgNode.height = 230;
this.checkNode.width = 690;
this.bgNode.width = 690;
}
this.countLabel.string = "";
}
},
refresh: function(e, t) {
this.getNode.active = e;
this.checkNode.active = t;
}
});
cc._RF.pop();
}, {
ConfigData: "ConfigData",
ListItemBase: "ListItemBase",
Tools: "Tools"
} ],
ItemTreasureBox: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "8bb85p/mTlA2oZ2+BwZcMH6", "ItemTreasureBox");
var n = e("ListItemBase"), a = e("UIUtil"), o = (e("ConfigData"), e("PlayerData"), 
e("ShareMgr"), e("Types").ShareType, e("AdvertMgr"), e("Types").AdverType, e("Tools"), 
e("BagItem"), e("Types").ItemType);
e("Types").StageType;
cc.Class({
extends: n,
properties: {
rewardParent: cc.Node,
boxNode: cc.Node,
numLabel: cc.Label,
heroSprite: cc.Sprite,
knifeSprite: cc.Sprite,
diamondMore: cc.Node,
diamondLess: cc.Node,
openAnim: cc.Animation,
openBestAnim: cc.Node,
getBg: cc.Node
},
init: function() {
this.numLabel.string = "";
this.hasGet = !1;
this.getBg.active = !1;
this.rewardParent.active = !1;
this.boxNode.active = !0;
this.numLabel.node.active = !1;
this.openBestAnim.active = !1;
},
getReward: function(e) {
var t = this;
this.hasGet = !0;
for (var i = 0; i < this.rewardParent.children.length; i++) this.rewardParent.children[i].active = i === e.type;
this.diamondMore.active = 35 === e.num;
this.diamondLess.active = !this.diamondMore.active;
this.boxNode.active = !1;
this.getBg.active = !0;
setTimeout(function() {
t.rewardParent.active = !0;
t.numLabel.node.active = !0;
}, 300);
switch (e.type) {
case o.MONEY:
case o.ZONG_ZI:
this.numLabel.string = e.num;
this.diamondMore.active ? this.playBestAnim() : this.openAnim.play();
break;

case o.HERO_SKIN:
this.playBestAnim();
this.numLabel.string = "";
a.loadResSprite(this.heroSprite, e.itemData.url);
break;

case o.KNIFE_SKIN:
this.playBestAnim();
this.numLabel.string = "";
a.loadResSprite(this.knifeSprite, e.itemData.url);
}
},
playBestAnim: function() {
var e = this;
this.openAnim.play();
this.openBestAnim.active = !0;
setTimeout(function() {
e.openBestAnim.active = !1;
}, 1e3);
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
BagItem: "BagItem",
ConfigData: "ConfigData",
ListItemBase: "ListItemBase",
PlayerData: "PlayerData",
ShareMgr: "ShareMgr",
Tools: "Tools",
Types: "Types",
UIUtil: "UIUtil"
} ],
ItemWorldReward: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "be7278A3ltGwqQTerivqsi9", "ItemWorldReward");
var n = e("ListItemBase"), a = (e("UIUtil"), e("BagItem")), o = e("Types").ItemType, s = [ 50, 100, 200, 500 ];
cc.Class({
extends: n,
properties: {
rankLabel: cc.Label,
goldLabel: cc.Label,
diamondLabel: cc.Label,
realNode: cc.Node,
unRealNode: cc.Node,
heroNode: cc.Node,
cardNode: cc.Node,
cardLabel: cc.Label,
heroLabel: cc.Label
},
init: function(e) {
var t;
t = e.endRank ? "第" + e.rank + "-" + e.endRank + "名" : "第" + e.rank + "名";
this.rankLabel.string = t;
this.realNode.active = !1;
this.unRealNode.active = !1;
this.heroNode.active = !1;
for (var i = a.createItemsWithString(e.reward), n = 0; n < i.length; n++) {
var r = i[n];
switch (r.type) {
case o.MONEY:
this.unRealNode.active = !0;
this.goldLabel.string = "x" + r.num;
break;

case o.ZONG_ZI:
this.unRealNode.active = !0;
this.diamondLabel.string = "钻石x" + r.num;
break;

case o.CARD:
this.realNode.active = !0;
for (var c = this.cardNode.children, l = 0; l < c.length; l++) c[l].active = r.num === s[l];
this.cardLabel.string = e.tips;
break;

case o.HERO_SKIN:
this.heroNode.active = !0;
this.heroLabel.string = e.tips;
}
}
}
});
cc._RF.pop();
}, {
BagItem: "BagItem",
ListItemBase: "ListItemBase",
Types: "Types",
UIUtil: "UIUtil"
} ],
Item: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "0d6329pY95GIb/Qg75Uejo5", "Item");
var n = e("Quee"), a = e("WeiShuSdk"), o = e("PlatformMgr");
cc.Class({
extends: cc.Component,
properties: {
btn: cc.Button,
itemID: 0
},
updateItem: function(e) {
this.itemID = e;
var t = a.baseUrl + "Slot2End/boards/" + n.itemVals[this.itemID].imgUrl, i = this;
cc.loader.load(t, function(e, t) {
var n = new cc.SpriteFrame(t);
i.btn.node.getComponent(cc.Sprite).spriteFrame = n;
});
},
onLoad: function() {
this.btn.node.on("click", this.onClick, this);
},
onClick: function() {
var e = this, t = n.itemVals[this.itemID];
t && (0 === t.mod ? o.navgateTo(t, null, function() {
n.updateList(e.itemID);
}) : o.onPreView(t, function() {
n.updateList(e.itemID);
}));
}
});
cc._RF.pop();
}, {
PlatformMgr: "PlatformMgr",
Quee: "Quee",
WeiShuSdk: "WeiShuSdk"
} ],
KeyCount: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "42022Sd+FpBGqa5zb5J8FGX", "KeyCount");
var n = e("PlayerData");
cc.Class({
extends: cc.Component,
properties: {
keys: cc.Node
},
open: function(e) {
if (n.instance.hasGetKey) {
this.node.active = e;
for (var t = n.instance.keyCount, i = 0; i < 3; i++) this.keys.children[i].active = i < t;
}
},
show: function(e) {
var t = this;
this.node.active = !0;
for (var i = n.instance.keyCount, a = 0; a < 3; a++) this.keys.children[a].active = a + 1 < i;
var o = this.keys.children[i - 1];
setTimeout(function() {
o.active = !0;
}, 1600);
setTimeout(function() {
t.node.active = !1;
}, 2e3);
setTimeout(function() {
var n = e.position, a = t.node.position.add(cc.v2(50 * (i - 2), 0)), o = [ n, cc.v2(n.x, a.y), a ];
e.runAction(cc.bezierTo(.3, o).easing(cc.easeIn(1)));
}, 1300);
}
});
cc._RF.pop();
}, {
PlayerData: "PlayerData"
} ],
KillMsgListener: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "a038bDlGolBuqAG1wEonZ/S", "KillMsgListener");
var n = e("AudioEngine"), a = e("Types").SoundID, o = [ a.doublekill, a.tribblekill, a.quadrkill, a.pandakill, a.godlike ], s = e("PlayerData"), r = e("PlatformMgr"), c = e("Types").CustomFunnelEvent;
cc.Class({
extends: cc.Component,
properties: {
players: [],
isfirstBlood: !1,
isGuide: !1
},
cleanUp: function() {
this.players = [];
},
init: function(e, t) {
var i = !0, n = !1, a = void 0;
try {
for (var o, r = e[Symbol.iterator](); !(i = (o = r.next()).done); i = !0) {
var c = o.value;
this.players.push(c);
}
} catch (e) {
n = !0;
a = e;
} finally {
try {
!i && r.return && r.return();
} finally {
if (n) throw a;
}
}
this.uiMgr = t;
this.isGuide = s.instance.isGuide;
this.node.on("killMessageShow", this.killMessageShow, this);
},
killMessageShow: function(e) {
var t = e[0], i = e[1], l = t.tag, h = i.tag, d = null, u = null, f = !0, p = !1, m = void 0;
try {
for (var g, y = this.players[Symbol.iterator](); !(f = (g = y.next()).done); f = !0) {
var v = g.value;
v.teamID !== l ? v.teamID === h && (u = v) : d = v;
}
} catch (e) {
p = !0;
m = e;
} finally {
try {
!f && y.return && y.return();
} finally {
if (p) throw m;
}
}
if (u && u.beKilled()) {
if (!this.isfirstBlood) {
this.isfirstBlood = !0;
n.instance.playSound(a.firstblood);
}
this.uiMgr.showKillMsg(d, u);
if (d.isLocal) {
this.isGuide || this.uiMgr.showKillNotice(d.killNum);
d.killNum > 5 ? n.instance.playSound(o[o.length - 1]) : d.killNum >= 2 && n.instance.playSound(o[d.killNum - 2]);
s.instance.isFristGame() && (1 === d.killNum ? r.notifyFunnelEvent(c.Kill_One) : 2 === d.killNum ? r.notifyFunnelEvent(c.Kill_Two) : 3 === d.killNum && r.notifyFunnelEvent(c.Kill_Three));
}
}
}
});
cc._RF.pop();
}, {
AudioEngine: "AudioEngine",
PlatformMgr: "PlatformMgr",
PlayerData: "PlayerData",
Types: "Types"
} ],
KillMsg: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "4b095noe5pLFryWwVl55iwt", "KillMsg");
var n = e("Types").TEAM_COLOR, a = e("UIUtil"), o = e("PlayerData");
cc.Class({
extends: cc.Component,
properties: {
_time: -1,
killNode: cc.Node,
_killNameNode: cc.Node,
killMyBall: cc.Node,
killOtherBall: cc.Node,
_killMyName: cc.Label,
_killOtherName: cc.Label,
effectAnim: cc.Animation,
isOpen: !1
},
init: function(e, t, i, n, a, o) {
this._killNameNode = e;
this._killMyName = t;
this._killOtherName = i;
this._killIconNode = n;
this._killMyIcon = a;
this._killOtherIcon = o;
this.isOpen = !1;
this._killMyName.langFlag = !0;
this._killOtherName.langFlag = !0;
},
cleanUp: function() {
this.close();
},
update: function(e) {
if (this._time > 0) {
this._time -= e;
this._time < 0 && this.close();
}
},
showKillMsg: function(e, t) {
this.isOpen = !0;
this.effectAnim.node.active = !0;
this.effectAnim.play();
this.killNode.active = !0;
this._killNameNode.active = !0;
this._killIconNode.active = !0;
this._time = 2;
var i = e.teamID, s = t.teamID;
this.killMyBall.color = n[i];
this.killOtherBall.color = n[s];
this._killMyName.string = e.name;
this._killMyIcon.spriteFrame = null;
this._killMyIcon.iconUrl = e.isLocal ? o.instance.iconUrl : e.iconUrl;
a.loadResPortrait(this._killMyIcon, e);
this._killOtherName.string = t.name;
this._killOtherIcon.spriteFrame = null;
this._killOtherIcon.iconUrl = t.isLocal ? o.instance.iconUrl : t.iconUrl;
a.loadResPortrait(this._killOtherIcon, t);
},
close: function() {
this.killNode.active = !1;
this._killNameNode.active = !1;
this._killIconNode.active = !1;
this.isOpen = !1;
}
});
cc._RF.pop();
}, {
PlayerData: "PlayerData",
Types: "Types",
UIUtil: "UIUtil"
} ],
KillNotice: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "66fc9shg+RDJqKJEeWi9OII", "KillNotice");
e("Types").TEAM_COLOR, cc.Class({
extends: cc.Component,
properties: {
_time: -1,
notices: [ cc.Node ],
_curIndex: -2
},
init: function() {},
cleanUp: function() {
this.closeKillNotice();
},
update: function(e) {
if (this._time > 0) {
this._time -= e;
this._time < 0 && this.closeKillNotice();
}
},
showKillNotice: function(e) {
this._curIndex >= 0 && this._curIndex < this.notices.length && (this.notices[this._curIndex].active = !1);
this._curIndex = e - 2;
this._curIndex = this._curIndex >= this.notices.length ? this.notices.length - 1 : this._curIndex;
if (this._curIndex >= 0 && this._curIndex < this.notices.length) {
this._time = 2;
this.notices[this._curIndex].active = !0;
}
},
closeKillNotice: function() {
this.notices[this._curIndex] && (this.notices[this._curIndex].active = !1);
}
});
cc._RF.pop();
}, {
Types: "Types"
} ],
KnifeBuffComponent: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "f89d8RAHxZCy7/bumsvD7kH", "KnifeBuffComponent");
cc._RF.pop();
}, {} ],
KnifeColliderListener: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "fbb66tLoHFCvJxBjP/0N6z7", "KnifeColliderListener");
e("Types").KnifeState;
var n = e("GameData"), a = e("Types").KnifeMomentState;
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.node.on("onPickUpKnife", this.onPickUpKnife, this);
this.node.on("throwKnife", this.throwKnife, this);
},
onPickUpKnife: function(e) {
this.node.emit("changeTag", e.tag);
this.node.emit("updateMomentState", a.Capture);
this.node.emit("stopResetPos");
e.tag, n.instance.localHeroTid;
e.node.emit("emitEvent", [ "addKnife", this.node ]);
},
throwKnife: function() {
var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
this.node.emit("changeTag", 0);
this.node.emit("noticeOwnerLeave");
this.node.emit("isDanceRelease", e);
this.node.emit("updateMomentState", a.Release);
this.node.emit("stopResetPos");
}
});
cc._RF.pop();
}, {
GameData: "GameData",
Types: "Types"
} ],
KnifeColliderNodeCtrl: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "b2ef3EKvGRIorSKNkVlj3B3", "KnifeColliderNodeCtrl");
var n = e("Types").KnifeMomentState, a = e("Types").KnifeColliderState;
e("GameData");
cc.Class({
extends: cc.Component,
properties: {},
init: function(e) {
this.attackNode = e;
this.knifeStateComp = this.node.getComponent("KnifeStateComponent");
this.attackCollider = e.getComponent(cc.BoxCollider);
this.throwKnifeFinish();
},
pickKnife: function() {
this.attackCollider.notColliderFlag = !1;
this.attackCollider.collState = a.Attack;
},
throwKnifeStart: function() {
this.attackCollider.notColliderFlag = !0;
this.attackCollider.collState = a.Throw;
},
throwKnifeFinish: function() {
this.attackCollider.notColliderFlag = this.attackCollider.collState = a.Land;
},
updateLogic: function(e) {
this.knifeMomentStateComp || (this.knifeMomentStateComp = this.node.getComponent("KnifeMomentStateComponent"));
if (this.knifeMomentStateComp.isDirty) switch (this.knifeMomentStateComp.state) {
case n.Capture:
case n.Init:
this.pickKnife();
break;

case n.Release:
this.throwKnifeStart();
break;

case n.ReleaseFinish:
this.throwKnifeFinish();
}
}
});
cc._RF.pop();
}, {
GameData: "GameData",
Types: "Types"
} ],
KnifeCollisionHandleSystem: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "4c50bdPGiZBeZ8vBE5tcCaT", "KnifeCollisionHandleSystem");
var n = e("BaseCollisionHandleSystem"), a = e("Types").KnifeState, o = e("VibrateUtil"), s = e("GameData"), r = e("Tools"), c = e("Types").KnifeSkinProperty;
cc.Class({
extends: n,
properties: {
_eventListName: {
default: "_knifeCollisionEvent",
override: !0
}
},
handelCollisionEvent: function(e) {
var t = e[0], i = e[1], n = i.node.parent.getComponent("KnifeStateComponent").state, o = i.node.parent.getComponent("KnifeOwnerComponent").oldOwner, s = null, l = !1, h = 0;
if (o) {
l = (s = o.getComponent("EntityFollowPlayer").player).isHard();
var d = s.skin;
d && d.property === c.Dodge && (h = d.propertyParam);
}
switch (t.node.group) {
case "knife":
if (t.tag === i.tag) return;
if (0 === i.tag) return;
if (l) return;
var u = t.node.parent.getComponent("KnifeOwnerComponent").oldOwner, f = null;
u && (f = u.getComponent("EntityFollowPlayer").player);
var p = 0;
if (s && f) {
p = (m = 5 * (f.attackPower - s.defencePower)) > 100 ? 100 : m;
}
if (n === a.Attack) {
if ((m = r.getRandomInt(0, 100)) < h) this.dodgeKnife(i, t); else {
this.throwKnife(i, t);
f && f.addKillKnifeNum();
}
} else if (n === a.Defence && p > 0) {
var m;
if ((m = r.getRandomInt(0, 100)) < p) {
this.destroyDefenceKnife(i, t);
f && f.addKillKnifeNum();
}
}
break;

case "block":
if (0 === i.tag) return;
n === a.Attack ? l || this.throwKnife(i, t) : i.node.emit("emitEvent", [ "stopParentRotate" ]);
break;

case "wall":
if (0 === i.tag) return;
var g = 0;
switch (t.tag) {
case 0:
g = 180;
break;

case 1:
g = 0;
break;

case 2:
g = 90;
break;

case 3:
g = 270;
}
i.node.emit("emitEvent", [ "fixByWall", [ t, g, t.node.parent.getComponent("EntityWall").bgNode.width / 2 ] ]);
}
},
updateGameLogic: function(e) {
this._super(e);
this._collisionEventMgr.clearKnifeEvent();
},
throwKnife: function(e, t) {
if (e.tag === s.instance.localHeroTid || t.tag === s.instance.localHeroTid) {
o.vibrate();
e.tag === s.instance.localHeroTid ? e.node.emit("emitEvent", [ "localHeroCollision" ]) : t.tag === s.instance.localHeroTid && t.node.emit("emitEvent", [ "localHeroCollision" ]);
}
e.node.emit("emitEvent", [ "stopParentRotate" ]);
e.node.emit("emitEvent", [ "throwKnife", t ]);
this.node.emit("throwKnife", [ e.node, t.node ]);
},
dodgeKnife: function(e, t) {
this.node.emit("dodgeKnife", [ e.node, t.node ]);
},
destroyDefenceKnife: function(e, t) {
if (e.tag === s.instance.localHeroTid || t.tag === s.instance.localHeroTid) {
o.vibrate();
e.tag === s.instance.localHeroTid ? e.node.emit("emitEvent", [ "localHeroCollision" ]) : t.tag === s.instance.localHeroTid && t.node.emit("emitEvent", [ "localHeroCollision" ]);
}
e.node.emit("emitEvent", [ "stopParentRotate" ]);
e.node.emit("emitEvent", [ "throwKnife", t ]);
this.node.emit("destroyDefenceKnife", [ e.node, t.node ]);
}
});
cc._RF.pop();
}, {
BaseCollisionHandleSystem: "BaseCollisionHandleSystem",
GameData: "GameData",
Tools: "Tools",
Types: "Types",
VibrateUtil: "VibrateUtil"
} ],
KnifeCollisionSoundCtrl: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "964a7emOPZLqL/r2cm/XhsZ", "KnifeCollisionSoundCtrl");
var n = e("AudioEngine"), a = e("Types").SoundID;
cc.Class({
extends: cc.Component,
properties: {
_time: -1,
_audioID: null,
_soundTime: -1
},
init: function() {
this.node.on("localHeroCollision", this.localHeroCollision, this);
},
update: function(e) {
if (this._time > 0) {
this._time -= e;
if (this._time <= 0) {
this._time = -1;
n.instance.stopSound(this._audioID);
this._audioID = null;
this._soundTime = -1;
}
}
if (this._soundTime > 0) {
this._soundTime -= e;
if (this._soundTime <= 0) {
this._audioID = null;
this.playSound();
}
}
},
localHeroCollision: function() {
this.playSound();
this._time = .5;
},
playSound: function() {
if (!this._audioID) {
this._audioID = n.instance.playSound(a.HitFast);
this._soundTime = 1.34;
}
},
stop: function() {
n.instance.stopSound(this._audioID);
this._audioID = null;
this._soundTime = -1;
}
});
cc._RF.pop();
}, {
AudioEngine: "AudioEngine",
Types: "Types"
} ],
KnifeCountComponent: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "13b32JVhbhGC7OIMu5Z/goD", "KnifeCountComponent");
cc.Class({
extends: cc.Component,
properties: {
index: 0,
maxCount: 0,
isDirty: !1
},
onLoad: function() {
this.node.on("updateCount", this.updateCount, this);
this.node.on("resetDirty", this.resetDirty, this);
},
updateCount: function(e) {
this.index = e[0];
this.isMore = this.maxCount < e[1];
this.maxCount = e[1];
this.isDirty = !0;
},
resetDirty: function() {
this.isDirty = !1;
}
});
cc._RF.pop();
}, {} ],
KnifeFixByCircleWallCtrl: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "7098eN0ktNM5KKNsa12uc9P", "KnifeFixByCircleWallCtrl");
e("Types").KnifeState, e("Types").KnifeMomentState;
cc.Class({
extends: cc.Component,
properties: {
lastPos: cc.v2(0, 0)
},
init: function() {
this.knifeStateComp = this.node.getComponent("KnifeStateComponent");
this.knifeMomentStateComp = this.node.getComponent("KnifeMomentStateComponent");
},
refresh: function(e, t) {
this.width = e / 2;
this.height = t / 2;
},
updateLogic: function(e) {
this.knifeOwnerComp || (this.knifeOwnerComp = this.node.getComponent("KnifeOwnerComponent"));
if (this.knifeOwnerComp.owner) {
var t = this.knifeOwnerComp.owner.getComponent("EntityFollowPlayer").knivesCmp;
if (t.isCollCircleWall || t.isCollisionWall) {
var i = this.node.parent.convertToWorldSpaceAR(this.node.position), n = this.node.parent.parent.convertToNodeSpaceAR(i), a = n.normalize(), o = this.width - n.mag() - 25;
if (o < 0) {
n = n.add(a.mul(o));
i = this.node.parent.parent.convertToWorldSpaceAR(n);
n = this.node.parent.convertToNodeSpaceAR(i);
this.node.position = n;
}
}
}
}
});
cc._RF.pop();
}, {
Types: "Types"
} ],
KnifeFixByWallCtrl: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "53c891FvuFCW5lzs+LemtMc", "KnifeFixByWallCtrl");
e("Types").KnifeState;
cc.Class({
extends: cc.Component,
properties: {
resetTime: .25,
_curResetTime: 0,
_waitResetTime: 0,
allWaitTime: .1
},
refresh: function(e, t) {
this.width = e / 2;
this.height = t / 2;
},
updateLogic: function(e) {
this.knifeOwnerComp || (this.knifeOwnerComp = this.node.getComponent("KnifeOwnerComponent"));
if (this.knifeOwnerComp.owner) {
var t = this.knifeOwnerComp.owner.getComponent("EntityFollowPlayer").knivesCmp;
if (t.isCollCircleWall || t.isCollisionWall) {
var i = this.node.parent.convertToWorldSpaceAR(this.node.position), n = this.node.parent.parent.convertToNodeSpaceAR(i), a = this.width - Math.abs(n.x) - 20;
if (a < 0) {
var o = cc.v2(n.x, 0).normalize();
n = n.add(o.mul(a));
i = this.node.parent.parent.convertToWorldSpaceAR(n);
n = this.node.parent.convertToNodeSpaceAR(i);
this.node.position = n;
}
var s = this.height - Math.abs(n.y) - 20;
if (s < 0) {
o = cc.v2(0, n.y).normalize();
n = n.add(o.mul(s));
i = this.node.parent.parent.convertToWorldSpaceAR(n);
n = this.node.parent.convertToNodeSpaceAR(i);
this.node.position = n;
}
}
}
}
});
cc._RF.pop();
}, {
Types: "Types"
} ],
KnifeInit: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "01b2fZtZKJJ8KIEM6vMpfo4", "KnifeInit");
var n = e("GameData"), a = e("Types").KnifeMomentState;
cc.Class({
extends: cc.Component,
properties: {},
init: function(e) {
this.entityPlayer = e;
this.node.emit("changeTag", this.entityPlayer.teamID);
this.node.emit("updateMomentState", a.Init);
this.entityPlayer.teamID, n.instance.localHeroTid;
this.entityPlayer.addKnife(this.node);
}
});
cc._RF.pop();
}, {
GameData: "GameData",
Types: "Types"
} ],
KnifeMomentStateComponent: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "49123g3EKpN0aSiJjs9G+6C", "KnifeMomentStateComponent");
e("Types").KnifeMomentState;
cc.Class({
extends: cc.Component,
properties: {
state: null,
isDirty: !1
},
onLoad: function() {
this.node.on("updateMomentState", this.updateMomentState, this);
this.node.on("resetDirty", this.resetDirty, this);
},
updateMomentState: function(e) {
if (this.state !== e) {
this.state = e;
this.isDirty = !0;
}
},
resetDirty: function() {
this.isDirty = !1;
}
});
cc._RF.pop();
}, {
Types: "Types"
} ],
KnifeMoveCtrl: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "1cf98noQhNBHJ0EIxvz2aG9", "KnifeMoveCtrl");
var n = e("Tools"), a = e("Types").KnifeState, o = e("Types").KnifeMomentState;
cc.Class({
extends: cc.Component,
properties: {
changeTime: .05,
changeSpeed: 500,
initSpeed: 40,
adjustMoreSpeed: 200,
adjustLessSpeed: 400,
captureSpeed: 600,
releaseSpeed: 1500,
nezhaSpeed: -3e3,
releaseRotation: 1e3,
rollRotation: 0,
lastRotation: null,
danceRoll: 5,
acceleration: 0
},
onLoad: function() {
this.knifeCountComp = this.node.getComponent("KnifeCountComponent");
this.knifeMomentStateComp = this.node.getComponent("KnifeMomentStateComponent");
this.node.on("dance", this.dance, this);
this.node.on("releasePosition", this.releasePosition, this);
this.node.on("startChangeToAttack", this.startChangeToAttack, this);
this.node.on("startChangeToDefence", this.startChangeToDefence, this);
this.node.on("throwKnife", this.throwKnife, this);
},
dance: function(e) {
var t;
this.danceIndex = 0;
this.danceTime = e;
this.danceRoll = 10;
this.danceRollAdd = .5;
for (var i = 40, n = [], a = 5; a > 0; a--) {
var o = a / 15 * e / 4;
i -= 2;
var s = cc.sequence(cc.rotateBy(o, i), cc.rotateBy(o, -i), cc.rotateBy(o, -i), cc.rotateBy(o, i));
n.push(s);
}
var r = (t = cc).sequence.apply(t, n);
this.node.runAction(r);
},
releasePosition: function(e) {
this.releasePosition = e;
},
getFinalPosition: function() {
this.acceleration = 0;
var e = this.knifeCountComp.maxCount, t = this.knifeCountComp.index, i = n.getRadiusByKnifeCount(e);
i = this.isDefence ? i - 90 : i;
this.rollRotation = 360 / e * t;
var a = Math.sin(this.rollRotation * Math.PI / 180) * i, o = Math.cos(this.rollRotation * Math.PI / 180) * i;
this.raduis = i;
return cc.v2(o, a);
},
getRadiusChangePosition: function() {
var e = this.knifeCountComp.maxCount, t = n.getRadiusByKnifeCount(e);
t = this.isDefence ? t - 90 : t;
var i = Math.sin(this.rollRotation * Math.PI / 180) * t, a = Math.cos(this.rollRotation * Math.PI / 180) * t;
this.raduis = t;
return cc.v2(a, i);
},
startChangeToAttack: function() {
this.isDefence = !1;
this.finalPosition = this.getFinalPosition();
this.node.emit("updateState", a.Attack);
var e = this.knifeCountComp.maxCount, t = this.knifeCountComp.index, i = n.getIntervalByCount(e);
this.changeToDefence = !1;
if (!this.changeToAttack) {
this.changeToAttack = !0;
this.changeToAttackTime = t * i / 1e3;
}
},
updateChangeToAttack: function(e) {
if (this.changeToAttack) {
this.changeToAttackTime -= e;
if (this.changeToAttackTime <= 0) {
this.changeToAttack = !1;
this.rotateKnife();
}
}
},
startChangeToDefence: function() {
this.isDefence = !0;
this.finalPosition = this.getFinalPosition();
this.rotateKnife();
this.changeToAttack = !1;
if (!this.changeToDefence) {
this.changeToDefence = !0;
this.changeToDefenceTime = this.changeTime;
}
},
updateChangeToDefence: function(e) {
if (this.changeToDefence) {
this.changeToDefenceTime -= e;
if (this.changeToDefenceTime <= 0) {
this.changeToDefence = !1;
var t = this.isDefence ? a.Defence : a.Attack;
this.node && this.node.emit("updateState", t);
}
}
},
throwKnife: function() {
this.changeToAttack = !1;
this.changeToDefence = !1;
},
rotateKnife: function() {
if (this.node) {
var e = this.isDefence ? 360 - this.rollRotation : 450 - this.rollRotation;
this.lastRotation !== e && (this.lastRotation = e);
}
},
updateRotate: function(e) {
if (null !== this.lastRotation && this.node.rotation !== this.lastRotation) if (this.isDefence) {
this.node.rotation -= 1080 * e;
if (this.node.rotation <= this.lastRotation) {
this.node.rotation = this.lastRotation;
if (this.rollCallback) {
this.rollCallback();
this.rollCallback = null;
}
}
} else {
this.node.rotation += 1080 * e;
if (this.node.rotation >= this.lastRotation) {
this.node.rotation = this.lastRotation;
if (this.rollCallback) {
this.rollCallback();
this.rollCallback = null;
}
}
}
},
getThrowPosition: function() {
this.acceleration = 0;
return this.releasePosition;
},
setNeZhaPosition: function(e) {
this.finalPosition = e;
this.acceleration = 0;
},
updateLogic: function(e) {
this.knifeMomentStateComp || (this.knifeMomentStateComp = this.node.getComponent("KnifeMomentStateComponent"));
this.knifeCountComp || (this.knifeCountComp = this.node.getComponent("KnifeCountComponent"));
if (this.knifeMomentStateComp.isDirty) switch (this.knifeMomentStateComp.state) {
case o.Init:
this.isInit = !0;
this.finalPosition = this.getFinalPosition();
this.node.position = cc.v2(0, 0);
this.logicTargetInfo();
break;

case o.Capture:
this.isCapture = !0;
this.finalPosition = this.getFinalPosition();
this.logicTargetInfo();
break;

case o.Release:
this.isRelease = !0;
this.finalPosition = this.getThrowPosition();
this.lastRotation = this.isDefence ? this.node.rotation - 360 : this.node.rotation + 360;
}
if (this.knifeCountComp.isDirty) {
this.isAdjust = !0;
this.isMore = this.knifeCountComp.isMore;
this.isCapture || this.isMore || (this.node.position = this.getRadiusChangePosition());
this.finalPosition = this.getFinalPosition();
this.rotateKnife();
this.logicTargetInfo();
this.setScale();
}
this.updateMoveLogic(e);
},
logicTargetInfo: function() {
this.node.emit("logicTargetPos", [ this.finalPosition, this.rollRotation, this.raduis ]);
},
setScale: function() {
var e = .02 * this.knifeCountComp.index + 1;
e = e > 1.5 ? 1.5 : e;
this.node.scale !== e && (this.node.scale = e);
},
updateMoveLogic: function(e) {
var t = this;
this.updateRotate(e);
this.updateChangeToAttack(e);
this.updateChangeToDefence(e);
var i = this.node.position;
if (this.finalPosition && !n.compareVec2(this.finalPosition, i)) {
var s = this.finalPosition.sub(i), r = s.mag();
this.moveDistance = this.changeSpeed * e;
this.isAdjust && (this.isMore ? this.moveDistance = this.adjustMoreSpeed * e : this.moveDistance = this.adjustLessSpeed * e);
this.isInit && (this.moveDistance = this.initSpeed * e);
this.isCapture && (this.moveDistance = this.captureSpeed * e);
this.isRelease && (this.moveDistance = this.releaseSpeed * e);
if (this.isNEZHA) {
this.moveDistance = this.nezhaSpeed * e;
this.acceleration += 200 * e;
this.moveDistance += this.acceleration;
} else {
this.acceleration += 50 * e;
this.moveDistance += this.acceleration;
}
this.node.position = i.add(s.mul(this.moveDistance / r));
if (n.compareVec2(this.finalPosition, this.node.position) || this.moveDistance >= r) {
this.node.position = this.finalPosition;
this.isAdjust && (this.isAdjust = !1);
this.isInit && (this.isInit = !1);
if (this.isCapture) {
this.isCapture = !1;
this.node.emit("updateMomentState", o.CaptureFinish);
}
if (this.isRelease) {
this.lastRotation = this.isDefence ? this.node.rotation - 720 : this.node.rotation + 720;
var c = this.node.rotation;
this.rollCallback = function() {
t.node.emit("updateState", a.Normal);
t.node.emit("updateMomentState", o.ReleaseFinish);
t.node.rotation = c;
t.lastRotation = c;
t.isRelease = !1;
};
}
if (this.isNEZHA) {
this.isNEZHA = !1;
if (this.rollCallback) {
this.rollCallback();
this.rollCallback = null;
}
}
}
}
}
});
cc._RF.pop();
}, {
Tools: "Tools",
Types: "Types"
} ],
KnifeOutOfWallComponent: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "90b6467cRNHOZLAobccaHNV", "KnifeOutOfWallComponent");
cc.Class({
extends: cc.Component,
properties: {
width: 640,
height: 1136,
isOut: !1
},
init: function(e, t, i) {
this.knife = e;
this.refresh(t, i);
this.isOut = !1;
},
refresh: function(e, t) {
this.width = e / 2;
this.height = t / 2;
},
updateGameLogic: function(e) {
if (!this.isOut && this.knife && this.knife.isOnLand()) {
this.node.position.magSqr() > this.width * this.width + this.height * this.height && (this.isOut = !0);
}
}
});
cc._RF.pop();
}, {} ],
KnifeOwnerComponent: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "895cdxd/pBPMaCCSQDwwc0+", "KnifeOwnerComponent");
cc.Class({
extends: cc.Component,
properties: {
owner: null,
isDirty: !1
},
onLoad: function() {
this.node.on("updateOwner", this.updateOwner, this);
this.node.on("noticeOwnerLeave", this.noticeOwnerLeave, this);
this.node.on("addKnife", this.addKnife, this);
this.node.on("addBuff", this.addBuff, this);
this.node.on("stopParentRotate", this.stopParentRotate, this);
this.node.on("localHeroCollision", this.localHeroCollision, this);
this.node.on("isCollCircleWall", this.isCollCircleWall, this);
this.node.on("resetDirty", this.resetDirty, this);
this.node.on("onAttackBox", this.onAttackBox, this);
},
updateOwner: function(e) {
this.owner = e;
this.oldOwner = e;
this.isDirty = !0;
},
noticeOwnerLeave: function() {
if (this.owner) {
this.owner.emit("reduceKnife", this.node);
this.owner = null;
}
},
addKnife: function(e) {
this.owner && this.owner.emit("addKnife", e);
},
addBuff: function(e) {
this.owner && this.owner.emit("addBuff", e);
},
onAttackBox: function(e) {
this.owner && this.owner.emit("onAttackBox", e);
},
stopParentRotate: function() {
this.owner && this.owner.emit("stopParentRotate");
},
localHeroCollision: function() {
this.owner && this.owner.emit("localHeroCollision");
},
isCollCircleWall: function(e) {
this.owner && this.owner.emit("isCollCircleWall", e);
},
resetDirty: function() {
this.isDirty = !1;
}
});
cc._RF.pop();
}, {} ],
KnifeParentCtrl: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d4a6adB/gpNTbNbX04yNIKa", "KnifeParentCtrl");
var n = e("Types").KnifeMomentState;
cc.Class({
extends: cc.Component,
properties: {},
init: function(e) {
var t = this;
this.itemNode = e;
this.node.on("isDanceRelease", function(e) {
t.isDanceRelease = e;
}, this);
this.knifeMomentStateComp = this.node.getComponent("KnifeMomentStateComponent");
this.knifeOwnerComp = this.node.getComponent("KnifeOwnerComponent");
},
updateLogic: function(e) {
this.knifeMomentStateComp || (this.knifeMomentStateComp = this.node.getComponent("KnifeMomentStateComponent"));
this.knifeOwnerComp || (this.knifeOwnerComp = this.node.getComponent("KnifeOwnerComponent"));
if (this.knifeMomentStateComp.isDirty) switch (this.knifeMomentStateComp.state) {
case n.Release:
var t = this.node.parent.convertToWorldSpaceAR(this.node.position), i = this.itemNode.convertToNodeSpaceAR(t), a = this.node.parent.parent.convertToWorldSpaceAR(this.node.parent.position), o = this.itemNode.convertToNodeSpaceAR(a), s = i.sub(o), r = [ Math.PI / 2, -Math.PI / 2 ], c = Math.floor(2 * Math.random()), l = Math.PI / 36 - Math.random() * (Math.PI / 18), h = r[c] + l;
!0 === this.isDanceRelease && (h = -Math.PI / 2);
var d = Math.random() + 2, u = s.rotate(h).mul(d).add(i);
this.node.emit("releasePosition", u);
this.changeParent(this.itemNode);
}
this.knifeOwnerComp.isDirty && this.changeParent(this.knifeOwnerComp.owner);
},
changeParent: function(e) {
if (e) if (e !== this.node.parent) {
var t = this.node.parent.convertToWorldSpaceAR(this.node.position), i = e.convertToNodeSpaceAR(t);
this.node.parent = e;
this.node.position = i;
} else console.log("同一个父节点，无需更换"); else console.error("Knife changeParent newParent is null");
}
});
cc._RF.pop();
}, {
Types: "Types"
} ],
KnifeSkinCtrl: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "2330berQZRECK+SS37gSAYe", "KnifeSkinCtrl");
e("Types").KnifeState;
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.knifeStateComp = this.node.parent.getComponent("KnifeStateComponent");
this.knifeOwnerComp = this.node.parent.getComponent("KnifeOwnerComponent");
this.node.on("changeSkin", this.changeSkin, this);
},
updateLogic: function(e) {
this.knifeStateComp || (this.knifeStateComp = this.node.parent.getComponent("KnifeStateComponent"));
this.knifeOwnerComp || (this.knifeOwnerComp = this.node.parent.getComponent("KnifeOwnerComponent"));
this.knifeOwnerComp.isDirty && this.changeSkin();
},
changeSkin: function() {
if (this.knifeOwnerComp.owner && this.knifeOwnerComp.owner.getComponent("EntityFollowPlayer")) {
var e = this.knifeOwnerComp.owner.getComponent("EntityFollowPlayer").player;
if (e.skin) {
var t = this.node.getComponent(cc.Sprite);
cc.loader.loadRes(e.skin.url, cc.SpriteFrame, function(e, i) {
e ? cc.error(e) : i && t.node && (t.spriteFrame = i);
});
}
}
}
});
cc._RF.pop();
}, {
Types: "Types"
} ],
KnifeStateComponent: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "c184cXtlBxBgre4VjMVH7Lw", "KnifeStateComponent");
var n = e("Types").KnifeState;
cc.Class({
extends: cc.Component,
properties: {
state: n.Normal,
isDirty: !1
},
onLoad: function() {
this.node.on("updateState", this.updateState, this);
this.node.on("resetDirty", this.resetDirty, this);
},
updateState: function(e) {
if (this.state !== e) {
this.state = e;
this.isDirty = !0;
}
},
resetDirty: function() {
this.isDirty = !1;
}
});
cc._RF.pop();
}, {
Types: "Types"
} ],
LanguageMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "b5547bFDwZLlLs0L+8dX0g7", "LanguageMgr");
var n = [ "en-us", "japan", "korea", "de", "ru", "twn", "es", "fr", "pt" ], a = e("Tools"), o = cc.Class({
statics: {
curLang: "en-us",
curIndex: 0,
setLang: function(e) {
if (n[e]) {
a.setItem("curLanguage", e);
o.curIndex = e;
o.curLang = n[e];
}
}
}
});
cc._RF.pop();
}, {
Tools: "Tools"
} ],
Launcher: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "ecdd80fvmFNM7J2vtfZV6KB", "Launcher");
var n = e("Tools"), a = e("GameData"), o = e("ConfigData"), s = e("PlayerData"), r = e("PlatformMgr"), c = e("UpdateMgr"), l = e("ShareMgr"), h = e("AdvertMgr"), d = e("Types").CustomFunnelEvent, u = e("Types").PlatformType, f = e("Contact"), p = e("CollisionManager"), m = cc.Scheduler, g = e("LanguageMgr"), y = cc.Vec2.prototype, v = e("PayMgr");
cc.Class({
extends: cc.Component,
statics: {},
properties: {
waitNode: cc.Node,
needUpdate: !1,
timeOutTime: 15
},
onLoad: function() {
this.init();
},
init: function() {
var e = this;
this.waitTime = 2;
a.init();
console.log("curTime: " + n.getTimestampMS());
a.instance._curTime = n.getTimestampMS();
r.init();
a.instance.logUseTime("PlatformMgr init");
c.checkNewClient(function() {
s.init();
a.instance.logUseTime("PlayerData init");
l.init();
a.instance.logUseTime("ShareMgr init");
e.doLogin();
o.init();
a.instance.logUseTime("ConfigData init");
h.init();
v.init();
a.instance.logUseTime("AdvertMgr init");
});
cc.Contact = f;
var t = cc.director.getCollisionManager();
t && cc.director.getScheduler().unscheduleUpdate(t);
cc.director._collisionManager = new p();
cc.director.getScheduler().scheduleUpdate(cc.director._collisionManager, m.PRIORITY_SYSTEM, !1);
var i = cc.Node.prototype;
cc.js.getset(i, "rotation", function() {
return -this.angle;
}, function(e) {
this.angle = -e;
}, !1, !0);
cc.Vec3.prototype.rotate = function(e, t) {
return y.rotate.call(this, e, t);
};
},
doLogin: function() {
var e = this;
r.notifyFunnelEvent(d.Login_Start);
var t = this;
r.doLogin(function(i) {
if (i.result) {
r.notifyFunnelEvent(d.Login_Suc);
a.instance.logUseTime("login suc");
s.instance.initUserData(function() {
r.notifyFunnelEvent(d.Load_UserData);
r.hawkeye_report_login();
r.hawkeye_report_share_in();
r.hawkeye_report_level();
});
e.setLanguage();
r.af_report_user();
} else {
a.instance.logUseTime("login fail");
wx.showModal({
title: "提示",
content: "网络连接似乎有问题，请检查网络设置后重试",
showCancel: !1,
success: function(e) {
e.confirm && t.doLogin();
}
});
}
});
this.needUpdate = !0;
this.timeOutTime = 15;
},
setLanguage: function() {
var e = n.getItem("curLanguage");
null !== e && void 0 !== e ? g.setLang(Number(e)) : "ja" === s.instance.languageCode ? g.setLang(1) : "ko" === s.instance.languageCode ? g.setLang(2) : "de" === s.instance.languageCode ? g.setLang(3) : "ru" === s.instance.languageCode ? g.setLang(4) : "zh" === s.instance.languageCode ? g.setLang(5) : "es" === s.instance.languageCode ? g.setLang(6) : "fr" === s.instance.languageCode ? g.setLang(7) : "pt" === s.instance.languageCode ? g.setLang(8) : "JP" === s.instance.country ? g.setLang(1) : "KR" === s.instance.country ? g.setLang(2) : "DE" === s.instance.country ? g.setLang(3) : "RU" === s.instance.country ? g.setLang(4) : "TW" === s.instance.country ? g.setLang(5) : "ES" === s.instance.country ? g.setLang(6) : "FR" === s.instance.country ? g.setLang(7) : "PT" === s.instance.country && g.setLang(8);
},
update: function(e) {
if (o.instance && o.instance.loadingConfigCount === o.instance.loadedConfigCount) {
r.notifyFunnelEvent(d.Load_ConfigData);
if (s.instance.loadComplete) if (this.isloading) {
if (!this.isShowOpenAd) if (h.instance.isShowingOpenAd) h.instance.showOpenApp(); else {
console.log(" isShowOpenAd ", h.instance.isShowingOpenAd, s.instance.isShowOpenAdCold);
r.notifyFunnelEvent(d.Switch_BattleFire);
a.instance.logUseTime("loadScene Battle");
cc.director.loadScene("Battle");
this.needUpdate = !1;
this.isShowOpenAd = !0;
}
} else {
if (r.platformType == u.ANDROID) {
console.log("---打开时，同步信息---");
var t = s.instance.isFirstDay() ? "1" : "0";
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManage", "FAUserProperty", "(Ljava/lang/String;Ljava/lang/String;)V", "is_firstopen", t);
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManage", "FATotalRevenueSwitch", "(Ljava/lang/String;Ljava/lang/String;)V", s.instance.dayCanReportTotalAdsRevenue ? "1" : "0", s.instance.dayTotalAdsRevenue + "");
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManage", "FAUserProperty", "(Ljava/lang/String;Ljava/lang/String;)V", "ab_test", Math.random() > .5 ? "1.0.37_A" : "1.0.37_B");
} else if (r.platformType == u.IOS) {
var i = s.instance.isFirstDay() ? "1" : "0";
jsb.reflection.callStaticMethod("AdManage", "FAUserProperty:sec:", "is_firstopen", i);
jsb.reflection.callStaticMethod("AdManage", "FATotalRevenueSwitch:sec:", s.instance.dayCanReportTotalAdsRevenue ? "1" : "0", s.instance.dayTotalAdsRevenue + "");
}
if (h.instance.getOpenAdRules()) {
h.instance.isShowingOpenAd = !0;
h.instance.showOpenApp();
} else {
r.notifyFunnelEvent(d.Switch_BattleFire);
a.instance.logUseTime("loadScene Battle");
cc.director.loadScene("Battle");
this.needUpdate = !1;
this.isShowOpenAd = !0;
}
this.isloading = !0;
}
}
if (!this.waitNode.active) {
this.waitTime -= e;
this.waitTime <= 0 && (this.waitNode.active = !0);
}
if (this.needUpdate) {
this.timeOutTime -= e;
this.timeOutTime <= 0 && (this.needUpdate = !1);
}
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
CollisionManager: "CollisionManager",
ConfigData: "ConfigData",
Contact: "Contact",
GameData: "GameData",
LanguageMgr: "LanguageMgr",
PayMgr: "PayMgr",
PlatformMgr: "PlatformMgr",
PlayerData: "PlayerData",
ShareMgr: "ShareMgr",
Tools: "Tools",
Types: "Types",
UpdateMgr: "UpdateMgr"
} ],
ListItemBase: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "025ffByl6REMIXVTckefnig", "ListItemBase");
var n = e("Tools");
cc.Class({
extends: cc.Component,
properties: {
button: cc.Button,
checkFlag: {
default: !1,
visible: !1
}
},
createItemClickHander: function(e, t, i, n) {
var a = new cc.Component.EventHandler();
a.target = e;
a.component = t;
a.handler = i;
a.customEventData = n;
return a;
},
setOnItemClick: function(e, t) {
var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "onItemClick";
this.setOnBtnClick(this.button, e, t, i);
},
setOnBtnClick: function(e, t, i) {
var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "onItemClick";
if (e) {
var a = this.createItemClickHander(t.node, cc.js.getClassName(t), n, i);
e.clickEvents = [ a ];
}
},
setVisible: function(e) {
this.node && n.setNodeVisible(this.node, e);
}
});
cc._RF.pop();
}, {
Tools: "Tools"
} ],
Loading: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "6c86cdqfzZORrA/IhgU3+eJ", "Loading");
cc.Class({
extends: cc.Component,
statics: {},
properties: {
waitTime: .2,
needUpdate: !1
},
onLoad: function() {
this.init();
},
init: function() {
this.waitTime = .2;
this.needUpdate = !0;
},
update: function(e) {
if (this.needUpdate) {
this.waitTime -= e;
if (this.waitTime <= 0) {
this.needUpdate = !1;
cc.director.loadScene("Battle");
}
}
}
});
cc._RF.pop();
}, {} ],
LogicPlayer: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "1cd0f9DQRBF2qTMO9n0sDmj", "LogicPlayer");
var n = e("Tools");
cc.Class({
extends: cc.Component,
properties: {},
init: function(e) {
this.entityPlayer = e;
this.knivesCmp = e.followPlayer.knivesCmp;
},
updateLogic: function() {
if (this.knivesCmp.isDirty) {
this.knivesCmp.emitAllKnivesCountChange();
var e = n.getRadiusByKnifeCount(this.knivesCmp.knives.length);
this.radius = e;
this.knivesCmp.node.emit("radiusChange", e);
this.entityPlayer.node.emit("radiusChange", e);
this.knivesCmp.resetDirty();
}
}
});
cc._RF.pop();
}, {
Tools: "Tools"
} ],
MoveAI: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "8caedz7MitMLJUhwZrqoNda", "MoveAI");
var n = e("Types").AIMoveState, a = e("GameData"), o = e("Tools");
cc.Class({
extends: cc.Component,
properties: {
_curMoveState: n.Normal,
_Width: 0,
_height: 0,
_curPos: null,
_nextPos: null,
_moveDir: null,
_thinkTime: 1
},
onLoad: function() {
this._Width = .9 * a.instance.mapWidth;
this._height = .9 * a.instance.mapHeight;
this._thinkTime = 2;
},
init: function(e) {
this.moveMag = e / a.instance.logicFps * (e / a.instance.logicFps) + 30;
},
_findNextPos: function() {
this._nextPos = cc.v2(o.getRandomInt(-this._Width / 2, this._Width / 2), o.getRandomInt(-this._height / 2, this._height / 2));
this._CalMoveDir();
},
_CalMoveDir: function() {
this._curPos = this.node.position;
this._moveDir = this._nextPos.sub(this._curPos);
},
_checkIfFind: function() {
this._curPos = this.node.position;
return this._nextPos.sub(this._curPos).magSqr() <= this.moveMag;
},
update: function(e) {
switch (this._curMoveState) {
case n.Normal:
this._findNextPos();
this._curMoveState = n.Moving;
break;

case n.Moving:
if (this._checkIfFind()) {
this.node.emit("onStopMoving");
this._curMoveState = n.Thinking;
} else {
this._CalMoveDir();
this.node.emit("onMoveBy", {
dPos: this._moveDir
});
}
break;

case n.Thinking:
this._thinkTime -= e;
if (this._thinkTime <= 0) {
this._thinkTime = 2;
this._curMoveState = n.Normal;
}
}
}
});
cc._RF.pop();
}, {
GameData: "GameData",
Tools: "Tools",
Types: "Types"
} ],
MoveByKeyboard: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "f49a6kjvvZJl489VhC9bHze", "MoveByKeyboard");
cc.Class({
extends: cc.Component,
onLoad: function() {
this._moveL = !1;
this._moveU = !1;
this._moveR = !1;
this._moveD = !1;
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
},
onDestroy: function() {
cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
},
onKeyDown: function(e) {
switch (e.keyCode) {
case cc.macro.KEY.a:
this._moveL = !0;
break;

case cc.macro.KEY.w:
this._moveU = !0;
break;

case cc.macro.KEY.d:
this._moveR = !0;
break;

case cc.macro.KEY.s:
this._moveD = !0;
break;

case cc.macro.KEY.j:
this.node.emit("onHoldAttackTrigger");
}
},
onKeyUp: function(e) {
var t = !1;
switch (e.keyCode) {
case cc.macro.KEY.a:
this._moveL = !1;
t = !0;
break;

case cc.macro.KEY.w:
this._moveU = !1;
t = !0;
break;

case cc.macro.KEY.d:
this._moveR = !1;
t = !0;
break;

case cc.macro.KEY.s:
this._moveD = !1;
t = !0;
break;

case cc.macro.KEY.j:
this.node.emit("onReleaseAttackTrigger");
}
t && (this._moveL || this._moveU || this._moveR || this._moveD || this.node.emit("onStopMoving"));
},
cycleMoveByKeyboard: function() {
if (this._moveL || this._moveU || this._moveR || this._moveD) {
var e = cc.v2(0, 0);
this._moveL && (e = e.add(cc.v2(-1, 0)));
this._moveU && (e = e.add(cc.v2(0, 1)));
this._moveR && (e = e.add(cc.v2(1, 0)));
this._moveD && (e = e.add(cc.v2(0, -1)));
this.node.emit("onMoveBy", {
dPos: e
});
}
},
update: function(e) {
this.cycleMoveByKeyboard();
}
});
cc._RF.pop();
}, {} ],
MoveByRandom: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "57f48ogFjBMwooKvAmwdBTS", "MoveByRandom");
var n = e("Tools");
cc.Class({
extends: cc.Component,
properties: {
time: 0
},
update: function(e) {
var t = n.getRandomInt(-2, 2), i = n.getRandomInt(-2, 2);
this.node.emit("onMoveBy", {
dPos: cc.v2(t, i)
});
}
});
cc._RF.pop();
}, {
Tools: "Tools"
} ],
MoveByTouch: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "5f5ea7xUYJL5LkhhRdPz8fh", "MoveByTouch");
var n = e("Tools");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartEvent, this);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this);
this.node.on(cc.Node.EventType.TOUCH_END, this.touchEndEvent, this);
this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEndEvent, this);
},
init: function(e) {
this._target = e.node;
},
_touchStartEvent: function(e) {
if (this.enabled) {
this.startPos = e.getLocation();
this._target.emit("heroMoveStart");
this.beginMove = !1;
}
},
_touchMoveEvent: function(e) {
var t = e.getLocation();
t.sub(this.startPos).magSqr() > 100 && (this.beginMove = !0);
n.compareVec2(t, this.startPos) ? this.curDir = null : this.curDir = t.sub(this.startPos).normalize();
},
touchEndEvent: function(e) {
this._target.emit("onStopMoving");
this.curDir = null;
this.beginMove = !1;
},
update: function(e) {
this.curDir && this.beginMove && this._target.emit("onMoveBy", {
dPos: this.curDir
});
}
});
cc._RF.pop();
}, {
Tools: "Tools"
} ],
MoveStateNotice: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "afa0aV/OxBM+a9QxXeol/eC", "MoveStateNotice");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.node.on("heroMoveStart", this._heroMoveStart, this);
this.node.on("onStopMoving", this._heroMoveEnd, this);
},
init: function(e, t) {
this.knivesComp = t;
this.entityPlayer = e;
},
_heroMoveStart: function(e) {
this.knivesComp.heroStartMove();
this.entityPlayer.heroStartMove();
},
_heroMoveEnd: function(e) {
this.knivesComp.heroStopMove();
this.entityPlayer.heroStopMove();
}
});
cc._RF.pop();
}, {} ],
MoveWithOwnerNode: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "73c46QX/JVNWJavsag1Nr1b", "MoveWithOwnerNode");
cc.Class({
extends: cc.Component,
properties: {
_owner: null,
_entity: null,
_isSyncCulling: !1,
_followNode: null
},
init: function(e, t, i) {
this._owner = e;
this._entity = t;
this._followNode = i ? i.node : null;
this.updatePos(!0);
},
lateUpdate: function() {
this._owner && this.updatePos(!1);
},
updatePos: function(e) {
if (this._owner) {
var t = this.getOwnerPos(), i = this._entity.node.position;
if (e || t.x !== i.x || t.y !== i.y) {
this._entity.node.position = t;
this.isMoving = !0;
this.node.emit("heroStartMove");
} else if (!0 === this.isMoving) {
this.isMoving = !1;
this.node.emit("heroStopMove");
}
}
},
getOwnerPos: function() {
var e = null;
if (this._followNode) {
var t = this._followNode.parent.convertToWorldSpaceAR(this._followNode);
e = (this._entity.node.parent ? this._entity.node.parent : this._entity.node).convertToNodeSpaceAR(t);
} else e = this._owner ? cc.v2(this._owner.position) : cc.Vec2.ZERO;
return e;
}
});
cc._RF.pop();
}, {} ],
MyScrollView: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "849f47bO/tNYoqEQiVMrfzo", "MyScrollView");
cc.Class({
extends: cc.Component,
properties: {
lastLine: -1,
itemPool: [],
compPool: [],
itemPrefab: cc.Prefab,
perLine: 1,
gapX: 0,
gapY: 0
},
init: function(e, t, i) {
this.datas = e;
this.datasLength = e.length;
this.callback = i;
this.itemPrefab = t.itemPrefab;
this.className = t.className;
this.gapX = t.gapX ? t.gapX : 0;
this.gapY = t.gapY ? t.gapY : 0;
this.perLine = t.perLine ? t.perLine : 1;
this.srollview = this.getComponent(cc.ScrollView);
var n = cc.instantiate(this.itemPrefab);
this.startX = t.startX || 0 === t.startX ? t.startX : -n.width / 2;
this.startY = t.startY || 0 === t.startY ? t.startY : n.height / 2;
this.itemWidth = n.width + this.gapX;
this.itemHeight = n.height + this.gapY;
this.itemLine = Math.ceil(this.srollview.node.height / this.itemHeight) + 1;
this.itemCount = this.itemLine * this.perLine;
this.maxLine = Math.ceil(this.datasLength / this.perLine);
this.srollview.content.height = this.itemHeight * this.maxLine;
this.compPool = [];
this.lastLine = -1;
this.isInit = !0;
this.onScrollView(!1);
return this.itemPool;
},
onScrollView: function(e) {
var t = e ? this.srollview.getScrollOffset().y : 0, i = Math.floor(t / this.itemHeight);
i < 0 && (i = 0);
if (i !== this.lastLine) {
this.lastLine = i;
for (var n = i + this.itemLine - 1, a = this.itemPool.length > this.datasLength ? this.itemPool.length : this.datasLength, o = 0; o < a; o++) {
var s = this.itemPool[o];
if ((r = Math.floor(o / this.perLine)) < i) s && (s.active = !1); else if (r > n) s && (s.active = !1); else {
if (!s) {
s = cc.instantiate(this.itemPrefab);
this.itemPool[o] = s;
s.active = !0;
s.parent = this.srollview.content;
var r = Math.floor(o / this.perLine), c = o % this.perLine;
s.x = c * this.itemWidth + this.startX;
s.y = -(this.itemHeight * r + this.startY);
}
if (!this.compPool[o]) {
this.compPool[o] = s.getComponent(this.className);
this.datas[o] && this.compPool[o].init(this.datas[o]);
}
s.active = !!this.datas[o];
}
}
this.isInit = !1;
}
},
scrollToRank: function(e, t) {
this.lastLine = -1;
var i = (e - Math.floor(this.itemCount / 2)) * this.itemHeight;
this.srollview.scrollToOffset(cc.v2(0, i), t);
},
refresh: function(e) {
this.datas = e;
this.datasLength = e.length;
this.maxLine = Math.ceil(this.datasLength / this.perLine);
this.srollview.content.height = this.itemHeight * this.maxLine;
for (var t = 0; t < this.datasLength; t++) this.compPool[t] && this.datas[t] && this.compPool[t].init(this.datas[t]);
}
});
cc._RF.pop();
}, {} ],
MywIdget: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "4cbb6wucd5IeLjoISUU+5+W", "MywIdget");
var n = e("GameData");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {},
start: function() {
this.node.height = n.instance.screenHeight;
}
});
cc._RF.pop();
}, {
GameData: "GameData"
} ],
NodeCollider: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "69613Wbj/5EdKmlrGNJWDIu", "NodeCollider");
var n = e("CollisionEventManager");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this._collider = this.node.getComponent(cc.Collider);
this.node.on("changeColliderTag", this.changeColliderTag, this);
this.node.on("changeNodeGroup", this.changeNodeGroup, this);
this.node.on("emitEvent", this.emitEvent, this);
},
init: function(e, t, i) {
this.parent = e;
this.needCheckCollision = t;
this.needCheckStay = i;
},
onCollisionEnter: function(e, t) {
this.needCheckCollision && n.getInstance().addCollisionEvent(e, t);
},
onCollisionStay: function(e, t) {
this.needCheckCollision && this.needCheckStay && n.getInstance().addCollisionStayEvent(e, t);
},
changeColliderTag: function(e) {
this._collider ? this._collider.tag = e : cc.error("no Collider To Change Tag");
},
changeNodeGroup: function(e) {
this.node.group = e;
},
emitEvent: function(e) {
this.parent && this.parent.emit(e[0], e[1]);
}
});
cc._RF.pop();
}, {
CollisionEventManager: "CollisionEventManager"
} ],
PanelAddTop: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "e2c0dhPRXdEkrxtrk8dpv2o", "PanelAddTop");
var n = e("PlayerData"), a = e("BagItem");
cc.Class({
extends: cc.Component,
properties: {
canNotReceiveNode: cc.Node,
canReceiveNode: cc.Node,
hasReceiveNode: cc.Node
},
init: function(e, t) {
this.world = e;
this.callback = t;
this.refresh();
},
refresh: function() {
var e = n.instance.canGetAddTopReward(), t = n.instance.hasGetAddTopReward();
this.canNotReceiveNode.active = !e;
this.canReceiveNode.active = e && !t;
},
onReceiveClick: function() {
var e = a.createItemWithString("1,32,1");
if (!n.instance.isOwnKnifeSkin(e.id)) {
n.instance.addKnifeSkin(e.id);
this.world.onEquipKnifeSkin(e.itemData, !0);
}
this.world.uiMgr.showReward(e.itemData);
this.world.uiMgr.refreshRedDot();
this.refresh();
},
onClose: function() {
this.node.active = !1;
this.callback && this.callback();
}
});
cc._RF.pop();
}, {
BagItem: "BagItem",
PlayerData: "PlayerData"
} ],
PanelBuySkin: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "894ff0YZVhLh6VOghnnqGFT", "PanelBuySkin");
var n = e("GameData"), a = e("ConfigData"), o = e("PlayerData"), s = e("PlatformMgr"), r = (e("Types").ShareType, 
e("AdvertMgr")), c = e("Types").AdverType, l = e("Tools"), h = e("UIUtil");
e("Types").ItemType, e("Types").StageType;
cc.Class({
extends: cc.Component,
properties: {
rootAnim: cc.Animation,
iconSprite: cc.Sprite,
buyKnifeTitleNode: cc.Node,
buyHeroTitleNode: cc.Node,
adverKnifeTitleNode: cc.Node,
adverHeroTitleNode: cc.Node,
nameLabel: cc.Label,
goldLabel: cc.Label,
unlockCountLabel: cc.Label,
buyBtn: cc.Node,
adverBtn: cc.Node,
parctialPool: [ cc.ParticleSystem ],
valueLabel: cc.Label
},
init: function(e, t) {
this.rootAnim.play();
var i = !0, d = !1, u = void 0;
try {
for (var f, p = this.parctialPool[Symbol.iterator](); !(i = (f = p.next()).done); i = !0) {
f.value.resetSystem();
}
} catch (e) {
d = !0;
u = e;
} finally {
try {
!i && p.return && p.return();
} finally {
if (d) throw u;
}
}
this.world = t;
this.callback = e;
this.skinData = o.instance.finalGetSkin;
if (this.skinData) {
this.nameLabel.string = this.skinData.name;
this.goldLabel.string = this.skinData.price;
this.isKnifeSkin = -1 === a.instance.heroSkinDatas.indexOf(this.skinData);
h.loadResSprite(this.iconSprite, this.skinData.url);
this.iconSprite.node.rotation = this.isKnifeSkin ? 90 : 0;
var m = o.instance.getCurTime(), g = a.instance.knifeSkinDatas.slice(), y = o.instance.ownKnifeSkins;
l.filterDataByTime(g, y, m, n.instance, a.instance.clientData.hideSpecialSkin, s.isIOS(), s.isApp());
var v = a.instance.heroSkinDatas.slice(), k = o.instance.ownHeroSkins;
l.filterDataByTime(v, k, m, n.instance, a.instance.clientData.hideSpecialSkin, s.isIOS(), s.isApp());
this.valueLabel.string = "Value";
this.unlockCountLabel.string = this.isKnifeSkin ? a.instance.getLanguageStr("Unlocked weapon") + ":" + y.length + "/" + g.length : a.instance.getLanguageStr("Unlocked hero") + ":" + k.length + "/" + v.length;
this.buyKnifeTitleNode.active = !this.skinData.isGetByAdver && this.isKnifeSkin;
this.buyHeroTitleNode.active = !this.skinData.isGetByAdver && !this.isKnifeSkin;
this.adverKnifeTitleNode.active = this.skinData.isGetByAdver && this.isKnifeSkin;
this.adverHeroTitleNode.active = this.skinData.isGetByAdver && !this.isKnifeSkin;
this.buyBtn.active = !this.skinData.isGetByAdver;
this.adverBtn.active = this.skinData.isGetByAdver;
this.skinData.isGetByAdver && r.instance.openAdver(c.BuySkin);
} else this.onClose();
},
onBuyBtnClick: function() {
if (o.instance.gold >= this.skinData.price) {
o.instance.updateGold(-this.skinData.price);
if (this.isKnifeSkin) {
o.instance.addKnifeSkin(this.skinData.id);
this.world.onEquipKnifeSkin(this.skinData, !0);
} else {
o.instance.addHeroSkin(this.skinData.id);
this.world.onEquipHeroSkin(this.skinData, !0);
}
this.world.uiMgr.showReward(this.skinData);
} else this.world.uiMgr.showTips(7);
this.onClose();
},
adverBtnClick: function() {
var e = this;
r.instance.showAdver(c.BuySkin, function(t) {
if (t) {
if (e.isKnifeSkin) {
o.instance.addKnifeSkin(e.skinData.id);
e.world.onEquipKnifeSkin(e.skinData, !0);
} else {
o.instance.addHeroSkin(e.skinData.id);
e.world.onEquipHeroSkin(e.skinData, !0);
}
e.world.uiMgr.showReward(e.skinData);
e.onClose();
}
}, function() {
e.world.uiMgr.showTips(4);
});
},
onClose: function() {
this.node.active = !1;
this.callback && this.callback();
},
onBtnClose: function() {
this.node.active = !1;
var e = this.isKnifeSkin ? this.skinData.id + 1e3 : this.skinData.id + 2e3;
this.skinData.isGetByAdver ? o.instance.updateRefuseAdverPool(e) : o.instance.updateRefuseBuyPool(e);
this.callback && this.callback();
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
ConfigData: "ConfigData",
GameData: "GameData",
PlatformMgr: "PlatformMgr",
PlayerData: "PlayerData",
Tools: "Tools",
Types: "Types",
UIUtil: "UIUtil"
} ],
PanelCheat: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "f79fb3Qb9FLNYcGRpEWgnrx", "PanelCheat");
var n = e("PlayerData"), a = e("ConfigData"), o = e("GameData"), s = e("PlatformMgr");
cc.Class({
extends: cc.Component,
properties: {
goldEditBox: cc.EditBox,
scoreEditBox: cc.EditBox,
killEditBox: cc.EditBox,
playEditBox: cc.EditBox,
timeEditBox: cc.EditBox,
signEditBox: cc.EditBox,
offlineEditBox: cc.EditBox,
GrowEditBoxs: [ cc.EditBox ],
adverEditBox: cc.EditBox,
timeOffsetEditBox: cc.EditBox,
setkillEditBox: cc.EditBox
},
onClose: function() {
this.node.active = !1;
},
onAddMoney: function() {
n.instance.showGold = Number(this.goldEditBox.string);
n.instance.gold = Number(this.goldEditBox.string);
n.instance.zongZi = Number(this.goldEditBox.string);
n.instance.saveUserData();
cc.director.loadScene("Battle");
},
onAddScore: function() {
n.instance.rankStar = Number(this.scoreEditBox.string);
n.instance.oldRankData = a.instance.getRankDataByStar(n.instance.rankStar);
n.instance.rankData = a.instance.getRankDataByStar(n.instance.rankStar);
n.instance.saveUserData();
cc.director.loadScene("Battle");
},
onAddKill: function() {
n.instance.killCount = Number(this.killEditBox.string);
n.instance.saveUserData();
cc.director.loadScene("Battle");
},
onSetKill: function() {
n.instance.setHolidayScore(Number(this.setkillEditBox.string));
n.instance.saveUserData();
cc.director.loadScene("Battle");
},
onAddPlay: function() {
n.instance.showPanelSignFlag = !1;
n.instance.playCount = Number(this.playEditBox.string);
n.instance.saveUserData();
cc.director.loadScene("Battle");
},
onAddTime: function() {
o.instance.gameTime = Number(this.timeEditBox.string);
cc.director.loadScene("Battle");
},
onAddSign: function() {
n.instance.onDaySpan();
n.instance.cheatOffset += 864e5;
n.instance.showPanelSignFlag = !1;
n.instance.saveUserData();
cc.director.loadScene("Battle");
},
onResetShareDailyRequest: function() {
var e = this;
s.resetShareDailyRequest(function() {
e.onAddSign();
});
},
onAddTimeOffset: function() {
n.instance.cheatOffset += 6e4 * Number(this.timeOffsetEditBox.string);
n.instance.saveUserData();
cc.director.loadScene("Battle");
},
onAddOffline: function() {
n.instance.getOfflineGoldTime -= 36e5 * Number(this.offlineEditBox.string);
n.instance.lastChangeGoldMultipTime -= 36e5 * Number(this.offlineEditBox.string);
n.instance.offlineFlag = !1;
n.instance.saveUserData();
cc.director.loadScene("Battle");
},
onAddRepay: function() {
n.instance.hasRepay = !1;
n.instance.saveUserData();
cc.director.loadScene("Battle");
},
onSetGrow: function(e, t) {
var i = Number(t);
n.instance.growLevel[i] = Number(this.GrowEditBoxs[i].string) - 1;
n.instance.saveUserData();
cc.director.loadScene("Battle");
},
onAddWatchAdver: function() {
n.instance.totalAdverCount = Number(this.adverEditBox.string);
n.instance.saveUserData();
cc.director.loadScene("Battle");
},
onClearTreasure: function() {
n.instance.treasureTurn = 0;
n.instance.saveUserData();
cc.director.loadScene("Battle");
},
onOpenMaxAdDebugView: function() {
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManage", "openMaxAdDebug", "()V");
},
onAddDiamond: function() {
n.instance.zongZi = Number(this.goldEditBox.string);
n.instance.saveUserData();
cc.director.loadScene("Battle");
}
});
cc._RF.pop();
}, {
ConfigData: "ConfigData",
GameData: "GameData",
PlatformMgr: "PlatformMgr",
PlayerData: "PlayerData"
} ],
PanelDailyTask: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "50712JOO4VDObeijk0O6pZp", "PanelDailyTask");
e("UIUtil");
var n = e("ConfigData"), a = e("PlayerData"), o = e("ShareMgr"), s = e("Types").ShareType, r = e("AdvertMgr"), c = e("Types").AdverType, l = e("Tools"), h = e("BagItem"), d = e("Types").ItemType, u = e("Types").StageType;
cc.Class({
extends: cc.Component,
properties: {
itemPool: [],
itemDailyTaskPrefab: cc.Prefab,
itemParentNode: cc.Node,
zongZiNumNode: cc.Node,
zongZiNumLabel: cc.Label,
zongziRewardNode: cc.Node,
titleNodes: [ cc.Node ],
iconNodes: [ cc.Node ],
exchangeNodes: [ cc.Node ],
hasGetNodes: [ cc.Node ],
priceLabels: [ cc.Label ],
refreshParentNode: cc.Node,
refreshTipsNode: cc.Node,
panelMult: cc.Node,
nommalLabel: cc.Label,
multLabel: cc.Label,
panelRefresh: cc.Node,
taskName: cc.Label,
remainLabel: cc.Label,
reaminTipsLabel: cc.Label,
goldAdverIcon: cc.Node,
goldShareIcon: cc.Node,
normalCoinIcon: [ cc.Node ],
multipCoinIcon: [ cc.Node ],
refreshAdverIcon: cc.Node,
refreshShareIcon: cc.Node,
activityTimeLabel: cc.Label,
bgNode: cc.Node,
helpTips: cc.Node,
trggleNode: cc.Node,
trggleRootNode: cc.Node,
trggleNodeWidget: cc.Widget
},
init: function(e, t) {
var i = this;
this.world = e;
this.callback = t;
setTimeout(function() {
i.trggleNodeWidget && i.trggleNodeWidget.onEnable();
}, 200);
this.activityDatas = n.instance.activityDuanWuDatas;
this.activityTimeLabel.string = n.instance.getUITipStr(11);
if (l.getItem("showHelpTips")) this.helpTips.active = !1; else {
this.helpTips.active = !0;
l.setItem("showHelpTips", 1);
}
this.trggleNode.active = !0;
this.trggleRootNode.opacity = 200;
this.isTrggle = !0;
r.instance.loadAdver(c.MultipDailyTask, function(e) {
e && r.instance.openAdver(c.MultipDailyTask);
});
this.refresh();
},
refresh: function() {
var e = this, t = a.instance.dailyShowTask, i = 0;
this.maxRewardIndex = 0;
var o = n.instance.isDuringDuanWuFestival(a.instance.getCurTime()), s = a.instance.isDuringDailyTaskGuide();
this.hasAdver = !0;
var f = function(t) {
e.hasAdver = t;
};
switch (n.instance.getCurStageByPrizeCount(a.instance)) {
case u.Free:
case u.Share:
f(!1);
break;

case u.Adver:
r.instance.loadAdver(c.RefreshDailyTask, f);
}
for (var p = 0; p < 3; p++) {
if (L = t[p]) {
var m = o && L.specialReward ? L.specialReward : L.reward, g = h.createItemWithString(m);
0 === g.type && (g.num = Math.ceil(g.num * (1 + L.goldMultiRate)));
if (g.num > i) {
i = g.num;
this.maxRewardIndex = p;
}
var y = L.process >= L.param, v = l.arrContains(a.instance.dailyOldTask, L.id) || l.arrContains(a.instance.completeGuideDailyTask, L.id);
if (this.itemPool[p]) this.itemPool[p].refresh(L, g, v, this.isTrggle, this.hasAdver); else {
var k = cc.instantiate(this.itemDailyTaskPrefab);
k.parent = this.itemParentNode;
k.y = 120 * -p;
var C = k.getComponent("ItemDailyTask");
C.refresh(L, g, v, this.isTrggle, this.hasAdver);
C.setOnItemClick(this, p);
C.setJumpCallback(function() {
e.node.active = !1;
e.world.onStartBtnClick(null, null);
});
this.itemPool[p] = C;
}
if (this.callback && y && !v && !L.hasShow) {
this.itemPool[p].needShowAnim = !0;
L.hasShow = !0;
a.instance.saveUserData("存储每日任务自动弹出信息");
}
} else {
console.error("每日任务为空");
console.log(JSON.stringify(t));
}
}
this.zongZiNumLabel.string = a.instance.zongZi;
this.titleNodes[0].active = s;
this.titleNodes[1].active = !this.titleNodes[0].active && o;
this.titleNodes[2].active = !this.titleNodes[0].active && !this.titleNodes[1].active;
this.zongZiNumNode.active = o && !s;
this.zongziRewardNode.active = o && !s;
this.zongziRewardNode.active && setTimeout(function() {
e.trggleNodeWidget && e.trggleNodeWidget.onEnable();
}, 200);
var S = n.instance.clientData.maxRefreshTaskCount, w = S - a.instance.dayRefreshTaskCount;
this.remainLabel.string = l.getStringByFormat(n.instance.getUITipStr(19), w, S);
this.reaminTipsLabel.string = "Refresh Missions For Free";
var T = !0, N = !0, _ = !1, b = void 0;
try {
for (var R, P = this.itemPool[Symbol.iterator](); !(N = (R = P.next()).done); N = !0) {
if (!R.value.isGet) {
T = !1;
break;
}
}
} catch (e) {
_ = !0;
b = e;
} finally {
try {
!N && P.return && P.return();
} finally {
if (_) throw b;
}
}
this.refreshTipsNode.active = !s && w > 0 && T;
this.bgNode.height = this.refreshTipsNode.active ? 470 : 420;
this.zongziRewardNode.y = this.refreshTipsNode.active ? -250 : -200;
if (this.refreshTipsNode.active) {
f = function(t) {
e.refreshAdverIcon.active = t;
e.refreshShareIcon.active = !t;
t && e.refreshTipsNode.active && r.instance.openAdver(c.RefreshDailyTask);
};
switch (n.instance.getCurStageByPrizeCount(a.instance)) {
case u.Free:
case u.Share:
f(!1);
break;

case u.Adver:
r.instance.loadAdver(c.RefreshDailyTask, f);
}
}
this.finalPrice = [];
for (var D = 0; D < this.activityDatas.length; D++) {
var L;
(L = this.activityDatas[D]).isLate = L.changeDate && l.isAfterOtherTime(L.changeDate, a.instance.getCurTime());
this.iconNodes[D].children[0].active = !L.isLate;
this.iconNodes[D].children[1].active = L.isLate;
var I = L.isLate ? L.latePrice : L.price;
this.exchangeNodes[D].active = !1;
m = L.isLate ? L.lateReward : L.reward;
var A = h.createItemsWithString(m);
this.finalPrice[D] = 0;
for (var M = 0; M < A.length; M++) {
var B = A[M], x = I[M] ? I[M] : 0;
switch (B.type) {
case d.HERO_SKIN:
a.instance.isOwnHeroSkin(B.id) ? x = 0 : this.exchangeNodes[D].active = !0;
break;

case d.KNIFE_SKIN:
a.instance.isOwnKnifeSkin(B.id) ? x = 0 : this.exchangeNodes[D].active = !0;
}
this.finalPrice[D] += x;
}
this.priceLabels[D].string = this.finalPrice[D];
this.hasGetNodes[D].active = !this.exchangeNodes[D].active;
}
},
onTrggleClick: function() {
this.trggleNode.active = !this.trggleNode.active;
this.isTrggle = this.trggleNode.active;
this.trggleRootNode.opacity = this.isTrggle ? 200 : 255;
this.refresh();
},
onItemClick: function(e, t) {
var i = this;
if (!this.isClick) {
this.isClick = !0;
var o = Number(t), s = this.itemPool[o], h = s.data, f = s.item;
if (s.isGet) {
console.log("已领取过该奖励");
this.isClick = !1;
} else {
var p = null;
switch (f.type) {
case d.MONEY:
p = function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, t = f.num * e;
a.instance.updateGold(t);
a.instance.showGold -= t;
var n = {
count: t,
isMore: 3 === e,
isLucky: !1
};
i.world.uiMgr.showGetMoneyEffect(n);
};
break;

case d.HERO_SKIN:
if (!a.instance.isOwnHeroSkin(f.id)) {
a.instance.addHeroSkin(f.id);
this.world.onEquipHeroSkin(f.itemData, !0);
}
this.world.uiMgr.showReward(f.itemData);
break;

case d.KNIFE_SKIN:
if (!a.instance.isOwnKnifeSkin(f.id)) {
a.instance.addKnifeSkin(f.id);
this.world.onEquipKnifeSkin(f.itemData, !0);
}
this.world.uiMgr.showReward(f.itemData);
break;

case d.ZONG_ZI:
p = function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, t = f.num * e;
a.instance.updateZongZi(t);
i.world.uiMgr.showTips(l.getStringByFormat(n.instance.getUITipStr(15), t));
};
}
this.multCallback = function(e) {
p && p(e);
a.instance.dailyShowTask[o].finalReceiveMult = e;
a.instance.updateDailyOldTask(h.id);
if (-1 === h.degree) {
a.instance.updateCompleteGuideDailyTask(h.id);
if (!a.instance.isDuringDailyTaskGuide()) {
var t = !0, n = !1, s = void 0;
try {
for (var r, c = i.itemPool[Symbol.iterator](); !(t = (r = c.next()).done); t = !0) {
r.value.playRefreshAnim();
}
} catch (e) {
n = !0;
s = e;
} finally {
try {
!t && c.return && c.return();
} finally {
if (n) throw s;
}
}
}
}
i.world.uiMgr.refreshRedDot();
i.refresh();
i.isClick = !1;
};
if (f.type === d.ZONG_ZI || p && o === this.maxRewardIndex && -1 !== h.degree) {
this.nommalLabel.string = "x" + f.num;
this.multLabel.string = "x" + 3 * f.num;
this.normalCoinIcon[0].active = f.type === d.MONEY;
this.multipCoinIcon[0].active = f.type === d.MONEY;
this.normalCoinIcon[1].active = f.type === d.ZONG_ZI;
this.multipCoinIcon[1].active = f.type === d.ZONG_ZI;
var m = function(e) {
i.goldAdverIcon.active = e;
i.goldShareIcon.active = !e;
};
switch (n.instance.getCurStageByPrizeCount(a.instance)) {
case u.Free:
case u.Share:
m(!1);
break;

case u.Adver:
r.instance.loadAdver(c.MultipDailyTask, m);
}
this.isTrggle ? this.onMultGoldBtnClick() : this.onNormalGoldBtnClick();
} else this.multCallback();
}
}
},
onPanelMultClose: function() {
this.isClick = !1;
this.panelMult.active = !1;
},
onNormalGoldBtnClick: function() {
if (this.multCallback) {
this.multCallback(1);
this.isClick = !1;
}
},
onMultGoldBtnClick: function() {
var e = this;
if (this.multCallback) {
var t = function(t) {
t && e.multCallback(3);
e.isClick = !1;
};
this.goldShareIcon.active ? this.showShare(s.MultipDailyTask, t) : this.goldAdverIcon.active ? this.showAdver(c.MultipDailyTask, s.MultipDailyTask, t) : t(!0);
}
},
showAdver: function(e, t, i) {
var a = this;
r.instance.fireBaseEvent("click_adv_btn", position_id, n.instance.getAdvertUnitId(e));
r.instance.showAdver(e, i, function() {
a.showShare(t, i);
});
},
showShare: function(e, t) {
o.share(e, t);
},
onPanelRefreshClose: function() {
this.panelRefresh.active = !1;
},
onRefreshBtnClick: function() {
var e = this;
this.refreshCloseFunc = function() {
for (var t = 0; t < 3; t++) {
var i = a.instance.dailyShowTask[t];
i.process = 0;
e.itemPool[t].playRefreshAnim();
var o = i.id;
a.instance.updateDailyOldTask(o);
var s = n.instance.getOneDailyTask(a.instance, t);
if (s) {
s.goldMultiRate = a.instance.rankData.goldMultiRate;
a.instance.dailyShowTask[t] = s;
} else console.error("Null task");
}
a.instance.updateDayRefreshTaskCount();
e.refresh();
e.world.uiMgr.refreshRedDot();
};
var t = function(t) {
if (t) {
e.onPanelRefreshClose();
e.refreshCloseFunc();
}
};
this.refreshShareIcon.active ? this.showShare(s.RefreshDailyTask, t) : this.refreshAdverIcon.active ? this.showAdver(c.RefreshDailyTask, s.RefreshDailyTask, t) : t(!0);
},
onExchangeBtnClick: function(e, t) {
var i = this, o = Number(t), s = this.activityDatas[o];
if (a.instance.zongZi < this.finalPrice[o]) this.world.uiMgr.showTips("Insufficient Diamond"); else {
var r = s.isLate ? s.lateReward : s.reward, c = h.createItemsWithString(r), u = !0, f = !1, p = void 0;
try {
for (var m, g = c[Symbol.iterator](); !(u = (m = g.next()).done); u = !0) {
var y = m.value;
switch (y.type) {
case d.MONEY:
var v = y.num;
a.instance.updateGold(v);
a.instance.showGold -= v;
var k = {
count: v,
isMore: !1,
isLucky: !1
};
this.world.uiMgr.showGetMoneyEffect(k);
this.world.uiMgr.showTips(l.getStringByFormat(n.instance.getUITipStr(16), v));
break;

case d.HERO_SKIN:
if (a.instance.isOwnHeroSkin(y.id)) {
y.hasGet = !0;
this.world.onEquipHeroSkin(y.itemData, !0);
} else {
a.instance.addHeroSkin(y.id);
this.world.onEquipHeroSkin(y.itemData, !0);
}
break;

case d.KNIFE_SKIN:
if (a.instance.isOwnKnifeSkin(y.id)) {
y.hasGet = !0;
this.world.onEquipKnifeSkin(y.itemData, !0);
} else {
a.instance.addKnifeSkin(y.id);
this.world.onEquipKnifeSkin(y.itemData, !0);
}
}
}
} catch (e) {
f = !0;
p = e;
} finally {
try {
!u && g.return && g.return();
} finally {
if (f) throw p;
}
}
2 === c.length ? c[0].hasGet ? this.world.uiMgr.showReward(c[1].itemData) : c[1].hasGet ? this.world.uiMgr.showReward(c[0].itemData) : this.world.uiMgr.showReward(c[0].itemData, function() {
i.world.uiMgr.showReward(c[1].itemData);
}) : c[0].type !== d.KNIFE_SKIN && c[0].type !== d.HERO_SKIN || this.world.uiMgr.showReward(c[0].itemData);
a.instance.updateZongZi(-this.finalPrice[o]);
this.refresh();
}
},
onClose: function() {
this.node.active = !1;
this.callback && this.callback();
r.instance.showBanner();
console.log("showBanner onPanelDaliyTask close ");
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
BagItem: "BagItem",
ConfigData: "ConfigData",
PlayerData: "PlayerData",
ShareMgr: "ShareMgr",
Tools: "Tools",
Types: "Types",
UIUtil: "UIUtil"
} ],
PanelEvaulate: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "24f97ijfgFKN4C0SmkxsWGs", "PanelEvaulate");
var n = e("GameData"), a = e("PlatformMgr"), o = e("PlayerData");
cc.Class({
extends: cc.Component,
properties: {
bgNode: cc.Node,
starNode: cc.Node,
btnBgNode: cc.Node,
blackBtnBgNode: cc.Node
},
init: function(e, t) {
this.callback = e;
this.world = t;
this.stars = this.starNode.children;
for (var i = 0; i < this.stars.length; i++) this.stars[i].active = !1;
this.btnBgNode.active = !1;
this.blackBtnBgNode.active = !0;
this.bgNode.height = n.instance.screenHeight;
AdvertMgr.instance.fireBaseEvent("page_show_rating");
},
onClick: function(e, t) {
for (var i = Number.parseInt(t), n = 0; n < this.stars.length; n++) this.stars[n].active = n < i;
this.count = i;
this.btnBgNode.active = !0;
this.blackBtnBgNode.active = !1;
AdvertMgr.instance.fireBaseEvent("click_rating", "stars", i);
},
onRate: function() {
5 === this.count ? a.openStoreComment() : this.world.uiMgr.showTips("Rating success");
this.onClose();
o.instance.endEvaulateCount();
},
onClose: function() {
this.node.active = !1;
this.callback && this.callback();
}
});
cc._RF.pop();
}, {
GameData: "GameData",
PlatformMgr: "PlatformMgr",
PlayerData: "PlayerData"
} ],
PanelFirstGuide: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "43a23/nKVtHUJo9Qyr0M4qi", "PanelFirstGuide");
var n = e("ConfigData");
cc.Class({
extends: cc.Component,
properties: {
itemGuidePrefab: cc.Prefab,
guideContent: cc.Node,
startNode: cc.Node,
endNode: cc.Node,
startLabel: cc.Label,
endLabel: cc.Label,
startAnim: cc.Animation,
endAnim: cc.Animation,
specialNode: cc.Node,
specialLabel: cc.Label,
processLabel: cc.Label
},
start: function() {
this.itemPool = [];
this.guideData = n.instance.guideData;
for (var e = 0; e < 4; e++) {
var t = cc.instantiate(this.itemGuidePrefab);
t.active = !1;
t.parent = this.guideContent;
t.x = -300;
t.y = -55 * e;
var i = t.getComponent("ItemGuide");
i.tipsLabel.string = this.guideData.startTips[e];
this.itemPool[e] = i;
}
this.specialTime = 0;
this.canShowSpecial = !1;
},
refreshGuideProcess: function(e) {
this.processLabel.string = e;
},
showGuideStart: function(e) {
var t = this;
if (e > 3) this.node.active = !1; else {
this.endNode.active = !1;
this.startAnim.node.active = !0;
this.startAnim.play();
setTimeout(function() {
t.startNode.active = !0;
}, 300);
setTimeout(function() {
if (t.startNode.active) {
t.startNode.active = !1;
t.canShowSpecial = !0;
0 === e && (t.processLabel.node.active = !0);
}
}, 2e3);
var i = this.itemPool[e];
this.startLabel.string = "新任务：" + i.tipsLabel.string;
this.startNode.width = 40 * this.startLabel.string.length + 100;
i.node.active = !0;
var n = cc.moveBy(.3, cc.v2(300, 0)).easing(cc.easeBackInOut());
i.node.runAction(n);
i.showEffect.node.active = !0;
}
},
showGuideSpecial: function(e) {
if (this.canShowSpecial) {
this.specialNode.active = !0;
this.specialLabel.string = this.guideData.specialTips[e];
this.specialNode.width = 40 * this.specialLabel.string.length + 200;
this.specialTime = 2;
}
},
showGuideEnd: function(e) {
var t = this;
0 === e && (this.processLabel.node.active = !1);
this.startNode.active = !1;
this.canShowSpecial = !1;
this.specialNode.active = !1;
this.specialTime = 0;
this.endLabel.string = this.guideData.endTips[e];
this.endNode.width = 40 * this.endLabel.string.length + 200;
this.endAnim.node.active = !0;
this.endAnim.play();
setTimeout(function() {
t.endNode.active = !0;
}, 200);
var i = this.itemPool[e];
i.checkEffect.node.active = !0;
setTimeout(function() {
i.checkNode.active = !0;
}, 100);
},
update: function(e) {
if (this.canShowSpecial && this.specialTime > 0) {
this.specialTime -= e;
this.specialTime <= 0 && (this.specialNode.active = !1);
}
}
});
cc._RF.pop();
}, {
ConfigData: "ConfigData"
} ],
PanelFriend: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "a78f3ggTr1Ogbfm7hxvn+i9", "PanelFriend");
var n = e("ShareMgr"), a = e("AdvertMgr"), o = e("PlatformMgr"), s = e("Types").ShareType, r = e("Types").PlatformType;
cc.Class({
extends: cc.Component,
properties: {
wxSubContextView: cc.Node,
world: null,
_texture: null,
subDomainSprite: cc.Sprite,
_delayRefreshCanvasTime: .2,
_refreshCanvasElapsed: 0,
_pollInterval: .3,
_pollSubDomain: !1,
_pollCount: 10,
_curPollCount: 0,
_clickInterval: .2
},
init: function(e) {
this.world = e;
this._clickInterval = 0;
o.showOpenDataContext();
this.showOpenDataContext();
a.instance.showBanner();
console.log("showBanner PanelFriend init ");
},
showOpenDataContext: function() {
switch (o.platformType) {
case r.WECHAT:
this._texture = new cc.Texture2D();
var e = cc.view.getVisibleSize(), t = wx.getOpenDataContext();
this.sharedCanvas = t.canvas;
this.sharedCanvas.width = e.width;
this.sharedCanvas.height = e.height;
this.subDomainSprite.node.active = !0;
this._delayRefreshCanvasTime = .2;
this._refreshCanvasElapsed = 0;
this.resetPollState();
break;

default:
this.subDomainSprite.node.active = !1;
}
},
onShareBtnClick: function() {
var e = this;
n.share(s.Friend, function(t) {
t && e.world.uiMgr.showTips(1);
});
},
onCloseBtnClick: function() {
this.node.active = !1;
o.closeOpenDataContext();
},
onLeftBtnClick: function() {
if (!(this._clickInterval > 0)) {
this._clickInterval = .2;
o.leftOpenDataContext();
this.resetPollState();
}
},
onRightBtnClick: function() {
if (!(this._clickInterval > 0)) {
this._clickInterval = .2;
o.rightOpenDataContext();
this.resetPollState();
}
},
update: function(e) {
this._clickInterval > 0 && (this._clickInterval -= e);
if (o.platformType == r.WECHAT) if (this._delayRefreshCanvasTime > 0) this._delayRefreshCanvasTime -= e; else if (this._refreshCanvasElapsed > 0) this._refreshCanvasElapsed -= e; else {
this._refreshCanvasElapsed = this._pollInterval;
this._updateSubDomainCanvas();
}
},
_updateSubDomainCanvas: function() {
if (this.isPollSubDomain() && o.platformType == r.WECHAT && this._texture) {
this._texture.initWithElement(this.sharedCanvas);
this._texture.handleLoadedTexture();
this.subDomainSprite.spriteFrame = new cc.SpriteFrame(this._texture);
}
},
isPollSubDomain: function() {
if (!this._pollSubDomain) return !1;
this._curPollCount++;
if (this._curPollCount > this._pollCount) {
this._curPollCount = 0;
this._pollSubDomain = !1;
return !1;
}
return !0;
},
resetPollState: function() {
this._pollSubDomain = !0;
this._curPollCount = 0;
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
PlatformMgr: "PlatformMgr",
ShareMgr: "ShareMgr",
Types: "Types"
} ],
PanelGameOver: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "660aeovmnZDu641t/+QJ1YK", "PanelGameOver");
var n = e("UIUtil"), a = e("ConfigData"), o = e("PlayerData"), s = e("ShareMgr"), r = e("Types").ShareType, c = e("AdvertMgr"), l = e("Types").AdverType, h = e("Tools"), d = e("PlatformMgr"), u = e("Types").GrowType, f = e("Types").StageType, p = e("GameData"), m = [ "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th" ];
cc.Class({
extends: cc.Component,
properties: {
winNode: cc.Node,
loseNode: cc.Node,
rankLabel: cc.Label,
infoLabel: cc.Label,
goldLabel: cc.Label,
shareNode: cc.Node,
getNode: cc.Node,
rankNameLabel: cc.Label,
rankIconSprite: cc.Sprite,
resultNode: cc.Node,
rankNode: cc.Node,
time: 0,
bar: cc.Node,
rankLabelNodes: cc.Node,
rankGoldLabelNodes: cc.Node,
playerRankLabel: cc.Label,
playerNameLabel: cc.Label,
playerGoldLabel: cc.Label,
addScoreLabel: cc.Label,
allGoldNode: cc.Node,
normalGoldNode: cc.Node,
multiplyGoldNode: cc.Node,
multiplyGoldLabel: cc.Label,
multiplyRateLabel: cc.Label,
itemNode: cc.Node,
goldNode: cc.Node,
iconNode: cc.Node,
flagNode: cc.Node,
shareIcon: cc.Node,
adverIcon: cc.Node,
shareThreeIcon: cc.Node,
adverThreeIcon: cc.Node,
luckyRewardNode: cc.Node,
luckyRewardBtn: cc.Node,
luckyBarNode: cc.Node,
luckyBar: cc.Node,
multLabel: cc.Label,
multNode: cc.Node,
xNode: cc.Node,
lotteryAnim: cc.Animation,
blockNode: cc.Node,
starNodes: [ cc.Node ],
noStarNodes: [ cc.Node ],
protectNode: cc.Node,
protectStarNode: cc.Node,
protectLevelNode: cc.Node,
protectRankLabel: cc.Label,
protectRankSprite: cc.Sprite,
protectStarNodes: [ cc.Node ],
noProtectRankLabel: cc.Label,
noProtectRankSprite: cc.Sprite,
noProtectStarNodes: [ cc.Node ],
protectKingNode: cc.Node,
protectKingLabel: cc.Label,
noProtectKingNode: cc.Node,
noProtectKingLabel: cc.Label,
protectShareIcon: cc.Node,
protectAdverIcon: cc.Node,
kingNode: cc.Node,
kingStar: cc.Node,
kingLabel: cc.Label,
noTakeStarTips: cc.Node,
noTakeStarLabel: cc.Label,
animAddStar: cc.Animation,
animSubStar: cc.Animation,
animProtectStar: cc.Animation,
animChangeLevel: cc.Animation,
rankBgFor2or3: cc.Node,
multipFreeIcon: cc.Node,
multipShareIcon: cc.Node,
multipAdverIcon: cc.Node,
luckyFreeIcon: cc.Node,
luckyShareIcon: cc.Node,
luckyAdverIcon: cc.Node,
panelMultAgain: cc.Node,
multAgainShareIcon: cc.Node,
multAgainAdverIcon: cc.Node,
fiveMultIcon: cc.Node,
tenMultIcon: cc.Node,
multAgainGoldLabel: cc.Label,
okLangLabel: cc.Label,
getLangLabel: cc.Label,
collectLangLabel: cc.Label
},
cleanUp: function() {
this.first = !1;
this.hasGet = !1;
this.addStarCallback = null;
this.isLucky = !1;
this.isMore = !1;
this.multip = 1;
},
init: function(e) {
var t = this;
this.okLangLabel.string = "OK";
this.getLangLabel.string = "You got it.";
this.collectLangLabel.string = "Collect";
this.world = e;
this.world.uiMgr.openPanelKeyCount(!0);
if (!this.first) {
this.first = !0;
this.panelMultAgain.active = !1;
this.luckyRewardNode.active = !1;
var i = e.localPlayer.rank, s = 1 === i;
this.win = 1 === i;
var r = o.instance.rankData, d = o.instance.getGrowLevelDataByType(u.Gold);
p.instance.isShowLog() && console.log(d);
var g = d.realGoldParam / 100;
c.instance.fireBaseEvent("pege_show_settlement", "rankid", toString(i));
if (s) {
this.resultNode.active = !1;
this.loseNode.active = !1;
this.rankBgFor2or3.active = !1;
this.startRefresh = !1;
this.rankNode.active = !0;
var y = e.players.concat();
y.sort(function(e, t) {
return e.rank - t.rank;
});
for (var v = 0; v < y.length; v++) {
var k = "", C = y[v];
k += "" + m[v];
k += "                " + h.getShowNickName(C.name);
this.rankLabelNodes.children[v].getComponent(cc.Label).string = k;
var S = r.getGold[C.rank - 1];
S = C.isLocal ? Math.ceil(S * (C.rankData.goldMultiRate + g + 1)) : Math.ceil(S * (C.rankData.goldMultiRate + (C.goldAddition ? C.goldAddition : 0) + 1));
this.rankGoldLabelNodes.children[v].getComponent(cc.Label).string = S;
this.itemNode.children[v].active = !0;
this.goldNode.children[v].active = !0;
n.loadResSprite(this.iconNode.children[v].getComponent(cc.Sprite), C.rankData.url);
n.loadResFlag(this.flagNode.children[v].getComponent(cc.Sprite), C.country);
this.rankLabelNodes.children[v].y = -70 * v;
this.rankGoldLabelNodes.children[v].y = -70 * v;
this.itemNode.children[v].y = -70 * v;
this.goldNode.children[v].y = -70 * v;
this.iconNode.children[v].y = -70 * v;
this.flagNode.children[v].y = -70 * v;
}
this.infoLabel.string = "Defeat all other players!";
this.winNode.active = !0;
} else {
this.rankNode.active = !1;
this.winNode.active = !1;
this.rankBgFor2or3.active = !0;
this.resultNode.active = !0;
this.loseNode.active = !0;
this.rankLabel.string = "" + m[i - 1];
this.infoLabel.string = "";
if (2 === i) this.infoLabel.string = "You are almost there!"; else if (3 === i) this.infoLabel.string = "Keep trying!You can do it!"; else {
var w = e.localPlayer.killer;
e.gameRuleSystem._countDownTime > 0 ? this.infoLabel.string = w ? h.getStringByFormat(a.instance.getUITipStr(14), w.name) : "You were defeated by wall." : this.infoLabel.string = "Time is up.";
}
this.startRefresh = !0;
}
this.getWay = a.instance.getMultipGoldWayByCount(o.instance.dayPlayCount);
this.isMult = i <= 8;
this.shareThreeIcon.active = !(0 !== this.getWay || !this.isMult);
this.adverThreeIcon.active = !(1 !== this.getWay || !this.isMult);
this.shareIcon.active = 0 === this.getWay && !this.isMult;
this.adverIcon.active = 1 === this.getWay && !this.isMult;
this.oldHideScore = o.instance.hideScore;
this.getHideScore = s ? r.winHideScore : r.loseHideScore;
this.newHideScore = this.oldHideScore + this.getHideScore;
this.newHideScore = a.instance.clampHideScore(this.newHideScore);
var T = o.instance.getLuckyRewardData(), N = a.instance.clientData.luckyRewardLimitCount, _ = T + 1 < N ? T + 1 : N;
this.luckyBar.width = 265 * T / N;
this.finalLuckyBarWidth = 265 * _ / N;
this.canShowLuckyBtn = N === _;
this.luckyRewardBtn.active = N === _;
this.goldCount = Math.ceil(h.getItemOrFinalItem(r.getGold, i - 1) * (r.goldMultiRate + g + 1));
p.instance.isShowLog() && console.log("基础金币", h.getItemOrFinalItem(r.getGold, i - 1), "段位加成", r.goldMultiRate, "成长加成", g);
this.goldLabel.string = this.goldCount;
this.finalGoldCount = this.isMult ? 3 * this.goldCount : 120;
this.multiplyGoldLabel.string = this.finalGoldCount;
this.multiplyRateLabel.string = h.getStringByFormat(a.instance.getUITipStr(11), Math.ceil(100 * r.goldMultiRate + 100));
this.multiplyGoldNode.active = !this.luckyRewardBtn.active;
if (i > 3) {
this.multiplyGoldNode.active = !1;
this.luckyRewardBtn.active = !1;
this.luckyBarNode.active = !1;
} else this.luckyBarNode.active = !0;
if (this.multiplyGoldNode.active) {
this.stage = a.instance.getCurStageByPrizeCount(o.instance);
o.instance.isFristGame() && (this.stage = f.Free);
this.multipFreeIcon.active = this.stage === f.Free;
this.multipShareIcon.active = this.stage === f.Share;
this.multipAdverIcon.active = this.stage === f.Adver;
2 === this.stage && c.instance.loadAdver(l.MultipGold, function(e) {
t.multipShareIcon.active = !e;
t.multipAdverIcon.active = e;
e && c.instance.openAdver(l.MultipGold);
});
}
this.luckyShareIcon.active = !1;
this.luckyAdverIcon.active = !0;
this.allGoldNode.active = !1;
o.instance.hideScore = this.newHideScore;
o.instance.level = a.instance.getLevelByHideScore(this.newHideScore);
o.instance.setLuckyRewardData(_);
this.rankNameLabel.string = r.name;
n.loadResSprite(this.rankIconSprite, r.url);
this.oldStar = o.instance.rankStar;
this.curStar = this.oldStar;
var b = 0 === r.levelUpStar;
this.kingNode.active = !!b;
this.kingLabel.string = "x" + (this.oldStar - r.star);
b || this.refreshRankStar();
this.noTakeStarTips.active = !1;
this.noTakeStarLabel = this.noTakeStarTips.children[0].getComponent("cc.Label");
var R = this, P = this.starNodes, D = h.arrContains(r.addStarRanks, i) ? 1 : this.curStar > 0 && h.arrContains(r.subStarRanks, i) ? -1 : 0, L = this.oldStar + D, I = a.instance.getRankDataByStar(L), A = 0 === I.levelUpStar, M = I.id !== r.id;
if (M && D < 0 && !r.canLevelDown) D = 0; else {
this.curStar = L;
this.refreshData();
}
this.animAddStar.node.active = !1;
this.animChangeLevel.node.active = !1;
if (1 === D) {
if (M) {
B = P[E = L - r.star - 1];
this.animAddStar.node.active = !0;
R.animAddStar.node.position = B.position;
this.addStarCallback = function() {
R.animAddStar.once("finished", function() {
B.active = !0;
setTimeout(function() {
R.animChangeLevel.node.active = !0;
R.animChangeLevel.play();
R.rankNameLabel.string = I.name;
R.multiplyRateLabel.string = h.getStringByFormat(a.instance.getUITipStr(11), Math.ceil(100 * I.goldMultiRate + 100));
n.loadResSprite(R.rankIconSprite, I.url);
R.refreshRankStar();
if (A) {
R.kingNode.active = !0;
R.kingLabel.string = "x" + (L - I.star);
}
R.refreshMultipGoldBtn();
}, 700);
});
R.animAddStar.play();
};
} else if (b) {
this.animAddStar.node.active = !0;
R.animAddStar.node.position = cc.v2(-45, 0);
this.addStarCallback = function() {
R.animAddStar.play();
setTimeout(function() {
R.kingLabel.string = "x" + (L - I.star);
R.refreshMultipGoldBtn();
}, 500);
};
} else {
var B = P[E = L - r.star - 1];
this.animAddStar.node.active = !0;
R.animAddStar.node.position = B.position;
this.addStarCallback = function() {
R.animAddStar.play();
setTimeout(function() {
B.active = !0;
}, 300);
setTimeout(function() {
R.refreshMultipGoldBtn();
}, 500);
};
}
this.noTakeStarTips.active = !0;
this.noTakeStarLabel.string = "Congratulations! Get a rank star.";
} else if (-1 === D) {
this.blockNode.active = !0;
if (M) {
B = P[E = L - I.star] ? P[E] : this.kingStar;
this.subRefreshCallback = function() {
R.animChangeLevel.node.active = !0;
R.animChangeLevel.play();
R.rankNameLabel.string = I.name;
R.multiplyRateLabel.string = h.getStringByFormat(a.instance.getUITipStr(11), Math.ceil(100 * I.goldMultiRate + 100));
n.loadResSprite(R.rankIconSprite, I.url);
R.refreshRankStar();
B.active = !0;
if (b) {
R.kingNode.active = !1;
R.kingLabel.string = "x" + (L - I.star);
}
setTimeout(function() {
R.animSubStar.node.position = B.position;
R.animSubStar.node.active = !0;
R.animSubStar.play();
setTimeout(function() {
B.active = !1;
R.refreshMultipGoldBtn();
}, 300);
}, 1e3);
};
this.protectCallback = function() {
R.animChangeLevel.node.active = !0;
R.animChangeLevel.play();
};
} else {
var x = cc.sequence(cc.fadeOut(.1), cc.fadeIn(.1), cc.fadeOut(.1), cc.fadeIn(.1), cc.fadeOut(.1), cc.fadeIn(.1), cc.fadeTo(.2, 150));
if (b) {
this.kingStar.runAction(x);
this.subRefreshCallback = function() {
R.animSubStar.node.position = cc.v2(-45, 0);
R.animSubStar.node.active = !0;
R.animSubStar.play();
t.kingStar.active = !0;
R.animSubStar.once("finished", function() {
R.animSubStar.node.active = !1;
R.kingLabel.string = "x" + (L - I.star);
R.refreshMultipGoldBtn();
});
};
this.protectCallback = function() {
R.animProtectStar.node.position = cc.v2(-45, 0);
R.animProtectStar.node.active = !0;
R.animProtectStar.play();
R.kingLabel.string = "x" + (R.oldStar - I.star);
setTimeout(function() {
t.kingStar.active = !0;
}, 500);
};
} else {
var E = L - r.star;
(B = P[E]).runAction(x);
this.subRefreshCallback = function() {
R.animSubStar.node.position = B.position;
R.animSubStar.node.active = !0;
R.animSubStar.play();
setTimeout(function() {
B.active = !1;
R.refreshMultipGoldBtn();
}, 300);
};
this.protectCallback = function() {
R.animProtectStar.node.position = B.position;
R.animProtectStar.node.active = !0;
R.animProtectStar.play();
setTimeout(function() {
B.active = !0;
}, 500);
};
}
}
this.noTakeStarTips.active = !0;
this.noTakeStarLabel.string = r.subStarRanks[0] - 1 > 1 ? "未获得前" + (r.subStarRanks[0] - 1) + "名，失去1颗星" : "未获得第一名，失去1颗星";
var F = a.instance.getProtectWayByCount(o.instance.dayProtectCount);
this.protectWay = F;
setTimeout(function() {
if (0 === F || 1 === F) t.showPanelProtect(r, I, M, F); else {
t.subRefreshCallback && t.subRefreshCallback();
t.blockNode.active = !1;
}
}, M ? 500 : 1e3);
} else this.refreshMultipGoldBtn();
if (this.startRefresh) {
this.addStarCallback && this.addStarCallback();
this.world.showPanelTreasureBox();
}
}
},
refreshData: function(e) {
o.instance.rankStar = this.curStar;
o.instance.oldRankData = e ? a.instance.getRankDataByStar(this.curStar) : o.instance.rankData;
var t = a.instance.getRankDataByStar(this.curStar);
if (o.instance.rankData !== t) {
o.instance.rankData = t;
t.unlockMap && (o.instance.newMap = t.unlockMap);
}
d.setUserCloudStorage(o.instance.rankStar);
},
refreshRankStar: function() {
for (var e = a.instance.getRankDataByStar(this.curStar), t = this.starNodes, i = this.noStarNodes, n = 40 / e.levelUpStar + 20, o = 0; o < 5; o++) {
var s = o * n * 2 - n * (e.levelUpStar - 1), r = this.curStar > e.star + o, c = o < e.levelUpStar;
if (t[o]) {
t[o].active = !(!r || !c);
1 === e.levelUpStar ? t[o].x = 0 : t[o].x = s;
}
if (i[o]) {
i[o].active = !!c;
1 === e.levelUpStar ? i[o].x = 0 : i[o].x = s;
}
}
},
restartGame: function() {
if (!this.hasGet) {
this.hasGet = !0;
var e = {
count: this.goldCount,
isMore: this.isMore,
isLucky: this.isLucky,
multip: this.multip
};
o.instance.updateGold(this.goldCount);
o.instance.showGold -= this.goldCount;
this.world.uiMgr.showGetMoneyEffect(e);
this.world.restartGame();
c.instance.showInterstitial();
}
},
showMultAgain: function(e, t) {
var i = this;
this.resultNode.active = !1;
this.panelMultAgain.active = !0;
this.multAgainCount = e * t;
this.multAgainGoldLabel.string = this.multAgainCount;
var n = function(e) {
i.multAgainAdverIcon.active = e;
i.multAgainShareIcon.active = !e;
e && c.instance.openAdver(l.MultipAgain);
};
switch (a.instance.getCurStageByPrizeCount(o.instance)) {
case f.Free:
case f.Share:
n(!1);
break;

case f.Adver:
c.instance.loadAdver(l.MultipAgain, n);
}
},
onMultAgainBtnClick: function() {
var e = this, t = function(t) {
if (t) {
var i = e.multAgainCount;
o.instance.resetDayMultAgainCDCount(a.instance.clientData.dayMultAgainCDCount);
o.instance.updateGold(i);
o.instance.showGold -= i;
var n = {
count: i,
isMore: !1,
isLucky: !0
};
e.world.uiMgr.showGetMoneyEffect(n);
e.world.uiMgr.showTips(h.getStringByFormat(a.instance.getUITipStr(17), i));
e.world.restartGame();
}
};
this.multAgainShareIcon.active ? this.showMultAgainShare(t) : this.multAgainAdverIcon.active ? this.showMultAgainAdvert(t) : t(!0);
},
onCLoseMultAgain: function() {
this.panelMultAgain.active = !1;
o.instance.resetDayMultAgainCDCount(a.instance.clientData.dayMultAgainCDCount);
o.instance.updateDayMultAgainCloseCount();
this.world.restartGame();
},
showMultAgainShare: function(e) {
s.share(r.MultipAgain, e);
},
showMultAgainAdvert: function(e) {
var t = this;
c.instance.showAdver(l.MultipAgain, e, function() {
t.showMultAgainShare(e);
});
},
onShareBtnClick: function() {
var e = this;
s.share(r.WIN, function(t) {
t && e.world.uiMgr._GSGame.showTips(1);
});
},
onMultiplyBtnClick: function() {
var e = this, t = function(t) {
if (t) {
e.goldCount = e.finalGoldCount;
e.multip = 3;
e.isMore = !0;
e.restartGame();
}
};
this.multipShareIcon.active ? this.showShare(t) : this.multipAdverIcon.active ? this.showAdvert(t) : t(!0);
},
showShare: function(e) {
s.share(r.MultipGold, e);
},
showAdvert: function(e) {
var t = this;
c.instance.fireBaseEvent("click_adv_btn", "position_id", a.instance.getAdvertUnitId(l.MultipGold));
c.instance.showAdver(l.MultipGold, e, function() {
t.showShare(e);
});
},
onContinueBtnClick: function() {
this.rankNode.active = !1;
this.resultNode.active = !0;
this.startRefresh = !0;
this.addStarCallback && this.addStarCallback();
this.world.showPanelTreasureBox();
},
update: function(e) {
this.startRefresh && this.allGoldNode.active && this.updateLuckyBar(e);
},
updateRankBar: function(e) {
if (this.oldStar !== this.newStar) {
var t = a.instance.getRankDataByStar(this.oldStar);
if (0 !== t.levelUpStar) {
var i = t.levelUpStar * e * 1.5;
this.getStar < t.levelUpStar && (i = this.getStar * e * 1.5);
this.oldStar += i;
this.getStar > 0 ? this.oldStar > this.newStar && (this.oldStar = this.newStar) : this.oldStar < this.newStar && (this.oldStar = this.newStar);
if ((t = a.instance.getRankDataByStar(this.oldStar)).name !== this.rankNameLabel.string) {
this.rankNameLabel.string = t.name;
n.loadResSprite(this.rankIconSprite, t.url);
}
0 === t.levelUpStar ? this.bar.width = 300 : this.bar.width = (this.oldStar - t.star) / t.levelUpStar * 300;
}
}
},
updateLuckyBar: function(e) {
if (this.luckyBar.width !== this.finalLuckyBarWidth) {
this.luckyBar.width += 100 * e;
this.luckyBar.width > this.finalLuckyBarWidth && (this.luckyBar.width = this.finalLuckyBarWidth);
}
},
onLuckyRewardBtnClick: function() {
this.luckyRewardNode.active = !0;
this.onLuckyMultipBtnClick();
},
onLuckyMultipBtnClick: function() {
this.blockNode.active = !0;
var e = this, t = function(t) {
if (t) {
e.isLucky = !0;
var i = a.instance.clientData.luckyRewardMultips, n = h.getRandomInt(5, 10);
if (i[o.instance.luckyRewardCount]) {
n = h.getRandomInt(i[o.instance.luckyRewardCount], 10);
o.instance.updateLuckyRewardCount();
}
e.multip = n;
e.finalGoldCount = n * e.goldCount;
e.lotteryAnim.play("ani-lucky-slot");
var s = e.xNode.children;
e.multNode.y = 2590;
var r = n + "\n\r";
s[0].x = 10 === n ? 0 : 40;
s[0].y = 0;
for (var c = 1; c < 10; c++) {
var l = h.getRandomInt(5, 10);
r += l + "\n\r";
if (s[c]) {
s[c].x = 10 === l ? 0 : 40;
s[c].y = -259 * c;
}
}
r += "10\n\r";
s[10].x = 0;
s[10].y = -2590;
e.multLabel.string = r;
var d = cc.delayTime(.3), u = cc.moveTo(3, cc.v2(0, 0)).easing(cc.easeBounceOut()), f = cc.callFunc(function() {
o.instance.setLuckyRewardData(0);
e.goldCount = e.finalGoldCount;
setTimeout(function() {
e.restartGame();
e.blockNode.active = !1;
}, 500);
});
e.multNode.runAction(cc.sequence(d, u, f));
} else e.blockNode.active = !1;
};
this.luckyShareIcon.active ? this.showLuckyShare(t) : this.luckyAdverIcon.active ? this.showLuckyAdver(t) : t(!0);
},
showLuckyShare: function(e) {
s.share(r.MultipGold, e);
},
showLuckyAdver: function(e) {
var t = this;
c.instance.showAdver(l.MultipGold, e, function() {
t.showLuckyShare(e);
});
},
onCloseLuckyNodeBtnClick: function() {
this.luckyRewardNode.active = !1;
},
onProtectBtnClick: function() {
var e = this, t = function(t) {
if (t) {
e.noTakeStarTips.active = !1;
e.protectNode.active = !1;
e.curStar = e.oldStar;
e.refreshData(!0);
o.instance.updateDayProtectCount();
if (e.protectCallback) {
e.protectCallback();
setTimeout(function() {
e.refreshMultipGoldBtn();
}, 500);
}
}
};
0 === this.protectWay ? e.showProtectShare(t) : e.showProtectAdver(t);
},
showProtectShare: function(e) {
s.share(r.ProtectStar, e);
},
showProtectAdver: function(e) {
var t = this;
c.instance.showAdver(l.ProtectStar, e, function() {
t.showProtectShare(e);
});
},
onReduceProtectBtnClick: function() {
this.protectNode.active = !1;
this.subRefreshCallback && this.subRefreshCallback();
},
showPanelProtect: function(e, t, i, a) {
this.protectNode.active = !0;
this.blockNode.active = !1;
this.protectStarNode.active = !i;
this.protectLevelNode.active = !!i;
this.protectRankLabel.node.parent.y = i ? -75 : -110;
this.noProtectRankLabel.node.parent.y = i ? -75 : -110;
if (!i) {
this.refreshProtectRankStar(this.protectStarNodes, this.oldStar);
this.refreshProtectRankStar(this.noProtectStarNodes, this.curStar);
}
this.protectKingNode.active = 0 === t.levelUpStar;
this.protectKingLabel.string = "x" + (this.oldStar - t.star);
this.noProtectKingNode.active = 0 === t.levelUpStar;
this.noProtectKingLabel.string = "x" + (this.curStar - t.star);
this.protectRankLabel.string = e.name;
this.noProtectRankLabel.string = t.name;
n.loadResSprite(this.protectRankSprite, e.url);
n.loadResSprite(this.noProtectRankSprite, t.url);
this.protectShareIcon.active = 0 === a;
this.protectAdverIcon.active = 1 === a;
},
refreshProtectRankStar: function(e, t) {
for (var i = a.instance.getRankDataByStar(t), n = e[1].children, o = e[0].children, s = 140 / i.levelUpStar, r = 0; r < n.length; r++) {
var c = t > i.star + r, l = r < i.levelUpStar;
if (n[r]) {
n[r].active = !(!c || !l);
if (1 === i.levelUpStar) {
n[r].x = 0;
n[r].y = 0;
} else {
n[r].x = r * s * 2 - s * (i.levelUpStar - 1);
0 === n[r].x ? n[r].y = 0 : n[r].y += Math.abs(n[r].x) / 2 - 20;
}
}
if (o[r]) {
o[r].active = !!l;
o[r].x = n[r].x;
o[r].y = n[r].y;
}
}
},
refreshMultipGoldBtn: function() {
this.allGoldNode.active = !0;
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
ConfigData: "ConfigData",
GameData: "GameData",
PlatformMgr: "PlatformMgr",
PlayerData: "PlayerData",
ShareMgr: "ShareMgr",
Tools: "Tools",
Types: "Types",
UIUtil: "UIUtil"
} ],
PanelGetSkin: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "aab23QOfi5HQqqLrmKGbvFO", "PanelGetSkin");
var n = e("ConfigData"), a = e("AdvertMgr"), o = e("Types").AdverType, s = e("PlayerData"), r = e("Types").TaskType;
cc.Class({
extends: cc.Component,
properties: {
propertyLabel: cc.Label,
tipsLabel: cc.Label,
processLabel: cc.Label
},
init: function(e, t, i) {
this.data = e;
this.callback = t;
this.errCallback = i;
this.refresh();
this.tipsLabel.string = "Watch ads 30 times";
a.instance.openAdver(o.WatchAdver);
},
refresh: function() {
var e = s.instance.getTaskProcess(r.ADVERCOUNT);
e > this.data.taskParam && (e = this.data.taskParam);
this.processLabel.string = e + "/" + this.data.taskParam;
},
onCloseBtnClick: function() {
this.node.active = !1;
},
onWathAdverBtnClick: function() {
var e = this;
a.instance.fireBaseEvent("click_adv_btn", "position_id", n.instance.getAdvertUnitId(o.AddKnife));
a.instance.showAdver(o.WatchAdver, function(t) {
if (t) {
e.refresh();
e.callback && e.callback(!0);
}
}, function() {
e.errCallback && e.errCallback();
});
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
ConfigData: "ConfigData",
PlayerData: "PlayerData",
Types: "Types"
} ],
PanelGrowUp: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "986dbkQEgNFjKRtIs9lVQxW", "PanelGrowUp");
var n = e("PlayerData"), a = e("Types").GrowType, o = e("ConfigData"), s = e("Tools"), r = e("ShareMgr"), c = e("Types").ShareType, l = e("AdvertMgr"), h = e("Types").AdverType;
cc.Class({
extends: cc.Component,
properties: {
growNode: cc.Node,
bgNode: cc.Node,
checkNode: cc.Node,
closeNode: cc.Node,
iconNode: cc.Node,
arrowNode: cc.Node,
priceNode: cc.Node,
adverNode: cc.Node,
lockCheckNode: cc.Node,
lockCloseNode: cc.Node,
lockNode: cc.Node,
unlockBtnAnimNode: cc.Node,
unlockInfoAnim: cc.Animation,
rootNode: cc.Node,
tipsLabel: cc.Label,
nameLabel: cc.Label,
levelLabel: cc.Label,
paramLabel: cc.Label,
priceLabel: cc.Label,
getGoldNode: cc.Node,
getGoldLabel: cc.Label,
getGoldAdverIcon: cc.Node,
getGoldShareIcon: cc.Node,
levelUpByGoldNode: cc.Node,
levelUpByAdverNode: cc.Node,
downNodeAni: cc.Animation,
lockTips: cc.Node,
lockTipsLabel: cc.Label,
unlockInfoNode: cc.Node,
lockArr: [],
unlockTipsNode: cc.Node,
unlockTipsIconNode: cc.Node,
unlockTipsLabelNode: cc.Node
},
init: function(e) {
var t = this;
switch (o.instance.getCurGrowStage(n.instance.playCount, o.instance.clientData.growLimit)) {
case 0:
this.lockArr = [ 0, 1, 2, 3 ];
break;

case 1:
this.lockArr = [ 0, 1 ];
break;

case 2:
this.lockArr = [];
}
switch (n.instance.showUnlockGrow) {
case 1:
this.lockArr = [ 0, 1, 2, 3 ];
this.showCallFunc = function(e) {
t.showAnim([ 2, 3 ], [ 0, 1 ], e);
};
break;

case 2:
this.lockArr = [ 0, 1 ];
this.showCallFunc = function(e) {
t.showAnim([ 0, 1 ], [], e);
};
}
n.instance.showUnlockGrow = 0;
this.world = e;
this.checkNodes = this.checkNode.children;
this.closeNodes = this.closeNode.children;
this.iconNodes = this.iconNode.children;
this.lockCheckNodes = this.lockCheckNode.children;
this.lockCloseNodes = this.lockCloseNode.children;
this.lockNodes = this.lockNode.children;
this.arrowNodes = this.arrowNode.children;
this.animNodes = this.unlockBtnAnimNode.children;
this.growDatas = o.instance.growDatas;
for (var i = 0; i < this.arrowNodes.length; i++) {
var a = this.arrowNodes[i], r = this.growDatas[i], c = n.instance.getGrowLevelDataByType(i);
n.instance.gold >= c.price && !s.arrContains(this.lockArr, i) && c.id !== r.maxLevel ? a.active = !0 : a.active = !1;
}
this.onBtnClick(null, 2, !1);
this.getGoldAdverIcon.active = o.instance.clientData.stopAdverToShare;
this.getGoldShareIcon.active = !this.getGoldAdverIcon.active;
},
showAnim: function(e, t, i) {
var a = this, o = 0, s = function(e) {
if (2 === e) {
a.checkNodes[e].active = !1;
a.lockCheckNodes[e].active = !0;
a.unlockInfoNode.active = !1;
a.lockTips.active = !0;
} else {
a.closeNodes[e].active = !1;
a.lockCloseNodes[e].active = !0;
}
setTimeout(function() {
a.animNodes[e].active = !0;
var o = a.animNodes[e].children[0].getComponent(cc.Animation);
o.once("finished", function() {
a.animNodes[e].active = !1;
var o = n.instance.getGrowLevelDataByType(e);
n.instance.gold >= o.price && (a.arrowNodes[e].active = !0);
if (1 === e || 3 === e) {
a.lockArr = t;
a.onBtnClick(null, 2, !1);
i && i();
} else if (2 === e) {
a.unlockInfoAnim.node.active = !0;
a.unlockInfoAnim.play();
a.unlockInfoAnim.once("finished", function() {
a.unlockInfoAnim.node.active = !1;
});
}
});
o.play();
}, 1200);
a.unlockTipsIconNode.children[o].children[e].active = !0;
a.unlockTipsLabelNode.children[o].getComponent(cc.Label).string = a.growDatas[e].name;
o++;
}, r = !0, c = !1, l = void 0;
try {
for (var h, d = e[Symbol.iterator](); !(r = (h = d.next()).done); r = !0) {
s(h.value);
}
} catch (e) {
c = !0;
l = e;
} finally {
try {
!r && d.return && d.return();
} finally {
if (c) throw l;
}
}
this.unlockTipsNode.active = !0;
},
onBtnClick: function(e, t) {
for (var i = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], n = Number(t), a = 0; a < this.checkNodes.length; a++) if (a === n) {
this.checkNodes[a].active || s.arrContains(this.lockArr, a) || (this.checkNodes[a].active = !0);
this.closeNodes[a].active && (this.closeNodes[a].active = !1);
this.lockCheckNodes[a].active || (this.lockCheckNodes[a].active = !0);
this.lockCloseNodes[a].active && (this.lockCloseNodes[a].active = !1);
0 !== this.lockNodes[a].y && (this.lockNodes[a].y = 0);
1 !== this.iconNodes[a].scale && (this.iconNodes[a].scale = 1);
0 !== this.iconNodes[a].y && (this.iconNodes[a].y = 0);
255 !== this.iconNodes[a].opacity && (this.iconNodes[a].opacity = 255);
} else {
this.checkNodes[a].active && (this.checkNodes[a].active = !1);
this.closeNodes[a].active || s.arrContains(this.lockArr, a) || (this.closeNodes[a].active = !0);
this.lockCheckNodes[a].active && (this.lockCheckNodes[a].active = !1);
this.lockCloseNodes[a].active || (this.lockCloseNodes[a].active = !0);
-22 !== this.lockNodes[a].y && (this.lockNodes[a].y = -22);
.7 !== this.iconNodes[a].scale && (this.iconNodes[a].scale = .7);
-16 !== this.iconNodes[a].y && (this.iconNodes[a].y = -16);
155 !== this.iconNodes[a].opacity && (this.iconNodes[a].opacity = 155);
}
this.refreshShowData(n, i);
},
refreshShowData: function(e) {
var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
this.curType = e;
var i = this.growDatas[e], a = n.instance.getGrowLevelDataByType(e);
this.nameLabel.string = i.name;
this.levelLabel.string = "Lv" + a.id;
this.paramLabel.string = a.showTips;
this.priceLabel.string = s.getGoldStr(a.price);
var o = a.price > n.instance.gold ? cc.Color.RED : new cc.Color().fromHEX("#702800");
s.setNodeColor(this.priceLabel.node, o);
this.tipsLabel.string = i.tips;
this.rootNode.x = 3 === e ? 55 : 0;
this.curData = a;
this.priceNode.active = a.id !== i.maxLevel;
this.adverNode.active = this.priceNode.active;
this.lockTips.active = s.arrContains(this.lockArr, e);
this.unlockInfoNode.active = !this.lockTips.active;
this.lockTipsLabel.string = i.lockTips + "(" + n.instance.playCount + "/" + i.param + ")";
for (var r = 0; r < this.arrowNodes.length; r++) {
var c = this.arrowNodes[r];
r === e && c.active && (c.active = !1);
a = n.instance.getGrowLevelDataByType(r);
n.instance.gold < a.price && c.active && (c.active = !1);
}
t && this.downNodeAni.play();
},
growBtnClick: function() {
if (this.curData) if (this.levelUpByAdverNode.active) this.onLevelUpByAdverBtnClick(); else if (n.instance.gold >= this.curData.price) {
this.onGrowUp(this.curType);
n.instance.updateGold(-this.curData.price, null, !0);
this.refreshShowData(this.curType);
this.world.uiMgr.showTips(5);
} else {
if (n.instance.dayGetGoldCount < 3) {
this.getGoldNode.active = !0;
var e = n.instance.rankData, t = n.instance.getGrowLevelDataByType(a.Gold).realGoldParam / 100, i = e.goldMultiRate + t + 1;
this.getGoldcount = Math.ceil(s.getItemOrFinalItem(e.getGold, 0) * i * 5);
this.getGoldLabel.string = s.getGoldStr(this.getGoldcount);
} else this.world.uiMgr.showTips(6);
}
},
onLevelUpByAdverBtnClick: function() {
var e = this, t = function(t) {
if (t) {
e.onGrowUp(e.curType);
e.refreshShowData(e.curType);
n.instance.saveUserData("看广告升级属性");
}
};
l.instance.showAdver(h.GrowNode, t, function() {
e.showShare(t);
});
},
showShare: function(e) {
r.share(c.GrowNode, e);
},
closeGoldNode: function() {
this.getGoldNode.active = !1;
},
onGetGoldBtnClick: function() {
var e = this, t = function(t) {
if (t) {
n.instance.dayGetGoldCount++;
n.instance.updateGold(e.getGoldcount);
n.instance.showGold -= e.getGoldcount;
var i = {
count: e.getGoldcount,
isMore: !0,
isLucky: !1
};
e.world.uiMgr.showGetMoneyEffect(i);
e.closeGoldNode();
e.refreshShowData(e.curType, !1);
}
};
l.instance.showAdver(h.NotEnoughMoney, t, function() {
r.share(c.NotEnoughMoney, t);
});
},
onGrowUp: function(e) {
n.instance.updateGrowLevel(e);
var t = n.instance.getGrowLevelDataByType(e);
if (t) switch (e) {
case a.Attack:
this.world.localPlayer.changeAttackPower(t.realParam);
break;

case a.Defence:
this.world.localPlayer.changeDefencePower(t.realParam);
break;

case a.Speed:
this.world.localPlayer.changeGrowSpeedAddition(t.realParam);
break;

case a.Gold:
this.world.uiMgr.refreshOfflineGoldData();
}
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
ConfigData: "ConfigData",
PlayerData: "PlayerData",
ShareMgr: "ShareMgr",
Tools: "Tools",
Types: "Types"
} ],
PanelHeroPosArr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "173058fGhVKLZ2hm7p0mJSL", "PanelHeroPosArr");
cc.Class({
extends: cc.Component,
properties: {
posArrPrefab: cc.Prefab
},
addHeroPosArr: function(e, t, i) {
var n = cc.instantiate(this.posArrPrefab), a = n.getComponent("HeroPosArrow");
n.parent = this.node;
a.init(e, t, i);
e.posArrowPool.push(a);
}
});
cc._RF.pop();
}, {} ],
PanelHeroShop_new: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "dc9d4s0LLBM3oVZQlMj9IFk", "PanelHeroShop_new");
var n = e("Tools"), a = e("ConfigData"), o = e("PlayerData"), s = e("AdvertMgr"), r = e("Types").AdverType, c = e("ShareMgr"), l = e("Types").ShareType, h = e("Types").TaskType, d = e("Types").ItemGetType, u = e("GameData"), f = e("PlatformMgr");
cc.Class({
extends: cc.Component,
properties: {
topNode: cc.Node,
content: cc.Node,
itemHeroSkin: cc.Prefab,
pageView: cc.PageView,
pagePrefab: cc.Prefab,
buyNode: cc.Node,
unLockNode: cc.Node,
linkNode: cc.Node,
nameLabel: cc.Label,
introduceNode: cc.Node,
introduceTextNode: cc.Node,
introduceLabel: cc.Label,
propertyNode: cc.Node,
propertyLabel: cc.Label,
propertyAnim: cc.Animation,
taskStartLabel: cc.Label,
taskProgressLabel: cc.Label,
taskFinalLabel: cc.Label,
taskInfoNode: cc.Node,
watchAdverBtnNode: cc.Node,
watchAdverLabel: cc.Label,
buyLangLabel: cc.Label,
unlockLangLabel: cc.Label,
jumpNode: cc.Node,
shareIcon: cc.Node,
adverIcon: cc.Node,
suitNode: cc.Node,
suitNameLabel: cc.Label,
suiProcessLabel: cc.Label,
suitCloseIcon: cc.Node,
suitActiveIcon: cc.Node,
suitHeroNameLabel: cc.Label,
suitKnifeNameLabel: cc.Label,
suitSkillLabel: cc.Label,
suitHeroFlag: cc.Node,
suitKnifeFlag: cc.Node,
suitHeroFalseFlag: cc.Node,
suitKnifeFalseFlag: cc.Node,
suitIconNode: cc.Node,
_itemCells: [],
_itemNodes: [],
_itemPageCells: [],
_pageClickHistory: [],
itemTypePool: [],
typeIconNode: cc.Node,
shopBgNode: cc.Node,
perCount: 3,
goldIcon: cc.Node,
diamondIcon: cc.Node,
priceLabel: cc.Label,
lastPageIndex: 0,
keyNode: cc.Node,
keyParentNode: cc.Node
},
onLoad: function() {
this.checkUI();
this._itemClickHistory = {};
},
init: function(e) {
this.world = e;
this.localPlayer = e.localPlayer;
this.initData();
this.initUI();
this.initKey();
this.refresh();
this.scrollPage();
this.showName();
},
initData: function() {
this.itemTypePool = [];
var e = a.instance.heroSkinDatas.slice(), t = o.instance.getCurTime(), i = o.instance.ownHeroSkins;
n.filterDataByTime(e, i, t, u.instance, a.instance.clientData.hideSpecialSkin, f.isIOS(), f.isApp());
e.sort(function(e, t) {
return e.sort - t.sort;
});
for (var s = 0; s < e.length; s++) {
var r = e[s], c = 0;
if (0 === r.getWay) c = 0 === r.priceType ? d.GOLD : d.DIAMOND; else if (1 === r.getWay) c = r.taskType === h.RANK ? d.RANK : r.taskType === h.TREASUREBOX ? d.BOX : d.TASK; else if (100 === r.getWay) {
c = d.NFT;
var l = f.nft_balance_ids[r.goodsId] || 0;
r.rest = 1e3 - l;
}
this.push(c, r);
}
},
initUI: function() {
this.page = -1;
this.pageTypes = [];
for (var e = 0; e < this.itemTypePool.length; e++) {
var t = this.itemTypePool[e];
if (t) for (var i = Math.ceil(t.length / this.perCount), n = 0; n < i; n++) {
this.page++;
this.pageTypes[this.page] = e;
var a = this.content.children[this.page];
a || ((a = cc.instantiate(this.pagePrefab)).parent = this.content);
for (var s = 0; s < this.perCount; s++) {
var r, c = t[n * this.perCount + s], l = a.children[s];
if (l) r = l.getComponent("ItemHeroSkin_new"); else {
(l = cc.instantiate(this.itemHeroSkin)).parent = a;
l.position = cc.v2(s % 3 * 230 - 235, -100 - 240 * Math.floor(s / 3));
(r = l.getComponent("ItemHeroSkin_new")).init(c);
r.page = this.page;
r.index = s;
if (c) {
r.setOnItemClick(this, r);
this._itemCells.push(r);
this.pushToPageItemPool(this.page, r);
}
}
c && o.instance.heroSkinId === c.id && (this.lastPageIndex = this.page);
}
}
}
},
checkUI: function() {
var e = u.instance.isPad();
this.topNode.y = e ? -200 : 0;
this.pageView.node.height = e ? 300 : 550;
this.shopBgNode.height = e ? 500 : 750;
this.suitNode.y = e ? 240 : 390;
this.perCount = e ? 3 : 6;
},
initKey: function() {
for (var e = o.instance.keyCount, t = 0; t < 3; t++) this.keyParentNode.children[t].active = t < e;
},
push: function(e, t) {
this.itemTypePool[e] || (this.itemTypePool[e] = []);
this.itemTypePool[e].push(t);
},
pushToPageItemPool: function(e, t) {
this._itemPageCells[e] || (this._itemPageCells[e] = []);
this._itemPageCells[e].push(t);
},
getItemByPage: function(e, t) {
if (this._itemPageCells[e]) return this._itemPageCells[e][t];
},
selectItem: function(e) {
if (this._itemPageCells[e]) {
for (var t = -1, i = this._itemPageCells[e].length - 1; i >= 0; i--) {
var n = this._itemPageCells[e][i];
if (n.isGet) {
if (n.equipNode.active) {
this.onItemClick(null, this._itemPageCells[e][i], !1, !0);
return;
}
} else t = i;
}
if (-1 !== t) {
this._pageClickHistory[e] && (t = this._pageClickHistory[e]);
this.onItemClick(null, this._itemPageCells[e][t], !1, !0);
}
}
},
onScrollPage: function(e) {
var t = e.getCurrentPageIndex(), i = this.getPageType(t);
this.setTitle(i);
this.selectItem(t);
},
setTitle: function(e) {
for (var t = 0; t < this.typeIconNode.children.length; t++) this.typeIconNode.children[t].active = t === e;
},
showName: function() {
var e = this;
this.nameLabel.node.active = !1;
setTimeout(function() {
e.nameLabel.node.active = !0;
}, 500);
},
getPageType: function(e) {
return this.pageTypes[e];
},
scrollPage: function() {
var e = this;
this.pageView.onLoad();
var t = this.lastPageIndex - 1;
t = t >= 0 ? t : 1;
this.pageView.setCurrentPageIndex(t);
setTimeout(function() {
e.pageView.setCurrentPageIndex(e.lastPageIndex);
e.onScrollPage(e.pageView);
}, 200);
},
refresh: function() {
var e = !0, t = !1, i = void 0;
try {
for (var a, s = this._itemCells[Symbol.iterator](); !(e = (a = s.next()).done); e = !0) {
var r = a.value;
if (r) {
var c = r.data, l = o.instance.isOwnHeroSkin(c.id);
if (100 == c.getWay && !l) {
if ((f.nft_user_datas[c.goodsId] || 0) > 0) {
console.log("购买后。同步到本地皮肤数据");
o.instance.addHeroSkin(c.id);
l = !0;
}
}
var d = n.arrContains(o.instance.completeTaskIds, c.taskId), u = n.arrContains(o.instance.needCheckTaskIds, c.taskId), p = c.newDate && n.isBeforeOtherTime(c.newDate, o.instance.getCurTime()), m = o.instance.canBuyItem(c) && !this._itemClickHistory[c.id], g = "";
if (1 === c.getWay && c.taskType !== h.RANK && c.taskType !== h.DUANWU && c.taskType !== h.TREASUREBOX) {
g = o.instance.getTaskProcess(c.taskType) + "/" + c.taskParam;
}
r.refresh(l, d, u, p, g, m);
l && 0;
o.instance.heroSkin.id === c.id && this.onItemClick(null, r, !0);
}
}
} catch (e) {
t = !0;
i = e;
} finally {
try {
!e && s.return && s.return();
} finally {
if (t) throw i;
}
}
},
buyBtnClick: function() {
if (this.lastCheckItem) {
var e = this.lastCheckItem;
switch (e.data.priceType) {
case 0:
if (o.instance.gold >= e.data.price) {
o.instance.addHeroSkin(e.data.id);
o.instance.updateGold(-e.data.price);
this.refresh();
this.onItemClick(null, e);
} else this.world.uiMgr.showTips(7);
break;

case 1:
s.instance.fireBaseEvent("click_store_product_btn", "product_type", "skinhero");
if (o.instance.zongZi >= e.data.price) {
o.instance.addHeroSkin(e.data.id);
o.instance.updateZongZi(-e.data.price);
this.refresh();
this.onItemClick(null, e);
} else this.world.uiMgr.showTips("Insufficient Diamond");
}
}
},
jumpBtnClick: function() {
if (this.lastCheckItem) {
this.world.uiMgr.closePanelShop();
switch (this.lastCheckItem.data.jumpParam) {
case "PanelInvite":
this.world.uiMgr.showPanelInvite();
break;

case "PanelDailyTask":
this.world.uiMgr.showPanelDailyTask();
break;

case "PanelAddTop":
this.world.uiMgr.showPanelAddTop();
break;

case "PanelSign":
this.world.uiMgr.showPanelSign();
break;

case "PanelHolidayRank":
this.world.uiMgr.showPanelHolidayRank(!0);
}
}
},
unLockBtnClick: function() {
var e = this, t = function(t) {
if (e.lastCheckItem && t) {
var i = e.lastCheckItem;
o.instance.addHeroSkin(i.data.id);
e.refresh();
e.onItemClick(null, i);
i.data.taskType === h.LOGIN && o.instance.updateSignCount();
e.world.uiMgr.refreshRedDot();
}
};
this.shareIcon.active ? this.showShare(t) : this.showAdver(t);
},
linkBtnClick: function() {
var e = this.lastCheckItem.data;
f.requestNFTGet(e);
},
showShare: function(e) {
c.share(l.UnlockSkin, e);
},
showAdver: function(e) {
var t = this;
s.instance.fireBaseEvent("click_adv_btn", "position_id", a.instance.getAdvertUnitId(r.UnlockHeroSkin));
s.instance.showAdver(r.UnlockHeroSkin, e, function() {
t.showShare(e);
});
},
onItemClick: function(e, t) {
var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], s = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], r = t, c = r.data;
this.lastCheckItem && this.lastCheckItem.setCheck(!1);
r.setCheck(!0);
r.setCanBuy(!1);
this.lastCheckItem = r;
s || r.isGet || (this._pageClickHistory[r.page] = r.index);
this.buyNode.active = !1;
this.linkNode.active = !1;
this.unLockNode.active = !1;
this.watchAdverBtnNode.active = !1;
this.jumpNode.active = !1;
this.world.onEquipHeroSkin(c, r.isGet, !1);
if (r.isGet) {
this.lastEquipItem && this.lastEquipItem.setEquip(!1);
this.lastEquipItem = r;
r.setEquip(!0);
} else if (0 === c.getWay) {
this.buyNode.active = !0;
c.price && (this.priceLabel.string = n.getGoldStr(c.price));
this.goldIcon.active = 0 === c.priceType;
this.diamondIcon.active = 1 === c.priceType;
} else if (1 === c.getWay) if (n.arrContains(o.instance.completeTaskIds, c.taskId)) {
this.unLockNode.active = !0;
this.shareIcon.active = 1 === c.unlockWay;
this.adverIcon.active = 2 === c.unlockWay;
} else c.taskType === h.ADVERCOUNT && (this.watchAdverBtnNode.active = !0); else if (100 === c.getWay) {
this.buyNode.active = !1;
this.linkNode.active = !0;
}
this.nameLabel.string = c.name;
this.introduceNode.active = !(r.isGet || this.buyNode.active || this.unLockNode.active || this.watchAdverBtnNode.active);
this.introduceLabel.string = c.introduce;
this.propertyNode.active = !!c.propertyTips;
this.propertyLabel.string = c.propertyTips ? c.propertyTips : "";
this.propertyNode.active && this.propertyAnim.play();
this.keyNode.active = c.taskType === h.TREASUREBOX;
this.introduceTextNode.active = !this.keyNode.active;
this.taskInfoNode.active = 1 === c.getWay;
if (this.taskInfoNode.active) {
var l = (v = o.instance.getTaskProcess(c.taskType)) < c.taskParam ? v : c.taskParam;
this.taskStartLabel.string = "(";
this.taskProgressLabel.string = l || 0;
this.taskFinalLabel.string = "/" + c.taskParam + ")";
if (c.taskType === h.RANK || c.taskType === h.DUANWU || c.taskType === h.TREASUREBOX) {
this.taskStartLabel.string = "";
this.taskProgressLabel.string = "";
this.taskFinalLabel.string = "";
}
this.watchAdverLabel.string = n.getStringByFormat(a.instance.getUITipStr(20), l, c.taskParam);
}
this.buyLangLabel.string = "Buy";
this.unlockLangLabel.string = "Unlock:";
this.suitNode.active = c.suit;
if (c.suit) {
var d = a.instance.getSuitData(c.suit), u = c, f = a.instance.getKnifeSkinById(d.knifeSkin), p = o.instance.isOwnHeroSkin(d.heroSkin), m = o.instance.isOwnKnifeSkin(d.knifeSkin), g = o.instance.isCurEquipHeroSkin(u.id), y = o.instance.isCurEquipKnifeSkin(f.id);
this.suitNameLabel.string = d.name;
var v = 0;
p && v++;
m && v++;
this.suiProcessLabel.string = "(" + v + "/2)";
this.suitHeroNameLabel.string = u.name;
this.suitKnifeNameLabel.string = f.name;
this.suitSkillLabel.string = d.skillTips;
for (var k = 0; k < this.suitIconNode.children.length; k++) this.suitIconNode.children[k] && (this.suitIconNode.children[k].active = k + 1 == c.suit);
this.suitHeroFlag.active = g;
this.suitKnifeFlag.active = y;
this.suitHeroFalseFlag.active = !g;
this.suitKnifeFalseFlag.active = !y;
this.suitActiveIcon.active = p && m && g && y;
this.suitCloseIcon.active = !(p && m && g && y);
this.suitActiveIcon.active && !i && this.world.uiMgr.showActiveSuitEffect();
}
},
onWathAdverBtnClick: function() {
var e = this;
s.instance.showAdver(r.WatchAdver, function(t) {
if (e.lastCheckItem && t) {
var i = e.lastCheckItem;
e.world.taskMgr.refreshTaskInHome();
e.refresh();
e.onItemClick(null, i);
}
}, function() {
e.world.uiMgr.showTips(4);
});
},
onBtnClose: function() {
this.world.uiMgr.closePanelShop(!1);
},
close: function() {
this.lastEquipItem && this.lastEquipItem.setEquip(!1);
this.lastCheckItem && this.lastCheckItem.setCheck(!1);
this.closeCallcack && this.closeCallcack();
this.world.onEquipHeroSkin(o.instance.heroSkin, !0);
o.instance.clearNeedCheckTaskIds();
this._pageClickHistory = [];
this._itemClickHistory = {};
},
setCloseCallback: function(e) {
this.closeCallcack = e;
},
update: function(e) {
this.propertyAnim.node.width !== this.propertyNode.width + 20 && (this.propertyAnim.node.width = this.propertyNode.width + 20);
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
ConfigData: "ConfigData",
GameData: "GameData",
PlatformMgr: "PlatformMgr",
PlayerData: "PlayerData",
ShareMgr: "ShareMgr",
Tools: "Tools",
Types: "Types"
} ],
PanelHeroShop: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "38dac1gXjJBHpMTcIL9UKrh", "PanelHeroShop");
var n = e("Tools"), a = e("ConfigData"), o = e("PlayerData"), s = e("AdvertMgr"), r = e("Types").AdverType, c = e("ShareMgr"), l = e("Types").ShareType, h = e("Types").TaskType, d = e("GameData"), u = e("PlatformMgr");
cc.Class({
extends: cc.Component,
properties: {
topNode: cc.Node,
itemScrollView: cc.ScrollView,
itemScrollViewBar: cc.Node,
itemScrollViewWindow: cc.Node,
content: cc.Node,
itemHeroSkin: cc.Prefab,
buyNode: cc.Node,
unLockNode: cc.Node,
nameLabel: cc.Label,
introduceLabel: cc.Label,
initCountLabel: cc.Label,
countLabel: cc.Label,
propertyNode: cc.Node,
propertyLabel: cc.Label,
taskStartLabel: cc.Label,
taskProgressLabel: cc.Label,
taskFinalLabel: cc.Label,
taskInfoNode: cc.Node,
watchAdverBtnNode: cc.Node,
downNode: cc.Node,
watchAdverLabel: cc.Label,
buyLangLabel: cc.Label,
goLangLabel: cc.Label,
jumpNode: cc.Node,
shareIcon: cc.Node,
adverIcon: cc.Node,
_itemCells: [],
_itemNodes: [],
suitNode: cc.Node,
suitNameLabel: cc.Label,
suiProcessLabel: cc.Label,
suitCloseIcon: cc.Node,
suitActiveIcon: cc.Node,
suitHeroNameLabel: cc.Label,
suitKnifeNameLabel: cc.Label,
suitSkillLabel: cc.Label,
suitHeroFlag: cc.Node,
suitKnifeFlag: cc.Node,
suitHeroFalseFlag: cc.Node,
suitKnifeFalseFlag: cc.Node,
suitIconNode: cc.Node
},
init: function(e) {
if (d.instance.isPad()) {
this.topNode.y = -200;
this.itemScrollView.node.height = 200;
this.itemScrollViewWindow.height = 200;
this.itemScrollViewBar.height = 200;
} else {
this.topNode.y = 0;
this.itemScrollView.node.height = 400;
this.itemScrollViewWindow.height = 400;
this.itemScrollViewBar.height = 400;
}
this.world = e;
this.localPlayer = e.localPlayer;
var t = a.instance.heroSkinDatas.slice(), i = o.instance.getCurTime(), s = o.instance.ownHeroSkins;
n.filterDataByTime(t, s, i, d.instance, a.instance.clientData.hideSpecialSkin, u.isIOS(), u.isApp());
t.sort(function(e, t) {
return e.newDate && n.isBeforeOtherTime(e.newDate, i) ? -1 : t.newDate && n.isBeforeOtherTime(t.newDate, i) ? 1 : e.sort - t.sort;
});
for (var r = 0; r < t.length; r++) {
var c = t[r];
if (this._itemNodes[r]) {
(l = this._itemNodes[r].getComponent("ItemHeroSkin")).init(c);
} else {
var l, h = cc.instantiate(this.itemHeroSkin);
h.parent = this.content;
this._itemNodes[r] = h;
(l = h.getComponent("ItemHeroSkin")).init(c);
this._itemCells[r] = l;
l.setOnItemClick(this, l);
}
}
this.refresh();
this.onScrollView();
},
onScrollView: function() {
this.itemScrollView.getScrollOffset().y < 180 * Math.floor((this._itemCells.length - 1) / 3) - 360 ? this.downNode.active || (this.downNode.active = !0) : this.downNode.active && (this.downNode.active = !1);
},
refresh: function() {
var e = 0, t = !0, i = !1, a = void 0;
try {
for (var s, r = this._itemCells[Symbol.iterator](); !(t = (s = r.next()).done); t = !0) {
var c = s.value, l = c.data, d = o.instance.isOwnHeroSkin(l.id), u = n.arrContains(o.instance.completeTaskIds, l.taskId), f = n.arrContains(o.instance.needCheckTaskIds, l.taskId), p = l.newDate && n.isBeforeOtherTime(l.newDate, o.instance.getCurTime()), m = "";
if (1 === l.getWay && l.taskType !== h.RANK && l.taskType !== h.DUANWU) {
m = o.instance.getTaskProcess(l.taskType) + "/" + l.taskParam;
}
c.refresh(d, u, f, p, m);
d && e++;
if (o.instance.heroSkin.id === l.id) {
this.onItemClick(null, c, !0);
c.setCheck(!1);
}
}
} catch (e) {
i = !0;
a = e;
} finally {
try {
!t && r.return && r.return();
} finally {
if (i) throw a;
}
}
this.countLabel.string = e + "/" + this._itemCells.length;
},
buyBtnClick: function() {
if (this.lastCheckItem) {
var e = this.lastCheckItem;
switch (e.data.priceType) {
case 0:
if (o.instance.gold >= e.data.price) {
o.instance.addHeroSkin(e.data.id);
o.instance.updateGold(-e.data.price);
this.refresh();
this.onItemClick(null, e);
} else this.world.uiMgr.showTips(7);
break;

case 1:
if (o.instance.zongZi >= e.data.price) {
o.instance.addHeroSkin(e.data.id);
o.instance.updateZongZi(-e.data.price);
this.refresh();
this.onItemClick(null, e);
} else this.world.uiMgr.showTips("Insufficient Diamond");
}
}
},
jumpBtnClick: function() {
if (this.lastCheckItem) {
this.world.uiMgr.closePanelShop();
switch (this.lastCheckItem.data.jumpParam) {
case "PanelInvite":
this.world.uiMgr.showPanelInvite();
break;

case "PanelDailyTask":
this.world.uiMgr.showPanelDailyTask();
break;

case "PanelAddTop":
this.world.uiMgr.showPanelAddTop();
break;

case "PanelSign":
this.world.uiMgr.showPanelSign();
break;

case "PanelHolidayRank":
this.world.uiMgr.showPanelHolidayRank(!0);
}
}
},
unLockBtnClick: function() {
var e = this, t = function(t) {
if (e.lastCheckItem && t) {
var i = e.lastCheckItem;
o.instance.addHeroSkin(i.data.id);
e.refresh();
e.onItemClick(null, i);
i.data.taskType === h.LOGIN && o.instance.updateSignCount();
e.world.uiMgr.refreshRedDot();
}
};
this.shareIcon.active ? this.showShare(t) : this.showAdver(t);
},
showShare: function(e) {
c.share(l.UnlockSkin, e);
},
showAdver: function(e) {
var t = this;
s.instance.showAdver(r.UnlockSkin, e, function() {
t.showShare(e);
});
},
onItemClick: function(e, t) {
var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], s = t, r = s.data, c = this._itemCells.indexOf(s);
this.itemScrollView.scrollToOffset(cc.v2(0, 180 * Math.floor(c / 3) - 120 + (d.instance.isPad() ? 180 : 0)), 1);
this.lastCheckItem && this.lastCheckItem.setCheck(!1);
s.setCheck(!0);
this.lastCheckItem = s;
this.buyNode.active = !1;
this.unLockNode.active = !1;
this.watchAdverBtnNode.active = !1;
this.jumpNode.active = !1;
this.world.onEquipHeroSkin(r, s.isGet, !1);
if (s.isGet) {
this.lastEquipItem && this.lastEquipItem.setEquip(!1);
this.lastEquipItem = s;
s.setEquip(!0);
} else if (0 === r.getWay) this.buyNode.active = !0; else if (1 === r.getWay) if (n.arrContains(o.instance.completeTaskIds, r.taskId)) {
this.unLockNode.active = !0;
this.shareIcon.active = 1 === r.unlockWay;
this.adverIcon.active = 2 === r.unlockWay;
} else r.taskType === h.ADVERCOUNT ? this.watchAdverBtnNode.active = !0 : r.jumpParam && (this.jumpNode.active = !0);
this.nameLabel.string = r.name;
this.introduceLabel.string = r.introduce;
this.propertyNode.active = !!r.propertyTips;
this.propertyLabel.string = r.propertyTips ? r.propertyTips : "";
this.taskInfoNode.active = 1 === r.getWay;
if (this.taskInfoNode.active) {
var l = (k = o.instance.getTaskProcess(r.taskType)) < r.taskParam ? k : r.taskParam;
this.taskStartLabel.string = "(";
this.taskProgressLabel.string = l || 0;
this.taskFinalLabel.string = "/" + r.taskParam + ")";
if (r.taskType === h.RANK || r.taskType === h.DUANWU) {
this.taskStartLabel.string = "";
this.taskProgressLabel.string = "";
this.taskFinalLabel.string = "";
}
this.watchAdverLabel.string = n.getStringByFormat(a.instance.getUITipStr(20), l, r.taskParam);
}
this.buyLangLabel.string = "Buy";
this.goLangLabel.string = "Go";
this.suitNode.active = r.suit;
if (r.suit) {
var u = a.instance.getSuitData(r.suit), f = r, p = a.instance.getKnifeSkinById(u.knifeSkin), m = o.instance.isOwnHeroSkin(u.heroSkin), g = o.instance.isOwnKnifeSkin(u.knifeSkin), y = o.instance.isCurEquipHeroSkin(f.id), v = o.instance.isCurEquipKnifeSkin(p.id);
this.suitNameLabel.string = u.name;
var k = 0;
m && k++;
g && k++;
this.suiProcessLabel.string = "(" + k + "/2)";
this.suitHeroNameLabel.string = f.name;
this.suitKnifeNameLabel.string = p.name;
this.suitSkillLabel.string = u.skillTips;
for (var C = 0; C < this.suitIconNode.children.length; C++) this.suitIconNode.children[C] && (this.suitIconNode.children[C].active = C + 1 == r.suit);
this.suitHeroFlag.active = y;
this.suitKnifeFlag.active = v;
this.suitHeroFalseFlag.active = !y;
this.suitKnifeFalseFlag.active = !v;
this.suitActiveIcon.active = m && g && y && v;
this.suitCloseIcon.active = !(m && g && y && v);
this.suitActiveIcon.active && !i && this.world.uiMgr.showActiveSuitEffect();
}
},
onWathAdverBtnClick: function() {
var e = this;
s.instance.showAdver(r.WatchAdver, function(t) {
if (e.lastCheckItem && t) {
var i = e.lastCheckItem;
e.world.taskMgr.refreshTaskInHome();
e.refresh();
e.onItemClick(null, i);
}
}, function() {
e.world.uiMgr.showTips(4);
});
},
close: function() {
this.lastEquipItem.setEquip(!1);
this.lastCheckItem && this.lastCheckItem.setCheck(!1);
this.closeCallcack && this.closeCallcack();
this.world.onEquipHeroSkin(o.instance.heroSkin, !0);
o.instance.clearNeedCheckTaskIds();
},
setCloseCallback: function(e) {
this.closeCallcack = e;
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
ConfigData: "ConfigData",
GameData: "GameData",
PlatformMgr: "PlatformMgr",
PlayerData: "PlayerData",
ShareMgr: "ShareMgr",
Tools: "Tools",
Types: "Types"
} ],
PanelHolidayRank: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "7347elEmNRBTKem8nhldyPg", "PanelHolidayRank");
var n = e("Tools"), a = e("ConfigData"), o = e("PlayerData"), s = (e("AdvertMgr"), 
e("Types").AdverType, e("ShareMgr"), e("Types").ShareType, e("Types").TaskType, 
e("GameData")), r = e("PlatformMgr"), c = new cc.Color().fromHEX("#bb3a07");
cc.Class({
extends: cc.Component,
properties: {
pkNode: cc.Node,
pkScrollView: cc.Node,
pkRankPrefab: cc.Prefab,
pkRewardNode: cc.Node,
pkRewardScrollView: cc.Node,
pkRewardPrefab: cc.Prefab,
pkCountDownLabel: cc.Label,
pkBtn: cc.Node,
pkCheckNode: cc.Node,
pkNotCheckNode: cc.Node,
pkTitleNode: cc.Node,
pkRoundLabel: cc.Label,
pkMyRankParent: cc.Node,
worldNode: cc.Node,
worldScrollView: cc.Node,
worldRankPrefab: cc.Prefab,
worldRewardNode: cc.Node,
worldRewardScrollView: cc.Node,
worldRewardPrefab: cc.Prefab,
worldCountDownLabel: cc.Label,
worldBtn: cc.Node,
worldCheckNode: cc.Node,
worldNotCheckNode: cc.Node,
worldTitleNode: cc.Node,
worldRoundLabel: cc.Label,
worldMyRankParent: cc.Node,
leftPageBtn: cc.Node,
rightPageBtn: cc.Node,
worldRewardBg: cc.Node,
worldRewardDetailBtn: cc.Node,
worldEmptyNode: cc.Node,
worldEffect: cc.Animation,
worldRefreshTips: cc.Label,
pkRollAnim: cc.Animation,
pkRollNode: cc.Node,
daySpan: !1
},
init: function(e) {
var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], i = arguments[2];
this.world = e;
this.isPK = t;
this.callback = i;
this._pkRewardScrollView = n.getOrAddComponent(this.pkRewardScrollView, "MyScrollView");
this._pkRewardScrollView.init(a.instance.holidayPKRewardDatas, {
itemPrefab: this.pkRewardPrefab,
className: "ItemPKReward",
startX: 0,
gapX: 15,
gapY: 5,
perLine: 1
});
this._worldRewardScrollView = n.getOrAddComponent(this.worldRewardScrollView, "MyScrollView");
this._worldRewardScrollView.init(a.instance.holidayWorldRewardDatas, {
itemPrefab: this.worldRewardPrefab,
className: "ItemWorldReward",
startX: 0,
gapX: 15,
gapY: 10,
perLine: 1
});
this.startUpdate = !1;
this.refreshPKRank();
if (a.instance.isDuringHolidayRankTime(o.instance.getCurTime())) {
t ? this.onPKNodeBtnClick() : this.onWorldNodeBtnClick();
this.pkBtn.active = !0;
this.worldBtn.x = 170;
this.worldRefreshTips.node.active = !0;
this.worldCountDownLabel.node.active = !0;
} else {
this.onWorldNodeBtnClick();
this.pkBtn.active = !1;
this.worldBtn.x = 0;
this.worldRefreshTips.node.active = !1;
this.worldCountDownLabel.node.active = !1;
}
},
refreshPKRank: function() {
var e = this;
o.instance.getHolidayPKRank(function(t, i) {
e.pkRoundLabel.string = "(第" + t.round + "轮)";
e.worldRoundLabel.string = "(第" + t.round + "轮)";
var a = t.rankInfo;
if (i) {
var o = cc.instantiate(e.pkRankPrefab);
o.parent = e.pkMyRankParent;
e.pkMyRankComp = o.getComponent("ItemPKRank");
e.pkMyRankComp.init(i);
} else s.instance.isShowLog() && console.error("我的小组排行为空");
e._pkScrollView = n.getOrAddComponent(e.pkScrollView, "MyScrollView");
e.itemPKPool = e._pkScrollView.init(a, {
itemPrefab: e.pkRankPrefab,
className: "ItemPKRank",
startX: 0,
gapX: 15,
gapY: 10,
perLine: 1
}, function(e, t) {
setTimeout(function() {
t.stopAllActions();
t.x = 1e3;
t.runAction(cc.moveBy(.5, cc.v2(-1e3, 0)).easing(cc.easeBackOut(1)));
}, 100 * e);
});
e.refreshPKRollAnim();
e.refreshWorldRank(0);
});
},
refreshWorldRank: function(e) {
var t = this;
o.instance.getHolidayWorldRank(e, function(e, i, a) {
var r = e.rankInfo;
t.worldRound = e.round;
t.worldRoundLabel.string = "(第" + e.round + "轮)";
if (i) {
var c = cc.instantiate(t.pkRankPrefab);
c.parent = t.worldMyRankParent;
t.worldMyRankComp = c.getComponent("ItemPKRank");
t.worldMyRankComp.init(i);
} else s.instance.isShowLog() && console.error("我的世界排行为空");
t._worldScrollView = n.getOrAddComponent(t.worldScrollView, "MyScrollView");
t.itemWorldPool = t._worldScrollView.init(r, {
itemPrefab: t.pkRankPrefab,
className: "ItemPKRank",
startX: 0,
gapX: 15,
gapY: 10,
perLine: 1
}, function(e, t) {
setTimeout(function() {
t.stopAllActions();
t.x = 1e3;
t.runAction(cc.moveBy(.5, cc.v2(-1e3, 0)).easing(cc.easeBackOut(1)));
}, 100 * e);
});
t.worldRound === o.instance.maxWorldRound && i && t._worldScrollView.scrollToRank(i.rank, .5);
t.leftPageBtn.active = 1 !== e.round;
t.rightPageBtn.active = e.round !== o.instance.maxWorldRound;
t.worldMyRankParent.active = e.round === o.instance.maxWorldRound;
t.worldEmptyNode.active = !(r && r.length);
a && (-1 === i.rank || t.playWorldEffect());
t.startUpdate = !0;
});
},
playWorldEffect: function() {
this.worldEffect.play();
},
onPKNodeBtnClick: function() {
this.pkNode.active = !0;
this.worldNode.active = !1;
this.pkCheckNode.active = !0;
this.pkNotCheckNode.active = !1;
this.worldCheckNode.active = !1;
this.worldNotCheckNode.active = !0;
this.pkTitleNode.color = c;
this.worldTitleNode.color = cc.Color.WHITE;
this.pkRoundLabel.node.color = c;
this.worldRoundLabel.node.color = cc.Color.WHITE;
},
onWorldNodeBtnClick: function() {
this.pkNode.active = !1;
this.worldNode.active = !0;
this.pkCheckNode.active = !1;
this.pkNotCheckNode.active = !0;
this.worldCheckNode.active = !0;
this.worldNotCheckNode.active = !1;
this.pkTitleNode.color = cc.Color.WHITE;
this.worldTitleNode.color = c;
this.pkRoundLabel.node.color = cc.Color.WHITE;
this.worldRoundLabel.node.color = c;
},
onPKRewardBtnClick: function() {
this.pkRewardNode.active = !0;
},
onPKRewardCloseBtnClick: function() {
this.pkRewardNode.active = !1;
},
onWorldRewardBtnClick: function() {
this.worldRewardNode.active = !0;
var e = o.instance.playerWorldRewardDetail;
if (e) if (e.rewardInfo && e.rewardInfo.length) {
this.worldRewardBg.height = 500;
this.worldRewardDetailBtn.active = !0;
} else {
this.worldRewardBg.height = 380;
this.worldRewardDetailBtn.active = !1;
}
},
onWorldRewardCloseBtnClick: function() {
this.worldRewardNode.active = !1;
},
showPanelRewardDetail: function() {
this.world.uiMgr.showPanelRewardDetail();
},
close: function() {
this.node.active = !1;
this.world.uiMgr.hidePanelHolidayUserinfoBtns();
this.callback && this.callback();
},
turnPageLeft: function() {
if (this.worldRound > 1) {
this.worldRound--;
this.refreshWorldRank(this.worldRound);
}
},
turnPageRight: function() {
if (this.worldRound < o.instance.maxWorldRound) {
this.worldRound++;
this.refreshWorldRank(this.worldRound);
}
},
onbtn1: function() {
r.setHolidayScore(4);
},
onbtn2: function() {
r.getHolidayPKReward();
},
onbtn3: function() {
r.getHolidayWorldReward();
},
onbtn4: function() {
r.getHolidayWorldRewardInfo();
},
update: function(e) {
var t = this;
if (this.startUpdate) {
if (o.instance.pkSurplusTime) {
if ((i = o.instance.pkSurplusTime - o.instance.timeOffset) > 0) {
var i = n.getCountDownTime(i);
this.pkCountDownLabel.string = "今日本组PK结束时间剩余：" + i.hour + ":" + i.minute + ":" + i.second;
this.worldCountDownLabel.string = "今日世界PK结束时间剩余：" + i.hour + ":" + i.minute + ":" + i.second;
}
}
var c = new Date(o.instance.getCurTime()), l = c.getHours(), h = c.getMinutes();
if (s.instance.isShowLog() && l !== this.curHour) {
this.curHour = l;
console.log("---------------------------当前小时：" + l);
}
if (l >= 21) {
(y = "将于24点结算最终名次") !== this.worldRefreshTips.string && (this.worldRefreshTips.string = "将于24点结算最终名次");
} else {
var d = !0, u = !1, f = void 0;
try {
for (var p, m = a.instance.holidayDatas.refreshWorldTime[Symbol.iterator](); !(d = (p = m.next()).done); d = !0) {
var g = p.value;
if (l < g) {
l = g;
if (s.instance.isShowLog() && l !== this.nextHour) {
this.nextHour = l;
console.log("---------------------------下次更新小时：" + l);
}
break;
}
}
} catch (e) {
u = !0;
f = e;
} finally {
try {
!d && m.return && m.return();
} finally {
if (u) throw f;
}
}
if (l !== this.h) {
console.log("---------------------------update上次更新小时：" + this.h);
this.h = l;
var y = "将于" + l + ":00更新排行";
this.worldRefreshTips.string = y;
if (0 === this.curHour && h < 2) {
this.worldRefreshTips.node.active = !1;
this.daySpan = !0;
} else {
o.instance.clearHolidayData();
this.init(this.world);
}
}
if (this.daySpan) if (h < 2) this.worldCountDownLabel.string = "正在结算中，两分钟后将公布上轮成绩"; else {
o.instance.updateWorldRewardDetail();
r.getHolidayPKReward(function(e) {
t.world.uiMgr.showPanelPKReward(e, function() {
r.getHolidayWorldReward(function(e) {
t.world.uiMgr.showPanelWorldReward(e);
});
});
});
o.instance.clearHolidayData();
this.init(this.world);
this.daySpan = !1;
this.worldRefreshTips.node.active = !0;
}
}
}
},
refreshPKRollAnim: function() {
var e = this, t = o.instance.myPKRankData, i = o.instance.myOldPKRankData, n = this.pkRollNode.getComponent("ItemPKRank");
if (t && i && t.rank < i.rank) {
n.init(i);
this._pkScrollView.scrollToRank(i.rank, .1);
this.pkRollAnim.play("ani-holiday-rank-1");
this.pkRollAnim.node.position = cc.v2(0, 0);
setTimeout(function() {
e._pkScrollView.scrollToRank(t.rank, .5);
t.rank <= 3 && e.pkRollAnim.node.runAction(cc.moveTo(.5, cc.v2(0, 70 * (4 - t.rank))));
}, 500);
setTimeout(function() {
e.pkRollAnim.play("ani-holiday-rank-2");
o.instance.myOldPKRankData = null;
}, 1e3);
} else t && this._pkScrollView.scrollToRank(t.rank, .5);
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
ConfigData: "ConfigData",
GameData: "GameData",
PlatformMgr: "PlatformMgr",
PlayerData: "PlayerData",
ShareMgr: "ShareMgr",
Tools: "Tools",
Types: "Types"
} ],
PanelInvite: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "30ba5lU93FHDLNrXfvownEJ", "PanelInvite");
e("PlatformMgr"), e("Types").PlatformType;
var n = e("UIUtil"), a = (e("ConfigData"), e("PlayerData")), o = e("ShareMgr"), s = e("Types").ShareType, r = (e("AdvertMgr"), 
e("Types").AdverType, e("Tools"), e("BagItem"));
e("Types").ItemType, e("Types").StageType;
cc.Class({
extends: cc.Component,
properties: {
iconSprties: [ cc.Sprite ],
shareLabel: cc.Label,
shareBtn: cc.Node,
receiveBtn: cc.Node,
hasReceiveBtn: cc.Node
},
init: function(e) {
this.world = e;
this.data = a.instance.inviteDatas;
a.instance.updateCheckInviteLength();
this.world.uiMgr.refreshRedDot();
for (var t = 0; t < this.data.length; t++) this.iconSprties[t] && n.loadFriendPortrait(this.iconSprties[t], this.data[t].iconUrl);
this.shareLabel.string = this.data.length + "/3";
this.refresh();
},
refresh: function() {
var e = this.data.length >= 3, t = a.instance.hasGetInviteReward();
this.shareBtn.active = !e;
this.receiveBtn.active = e && !t;
this.hasReceiveBtn.active = e && t;
},
onShareClick: function() {
o.share(s.Invite);
},
onReceiveClick: function() {
var e = r.createItemWithString("2,11,1");
if (!a.instance.isOwnHeroSkin(e.id)) {
a.instance.addHeroSkin(e.id);
this.world.onEquipHeroSkin(e.itemData, !0);
}
this.world.uiMgr.showReward(e.itemData);
this.world.uiMgr.refreshRedDot();
this.refresh();
},
onClose: function() {
this.node.active = !1;
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
BagItem: "BagItem",
ConfigData: "ConfigData",
PlatformMgr: "PlatformMgr",
PlayerData: "PlayerData",
ShareMgr: "ShareMgr",
Tools: "Tools",
Types: "Types",
UIUtil: "UIUtil"
} ],
PanelKnifeShop_new: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "66b36DjHlNHi6aT1ZyUW3y1", "PanelKnifeShop_new");
var n = e("Tools"), a = e("ConfigData"), o = e("PlayerData"), s = e("AdvertMgr"), r = e("Types").AdverType, c = e("ShareMgr"), l = e("Types").ShareType, h = e("Types").TaskType, d = e("Types").ItemGetType, u = e("GameData"), f = e("PlatformMgr");
cc.Class({
extends: cc.Component,
properties: {
topNode: cc.Node,
content: cc.Node,
itemKnifeSkin: cc.Prefab,
pageView: cc.PageView,
pagePrefab: cc.Prefab,
buyNode: cc.Node,
unLockNode: cc.Node,
linkNode: cc.Node,
nameLabel: cc.Label,
introduceNode: cc.Node,
introduceTextNode: cc.Node,
introduceLabel: cc.Label,
propertyNode: cc.Node,
propertyLabel: cc.Label,
propertyAnim: cc.Animation,
taskStartLabel: cc.Label,
taskProgressLabel: cc.Label,
taskFinalLabel: cc.Label,
taskInfoNode: cc.Node,
watchAdverBtnNode: cc.Node,
watchAdverLabel: cc.Label,
buyLangLabel: cc.Label,
unlockLangLabel: cc.Label,
jumpNode: cc.Node,
shareIcon: cc.Node,
adverIcon: cc.Node,
suitNode: cc.Node,
suitNameLabel: cc.Label,
suiProcessLabel: cc.Label,
suitCloseIcon: cc.Node,
suitActiveIcon: cc.Node,
suitHeroNameLabel: cc.Label,
suitKnifeNameLabel: cc.Label,
suitSkillLabel: cc.Label,
suitHeroFlag: cc.Node,
suitKnifeFlag: cc.Node,
suitHeroFalseFlag: cc.Node,
suitKnifeFalseFlag: cc.Node,
suitIconNode: cc.Node,
_itemCells: [],
_itemNodes: [],
_itemPageCells: [],
_pageClickHistory: [],
itemTypePool: [],
typeIconNode: cc.Node,
shopBgNode: cc.Node,
perCount: 6,
goldIcon: cc.Node,
diamondIcon: cc.Node,
priceLabel: cc.Label,
lastPageIndex: 0,
keyNode: cc.Node,
keyParentNode: cc.Node
},
onLoad: function() {
this.checkUI();
this._itemClickHistory = {};
},
init: function(e) {
this.world = e;
this.localPlayer = e.localPlayer;
this.initData();
this.initUI();
this.initKey();
this.refresh();
this.scrollPage();
this.showName();
},
initData: function() {
this.itemTypePool = [];
var e = a.instance.knifeSkinDatas.slice(), t = o.instance.getCurTime(), i = o.instance.ownKnifeSkins;
n.filterDataByTime(e, i, t, u.instance, a.instance.clientData.hideSpecialSkin, f.isIOS(), f.isApp());
e.sort(function(e, t) {
return e.sort - t.sort;
});
for (var s = 0; s < e.length; s++) {
var r = e[s], c = 0;
if (0 === r.getWay) c = 0 === r.priceType ? d.GOLD : d.DIAMOND; else if (1 === r.getWay) c = r.taskType === h.RANK ? d.RANK : r.taskType === h.TREASUREBOX ? d.BOX : d.TASK; else if (100 === r.getWay) {
c = d.NFT;
var l = f.nft_balance_ids[r.goodsId] || 0;
r.rest = 1e3 - l;
}
this.push(c, r);
}
},
initUI: function() {
this.page = -1;
this.pageTypes = [];
for (var e = 0; e < this.itemTypePool.length; e++) {
var t = this.itemTypePool[e];
if (t) for (var i = Math.ceil(t.length / this.perCount), n = 0; n < i; n++) {
this.page++;
this.pageTypes[this.page] = e;
var a = this.content.children[this.page];
a || ((a = cc.instantiate(this.pagePrefab)).parent = this.content);
for (var s = 0; s < this.perCount; s++) {
var r, c = t[n * this.perCount + s], l = a.children[s];
if (l) r = l.getComponent("ItemKnifeSkin_new"); else {
(l = cc.instantiate(this.itemKnifeSkin)).parent = a;
l.position = cc.v2(s % 3 * 230 - 235, -78 - 160 * Math.floor(s / 3));
(r = l.getComponent("ItemKnifeSkin_new")).init(c);
r.page = this.page;
r.index = s;
if (c) {
r.setOnItemClick(this, r);
this._itemCells.push(r);
this.pushToPageItemPool(this.page, r);
}
}
c && o.instance.knifeSkinId === c.id && (this.lastPageIndex = this.page);
}
}
}
this.pageView.onLoad();
this.pageView.setCurrentPageIndex(1);
},
checkUI: function() {
var e = u.instance.isPad();
this.topNode.y = e ? -200 : 0;
this.pageView.node.height = e ? 380 : 550;
this.shopBgNode.height = e ? 580 : 750;
this.suitNode.y = e ? 240 : 390;
this.nameLabel.node.y = e ? 180 : 230;
this.propertyNode.y = e ? 150 : 195;
this.propertyAnim.node.parent.y = e ? 150 : 195;
this.perCount = e ? 6 : 9;
},
initKey: function() {
for (var e = o.instance.keyCount, t = 0; t < 3; t++) this.keyParentNode.children[t].active = t < e;
},
push: function(e, t) {
this.itemTypePool[e] || (this.itemTypePool[e] = []);
this.itemTypePool[e].push(t);
},
pushToPageItemPool: function(e, t) {
this._itemPageCells[e] || (this._itemPageCells[e] = []);
this._itemPageCells[e].push(t);
},
getItemByPage: function(e, t) {
if (this._itemPageCells[e]) return this._itemPageCells[e][t];
},
selectItem: function(e) {
if (this._itemPageCells[e]) {
for (var t = -1, i = this._itemPageCells[e].length - 1; i >= 0; i--) {
var n = this._itemPageCells[e][i];
if (n.isGet) {
if (n.equipNode.active) {
this.onItemClick(null, this._itemPageCells[e][i], !1, !0);
return;
}
} else t = i;
}
if (-1 !== t) {
this._pageClickHistory[e] && (t = this._pageClickHistory[e]);
this.onItemClick(null, this._itemPageCells[e][t], !1, !0);
}
}
},
onScrollPage: function(e) {
var t = e.getCurrentPageIndex(), i = this.getPageType(t);
this.setTitle(i);
this.selectItem(t);
},
setTitle: function(e) {
for (var t = 0; t < this.typeIconNode.children.length; t++) this.typeIconNode.children[t].active = t === e;
},
showName: function() {
var e = this;
this.nameLabel.node.active = !1;
setTimeout(function() {
e.nameLabel.node.active = !0;
}, 500);
},
getPageType: function(e) {
return this.pageTypes[e];
},
scrollPage: function() {
var e = this;
this.pageView.onLoad();
var t = this.lastPageIndex - 1;
t = t >= 0 ? t : 1;
this.pageView.setCurrentPageIndex(t);
setTimeout(function() {
e.pageView.setCurrentPageIndex(e.lastPageIndex);
e.onScrollPage(e.pageView);
}, 200);
},
refresh: function() {
var e = !0, t = !1, i = void 0;
try {
for (var a, s = this._itemCells[Symbol.iterator](); !(e = (a = s.next()).done); e = !0) {
var r = a.value;
if (r) {
var c = r.data, l = o.instance.isOwnKnifeSkin(c.id);
if (100 == c.getWay && !l) {
if ((f.nft_user_datas[c.goodsId] || 0) > 0) {
console.log("购买后。同步到本地皮肤数据");
o.instance.addKnifeSkin(c.id);
l = !0;
}
}
var d = n.arrContains(o.instance.completeTaskIds, c.taskId), u = n.arrContains(o.instance.needCheckTaskIds, c.taskId), p = c.newDate && n.isBeforeOtherTime(c.newDate, o.instance.getCurTime()), m = o.instance.canBuyItem(c) && !this._itemClickHistory[c.id], g = "";
if (1 === c.getWay && c.taskType !== h.RANK && c.taskType !== h.DUANWU && c.taskType !== h.TREASUREBOX) {
g = o.instance.getTaskProcess(c.taskType) + "/" + c.taskParam;
}
r.refresh(l, d, u, p, g, m);
l && 0;
o.instance.knifeSkin.id === c.id && this.onItemClick(null, r, !0);
}
}
} catch (e) {
t = !0;
i = e;
} finally {
try {
!e && s.return && s.return();
} finally {
if (t) throw i;
}
}
},
buyBtnClick: function() {
if (this.lastCheckItem) {
var e = this.lastCheckItem;
switch (e.data.priceType) {
case 0:
if (o.instance.gold >= e.data.price) {
o.instance.addKnifeSkin(e.data.id);
o.instance.updateGold(-e.data.price);
this.refresh();
this.onItemClick(null, e);
} else this.world.uiMgr.showTips(7);
break;

case 1:
s.instance.fireBaseEvent("click_store_product_btn", "product_type", "skinknives");
if (o.instance.zongZi >= e.data.price) {
o.instance.addKnifeSkin(e.data.id);
o.instance.updateZongZi(-e.data.price);
this.refresh();
this.onItemClick(null, e);
} else this.world.uiMgr.showTips("Insufficient Diamond");
}
}
},
jumpBtnClick: function() {
if (this.lastCheckItem) {
this.world.uiMgr.closePanelShop();
switch (this.lastCheckItem.data.jumpParam) {
case "PanelInvite":
this.world.uiMgr.showPanelInvite();
break;

case "PanelDailyTask":
this.world.uiMgr.showPanelDailyTask();
break;

case "PanelAddTop":
this.world.uiMgr.showPanelAddTop();
break;

case "PanelSign":
this.world.uiMgr.showPanelSign();
break;

case "PanelHolidayRank":
this.world.uiMgr.showPanelHolidayRank(!0);
}
}
},
unLockBtnClick: function() {
var e = this, t = function(t) {
if (e.lastCheckItem && t) {
var i = e.lastCheckItem;
o.instance.addKnifeSkin(i.data.id);
e.refresh();
e.onItemClick(null, i);
i.data.taskType === h.LOGIN && o.instance.updateSignCount();
e.world.uiMgr.refreshRedDot();
}
};
this.shareIcon.active ? this.showShare(t) : this.showAdver(t);
},
linkBtnClick: function() {
var e = this.lastCheckItem.data;
f.requestNFTGet(e);
},
showShare: function(e) {
c.share(l.UnlockSkin, e);
},
showAdver: function(e) {
var t = this;
s.instance.fireBaseEvent("click_adv_btn", "position_id", a.instance.getAdvertUnitId(r.UnlockSkin));
s.instance.showAdver(r.UnlockSkin, e, function() {
t.showShare(e);
});
},
onItemClick: function(e, t) {
var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], s = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], r = t, c = r.data;
this.lastCheckItem && this.lastCheckItem.setCheck(!1);
r.setCheck(!0);
r.setCanBuy(!1);
this.lastCheckItem = r;
s || r.isGet || (this._pageClickHistory[r.page] = r.index);
this._itemClickHistory[c.id] = !0;
this.buyNode.active = !1;
this.linkNode.active = !1;
this.unLockNode.active = !1;
this.watchAdverBtnNode.active = !1;
this.buyLangLabel.string = "Buy";
this.unlockLangLabel.string = "Unlock:";
i || this.world.onEquipKnifeSkin(c, r.isGet, !1);
if (r.isGet) {
this.lastEquipItem && this.lastEquipItem.setEquip(!1);
this.lastEquipItem = r;
r.setEquip(!0);
} else if (0 === c.getWay) {
this.buyNode.active = !0;
this.goldIcon.active = 0 === c.priceType;
this.diamondIcon.active = 1 === c.priceType;
c.price && (this.priceLabel.string = n.getGoldStr(c.price));
} else if (1 === c.getWay) if (n.arrContains(o.instance.completeTaskIds, c.taskId)) {
this.unLockNode.active = !0;
this.shareIcon.active = 1 === c.unlockWay;
this.adverIcon.active = 2 === c.unlockWay;
} else c.taskType === h.ADVERCOUNT && (this.watchAdverBtnNode.active = !0); else if (100 === c.getWay) {
this.buyNode.active = !1;
this.linkNode.active = !0;
}
this.nameLabel.string = c.name;
this.introduceNode.active = !(r.isGet || this.buyNode.active || this.unLockNode.active || this.watchAdverBtnNode.active);
this.introduceLabel.string = c.introduce;
this.propertyNode.active = !!c.propertyTips;
this.propertyLabel.string = c.propertyTips ? c.propertyTips : "";
this.propertyAnim.node.width = this.propertyNode.width;
this.propertyNode.active && this.propertyAnim.play();
this.keyNode.active = c.taskType === h.TREASUREBOX;
this.introduceTextNode.active = !this.keyNode.active;
this.keyNode.active && (this.introduceNode.active = !0);
this.taskInfoNode.active = 1 === c.getWay;
if (this.taskInfoNode.active) {
var l = (v = o.instance.getTaskProcess(c.taskType)) < c.taskParam ? v : c.taskParam;
this.taskStartLabel.string = "(";
this.taskProgressLabel.string = l || 0;
this.taskFinalLabel.string = "/" + c.taskParam + ")";
if (c.taskType === h.RANK || c.taskType === h.DUANWU || c.taskType === h.TREASUREBOX) {
this.taskStartLabel.string = "";
this.taskProgressLabel.string = "";
this.taskFinalLabel.string = "";
}
this.watchAdverLabel.string = n.getStringByFormat(a.instance.getUITipStr(20), l, c.taskParam);
}
this.suitNode.active = c.suit;
if (c.suit) {
var d = a.instance.getSuitData(c.suit), u = a.instance.getHeroSkinById(d.heroSkin), f = c, p = o.instance.isOwnHeroSkin(d.heroSkin), m = o.instance.isOwnKnifeSkin(d.knifeSkin), g = o.instance.isCurEquipHeroSkin(u.id), y = o.instance.isCurEquipKnifeSkin(f.id);
this.suitNameLabel.string = d.name;
var v = 0;
p && v++;
m && v++;
this.suiProcessLabel.string = "(" + v + "/2)";
this.suitHeroNameLabel.string = u.name;
this.suitKnifeNameLabel.string = f.name;
this.suitSkillLabel.string = d.skillTips;
for (var k = 0; k < this.suitIconNode.children.length; k++) this.suitIconNode.children[k] && (this.suitIconNode.children[k].active = k + 1 == c.suit);
this.suitHeroFlag.active = g;
this.suitKnifeFlag.active = y;
this.suitHeroFalseFlag.active = !g;
this.suitKnifeFalseFlag.active = !y;
this.suitActiveIcon.active = p && m && g && y;
this.suitCloseIcon.active = !(p && m && g && y);
this.suitActiveIcon.active && !i && this.world.uiMgr.showActiveSuitEffect();
}
},
onWathAdverBtnClick: function() {
var e = this;
s.instance.showAdver(r.WatchAdver, function(t) {
if (e.lastCheckItem && t) {
var i = e.lastCheckItem;
e.world.taskMgr.refreshTaskInHome();
e.refresh();
e.onItemClick(null, i);
}
}, function() {
e.world.uiMgr.showTips(4);
});
},
onBtnClose: function() {
this.world.uiMgr.closePanelShop(!0);
},
close: function() {
this.lastEquipItem && this.lastEquipItem.setEquip(!1);
this.lastCheckItem && this.lastCheckItem.setCheck(!1);
this.closeCallcack && this.closeCallcack();
this.world.onEquipKnifeSkin(o.instance.knifeSkin, !0);
o.instance.clearNeedCheckTaskIds();
this._pageClickHistory = [];
this._itemClickHistory = {};
},
setCloseCallback: function(e) {
this.closeCallcack = e;
},
update: function(e) {
this.propertyAnim.node.width !== this.propertyNode.width + 20 && (this.propertyAnim.node.width = this.propertyNode.width + 20);
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
ConfigData: "ConfigData",
GameData: "GameData",
PlatformMgr: "PlatformMgr",
PlayerData: "PlayerData",
ShareMgr: "ShareMgr",
Tools: "Tools",
Types: "Types"
} ],
PanelKnifeShop: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "f0ca9valZdIvoxTTPmj0GCl", "PanelKnifeShop");
var n = e("Tools"), a = e("ConfigData"), o = e("PlayerData"), s = e("AdvertMgr"), r = e("Types").AdverType, c = e("ShareMgr"), l = e("Types").ShareType, h = e("Types").TaskType, d = e("GameData"), u = e("PlatformMgr");
cc.Class({
extends: cc.Component,
properties: {
topNode: cc.Node,
itemScrollView: cc.ScrollView,
itemScrollViewBar: cc.Node,
itemScrollViewWindow: cc.Node,
content: cc.Node,
itemKnifeSkin: cc.Prefab,
buyNode: cc.Node,
unLockNode: cc.Node,
nameLabel: cc.Label,
introduceLabel: cc.Label,
initCountLabel: cc.Label,
countLabel: cc.Label,
propertyNode: cc.Node,
propertyLabel: cc.Label,
taskStartLabel: cc.Label,
taskProgressLabel: cc.Label,
taskFinalLabel: cc.Label,
taskMoreLabel: cc.Label,
taskInfoNode: cc.Node,
watchAdverBtnNode: cc.Node,
downNode: cc.Node,
watchAdverLabel: cc.Label,
buyLangLabel: cc.Label,
goLangLabel: cc.Label,
jumpNode: cc.Node,
shareIcon: cc.Node,
adverIcon: cc.Node,
suitNode: cc.Node,
suitNameLabel: cc.Label,
suiProcessLabel: cc.Label,
suitCloseIcon: cc.Node,
suitActiveIcon: cc.Node,
suitHeroNameLabel: cc.Label,
suitKnifeNameLabel: cc.Label,
suitSkillLabel: cc.Label,
suitHeroFlag: cc.Node,
suitKnifeFlag: cc.Node,
suitHeroFalseFlag: cc.Node,
suitKnifeFalseFlag: cc.Node,
suitIconNode: cc.Node,
_itemCells: [],
_itemNodes: []
},
init: function(e) {
if (d.instance.isPad()) {
this.topNode.y = -200;
this.itemScrollView.node.height = 200;
this.itemScrollViewWindow.height = 200;
this.itemScrollViewBar.height = 200;
} else {
this.topNode.y = 0;
this.itemScrollView.node.height = 400;
this.itemScrollViewWindow.height = 400;
this.itemScrollViewBar.height = 400;
}
this.world = e;
this.localPlayer = e.localPlayer;
var t = a.instance.knifeSkinDatas.slice(), i = o.instance.getCurTime(), s = o.instance.ownKnifeSkins;
n.filterDataByTime(t, s, i, d.instance, a.instance.clientData.hideSpecialSkin, u.isIOS(), u.isApp());
t.sort(function(e, t) {
return e.newDate && n.isBeforeOtherTime(e.newDate, i) ? -1 : t.newDate && n.isBeforeOtherTime(t.newDate, i) ? 1 : e.sort - t.sort;
});
for (var r = 0; r < t.length; r++) {
var c = t[r];
if (this._itemNodes[r]) {
(l = this._itemNodes[r].getComponent("ItemKnifeSkin")).init(c);
} else {
var l, h = cc.instantiate(this.itemKnifeSkin);
h.parent = this.content;
h.position = cc.v2(r % 3 * 230 - 235, -78 - 146 * Math.floor(r / 3));
this._itemNodes[r] = h;
(l = h.getComponent("ItemKnifeSkin")).init(c);
this._itemCells[r] = l;
l.setOnItemClick(this, l);
}
}
this.content.height = 150 * Math.floor(this._itemCells.length / 3) + 150;
this.refresh();
this.onScrollView();
},
onScrollView: function() {
var e = this.itemScrollView.getScrollOffset().y;
e < 150 * Math.floor((this._itemCells.length - 1) / 3) - 300 ? this.downNode.active || (this.downNode.active = !0) : this.downNode.active && (this.downNode.active = !1);
for (var t = Math.floor(e / 150), i = 0; i < this._itemCells.length; i++) {
var n = Math.floor(i / 3);
n <= t + 3 && n >= t ? this._itemNodes[i].active || (this._itemNodes[i].active = !0) : this._itemNodes[i].active && (this._itemNodes[i].active = !1);
}
},
refresh: function() {
var e = 0, t = !0, i = !1, a = void 0;
try {
for (var s, r = this._itemCells[Symbol.iterator](); !(t = (s = r.next()).done); t = !0) {
var c = s.value;
if (c) {
var l = c.data, d = o.instance.isOwnKnifeSkin(l.id), u = n.arrContains(o.instance.completeTaskIds, l.taskId), f = n.arrContains(o.instance.needCheckTaskIds, l.taskId), p = l.newDate && n.isBeforeOtherTime(l.newDate, o.instance.getCurTime()), m = "";
if (1 === l.getWay && l.taskType !== h.RANK && l.taskType !== h.DUANWU) {
m = o.instance.getTaskProcess(l.taskType) + "/" + l.taskParam;
}
c.refresh(d, u, f, p, m);
d && e++;
if (o.instance.knifeSkin.id === l.id) {
this.onItemClick(null, c, !0);
c.setCheck(!1);
}
}
}
} catch (e) {
i = !0;
a = e;
} finally {
try {
!t && r.return && r.return();
} finally {
if (i) throw a;
}
}
this.countLabel.string = e + "/" + this._itemCells.length;
},
buyBtnClick: function() {
if (this.lastCheckItem) {
var e = this.lastCheckItem;
switch (e.data.priceType) {
case 0:
if (o.instance.gold >= e.data.price) {
o.instance.addKnifeSkin(e.data.id);
o.instance.updateGold(-e.data.price);
this.refresh();
this.onItemClick(null, e);
} else this.world.uiMgr.showTips(7);
break;

case 1:
if (o.instance.zongZi >= e.data.price) {
o.instance.addKnifeSkin(e.data.id);
o.instance.updateZongZi(-e.data.price);
this.refresh();
this.onItemClick(null, e);
} else this.world.uiMgr.showTips("Insufficient Diamond");
}
}
},
jumpBtnClick: function() {
if (this.lastCheckItem) {
this.world.uiMgr.closePanelShop();
switch (this.lastCheckItem.data.jumpParam) {
case "PanelInvite":
this.world.uiMgr.showPanelInvite();
break;

case "PanelDailyTask":
this.world.uiMgr.showPanelDailyTask();
break;

case "PanelAddTop":
this.world.uiMgr.showPanelAddTop();
break;

case "PanelSign":
this.world.uiMgr.showPanelSign();
break;

case "PanelHolidayRank":
this.world.uiMgr.showPanelHolidayRank(!0);
}
}
},
unLockBtnClick: function() {
var e = this, t = function(t) {
if (e.lastCheckItem && t) {
var i = e.lastCheckItem;
o.instance.addKnifeSkin(i.data.id);
e.refresh();
e.onItemClick(null, i);
i.data.taskType === h.LOGIN && o.instance.updateSignCount();
e.world.uiMgr.refreshRedDot();
}
};
this.shareIcon.active ? this.showShare(t) : this.showAdver(t);
},
showShare: function(e) {
c.share(l.UnlockSkin, e);
},
showAdver: function(e) {
var t = this;
s.instance.showAdver(r.UnlockSkin, e, function() {
t.showShare(e);
});
},
onItemClick: function(e, t) {
var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], s = t, r = s.data, c = this._itemCells.indexOf(s);
this.itemScrollView.scrollToOffset(cc.v2(0, 150 * Math.floor(c / 3) - 150 + (d.instance.isPad() ? 150 : 0)), 1);
this.lastCheckItem && this.lastCheckItem.setCheck(!1);
s.setCheck(!0);
this.lastCheckItem = s;
this.buyNode.active = !1;
this.unLockNode.active = !1;
this.watchAdverBtnNode.active = !1;
this.jumpNode.active = !1;
this.world.onEquipKnifeSkin(r, s.isGet, !1);
if (s.isGet) {
this.lastEquipItem && this.lastEquipItem.setEquip(!1);
this.lastEquipItem = s;
s.setEquip(!0);
} else if (0 === r.getWay) this.buyNode.active = !0; else if (1 === r.getWay) if (n.arrContains(o.instance.completeTaskIds, r.taskId)) {
this.unLockNode.active = !0;
this.shareIcon.active = 1 === r.unlockWay;
this.adverIcon.active = 2 === r.unlockWay;
} else r.taskType === h.ADVERCOUNT ? this.watchAdverBtnNode.active = !0 : r.jumpParam && (this.jumpNode.active = !0);
this.nameLabel.string = r.name;
this.introduceLabel.string = r.introduce;
this.initCountLabel.string = r.initKnifeCount;
this.propertyNode.active = !!r.propertyTips;
this.propertyLabel.string = r.propertyTips ? r.propertyTips : "";
this.taskInfoNode.active = 1 === r.getWay;
if (this.taskInfoNode.active) {
var l = (k = o.instance.getTaskProcess(r.taskType)) < r.taskParam ? k : r.taskParam;
this.taskStartLabel.string = "(";
this.taskProgressLabel.string = l || 0;
this.taskFinalLabel.string = "/" + r.taskParam;
this.taskMoreLabel.string = ")";
if (r.taskType === h.RANK || r.taskType === h.DUANWU) {
this.taskStartLabel.string = "";
this.taskProgressLabel.string = "";
this.taskFinalLabel.string = "";
this.taskMoreLabel.string = "";
}
this.watchAdverLabel.string = n.getStringByFormat(a.instance.getUITipStr(20), l, r.taskParam);
}
this.buyLangLabel.string = "Buy";
this.goLangLabel.string = "Go";
this.suitNode.active = r.suit;
if (r.suit) {
var u = a.instance.getSuitData(r.suit), f = a.instance.getHeroSkinById(u.heroSkin), p = r, m = o.instance.isOwnHeroSkin(u.heroSkin), g = o.instance.isOwnKnifeSkin(u.knifeSkin), y = o.instance.isCurEquipHeroSkin(f.id), v = o.instance.isCurEquipKnifeSkin(p.id);
this.suitNameLabel.string = u.name;
var k = 0;
m && k++;
g && k++;
this.suiProcessLabel.string = "(" + k + "/2)";
this.suitHeroNameLabel.string = f.name;
this.suitKnifeNameLabel.string = p.name;
this.suitSkillLabel.string = u.skillTips;
for (var C = 0; C < this.suitIconNode.children.length; C++) this.suitIconNode.children[C] && (this.suitIconNode.children[C].active = C + 1 == r.suit);
this.suitHeroFlag.active = y;
this.suitKnifeFlag.active = v;
this.suitHeroFalseFlag.active = !y;
this.suitKnifeFalseFlag.active = !v;
this.suitActiveIcon.active = m && g && y && v;
this.suitCloseIcon.active = !(m && g && y && v);
this.suitActiveIcon.active && !i && this.world.uiMgr.showActiveSuitEffect();
}
},
onWathAdverBtnClick: function() {
var e = this;
s.instance.showAdver(r.WatchAdver, function(t) {
if (e.lastCheckItem && t) {
var i = e.lastCheckItem;
e.world.taskMgr.refreshTaskInHome();
e.refresh();
e.onItemClick(null, i);
}
}, function() {
e.world.uiMgr.showTips(4);
});
},
close: function() {
this.lastEquipItem.setEquip(!1);
this.lastCheckItem && this.lastCheckItem.setCheck(!1);
this.closeCallcack && this.closeCallcack();
this.world.onEquipKnifeSkin(o.instance.knifeSkin, !0);
o.instance.clearNeedCheckTaskIds();
},
setCloseCallback: function(e) {
this.closeCallcack = e;
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
ConfigData: "ConfigData",
GameData: "GameData",
PlatformMgr: "PlatformMgr",
PlayerData: "PlayerData",
ShareMgr: "ShareMgr",
Tools: "Tools",
Types: "Types"
} ],
PanelLevelUp: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "6543aSucf5DRpLUM51OhiLp", "PanelLevelUp");
var n = e("UIUtil"), a = e("ConfigData"), o = e("PlayerData"), s = e("PlatformMgr"), r = e("AdvertMgr"), c = e("Tools"), l = e("ShareMgr"), h = e("Types").ShareType, d = e("Types").CustomFunnelEvent;
cc.Class({
extends: cc.Component,
properties: {
levelUpAnim: cc.Animation,
goldLabel: cc.Label,
rankLabel: cc.Label,
confirmBtn: cc.Node,
panelNode: cc.Node,
oldRankIcon: cc.Sprite,
midRankIcon: cc.Sprite,
newRankIcon: cc.Sprite,
time: 0,
unlockBuffNode: cc.Node,
unlockBuffLabel: cc.Label,
unlockBuffIcon: cc.Node,
unlockMapNode: cc.Node,
unlockMapLabel: cc.Label,
unlockMapIcon: cc.Node,
unlockSpecialNode: cc.Node,
unlockSpecialLabel: cc.Label,
unlockSpecialIcon: cc.Node,
unlockBoxNode: cc.Node,
unlockBoxLabel: cc.Label,
unlockBoxIcon: cc.Node,
rankUpSpine: sp.Skeleton,
rankUpIconAnim: cc.Animation,
rankUpEffectAnim: cc.Animation,
greatLabel: cc.Label
},
init: function(e) {
this.callback = e;
var t = o.instance.oldRankData, i = o.instance.rankData;
if (t && i) {
this.oldRank = t;
this.newRank = i;
this.showLevelUp();
r.instance.showBanner();
this.greatLabel.string = "Great!";
} else this.onConfirmBtnClick();
},
showLevelUp: function() {
var e = this;
this.nextRankData = a.instance.getRankDataById(this.newRank.id);
this.oldGoldRate = 100 * this.oldRank.goldMultiRate + 100;
this.newGoldRate = 100 * this.nextRankData.goldMultiRate + 100;
this.addGoldRate = this.newGoldRate - this.oldGoldRate;
n.loadResSprite(this.oldRankIcon, this.oldRank.url);
n.loadResSprite(this.newRankIcon, this.nextRankData.url);
this.rankLabel.string = this.oldRank.name;
this.goldLabel.string = c.getStringByFormat(a.instance.getUITipStr(13), Math.ceil(this.oldGoldRate));
this.confirmBtn.active = !1;
this.unlockBuffNode.active = !1;
this.unlockMapNode.active = !1;
this.unlockSpecialNode.active = !1;
this.unlockBoxNode.active = !1;
var t = !0, i = !1, o = void 0;
try {
for (var s, r = this.unlockBuffIcon.children[Symbol.iterator](); !(t = (s = r.next()).done); t = !0) {
s.value.active = !1;
}
} catch (e) {
i = !0;
o = e;
} finally {
try {
!t && r.return && r.return();
} finally {
if (i) throw o;
}
}
var l = !0, h = !1, d = void 0;
try {
for (var u, f = this.unlockMapIcon.children[Symbol.iterator](); !(l = (u = f.next()).done); l = !0) {
u.value.active = !1;
}
} catch (e) {
h = !0;
d = e;
} finally {
try {
!l && f.return && f.return();
} finally {
if (h) throw d;
}
}
var p = !0, m = !1, g = void 0;
try {
for (var y, v = this.unlockSpecialIcon.children[Symbol.iterator](); !(p = (y = v.next()).done); p = !0) {
y.value.active = !1;
}
} catch (e) {
m = !0;
g = e;
} finally {
try {
!p && v.return && v.return();
} finally {
if (m) throw g;
}
}
var k = !0, C = !1, S = void 0;
try {
for (var w, T = this.unlockBoxIcon.children[Symbol.iterator](); !(k = (w = T.next()).done); k = !0) {
w.value.active = !1;
}
} catch (e) {
C = !0;
S = e;
} finally {
try {
!k && T.return && T.return();
} finally {
if (C) throw S;
}
}
this.panelNode.getComponent(cc.Animation).play("ani-levelUpNode");
if (this.newRank.id - this.oldRank.id == 1) {
this.rankUpSpine.setAnimation(1, "rankup-begin");
this.rankUpIconAnim.play();
this.newRank.isRankFirst ? this.rankUpEffectAnim.play("effect-rankup-plus") : this.rankUpEffectAnim.play("effect-rankup");
setTimeout(function() {
e.levelUpAnim.play("ani-levelUp");
}, 1e3);
setTimeout(function() {
e.rankUpSpine.setAnimation(1, "rankup-keep", !0);
e.rankUpEffectAnim.play("effect-rankup-keep");
}, 2500);
setTimeout(function() {
e.rankLabel && (e.rankLabel.string = e.nextRankData.name);
}, 1700);
setTimeout(function() {
e.updateGoldRate = !0;
}, 2166);
setTimeout(function() {
var t = function() {
if (e.newRank.unlockBuff || 0 === e.newRank.unlockBuff) {
e.unlockBuffLabel.string = e.newRank.unlockTips;
e.unlockBuffIcon.children[e.newRank.unlockBuff].active = !0;
e.unlockBuffNode.active = !0;
}
}, i = function() {
if (e.newRank.unlockMap || 0 === e.newRank.unlockMap) {
e.unlockMapNode.active = !0;
e.unlockMapLabel.string = e.newRank.unlockMapTips;
e.unlockMapIcon.children[e.newRank.unlockMap].active = !0;
setTimeout(function() {
t();
}, 200);
} else t();
}, n = function() {
if (e.newRank.unlockSpecial || 0 === e.newRank.unlockSpecial) {
e.unlockSpecialNode.active = !0;
e.unlockSpecialLabel.string = e.newRank.unlockSpecialTips;
e.unlockSpecialIcon.children[e.newRank.unlockSpecial].active = !0;
setTimeout(function() {
i();
}, 200);
} else i();
};
if (e.newRank.unlockBox || 0 === e.newRank.unlockBox) {
e.unlockBoxNode.active = !0;
e.unlockBoxLabel.string = e.newRank.unlockBoxTips;
e.unlockBoxIcon.children[e.newRank.unlockBox].active = !0;
setTimeout(function() {
n();
}, 200);
} else n();
}, 2166);
} else {
var N = a.instance.getRankDataById(this.oldRank.id + 1);
n.loadResSprite(this.midRankIcon, N.url);
setTimeout(function() {
e.levelUpAnim.play("ani-levelUp-2");
}, 1e3);
setTimeout(function() {
e.rankLabel && (e.rankLabel.string = N.name);
}, 1700);
setTimeout(function() {
e.rankLabel && (e.rankLabel.string = e.nextRankData.name);
}, 2400);
setTimeout(function() {
e.updateGoldRate = !0;
}, 3e3);
}
},
update: function(e) {
var t = this;
if (this.updateGoldRate) {
this.goldLabel.string = c.getStringByFormat(a.instance.getUITipStr(13), Math.ceil(this.newGoldRate));
this.updateGoldRate = !1;
this.confirmBtn.y = -68;
(this.newRank.unlockBuff || 0 === this.newRank.unlockBuff) && (this.confirmBtn.y -= 60);
(this.newRank.unlockMap || 0 === this.newRank.unlockMap) && (this.confirmBtn.y -= 60);
(this.newRank.unlockSpecial || 0 === this.newRank.unlockSpecial) && (this.confirmBtn.y -= 60);
(this.newRank.unlockBox || 0 === this.newRank.unlockBox) && (this.confirmBtn.y -= 60);
setTimeout(function() {
t.oldRank = t.nextRankData;
t.confirmBtn.active = !0;
}, 300);
}
},
onConfirmBtnClick: function() {
this.callback && this.callback();
this.node.active = !1;
o.instance.isSecGame() && s.notifyFunnelEvent(d.RankUpEnd);
},
onShareBtnClick: function() {
l.share(h.LevelUp);
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
ConfigData: "ConfigData",
PlatformMgr: "PlatformMgr",
PlayerData: "PlayerData",
ShareMgr: "ShareMgr",
Tools: "Tools",
Types: "Types",
UIUtil: "UIUtil"
} ],
PanelMatch: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d02b8uxErNPrIM91YlLhGTA", "PanelMatch");
var n = e("Tools");
cc.Class({
extends: cc.Component,
properties: {
itemParent: cc.Node,
itemMatchPrefab: cc.Prefab
},
cleanUp: function() {
this.itemParent.destroyAllChildren();
},
init: function(e, t) {
var i = e.concat();
i.sort(function(e, t) {
return Math.random() > .5 ? -1 : 1;
});
for (var a = [], o = 0; o < i.length; o++) {
var s = cc.instantiate(this.itemMatchPrefab);
s.parent = this.itemParent;
s.x = o % 4 * 150;
s.y = -150 * Math.floor(o / 4);
var r = s.getComponent("ItemMatch");
r.init(i[o]);
i[o].isLocal ? r.showIcon() : a.push(r);
}
a.sort(function(e, t) {
return Math.random() > .5 ? -1 : 1;
});
for (var c = 0, l = function(e) {
var t = a[e], i = n.getRandomInt(100, 400);
c += i;
setTimeout(function() {
t.showIcon();
}, c);
}, h = 0; h < a.length; h++) l(h);
c += 300;
setTimeout(function() {
t();
}, c);
}
});
cc._RF.pop();
}, {
Tools: "Tools"
} ],
PanelNotice: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "7e639Q10g1DraNCi5mzUDHo", "PanelNotice");
e("Types").NoticeType;
cc.Class({
extends: cc.Component,
properties: {
notice: [ cc.Node ],
isOpen: !1
},
onLoad: function() {
this.noticeArr = [ 0, 1, 2, 3 ];
this.index = 0;
this.time = 999;
this.timeLimit = 5;
this.timeInterval = 3;
this.isOpen = !1;
},
update: function(e) {
this.time += e;
if (this.time >= this.timeLimit && this.isIn) {
this.isIn = !1;
var t = cc.fadeOut(1);
this.curType > 8 && (t = cc.fadeOut(0));
this.isOpen = !1;
this.curNotice && this.curNotice.runAction(t);
}
if (this.time >= this.timeInterval + this.timeLimit) {
this.time = 0;
this.isIn = !0;
this.curType = this.noticeArr[this.index];
this.curNotice = this.notice[this.curType];
this.noticeArr[this.index] > 3 ? this.noticeArr.splice(this.index, 1) : this.index++;
this.index >= this.noticeArr.length && (this.index = 0);
var i = cc.fadeIn(1);
this.curType > 8 && (i = cc.fadeIn(0));
this.isOpen = !0;
this.curNotice.runAction(i);
}
},
addSpecialNotice: function(e) {
this.noticeArr.splice(this.index, 0, e);
},
showImportantNotice: function(e) {
this.addSpecialNotice(e);
this.time += 9999;
this.curNotice && (this.curNotice.opacity = 0);
},
close: function() {
this.curNotice && (this.curNotice.opacity = 0);
this.isOpen = !1;
}
});
cc._RF.pop();
}, {
Types: "Types"
} ],
PanelNotification: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "a9d956eoi5ApIOzzesB/RGO", "PanelNotification");
var n = e("ConfigData"), a = e("PlayerData"), o = e("Tools");
cc.Class({
extends: cc.Component,
properties: {
countDownLabel: cc.Label
},
onLoad: function() {
this.endTime = o.getTimeStampByTimeStr(n.instance.holidayDatas.startDate);
},
update: function(e) {
this.countDownLabel.string = o.getRemainTimeStr(a.instance.getCurTime(), this.endTime);
o.isBeforeOtherTime(n.instance.holidayDatas.startDate, a.instance.getCurTime()) || this.close();
},
close: function() {
this.node.active = !1;
}
});
cc._RF.pop();
}, {
ConfigData: "ConfigData",
PlayerData: "PlayerData",
Tools: "Tools"
} ],
PanelOfflineGold: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "755d4KgYhJIvaW0EnsHgKov", "PanelOfflineGold");
var n = e("PlayerData"), a = e("ConfigData"), o = e("ShareMgr"), s = e("Types").ShareType, r = e("AdvertMgr"), c = e("Types").AdverType, l = e("Types").GrowType, h = e("Tools"), d = e("PlatformMgr"), u = e("Types").StageType;
cc.Class({
extends: cc.Component,
properties: {
goldCountLabel: cc.Label,
goldCountSprite: cc.Sprite,
multipNode: cc.Node,
normalLabel: cc.Label,
multipLabel: cc.Label,
timeLabel: cc.Label,
freeIcon: cc.Node,
shareIcon: cc.Node,
adverIcon: cc.Node
},
init: function(e) {
var t = this;
this.world = e;
this.offlineGoldNormalCount = a.instance.clientData.offlineGoldNormalCount;
this.offlineGoldInterval = 1e3 * a.instance.clientData.offlineGoldInterval;
this.offlineGoldMultipLimit = 1e3 * a.instance.clientData.offlineGoldMultipLimit;
this.maxCount = 86400 / a.instance.clientData.offlineGoldInterval;
var i = this;
this.reveiveCallF = function(e) {
d.k6_userDate(function() {
var t = n.instance.getFinalOfflineGold();
e && (t *= 3);
n.instance.updateGold(t);
n.instance.showGold -= t;
var a = {
count: t,
isMore: e,
isLucky: !1
};
i.world.uiMgr.showGetMoneyEffect(a);
n.instance.updateGetOfflineGoldTime();
i.refreshData();
});
};
this.refreshData();
this.canUpdate = !0;
this.stage = a.instance.getCurStageByPrizeCount(n.instance);
var o = function(e) {
t.adverIcon.active = e;
t.shareIcon.active = !e;
};
switch (this.stage) {
case u.Free:
case u.Share:
o(!1);
break;

case u.Adver:
r.instance.loadAdver(c.OfflineGold, o);
}
},
refreshData: function() {
this.time = n.instance.getOfflineTime();
this.goldCount = n.instance.getFinalOfflineGold();
this.receiveTime = n.instance.getReceiveOfflineGoldTime();
this.offlineGoldCount = n.instance.offlineGoldCount;
var e = n.instance.getGrowLevelDataByType(l.Gold);
this.rate = e.realOfflineParam / 100 + 1;
this.goldCountLabel.string = 0;
this.normalLabel.string = 0;
this.multipLabel.string = 0;
},
onReceiveBtnClick: function() {
var e = n.instance.getReceiveOfflineGoldTime();
e < this.offlineGoldInterval ? this.world.uiMgr.showTips(8) : e < this.offlineGoldMultipLimit ? this.reveiveCallF(!1) : this.showMultipNode();
},
showMultipNode: function(e) {
this.callback = e;
this.multipNode.active = !0;
},
close: function() {
this.multipNode.active = !1;
if (this.callback) {
this.callback();
this.callback = null;
}
},
onNormalBtnClick: function() {
this.reveiveCallF(!1);
this.close();
},
onMultipBtnClick: function() {
var e = this, t = function(t) {
if (t) {
e.reveiveCallF(!0);
e.close();
}
};
this.shareIcon.active ? this.showShare(t) : this.adverIcon.active ? this.showAdver(t) : t(!0);
},
showAdver: function(e) {
var t = this;
r.instance.showAdver(c.OfflineGold, e, function() {
t.showShare(e);
});
},
showShare: function(e) {
o.share(s.OfflineGold, e);
},
update: function(e) {
if (this.canUpdate) {
this.time += 1e3 * e;
this.goldCountSprite.fillRange = -this.time % this.offlineGoldInterval / this.offlineGoldInterval;
var t = Math.floor(this.time / this.offlineGoldInterval);
if (t !== this.goldCount && t <= this.maxCount) {
this.goldCount = t;
var i = Math.floor(10 * (this.offlineGoldCount + t * this.offlineGoldNormalCount * this.rate)) / 10;
this.goldCountLabel.string = h.getGoldStr(i);
this.normalLabel.string = h.getGoldStr(i);
this.multipLabel.string = h.getGoldStr(3 * i);
}
this.receiveTime += 1e3 * e;
var n = (864e5 - this.receiveTime) / 1e3;
n = n < 0 ? 0 : n;
if ((a = Math.floor(n % 3600 / 60)) !== this.minute) {
this.minute = a;
var a = Math.floor(n % 3600 / 60), o = Math.floor(n / 3600), s = (o >= 10 ? o : "0" + o) + ":" + (a >= 10 ? a : "0" + a);
this.timeLabel.string = s;
}
}
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
ConfigData: "ConfigData",
PlatformMgr: "PlatformMgr",
PlayerData: "PlayerData",
ShareMgr: "ShareMgr",
Tools: "Tools",
Types: "Types"
} ],
PanelPkReward: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "7da00JKJDxAVKCvDPJIRnhd", "PanelPkReward");
var n = e("ConfigData"), a = e("BagItem"), o = e("Types").ItemType, s = e("PlayerData"), r = e("GameData");
cc.Class({
extends: cc.Component,
properties: {
rankLabel: cc.Label,
tipsText: cc.RichText,
diamondLabel: cc.Label,
goldLabel: cc.Label
},
init: function(e, t, i) {
this.callback = t;
this.world = i;
this.rankData = e;
var c = e.rank, l = e.round, h = e.joinTime, d = n.instance.getPKRewardByRank(c);
r.instance.isShowLog() && console.log("--------------------------刷新小组排名奖励：", h, "轮次:", l, "名次:", c);
if (-1 === c || s.instance.hasReceivePKRound(h) || !d) this.close(!1); else {
this.rankLabel.string = "小组第" + c + "名";
this.tipsText.string = "恭喜你取得小组PK（第" + l + "轮）</color=##EEE50E>第" + c + "名";
this.items = a.createItemsWithString(d.reward);
for (var u = 0; u < this.items.length; u++) switch (this.items[u].type) {
case o.MONEY:
this.goldNum = this.items[u].num;
this.goldLabel.string = "x" + this.goldNum;
break;

case o.ZONG_ZI:
this.diamondNum = this.items[u].num;
this.diamondLabel.string = "x" + this.diamondNum;
}
}
},
close: function() {
if (!(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0]) {
if (this.goldNum) {
s.instance.updateGold(this.goldNum);
s.instance.showGold -= this.goldNum;
var e = {
count: this.goldNum,
isMore: !0,
isLucky: !1
};
this.world.uiMgr.showGetMoneyEffect(e);
}
if (this.diamondNum) {
s.instance.updateZongZi(this.diamondNum);
this.world.uiMgr.showTips(Tools.getStringByFormat(n.instance.getUITipStr(15), count));
}
s.instance.updateReceiveRound(this.rankData.joinTime, !0);
}
s.instance.updateDayRefreshPKReward();
this.node.active = !1;
this.callback && this.callback();
}
});
cc._RF.pop();
}, {
BagItem: "BagItem",
ConfigData: "ConfigData",
GameData: "GameData",
PlayerData: "PlayerData",
Types: "Types"
} ],
PanelProperty: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "82f59wtrFJK35CGw4s6yGZh", "PanelProperty");
cc.Class({
extends: cc.Component,
properties: {
knifePropertyNode: cc.Node,
knifePropertyLabel: cc.Label,
heroPropertyNode: cc.Node,
heroPropertyLabel: cc.Label
},
refreshProperty: function(e, t) {},
refresh: function() {},
refreshHero: function() {
this.heroPropertyNode.active = !1;
}
});
cc._RF.pop();
}, {} ],
PanelRankInfo: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "808df6Tm2tARrvGIuHLJYFS", "PanelRankInfo");
var n = e("Tools"), a = e("ConfigData"), o = e("PlayerData"), s = e("AdvertMgr"), r = e("Types").AdverType, c = e("BagItem"), l = e("Types").ItemType, h = e("ShareMgr"), d = e("Types").ShareType;
cc.Class({
extends: cc.Component,
properties: {
itemRankInfo: cc.Prefab,
itemStarPrefab: cc.Prefab,
itemRankReward: cc.Prefab,
itemScrollView: cc.ScrollView,
content: cc.Node,
itemRankParent: cc.Node,
itemStarParent: cc.Node,
bar: cc.Node,
barBg: cc.Node,
countNode: cc.Node,
countLabel: cc.Label,
cubeBgNode: cc.Node,
_itemCells: [],
_itemNodes: []
},
init: function(e) {
this.world = e;
this.itemHeight = 320;
for (var t = a.instance.starRankDatas, i = t.length - 1; i >= 0; i--) {
var n = t[i];
if (!this._itemNodes[i]) {
var s = cc.instantiate(this.itemRankReward);
s.parent = this.itemRankParent;
s.x = 80;
s.y = -135 - this.itemHeight * (t.length - 1 - i);
this._itemNodes[i] = s;
var r = s.getComponent("ItemRankReward");
if (n.reward) {
var h = c.createItemWithString(n.reward);
switch (h.type) {
case l.HERO_SKIN:
case l.KNIFE_SKIN:
r.init(n, h, !0);
break;

case l.MONEY:
r.init(n, h, !1);
}
} else r.init(n, null, !1);
this._itemCells[i] = r;
r.setOnItemClick(this, r);
if (n.levelUpStar) for (var d = 1; d <= n.levelUpStar; d++) {
var u = cc.instantiate(this.itemStarPrefab);
u.parent = this.itemStarParent;
u.x = 35;
u.y = s.y + d * (this.itemHeight / n.levelUpStar);
var f = o.instance.rankStar >= n.star + d;
u.children[0].active = !!f;
u.children[1].active = !f;
}
}
}
var p = o.instance.rankData, m = o.instance.rankStar, g = 0;
if (p.levelUpStar) g = (m - p.star) / p.levelUpStar;
this.content.height = this.itemHeight * t.length;
this.bar.y = -this.itemHeight * (t.length - 1);
this.barBg.height = this.itemHeight * (t.length - 1);
this.bar.height = p.id * this.itemHeight + this.itemHeight * g;
this.itemScrollView.scrollToOffset(cc.v2(0, this.itemHeight * (t.length - 1.5) - this.bar.height));
this.refresh();
this.onScrollView();
},
refresh: function() {
var e = !0, t = !1, i = void 0;
try {
for (var a, s = this._itemCells[Symbol.iterator](); !(e = (a = s.next()).done); e = !0) {
var r = a.value, c = r.data, h = r.item, d = !1, u = o.instance.rankData.id >= c.id;
if (h) switch (h.type) {
case l.HERO_SKIN:
d = o.instance.isOwnHeroSkin(h.id);
break;

case l.KNIFE_SKIN:
d = o.instance.isOwnKnifeSkin(h.id);
break;

case l.MONEY:
d = n.arrContains(o.instance.completeRankRewardIds, c.id);
}
r.refresh(d, u);
}
} catch (e) {
t = !0;
i = e;
} finally {
try {
!e && s.return && s.return();
} finally {
if (t) throw i;
}
}
},
onItemClick: function(e, t) {
var i = t, a = i.data, s = i.item;
if (!n.arrContains(o.instance.completeRankRewardIds, a.id)) switch (s.type) {
case l.HERO_SKIN:
case l.KNIFE_SKIN:
this.unLockBtnClick(i);
break;

case l.MONEY:
o.instance.updateGold(s.num);
o.instance.showGold -= s.num;
o.instance.addCompleteRankReward(a.id);
var r = {
count: s.num,
isMore: !0,
isLucky: !1
};
this.world.uiMgr.showGetMoneyEffect(r);
this.world.uiMgr.refreshRedDot();
i.refresh(!0, !0);
}
},
unLockBtnClick: function(e) {
var t = this;
s.instance.showAdver(r.UnlockSkin, function(i) {
t.unLockCallback(i, e);
}, function() {
t.showShare(e);
});
},
showShare: function(e) {
var t = this;
h.share(d.UnlockSkin, function(i) {
t.unLockCallback(i, e);
});
},
unLockCallback: function(e, t) {
if (t && e) {
var i = t.item;
o.instance.addCompleteRankReward(t.data.id);
var n = t.item.id;
switch (i.type) {
case l.HERO_SKIN:
o.instance.addHeroSkin(n);
var s = a.instance.getHeroSkinById(n);
this.world.onEquipHeroSkin(s, !0);
this.world.uiMgr.showReward(s);
break;

case l.KNIFE_SKIN:
o.instance.addKnifeSkin(n);
s = a.instance.getKnifeSkinById(n);
this.world.onEquipKnifeSkin(s, !0);
this.world.uiMgr.showReward(s);
}
this.world.uiMgr.refreshRedDot();
t.refresh(!0, !0);
}
},
onScrollView: function() {
for (var e = this.itemScrollView.getScrollOffset().y, t = 0, i = 25 - Math.floor((e - 100) / this.itemHeight), n = i; n >= 0; n--) {
this._itemCells[n].unLockNode.active && t++;
}
if (t) {
this.countNode.active = !0;
t !== this.countLabel.string && (this.countLabel.string = t);
} else this.countNode.active = !1;
for (var a = 0; a < this._itemCells.length; a++) a < i + 4 && a > i - 2 ? this._itemNodes[a].active || (this._itemNodes[a].active = !0) : this._itemNodes[a].active && (this._itemNodes[a].active = !1);
},
onCloseBtnClick: function() {
this.node.active = !1;
s.instance.destoryBanner();
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
BagItem: "BagItem",
ConfigData: "ConfigData",
PlayerData: "PlayerData",
ShareMgr: "ShareMgr",
Tools: "Tools",
Types: "Types"
} ],
PanelRank: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "adba1bCI8tBgL8s3y72Vt9C", "PanelRank");
var n = e("ConfigData"), a = e("PlayerData");
e("Tools"), e("AdvertMgr");
cc.Class({
extends: cc.Component,
properties: {
itemRankPrefab: cc.Prefab,
itemMiniRankPrefab: cc.Prefab,
itemRankParent: cc.Node,
itemMiniRankParent: cc.Node,
greenBar: cc.Node,
greenArrow: cc.Node,
blackBar: cc.Node,
blackArrow: cc.Node,
bubbleNode: cc.Node,
bubbleStar: cc.Node,
bubbleLabel: cc.Label,
moveNode: cc.Node,
finalWidth: 0,
widthPer: 1,
percent: 0,
index: 0
},
init: function() {
this.isInit = !0;
this.maxInterval = 600;
this.minInterval = 320;
this.rankDatas = n.instance.getBigRankDatas();
for (var e = 0; e < this.rankDatas.length; e++) {
var t = this.rankDatas[e], i = this.rankDatas[e + 1], o = cc.instantiate(this.itemMiniRankPrefab);
o.parent = this.itemMiniRankParent;
o.x = e * this.minInterval;
o.getComponent("ItemRankMini").init(t);
var s = cc.instantiate(this.itemRankPrefab);
s.parent = this.itemRankParent;
s.x = e * this.maxInterval;
var r = s.getComponent("ItemRank"), c = i && a.instance.rankStar >= i.star, l = a.instance.rankStar >= t.star && !c;
r.refreshUnlock(t);
if (l) {
this.index = e;
this.keepIndex = e;
t.levelUpStar ? this.percent = (a.instance.rankStar - t.star) / (i.star - t.star) : this.percent = 0;
this.move();
t = a.instance.rankData;
}
r.init(t, c, l);
}
},
onLeft: function() {
if (0 !== this.index) {
this.index--;
this.move();
}
},
onRight: function() {
if (this.index !== this.rankDatas.length - 1) {
this.index++;
this.move();
}
},
refresh: function() {
if (this.index !== this.keepIndex) {
this.index = this.keepIndex;
this.move();
}
},
move: function() {
var e = this;
this.moveNode.active = !1;
this.itemRankParent.stopAllActions();
this.itemMiniRankParent.stopAllActions();
var t = cc.moveTo(.4, cc.v2(-this.index * this.maxInterval, 50)).easing(cc.easeBackOut(3));
this.itemRankParent.runAction(t);
var i = cc.moveTo(.5, cc.v2(-this.index * this.minInterval, -197)).easing(cc.easeIn(3));
this.itemMiniRankParent.runAction(i);
setTimeout(function() {
e.moveNode.active = !0;
}, 500);
this.showBubble = !0;
if (this.index === this.keepIndex) {
this.finalWidth = 360 + 360 * this.percent;
this.greenArrow.active = !0;
} else if (this.index === this.keepIndex + 1) {
this.finalWidth = 360 * this.percent;
this.greenArrow.active = !1;
} else if (this.index < this.keepIndex) {
this.finalWidth = 720;
this.greenArrow.active = !0;
this.showBubble = !1;
} else {
this.finalWidth = 0;
this.greenArrow.active = !1;
this.showBubble = !1;
}
this.blackBar.width = 720;
this.moveNode.children[0].active || (this.moveNode.children[0].active = !0);
this.moveNode.children[1].active || (this.moveNode.children[1].active = !0);
if (0 === this.index) {
this.blackArrow.active = !1;
this.greenArrow.active = !1;
this.moveNode.children[0].active = !1;
if (this.isInit) {
this.greenBar.x = 360;
this.blackBar.x = 360;
this.isInit = !1;
}
this.finalWidth -= 360;
} else if (this.index === this.rankDatas.length - 1) {
this.blackBar.width = 360;
this.blackArrow.active = !1;
this.greenArrow.active = !1;
this.moveNode.children[1].active = !1;
}
this.widthPer = this.finalWidth - this.greenBar.width > 0 ? 1 : -1;
this.refeshBubble();
},
refeshBubble: function() {
this.bubbleLabel.string = a.instance.rankStar;
this.bubbleNode.scaleY = 1;
this.bubbleStar.scaleY = .4;
this.bubbleLabel.node.scaleY = 1;
this.bubbleNode.scaleX = 1;
this.bubbleStar.scaleX = .4;
this.bubbleLabel.node.scaleX = 1;
var e = this.finalWidth;
if (e < 70) {
this.bubbleNode.scaleY = -1;
this.bubbleStar.scaleY = -.4;
this.bubbleLabel.node.scaleY = -1;
} else if (e > 245 && e < 360) {
this.bubbleNode.scaleX = -1;
this.bubbleStar.scaleX = -.4;
this.bubbleLabel.node.scaleX = -1;
e >= 330 && (e = 330);
} else if (e >= 360 && e < 390) e = 390; else if (e > 580 && e < 660) {
this.bubbleNode.scaleX = -1;
this.bubbleStar.scaleX = -.4;
this.bubbleLabel.node.scaleX = -1;
} else if (e >= 660) {
this.bubbleNode.scaleY = -1;
this.bubbleStar.scaleY = -.4;
this.bubbleLabel.node.scaleY = -1;
this.bubbleNode.scaleX = -1;
this.bubbleStar.scaleX = -.4;
this.bubbleLabel.node.scaleX = -1;
}
this.bubbleNode.active = this.showBubble;
},
onClose: function() {
this.node.active = !1;
},
update: function(e) {
if (this.startMove > 0) {
this.startMove -= e;
if (this.startMove <= 0) {
this.startMove = 0;
this.move();
}
}
if (this.greenBar.width !== this.finalWidth) {
this.greenBar.width += 720 * this.widthPer * e;
this.bubbleNode.x = this.greenBar.width;
if (this.widthPer > 0) {
if (this.greenBar.width > this.finalWidth) {
this.greenBar.width = this.finalWidth;
this.bubbleNode.x = this.finalWidth;
this.fixBubble();
}
} else if (this.greenBar.width < this.finalWidth) {
this.greenBar.width = this.finalWidth;
this.bubbleNode.x = this.finalWidth;
this.fixBubble();
}
}
if (0 === this.index) {
if (360 !== this.blackBar.x) {
this.blackBar.x += 720 * e;
this.blackBar.x >= 360 && (this.blackBar.x = 360);
}
if (360 !== this.greenBar.x) {
this.greenBar.x += 720 * e;
this.greenBar.x >= 360 && (this.greenBar.x = 360);
}
} else {
if (0 !== this.blackBar.x) {
this.blackBar.x -= 720 * e;
this.blackBar.x <= 0 && (this.blackBar.x = 0);
}
if (0 !== this.greenBar.x) {
this.greenBar.x -= 720 * e;
this.greenBar.x <= 0 && (this.greenBar.x = 0);
}
}
},
fixBubble: function() {
this.finalWidth >= 360 && this.finalWidth < 390 ? this.bubbleNode.x = 390 : this.finalWidth >= 330 && this.finalWidthh < 360 && (this.bubbleNode.x = 330);
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
ConfigData: "ConfigData",
PlayerData: "PlayerData",
Tools: "Tools"
} ],
PanelRepay: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "74a11T+3EZIFpyUDkhYUHUq", "PanelRepay");
var n = e("PlayerData"), a = e("ConfigData"), o = (e("Tools"), e("ShareMgr")), s = e("Types").ShareType;
e("AdvertMgr"), e("Types").AdverType;
cc.Class({
extends: cc.Component,
properties: {
goldLabel: cc.Label
},
init: function(e, t) {
this.callback = e;
this.world = t;
var i = a.instance.getRepayDataByRank(n.instance.rankData.id);
this.goldCount = i && i.reward ? i.reward : 0;
this.goldLabel.string = this.goldCount;
},
onClose: function() {
this.node.active = !1;
this.callback && this.callback();
},
onReceiveBtnClick: function() {
var e = this;
n.instance.updateRepay();
n.instance.updateGold(e.goldCount);
n.instance.showGold -= e.goldCount;
var t = {
count: e.goldCount,
isMore: !0,
isLucky: !1
};
e.world.uiMgr.showGetMoneyEffect(t);
e.onClose();
},
showShare: function(e) {
o.share(s.GrowNode, e);
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
ConfigData: "ConfigData",
PlayerData: "PlayerData",
ShareMgr: "ShareMgr",
Tools: "Tools",
Types: "Types"
} ],
PanelReviveNotice: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "69c6fclhbFMpp3AKC8v1nvB", "PanelReviveNotice");
var n = e("UIUtil");
cc.Class({
extends: cc.Component,
properties: {
head: cc.Sprite,
nick: cc.Label,
isOpen: !1,
reviveLabel: cc.Label
},
onLoad: function() {
this.reviveLabel.string = "revive";
},
update: function(e) {
if (this._time > 0) {
this._time -= e;
this._time < 0 && this.close();
}
},
showReviveNotice: function(e) {
this.node.active = !0;
this.isOpen = !0;
n.loadResPortrait(this.head, e);
this.nick.string = e.name;
this._time = 2;
},
close: function() {
this.node.active = !1;
this.isOpen = !1;
}
});
cc._RF.pop();
}, {
UIUtil: "UIUtil"
} ],
PanelRevive: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "626a8mpPpVP0I06a2Mg6vnH", "PanelRevive");
var n = e("Tools"), a = e("ConfigData"), o = e("PlayerData"), s = e("ShareMgr"), r = e("Types").ShareType, c = e("AdvertMgr"), l = e("Types").AdverType, h = e("GameData"), d = e("Types").StageType, u = e("PlatformMgr");
cc.Class({
extends: cc.Component,
properties: {
timeLabel: cc.Label,
reviveBtn: cc.Node,
bornAndFrenzyIcon: cc.Node,
bornIcon: cc.Node,
adverIcon: cc.Node,
shareIcon: cc.Node,
baozouEffect: cc.Node,
textNode: cc.Node,
baozouAnim: cc.Animation
},
init: function(e, t, i) {
var n = this;
this.GSGame = i;
this.callback = e;
this.startUpdate = !0;
this.time = 5;
this.textNode.x = 0;
var s = a.instance.getCurStageByPrizeCount(o.instance);
this.GSGame.openPanelKeyCount(!0);
if (!u.isApp() && o.instance.lastRevieAdFail && a.instance.clientData.adverReviveFailToShare) {
h.instance.isShowLog() && console.log("上次复活视频观看失败，本次强制分享");
s = d.Share;
o.instance.lastRevieAdFail = !1;
}
switch (s) {
case d.Free:
this.adverIcon.active = !1;
this.shareIcon.active = !1;
this.textNode.x = -20;
break;

case d.Share:
this.adverIcon.active = !1;
this.shareIcon.active = !0;
break;

case d.Adver:
o.instance.lastRevieAdFail = !0;
var r = function(e) {
n.adverIcon.active = e;
n.shareIcon.active = !e;
e && c.instance.openAdver(l.Revive);
};
!u.isApp() && this.GSGame.panelTop.getComponent("PanelTop")._time < 20 ? r(!1) : c.instance.loadAdver(l.Revive, r);
}
this.bornAndFrenzyIcon.active = !0;
this.bornIcon.active = !1;
this.baozouEffect.active = !0;
this.baozouAnim.play().speed = .2;
},
onReviveFrenzyBtnClick: function() {
var e = this;
this.startUpdate = !1;
var t = this, i = function(i) {
if (i && t.callback) {
o.instance.lastRevieAdFail = !1;
t.callback && t.callback(!0, e.bornAndFrenzyIcon.active);
t.close();
} else t.startUpdate = !0;
};
this.shareIcon.active ? this.showShare(i) : this.adverIcon.active ? this.showAdver(i) : i(!0);
},
showAdver: function(e) {
var t = this;
c.instance.showAdver(l.Revive, e, function() {
t.showShare(e);
});
c.instance.fireBaseEvent("click_adv_btn", "position_id", a.instance.getAdvertUnitId(l.Revive));
},
showShare: function(e) {
var t = this;
s.share(r.Revive, e, function(e) {
var i = a.instance.clientData.shareFailTips, o = e ? a.instance.getUITipStr(1) : n.getRandomItem(i);
t.GSGame.showTips(o);
});
},
update: function(e) {
if (this.startUpdate) {
this.time -= e;
var t = Math.floor(this.time);
this.timeLabel.string !== t && (this.timeLabel.string = t);
if (this.time < 0) {
this.time = 5;
this.startUpdate = !1;
this.callback(!1);
this.close();
}
}
},
close: function() {
this.node.active = !1;
this.GSGame.openPanelKeyCount(!1);
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
ConfigData: "ConfigData",
GameData: "GameData",
PlatformMgr: "PlatformMgr",
PlayerData: "PlayerData",
ShareMgr: "ShareMgr",
Tools: "Tools",
Types: "Types"
} ],
PanelRewardDetail: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "47ab9kBe7VPZanXdmk8hVMg", "PanelRewardDetail");
var n = e("Tools"), a = (e("ConfigData"), e("PlayerData"));
e("AdvertMgr"), e("Types").AdverType, e("ShareMgr"), e("Types").ShareType, e("Types").TaskType, 
e("GameData"), e("PlatformMgr");
cc.Class({
extends: cc.Component,
properties: {
itemDetailPrefab: cc.Prefab,
itemScrollView: cc.ScrollView,
content: cc.Node,
tips: cc.Label
},
init: function() {
var e = a.instance.playerWorldRewardDetail;
if (e) {
this._itemScrollView = n.getOrAddComponent(this.itemScrollView, "MyScrollView");
this._itemScrollView.init(e.rewardInfo, {
itemPrefab: this.itemDetailPrefab,
className: "ItemRewardDetail",
startX: 0,
gapX: 15,
gapY: 10,
perLine: 1
});
}
},
closeNode: function() {
this.node.active = !1;
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
ConfigData: "ConfigData",
GameData: "GameData",
PlatformMgr: "PlatformMgr",
PlayerData: "PlayerData",
ShareMgr: "ShareMgr",
Tools: "Tools",
Types: "Types"
} ],
PanelReward: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "5629dI6NRFOM4jqdZJQmtzo", "PanelReward");
var n = e("AdvertMgr"), a = e("Types").AdverType, o = e("PlayerData"), s = e("PlatformMgr"), r = e("ConfigData"), c = e("ShareMgr"), l = e("Types").ShareType, h = (e("AddEntitySystem"), 
e("UIUtil")), d = e("Types").CustomFunnelEvent;
cc.Class({
extends: cc.Component,
properties: {
anim: cc.Animation,
iconSprite: cc.Sprite,
nameLabel: cc.Label,
adverBtn: cc.Node,
closeBtn: cc.Node,
reduceBtn: cc.Node,
normalRewardNode: cc.Node,
rankRewardNode: cc.Node,
heroRewardText: cc.Node,
knifeRewardText: cc.Node,
freeIcon: cc.Node,
shareIcon: cc.Node,
adverIcon: cc.Node,
normalNode: cc.Node,
specialNode: cc.Node,
freeIcon_2: cc.Node,
shareIcon_2: cc.Node,
adverIcon_2: cc.Node,
reduceBtn_2: cc.Node,
suitNode: cc.Node,
suitNameLabel: cc.Label,
suitOpenIcon: cc.Node,
suitHeroNameLabel: cc.Label,
suitKnifeNameLabel: cc.Label,
suitSkillLabel: cc.Label,
suitHeroFlag: cc.Node,
suitKnifeFlag: cc.Node,
suitActiveBtn: cc.Node,
noThanksLabel: cc.Label,
closeLabel: cc.Label,
shadowNode: cc.Node
},
init: function(e, t, i, s) {
this.data = e;
this.callback = t;
this.errCallback = i;
this.world = s;
this.nameLabel.string = e.name;
var c = -1 !== r.instance.heroSkinDatas.indexOf(e);
this.isHeroSkin = c;
this.isSpecial = 1 === e.taskBg;
if (this.isSpecial) for (var l = r.instance.getBigRankDatasIndex(e.taskParam) - 1, d = 0; d < this.shadowNode.children.length; d++) this.shadowNode.children[d].active = d === l;
var u = e.isGuideSkin;
this.specialNode.active = u;
this.normalNode.active = !u;
this.iconSprite.node.rotation = c ? 0 : 90;
this.iconSprite.node.rotation = this.isSpecial ? 45 : this.iconSprite.node.rotation;
this.iconSprite.node.scale = c ? 1 : 1.5;
this.normalRewardNode.active = !this.isSpecial;
this.rankRewardNode.active = !!this.isSpecial;
this.nameLabel.node.color = new cc.Color().fromHEX(this.isSpecial ? "#A24100" : "#ffffff");
this.heroRewardText.active = !!c;
this.knifeRewardText.active = !c;
this.freeIcon.x = 0 === e.unlockWay ? 0 : 33;
this.reduceBtn.active = 0 !== e.unlockWay;
this.shareIcon.active = 1 === e.unlockWay;
this.adverIcon.active = 2 === e.unlockWay;
this.stage = r.instance.getCurStageByPrizeCount(o.instance);
this.freeIcon_2.x = 0 === this.stage ? 0 : 33;
this.reduceBtn_2.active = 0 !== this.stage;
this.shareIcon_2.active = 1 === this.stage;
this.adverIcon_2.active = 2 === this.stage;
this.adverIcon.active && n.instance.openAdver(a.UnlockSkin);
h.loadResSprite(this.iconSprite, e.url);
this.noThanksLabel.string = "No,thanks";
this.closeLabel.string = "Close";
},
openSuitBtnClick: function() {
this.openSuitCallback && this.openSuitCallback();
this.closeBtnClick();
},
closeBtnClick: function() {
this.node.active = !1;
o.instance.isSecGame() && s.notifyFunnelEvent(d.NewHeroClose);
this.callback && (this.isSpecial ? this.callback(!1) : this.callback(!0));
n.instance.showBanner();
},
adverBtnClick: function() {
var e = this, t = function(t) {
if (t) {
e.node.active = !1;
o.instance.isSecGame() && s.notifyFunnelEvent(d.NewHeroClose);
e.callback && e.callback(!0);
}
}, i = this.data.unlockWay;
this.data.isGuideSkin && (i = this.stage);
switch (i) {
case 0:
t(!0);
break;

case 1:
this.showShare(t);
break;

case 2:
this.showAdver(t);
}
},
showAdver: function(e) {
var t = this;
n.instance.showAdver(a.UnlockSkin, e, function() {
t.showShare(e);
});
},
showShare: function(e) {
c.share(l.UnlockSkin, e);
},
onShareBtnClick: function() {
this.showShare();
}
});
cc._RF.pop();
}, {
AddEntitySystem: "AddEntitySystem",
AdvertMgr: "AdvertMgr",
ConfigData: "ConfigData",
PlatformMgr: "PlatformMgr",
PlayerData: "PlayerData",
ShareMgr: "ShareMgr",
Types: "Types",
UIUtil: "UIUtil"
} ],
PanelShop: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "c0f5d5HzatHkYVquqBNInUY", "PanelShop");
var n = e("PayMgr"), a = e("ConfigData"), o = e("PlatformMgr");
cc.Class({
extends: cc.Component,
properties: {
itemPrefab: cc.Node,
content: cc.Node,
waitNode: cc.Node,
iconSpriteFrames: [ cc.SpriteFrame ],
_itemNodes: [],
_isInit: !1,
_world: cc.Node,
_priceString: "",
callback: null
},
onLoad: function() {
var e = this;
setTimeout(function() {
e.setWaitNodeActive(!1);
}, 1e3);
this.setWaitNodeActive(!0);
n.instance.requestProductPrices(function(t) {
console.log("onLoad priceString=======" + t);
e._priceString = t;
e.setWaitNodeActive(!1);
});
},
init: function(e, t) {
this._world = e;
if (!this._isInit) {
this.initItems();
this._isInit = !0;
}
this.callback = t;
},
setWaitNodeActive: function(e) {
this.waitNode.active = e;
},
initItems: function() {
for (var e = a.instance.getShopDatas(), t = 0; t < e.length; t++) {
var i = e[t], n = cc.instantiate(this.itemPrefab);
n.parent = this.content;
n.active = !0;
var o = n.getComponent("ItemShopItem");
o.init(i, this._world);
i.iconIndex && this.iconSpriteFrames[i.iconIndex] && o.resetIcon(this.iconSpriteFrames[i.iconIndex]);
this._itemNodes.push(n);
}
this.resetPrices(this._priceString);
},
resetPrices: function(e) {
if (e && "" !== e) for (var t = o.isIosApp() ? "?" : "#", i = e.split(t), n = 0; n < this._itemNodes.length; n++) {
var a = this._itemNodes[n].getComponent("ItemShopItem");
if (n >= i.length) break;
a.resetPrice(i[n]);
}
},
close: function() {
this.node.active = !1;
if (this.callback) {
this.callback();
this.callback = null;
}
},
update: function(e) {
o.isIosApp() && !this.waitNode.active && n.instance.getIsPaying() && this.setWaitNodeActive(!0);
o.isIosApp() && this.waitNode.active && !n.instance.getIsPaying() && this.setWaitNodeActive(!1);
}
});
cc._RF.pop();
}, {
ConfigData: "ConfigData",
PayMgr: "PayMgr",
PlatformMgr: "PlatformMgr"
} ],
PanelSign: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "6c2d2OTFCxFC5sduV7NufWz", "PanelSign");
e("UIUtil");
var n = e("ConfigData"), a = e("PlayerData"), o = e("ShareMgr"), s = e("Types").ShareType, r = e("AdvertMgr"), c = e("Types").AdverType, l = (e("Tools"), 
e("BagItem")), h = e("Types").ItemType, d = e("Types").StageType;
cc.Class({
extends: cc.Component,
properties: {
goldNode: cc.Node,
skinNode: cc.Node,
closeNode: cc.Node,
itemSignPrefab: cc.Prefab,
itemParent: cc.Node,
shareIcon: cc.Node,
adverIcon: cc.Node,
goldShareIcon: cc.Node,
goldAdverIcon: cc.Node,
itemPool: [],
refuseSkinLabel: cc.Label,
refuseGoldLabel: cc.Label
},
init: function(e, t) {
var i = this;
this.world = e;
this.callback = t;
var o = a.instance.signCount, s = a.instance.daySign, u = n.instance.signDatas;
o >= 7 && (u = n.instance.lateSignDatas);
for (var f = 0; f < 7; f++) {
var p = u[f], m = this.itemPool[f];
if (!m) {
m = cc.instantiate(this.itemSignPrefab);
this.itemPool[f] = m;
}
m.parent = this.itemParent;
m.x = f % 3 * 235;
m.y = -240 * Math.floor(f / 3);
6 === f && (m.position = cc.v2(235, -480));
var g = o % 7 > f || o % 7 === f && s, y = l.createItemWithString(p.reward);
switch (y.type) {
case h.HERO_SKIN:
g = a.instance.isOwnHeroSkin(y.id);
break;

case h.KNIFE_SKIN:
g = a.instance.isOwnKnifeSkin(y.id);
}
var v = m.getComponent("ItemSign"), k = !1;
if (o % 7 === f) if (g) {
this.checkItem = null;
a.instance.daySign = !0;
} else {
this.checkItem = v;
k = !0;
}
v.init(p, y, f);
v.refresh(g, k);
}
r.instance.fireBaseEvent("page_show_login_reward");
if (this.checkItem) {
var C = this.checkItem.item.type === h.MONEY;
this.goldNode.active = C;
this.skinNode.active = !C;
this.stage = n.instance.getCurStageByPrizeCount(a.instance);
var S = function(e) {
i.adverIcon.active = e;
i.shareIcon.active = !e;
i.goldAdverIcon.active = e;
i.goldShareIcon.active = !e;
e && r.instance.openAdver(c.Sign);
};
switch (this.stage) {
case d.Free:
break;

case d.Share:
S(!1);
break;

case d.Adver:
r.instance.loadAdver(c.Sign, S);
}
} else {
this.goldNode.active = !1;
this.skinNode.active = !1;
}
this.refuseSkinLabel.string = "No,thanks";
this.refuseGoldLabel.string = "Get";
},
onGetSkinBtnClick: function() {
var e = this, t = e.checkItem, i = t.item.id, o = function(o) {
if (o) {
switch (t.item.type) {
case h.HERO_SKIN:
a.instance.addHeroSkin(i);
var s = n.instance.getHeroSkinById(i);
e.world.onEquipHeroSkin(s, !0);
e.world.uiMgr.showReward(s);
break;

case h.KNIFE_SKIN:
a.instance.addKnifeSkin(i);
s = n.instance.getKnifeSkinById(i);
e.world.onEquipKnifeSkin(s, !0);
e.world.uiMgr.showReward(s);
}
e.onReceive();
}
};
this.shareIcon.active ? this.showShare(o) : this.adverIcon.active ? this.showAdver(o) : o(!0);
},
showAdver: function(e) {
var t = this;
r.instance.fireBaseEvent("click_adv_btn", "position_id", n.instance.getAdvertUnitId(c.Sign));
r.instance.showAdver(c.Sign, e, function() {
t.showShare(e);
});
},
showShare: function(e) {
o.share(s.Sign, e);
},
onReduceSkinBtnClick: function() {
this.close();
this.callback && this.callback();
},
close: function() {
this.node.active = !1;
this.world.uiMgr.activeGoldNode(!0);
this.world.uiMgr.activeDiamondNode(!0);
},
onMultipGoldBtnClick: function() {
var e = this, t = e.checkItem.item, i = function(i) {
if (i) {
var n = 3 * t.num;
a.instance.updateGold(n);
a.instance.showGold -= n;
var o = {
count: n,
isMore: !0,
isLucky: !1
};
e.world.uiMgr.showGetMoneyEffect(o);
e.onReceive();
}
};
this.goldShareIcon.active ? this.showShare(i) : this.goldAdverIcon.active ? this.showAdver(i) : i(!0);
},
onNormalGoldBtnClick: function() {
var e = this.checkItem.item.num;
a.instance.updateGold(e);
a.instance.showGold -= e;
var t = {
count: e,
isMore: !1,
isLucky: !1
};
this.world.uiMgr.showGetMoneyEffect(t);
this.onReceive();
},
onReceive: function() {
a.instance.updateSignCount();
this.checkItem.refresh(!0, !1);
this.world.uiMgr.refreshRedDot();
this.close();
this.callback && this.callback();
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
BagItem: "BagItem",
ConfigData: "ConfigData",
PlayerData: "PlayerData",
ShareMgr: "ShareMgr",
Tools: "Tools",
Types: "Types",
UIUtil: "UIUtil"
} ],
PanelSubscribeReward: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "282c49ErtxLApObZ7Cmr+XI", "PanelSubscribeReward");
var n = e("ConfigData"), a = e("PlayerData"), o = e("Tools");
cc.Class({
extends: cc.Component,
properties: {},
init: function(e, t) {
this.world = e;
this.callback = t;
a.instance.updateZongZi(10);
a.instance.updateDaySubscribeReward();
},
onClose: function() {
this.node.active = !1;
this.world.uiMgr.showTips(o.getStringByFormat(n.instance.getUITipStr(15), 10));
this.callback && this.callback();
},
update: function(e) {}
});
cc._RF.pop();
}, {
ConfigData: "ConfigData",
PlayerData: "PlayerData",
Tools: "Tools"
} ],
PanelSubscribe: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "25cceoE1sBAa5YGSnMXFRba", "PanelSubscribe");
e("ConfigData");
var n = e("PlayerData");
e("Tools");
cc.Class({
extends: cc.Component,
properties: {
topBg: cc.Node,
bottomBg: cc.Node
},
init: function(e, t) {
this.world = e;
this.callback = t;
},
onSubscribe: function() {
n.instance.updateSubscribeTime();
this.onClose();
},
onClose: function() {
this.node.active = !1;
this.callback && this.callback();
}
});
cc._RF.pop();
}, {
ConfigData: "ConfigData",
PlayerData: "PlayerData",
Tools: "Tools"
} ],
PanelTaskNotice: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "a8ca6NUn6xOeqDmjdV1BccV", "PanelTaskNotice");
var n = e("Types").ItemType, a = e("UIUtil"), o = e("ConfigData");
e("AddEntitySystem");
cc.Class({
extends: cc.Component,
properties: {
taskLabel: cc.Label,
taskIcon: cc.Sprite
},
init: function(e, t) {
var i = {};
if (e.rewardType === n.HERO_SKIN) {
i = o.instance.getHeroSkinById(e.rewardId);
this.taskIcon.node.scale = .5;
a.loadResSprite(this.taskIcon, i.url);
} else {
i = o.instance.getKnifeSkinById(e.rewardId);
this.taskIcon.node.scale = 1;
a.loadResSprite(this.taskIcon, i.url);
}
this.taskLabel.string = i.name;
this.callback = t;
}
});
cc._RF.pop();
}, {
AddEntitySystem: "AddEntitySystem",
ConfigData: "ConfigData",
Types: "Types",
UIUtil: "UIUtil"
} ],
PanelTips: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "bd727o7MNpN7Y4yMYaL2a6r", "PanelTips");
var n = e("GameData"), a = e("ConfigData");
cc.Class({
extends: cc.Component,
properties: {
anim: cc.Animation,
bgNode: cc.Node,
tipsLabel: cc.Label,
isShow: !1
},
onLoad: function() {
this.bgNode.width = n.instance.isPad() ? 370 : 520;
this.tipsLabel.node.width = n.instance.isPad() ? 270 : 420;
},
init: function(e) {
var t = this;
if (!this.isShow) {
this.node.active = !0;
this.isShow = !0;
if (Number(e)) {
var i = a.instance.getUITipStr(e);
this.tipsLabel.string = i;
} else this.tipsLabel.string = e;
this.anim.once("finished", function() {
t.isShow = !1;
}, this);
this.anim.play();
}
}
});
cc._RF.pop();
}, {
ConfigData: "ConfigData",
GameData: "GameData"
} ],
PanelTop: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "52bb1YxP3RN5af6vUcn+6aF", "PanelTop");
var n;
function a(e, t, i) {
t in e ? Object.defineProperty(e, t, {
value: i,
enumerable: !0,
configurable: !0,
writable: !0
}) : e[t] = i;
return e;
}
var o = e("UIUtil"), s = e("GameData");
cc.Class({
extends: cc.Component,
properties: (n = {
rankGrid: cc.Node,
playerRankItemPrebfab: cc.Prefab,
rankNameGrid: cc.Node,
timeLabel: cc.Label,
_time: -1,
killNode: cc.Node,
killNameNode: cc.Node,
killMyName: cc.Label,
killOtherName: cc.Label,
killNoticeNode: cc.Node
}, a(n, "killMyName", cc.Label), a(n, "killIconNode", cc.Node), a(n, "killMyIcon", cc.Sprite), 
a(n, "killOtherIcon", cc.Sprite), a(n, "reviveNoticeNode", cc.Node), n),
onLoad: function() {
this.killNode.getComponent("KillMsg").init(this.killNameNode, this.killMyName, this.killOtherName, this.killIconNode, this.killMyIcon, this.killOtherIcon);
},
startLoadPrefab: function() {
var e = this;
this.killNoticeNode || o.loadUIPrefab("prefab/ui/gsgame/PanelKillNotice", function(t) {
if (t) {
e.killNoticeNode = t;
e.killNoticeNode.parent = e.node.parent;
e.killNoticeNode.y = s.instance.isPad() ? 280 : 239;
s.instance.logUseTime("killNoticeNode prefab loaded");
}
});
},
cleanUp: function() {
this.rankGrid.destroyAllChildren();
this.rankNameGrid.destroyAllChildren();
if (this.killNoticeNode) {
this.killNoticeNode.active = !0;
this.killNoticeNode.getComponent("KillNotice").cleanUp();
}
this.killNode.getComponent("KillMsg").cleanUp();
},
addPlayerRankItem: function(e) {
var t = cc.instantiate(this.playerRankItemPrebfab), i = t.getComponent("PlayerRankItem");
t.parent = this.rankGrid;
i.init(e);
i.playerName.node.parent = this.rankNameGrid;
},
startCountDown: function(e) {
this._time = e;
},
update: function(e) {
if (this._time > 0) {
this._time -= e;
var t = this._time, i = Math.floor(t % 60), n = "0" + Math.floor(t / 60) + ":" + (i > 9 ? i : "0" + i);
t < 0 && (n = "00:00");
this.timeLabel.string !== n && (this.timeLabel.string = n);
}
},
showKillMsg: function(e, t) {
this.closeReviveNotice();
this.killNode.getComponent("KillMsg").showKillMsg(e, t);
},
showKillNotice: function(e) {
this.killNoticeNode && this.killNoticeNode.getComponent("KillNotice").showKillNotice(e);
},
showReviveNotice: function(e) {
this.killNode.getComponent("KillMsg").isOpen || this.reviveNoticeNode.getComponent("PanelReviveNotice").showReviveNotice(e);
},
closeReviveNotice: function() {
var e = this.reviveNoticeNode.getComponent("PanelReviveNotice");
e.isOpen && e.close();
},
anyPanelOpen: function() {
return this.killNode.getComponent("KillMsg").isOpen || this.reviveNoticeNode.getComponent("PanelReviveNotice").isOpen;
}
});
cc._RF.pop();
}, {
GameData: "GameData",
UIUtil: "UIUtil"
} ],
PanelTreasureBox: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "2d713+l3IBOsoeDBdaSMHFF", "PanelTreasureBox");
var n = e("UIUtil"), a = e("ConfigData"), o = e("PlayerData"), s = e("GameData"), r = (e("Types").ShareType, 
e("AdvertMgr")), c = e("Types").AdverType, l = e("Tools"), h = e("BagItem"), d = e("Types").ItemType;
e("Types").StageType;
cc.Class({
extends: cc.Component,
properties: {
bgNode: cc.Node,
getKey: cc.Node,
keyNode: cc.Node,
keyPanel: cc.Node,
keyParent: cc.Node,
boxNode: cc.Node,
boxPrefab: cc.Prefab,
boxParent: cc.Node,
otherKeyParent: cc.Node,
bestRewardAnimation: cc.Animation,
bestRewardSprite: cc.Sprite,
bestRewardDiamond: cc.Node,
adverBtn: cc.Node,
closeBtn: cc.Node,
adverBtnAnim: cc.Animation
},
init: function(e) {
this.world = e;
this.keyCount = 3;
this.turn = this.refreshTurn();
var t = a.instance.getTreasureBigDataByTurn(this.turn);
this.bestReward = t.reward;
this.getTimes = t.times;
o.instance.clearKeyCount();
this.hasGetBest = !1;
this.unlockBoxCount = 0;
this.keyPanel.active = !1;
this.boxNode.active = !0;
this.closeBtn.active = !1;
this.getKey.active = !0;
this.getKey.rotation = 0;
this.getKey.scale = 1;
this.getKey.position = cc.v2(0, 0);
for (var i = this.keyParent.children, r = 0; r < i.length; r++) i[r].active = r + 1 < this.keyCount;
this.initKey();
this.initBox();
var c = h.createItemWithString(this.bestReward);
this.bestRewardDiamond.active = c.type === d.ZONG_ZI;
this.bestRewardSprite.node.active = !this.bestRewardDiamond.active;
this.bestRewardSprite.node.active && n.loadResSprite(this.bestRewardSprite, c.itemData.url);
this.playRewardAnim();
this.bgNode.height = s.instance.screenHeight;
this.boxNode.scale = s.instance.isPad() ? .8 : 1;
},
playRewardAnim: function() {
this.bestRewardAnimation.play();
},
refreshTurn: function() {
for (var e = o.instance.treasureTurn, t = a.instance.treasureBigData, i = e; i < t.length; i++) {
var n = h.createItemWithString(t[i].reward), s = !1;
switch (n.type) {
case d.HERO_SKIN:
o.instance.isOwnHeroSkin(n.id) && o.instance.updateTreasureTurn();
break;

case d.KNIFE_SKIN:
o.instance.isOwnKnifeSkin(n.id) && o.instance.updateTreasureTurn();
break;

default:
s = !0;
}
if (s) break;
}
return o.instance.treasureTurn;
},
initKey: function(e) {
for (var t = this, i = 0; i < this.otherKeyParent.children.length; i++) if (e) {
this.stopUse = !0;
i < this.keyCount && function() {
var e = t.otherKeyParent.children[i];
e.scale = 1.8;
setTimeout(function() {
e.active = !0;
e.runAction(cc.scaleTo(.3, 1).easing(cc.easeBackInOut(3)));
}, 200 * i);
}();
setTimeout(function() {
t.stopUse = !1;
}, 900);
} else this.otherKeyParent.children[i].active = i < this.keyCount;
this.adverBtn.active = !1;
this.keyNode.active = !0;
this.closeBtn.active = !1;
},
initBox: function() {
for (var e = 0; e < 3; e++) for (var t = 0; t < 3; t++) {
if (!(i = this.boxParent.children[3 * e + t])) {
var i;
(i = cc.instantiate(this.boxPrefab)).parent = this.boxParent;
i.position = cc.v2(220 * e, -220 * t);
}
var n = i.getComponent("ItemTreasureBox");
n.init();
n.setOnItemClick(this, n);
}
},
onItemClick: function(e, t) {
this.stopUse || (this.keyCount > 0 ? t.hasGet || this.useKey(t) : this.adverBtnAnim.play("ani-btn-dance"));
},
useKey: function(e) {
var t = this, i = this.keyCount - 1, n = this.otherKeyParent.children[i];
this.keyCount--;
e.hasGet = !0;
var a = cc.v2(n.x, n.y);
n.runAction(cc.sequence(cc.moveTo(.5, e.node.position), cc.callFunc(function() {
n.active = !1;
n.position = a;
var o = t.getReward(), s = h.createItemWithString(o);
e.getReward(s);
setTimeout(function() {
t.world.getReward(s);
}, 800);
0 === i && (9 === t.unlockBoxCount ? setTimeout(function() {
t.close();
}, 2e3) : setTimeout(function() {
t.showAdverBtn();
}, 1e3));
})));
},
showAdverBtn: function() {
var e = this;
this.keyNode.active = !1;
this.adverBtn.active = !0;
setTimeout(function() {
e.closeBtn.active = !0;
}, 1e3);
this.adverBtnAnim.play("ani-btn-active");
r.instance.loadAdver(c.TreasurBox, function(e) {
e && r.instance.openAdver(c.TreasurBox);
});
},
getReward: function() {
this.unlockBoxCount++;
if (this.hasGetBest) return this.getSmallReward();
if (this.getTimes) {
if (this.isInTimes()) {
var e = this.unlockBoxCount - 3 * (this.getTimes - 1) == 3 ? 1 : 0;
return Math.random() < e ? this.getBigReward() : this.getSmallReward();
}
return this.getSmallReward();
}
e = this.unlockBoxCount / 9;
return Math.random() < e ? this.getBigReward() : this.getSmallReward();
},
getSmallReward: function() {
var e = l.getRandomItemByWeight(a.instance.treasureSmallData), t = e.type === d.ZONG_ZI ? 1 : 1 + o.instance.rankData.goldMultiRate;
return e.type + ",0," + Math.ceil(l.getRandomInt(e.range[0], e.range[1]) * t);
},
getBigReward: function() {
this.hasGetBest = !0;
o.instance.updateTreasureTurn();
return this.bestReward;
},
isInTimes: function() {
return this.unlockBoxCount > 3 * (this.getTimes - 1) && this.unlockBoxCount <= 3 * this.getTimes;
},
onAdverBtnClick: function() {
var e = this;
r.instance.fireBaseEvent("click_adv_btn", "position_id", a.instance.getAdvertUnitId(c.TreasurBox));
r.instance.showAdver(c.TreasurBox, function(t) {
if (t) {
e.keyCount = 3;
e.initKey(!0);
}
});
},
playKeyAnim: function() {
var e = this, t = cc.v2(100 * this.keyCount - 200, 110);
this.getKey.runAction(cc.sequence(cc.scaleTo(.5, 2), cc.callFunc(function() {
e.keyPanel.active = !0;
}), cc.spawn(cc.moveTo(.5, t), cc.scaleTo(.5, .5), cc.rotateTo(.5, -30)), cc.callFunc(function() {
e.keyParent.children[e.keyCount - 1].active = !0;
e.getKey.active = !1;
})));
},
okBtnClick: function() {
if (3 === this.keyCount) {
this.boxNode.active = !0;
o.instance.clearKeyCount();
} else this.close();
},
close: function() {
this.node.active = !1;
this.world.uiMgr.openPanelKeyCount(!0);
},
update: function(e) {}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
BagItem: "BagItem",
ConfigData: "ConfigData",
GameData: "GameData",
PlayerData: "PlayerData",
Tools: "Tools",
Types: "Types",
UIUtil: "UIUtil"
} ],
PanelTryFrenzy: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "c66dc9GmJdP9L2hOkFVKMag", "PanelTryFrenzy");
e("Tools");
var n = e("ConfigData"), a = e("PlayerData"), o = e("AdvertMgr"), s = e("Types").AdverType, r = e("ShareMgr"), c = e("Types").ShareType, l = e("Types").StageType;
cc.Class({
extends: cc.Component,
properties: {
adverIcon: cc.Node,
shareIcon: cc.Node
},
init: function(e) {
var t = this;
this.closeCallback = e;
switch (n.instance.getCurStageByPrizeCount(a.instance)) {
case l.Free:
this.adverIcon.active = !1;
this.shareIcon.active = !1;
break;

case l.Share:
this.adverIcon.active = !1;
this.shareIcon.active = !0;
break;

case l.Adver:
o.instance.loadAdver(s.TryOutSkin, function(e) {
t.adverIcon.active = e;
t.shareIcon.active = !e;
e && o.instance.openAdver(s.TryOutSkin);
});
}
},
closeBtnClick: function() {
if (!this.isAdver) {
this.closeCallback && this.closeCallback(!1);
this.node.active = !1;
}
},
adverBtnClick: function() {
this.isAdver = !0;
var e = this;
if (this.shareIcon.active) {
e.showShare();
e.isAdver = !1;
} else o.instance.showAdver(s.TryOutSkin, function(t) {
if (t) {
e.closeCallback && e.closeCallback(!0);
e.node.active = !1;
}
e.isAdver = !1;
}, function() {
e.showShare();
e.isAdver = !1;
});
},
showShare: function() {
var e = this;
r.share(c.TryOutSkin, function(t) {
if (t) {
e.closeCallback && e.closeCallback(!0);
e.node.active = !1;
}
});
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
ConfigData: "ConfigData",
PlayerData: "PlayerData",
ShareMgr: "ShareMgr",
Tools: "Tools",
Types: "Types"
} ],
PanelTryOut: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "ed730E8o0tG14wQiW95pHMD", "PanelTryOut");
var n = e("Tools"), a = e("ConfigData"), o = e("PlayerData"), s = e("AdvertMgr"), r = e("Types").AdverType, c = e("ShareMgr"), l = e("Types").ShareType, h = e("Types").StageType;
cc.Class({
extends: cc.Component,
properties: {
tryHeroSkinIcon: cc.Node,
tryKnifeSkinIcon: cc.Node,
nameLabel: cc.Label,
goldNode: cc.Node,
diamondNode: cc.Node,
priceLabel: cc.RichText,
priceDiamondLabel: cc.RichText,
knifeCountNode: cc.Node,
propertyNode: cc.Node,
knifePropertyIcon: cc.Node,
heroPropertyIcon: cc.Node,
propertyLabel: cc.RichText,
adverIcon: cc.Node,
shareIcon: cc.Node,
noThanksLabel: cc.Label
},
init: function(e, t, i) {
var c = this;
t && t();
var l = n.arrContains(a.instance.heroSkinDatas, e);
this.tryHeroSkinIcon.active = l;
this.tryKnifeSkinIcon.active = !l;
this.closeCallback = i;
this.nameLabel.string = e.name;
e.price && (0 === e.priceType ? this.priceLabel.string = "<i>" + e.price + "</i> " : this.priceDiamondLabel.string = "<i>" + e.price + "</i> ");
this.goldNode.active = 0 === e.priceType;
this.diamondNode.active = 1 === e.priceType;
var d = e.price + "";
this.priceLabel.fontSize = 42 - 6 * (d.length - 5);
this.priceLabel.fontSize < 20 && (this.priceLabel.fontSize = 20);
this.propertyNode.active = !!e.propertyTips;
this.knifePropertyIcon.active = !l;
this.heroPropertyIcon.active = !!l;
this.propertyLabel.string = e.propertyTips ? "<i>" + e.propertyTips + "</i> " : "";
this.knifeCountNode.x = this.propertyNode.active ? 0 : 78;
switch (a.instance.getCurStageByPrizeCount(o.instance)) {
case h.Free:
break;

case h.Share:
this.adverIcon.active = !1;
this.shareIcon.active = !0;
break;

case h.Adver:
s.instance.loadAdver(r.TryOutSkin, function(e) {
c.adverIcon.active = e;
c.shareIcon.active = !e;
e && s.instance.openAdver(r.TryOutSkin);
});
}
this.noThanksLabel.string = "No,thanks";
},
closeBtnClick: function() {
if (!this.isAdver) {
this.closeCallback && this.closeCallback(!1);
this.node.active = !1;
}
},
adverBtnClick: function() {
this.isAdver = !0;
var e = this;
if (this.shareIcon.active) {
e.showShare();
e.isAdver = !1;
} else s.instance.showAdver(r.TryOutSkin, function(t) {
if (t) {
e.closeCallback && e.closeCallback(!0);
e.node.active = !1;
}
e.isAdver = !1;
}, function() {
e.showShare();
e.isAdver = !1;
});
},
showShare: function() {
var e = this;
c.share(l.TryOutSkin, function(t) {
if (t) {
e.closeCallback && e.closeCallback(!0);
e.node.active = !1;
}
});
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
ConfigData: "ConfigData",
PlayerData: "PlayerData",
ShareMgr: "ShareMgr",
Tools: "Tools",
Types: "Types"
} ],
PanelTrySuit: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "afeecOrfGVMfbOdQsj41k5o", "PanelTrySuit");
e("Tools");
var n = e("ConfigData"), a = e("PlayerData"), o = e("AdvertMgr"), s = e("Types").AdverType, r = e("ShareMgr"), c = e("Types").ShareType, l = e("Types").StageType;
cc.Class({
extends: cc.Component,
properties: {
suitNameLabel: cc.Label,
suitHeroNameLabel: cc.Label,
suitKnifeNameLabel: cc.Label,
suitSkillLabel: cc.Label,
adverIcon: cc.Node,
shareIcon: cc.Node,
suitIntroduce: cc.Node,
noThanksLabel: cc.Label
},
init: function(e, t, i) {
var r = this, c = n.instance.getHeroSkinById(e.heroSkin), h = n.instance.getKnifeSkinById(e.knifeSkin);
t && t(c, h);
this.closeCallback = i;
a.instance.isOwnHeroSkin(c.id), a.instance.isOwnKnifeSkin(h.id);
this.suitNameLabel.string = e.name;
this.suitHeroNameLabel.string = c.name;
this.suitKnifeNameLabel.string = h.name;
this.suitSkillLabel.string = e.skillTips;
for (var d = this.suitIntroduce.children, u = 0; u < d.length; u++) d[u].active = u + 1 === e.id;
switch (n.instance.getCurStageByPrizeCount(a.instance)) {
case l.Free:
break;

case l.Share:
this.adverIcon.active = !1;
this.shareIcon.active = !0;
break;

case l.Adver:
o.instance.loadAdver(s.TryOutSkin, function(e) {
r.adverIcon.active = e;
r.shareIcon.active = !e;
e && o.instance.openAdver(s.TryOutSkin);
});
}
this.noThanksLabel.string = "No,thanks";
},
closeBtnClick: function() {
if (!this.isAdver) {
this.closeCallback && this.closeCallback(!1);
this.node.active = !1;
}
},
adverBtnClick: function() {
this.isAdver = !0;
var e = this;
if (this.shareIcon.active) {
e.showShare();
e.isAdver = !1;
} else o.instance.showAdver(s.TryOutSkin, function(t) {
if (t) {
e.closeCallback && e.closeCallback(!0);
e.node.active = !1;
}
e.isAdver = !1;
}, function() {
e.showShare();
e.isAdver = !1;
});
},
showShare: function() {
var e = this;
r.share(c.TryOutSkin, function(t) {
if (t) {
e.closeCallback && e.closeCallback(!0);
e.node.active = !1;
}
});
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
ConfigData: "ConfigData",
PlayerData: "PlayerData",
ShareMgr: "ShareMgr",
Tools: "Tools",
Types: "Types"
} ],
PanelWorldReward: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "ed5b5z/H7tK84dqkHpJShii", "PanelWorldReward");
var n = e("ConfigData"), a = e("BagItem"), o = e("Types").ItemType, s = e("PlayerData"), r = e("GameData"), c = [ 50, 100, 200, 500 ];
cc.Class({
extends: cc.Component,
properties: {
rankLabel: cc.Label,
tipsText: cc.RichText,
diamondLabel: cc.Label,
goldLabel: cc.Label,
receiveBtn: cc.Node,
detailBtn: cc.Node,
realNode: cc.Node,
unRealNode: cc.Node,
heroNode: cc.Node,
cardNode: cc.Node,
cardLabel: cc.Label,
heroLabel: cc.Label
},
init: function(e, t, i) {
this.callback = t;
this.world = i;
this.rankData = e;
var l = e.rank, h = e.round, d = e.joinTime, u = n.instance.getWorldRewardByRank(l);
r.instance.isShowLog() && console.log("--------------------------刷新世界排名奖励：", d, "轮次:", h, "名次:", l);
if (-1 === l || s.instance.hasReceiveWorldRound(d) || !u) this.close(!1); else {
this.rankLabel.string = "世界第" + l + "名";
this.tipsText.string = "恭喜你取得世界PK（第" + h + "轮）</color=##EEE50E>第" + l + "名";
this.realNode.active = !1;
this.unRealNode.active = !1;
this.heroNode.active = !1;
this.receiveBtn.active = !0;
this.detailBtn.active = !1;
this.items = a.createItemsWithString(u.reward);
for (var f = 0; f < this.items.length; f++) {
var p = this.items[f];
switch (p.type) {
case o.MONEY:
this.unRealNode.active = !0;
this.goldNum = p.num;
this.goldLabel.string = "x" + this.goldNum;
break;

case o.ZONG_ZI:
this.unRealNode.active = !0;
this.diamondNum = p.num;
this.diamondLabel.string = "钻石x" + this.diamondNum;
break;

case o.CARD:
this.realNode.active = !0;
this.detailBtn.active = !0;
this.receiveBtn.active = !1;
for (var m = this.cardNode.children, g = 0; g < m.length; g++) m[g].active = p.num === c[g];
this.cardLabel.string = u.tips;
break;

case o.HERO_SKIN:
this.heroNode.active = !0;
this.heroLabel.string = u.tips;
}
}
}
},
showPanelRewardDetail: function() {
this.world.uiMgr.showPanelRewardDetail();
},
close: function() {
if (!(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0]) {
for (var e = 0; e < this.items.length; e++) {
var t = this.items[e];
switch (t.type) {
case o.MONEY:
s.instance.updateGold(t.num);
s.instance.showGold -= t.num;
var i = {
count: t.num,
isMore: !0,
isLucky: !1
};
this.world.uiMgr.showGetMoneyEffect(i);
break;

case o.ZONG_ZI:
s.instance.updateZongZi(t.num);
this.world.uiMgr.showTips(Tools.getStringByFormat(n.instance.getUITipStr(15), t.num));
break;

case o.HERO_SKIN:
s.instance.isOwnHeroSkin(t.id) ? this.isConvert = !0 : s.instance.addHeroSkin(t.id);
this.world.onEquipHeroSkin(t.itemData, !0);
break;

case o.KNIFE_SKIN:
s.instance.isOwnKnifeSkin(t.id) ? this.isConvert = !0 : s.instance.addKnifeSkin(t.id);
this.world.onEquipKnifeSkin(t.itemData, !0);
}
}
if (this.isConvert) {
this.world.uiMgr.showTips("已拥有哪吒套装，自动转化为150钻石");
s.instance.updateZongZi(150);
}
s.instance.updateReceiveRound(this.rankData.joinTime, !1);
}
s.instance.updateDayRefreshWorldReward();
this.node.active = !1;
this.callback && this.callback();
}
});
cc._RF.pop();
}, {
BagItem: "BagItem",
ConfigData: "ConfigData",
GameData: "GameData",
PlayerData: "PlayerData",
Types: "Types"
} ],
PayMgr: [ function(e, t, i) {
(function(i) {
"use strict";
cc._RF.push(t, "cc231dTte1AKaCf792v+oQt", "PayMgr");
var n;
function a(e, t, i) {
t in e ? Object.defineProperty(e, t, {
value: i,
enumerable: !0,
configurable: !0,
writable: !0
}) : e[t] = i;
return e;
}
var o = e("Types").PlatformType, s = e("PlatformMgr"), r = e("PlayerData"), c = e("ConfigData"), l = cc.Class({
statics: (n = {
instance: null,
init: function() {
if (null === l.instance) {
l.instance = new l();
l.instance.init();
}
("undefined" == typeof window ? i : window).PayMgr = l;
},
cleanUp: function() {
l.instance = null;
},
_closeCallback: null,
_errCallback: null
}, a(n, "_errCallback", null), a(n, "_queryProductsCallback", null), a(n, "_restoreCallback", null), 
a(n, "_priceString", ""), a(n, "_isSupportPurchase", !0), a(n, "normalPayCallBack", function(e) {
if (e) {
l._closeCallback(!0);
setTimeout(function() {
s.hawkeye_report_purchase(l._price, l._payIndex);
}, 200);
} else l._closeCallback(!1);
}), a(n, "errorPayCallBack", function() {
console.log("errorPayCallBack=================");
l._isSupportPurchase = !1;
l._errCallback && l._errCallback();
}), a(n, "queryProductsCallBack", function(e) {
l._priceString = e;
l._queryProductsCallback && l._queryProductsCallback(e);
}), a(n, "restoreCallBack", function(e) {
if (e) {
r.instance.updateVipWithoutInterstitial();
l._restoreCallback && l._restoreCallback();
}
}), n),
properties: {
_isPaying: !1
},
init: function() {},
setIsPaying: function(e) {
this._isPaying = e;
},
getIsPaying: function() {
return this._isPaying;
},
setUiMgr: function(e) {
this.uiMgr = e;
},
requestProductPrices: function(e) {
l._queryProductsCallback = e;
if ("" != l._priceString && e) e(l._priceString); else switch (s.platformType) {
case o.WECHAT:
break;

case o.IOS:
jsb.reflection.callStaticMethod("IAPHelper", "requestProducts");
break;

case o.ANDROID:
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/activity/IABManager", "requestProducts", "()V");
break;

default:
l._queryProductsCallback("price#PHP 105.00#PHP 410.00#PHP 775.00#PHP 1,550.00#PHP 2,850.00");
}
},
restoreProducts: function(e) {
l._restoreCallback = e;
s.platformType === o.IOS && jsb.reflection.callStaticMethod("IAPHelper", "restoreCompletedTransactions");
},
payByIndex: function(e, t, i) {
var n = function(e) {
setTimeout(function() {
performance && performance.now && (cc.director._lastUpdate = performance.now());
t(e);
}, 100);
};
l._closeCallback = n;
l._errCallback = i;
l._payIndex = e;
l._price = c.instance.getShopDataPriceByIndex(e);
if (l._isSupportPurchase) switch (s.platformType) {
case o.WECHAT:
break;

case o.IOS:
jsb.reflection.callStaticMethod("IAPHelper", "buyProductByPayIndex:", e);
break;

case o.ANDROID:
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/activity/IABManager", "buyProductByPayIndex", "(I)V", e);
break;

default:
n(!0);
} else i && i();
}
});
cc._RF.pop();
}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
ConfigData: "ConfigData",
PlatformMgr: "PlatformMgr",
PlayerData: "PlayerData",
Types: "Types"
} ],
PickBuffCollisionHandleSystem: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "348d6+2sfdKkKYvtDOm4HVO", "PickBuffCollisionHandleSystem");
var n = e("BaseCollisionHandleSystem");
cc.Class({
extends: n,
properties: {
_eventListName: {
default: "_pickBuffCollisionEvent",
override: !0
}
},
handelCollisionEvent: function(e) {
var t = e[0];
e[1].node.emit("emitEvent", [ "onPickUpBuff", t ]);
},
updateGameLogic: function(e) {
this._super(e);
this._collisionEventMgr.clearPickBuffEvent();
}
});
cc._RF.pop();
}, {
BaseCollisionHandleSystem: "BaseCollisionHandleSystem"
} ],
PickKnifeCollisionHandleSystem: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "e242dSpscpIBrCdiRJrll0h", "PickKnifeCollisionHandleSystem");
var n = e("BaseCollisionHandleSystem");
cc.Class({
extends: n,
properties: {
_eventListName: {
default: "_pickKnifeCollisionEvent",
override: !0
}
},
handelCollisionEvent: function(e) {
var t = e[0], i = e[1];
if (0 !== t.tag && 0 === i.tag) switch (t.node.group) {
case "knife":
case "hero":
i.node.emit("emitEvent", [ "onPickUpKnife", t ]);
}
},
updateGameLogic: function(e) {
this._super(e);
this._collisionEventMgr.clearPickKnifeEvent();
}
});
cc._RF.pop();
}, {
BaseCollisionHandleSystem: "BaseCollisionHandleSystem"
} ],
PlatformMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "c2befB4tAlK8IPPtk95wTNG", "PlatformMgr");
var n = e("Types").PlatformType, a = e("Types").ChannelType, o = e("Tools"), s = e("GameData"), r = e("Types").OpenDataMsgType, c = e("Types").CustomFunnelEvent, l = e("mta_analysis"), h = e("Types").OSType, d = cc.Class({
statics: {
eolinkerApp: "knife666",
k6_app: "knife666",
k6_baseUrl: "https://knife666.boomegg.cn/",
k6_baseUrl_test: "https://k6-front.drwho.mobi:14010/",
hawkeye_baseUrl: "https://report.drwho.mobi/",
hawkeye_app: "knife666outsea",
gm_baseUrl: "https://verify.riceballgames.com",
hawkeye_gameid: 1002,
k6_Token: "",
hawkeye_registerTime: 0,
hawkeye_level: 1,
eolinkerToken: "",
eolinkerSettings: null,
eolinkerUpdateTimestamp: 0,
eolinkerChannelCode: "",
oldVisitCids: [],
timeDefence: 0,
reportFunnels: [],
uid: "",
cid: "lSeLUbAWNZ",
shareUid: "",
shareType: 0,
osType: h.UNKNOWN,
isDevTool: !1,
isReportAnalytics: !1,
heartbeatSendTimestamp: 0,
heartbeatInterval: 3e5,
channelType: a.RiceBall_2,
nft_balance_ids: {},
nft_user_datas: {},
init: function() {
if (cc.sys.platform === cc.sys.WECHAT_GAME) {
d.platformType = n.WECHAT;
var e = wx.getSystemInfoSync();
d.systemInfo = e;
0;
if (e.system) {
d.systemSoftware = e.system;
d.systemSoftware.toLowerCase().indexOf("ios") >= 0 ? d.osType = h.IOS : d.osType = h.ANDROID;
}
if ("function" == typeof wx.getUpdateManager) {
var t = wx.getUpdateManager();
t.onCheckForUpdate(function(e) {
console.log("onCheckForUpdate:", e);
});
t.onUpdateReady(function() {
console.log("onUpdateReady");
t.applyUpdate();
});
t.onUpdateFailed(function() {
console.log("onUpdateFailed");
});
}
} else if (cc.sys.os === cc.sys.OS_IOS) d.platformType = n.IOS; else if (cc.sys.os === cc.sys.OS_ANDROID) {
d.platformType = n.ANDROID;
d.hawkeye_gameid = 1004;
d.channelType = a.RiceBall_2;
switch (d.channelType) {
case a.RiceBall:
d.cid = "lSeLUbAWNZ";
break;

case a.RiceBall_1:
d.cid = "bQj2uesh9C";
break;

case a.RiceBall_2:
d.cid = "lSeLUbAWNZ";
}
} else d.platformType = n.BROWSER;
d.systemInfo && "devtools" === d.systemInfo.platform && (d.isDevTool = !0);
o.init(d.platformType, d.systemInfo);
},
setPlayerData: function(e) {
d.playerData = e;
},
isIOS: function() {
return d.osType === h.IOS;
},
isIosApp: function() {
return d.platformType === n.IOS;
},
isAndroidApp: function() {
return d.platformType === n.ANDROID;
},
isApp: function() {
return d.isIosApp() || d.isAndroidApp();
},
isAndroidRiceBall1: function() {
return d.channelType === a.RiceBall_1;
},
doLogin: function(e, t) {
switch (d.platformType) {
case n.WECHAT:
d.wxLogin(function(t) {
if (t.result) {
console.log("login success");
d.k6_userDate();
d.is_new;
e && e(t);
} else {
console.log("login fail");
e && e(t);
}
});
break;

case n.BROWSER:
d.browserLogin(function(t) {
if (t.result) {
console.log("login success");
d.k6_userDate();
d.is_new;
e && e(t);
} else {
console.log("login fail");
e && e(t);
}
});
break;

case n.IOS:
case n.ANDROID:
var i = o.getItem("user_uuid");
console.log("uuid: " + i);
if (i) {
d.k6_Token = i;
d.is_new = !1;
d.uid = i;
} else {
var a = d.isAndroidApp() ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/Utils", "getUUID", "()Ljava/lang/String;") : jsb.reflection.callStaticMethod("Utils", "getUUID");
console.log("newUUID: " + a);
d.k6_Token = a;
d.is_new = !0;
d.uid = a;
o.setItem("user_uuid", a);
}
e && e({
result: !0
});
break;

default:
e && e({
result: !0
});
}
},
browserLogin: function(e) {
var t = "11122222qwewww5";
d.code = t;
d.k6_login({
code: t
}, function(t) {
s.instance.isShowLog() && console.log("k6_login login resonse data:" + JSON.stringify(t));
if (void 0 !== t.token && void 0 !== t.is_new && void 0 != t.uid) {
d.k6_Token = t.token;
d.is_new = t.is_new;
d.uid = t.uid;
e && e({
result: !0
});
} else e && e({
result: !0,
errMsg: "SDK登录失败，请稍后重试"
});
}, function() {
e && e({
result: !0,
errMsg: "SDK登录失败，请稍后重试"
});
});
},
wxLogin: function(e) {
wx.login({
success: function(t) {
d.code = t.code;
d.k6_login({
code: t.code
}, function(t) {
s.instance.isShowLog() && console.log("k6_login login resonse data:" + JSON.stringify(t));
if (void 0 !== t.token && void 0 !== t.is_new && void 0 != t.uid) {
d.k6_Token = t.token;
d.is_new = t.is_new;
d.uid = t.uid;
e && e({
result: !0
});
} else e && e({
result: !1,
errMsg: "SDK登录失败，请稍后重试"
});
}, function() {
e && e({
result: !1,
errMsg: "SDK登录失败，请稍后重试"
});
});
},
fail: function() {
e && e({
result: !1,
errMsg: "微信登录失败，请稍后重试"
});
}
});
},
oldUserVisit: function() {
switch (d.platformType) {
case n.WECHAT:
if (d.eolinkerChannelCode && "" !== d.eolinkerChannelCode && d.oldVisitCids && !d.oldVisitCids.includes(d.eolinkerChannelCode)) {
d.oldVisitCids.push(d.eolinkerChannelCode);
d.createEolinkerRequest("user/old-user-visit", {
token: d.eolinkerToken,
cid: d.eolinkerChannelCode
}, function(e) {
s.instance.isShowLog() && console.log("eolinker old-user-visit resonse data:" + JSON.stringify(e));
});
}
}
},
openStatis: function() {
d.createEolinkerRequest("/data-statistics/open-app", {
token: d.eolinkerToken,
scene: d.eolinkerScene
}, function(e) {
s.instance.isShowLog() && console.log("eolinker openStatis 打开应用上报:", e);
});
},
eolinkerShare: function() {
switch (d.platformType) {
case n.WECHAT:
d.shareRecord && "" !== d.shareRecord && d.eolinkerToken && "" != d.eolinkerToken && d.createEolinkerRequest("knife666/share", {
token: d.eolinkerToken,
shareRecord: d.shareRecord,
share_point: d.share_point,
share_picture: d.share_picture
}, function(e) {
s.instance.isShowLog() && console.log("eolinker eolinkerShare resonse data:" + JSON.stringify(e));
});
}
},
enlinkerGameNumber: function() {
switch (d.platformType) {
case n.WECHAT:
d.createEolinkerRequest("knife666/game-number", {
token: d.eolinkerToken
}, function(e) {
s.instance.isShowLog() && console.log("eolinker enlinkerGameNumber resonse data:" + JSON.stringify(e));
});
}
},
enlinkerUserLevel: function() {
switch (d.platformType) {
case n.WECHAT:
d.createEolinkerRequest("knife666/user-level", {
token: d.eolinkerToken
}, function(e) {
s.instance.isShowLog() && console.log("eolinker enlinkerUserLevel resonse data:" + JSON.stringify(e));
});
}
},
eolinkerUpdateDate: function(e) {
switch (d.platformType) {
case n.WECHAT:
d.createEolinkerRequest("user/date", {
app: d.eolinkerApp,
version: ""
}, function(t) {
s.instance.isShowLog() && console.log("eolinker date resonse data:" + JSON.stringify(t));
var i = 1e3 * t.data.now_time, n = Number(new Date().getTime());
d.timeDefence = n - i;
e && e();
if (s.instance.isShowLog()) {
console.log(new Date(n), new Date(i));
console.log("时间差：" + d.timeDefence);
}
});
break;

default:
e && e();
}
},
updateUserInfo: function(e) {
switch (d.platformType) {
case n.WECHAT:
d.createEolinkerRequest("user/update-user-info", {
token: d.eolinkerToken,
cid: d.eolinkerChannelCode,
nickname: e.nickName,
avatar: e.avatarUrl,
gender: e.gender,
country: e.country,
province: e.province,
city: e.city
}, function(e) {
s.instance.isShowLog() && console.log("eolinker updateUserInfo resonse data:" + JSON.stringify(e));
});
}
},
createEolinkerRequest: function(e, t, i) {
t.app = d.eolinkerApp;
d.createHttpRequest("https://constellation.mamapai.net/" + e, t, function(e) {
i && i(e);
}, function() {
s.instance.isShowLog() && console.error("createEolinkerRequest error, url:" + e + " param:" + JSON.stringify(t));
});
},
updateEolinkerSettings: function(e) {
switch (d.platformType) {
case n.WECHAT:
var t = o.getTimestampMS();
null === d.eolinkerSettings || t - d.eolinkerUpdateTimestamp >= 0 ? d.createEolinkerRequest("common/get-config", {}, function(t) {
s.instance.isShowLog() && console.log("settings:" + JSON.stringify(t));
d.eolinkerSettings = t;
e && e(d.eolinkerSettings);
d.eolinkerUpdateTimestamp = o.getTimestampMS();
}) : e && e(d.eolinkerSettings);
}
},
createHttpRequest: function(e, t, i, a) {
var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "POST";
if (s.instance.isShowLog()) try {
console.log("createHttpRequest url:" + e + " data:" + JSON.stringify(t));
} catch (e) {
console.log("log excepiton:" + e);
}
switch (d.platformType) {
case n.WECHAT:
wx.request({
url: e,
data: t,
method: o,
success: function(e) {
cc.log("http success, response:", e);
i && i(e.data, e.statusCode, e.header);
},
fail: function(e) {
cc.log("http fail, response:", e);
a && a(e);
}
});
break;

default:
var r = cc.loader.getXMLHttpRequest();
r.open(o, e, !0);
r.onreadystatechange = function() {
if (4 === r.readyState && r.status >= 200 && r.status < 400) {
var e = r.responseText, t = null;
try {
e && e.length > 0 && (t = JSON.parse(e));
} catch (e) {
cc.error("parse reponse to json exception:" + e);
}
i && i(t, r.status, null);
}
};
r.onerror = function() {
cc.log("http fail onerror");
a && a();
};
r.ontimeout = function() {
cc.log("http fail time out");
a && a();
};
var c = JSON.stringify(t);
r.send(c);
}
},
hawkeye_getConfig: function(e) {
switch (d.platformType) {
case n.WECHAT:
case n.ANDROID:
case n.IOS:
case n.BROWSER:
var t = o.getTimestampMS();
if (null === d.eolinkerSettings || t - d.eolinkerUpdateTimestamp >= 0) {
var i = d.hawkeye_baseUrl + "manager/getConfig", a = {};
a.app = d.hawkeye_app;
d.createHttpRequest(i, a, function(t) {
s.instance.isShowLog() && console.log("settings:" + JSON.stringify(t));
d.eolinkerSettings = t;
e && e(d.eolinkerSettings);
d.eolinkerUpdateTimestamp = o.getTimestampMS();
}, function() {
s.instance.isShowLog() && console.error("hawkeye_getConfig error, url:" + i + " param:" + JSON.stringify(a));
});
} else e && e(d.eolinkerSettings);
}
},
hawkeye_report: function(e) {
switch (d.platformType) {
case n.WECHAT:
case n.ANDROID:
case n.IOS:
var t = d.hawkeye_baseUrl + "report";
e.gameId = d.hawkeye_gameid;
e.userId = d.uid;
e.registerTime = d.hawkeye_registerTime;
e.level = d.hawkeye_level;
e.cid = d.cid;
d.createHttpRequest(t, e, function(e) {
s.instance.isShowLog() && console.log("hawkeye_report resonse data:" + JSON.stringify(e));
}, function() {
s.instance.isShowLog() && console.error("hawkeye_report error, url:" + t + " param:" + JSON.stringify(e));
});
}
},
hawkeye_report_login: function() {
d.hawkeye_report({
reportId: "01"
});
},
hawkeye_report_heartbeat: function() {
d.hawkeye_report({
reportId: "02"
});
},
hawkeye_report_game: function(e) {
d.hawkeye_report({
reportId: "03-000-" + e
});
},
hawkeye_report_share_out: function(e, t) {
d.hawkeye_report({
reportId: "05-00-" + e + "-" + t
});
},
hawkeye_report_share_in: function() {
if (d.shareType && d.share_picture && "" != d.share_picture && d.uid && "" != d.uid) {
d.hawkeye_report({
reportId: "05-01-" + d.shareType + "-" + d.share_picture + "-" + (d.is_new ? "01" : "00")
});
d.shareType = null;
d.share_picture = null;
}
},
hawkeye_report_level: function() {
d.hawkeye_report({
reportId: "07-" + d.hawkeye_level
});
},
hawkeye_report_advert_open: function(e) {
d.hawkeye_report({
reportId: "06-00-" + e
});
},
hawkeye_report_advert_show: function(e) {
d.hawkeye_report({
reportId: "06-01-" + e
});
},
hawkeye_report_advert_end: function(e) {
d.hawkeye_report({
reportId: "06-02-" + e
});
},
hawkeye_report_purchase: function(e, t) {
d.hawkeye_report({
reportId: "08-" + e + "-" + t + "0"
});
},
hawkeye_report_funnel: function(e) {
if (d.playerData.hawkeyeFunnelcontains(e)) s.instance.isShowLog() && console.log("skip hawkeye_funnel for event:" + e); else {
s.instance.isShowLog() && console.log("HawkeyeFunnelEvent[customEvent]:" + c[e] + "," + e);
d.playerData.addHawkeyeFunnelIDs(e);
d.hawkeye_report({
reportId: "04-00-" + e.toString()
});
}
},
k6_uploadData: function(e, t) {
switch (d.platformType) {
case n.BROWSER:
case n.WECHAT:
var i = d.k6_baseUrl + "common/upload-data", a = {};
a.app = d.k6_app;
a.token = d.k6_Token;
a.data = e;
d.createHttpRequest(i, a, function() {
s.instance.isShowLog() && console.log("k6_uploadData  success");
t && t();
}, function() {
s.instance.isShowLog() && console.error("k6_uploadData error, url:" + i + " param:" + JSON.stringify(a));
});
}
},
k6_downloadData: function(e, t) {
var i = d.k6_baseUrl + "common/download-data", n = {};
n.app = d.k6_app;
n.token = d.k6_Token;
d.createHttpRequest(i, n, function(i) {
s.instance.isShowLog() && console.log("k6_downloadData success:" + JSON.stringify(i));
i && i.data ? e && e(i.data.data) : t && t();
}, function() {
t && t();
s.instance.isShowLog() && console.error("k6_downloadData error, url:" + i + " param:" + JSON.stringify(n));
});
},
k6_login: function(e, t, i) {
var n = d.k6_baseUrl + "user/login";
e.app = d.k6_app;
e.sharer = d.shareUid;
e.shareType = d.shareType;
e.ios = d.isIOS() ? 1 : 0;
d.createHttpRequest(n, e, function(e) {
s.instance.isShowLog() && console.log("k6_login success:" + JSON.stringify(e));
e ? t && t(e.data) : i && i();
}, function() {
i && i();
s.instance.isShowLog() && console.error("k6_login error, url:" + n + " param:" + JSON.stringify(e));
});
},
k6_userDate: function(e) {
switch (d.platformType) {
case n.WECHAT:
var t = d.k6_baseUrl + "user/date", i = {};
i.app = d.k6_app;
i.version = "";
i.token = d.k6_Token;
d.createHttpRequest(t, i, function(t) {
s.instance.isShowLog() && console.log("k6_userDate response data:" + JSON.stringify(t));
if (t) {
var i = 1e3 * t.data.now_time, n = Number(new Date().getTime());
d.timeDefence = n - i;
if (s.instance.isShowLog()) {
console.log(n, i);
console.log("时间差：" + d.timeDefence);
}
}
e && e();
}, function() {
s.instance.isShowLog() && console.error("k6_userDate error, url:" + t + " param:" + JSON.stringify(i));
});
break;

default:
e && e();
}
},
adStatis: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", i = "";
t && (i = e.appid);
d.createEolinkerRequest("common/ad-statistics", {
token: d.eolinkerToken,
ad_appid: e.distid,
middle_appid: i,
ad_id: t
}, function(e) {
s.instance.isShowLog() && console.log("result: ", e);
});
},
navgateTo: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, n = "";
if (-1 != e.path.search(new RegExp("(^|&)?reJ=([^&]*)(&|$)"))) {
(n = d.eolinkerApp + d.uid + Math.round(new Date().getTime() / 1e3) + "").length > 25 && (n = n.substr(n.length - 25, n.length));
e.path += "&ad_id=" + n;
}
window.wx.navigateToMiniProgram && window.wx.navigateToMiniProgram({
appId: e.appid,
path: e.path,
success: function(i) {
n ? d.adStatis(e, n) : d.adStatis(e);
t && t();
},
fail: function() {
i && i();
}
});
},
onPreView: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = d.baseUrl + "QR_code/" + e.path;
window.wx.previewImage({
current: i,
urls: [ i ],
success: function() {
d.adStatis(e);
t && t();
}
});
},
showOpenDataContext: function() {
switch (d.platformType) {
case n.WECHAT:
qq.getOpenDataContext().postMessage({
messageType: r.Show,
code: d.code
});
}
},
closeOpenDataContext: function() {
switch (d.platformType) {
case n.WECHAT:
qq.getOpenDataContext().postMessage({
messageType: r.Close
});
}
},
leftOpenDataContext: function() {
switch (d.platformType) {
case n.WECHAT:
qq.getOpenDataContext().postMessage({
messageType: r.Left
});
}
},
rightOpenDataContext: function() {
switch (d.platformType) {
case n.WECHAT:
qq.getOpenDataContext().postMessage({
messageType: r.Right
});
}
},
showMiniOpenDataContext: function() {
switch (d.platformType) {
case n.WECHAT:
qq.getOpenDataContext().postMessage({
messageType: r.Mini,
code: d.code
});
}
},
closeMiniOpenDataContext: function() {
switch (d.platformType) {
case n.WECHAT:
qq.getOpenDataContext().postMessage({
messageType: r.CloseMini
});
}
},
setUserCloudStorage: function(e) {
switch (d.platformType) {
case n.WECHAT:
var t = [], i = {
key: "rankStar",
value: "" + e
};
t.push(i);
var a = {
key: "TIMESTAMP",
value: o.getTimestampMS().toString()
};
t.push(a);
var r = {
key: "uuid",
value: d.code
};
t.push(r);
wx.setUserCloudStorage({
KVDataList: t,
complete: function(e) {
s.instance.isShowLog() && console.log("setUserCloudStorage complete:", e);
}
});
}
},
notifyFunnelEvent: function(e) {
if (!d.reportFunnels || !d.reportFunnels[e]) {
d.hawkeye_report_funnel(e);
d.mta_report_funnel(e);
d.reportFunnels && (d.reportFunnels[e] = !0);
}
},
mta_report_funnel: function(e) {
switch (d.platformType) {
case n.WECHAT:
var t;
t = "KEY_CUSTOM_Funnel_EVENT_" + e;
if (o.getItem(t)) {
s.instance.isShowLog() && console.log("skip funnel for event:" + e);
return;
}
s.instance.isShowLog() && console.log("CustomFunnelEvent[customEvent]:" + c[e] + "," + e);
var i = {};
i[e.toString()] = "true";
l.Event.stat("startfirstgame", i);
o.setItem(t, o.getTimestampMS().toString());
}
},
getAreaInfo: function(e) {
switch (d.platformType) {
case n.WECHAT:
var t = d.k6_baseUrl + "user/getArea", i = {
app: d.k6_app,
token: d.k6_Token
};
d.createHttpRequest(t, i, function(t) {
s.instance.isShowLog() && console.log("getArea response data:" + JSON.stringify(t));
t && t.data && t.data.cityInfo && e && e(t.data.cityInfo);
});
}
},
getShareScore: function(e) {
switch (d.platformType) {
case n.WECHAT:
var t = d.k6_baseUrl + "user/getShareScore", i = {
app: d.k6_app,
token: d.k6_Token
};
d.createHttpRequest(t, i, function(t) {
s.instance.isShowLog() && console.log("getShareScore response data:" + JSON.stringify(t));
t && t.data && e && e(t.data.score);
});
break;

default:
e && e(0);
}
},
af_report_user: function() {
cc.sys.os, cc.sys.OS_IOS;
},
getInviteInfo: function(e) {
switch (d.platformType) {
case n.WECHAT:
var t = d.k6_baseUrl + "user/getShareNew", i = {
app: d.k6_app,
token: d.k6_Token
};
d.createHttpRequest(t, i, function(t) {
s.instance.isShowLog() && console.log("getInviteInfo response data:" + JSON.stringify(t));
t && t.data && t.data.newUsers && e && e(t.data.newUsers);
});
break;

default:
e && e([ {
iconUrl: 1
}, {
iconUrl: 2
}, {
iconUrl: 3
} ]);
}
},
resetShareDailyRequest: function(e) {
switch (d.platformType) {
case n.WECHAT:
var t = d.k6_baseUrl + "fake/resetShareDaily", i = {
app: d.k6_app,
token: d.k6_Token
};
d.createHttpRequest(t, i, function(t) {
s.instance.isShowLog() && console.log("resetShareDailyRequest response data:" + JSON.stringify(t));
e && e();
});
}
},
isPlatformUseWxApi: function() {
return d.platformType === n.WECHAT;
},
reportAnalytics: function() {
if (!d.isReportAnalytics) switch (d.platformType) {
case n.WECHAT:
d.isReportAnalytics = !0;
qq && qq.reportAnalytics && "function" == typeof qq.reportAnalytics && qq.reportAnalytics("finishShow");
}
},
setHolidayScore: function(e, t) {
switch (d.platformType) {
case n.BROWSER:
case n.WECHAT:
var i = d.k6_baseUrl + "user/uploadScore", a = {
app: d.k6_app,
token: d.k6_Token,
score: e
};
d.createHttpRequest(i, a, function(e) {
s.instance.isShowLog() && console.log("setHolidayScore response data:" + JSON.stringify(e));
t && t();
});
}
},
getHolidayPKRank: function(e) {
switch (d.platformType) {
case n.BROWSER:
case n.WECHAT:
var t = d.k6_baseUrl + "user/smallRank", i = {
app: d.k6_app,
token: d.k6_Token
};
d.createHttpRequest(t, i, function(t) {
s.instance.isShowLog() && console.log("getHolidayPKRank response data:" + JSON.stringify(t));
t && e && e(t.data);
});
}
},
getHolidayWorldRank: function(e, t) {
switch (d.platformType) {
case n.BROWSER:
case n.WECHAT:
var i = d.k6_baseUrl + "user/worldRank", a = {
app: d.k6_app,
token: d.k6_Token,
round: e
};
d.createHttpRequest(i, a, function(e) {
s.instance.isShowLog() && console.log("getHolidayWorldRank response data:" + JSON.stringify(e));
e && t && t(e.data);
});
}
},
getHolidayPKReward: function(e) {
switch (d.platformType) {
case n.BROWSER:
case n.WECHAT:
var t = d.k6_baseUrl + "user/lastSmallRank", i = {
app: d.k6_app,
token: d.k6_Token
};
d.createHttpRequest(t, i, function(t) {
s.instance.isShowLog() && console.log("getHolidayPKReward response data:" + JSON.stringify(t));
t && t.data && e && e(t.data);
});
break;

default:
e && e();
}
},
getHolidayWorldReward: function(e) {
switch (d.platformType) {
case n.BROWSER:
case n.WECHAT:
var t = d.k6_baseUrl + "user/lastWorldRank", i = {
app: d.k6_app,
token: d.k6_Token
};
d.createHttpRequest(t, i, function(t) {
s.instance.isShowLog() && console.log("getHolidayWorldReward response data:" + JSON.stringify(t));
t && t.data && e && e(t.data);
});
break;

default:
e && e();
}
},
getHolidayWorldRewardInfo: function(e) {
switch (d.platformType) {
case n.BROWSER:
case n.WECHAT:
var t = d.k6_baseUrl + "user/worldRewardInfo", i = {
app: d.k6_app,
token: d.k6_Token
};
d.createHttpRequest(t, i, function(t) {
s.instance.isShowLog() && console.log("getHolidayWorldRewardInfo response data:" + JSON.stringify(t));
t && t.data && e && e(t.data);
});
break;

default:
e && e();
}
},
getCountry: function() {
switch (d.platformType) {
case n.ANDROID:
var e = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/Utils", "getCountry", "()Ljava/lang/String;");
console.log("PlatformMgr.getCountry: " + e);
return e;

case n.IOS:
e = jsb.reflection.callStaticMethod("Utils", "getCountry");
console.log("PlatformMgr.getCountry: " + e);
return e;
}
},
getLanguageCode: function() {
switch (d.platformType) {
case n.ANDROID:
var e = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/Utils", "getLanguageCode", "()Ljava/lang/String;");
console.log("PlatformMgr.getLanguageCode: " + e);
return e;

case n.IOS:
e = jsb.reflection.callStaticMethod("Utils", "getLanguageCode");
console.log("PlatformMgr.getLanguageCode: " + e);
return e;
}
},
openStoreComment: function() {
switch (d.platformType) {
case n.ANDROID:
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/Utils", "openStoreComment", "()V");
break;

case n.IOS:
cc.sys.openURL("itms-apps://itunes.apple.com/app/id1460796876?action=write-review");
}
},
connectBitverse: function() {
switch (d.platformType) {
case n.ANDROID:
console.log("connectBitverse ===>");
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/BitverseManager", "Connect", "()V");
break;

case n.IOS:
jsb.reflection.callStaticMethod("BitverseManager", "Connect");
}
},
web3_gm_api: function(e, t, i, n) {
var a = d.gm_baseUrl + "/gmapi/game/" + e + "?" + t;
d.createHttpRequest(a, "", function(e) {
s.instance.isShowLog() && console.log("web3_gm_api resonse data:" + JSON.stringify(e));
i && i(e);
}, function() {
s.instance.isShowLog() && console.error("web3_gm_api error, url:" + a + " param:" + JSON.stringify(param));
n && n();
});
},
qureyBalance: function() {
var e = Number(new Date().getTime());
d.web3_gm_api("qureyBalanceFromDB", "time=" + e, function(e) {
if (0 == e.result) {
if (e.data) {
for (var t = e.data.split("_"), i = {}, n = 0; n < t.length; n++) {
var a = t[n].split("="), o = (a[0], a[1]);
i.hasOwnProperty(o) ? i[o] = i[o] + 1 : i[o] = 1;
}
d.nft_balance_ids = i;
return i;
}
console.log("rsp.data null");
return {};
}
console.log("rsp result error", e.result);
return {};
}, function() {
console.log("gm query failed");
return {};
});
},
checkUserNFT: function() {
var e = "uuid=" + (o.getItem("user_uuid") || 0) + "&country=" + (d.getCountry() || "") + "&adress=" + (d.playerData.bitverseWallet || "1");
d.web3_gm_api("checkNFTFormDB", e, function(e) {
if (200 == e.result) {
if (e.data) {
for (var t = e.data.split("_"), i = {}, n = 0; n < t.length; n++) {
var a = t[n].split("="), o = (a[0], a[1]);
i.hasOwnProperty(o) ? i[o] = i[o] + 1 : i[o] = 1;
}
d.nft_user_datas = i;
return i;
}
console.log("rsp.data null");
return {};
}
console.log("rsp result error", e.result);
return {};
}, function() {
console.log("gm query failed");
return {};
});
},
requestNFTGet: function(e) {
if (100 == e.getWay) {
var t = o.getItem("user_uuid") || "", i = d.getCountry() || "", n = d.playerData.bitverseWallet || "", a = e.goodsId, s = encodeURIComponent(e.goodsName), r = "uuid=" + t + "&country=" + i + "&adress=" + n + "&id=" + a + "&name=" + encodeURIComponent(e.name) + "&name2=" + s + "&token=" + e.token;
d.web3_gm_api("requestNFT", r, function(e) {
if (200 == e.result) {
if (e.data) {
var t = e.data;
AdvertMgr.instance.showUITips(o.getStringByFormat(t));
return null;
}
console.log("rsp.data null");
return null;
}
e.data ? AdvertMgr.instance.showUITips(o.getStringByFormat(e.data)) : console.log("rsp result error", e.result);
return null;
}, function() {
console.log("gm query failed");
return null;
});
}
}
}
});
cc._RF.pop();
}, {
GameData: "GameData",
Tools: "Tools",
Types: "Types",
mta_analysis: "mta_analysis"
} ],
PlaySoundByOwner: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "03c98rxWR1A6pKvyQAvJ/Lp", "PlaySoundByOwner");
var n = e("AudioEngine"), a = e("Types").SoundID;
cc.Class({
extends: cc.Component,
properties: {
player: null,
_isDefence: !0,
audioID: null
},
init: function(e) {
this.player = e;
},
update: function(e) {
if (this.player.isDead) {
if (this._isDefence) {
this._isDefence = !1;
n.instance.stopSound(this.audioID);
this.audioID = null;
}
} else if (this._isDefence !== this.player.isDefence) {
this._isDefence = this.player.isDefence;
if (this._isDefence) this.audioID = n.instance.playSound(a.Spin, !0); else {
n.instance.stopSound(this.audioID);
this.audioID = null;
}
}
}
});
cc._RF.pop();
}, {
AudioEngine: "AudioEngine",
Types: "Types"
} ],
PlayerBuffChangeListener: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "889d6yXYYJJR7uwiGgr8M4Q", "PlayerBuffChangeListener");
var n = e("Types").BuffState;
cc.Class({
extends: cc.Component,
properties: {
_hard: 0,
_speeds: [],
_invincible: 0
},
init: function(e) {
this.player = e;
this._hard = 0;
this._speeds = [];
this._invincible = 0;
this.node.on("onBuffChange", this.onBuffChange, this);
},
onBuffChange: function(e, t) {
switch (e.type) {
case n.Big:
if (t) {
this.player._bigEffect.open();
this.player._bigEffectText.play();
this.node.emit("changeScaleMultip", e.buffParam);
this.player.followPlayer.node.emit("changeScaleMultip", e.buffParam);
this.player.cameraZoomSys && this.player.cameraZoomSys.setCameraZoomMultip(e.buffParam);
} else {
this.player._bigEffect.close();
this.node.emit("changeScaleMultip", 1);
this.player.followPlayer.node.emit("changeScaleMultip", 1);
this.player.cameraZoomSys && this.player.cameraZoomSys.setCameraZoomMultip(1);
}
break;

case n.Fast:
if (t) {
if (!this._frenzy) {
this.player._fastEffect.open();
6 !== e.id && this.player._fastEffectText.play();
}
this._speeds.push(e.buffParam);
this.node.emit("changeSpeedRate", this.getSpeedRate());
} else {
this.player._fastEffect.close();
(a = this._speeds.indexOf(e.buffParam)) > -1 && this._speeds.splice(a, 1);
this.node.emit("changeSpeedRate", this.getSpeedRate());
}
break;

case n.Hard:
if (t) {
this._hard++;
if (!this._frenzy) {
this.player._hardEffect.open();
this.player._hardEffectText.play();
}
var i = 6 - this.player.followPlayer.knivesCmp.knives.length;
i > 0 && this.player.changeKnifeCountCallback && this.player.changeKnifeCountCallback(i);
} else {
this._hard--;
this.player._hardEffect.close();
}
break;

case n.Frenzy:
if (t) {
this._hard++;
this._invincible++;
this._speeds.push(e.buffParam);
this._frenzy = !0;
this.player._fastEffect.close();
this.player._hardEffect.close();
this.player._frenzyEffect.open();
this.node.emit("changeSpeedRate", this.getSpeedRate());
} else {
this._hard--;
this._invincible--;
var a;
(a = this._speeds.indexOf(e.buffParam)) > -1 && this._speeds.splice(a, 1);
this._frenzy = !1;
this.player._frenzyEffect.close();
this.node.emit("changeSpeedRate", this.getSpeedRate());
}
break;

case n.Magnet:
if (t) {
this.player._magnetEffect.open();
this.player._magnetEffectText.play();
this.node.emit("changeMagnet", !0);
} else {
this.player._magnetEffect.close();
this.node.emit("changeMagnet", !1);
}
}
},
getSpeedRate: function() {
var e = 1, t = !0, i = !1, n = void 0;
try {
for (var a, o = this._speeds[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
var s = a.value;
e = Math.max(s, e);
}
} catch (e) {
i = !0;
n = e;
} finally {
try {
!t && o.return && o.return();
} finally {
if (i) throw n;
}
}
return e;
},
isHard: function() {
return this._hard > 0;
},
isInvincible: function() {
return this._invincible > 0;
}
});
cc._RF.pop();
}, {
Types: "Types"
} ],
PlayerBuffComponent: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "aaf010WktdERpw7dxxsiSLQ", "PlayerBuffComponent");
e("Types").BuffState;
var n = e("ConfigData");
cc.Class({
extends: cc.Component,
properties: {
buffRemainTimes: []
},
onLoad: function() {
this.node.on("updateBuffState", this.updateBuffState, this);
},
die: function() {
for (var e = 0; e < this.buffRemainTimes.length; e++) if (this.buffRemainTimes[e]) {
var t = n.instance.getBuffDataById(e);
this.node.emit("onBuffChange", t, !1);
this.buffRemainTimes[e] = 0;
}
},
updateBuffState: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1, i = n.instance.getBuffDataById(e);
this.buffRemainTimes[e] || this.node.emit("onBuffChange", i, !0);
this.buffRemainTimes[e] = t > 0 ? t : i.keepTime;
},
updateGameLogic: function(e) {
for (var t = 0; t < this.buffRemainTimes.length; t++) if (this.buffRemainTimes[t]) {
this.buffRemainTimes[t] -= e;
if (this.buffRemainTimes[t] <= 0) {
this.buffRemainTimes[t] = 0;
var i = n.instance.getBuffDataById(t);
this.node.emit("onBuffChange", i, !1);
}
}
}
});
cc._RF.pop();
}, {
ConfigData: "ConfigData",
Types: "Types"
} ],
PlayerData: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "5e32fdc6j9Gh6cn94HDvTMb", "PlayerData");
var n = e("Tools"), a = e("ConfigData"), o = e("PlatformMgr"), s = e("Types").PlatformType, r = e("GameData"), c = e("Types").TaskType, l = e("Types").DailyTaskType, h = e("Types").GrowType, d = cc.Class({
statics: {
instance: null,
init: function() {
if (null === d.instance) {
d.instance = new d();
d.instance.init();
}
},
cleanUp: function() {
d.instance && n.cleanUp(d.instance);
d.instance = null;
}
},
properties: {
name: "player",
gold: 200,
showGold: 200,
getGoldCount: 0,
knifeSkinId: 1,
heroSkinId: 1,
ownKnifeSkins: [],
ownHeroSkins: [],
completeTaskIds: [],
showTaskInGameIds: [],
completeRankRewardIds: [],
needCheckTaskIds: [],
taskProcess: [],
knifeSkin: null,
extraKnifeCount: 0,
isExtraKnife: !1,
allShareCount: 0,
bornTime: 0,
saveTime: 0,
getOfflineGoldTime: 0,
offlineGoldCount: 0,
lastChangeGoldMultipTime: 0,
playCount: 0,
dayKillCount: 0,
dayTotalPickKnifeCount: 0,
dayMaxPickKnifeCount: 0,
dayKillKnifeCount: 0,
dayPlayCount: 0,
dayWinCount: 0,
dayRefreshTaskCount: 0,
dayRefreshShareScore: !1,
dayTotalAdsRevenue: 0,
dayCanReportTotalAdsRevenue: !0,
bitverseWallet: "",
dayGetPrizeCount: 0,
dayWin: !1,
dayLoseCount: 0,
dayProtectCount: 0,
dailyShowTask: [],
dailyOldTask: [],
dayMultAgainCDCount: 0,
dayMultAgainCloseCount: 0,
dayGetGoldCount: 0,
killCount: 0,
oldKillCount: 0,
luckyRewardCount: 0,
level: 0,
rankScore: 0,
rankId: 0,
rankStar: 0,
hideScore: 0,
iconUrl: 1,
signCount: 0,
daySign: !1,
initSignCount: !1,
adverCountDatas: [],
continuityLoseCount: 0,
totalAdverCount: 0,
changeAdverCount: 0,
hasCheckNewSkin: [],
receiveRound: [],
needUpdateUserData: !1,
growLevel: [],
randomCount: 0,
hasRepay: !1,
hawkeyeFunnelIDs: [],
completeGuideDailyTask: [],
zongZi: 0,
cheatOffset: 0,
zongZiToDaoBi: !1,
shareScore: 0,
inviteDatas: [],
checkInviteLength: 0,
extendOldRank: !1,
dayShowTop: !1,
holidayWorldRankData: [],
updatePKRankTime: 0,
dayRefreshPKReward: !1,
dayRefreshWorldReward: !1,
dayFirstEnterPKTop20: !1,
timeOffset: 0,
perPlayCount: 0,
subscribeTime: 0,
daySubscribeReward: !1,
country: "US",
refuseBuyPool: null,
refuseAdverPool: null,
keyCount: 0,
treasureTurn: 0,
showKeyCount: 2,
hasGetKey: !1,
evaulateCount: 0,
vipWithoutInterstitial: 0,
lastFreeDiamondTime: 0,
isShowOpenAdCold: !1
},
init: function() {
this.randomCount = 0;
this.ownKnifeSkins = [ 1 ];
this.ownHeroSkins = [ 1 ];
this.growLevel = [ 0, 0, 0, 0, 0 ];
this.needUpdateUserData = !1;
this.bornTime = this.getCurTime();
this.updateSaveTime();
this.getOfflineGoldTime = this.getCurTime();
this.lastChangeGoldMultipTime = this.getCurTime();
this.loadUserCidData();
this.refuseBuyPool = {};
this.refuseAdverPool = {};
o.setPlayerData(this);
o.qureyBalance();
o.checkUserNFT();
},
initUserData: function(e) {
this.getUserData(e);
this.saveUserCidData();
console.log("---------------------------初始化实物获奖信息");
this.updateWorldRewardDetail();
console.log("---------------------------初始化小组PK榜数据");
this.getHolidayPKRank(function() {});
this.getCountry();
},
initConfigData: function() {
this.isOwnKnifeSkin(this.knifeSkinId) || (this.knifeSkinId = 1);
this.isOwnHeroSkin(this.heroSkinId) || (this.heroSkinId = 1);
this.knifeSkin = a.instance.getKnifeSkinById(this.knifeSkinId);
this.heroSkin = a.instance.getHeroSkinById(this.heroSkinId);
this.rankData = a.instance.getRankDataByStar(this.rankStar);
this.rankId = this.rankData.id;
this.offlineGoldInterval = 1e3 * a.instance.clientData.offlineGoldInterval;
this.offlineGoldNormalCount = a.instance.clientData.offlineGoldNormalCount;
this.level = a.instance.getLevelByHideScore(this.hideScore);
0 === this.dailyShowTask.length && this.updateDailyShowTask();
this.level = this.protectLevel(this.level);
this.isGuide = !1;
r.instance.isShowLog() && console.log("playerdata.initConfigData level: " + this.level);
this.extendOldData();
o.hawkeye_level = this.rankId + 1;
this.remainPKDay = n.getTimeCount(this.getCurTime(), n.getTimeStampByTimeStr(a.instance.holidayDatas.startDate)).day + 1;
},
extendOldData: function() {
var e = !1;
if (-1 !== this.rankScore) {
var t = a.instance.convertScoreIdToStarId(this.rankScore);
this.rankData = a.instance.getRankDataById(t);
this.rankStar = this.rankData.star;
this.rankId = this.rankData.id;
this.rankScore = -1;
e = !0;
}
if (!this.initSignCount) {
this.initSignCount = !0;
var i = n.getRealDayTimeCount(this.bornTime, this.getCurTime()) - 1;
i = i < 0 ? 0 : i;
this.signCount += i;
if (this.signCount >= 7) {
this.signCount = 6;
this.daySign = !0;
}
e = !0;
}
if (!this.extendOldRank) {
this.extendOldRank = !0;
if (this.rankStar >= 103) {
this.rankStar += 60;
this.rankData = a.instance.getRankDataByStar(this.rankStar);
this.rankId = this.rankData.id;
}
e = !0;
}
e && this.saveUserData("老用户数据继承");
},
convertZongZi: function() {
if (this.zongZi > 0) {
this.gold += 10 * this.zongZi;
this.zongZi = 0;
this.saveUserData("转化粽子");
}
},
setData: function(e) {
if (e) {
this.name = e.name ? e.name : "player";
this.gold = e.gold ? e.gold : 0;
this.knifeSkinId = e.knifeSkinId ? e.knifeSkinId : 1;
this.ownKnifeSkins = e.ownKnifeSkins ? e.ownKnifeSkins : [ 1 ];
this.ownHeroSkins = e.ownHeroSkins ? e.ownHeroSkins : [ 1 ];
this.heroSkinId = e.heroSkinId ? e.heroSkinId : 1;
this.completeTaskIds = e.completeTaskIds ? e.completeTaskIds : [];
this.showTaskInGameIds = e.showTaskInGameIds ? e.showTaskInGameIds : [];
this.needCheckTaskIds = e.needCheckTaskIds ? e.needCheckTaskIds : [];
this.completeRankRewardIds = e.completeRankRewardIds ? e.completeRankRewardIds : [];
this.adverCountDatas = e.adverCountDatas ? e.adverCountDatas : [];
this.totalAdverCount = e.totalAdverCount ? e.totalAdverCount : 0;
this.hasCheckNewSkin = e.hasCheckNewSkin ? e.hasCheckNewSkin : [];
this.receiveRound = e.receiveRound ? e.receiveRound : [];
this.bornTime = e.bornTime ? e.bornTime : this.getCurTime();
this.saveTime = e.saveTime ? e.saveTime : this.getCurTime();
this.getOfflineGoldTime = e.getOfflineGoldTime ? e.getOfflineGoldTime : this.getCurTime();
this.lastChangeGoldMultipTime = e.lastChangeGoldMultipTime ? e.lastChangeGoldMultipTime : this.getCurTime();
this.offlineGoldCount = e.offlineGoldCount ? e.offlineGoldCount : 0;
this.playCount = e.playCount ? e.playCount : 0;
this.dayPlayCount = e.dayPlayCount ? e.dayPlayCount : 0;
this.dayGetPrizeCount = e.dayGetPrizeCount ? e.dayGetPrizeCount : 0;
this.dayWin = e.dayWin ? e.dayWin : 0;
this.dayLoseCount = e.dayLoseCount ? e.dayLoseCount : 0;
this.dayProtectCount = e.dayProtectCount ? e.dayProtectCount : 0;
this.dayGetGoldCount = e.dayGetGoldCount ? e.dayGetGoldCount : 0;
this.dayKillCount = e.dayKillCount ? e.dayKillCount : 0;
this.dayTotalPickKnifeCount = e.dayTotalPickKnifeCount ? e.dayTotalPickKnifeCount : 0;
this.dayMaxPickKnifeCount = e.dayMaxPickKnifeCount ? e.dayMaxPickKnifeCount : 0;
this.dayKillKnifeCount = e.dayKillKnifeCount ? e.dayKillKnifeCount : 0;
this.dayWinCount = e.dayWinCount ? e.dayWinCount : 0;
this.dayRefreshTaskCount = e.dayRefreshTaskCount ? e.dayRefreshTaskCount : 0;
this.dayRefreshShareScore = !!e.dayRefreshShareScore && e.dayRefreshShareScore;
this.dayTotalAdsRevenue = e.dayTotalAdsRevenue ? e.dayTotalAdsRevenue : 0;
this.bitverseWallet = e.bitverseWallet ? e.bitverseWallet : "";
this.dailyShowTask = e.dailyShowTask ? e.dailyShowTask : [];
this.dailyOldTask = e.dailyOldTask ? e.dailyOldTask : [];
this.dayMultAgainCDCount = e.dayMultAgainCDCount ? e.dayMultAgainCDCount : 0;
this.dayMultAgainCloseCount = e.dayMultAgainCloseCount ? e.dayMultAgainCloseCount : 0;
this.killCount = e.killCount ? e.killCount : 0;
this.allShareCount = e.allShareCount ? e.allShareCount : 0;
this.luckyRewardCount = e.luckyRewardCount ? e.luckyRewardCount : 0;
this.rankStar = e.rankStar ? e.rankStar : 0;
this.rankId = e.rankId ? e.rankId : 0;
this.rankScore = e.rankScore ? e.rankScore : 0;
this.hideScore = e.hideScore ? e.hideScore : 0;
this.signCount = e.signCount ? e.signCount : 0;
this.daySign = !!e.daySign && e.daySign;
this.initSignCount = !!e.initSignCount && e.initSignCount;
this.iconUrl = e.iconUrl ? e.iconUrl : n.getRandomInt(1, 7);
this.continuityLoseCount = e.continuityLoseCount ? e.continuityLoseCount : 0;
this.growLevel = e.growLevel ? e.growLevel : [ 0, 0, 0, 0, 0 ];
this.hasRepay = !!e.hasRepay && e.hasRepay;
this.hawkeyeFunnelIDs = e.hawkeyeFunnelIDs ? e.hawkeyeFunnelIDs : this.hawkeyeFunnelIDs;
this.completeGuideDailyTask = e.completeGuideDailyTask ? e.completeGuideDailyTask : [];
this.zongZi = e.zongZi ? e.zongZi : 0;
this.zongZiToDaoBi = !!e.zongZiToDaoBi && e.zongZiToDaoBi;
this.checkInviteLength = e.checkInviteLength ? e.checkInviteLength : 0;
this.shareScore = e.shareScore ? e.shareScore : 0;
this.extendOldRank = !!e.extendOldRank && e.extendOldRank;
this.dayShowTop = !!e.dayShowTop && e.dayShowTop;
this.dayRefreshPKReward = !!e.dayRefreshPKReward && e.dayRefreshPKReward;
this.dayRefreshWorldReward = !!e.dayRefreshWorldReward && e.dayRefreshWorldReward;
this.dayFirstEnterPKTop20 = !!e.dayFirstEnterPKTop20 && e.dayFirstEnterPKTop20;
this.subscribeTime = e.subscribeTime ? e.subscribeTime : 0;
this.daySubscribeReward = !!e.daySubscribeReward && e.daySubscribeReward;
this.refuseBuyPool = e.refuseBuyPool ? e.refuseBuyPool : {};
this.refuseAdverPool = e.refuseAdverPool ? e.refuseAdverPool : {};
this.keyCount = e.keyCount ? e.keyCount : 0;
this.treasureTurn = e.treasureTurn ? e.treasureTurn : 0;
this.showKeyCount = e.showKeyCount || 0 === e.showKeyCount ? e.showKeyCount : 2;
this.hasGetKey = !!e.hasGetKey && e.hasGetKey;
this.evaulateCount = e.evaulateCount ? e.evaulateCount : 0;
this.vipWithoutInterstitial = e.vipWithoutInterstitial ? e.vipWithoutInterstitial : 0;
this.lastFreeDiamondTime = e.lastFreeDiamondTime ? e.lastFreeDiamondTime : 0;
} else r.instance.isShowLog() && console.log("数据设置为空，使用脚本初始化的数据");
if (r.instance.isShowLog()) {
console.log(e);
console.log(new Date(this.saveTime), new Date(this.getCurTime()));
}
this.loadComplete = !0;
this.showGold = this.gold;
o.hawkeye_registerTime = this.bornTime;
o.hawkeye_level = this.rankId + 1;
o.setUserCloudStorage(this.rankStar);
},
addHawkeyeFunnelIDs: function(e) {
this.hawkeyeFunnelIDs && (n.arrContains(this.hawkeyeFunnelIDs, e) || this.hawkeyeFunnelIDs.push(e));
},
hawkeyeFunnelcontains: function(e) {
return !!this.hawkeyeFunnelIDs && n.arrContains(this.hawkeyeFunnelIDs, e);
},
randomRankStar: function() {
var e = this;
this.randomCount++;
this.rankStar = n.getRandomInt(0, 103);
this.saveUserData("随机星星数");
this.updateUserData(function() {
o.k6_downloadData(function(t) {
var i = null;
if (t) if ((i = JSON.parse(t)).rankStar && i.rankStar === e.rankStar) {
console.log("download suc and data is right count: " + e.randomCount);
e.randomCount > 100 ? e.randomCount = 0 : e.randomRankStar();
} else console.log("download suc but data is wrong count: " + e.randomCount); else {
var a = n.getItem("userData" + e.getOsStr());
a && (i = JSON.parse(a));
}
});
});
},
saveUserData: function(e) {
r.instance.isShowLog() && console.log("saveUserData------", e);
this.needUpdateUserData = !0;
},
updateUserData: function(e) {
if (this.needUpdateUserData) {
this.needUpdateUserData = !1;
r.instance.isShowLog() && console.log("updateUserData------");
var t = {
name: this.name,
gold: this.gold,
ownKnifeSkins: this.ownKnifeSkins,
ownHeroSkins: this.ownHeroSkins,
completeTaskIds: this.completeTaskIds,
showTaskInGameIds: this.showTaskInGameIds,
needCheckTaskIds: this.needCheckTaskIds,
completeRankRewardIds: this.completeRankRewardIds,
adverCountDatas: this.adverCountDatas,
knifeSkinId: this.knifeSkinId,
heroSkinId: this.heroSkinId,
bornTime: this.bornTime,
saveTime: this.getCurTime(),
getOfflineGoldTime: this.getOfflineGoldTime,
lastChangeGoldMultipTime: this.lastChangeGoldMultipTime,
offlineGoldCount: this.offlineGoldCount,
allShareCount: this.allShareCount,
luckyRewardCount: this.luckyRewardCount,
playCount: this.playCount,
dayPlayCount: this.dayPlayCount,
dayGetPrizeCount: this.dayGetPrizeCount,
dayWin: this.dayWin,
dayLoseCount: this.dayLoseCount,
dayProtectCount: this.dayProtectCount,
dayGetGoldCount: this.dayGetGoldCount,
dayKillCount: this.dayKillCount,
dayTotalPickKnifeCount: this.dayTotalPickKnifeCount,
dayMaxPickKnifeCount: this.dayMaxPickKnifeCount,
dayKillKnifeCount: this.dayKillKnifeCount,
dayWinCount: this.dayWinCount,
dayRefreshTaskCount: this.dayRefreshTaskCount,
dayRefreshShareScore: this.dayRefreshShareScore,
dailyShowTask: this.dailyShowTask,
dailyOldTask: this.dailyOldTask,
dayMultAgainCDCount: this.dayMultAgainCDCount,
dayMultAgainCloseCount: this.dayMultAgainCloseCount,
dayTotalAdsRevenue: this.dayTotalAdsRevenue,
bitverseWallet: this.bitverseWallet,
killCount: this.killCount,
rankStar: this.rankStar,
rankId: this.rankId,
rankScore: this.rankScore,
hideScore: this.hideScore,
signCount: this.signCount,
daySign: this.daySign,
initSignCount: this.initSignCount,
iconUrl: this.iconUrl,
continuityLoseCount: this.continuityLoseCount,
totalAdverCount: this.totalAdverCount,
hasCheckNewSkin: this.hasCheckNewSkin,
receiveRound: this.receiveRound,
growLevel: this.growLevel,
hasRepay: this.hasRepay,
hawkeyeFunnelIDs: this.hawkeyeFunnelIDs,
completeGuideDailyTask: this.completeGuideDailyTask,
zongZi: this.zongZi,
zongZiToDaoBi: this.zongZiToDaoBi,
shareScore: this.shareScore,
checkInviteLength: this.checkInviteLength,
extendOldRank: this.extendOldRank,
dayShowTop: this.dayShowTop,
dayRefreshPKReward: this.dayRefreshPKReward,
dayRefreshWorldReward: this.dayRefreshWorldReward,
dayFirstEnterPKTop20: this.dayFirstEnterPKTop20,
subscribeTime: this.subscribeTime,
daySubscribeReward: this.daySubscribeReward,
refuseBuyPool: this.refuseBuyPool,
refuseAdverPool: this.refuseAdverPool,
keyCount: this.keyCount,
treasureTurn: this.treasureTurn,
showKeyCount: this.showKeyCount,
hasGetKey: this.hasGetKey,
evaulateCount: this.evaulateCount,
vipWithoutInterstitial: this.vipWithoutInterstitial,
lastFreeDiamondTime: this.lastFreeDiamondTime
}, i = JSON.stringify(t);
n.setItem("userData" + this.getOsStr(), i);
o.k6_uploadData(i, e);
}
},
getUserData: function(e) {
var t = this, i = this;
switch (o.platformType) {
case s.WECHAT:
o.k6_downloadData(function(a) {
var o = null, s = null, c = n.getItem("userData" + t.getOsStr());
c && (s = JSON.parse(c));
var l = null;
a && (l = JSON.parse(a));
if (l && s) if (l.saveTime >= s.saveTime) {
r.instance.isShowLog() && console.log("数据正常，使用服务端数据,服务器时间：", new Date(l.saveTime), "本地时间：", new Date(s.saveTime));
o = l;
} else {
r.instance.isShowLog() && console.log("服务端数据过老，使用本地数据,服务器时间：", new Date(l.saveTime), "本地时间：", new Date(s.saveTime));
o = s;
} else if (l) {
r.instance.isShowLog() && console.log("本地数据为空，使用服务端数据");
o = l;
} else {
r.instance.isShowLog() && console.log("服务端数据为空，使用本地数据");
o = s;
}
i.setData(o);
e && e();
}, function() {
var a = null, o = n.getItem("userData" + t.getOsStr());
if (o) {
r.instance.isShowLog() && console.log("发行sdk获取数据失败，使用本地数据");
a = JSON.parse(o);
}
i.setData(a);
e && e();
});
break;

default:
var a = null, c = n.getItem("userData" + this.getOsStr());
c && (a = JSON.parse(c));
i.setData(a);
e && e();
}
},
getOsStr: function() {
return o.isIOS() ? "ios" : "";
},
resetDataToDefault: function() {
var e = {
name: "player",
gold: 200,
knifeSkinId: 1,
heroSkinId: 1,
ownKnifeSkins: [ 1 ],
ownHeroSkins: [ 1 ],
growLevel: [ 0, 0, 0, 0, 0 ],
bornTime: 0,
saveTime: 0,
playCount: 0,
dayKillCount: 0,
dayTotalPickKnifeCount: 0,
dayMaxPickKnifeCount: 0,
dayKillKnifeCount: 0,
dayPlayCount: 0,
dayGetPrizeCount: 0,
dayWinCount: 0,
dayRefreshTaskCount: 0,
dayLoseCount: 0,
dayWin: !1,
dayProtectCount: 0,
killCount: 0,
allShareCount: 0,
luckyRewardCount: 0,
rankStar: 0,
rankId: 0,
rankScore: 0,
hideScore: 0,
signCount: 0,
daySign: !1,
initSignCount: !1,
iconUrl: n.getRandomInt(1, 7),
adverCountDatas: [],
continuityLoseCount: 0,
totalAdverCount: 0,
hawkeyeFunnelIDs: []
};
this.setData(e);
this.saveUserData("清号");
this.clearTempData();
},
isOwnKnifeSkin: function(e) {
return n.arrContains(this.ownKnifeSkins, e);
},
isOwnHeroSkin: function(e) {
return n.arrContains(this.ownHeroSkins, e) || this.isSubscribe() && 8 === e;
},
isOwnSuit: function(e) {
var t = a.instance.getSuitData(e);
return this.isOwnHeroSkin(t.heroSkin) && this.isOwnKnifeSkin(t.knifeSkin);
},
addKnifeSkin: function(e) {
this.ownKnifeSkins.push(e);
this.saveUserData("得刀皮肤");
},
addHeroSkin: function(e) {
this.ownHeroSkins.push(e);
this.saveUserData("得英雄皮肤");
},
addCompleteTask: function(e) {
this.completeTaskIds.push(e);
this.needCheckTaskIds.push(e);
this.saveUserData("任务完成");
},
addShowTask: function(e) {
this.showTaskInGameIds.push(e);
this.saveUserData("任务游戏内展示");
},
addCompleteRankReward: function(e) {
this.completeRankRewardIds.push(e);
this.saveUserData("段位任务完成");
},
updateKnifeSkin: function(e, t) {
if (this.knifeSkinId !== e.id) {
this.knifeSkin = e;
this.knifeSkinId = e.id;
this.isDirtyKnifeSkin = !0;
}
if (t && this.isDirtyKnifeSkin) {
this.saveUserData("更换刀皮肤");
this.isDirtyKnifeSkin = !1;
}
},
updateHeroSkin: function(e, t) {
if (this.heroSkinId !== e.id) {
this.heroSkin = e;
this.heroSkinId = e.id;
this.isDirtyHeroSkin = !0;
}
if (t && this.isDirtyHeroSkin) {
this.saveUserData("更换角色皮肤");
this.isDirtyHeroSkin = !1;
}
},
setExtraKnife: function(e) {
this.extraKnifeCount = e;
this.isExtraKnife = e > 0;
},
addExtraKnife: function(e) {
this.extraKnifeCount += e;
},
clearTempData: function() {
n.setItem("fromMyApp", "");
n.setItem("trySkinData", "");
n.setItem("luckyRewardData", "");
},
setTrySkinData: function(e) {
e.trySkinCount++;
e.lastTryPlayCount = this.dayPlayCount;
var t = JSON.stringify(e);
n.setItem("trySkinData", t);
},
getTrySkinData: function() {
var e = {}, t = n.getItem("trySkinData");
if (t) e = JSON.parse(t); else {
e.trySkinCount = 0;
e.lastTrySkinType = 0;
e.lastTryPlayCount = 0;
}
return e;
},
setLuckyRewardData: function(e) {
n.setItem("luckyRewardData", e);
},
getLuckyRewardData: function() {
var e = n.getItem("luckyRewardData");
return e ? Number(e) : 0;
},
updateGold: function(e, t) {
var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
this.gold += e;
this.showGold += e;
t && (this.getGoldParam = t);
i ? this.delaySaveDataTime = 3 : this.saveUserData("更新钱");
},
updateName: function(e) {
this.name = e;
this.saveUserData("更新名字");
},
updateShareCount: function() {
this.allShareCount++;
this.saveUserData("更新分享");
},
updateLuckyRewardCount: function() {
this.luckyRewardCount++;
this.saveUserData("更新幸运大奖次数");
},
isFristGame: function() {
return 0 === this.playCount;
},
isSecGame: function() {
return 1 === this.playCount;
},
canShowPanelSign: function() {
return this.playCount >= 5;
},
canShowPanelAddTop: function() {
if (o.isApp()) return !1;
if (!this.hasPlayOnceGame) return !1;
if (this.hasGetAddTopReward()) return !1;
if (this.dayShowTop) return !1;
if (this.playCount >= 4) {
if (this.isFirstDay()) return !0;
if (this.dayPlayCount >= 1) return !0;
}
return !1;
},
canShowBtnAddTop: function() {
return this.playCount >= 4 && !this.hasGetAddTopReward();
},
canShowBtnHoliday: function() {
return a.instance.isDuringHolidayRankBtnShowTime(this.getCurTime());
},
canShowPanelHolidayRank: function() {
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>开始判定是否自动弹出暑期排行界面");
if (!this.canShowBtnHoliday()) {
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>不在活动期间，不弹出");
return !1;
}
if (this.playCount < 1) {
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>新手第一局，不弹出");
return !1;
}
if (this.checkHourSpan()) {
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>跨特定时间，弹出");
return !0;
}
if (1 === this.perPlayCount) {
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>每次登录游戏第一局出来，弹出");
return !0;
}
if (!this.myPKRankData) {
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>没有获取到我的小组排名数据，不弹出");
return !1;
}
if (this.myPKRankData.rank <= 20 && !this.dayFirstEnterPKTop20) {
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>每天第一次进前20，弹出");
this.updateDayFirstEnterPKTop20();
return !0;
}
if (!this.myOldPKRankData) {
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>没有获取到我上次的小组排名数据，不弹出");
return !1;
}
if (this.myPKRankData.rank <= 20) {
if (this.myPKRankData.rank < this.myOldPKRankData.rank) {
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>前20并且排名提升，弹出");
return !0;
}
} else if (this.myOldPKRankData.rank - this.myPKRankData.rank >= 10) {
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>不在前20并且排名提升超过十位，弹出");
return !0;
}
if (1 === this.myOldPKRankData.rank && this.myPKRankData.rank > 1) {
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>之前是第一名并且掉落位置，弹出");
return !0;
}
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>以上条件均不满足，不弹出");
return !1;
},
onGameOver: function(e) {
this.hasPlayOnceGame = !0;
var t = e.rank;
this.setExtraKnife(0);
this.playCount++;
this.perPlayCount++;
this.dayPlayCount++;
this.dayKillCount += e.killNum;
this.dayTotalPickKnifeCount += e.pickKnifeCount;
this.dayMaxPickKnifeCount = Math.max(this.dayMaxPickKnifeCount, e.maxPickKnifeCount);
this.dayKillKnifeCount += e.killKnifeCount;
this.dayWinCount = 1 === t ? this.dayWinCount + 1 : 0;
this.dayLoseCount = 1 === t ? 0 : this.dayLoseCount + 1;
this.continuityLoseCount = 1 === t ? 0 : this.continuityLoseCount + 1;
1 !== t || this.dayWin || (this.dayWin = !0);
this.updateDayMultAgainCDCount();
this.updateShowKeyCount();
this.updateEvaulateCount();
var i = n.getMilliTime(), a = Math.floor((i - this._startGameTimestamp) / 1e3);
o.hawkeye_report_game(a);
var s = !0, r = !1, c = void 0;
try {
for (var h, d = this.dailyShowTask[Symbol.iterator](); !(s = (h = d.next()).done); s = !0) {
var u = h.value;
switch (u.type) {
case l.KILL_COUNT:
u.process += e.killNum;
break;

case l.TOTAL_PICK_KNIFE_COUNT:
u.process += e.pickKnifeCount;
break;

case l.MAX_PICK_KNIFE_COUNT:
u.process = Math.max(u.process, e.maxPickKnifeCount);
break;

case l.KILL_KNIFE_COUNT:
u.process += e.killKnifeCount;
break;

case l.PLAY_COUNT:
u.process++;
break;

case l.WIN_COUNT:
1 === t && u.process++;
}
}
} catch (e) {
r = !0;
c = e;
} finally {
try {
!s && d.return && d.return();
} finally {
if (r) throw c;
}
}
this.setHolidayScore(e.killNum);
this.saveUserData("更新游戏结束");
},
onStartGame: function() {
this._startGameTimestamp = n.getMilliTime();
},
refreshUnlockGrow: function() {
var e = a.instance.clientData.growLimit;
this.playCount === e[0] ? this.showUnlockGrow = 1 : this.playCount === e[1] && (this.showUnlockGrow = 2);
},
getCurTime: function() {
return Number(new Date().getTime()) - o.timeDefence + this.cheatOffset + this.timeOffset;
},
getCurWeekDay: function() {
return new Date(this.getCurTime()).getDay();
},
getOfflineTime: function() {
var e = this.getCurTime();
e - this.getOfflineGoldTime > 864e5 && (e = this.getOfflineGoldTime + 864e5);
var t = (this.lastChangeGoldMultipTime - this.getOfflineGoldTime) % this.offlineGoldInterval, i = e - (this.lastChangeGoldMultipTime - t);
return i > 0 && i;
},
getFinalOfflineGold: function() {
var e = Math.floor(this.getOfflineTime() / this.offlineGoldInterval), t = this.getGrowLevelDataByType(h.Gold).realOfflineParam / 100 + 1;
return Math.floor(10 * (this.offlineGoldCount + e * this.offlineGoldNormalCount * t)) / 10;
},
getReceiveOfflineGoldTime: function() {
var e = this.getCurTime() - this.getOfflineGoldTime;
return e > 864e5 ? 864e5 : e;
},
getTaskProcess: function(e) {
var t = 0;
switch (e) {
case c.LOGIN:
t = this.signCount + 1;
break;

case c.PLAYCOUNT:
t = this.playCount;
break;

case c.KILLCOUNT:
t = this.killCount;
break;

case c.RANK:
t = this.rankData.id;
break;

case c.ADVERCOUNT:
t = this.totalAdverCount;
}
return t;
},
getDailyTaskProcess: function(e) {
var t = 0;
switch (e) {
case l.KILL_COUNT:
t = this.dayKillCount;
break;

case l.TOTAL_PICK_KNIFE_COUNT:
t = this.dayTotalPickKnifeCount;
break;

case l.MAX_PICK_KNIFE_COUNT:
t = this.dayMaxPickKnifeCount;
break;

case l.KILL_KNIFE_COUNT:
t = this.dayKillKnifeCount;
break;

case l.PLAY_COUNT:
t = this.dayPlayCount;
break;

case l.WIN_COUNT:
t = this.dayWinCount;
}
return t;
},
saveUserCidData: function() {
var e = {
saveTime: this.getCurTime(),
cids: o.oldVisitCids
}, t = JSON.stringify(e);
n.setItem("userCidData", t);
},
loadUserCidData: function() {
var e = n.getItem("userCidData");
if (e) {
var t = JSON.parse(e), i = t.saveTime ? n.getRealDayTimeCount(t.saveTime, this.getCurTime()) : 2;
o.oldVisitCids = i >= 2 ? [] : t.cids ? t.cids : [];
}
},
checkDaySpan: function() {
var e = this.getCurTime();
if (r.instance.isShowLog()) {
console.log("---------------------------检查是否跨天");
console.log("---------------------------上次时间：", new Date(this.saveTime));
console.log("---------------------------现在时间：", new Date(e));
}
if (n.isDaySpan(this.saveTime, e)) {
this.updateSaveTime();
this.onDaySpan();
return !0;
}
},
checkHourSpan: function() {
var e = this.getCurTime();
if (r.instance.isShowLog()) {
console.log("---------------------------检查是否跨特定小时", JSON.stringify(a.instance.holidayDatas.refreshWorldTime));
console.log("---------------------------上次时间：", new Date(this.saveTime));
console.log("---------------------------现在时间：", new Date(e));
}
if (n.isHourSpan(this.saveTime, e, a.instance.holidayDatas.refreshWorldTime)) return !0;
},
onDaySpan: function() {
this.dayTotalAdsRevenue = 0;
this.dayCanReportTotalAdsRevenue = !0;
this.dayKillCount = 0;
this.dayTotalPickKnifeCount = 0;
this.dayMaxPickKnifeCount = 0;
this.dayKillKnifeCount = 0;
this.dayPlayCount = 0;
this.dayWinCount = 0;
this.dayRefreshTaskCount = 0;
this.dayGetPrizeCount = 0;
if (!d.instance.isDuringDailyTaskGuide()) {
var e = !0, t = !1, i = void 0;
try {
for (var a, o = this.dailyShowTask[Symbol.iterator](); !(e = (a = o.next()).done); e = !0) {
a.value.process = 0;
}
} catch (e) {
t = !0;
i = e;
} finally {
try {
!e && o.return && o.return();
} finally {
if (t) throw i;
}
}
this.dailyShowTask = [];
}
this.dailyOldTask = [];
this.dayGetGoldCount = 0;
this.dayProtectCount = 0;
this.updateDayMultAgainCDCountFlag = !0;
this.dayMultAgainCloseCount = 0;
this.dayLoseCount = 0;
this.dayWin = !1;
this.daySign && this.signCount++;
this.daySign = !1;
this.dayShowTop = !1;
this.dayRefreshPKReward = !1;
this.dayRefreshWorldReward = !1;
this.dayRefreshShareScore = !1;
this.dayFirstEnterPKTop20 = !1;
this.daySubscribeReward = !1;
this.loadComplete = !0;
n.setItem("trySkinData", "");
this.saveUserData("跨天");
},
protectLevel: function(e) {
var t = e;
if (this.dayLoseCount >= 3) {
t = t > a.instance.defaultLevel ? a.instance.defaultLevel : t - 2;
return t = a.instance.clampLevel(t);
}
if (0 === this.dayPlayCount || !this.dayWin) {
t -= 2;
return t = a.instance.clampLevel(t);
}
return t;
},
clearNeedCheckTaskIds: function() {
if (this.needCheckTaskIds && this.needCheckTaskIds.length > 0) {
this.needCheckTaskIds = [];
this.saveUserData("刷新可解锁的任务id");
}
},
updateDayProtectCount: function() {
this.dayProtectCount++;
this.saveUserData("更新保星保级次数");
},
updateSignCount: function() {
this.daySign = !0;
this.saveUserData("更新签到");
},
updateDayShowTop: function() {
this.dayShowTop = !0;
this.saveUserData("更新展示置顶");
},
updateDayRefreshPKReward: function() {
this.dayRefreshPKReward = !0;
this.saveUserData("更新小组PK奖励领取");
},
updateDayRefreshWorldReward: function() {
this.dayRefreshWorldReward = !0;
this.saveUserData("更新世界PK奖励领取");
},
updateDayFirstEnterPKTop20: function() {
this.dayFirstEnterPKTop20 = !0;
this.saveUserData("更新小组PK每日首次进前20");
},
updateIconUrl: function(e) {
this.iconUrl = e;
this.saveUserData("更新头像");
},
updateAdverCountData: function(e) {
var t = this.adverCountDatas[e] ? this.adverCountDatas[e] : 0;
this.adverCountDatas[e] = t + 1;
this.saveUserData("更新累计看广告次数");
},
updateTotalAdverCount: function() {
this.totalAdverCount++;
this.changeAdverCount++;
this.saveUserData("更新累计看广告次数");
},
isFirstDay: function() {
return 1 === n.getRealDayTimeCount(this.bornTime, this.getCurTime());
},
isSecondDay: function() {
return 2 === n.getRealDayTimeCount(this.bornTime, this.getCurTime());
},
bornDay: function() {
return n.getRealDayTimeCount(this.bornTime, this.getCurTime());
},
updateContinuityLoseCount: function() {
this.continuityLoseCount = 0;
this.saveUserData("更新连败次数");
},
updateNewKnifeSkinCheck: function() {
var e = !1, t = !0, i = !1, o = void 0;
try {
for (var s, r = a.instance.knifeSkinDatas[Symbol.iterator](); !(t = (s = r.next()).done); t = !0) {
var c = s.value, l = c.newDate && n.isBeforeOtherTime(c.newDate, this.getCurTime()), h = c.id;
if (l && !n.arrContains(this.hasCheckNewSkin, h)) {
this.hasCheckNewSkin.push(h);
e = !0;
}
}
} catch (e) {
i = !0;
o = e;
} finally {
try {
!t && r.return && r.return();
} finally {
if (i) throw o;
}
}
e && this.saveUserData("更新已经查看过的新武器皮肤");
},
updateNewHeroSkinCheck: function() {
var e = !1, t = !0, i = !1, o = void 0;
try {
for (var s, r = a.instance.heroSkinDatas[Symbol.iterator](); !(t = (s = r.next()).done); t = !0) {
var c = s.value, l = c.newDate && n.isBeforeOtherTime(c.newDate, this.getCurTime()), h = 1e4 + c.id;
if (l && !n.arrContains(this.hasCheckNewSkin, h)) {
this.hasCheckNewSkin.push(h);
e = !0;
}
}
} catch (e) {
i = !0;
o = e;
} finally {
try {
!t && r.return && r.return();
} finally {
if (i) throw o;
}
}
e && this.saveUserData("更新已经查看过的新角色皮肤");
},
updateGrowLevel: function(e) {
if (e === h.Gold) {
this.offlineGoldCount = this.getFinalOfflineGold();
this.lastChangeGoldMultipTime = this.getCurTime();
}
this.growLevel[e] += 1;
},
checkDelayUpdateData: function(e) {
if (this.delaySaveDataTime > 0) {
this.delaySaveDataTime -= e;
if (this.delaySaveDataTime <= 0) {
this.delaySaveDataTime = 0;
this.needUpdateUserData = !0;
}
}
},
getGrowLevel: function(e) {
return this.growLevel[e];
},
getGrowLevelDataByType: function(e) {
var t = this.growLevel[e];
return a.instance.getGrowLevelData(e, t);
},
updateGetOfflineGoldTime: function() {
var e = this.getCurTime();
this.getOfflineGoldTime = e - (e - this.getOfflineGoldTime) % this.offlineGoldInterval;
this.lastChangeGoldMultipTime = this.getOfflineGoldTime;
this.offlineGoldCount = 0;
this.saveUserData("更新领取离线收益时间");
},
updateRepay: function() {
this.hasRepay = !0;
this.saveUserData("更新领取赔偿");
},
updateZongZiToDaoBi: function() {
this.zongZiToDaoBi = !0;
this.saveUserData("更新粽子转换钻石");
},
updateDayGetPrizeCount: function(e) {
this.dayGetPrizeCount++;
this.saveUserData("更新获取奖励次数通过 " + e);
},
updateDailyShowTask: function() {
this.dailyShowTask = a.instance.getDailyShowTask(this);
var e = !0, t = !1, i = void 0;
try {
for (var n, o = this.dailyShowTask[Symbol.iterator](); !(e = (n = o.next()).done); e = !0) {
n.value.goldMultiRate = this.rankData.goldMultiRate;
}
} catch (e) {
t = !0;
i = e;
} finally {
try {
!e && o.return && o.return();
} finally {
if (t) throw i;
}
}
this.saveUserData("更新展示任务");
},
updateDailyOldTask: function(e) {
if (-1 === this.dailyOldTask.indexOf(e)) {
this.dailyOldTask.push(e);
this.saveUserData("更新已经展示过的任务");
}
},
updateCompleteGuideDailyTask: function(e) {
this.completeGuideDailyTask.push(e);
3 === this.completeGuideDailyTask.length && this.updateDailyShowTask();
this.saveUserData("更新新手任务完成");
},
updateZongZi: function(e) {
this.zongZi += e;
this.saveUserData("更新种子数量");
},
updateDayRefreshTaskCount: function() {
this.dayRefreshTaskCount++;
this.saveUserData("更新每日刷新任务数量");
},
updateDayRefreshShareScore: function(e) {
this.shareScore = e;
this.dayRefreshShareScore = !0;
this.saveUserData("更新每日刷新分享积分标志位");
},
isDuringDailyTaskGuide: function() {
return 3 !== this.completeGuideDailyTask.length;
},
canShowMultAgain: function() {
var e = a.instance.clientData.dayMultAgainMinPlayCount;
if (this.playCount < a.instance.clientData.dayMultAgainMinPlayCount) {
r.instance.isShowLog() && console.log("战斗未满" + e + "场，不弹二次翻倍");
return !1;
}
if (this.dayMultAgainCDCount > 0) {
r.instance.isShowLog() && console.log("冷却中，不弹二次翻倍");
return !1;
}
if (this.dayMultAgainCloseCount >= 2) {
r.instance.isShowLog() && console.log("累计两次手动关闭，不弹二次翻倍");
return !1;
}
return !0;
},
updateDayMultAgainCDCount: function() {
this.dayMultAgainCDCount > 0 && this.dayMultAgainCDCount--;
this.saveUserData("更新每日 二次翻倍 冷却数");
},
resetDayMultAgainCDCount: function(e) {
this.dayMultAgainCDCount = e + 1;
this.saveUserData("重置每日 二次翻倍 冷却数");
},
updateDayMultAgainCloseCount: function() {
this.dayMultAgainCloseCount++;
this.saveUserData("更新每日 二次翻倍 关闭数");
},
updateShareScore: function() {
this.shareScore--;
this.saveUserData("更新每日分享分数 减一");
},
updateCheckInviteLength: function() {
if (this.checkInviteLength < d.instance.inviteDatas.length) {
this.checkInviteLength = d.instance.inviteDatas.length;
this.saveUserData("查看新邀请朋友");
}
},
hasGetInviteReward: function() {
return this.isOwnHeroSkin(11);
},
hasGetAddTopReward: function() {
return this.isOwnKnifeSkin(32);
},
canGetAddTopReward: function() {
return n.getItem("fromMyApp");
},
isCurEquipHeroSkin: function(e) {
return this.heroSkinId === e;
},
isCurEquipKnifeSkin: function(e) {
return this.knifeSkinId === e;
},
canShowPanelDailyTask: function() {
if (this.isDuringDailyTaskGuide()) {
var e = !0, t = !1, i = void 0;
try {
for (var a, o = this.dailyShowTask[Symbol.iterator](); !(e = (a = o.next()).done); e = !0) {
var s = a.value, r = s.process >= s.param, c = n.arrContains(d.instance.dailyOldTask, s.id) || n.arrContains(d.instance.completeGuideDailyTask, s.id), l = s.hasShow;
if (!r) return !1;
if (l) return !1;
}
} catch (e) {
t = !0;
i = e;
} finally {
try {
!e && o.return && o.return();
} finally {
if (t) throw i;
}
}
return !0;
}
var h = !0, u = !1, f = void 0;
try {
for (var p, m = this.dailyShowTask[Symbol.iterator](); !(h = (p = m.next()).done); h = !0) {
var g = p.value;
r = g.process >= g.param, c = n.arrContains(d.instance.dailyOldTask, g.id) || n.arrContains(d.instance.completeGuideDailyTask, g.id), 
l = g.hasShow;
if (r && !c && !l) return !0;
}
} catch (e) {
u = !0;
f = e;
} finally {
try {
!h && m.return && m.return();
} finally {
if (u) throw f;
}
}
return !1;
},
needUpdatePKRank: function() {
if (r.instance.isShowLog()) {
console.log("---------------------------小组PK榜刷新间隔：" + a.instance.holidayDatas.holidayPKRankInterval);
console.log("---------------------------距离上次刷新小组PK榜的时间：" + this.updatePKRankTime);
}
if (this.updatePKRankTime > a.instance.holidayDatas.holidayPKRankInterval) {
this.updatePKRankTime = 0;
return !0;
}
return !1;
},
getHolidayPKRank: function(e) {
var t = this;
console.log("---------------------------------------------------------------------------------");
var i = this.holidayPKRankData && this.holidayPKRankData.rankInfo && this.holidayPKRankData.rankInfo.length && this.myPKRankData;
if (i && !this.needUpdatePKRank()) {
r.instance.isShowLog() && console.log("---------------------------使用本地小组PK榜");
e(this.holidayPKRankData, this.myPKRankData);
} else {
if (r.instance.isShowLog()) {
i ? console.log("---------------------------需要刷新小组PK榜") : console.log("---------------------------本地小组PK榜为空");
console.log("---------------------------拉取小组PK榜");
}
o.getHolidayPKRank(function(i) {
t.myPKRankData = t.handleHolidayRankData(i);
t.holidayPKRankData = i;
t.pkSurplusTime = i.surplusTime;
if (r.instance.isShowLog()) {
console.log("---------------------------我的小组PK信息");
console.log(JSON.stringify(t.myPKRankData));
}
e(i, t.myPKRankData);
});
}
},
needUpdateWorldRank: function() {
if (this.checkHourSpan()) {
this.updateSaveTime();
return !0;
}
},
getHolidayWorldRank: function(e, t) {
var i = this;
console.log("---------------------------------------------------------------------------------");
var a = this.needUpdateWorldRank(), s = this.holidayWorldRankData[e] && this.myWorldRankData;
if (s && !a) {
r.instance.isShowLog() && console.log("---------------------------使用本地世界PK榜：" + e + "轮");
t(this.holidayWorldRankData[e], this.myWorldRankData, a);
} else {
if (r.instance.isShowLog()) {
s || console.log("---------------------------本地世界PK榜：" + e + "轮为空");
a && console.log("---------------------------跨小时需要刷新世界PK榜");
console.log("---------------------------拉取世界PK榜：" + e + "轮");
}
o.getHolidayWorldRank(e, function(o) {
var s = i.handleHolidayRankData(o);
if (0 === e) {
if (s) i.myWorldRankData = n.copyObj(s); else {
if (i.myPKRankData) {
s = {};
for (var r in i.myPKRankData) s[r] = i.myPKRankData[r];
s.rank = -1;
s.isLocal = !0;
}
i.myWorldRankData = s;
}
i.maxWorldRound = o.round;
i.worldSurplusTime = o.surplusTime;
}
i.holidayWorldRankData[e] = o;
t(o, i.myWorldRankData, a);
});
}
},
handleHolidayRankData: function(e) {
var t = null, i = e.rankInfo;
i.sort(function(e, t) {
return t.score - e.score;
});
for (var n = 0, a = i.length; n < a; n++) {
i[n].rank = n + 1;
i[n].id == o.uid && ((t = i[n]).isLocal = !0);
}
return t;
},
setHolidayScore: function(e) {
r.instance.isShowLog() && console.log("---------------------------新增排行榜分数：" + e);
o.setHolidayScore(e);
if (this.myPKRankData) {
this.myPKRankData.score += e;
this.myOldPKRankData = n.copyObj(this.myPKRankData);
}
if (this.myWorldRankData) {
this.myWorldRankData.score += e;
this.myOldWorldRankData = n.copyObj(this.myWorldRankData);
}
this.holidayPKRankData && this.handleHolidayRankData(this.holidayPKRankData);
},
updateReceiveRound: function(e, t) {
var i = (t ? "pk-" : "world-") + e;
this.receiveRound.push(i);
this.saveUserData("更新轮次奖励领取");
},
hasReceivePKRound: function(e) {
return n.arrContains(this.receiveRound, "pk-" + e);
},
hasReceiveWorldRound: function(e) {
return n.arrContains(this.receiveRound, "world-" + e);
},
updateSaveTime: function() {
this.saveTime = this.getCurTime();
this.saveUserData("跨小时");
},
clearHolidayData: function() {
r.instance.isShowLog() && console.log("---------------------------清空排行数据，强制刷新");
this.holidayPKRankData = null;
this.holidayWorldRankData = [];
this.myPKRankData = null;
this.myWorldRankData = null;
this.myOldPKRankData = null;
this.myOldWorldRankData = null;
},
updateWorldRewardDetail: function() {
var e = this;
o.getHolidayWorldRewardInfo(function(t) {
e.playerWorldRewardDetail = t;
});
},
updateSubscribeTime: function() {
this.subscribeTime = this.getCurTime() + 2592e5;
this.saveUserData("更新订阅时间");
},
updateDaySubscribeReward: function() {
this.daySubscribeReward = !0;
this.saveUserData("更新每日订阅奖励发放");
},
isSubscribe: function() {
return this.subscribeTime > this.getCurTime();
},
getCountry: function() {
this.country = o.getCountry();
this.languageCode = o.getLanguageCode();
},
canShowPanelBuySkin: function() {
if (!this.hasPlayOnceGame) return !1;
this.hasPlayOnceGame = !1;
if (!this.showPanelBuySkinFlag) return !1;
if (this.playCount < 4) return !1;
var e, t, i = a.instance.knifeSkinDatas, n = a.instance.heroSkinDatas;
this.finalGetSkin = null;
var o = !0, s = !1, r = void 0;
try {
for (var c, l = i[Symbol.iterator](); !(o = (c = l.next()).done); o = !0) {
var h = c.value;
if (0 === h.getWay && 0 === h.priceType && h.price <= this.gold && !this.isOwnKnifeSkin(h.id) && !this.isRefuseBuyTwice(h.id + 1e3)) {
e = h;
break;
}
}
} catch (e) {
s = !0;
r = e;
} finally {
try {
!o && l.return && l.return();
} finally {
if (s) throw r;
}
}
var d = !0, u = !1, f = void 0;
try {
for (var p, m = n[Symbol.iterator](); !(d = (p = m.next()).done); d = !0) {
var g = p.value;
if (0 === g.getWay && 0 === g.priceType && g.price <= this.gold && !this.isOwnHeroSkin(g.id) && !this.isRefuseBuyTwice(g.id + 2e3)) {
t = g;
break;
}
}
} catch (e) {
u = !0;
f = e;
} finally {
try {
!d && m.return && m.return();
} finally {
if (u) throw f;
}
}
this.finalGetSkin = e ? t ? e.price <= t.price ? e : t : e : t;
if (this.finalGetSkin) {
this.finalGetSkin.isGetByAdver = !1;
this.continuityCanNotBuyCount = 0;
return !0;
}
this.updateContinuityCanNotBuyCount();
if (this.playCount < 10) return !1;
if (this.continuityCanNotBuyCount < 3) return !1;
this.continuityCanNotBuyCount = 0;
var y = !0, v = !1, k = void 0;
try {
for (var C, S = i[Symbol.iterator](); !(y = (C = S.next()).done); y = !0) {
var w = C.value;
if (0 === w.getWay && 0 === w.priceType && w.price >= this.gold && !this.isOwnKnifeSkin(w.id) && !this.isRefuseAdverTwice(w.id + 1e3)) {
e = w;
break;
}
}
} catch (e) {
v = !0;
k = e;
} finally {
try {
!y && S.return && S.return();
} finally {
if (v) throw k;
}
}
var T = !0, N = !1, _ = void 0;
try {
for (var b, R = n[Symbol.iterator](); !(T = (b = R.next()).done); T = !0) {
var P = b.value;
if (0 === P.getWay && 0 === P.priceType && P.price >= this.gold && !this.isOwnHeroSkin(P.id) && !this.isRefuseAdverTwice(P.id + 2e3)) {
t = P;
break;
}
}
} catch (e) {
N = !0;
_ = e;
} finally {
try {
!T && R.return && R.return();
} finally {
if (N) throw _;
}
}
this.finalGetSkin = e ? t ? e.price <= t.price ? e : t : e : t;
if (this.finalGetSkin) {
this.finalGetSkin.isGetByAdver = !0;
return !0;
}
return !1;
},
isRefuseBuyTwice: function(e) {
return this.refuseBuyPool && this.refuseBuyPool[e] && this.refuseBuyPool[e] >= 2;
},
updateRefuseBuyPool: function(e) {
this.refuseBuyPool[e] = this.refuseBuyPool[e] ? this.refuseBuyPool[e] + 1 : 1;
this.saveUserData("更新拒绝购买皮肤次数");
},
isRefuseAdverTwice: function(e) {
return this.refuseAdverPool && this.refuseAdverPool[e] && this.refuseAdverPool[e] >= 2;
},
updateRefuseAdverPool: function(e) {
this.refuseAdverPool[e] = this.refuseAdverPool[e] ? this.refuseAdverPool[e] + 1 : 1;
this.saveUserData("更新拒绝购买皮肤次数");
},
updateContinuityCanNotBuyCount: function() {
this.continuityCanNotBuyCount++;
this.saveUserData("更新没有达到购买皮肤条件的次数");
},
getOwnKnifeSkinCount: function() {
return this.ownKnifeSkins.length;
},
getOwnHeroSkinCount: function() {
return this.ownHeroSkins.length;
},
canBuyItem: function(e) {
return !!e && (0 === e.getWay ? 0 === e.priceType ? e.price <= this.gold : e.price <= this.zongZi : void 0);
},
updateKeyCount: function() {
this.keyCount++;
this.keyCount > 3 && (this.keyCount = 3);
this.keyDirty = !0;
this.hasGetKey = !0;
this.showKeyCount = 0;
this.saveUserData("更新key数");
},
clearKeyCount: function() {
this.keyCount = 0;
this.saveUserData("清空key数");
},
updateTreasureTurn: function() {
this.treasureTurn++;
this.saveUserData("更新宝箱轮数");
},
updateShowKeyCount: function() {
this.showKeyCount++;
this.saveUserData("更新展示钥匙数");
},
canShowPanelTreasureBox: function() {
if (this.keyCount >= 3) {
this.clearKeyCount();
return !0;
}
},
canShowKeyInAI: function() {
if (this.playCount >= 0 && this.showKeyCount >= 2) return !0;
},
canShowPanelEvaulate: function() {
if (-1 !== this.evaulateCount) return 3 === this.evaulateCount || 6 === this.evaulateCount;
},
endEvaulateCount: function() {
this.evaulateCount = -1;
this.saveUserData("结束评价");
},
updateEvaulateCount: function() {
-1 !== this.evaulateCount && this.evaulateCount++;
this.saveUserData("更新评价次数");
},
updateVipWithoutInterstitial: function() {
this.vipWithoutInterstitial++;
this.saveUserData("更新vip用户屏蔽插屏");
},
getVipWithoutInterstitial: function() {
return this.vipWithoutInterstitial;
},
getLastFreeDiamondTime: function() {
return this.lastFreeDiamondTime;
},
updateLastFreeDiamondTime: function() {
this.lastFreeDiamondTime = this.getCurTime();
this.saveUserData("更新免费钻石领取时间");
},
getCanGetFreeDiamond: function() {
return this.getCurTime() - this.lastFreeDiamondTime >= 864e5;
}
});
cc._RF.pop();
}, {
ConfigData: "ConfigData",
GameData: "GameData",
PlatformMgr: "PlatformMgr",
Tools: "Tools",
Types: "Types"
} ],
PlayerDistanceSystem: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "1e784obkOFBEpOhiOiteyHK", "PlayerDistanceSystem");
cc.Class({
extends: cc.Component,
properties: {
players: [],
blocks: [],
knives: []
},
cleanUp: function() {
this.players = [];
this.blocks = [];
this.knives = [];
},
init: function(e, t, i, n) {
var a = !0, o = !1, s = void 0;
try {
for (var r, c = e[Symbol.iterator](); !(a = (r = c.next()).done); a = !0) {
var l = r.value;
this.players.push(l);
}
} catch (e) {
o = !0;
s = e;
} finally {
try {
!a && c.return && c.return();
} finally {
if (o) throw s;
}
}
var h = !0, d = !1, u = void 0;
try {
for (var f, p = i[Symbol.iterator](); !(h = (f = p.next()).done); h = !0) {
var m = f.value;
this.blocks.push(m);
}
} catch (e) {
d = !0;
u = e;
} finally {
try {
!h && p.return && p.return();
} finally {
if (d) throw u;
}
}
var g = !0, y = !1, v = void 0;
try {
for (var k, C = n[Symbol.iterator](); !(g = (k = C.next()).done); g = !0) {
var S = k.value;
this.knives.push(S);
}
} catch (e) {
y = !0;
v = e;
} finally {
try {
!g && C.return && C.return();
} finally {
if (y) throw v;
}
}
this.localPlayer = t;
},
updateGameLogic: function(e) {
var t = null, i = !0, n = !1, a = void 0;
try {
for (var o, s = this.players[Symbol.iterator](); !(i = (o = s.next()).done); i = !0) if (!(t = o.value).isDead && !t.isLocal && t.aiMgr) {
var r = !0, c = !1, l = void 0;
try {
for (var h, d = this.players[Symbol.iterator](); !(r = (h = d.next()).done); r = !0) {
var u = h.value;
u !== t && (u.isDead || u.firstDead || (u.isLocal ? t.attackRect.intersects(u.defenceRect.getRect()) ? t.aiMgr.addNearOther(u) : t.aiMgr.leaveOther(u) : t.defenceRect.intersects(u.defenceRect.getRect()) && t.aiMgr.addNearOther(u)));
}
} catch (e) {
c = !0;
l = e;
} finally {
try {
!r && d.return && d.return();
} finally {
if (c) throw l;
}
}
}
} catch (e) {
n = !0;
a = e;
} finally {
try {
!i && s.return && s.return();
} finally {
if (n) throw a;
}
}
var f = !0, p = !1, m = void 0;
try {
for (var g, y = this.players[Symbol.iterator](); !(f = (g = y.next()).done); f = !0) if (!(t = g.value).isDead && !t.isLocal && t.aiMgr) {
var v = !0, k = !1, C = void 0;
try {
for (var S, w = this.blocks[Symbol.iterator](); !(v = (S = w.next()).done); v = !0) {
var T = S.value, N = !0, _ = !1, b = void 0;
try {
for (var R, P = T.defenceRects[Symbol.iterator](); !(N = (R = P.next()).done); N = !0) {
var D = R.value;
t.defenceRect.intersects(D.getRect()) && t.aiMgr.addNearBlock(D.node);
}
} catch (e) {
_ = !0;
b = e;
} finally {
try {
!N && P.return && P.return();
} finally {
if (_) throw b;
}
}
}
} catch (e) {
k = !0;
C = e;
} finally {
try {
!v && w.return && w.return();
} finally {
if (k) throw C;
}
}
}
} catch (e) {
p = !0;
m = e;
} finally {
try {
!f && y.return && y.return();
} finally {
if (p) throw m;
}
}
var L = !0, I = !1, A = void 0;
try {
for (var M, B = this.players[Symbol.iterator](); !(L = (M = B.next()).done); L = !0) if (!(t = M.value).isDead && !t.isLocal && t.aiMgr) {
var x = !0, E = !1, F = void 0;
try {
for (var K, G = this.knives[Symbol.iterator](); !(x = (K = G.next()).done); x = !0) {
var O = K.value;
O.teamID > 0 || t.attackRect.intersects(O.defenceRect.getRect()) && t.aiMgr.addNearKnife(O);
}
} catch (e) {
E = !0;
F = e;
} finally {
try {
!x && G.return && G.return();
} finally {
if (E) throw F;
}
}
}
} catch (e) {
I = !0;
A = e;
} finally {
try {
!L && B.return && B.return();
} finally {
if (I) throw A;
}
}
}
});
cc._RF.pop();
}, {} ],
PlayerFrenzyComponent: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "7b295OCaWlI47VJgGDTgEzc", "PlayerFrenzyComponent");
var n = e("Types").FrenzyAddType, a = [ 1, 1, 300, 1e3, 1e3, 300 ], o = e("Types").BuffState, s = e("ConfigData");
cc.Class({
extends: cc.Component,
properties: {
_count: 0,
_max: 1e3,
_time: 5,
_isFrenzy: !1,
_speed: 1
},
init: function() {
var e = s.instance.getBuffDataById(o.Frenzy);
this._count = 0;
this._max = 1e3;
this._time = e.keepTime;
this._normalSpeed = 1 * this._max / this._time;
this._frenzySpeed = 1 * this._max / 5;
this._speed = this._normalSpeed;
this._normalTime = this._time;
this._frenzyTime = 5;
this.node.on("onFrenzyAdd", this.onFrenzyAdd, this);
this.node.on("onReviveFrenzyAdd", this.onFrenzyAdd, this);
},
onFrenzyAdd: function(e) {
if (!this._isFrenzy && !(e < 0 || e >= a.length)) {
this._count += a[e];
if (this._count >= this._max) {
this._count = this._max;
this._speed = e === n.tryFrenzy ? this._frenzySpeed : this._normalSpeed;
var t = e === n.tryFrenzy ? this._frenzyTime : -1;
this._isFrenzy = !0;
this.node.emit("updateBuffState", o.Frenzy, t);
}
}
},
onFrenzyEnd: function() {
this._isFrenzy = !1;
this._count = 0;
},
update: function(e) {
if (this._isFrenzy) {
this._count -= this._speed * e;
this._count <= 0 && this.onFrenzyEnd();
}
},
getFrenzyRate: function() {
return 1 * this._count / this._max;
},
isFrenzy: function() {
return this._isFrenzy;
}
});
cc._RF.pop();
}, {
ConfigData: "ConfigData",
Types: "Types"
} ],
PlayerKnivesComponent: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "189a0Y3lMJICqa9ihyGKdzn", "PlayerKnivesComponent");
var n = e("Tools"), a = (e("Types").KnifeState, [ 4, 6, 8, 9, 10, 11 ]), o = e("Types").FrenzyAddType;
cc.Class({
extends: cc.Component,
properties: {
knives: [],
flags: [],
isDirty: !1,
emitTime: 0,
index: 0,
player: null,
isSage: !1
},
init: function(e) {
var t = this;
this.player = e;
this.node.on("startGame", function(e) {
t.isGuide = e;
t.startGame = !0;
t.knives = t.knives.concat();
}, this);
this.node.on("addKnife", this.addKnife, this);
this.node.on("reduceKnife", this.reduceKnife, this);
this.node.on("resetDirty", this.resetDirty, this);
this.node.on("heroStartMove", this.heroStartMove, this);
this.node.on("heroStopMove", this.heroStopMove, this);
this.node.on("wallCollision", this.wallCollision, this);
this.node.on("isCollCircleWall", this.collCircleWall, this);
},
wallCollision: function(e) {
e && (this.isCollisionWall || this.emitAttackState());
this.isCollisionWall = e;
},
collCircleWall: function(e) {
e && (this.isCollCircleWall || this.emitAttackState());
this.isCollCircleWall = e;
},
heroStartMove: function() {
this.isMove = !0;
this.player.isDefence = !1;
this.emitAttackState();
},
heroStopMove: function() {
this.isMove = !1;
this.index = 0;
var e = this.knives.length;
this.interval = n.getIntervalByCount(e);
this.player.isDefence = !0;
this.stopMoveTime = 0;
this.flitIndex = 0;
this.limitTime = a[this.flitIndex] ? a[this.flitIndex] : a[a.length - 1] + .5 * (this.flitIndex - a.length + 1);
this.danceTime = this.limitTime / 2;
this.danceKnifeArr = [];
},
emitAttackState: function() {
for (var e = 0; e < this.knives.length; e++) if (1 !== this.flags[e]) {
var t = this.knives[e];
if (t) {
t.emit("startChangeToAttack");
this.flags[e] = 1;
}
}
},
updateLogic: function(e) {
if (!1 === this.isMove && !this.isCollisionWall && !this.isCollCircleWall) {
if (this.index >= this.knives.length) {
this.index = 0;
return;
}
this.emitTime += e;
if (this.emitTime >= this.interval / 1e3) {
if (2 !== this.flags[this.index]) {
var t = this.knives[this.index];
if (t) {
t.emit("startChangeToDefence");
this.flags[this.index] = 2;
}
}
this.index++;
this.emitTime = 0;
}
if (!this.startGame) return;
if (this.isGuide) return;
if (this.knives.length < 3) return;
this.stopMoveTime += e;
if (this.stopMoveTime > this.limitTime) {
if (i = this.knives[0]) {
i.emit("throwKnife", !0);
this.danceKnifeArr.splice(0, 1);
}
this.flitIndex++;
this.limitTime = a[this.flitIndex] ? a[this.flitIndex] : a[a.length - 1] + .5 * (this.flitIndex - a.length + 1);
}
if (this.stopMoveTime > this.danceTime) {
var i;
if (i = this.knives[0]) {
var n = this.limitTime - this.danceTime;
i.emit("dance", n);
var o = a[this.flitIndex + 1] ? a[this.flitIndex + 1] : a[a.length - 1] + .5 * (this.flitIndex + 1 - a.length + 1);
this.danceTime = (o - this.limitTime) / 2 + this.limitTime;
}
}
}
},
addKnife: function(e) {
if (this.player.isNoMoreKnife()) e.getComponent("EntityKnife").reLand(); else if (!n.arrContains(this.knives, e)) {
this.knives.push(e);
this.player.addKnifeNum(this.knives.length);
if (!0 === this.isMove || this.isCollisionWall || this.isCollCircleWall) {
e.emit("startChangeToAttack");
this.flags[this.knives.length - 1] = 1;
} else {
e.emit("startChangeToDefence");
this.flags[this.knives.length - 1] = 2;
}
e.emit("updateOwner", this.node);
this.isDirty = !0;
this.player.node.emit("onFrenzyAdd", o.pick);
}
},
reduceKnife: function(e) {
this.flags.splice(this.knives.indexOf(e), 1);
n.arrRemove(this.knives, e);
this.isDirty = !0;
e.emit("changeColliderState", !0);
this.player.node.emit("onFrenzyAdd", o.throw);
},
resetDirty: function() {
this.isDirty = !1;
},
emitAllKnivesCountChange: function() {
for (var e = this.knives.length, t = 0; t < e; t++) this.knives[t].emit("updateCount", [ t, e ]);
},
emitAllKnivesRelease: function() {
for (var e = this.knives.slice(), t = e.length, i = 0; i < t; i++) e[i] && e[i].emit("throwKnife");
e = [];
this.knives = [];
},
emitAllKnivesChangeSkin: function() {
for (var e = this.knives.length, t = 0; t < e; t++) this.knives[t] && this.knives[t].getComponent("EntityKnife").skinNode.emit("changeSkin");
},
getKnifeNum: function() {
return this.knives.length;
},
setSage: function(e) {},
changeColliderState: function(e) {
for (var t = this.knives.slice(), i = t.length, n = 0; n < i; n++) t[n] && t[n].emit("changeColliderState", e);
}
});
cc._RF.pop();
}, {
Tools: "Tools",
Types: "Types"
} ],
PlayerName: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "b97ea9FPNZGxIya8Eo04gkv", "PlayerName");
cc.Class({
extends: cc.Component,
properties: {
nickname: cc.Label,
frameNode: cc.Node
},
onLoad: function() {
this.nickname.langFlag = !0;
},
start: function() {}
});
cc._RF.pop();
}, {} ],
PlayerRankIcon: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "582d4dHk3ZCL79zTwespXA4", "PlayerRankIcon");
cc.Class({
extends: cc.Component,
properties: {
bg: cc.Node,
icon: cc.Sprite
},
start: function() {}
});
cc._RF.pop();
}, {} ],
PlayerRankItem: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "df09cXr/xJJ444Cs3fEGBmF", "PlayerRankItem");
var n = e("Tools"), a = e("Types").TEAM_COLOR, o = e("UIUtil");
cc.Class({
extends: cc.Component,
properties: {
rankSpr: cc.Sprite,
playerName: cc.Label,
playerScore: cc.Label,
flagIcon: cc.Sprite,
_rank: 0,
_needUpdate: !1,
_speed: 2,
_knifeNum: 0,
hashTag: cc.Node,
rankLabel: cc.Label,
effectNode: cc.Node,
activeNode: cc.Node,
_isDead: !1,
_time: .1
},
init: function(e) {
this.playerName.langFlag = !0;
var t = e.teamID;
this.rankSpr.node.color = a[t];
this.hashTag.color = a[t];
this.rankLabel.node.color = a[t];
this.playerName.string = e.name;
this.playerName.node.color = e.isLocal ? a[t] : a[0];
o.loadResFlag(this.flagIcon, e.country);
this._player = e;
this.playerScore.string = 0;
this._needUpdate = !1;
this._height = this.node.height;
this._speed = .3;
this._isDead = !1;
this._time = .1;
this.setNewRank(t);
},
setNewRank: function(e) {
if (e !== this._rank) {
this._lastY = -this._height * this._rank;
this._newY = -this._height * e;
this._curY = this.node.y;
this._rank = e;
this._needUpdate = !0;
this.rankLabel.string = this._rank;
}
},
update: function(e) {
if (this._isDead) if (this._time <= 0) {
this._time = 0;
this.activeNode.active = !1;
this.playerName.node.active = !1;
} else this._time -= e; else if (this._isDead === this._player.isDead) {
if (this._player.nameDirty) {
this.playerName.string = this._player.name;
this._player.nameDirty = !1;
}
this._rank !== this._player.rank && this.setNewRank(this._player.rank);
if (this._knifeNum !== this._player.getKnifeNum()) {
this._knifeNum = this._player.getKnifeNum();
this.playerScore.string = this._knifeNum;
}
if (this._needUpdate) {
this._curY = cc.misc.lerp(this._curY, this._newY, this._speed);
if (n.isFloatEqual(this._curY, this._newY)) {
this._needUpdate = !1;
this.node.y = this._newY;
this.playerName.node.y = this._newY;
} else {
this.node.y = this._curY;
this.playerName.node.y = this._curY;
}
}
} else {
this._isDead = this._player.isDead;
this.effectNode.active = !0;
}
}
});
cc._RF.pop();
}, {
Tools: "Tools",
Types: "Types",
UIUtil: "UIUtil"
} ],
PlayerRankSystem: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "f77eewg5DJKe4TRp54x1AJG", "PlayerRankSystem");
cc.Class({
extends: cc.Component,
properties: {
players: []
},
cleanUp: function() {
this.players = [];
},
init: function(e, t) {
var i = !0, n = !1, a = void 0;
try {
for (var o, s = e[Symbol.iterator](); !(i = (o = s.next()).done); i = !0) {
var r = o.value;
this.players.push(r);
}
} catch (e) {
n = !0;
a = e;
} finally {
try {
!i && s.return && s.return();
} finally {
if (n) throw a;
}
}
this.localPlayer = t;
},
updateGameLogic: function(e) {
this.players.sort(function(e, t) {
return t.getKnifeNum() - e.getKnifeNum();
});
for (var t = this.players.indexOf(this.localPlayer); t > 0 && this.players[t - 1].getKnifeNum() === this.localPlayer.getKnifeNum(); ) {
this.players[t] = this.players[t - 1];
this.players[t - 1] = this.localPlayer;
t--;
}
this.players.sort(function(e, t) {
var i = e.beKilled() ? -1 : 0;
return (t.beKilled() ? -1 : 0) - i;
});
t = 1;
var i = !0, n = !1, a = void 0;
try {
for (var o, s = this.players[Symbol.iterator](); !(i = (o = s.next()).done); i = !0) {
o.value.rank = t;
t++;
}
} catch (e) {
n = !0;
a = e;
} finally {
try {
!i && s.return && s.return();
} finally {
if (n) throw a;
}
}
}
});
cc._RF.pop();
}, {} ],
PlayerReviveFrenzyComponent: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "e9190Vlp9VG2bIS1QhaoeVK", "PlayerReviveFrenzyComponent");
var n = e("Types").FrenzyAddType, a = [ 1, 1, 300, 1e3, 1e3, 300 ], o = e("Types").BuffState, s = e("ConfigData");
cc.Class({
extends: cc.Component,
properties: {
_count: 0,
_max: 1e3,
_time: 5,
_isFrenzy: !1,
_speed: 1
},
init: function() {
var e = s.instance.getBuffDataById(o.Frenzy);
this._count = 0;
this._max = 1e3;
this._time = e.keepTime;
this._normalSpeed = 1 * this._max / this._time;
this._frenzySpeed = 1 * this._max / 5;
this._speed = this._normalSpeed;
this._normalTime = this._time;
this._frenzyTime = 5;
this.node.on("onReviveFrenzyAdd", this.onFrenzyAdd, this);
},
onFrenzyAdd: function(e) {
if (!this._isFrenzy && !(e < 0 || e >= a.length)) {
this._count += a[e];
if (this._count >= this._max) {
this._count = this._max;
this._speed = e === n.tryFrenzy ? this._frenzySpeed : this._normalSpeed;
var t = e === n.tryFrenzy ? this._frenzyTime : -1;
this._isFrenzy = !0;
this.node.emit("updateBuffState", o.Frenzy, t);
}
}
},
onFrenzyEnd: function() {
this._isFrenzy = !1;
this._count = 0;
},
update: function(e) {
if (this._isFrenzy) {
this._count -= this._speed * e;
this._count <= 0 && this.onFrenzyEnd();
}
},
getFrenzyRate: function() {
return 1 * this._count / this._max;
},
isFrenzy: function() {
return this._isFrenzy;
}
});
cc._RF.pop();
}, {
ConfigData: "ConfigData",
Types: "Types"
} ],
PlayerSuitComponent: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "aba82z3A0tD5JWAcd5stWWs", "PlayerSuitComponent");
var n = e("Types").SuitType, a = (e("ConfigData"), e("Types").KnifeState);
e("Types").KnifeMomentState;
cc.Class({
extends: cc.Component,
properties: {
buffRemainTimes: [],
lightTime: 0,
lightKeepTime: 0,
rayTime: 0
},
init: function(e) {
this.player = e;
this.changeSuit();
this.node.on("catchEnemyByBatMan", this.catchEnemyByBatMan, this);
},
changeSuit: function() {
if (this.player.suit === n.ULTRAMAN) {
this.player.rayNode.active = !0;
this.colliders = this.player.rayNode.getComponentsInChildren(cc.Collider);
for (var e = 0; e < this.colliders.length; e++) {
var t = this.colliders[e];
t.notColliderFlag = !0;
t.tag = this.player.teamID;
}
} else this.player.rayNode.active = !1;
},
updateGameLogic: function(e, t, i) {
var o = this;
if (!this.player.isStopCtrl) {
this.player.suit !== n.PIKAQIU && this.player._pikaKeepEffect.stop();
this.player.suit !== n.ULTRAMAN && this.player._ultraAttackEffect.stop();
switch (this.player.suit) {
case n.SPIDERMAN:
var s = this.player.heroScale.newScaleMultip, r = (this.player.node.scale - s) / 1.5 + s, c = 0, l = !0, h = !1, d = void 0;
try {
for (var u, f = i[Symbol.iterator](); !(l = (u = f.next()).done); l = !0) {
var p = u.value;
if (0 === p.teamID && p.knifeStateComp.state === a.Normal && !p.knifeColliderNodeCtrl.attackCollider.notColliderFlag) {
if ((b = (B = p.node.position.sub(this.player.node.position)).mag()) < 380 * r) {
c++;
B = B.normalize().mul(20);
var m = this.player.node.position;
p.draw(m);
p.knifeMoveCtrl.isSpider = !0;
p.knifeMoveCtrl.finalPosition = m;
}
}
if (c >= 1) break;
}
} catch (e) {
h = !0;
d = e;
} finally {
try {
!l && f.return && f.return();
} finally {
if (h) throw d;
}
}
break;

case n.PIKAQIU:
this.lightTime += e;
this.lightKeepTime += e;
var g = this.player._pikaAttackEffect;
if (!g) return;
if (this.lightKeepTime < 4) {
if (this.lightTime > .4) {
s = this.player.heroScale.newScaleMultip, r = (this.node.scale - s) / 1.5 + s;
var y = !0, v = !1, k = void 0;
try {
for (var C, S = i[Symbol.iterator](); !(y = (C = S.next()).done); y = !0) {
var w = C.value;
if (0 !== w.teamID && w.teamID !== this.player.teamID && w.knifeStateComp.state !== a.Normal) {
if ((b = (B = cc.v2(w.node.x, w.node.y).rotate(w.node.parent.rotation * Math.PI / 180).add(w.node.parent.position).sub(this.node.position)).mag()) < 400 * r) {
w.node.emit("throwKnife");
t.node.emit("destroyDefenceKnife", w.node);
(R = g.node.children[0]).scaleX = B.mag() / 240 / R.parent.scaleX;
var T = 0;
0 !== B.x && 0 !== B.y && (T = B.angle(cc.v2(-1, 0)) * (180 / Math.PI));
B.y < 0 && (T = -T);
R.rotation = T;
g.playOnce();
this.lightTime = 0;
break;
}
}
}
} catch (e) {
v = !0;
k = e;
} finally {
try {
!y && S.return && S.return();
} finally {
if (v) throw k;
}
}
}
} else if (this.lightKeepTime < 7) this.player._pikaKeepEffect.stop(); else {
this.lightKeepTime = 0;
this.player._pikaKeepEffect.play();
}
break;

case n.NEZHA:
this.lightTime += e;
this.lightKeepTime += e;
var N = this.player._nezhaAttackEffect.getComponent("EntityEffect");
if (!N) return;
s = this.player.heroScale.newScaleMultip, r = (this.node.scale - s) / 1.5 + s;
if (this.curKnife) {
var _ = this.curKnife, b = (B = cc.v2(_.node.x, _.node.y).rotate(_.node.parent.rotation * Math.PI / 180).add(_.node.parent.position).sub(this.node.position)).mag();
if (0 === _.teamID && b > 100 * r) {
_.knifeMoveCtrl.isNEZHA = !0;
_.knifeMoveCtrl.finalPosition = this.player.node.position;
var R = N.node;
T = 0;
0 !== B.x && 0 !== B.y && (T = B.angle(cc.v2(-1, 0)) * (180 / Math.PI));
B.y < 0 && (T = -T);
R.rotation = T - 90;
} else this.curKnife = null;
} else if (this.lightKeepTime > 0) {
var P = !0, D = !1, L = void 0;
try {
for (var I, A = i[Symbol.iterator](); !(P = (I = A.next()).done); P = !0) {
var M = I.value;
if (0 !== M.teamID && M.teamID !== this.player.teamID && M.knifeStateComp.state !== a.Normal) {
var B;
if ((b = (B = cc.v2(M.node.x, M.node.y).rotate(M.node.parent.rotation * Math.PI / 180).add(M.node.parent.position).sub(this.node.position)).mag()) < 400 * r) {
M.node.emit("throwKnife");
M.knifeMoveCtrl.setNeZhaPosition(this.player.node.position);
M.node.scale = 2;
t.node.emit("onNeZhaAttack", M.node);
(R = N.node).scaleY = b / 600;
N.playOnce();
this.lightKeepTime = 0;
this.lightTime = 0;
this.curKnife = M;
break;
}
}
}
} catch (e) {
D = !0;
L = e;
} finally {
try {
!P && A.return && A.return();
} finally {
if (D) throw L;
}
}
}
break;

case n.ULTRAMAN:
this.lightKeepTime += e;
if (this.lightKeepTime > 10) {
this.player._ultraAttackEffect.playOnce();
setTimeout(function() {
if (o && o.colliders) for (var e = 0; e < o.colliders.length; e++) {
var t = o.colliders[e];
t && (t.notColliderFlag = !1);
}
}, 2300);
setTimeout(function() {
if (o && o.colliders) for (var e = 0; e < o.colliders.length; e++) {
var t = o.colliders[e];
t && (t.notColliderFlag = !0);
}
}, 2500);
this.lightKeepTime = 0;
}
break;

case n.BATMAN:
if (!this.player.isStartGame) return;
this.lightKeepTime += e;
if (this.lightKeepTime > 12.8 && this.lightKeepTime <= 15) {
if (!this.isBefore) {
this.isBefore = !0;
this.player.myGuide.active = !0;
this.player.myGuideComp.playBeforeAnim();
}
this.player.myGuide.position = this.node.position;
this.player.myGuide.scale = this.node.scale;
}
if (this.lightKeepTime > 15 && !this.player.myGuide.canClose) {
this.player.myGuide.canClose = !0;
this.player.changeColliderState(!1);
this.player.changePosArrTarget(this.player.myGuideComp);
this.node.emit("onStopMove", !0);
this.player.changeOpacity(100);
if (this.player.moveByTouch) {
this.player.moveByTouch.touchEndEvent();
this.player.moveByTouch && this.player.moveByTouch.init(this.player.myGuideComp);
} else {
(E = this.node.getComponent("ActionMove")) && E.setTarget(this.player.myGuide);
}
this.player.myGuide.emit("onStopMove", !1);
this.player.myCamera && (this.player.myCamera.targetNode = this.player.myGuide);
this.player.myGuideComp.playStartAnim();
this.player.myGuideComp.setShadow(!0);
}
if (this.lightKeepTime > 20) {
this.lightKeepTime = 0;
this.isBefore = !1;
if (this.player.myGuide.canClose) {
this.player.myGuide.canClose = !1;
this.player.myGuide.scale = this.player.node.scale;
this.player.myGuideComp.startAnim.node.active = !1;
this.player.myGuideComp.setShadow(!1);
var x = cc.moveTo(.5, this.player.myGuide.position).easing(cc.easeBackOut(3));
this.node.runAction(x);
setTimeout(function() {
o && o.player && o.player.entityWorld && o.player.entityWorld.setTimeScale(.2);
}, 300);
setTimeout(function() {
o && o.player && o.player.myGuideComp.playEndAnim();
}, 500);
this.node.emit("onStopMove", !0);
this.player.changeOpacity(255);
if (this.player.moveByTouch) {
this.player.moveByTouch.touchEndEvent();
this.player.moveByTouch.init(this);
} else {
var E;
(E = this.node.getComponent("ActionMove")) && E.setTarget(this.node);
}
setTimeout(function() {
o && o.player && o.player.entityWorld && o.player.entityWorld.setTimeScale(1);
}, 1e3);
setTimeout(function() {
if (o && o.player) {
o.player.changeColliderState(!0);
o.player.changePosArrTarget(o.player);
o.node.emit("onStopMove", !1);
o.player.myCamera && (o.player.myCamera.targetNode = o.node);
}
}, 1500);
}
}
break;

case n.YELLOWMAN:
if (!this.player.isStartGame) return;
this.lightKeepTime += e;
if (this.player.getKnifeNum() <= 2) return;
if (this.lightKeepTime > 10) for (var F, K = 0, G = i.length; K < G; K++) if ((F = i[K]).teamID === this.player.teamID) {
F.node.emit("throwKnife");
F.node.active = !1;
this.lightKeepTime = 0;
this.player._yellowManEffect.open();
setTimeout(function() {
if (o && o.player) {
o.player.addBuff(5);
o.player.addBuff(6);
o.player.openShadow();
}
}, 1e3);
setTimeout(function() {
if (o && o.player) {
o.player.closeShadow();
o.player._yellowManEffect.closeNode();
}
}, 6e3);
break;
}
}
}
},
die: function() {
this.player._pikaKeepEffect.stop();
this.player._ultraAttackEffect.stop();
this.player._yellowManEffect.closeNode();
},
drawLighting: function(e) {
var t = this.player.ctx, i = 0;
t.moveTo(0, 0);
for (;i < 8; ) {
var n = ++i / 8, a = cc.v2(n * e.x, n * e.y);
a.x = a.x + (Math.random() - .5) * e.x;
t.lineTo(a.x, a.y);
}
t.lineTo(e.x, e.y);
t.stroke();
},
catchEnemyByBatMan: function() {
this.lightKeepTime = 999;
}
});
cc._RF.pop();
}, {
ConfigData: "ConfigData",
Types: "Types"
} ],
PoolMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "5790fWm9cZNd5S1O9W63OKn", "PoolMgr");
var n = e("Types").PoolType, a = (e("Tools"), e("GameData"));
cc.Class({
extends: cc.Component,
statics: {
instance: null
},
properties: {
poolArray: [],
prefabArray: {
default: [],
type: cc.Prefab
}
},
cleanUp: function() {
for (var e = 0; e < n.COUNT; e++) {
var t = this.poolArray[e];
t && t.clear();
}
this.poolArray = [];
},
init: function() {
for (var e = 0; e < n.COUNT; e++) {
var t = new cc.NodePool(), i = this.prefabArray[e], a = 0;
switch (e) {
case n.PLAYER:
case n.FOLLOW_PLAYER:
a = 8;
break;

case n.KNIFE:
a = 180;
break;

case n.BLOCK:
case n.BLOCK_01:
case n.BLOCK_02:
case n.BLOCK_03:
case n.BLOCK_04:
case n.BLOCK_05:
case n.BLOCK_06:
case n.BLOCK_07:
case n.BLOCK_08:
a = 2;
break;

case n.CIRCLE_BLOCK:
a = 3;
break;

case n.WALL:
a = 4;
break;

case n.CIRCLE_WALL:
a = 1;
break;

case n.COLL_EFFECT:
a = 50;
break;

case n.BUFF:
case n.BOX:
a = 10;
break;

case n.SHOW_KNIFE_EFFECT:
a = 12;
break;

case n.DODGE_EFFECT:
case n.DESTROY_DEFENCE_EFFECT:
a = 20;
break;

case n.Effect_Reborn:
a = 8;
break;

case n.NEZHA_EFFECT:
a = 20;
}
for (var o = 0; o < a; ) {
var s = cc.instantiate(i);
t.put(s);
o++;
}
this.poolArray[e] = t;
}
},
getPlayer: function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "EntityPlayer";
return this.get(n.PLAYER, e);
},
getFollowPlayer: function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "EntityFollowPlayer";
return this.get(n.FOLLOW_PLAYER, e);
},
getKnife: function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "EntityKnife";
return this.get(n.KNIFE, e);
},
getBlock: function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : n.BLOCK, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "EntityBlock";
return this.get(e, t);
},
getCircleBlock: function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "EntityBlock";
return this.get(n.CIRCLE_BLOCK, e);
},
getWall: function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "EntityWall";
return this.get(n.WALL, e);
},
getCollEffect: function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "CollEffect";
return this.get(n.COLL_EFFECT, e);
},
getDodgeEffect: function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "DodgeEffect";
return this.get(n.DODGE_EFFECT, e);
},
getRebornEffect: function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "effectReborn";
return this.get(n.Effect_Reborn, e);
},
getDestroyDefenceffect: function(e) {
return this.get(n.DESTROY_DEFENCE_EFFECT, e);
},
getNeZhaffect: function(e) {
return this.get(n.NEZHA_EFFECT, e);
},
getShowKnifeEffect: function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "ShowKnifeEffect";
return this.get(n.SHOW_KNIFE_EFFECT, e);
},
getBuff: function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "EntityBuff";
return this.get(n.BUFF, e);
},
getBox: function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "EntityBox";
return this.get(n.BOX, e);
},
getCircleWall: function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "EntityCircleWall";
return this.get(n.CIRCLE_WALL, e);
},
get: function(e, t) {
var i = this.poolArray[e];
if (i) {
var n = i.get();
if (!n) {
var o = this.prefabArray[e];
n = cc.instantiate(o);
a.instance.isShowLog() && console.log("pool of type is not enough:" + e);
}
n._pool = i;
return n;
}
cc.error("can't get pool of type:" + e);
return null;
}
});
cc._RF.pop();
}, {
GameData: "GameData",
Tools: "Tools",
Types: "Types"
} ],
PosFix: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "064d3lUbS5AfqIiz3+t45Dx", "PosFix");
cc.Class({
extends: cc.Component,
properties: {
friend: cc.Node
},
update: function(e) {
this.friend && this.node.position !== this.friend.position && (this.node.position = this.friend.position);
}
});
cc._RF.pop();
}, {} ],
PowerArrow: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "8fa4a0GdLtIS7s6660m2woS", "PowerArrow");
cc.Class({
extends: cc.Component,
properties: {
weakNode: cc.Node,
weakArrow: cc.Node,
strongNode: cc.Node,
strongArrow: cc.Node
},
refresh: function(e, t) {
var i = t.node.position.sub(e.node.position).normalize(), n = e.logicPlayer.radius, a = e.node.position.add(i.mul(n)), o = 180 * i.angle(cc.v2(0, 1)) / Math.PI;
i.x < 0 && (o = -o);
if (t.isDefence) {
this.strongNode.active && (this.strongNode.active = !1);
this.weakNode.active && (this.weakNode.active = !1);
if (e.attackPower > t.defencePower && !t._dangerousEffect.node.active) {
t._dangerousEffect.node.active = !0;
t._dangerousEffect.play();
this.isPlay = !0;
setTimeout(function() {
t._dangerousEffect.node.active = !1;
}, 1500);
}
} else if (e.isDefence) if (t.attackPower <= e.defencePower) {
this.strongNode.active || (this.strongNode.active = !0);
this.weakNode.active && (this.weakNode.active = !1);
this.strongNode.position = a;
this.strongArrow.rotation = o - 180;
} else {
this.strongNode.active && (this.strongNode.active = !1);
this.weakNode.active || (this.weakNode.active = !0);
this.weakNode.position = a;
this.weakArrow.rotation = o - 180;
} else {
this.strongNode.active && (this.strongNode.active = !1);
this.weakNode.active && (this.weakNode.active = !1);
}
},
close: function() {
this.strongNode.active && (this.strongNode.active = !1);
this.weakNode.active && (this.weakNode.active = !1);
}
});
cc._RF.pop();
}, {} ],
Quee: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "52e3f3yGcxC8INL6iamLoAp", "Quee");
var n = {
itemVals: [],
slotItems: [],
isScroll: !1,
seTimes: 20,
isReSort: !1,
unlockScroll: !1,
updateList: function(e) {
if (n.isReSort) {
if (e == n.itemVals.length - 1) return;
for (var t = n.itemVals[e], i = e + 1, a = n.itemVals.length; i < a; i++) n.itemVals[i - 1] = n.itemVals[i];
n.itemVals[a - 1] = t;
for (var o = 0; o < n.slotItems.length; o++) n.slotItems[o].getComponent("Item").updateItem(o);
}
n.unlockScroll = !0;
}
}, a = e("WeiShuSdk");
cc.Class({
extends: cc.Component,
properties: {
item_template: {
type: cc.Prefab,
default: null
},
scroll_view: {
type: cc.ScrollView,
default: null
},
dir: -1
},
onLoad: function() {
this.processCfg();
},
scrolls: function() {
if (!this.scrolling) {
this.scrolling = !0;
var e = this.scroll_view.getScrollOffset(), t = this.scroll_view.getMaxScrollOffset(), i = 1 == this.dir ? (t.x + e.x) / t.x * n.swTimes : Math.abs(e.x) / t.x * n.swTimes;
i && (1 == this.dir ? this.scroll_view.scrollToRight(i) : this.scroll_view.scrollToLeft(i));
}
},
update: function(e) {
if (n.isScroll && n.swTimes) if (n.unlockScroll) {
var t = this.scroll_view.getScrollOffset().x;
0 == t && -1 == this.dir ? this.dir = 1 : -t | 0 == this.scroll_view.getMaxScrollOffset().x | 0 && 1 == this.dir && (this.dir = -1);
this.scrolling = !1;
this.scrolls();
n.unlockScroll = !1;
} else this.scrolling = !0;
},
processCfg: function() {
var e = this, t = a.baseUrl + "Slot2End/knife666_slot.json";
cc.loader.load(t, function(t, i) {
n.itemVals = i.data;
n.isScroll = i.isScroll;
n.swTimes = i.swTimes;
n.isReSort = i.isReSort;
for (var a = e.scroll_view.content, o = 0, s = n.itemVals.length; o < s; o++) {
var r = cc.instantiate(e.item_template);
r.getComponent("Item").updateItem(o);
a.addChild(r);
n.slotItems.push(r);
}
});
}
});
t.exports = n;
cc._RF.pop();
}, {
WeiShuSdk: "WeiShuSdk"
} ],
ScaleByOwner: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "0867eiLWk9CCYc4OelZqOi3", "ScaleByOwner");
cc.Class({
extends: cc.Component,
properties: {
ownerNode: null
},
init: function(e) {
this.ownerNode = e;
},
update: function(e) {
var t = this.ownerNode.scale;
this.node.scale !== t && (this.node.scale = t);
}
});
cc._RF.pop();
}, {} ],
ScaleFix: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "c9f3a36POVD+KVIkw1sWbIf", "ScaleFix");
cc.Class({
extends: cc.Component,
properties: {},
init: function(e) {
this.ownerNode = e;
},
update: function(e) {
var t = this.ownerNode.getComponent("HeroScale").newScaleMultip, i = (this.ownerNode.scale - t) / 1.5 + t;
this.node.scale !== i && (this.node.scale = i);
}
});
cc._RF.pop();
}, {} ],
ScrollViewCulling: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "112c8gsj8JHWpoDuWN0W9eI", "ScrollViewCulling");
var n = e("ListItemBase");
cc.Class({
extends: cc.Component,
properties: {
scrollView: cc.ScrollView,
mask: cc.Mask,
layout: cc.Layout,
listItems: [ n ],
listParam: null,
startLine: -1,
endLine: -1
},
init: function(e, t) {
var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null;
this.scrollView = e;
this.listItems = t || [];
n ? this.mask = n : this.scrollView && (this.mask = this.scrollView.getComponentInChildren(cc.Mask));
a ? this.layout = a : this.scrollView && this.scrollView.content && (this.layout = this.scrollView.content.getComponent(cc.Layout));
this.scrollView && this.scrollView.node.on("scrolling", this.onScrolling, this);
this.listParam = i || {};
if (void 0 == this.listParam.listItemSize) {
var o = this.listItems && this.listItems.length > 0 ? this.listItems[0] : null;
this.listParam.listItemSize = o ? cc.size(o.node.width, o.node.height) : cc.size();
}
void 0 == this.listParam.gapSize && (this.listParam.gapSize = this.layout ? cc.size(this.layout.spacingX, this.layout.spacingY) : cc.size());
void 0 == this.listParam.listSize && (this.listParam.listSize = this.mask ? this.mask.node.getContentSize() : this.scrollView && this.scrollView.content ? this.scrollView.content.getContentSize() : this.scrollView.node.getContentSize());
void 0 == this.listParam.countPerLine && (this.listParam.countPerLine = 1);
this.listParam.lineCount = Math.ceil(this.listItems.length / this.listParam.countPerLine);
this.listParam.isHorizon && (this.isHorizon = !0);
this.onScrolling(this.scrollView);
},
getLayout: function(e) {
return e || (this.scrollView && this.scrollView.content ? this.scrollView.getComponent(cc.Layout) : null);
},
onScrolling: function(e, t) {
var i = e.getScrollOffset();
if (this.isHorizon) {
var n = -i.x, a = this.listParam.listItemSize.width + this.listParam.gapSize.width;
h = Math.floor(n / a), d = Math.floor((n + this.listParam.listSize.width) / a);
if (t || this.startLine !== h || this.endLine !== d) {
this.startLine = h;
this.endLine = d;
u = 0;
for (var o = 0; o < this.listItems.length; o++) {
var s = this.listItems[o];
if (s.node.active) {
var r = Math.floor(u / this.listParam.countPerLine);
s.setVisible(r >= this.startLine && r <= this.endLine);
u++;
}
}
}
} else {
var c = i.y, l = this.listParam.listItemSize.height + this.listParam.gapSize.height, h = Math.floor(c / l), d = Math.floor((c + this.listParam.listSize.height) / l);
if (t || this.startLine !== h || this.endLine !== d) {
this.startLine = h;
this.endLine = d;
for (var u = 0, f = 0; f < this.listItems.length; f++) {
var p = this.listItems[f];
if (p.node.active) {
var m = Math.floor(u / this.listParam.countPerLine);
p.setVisible(m >= this.startLine && m <= this.endLine);
u++;
}
}
}
}
}
});
cc._RF.pop();
}, {
ListItemBase: "ListItemBase"
} ],
ShareMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "1562ciEt2VNd7fI1H8ihmM7", "ShareMgr");
var n = e("Types").PlatformType, a = e("PlatformMgr"), o = e("Types").ShareType, s = e("Tools"), r = e("ConfigData"), c = e("PlayerData"), l = e("GameData"), h = e("AudioEngine"), d = e("mta_analysis"), u = cc.Class({
statics: {
playerUid: "",
shareTime: "",
shareFailCount: 0,
init: function() {
u.platformType = a.platformType;
u.query = null;
switch (u.platformType) {
case n.WECHAT:
wx.updateShareMenu({
withShareTicket: !0,
complete: function(e) {
console.log("updateShareMenu complete:", e);
}
});
wx.showShareMenu({
showShareItems: [ "qq", "qzone" ]
});
a.imageUrl = "https://k6-cdn.pinduoqian.cn/wechat/share/share001.jpg";
wx.onShareAppMessage(function() {
return {
title: "是时候展现真正的技术了，你的飞刀玩得6不6",
imageUrl: a.imageUrl,
query: u.createQueryString({
shareType: 0,
shareUid: a.uid
})
};
});
wx.onShow(function(e) {
console.log("wx.onShow:", JSON.stringify(e));
u.handleShare(e.query, e.shareTicket, !0);
a.hawkeye_report_share_in();
if (1022 === Number.parseInt(e.scene)) {
s.setItem("fromMyApp", 1);
u.refreshRedDot && setTimeout(function() {
u.refreshRedDot();
}, 500);
}
a.k6_userDate();
u.enterScene = e.scene;
u.isShareing = !1;
if (u.wxOnShowCallBack) {
u.wxOnShowCallBack();
u.wxOnShowCallBack = null;
}
if (e.query) if (e.query.scene) {
var t = decodeURIComponent(e.query.scene), i = new RegExp("(^|&)cid=([^&]*)(&|$)"), n = t.match(i);
if (null !== n) {
a.eolinkerChannelCode = unescape(n[2]);
console.log("eolinkerChannelCode:" + a.eolinkerChannelCode);
}
} else if (e.query.cid) {
a.eolinkerChannelCode = e.query.cid;
console.log("eolinkerChannelCode:" + a.eolinkerChannelCode);
}
});
var e = qq.getLaunchOptionsSync();
console.log("-------------launchOptions:", JSON.stringify(e));
if (1022 === Number.parseInt(e.scene)) {
s.setItem("fromMyApp", 1);
console.log("-------------来自置顶哦！！！-------------");
u.refreshRedDot && u.refreshRedDot();
}
a.eolinkerScene = e.scene;
if (e && e.query) {
u.handleShare(e.query, e.shareTicket);
if (e.query.scene) {
var t = decodeURIComponent(e.query.scene), i = new RegExp("(^|&)cid=([^&]*)(&|$)"), o = t.match(i);
if (null !== o) {
a.eolinkerChannelCode = unescape(o[2]);
console.log("eolinkerChannelCode:" + a.eolinkerChannelCode);
}
} else if (e.query.cid) {
a.eolinkerChannelCode = e.query.cid;
console.log("eolinkerChannelCode:" + a.eolinkerChannelCode);
}
}
d.App.init({
appID: "500681114",
eventID: "500681124",
lauchOpts: e,
autoReport: !0,
statParam: !0,
ignoreParams: []
});
}
},
handleShare: function(e, t, i) {
u.query = e;
var n = u.getQueryString("shareType");
if (null != n && void 0 != n && (n = parseInt(n)) !== o.NONE) {
console.log("-------分享query-------", JSON.stringify(e));
console.log("分享类型:" + n);
a.shareType = n;
a.shareRecord = u.getQueryString("shareRecord");
a.share_point = u.getQueryString("share_point");
a.share_picture = u.getQueryString("share_picture");
a.shareUid = u.getQueryString("shareUid");
}
},
getQueryString: function(e) {
switch (u.platformType) {
case n.WECHAT:
if (u.query) {
var t = u.query[e];
if (void 0 != t) return t;
}
return null;

case n.BROWSER:
return s.getQueryString(e);

default:
return null;
}
},
share: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null, s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : null, l = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : "", h = r.instance.getRandomShareBaseData(e);
if (h) {
u.curShareType = e;
u.shareTime = c.instance.getCurTime();
var d = {
queryObject: n = u.checkQueryObject(n, e),
shareText: a || h.shareStr,
panelParam: s,
shareData: h,
imageUrl: h.imageUrl,
callback: function(i) {
performance && performance.now && (cc.director._lastUpdate = performance.now());
if (i) switch (e) {
case o.UnlockSkin:
case o.Revive:
case o.MultipGold:
case o.TryOutSkin:
case o.OfflineGold:
case o.Sign:
case o.RefreshDailyTask:
case o.MultipDailyTask:
c.instance.updateDayGetPrizeCount("分享");
c.instance.updateShareScore();
}
t && t(i);
},
showUITips: i,
msgParam: l,
screenshotParam: {
imgWidth: 500,
imgHeight: 400,
offset: cc.Vec2.ZERO
},
picName: h.sharePicture
};
d.imageUrl || (d.imageUrl = "");
u.doPlatformShare(d);
} else console.error("Can't find shareData with shareType:" + e);
},
checkQueryObject: function(e, t) {
void 0 !== e && null !== e || (e = {});
void 0 === e.shareType && (e.shareType = t);
void 0 === e.uid && (e.shareUid = a.uid);
return e;
},
doPlatformShare: function(e) {
var t = e.shareText, i = e.queryObject, o = i.shareType, s = e.shareData;
e.msgParam;
void 0 === i.shareID && (i.shareID = s.id);
void 0 === i.share_point && (i.share_point = s.sharePoint);
switch (u.platformType) {
case n.WECHAT:
if (u.isShareing) return;
u.isShareing = !0;
u.wxShare = function() {
u.loadEolinkerSettings(o.toString(), t, e.imageUrl, e.picName, function(t, n, s, r) {
void 0 === i.share_picture && (i.share_picture = r);
void 0 === i.shareRecord && (i.shareRecord = u.createShareRecord());
var c = u.createQueryString(i);
h.instance.stopAllSound();
u.doWxShare(e, t, n, c);
a.hawkeye_report_share_out(o, r);
});
};
u.wxShare();
break;

case n.BROWSER:
void 0 === i.share_picture && (i.share_picture = e.picName);
if (void 0 === i.shareRecord) {
i.shareRecord = u.createShareRecord();
console.log("shareRecord: " + i.shareRecord);
}
u.createQueryString(i);
e.callback && e.callback(!0);
}
},
doWxShare: function(e, t, i, n) {
u.wxOnShowCallBack = function() {
if (u.isShareSuccess()) {
e.callback && e.callback(!0);
e.showUITips && e.showUITips(!0);
u.shareFailCount = 0;
} else if (e.showUITips) {
e.showUITips(!1);
e.callback && e.callback(!1);
} else u.showRandomFailTips(e.callback);
};
l.instance.isShowLog() && console.log("------------最终分享query-------------", n);
wx.shareAppMessage({
title: t,
imageUrl: i,
query: n,
complete: function() {
console.log("完成");
},
cancel: function() {
console.log("取消");
}
});
},
createQueryString: function(e) {
var t = "";
switch (u.platformType) {
case n.QQ:
t = JSON.stringify(e);
break;

default:
var i = !0;
for (var a in e) if (e.hasOwnProperty(a)) {
var o = a + "=" + e[a];
if (i) {
i = !1;
t = o;
} else t += "&" + o;
}
}
return t;
},
createShareRecord: function() {
var e = "";
a.uid && (e += a.uid + "a");
return e += "" + s.getTimestampS();
},
loadEolinkerSettings: function(e, t, i, o, s) {
switch (u.platformType) {
case n.WECHAT:
if (l.instance.isInReview) s && s(t, i, !1, o); else {
var r = u.handleEolinkerSettings(a.eolinkerSettings, e, t, i, o);
s && s(r.title, r.imageUrl, r.isNetImage, r.picName);
}
break;

default:
s && s(t, i, !1, o);
}
},
handleEolinkerSettings: function(e, t, i, n, a) {
var o = !1, r = e || {}, c = -1;
if ("true" == r.useSettingsFlag) {
if (r.share_random) {
if (r.share_random[t] && (c = s.getRandomItem(r.share_random[t])) >= 0 && r.share_data && r.share_data[c]) {
r.share_data[c][0] && (i = r.share_data[c][0]);
if (r.share_data[c][1]) {
n = r.share_data[c][1];
o = !0;
}
r.share_data[c][2] && (a = r.share_data[c][2]);
}
} else r.share_titles && "string" == typeof r.share_titles[t] ? i = r.share_titles[t] : void 0 !== r.share_title && r.share_title.length > 0 && (i = r.share_title);
if (r.share_imgs && "string" == typeof r.share_imgs[t]) {
n = r.share_imgs[t];
o = !0;
} else if (void 0 !== r.share_img && r.share_img.length > 0) {
n = r.share_img;
o = !0;
}
void 0 !== r.fakeShareFlag && (u.fakeShareFlag = r.fakeShareFlag);
}
l.instance.isShowLog() && console.log("shareType:" + t + " shareTitle:" + i + " shareImg:" + n);
return {
title: i,
imageUrl: n,
isNetImage: o,
picName: a
};
},
isShareSuccess: function() {
if ("false" === u.fakeShareFlag) return !0;
if (l.instance.isInReview) return !0;
if (u.curShareType === o.HOME || u.curShareType === o.WIN || u.curShareType === o.Friend) return !0;
var e = r.instance.clientData;
if (u.shareFailCount >= e.shareLimitFailCount) {
l.instance.isShowLog() && console.log("失败次数:", u.shareFailCount, "大于等于", e.shareLimitFailCount, "次  此次必定成功");
return !0;
}
var t = c.instance.getCurTime() - u.shareTime;
if (l.instance.isShowLog()) {
console.log("本次分享时间：", t);
console.log("本次分享累计失败次数：", u.shareFailCount);
console.log("本次游戏分享累计次数：", c.instance.allShareCount);
}
if (t > 1e3 * e.shareSuccessWaitTime) {
var i = s.getItemOrFinalItem(e.shareSuccessPercents, c.instance.allShareCount), n = Math.floor(100 * Math.random());
c.instance.updateShareCount();
if (n < i) {
l.instance.isShowLog() && console.log("分享概率成功:" + n + " < " + i);
return !0;
}
l.instance.isShowLog() && console.log("分享概率失败:" + n + " > " + i);
u.shareFailCount++;
return !1;
}
l.instance.isShowLog() && console.log("分享未过" + e.shareSuccessWaitTime + "秒，失败:" + t);
return !1;
},
showRandomFailTips: function(e) {
var t = r.instance.clientData.shareFailTips, i = s.getRandomItem(t);
wx.showModal({
title: "提示",
content: i,
cancelText: "知道了",
confirmText: "重新分享",
success: function(t) {
t.confirm ? u.wxShare() : e && e(!1);
}
});
}
}
});
cc._RF.pop();
}, {
AudioEngine: "AudioEngine",
ConfigData: "ConfigData",
GameData: "GameData",
PlatformMgr: "PlatformMgr",
PlayerData: "PlayerData",
Tools: "Tools",
Types: "Types",
mta_analysis: "mta_analysis"
} ],
Slot: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d9a69kLwe9BfL5XbjKMX24N", "Slot");
var n = e("PlatformMgr"), a = e("Types").PlatformType, o = e("GameData");
cc.Class({
extends: cc.Component,
properties: {
bg: cc.Sprite,
img: cc.Sprite,
lbl: cc.Label
},
onLoad: function() {
if (n.platformType === a.WECHAT) {
this.lbl.node.getComponent(cc.Label).string = [ "时下流行", "热门游戏", "好友在玩" ][3 * Math.random() | 0];
this.processCfg();
}
this.node.active = !1;
},
start: function() {},
update: function() {
this.node.active !== !o.instance.isInReview && (this.node.active = !o.instance.isInReview);
},
processCfg: function() {
var e = this, t = n.baseUrl + "Try2play/knife666_play.json";
this.listCfg = [];
cc.loader.load(t, function(t, i) {
if (t) {
cc.error(t);
e.node.active = !1;
} else {
e.node.active = !o.instance.isInReview;
var n = 5;
if (i && i.playPat && i.playPat[3]) {
e.listCfg = i.playPat[3].data;
i.main && i.main[1].swTimes && (n = i.main[1].swTimes);
e.regBoards();
e.schedule(e.regBoards, n);
}
}
});
},
regBoards: function() {
var e = this.listCfg.length;
this.curIdx = Math.random() * e | 0;
var t = this.listCfg[this.curIdx], i = this, a = n.baseUrl + "Try2play/" + t.imgUrl;
cc.loader.load(a, function(e, t) {
var n = new cc.SpriteFrame(t);
i.img.node.getComponent(cc.Sprite).spriteFrame = n;
});
},
onNav: function() {
if (this.listCfg) {
var e = this.listCfg[this.curIdx];
wx.navigateToMiniProgram && wx.navigateToMiniProgram({
appId: e.appid,
path: e.path,
success: function(t) {
console.log("nav successed");
n.adStatis(e);
}
});
}
}
});
cc._RF.pop();
}, {
GameData: "GameData",
PlatformMgr: "PlatformMgr",
Types: "Types"
} ],
SpeedShadow: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "f33fa30DY1DpZUcH0RFmOCh", "SpeedShadow");
var n = e("Tools");
cc.Class({
extends: cc.Component,
properties: {
posArr: [],
posArrMaxLength: 30,
shadowCount: 4,
shadowPool: []
},
init: function(e, t) {
var i = this;
this.canUpdate = !0;
for (var a = function(a) {
var o = i.shadowPool[a];
if (!o) {
(o = new cc.Node()).parent = t;
o.opacity = (a + 1) / i.shadowCount * 255;
i.shadowPool[a] = o;
i.posArr[a] = i.node.position;
}
o.active = !0;
var s = n.getOrAddComponent(o, "cc.Sprite");
s.spriteFrame = null;
cc.loader.loadRes(e, cc.SpriteFrame, function(e, t) {
e ? cc.error(e) : t && (s.spriteFrame = t);
});
}, o = 0; o < this.shadowCount; o++) a(o);
},
close: function() {
this.canUpdate = !1;
for (var e = 0; e < this.shadowCount; e++) {
this.shadowPool[e].active = !1;
}
},
updateGameLogic: function(e) {
this.canUpdate && this.updateShadow(.02);
},
updateShadow: function(e) {
for (var t = 0; t < this.shadowCount; t++) {
var i = this.shadowPool[t], n = i.opacity - 255 * e * 2;
if (n > 0) {
i.opacity = n;
var a = this.posArr[t].sub(this.node.position);
i.position = a;
} else {
i.position = cc.v2(0, 0);
this.posArr[t] = this.node.position;
i.opacity = 255 + n;
}
i.scale = i.opacity / 255 * .5 + .5;
}
}
});
cc._RF.pop();
}, {
Tools: "Tools"
} ],
TaskMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "8990aS/+RVPVbLJvBHb8W4O", "TaskMgr");
var n = e("Tools"), a = e("ConfigData"), o = e("PlayerData"), s = e("Types").TaskType, r = e("Types").ItemType, c = e("AdvertMgr");
cc.Class({
extends: cc.Component,
properties: {
showList: []
},
init: function(e) {
this.world = e;
this.tasks = a.instance.getTasks();
},
checkTaskInHome: function() {
var e = !0, t = !1, i = void 0;
try {
for (var a, r = this.tasks[Symbol.iterator](); !(e = (a = r.next()).done); e = !0) {
var c = a.value, l = 0;
switch (c.type) {
case s.LOGIN:
l = o.instance.signCount + 1;
break;

case s.PLAYCOUNT:
l = o.instance.playCount;
break;

case s.KILLCOUNT:
l = o.instance.killCount;
break;

case s.RANK:
l = o.instance.rankData.id;
break;

case s.ADVERCOUNT:
l = o.instance.totalAdverCount;
}
o.instance.taskProcess[c.id] = l;
if (l >= c.param && !n.arrContains(o.instance.completeTaskIds, c.id)) {
o.instance.addCompleteTask(c.id);
this.world.uiMgr.refreshRedDot();
if (c.type !== s.LOGIN) return c;
}
}
} catch (e) {
t = !0;
i = e;
} finally {
try {
!e && r.return && r.return();
} finally {
if (t) throw i;
}
}
},
refreshTaskInHome: function(e) {
var t = this, i = this.world, s = this.checkTaskInHome();
if (s) {
o.instance.showPanelBuySkinFlag = !1;
switch (s.rewardType) {
case r.HERO_SKIN:
var l = a.instance.getHeroSkinById(s.rewardId);
if (!n.arrContains(o.instance.ownHeroSkins, l.id)) if (0 !== l.unlockWay) c.instance.canGetAdver ? i.uiMgr.showReward(l, function(r) {
if (r) {
o.instance.addHeroSkin(s.rewardId);
i.onEquipHeroSkin(l, !0);
i.uiMgr.refreshRedDot();
var c = a.instance.getLanguageStr(l.name);
i.uiMgr.showTips(n.getStringByFormat(a.instance.getUITipStr(18), c));
}
t.refreshTaskInHome(e);
}, function() {
i.uiMgr.showTips(4);
}) : t.refreshTaskInHome(e); else {
o.instance.addHeroSkin(s.rewardId);
i.onEquipHeroSkin(l, !0);
i.uiMgr.refreshRedDot();
i.uiMgr.showReward(l, function() {
t.refreshTaskInHome(e);
});
}
break;

case r.KNIFE_SKIN:
l = a.instance.getKnifeSkinById(s.rewardId);
if (!n.arrContains(o.instance.ownKnifeSkins, l.id)) if (0 !== l.unlockWay) c.instance.canGetAdver ? i.uiMgr.showReward(l, function(r) {
if (r) {
o.instance.addKnifeSkin(s.rewardId);
i.onEquipKnifeSkin(l, !0);
i.uiMgr.refreshRedDot();
var c = a.instance.getLanguageStr(l.name);
i.uiMgr.showTips(n.getStringByFormat(a.instance.getUITipStr(18), c));
}
t.refreshTaskInHome(e);
}, function() {
i.uiMgr.showTips(4);
}) : t.refreshTaskInHome(e); else {
o.instance.addKnifeSkin(s.rewardId);
i.onEquipKnifeSkin(l, !0);
i.uiMgr.refreshRedDot();
i.uiMgr.showReward(l, function() {
t.refreshTaskInHome(e);
});
}
}
} else e && e();
},
checkTaskInGame: function() {
var e = !0, t = !1, i = void 0;
try {
for (var a, r = this.tasks[Symbol.iterator](); !(e = (a = r.next()).done); e = !0) {
var c = a.value, l = 0;
switch (c.type) {
case s.LOGIN:
l = o.instance.signCount + 1;
break;

case s.PLAYCOUNT:
l = o.instance.playCount;
break;

case s.KILLCOUNT:
l = o.instance.killCount;
break;

case s.RANK:
l = o.instance.rankData.id;
break;

case s.ADVERCOUNT:
l = o.instance.totalAdverCount;
}
o.instance.taskProcess[c.id] = l;
if (l >= c.param && !n.arrContains(o.instance.showTaskInGameIds, c.id) && !n.arrContains(o.instance.completeTaskIds, c.id)) {
o.instance.addShowTask(c.id);
this.showList.push(c);
}
}
} catch (e) {
t = !0;
i = e;
} finally {
try {
!e && r.return && r.return();
} finally {
if (t) throw i;
}
}
},
refreshTaskInGame: function() {
this.checkTaskInGame();
}
});
cc._RF.pop();
}, {
AdvertMgr: "AdvertMgr",
ConfigData: "ConfigData",
PlayerData: "PlayerData",
Tools: "Tools",
Types: "Types"
} ],
TestNodePool: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d60a0VaUjxOALBpBuEcxVBO", "TestNodePool");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.node.getComponent("EntityEffect").recycleAfterAnim();
}
});
cc._RF.pop();
}, {} ],
TestTimer: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "df866WugHxK9b6wNU18c746", "TestTimer");
var n = e("Tools"), a = e("GameData");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {
a.init();
console.log("curTime: " + n.getTimestampMS());
a.instance._curTime = n.getTimestampMS();
for (var e = function() {}, t = 0; t < 1e4; t++) setTimeout(e, 100 * t);
a.instance.logUseTime();
}
});
cc._RF.pop();
}, {
GameData: "GameData",
Tools: "Tools"
} ],
Tools: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "e8f0eOpCkVEcK0VZJncJpkD", "Tools");
var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, a = (e("querystring"), null), o = !1, s = !1, r = !1, c = parseFloat("1.192092896e-07F"), l = cc.v2(1e4, 1e4), h = cc.Class({
statics: {
systemInfo: null,
isH5: !1,
init: function(e, t) {
if (cc.sys.platform === cc.sys.WECHAT_GAME) {
a = null;
o = !0;
if (t) {
h.systemInfo = t;
r = "devtools" == h.systemInfo.platform;
}
} else cc.sys.platform === cc.sys.QQ_PLAY && (s = !0);
},
cleanUp: function(e) {
if (e && e.node) {
cc.game.isPersistRootNode(e.node) && cc.game.removePersistRootNode(e.node);
e.node.destroy();
}
},
setNodeVisible: function(e, t) {
e && (e._customInvisibleFlag = !t);
},
setNodeColor: function(e, t) {
if (e) {
e.color = t;
var i = e.getComponent(cc.ParticleSystem);
if (i) {
i.startColor = t;
i.endColor = t;
}
var n = e.children;
if (n && n.length > 0) for (var a = 0; a < n.length; a++) {
var o = n[a];
h.setNodeColor(o, t);
}
}
},
setNodeOpacity: function(e, t) {
e && (e.opacity = t);
},
isNodeVisible: function(e) {
return e && e.opacity > 0 && !0 !== e._customInvisibleFlag;
},
getNodeToCameraPoint: function(e, t, i) {
var n = e && e.parent ? e.parent.convertToWorldSpaceAR(t) : t;
return i.getWorldToCameraPoint(n);
},
isEmptyObject: function(e) {
return null !== e && 0 === Object.keys(e).length && e.constructor === Object;
},
getUuid: function() {
return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
var t = 16 * Math.random() | 0;
return ("x" == e ? t : 3 & t | 8).toString(16);
});
},
getMd5Url: function(e) {
cc.loader.md5Pipe && (e = cc.loader.md5Pipe.transformURL(e));
return e;
},
getRawUrl: function(e) {
var t = cc.url.raw(e);
return h.getMd5Url(t);
},
getRemoteRawUrl: function(e) {
if (!e) return "";
var t = "";
if (h.isH5) {
t = (t = h.getUrlWithoutQueryString()).substring(0, t.lastIndexOf("/") + 1);
t += h.getRawUrl(e);
} else s ? t = qqPlayDownloader.REMOTE_SERVER_ROOT + "/" + h.getRawUrl(e) : o && (t = wxDownloader.REMOTE_SERVER_ROOT + "/" + h.getRawUrl(e));
return t;
},
getConstructor: function(e) {
if (!e) {
cc.errorID(3804);
return null;
}
return "string" == typeof e ? cc.js.getClassByName(e) : e;
},
getOrAddComponent: function(e, t) {
if (e && t) {
var i = e.getComponent(t);
i || (i = e.addComponent(t));
return i;
}
return null;
},
getMilliTime: function() {
if (null === a) if (window.performance.now) {
0;
a = o ? r ? function() {
return wx.getPerformance().now();
} : function() {
return wx.getPerformance().now() / 1e3;
} : function() {
return window.performance.now();
};
} else if (window.performance.webkitNow) {
0;
a = function() {
return window.performance.webkitNow();
};
} else {
0;
a = function() {
return new Date().getTime();
};
}
return a();
},
getTimestampMS: function() {
return Math.floor(Date.now());
},
getTimestampS: function() {
return Math.floor(h.getTimestampMS() / 1e3);
},
getNearestPastWeeklyTimestamp: function(e, t) {
var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, n = (i = null == i ? new Date() : new Date(i)).getDay(), a = i.getHours(), o = i.getMinutes(), s = i.getSeconds(), r = i.getMilliseconds(), c = 0;
if (n > e || n === e && a >= t) c = r + 1e3 * (s + 60 * o + 60 * (a - t) * 60 + 24 * (n - e) * 60 * 60); else {
c = r + 1e3 * (s + 60 * o + 60 * a * 60 + 24 * n * 60 * 60) - 60 * t * 60 * 1e3;
n !== e && (c -= 24 * (e - n) * 60 * 60 * 1e3);
c += 5184e5;
}
var l = i.getTime();
return l -= c;
},
isBetweenRange: function(e, t) {
return e >= t[0] && e <= t[1];
},
getRandomInt: function(e, t) {
e = Math.ceil(e);
t = Math.floor(t);
return Math.floor(Math.random() * (t - e)) + e;
},
getRandomFloat: function(e, t) {
return Math.random() * (t - e) + e;
},
getRandomBool: function() {
return h.getRandomInt(0, 100) % 2 == 0;
},
getRandomIndex: function(e) {
return h.getRandomInt(0, e.length);
},
getRandomItem: function(e) {
return e && e.length > 0 ? e[h.getRandomIndex(e)] : null;
},
getItemOrFinalItem: function(e, t) {
return e[t] ? e[t] : e[e.length - 1];
},
getItemById: function(e, t) {
var i = !0, n = !1, a = void 0;
try {
for (var o, s = e[Symbol.iterator](); !(i = (o = s.next()).done); i = !0) {
var r = o.value;
if (r.id === t) return r;
}
} catch (e) {
n = !0;
a = e;
} finally {
try {
!i && s.return && s.return();
} finally {
if (n) throw a;
}
}
},
compareVec2: function(e, t) {
var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : .01;
return e.sub(t).magSqr() < i;
},
compareVec2Float: function(e, t) {
return e.x == t.x && e.y == t.y;
},
isFloatEqual: function(e, t) {
return Math.abs(e - t) < .01;
},
inverseLerp: function(e, t, i) {
if (e !== t) {
return (i - e) / (t - e);
}
return 1;
},
setAccDivFunc: function() {
Number.prototype.div = function(e) {
return h.accDiv(this, e);
};
},
accDiv: function(e, t) {
var i = 0, n = 0;
try {
i = e.toString().split(".")[1].length;
} catch (e) {}
try {
n = t.toString().split(".")[1].length;
} catch (e) {}
return Number(e.toString().replace(".", "")) / Number(t.toString().replace(".", "")) * Math.pow(10, n - i);
},
smoothDamp: function(e, t, i, n, a, o) {
var s = 2 / (n = Math.max(1e-4, n)), r = s * o, c = 1 / (1 + r + .48 * r * r + .235 * r * r * r), l = e - t, d = t, u = a * n, f = (i + s * (l = h.clamp(l, -u, u))) * o;
i = (i - s * f) * c;
var p = (t = e - l) + (l + f) * c;
d - e > 0 == p > d && (i = ((p = d) - d) / o);
return [ p, i ];
},
splitToNumList: function(e) {
for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ",", i = e.split(t), n = [], a = 0; a < i.length; a++) i[a].length > 0 && n.push(Number(i[a]));
return n;
},
getVec2MagSqr: function(e) {
return e.x * e.x + e.y * e.y;
},
getStrLength: function(e) {
for (var t = 0, i = e.length, n = -1, a = 0; a < i; a++) t += (n = e.charCodeAt(a)) >= 0 && n <= 128 ? 1 : 2;
return t;
},
subStrByCharacter: function(e, t) {
for (var i = 0, n = 0, a = -1, o = 0; o < e.length && !((n += (a = e.charCodeAt(o)) >= 0 && a <= 128 ? 1 : 2) > t); o++) i += 1;
return e.substring(0, i);
},
getUrlWithoutQueryString: function() {
return [ location.protocol, "//", location.host, location.pathname ].join("");
},
getQueryString: function(e, t) {
t || (t = location.href);
e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
var i = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(t);
return null == i ? null : i[1];
},
webCopyString: function(e) {
var t = e, i = document.createElement("textarea");
i.value = t;
i.setAttribute("readonly", "");
i.style.contain = "strict";
i.style.position = "absolute";
i.style.left = "-9999px";
i.style.fontSize = "12pt";
var n = getSelection(), a = !1;
n.rangeCount > 0 && (a = n.getRangeAt(0));
document.body.appendChild(i);
i.select();
i.selectionStart = 0;
i.selectionEnd = t.length;
var o = !1;
try {
o = document.execCommand("copy");
} catch (e) {}
document.body.removeChild(i);
if (a) {
n.removeAllRanges();
n.addRange(a);
}
return o;
},
getMd5: function(e) {
function t(e, t) {
return e << t | e >>> 32 - t;
}
function i(e, t) {
var i, n, a, o, s;
a = 2147483648 & e;
o = 2147483648 & t;
s = (1073741823 & e) + (1073741823 & t);
return (i = 1073741824 & e) & (n = 1073741824 & t) ? 2147483648 ^ s ^ a ^ o : i | n ? 1073741824 & s ? 3221225472 ^ s ^ a ^ o : 1073741824 ^ s ^ a ^ o : s ^ a ^ o;
}
function n(e, t, i) {
return e & t | ~e & i;
}
function a(e, t, i) {
return e & i | t & ~i;
}
function o(e, t, i) {
return e ^ t ^ i;
}
function s(e, t, i) {
return t ^ (e | ~i);
}
function r(e, a, o, s, r, c, l) {
return i(t(e = i(e, i(i(n(a, o, s), r), l)), c), a);
}
function c(e, n, o, s, r, c, l) {
return i(t(e = i(e, i(i(a(n, o, s), r), l)), c), n);
}
function l(e, n, a, s, r, c, l) {
return i(t(e = i(e, i(i(o(n, a, s), r), l)), c), n);
}
function h(e, n, a, o, r, c, l) {
return i(t(e = i(e, i(i(s(n, a, o), r), l)), c), n);
}
function d(e) {
var t, i = "", n = "";
for (t = 0; t <= 3; t++) i += (n = "0" + (e >>> 8 * t & 255).toString(16)).substr(n.length - 2, 2);
return i;
}
var u, f, p, m, g, y, v, k, C, S = Array();
S = function(e) {
for (var t, i = e.length, n = i + 8, a = 16 * ((n - n % 64) / 64 + 1), o = Array(a - 1), s = 0, r = 0; r < i; ) {
s = r % 4 * 8;
o[t = (r - r % 4) / 4] = o[t] | e.charCodeAt(r) << s;
r++;
}
s = r % 4 * 8;
o[t = (r - r % 4) / 4] = o[t] | 128 << s;
o[a - 2] = i << 3;
o[a - 1] = i >>> 29;
return o;
}(e = function(e) {
e = e.replace(/rn/g, "n");
for (var t = "", i = 0; i < e.length; i++) {
var n = e.charCodeAt(i);
if (n < 128) t += String.fromCharCode(n); else if (n > 127 && n < 2048) {
t += String.fromCharCode(n >> 6 | 192);
t += String.fromCharCode(63 & n | 128);
} else {
t += String.fromCharCode(n >> 12 | 224);
t += String.fromCharCode(n >> 6 & 63 | 128);
t += String.fromCharCode(63 & n | 128);
}
}
return t;
}(e));
y = 1732584193;
v = 4023233417;
k = 2562383102;
C = 271733878;
for (u = 0; u < S.length; u += 16) {
f = y;
p = v;
m = k;
g = C;
v = h(v = h(v = h(v = h(v = l(v = l(v = l(v = l(v = c(v = c(v = c(v = c(v = r(v = r(v = r(v = r(v, k = r(k, C = r(C, y = r(y, v, k, C, S[u + 0], 7, 3614090360), v, k, S[u + 1], 12, 3905402710), y, v, S[u + 2], 17, 606105819), C, y, S[u + 3], 22, 3250441966), k = r(k, C = r(C, y = r(y, v, k, C, S[u + 4], 7, 4118548399), v, k, S[u + 5], 12, 1200080426), y, v, S[u + 6], 17, 2821735955), C, y, S[u + 7], 22, 4249261313), k = r(k, C = r(C, y = r(y, v, k, C, S[u + 8], 7, 1770035416), v, k, S[u + 9], 12, 2336552879), y, v, S[u + 10], 17, 4294925233), C, y, S[u + 11], 22, 2304563134), k = r(k, C = r(C, y = r(y, v, k, C, S[u + 12], 7, 1804603682), v, k, S[u + 13], 12, 4254626195), y, v, S[u + 14], 17, 2792965006), C, y, S[u + 15], 22, 1236535329), k = c(k, C = c(C, y = c(y, v, k, C, S[u + 1], 5, 4129170786), v, k, S[u + 6], 9, 3225465664), y, v, S[u + 11], 14, 643717713), C, y, S[u + 0], 20, 3921069994), k = c(k, C = c(C, y = c(y, v, k, C, S[u + 5], 5, 3593408605), v, k, S[u + 10], 9, 38016083), y, v, S[u + 15], 14, 3634488961), C, y, S[u + 4], 20, 3889429448), k = c(k, C = c(C, y = c(y, v, k, C, S[u + 9], 5, 568446438), v, k, S[u + 14], 9, 3275163606), y, v, S[u + 3], 14, 4107603335), C, y, S[u + 8], 20, 1163531501), k = c(k, C = c(C, y = c(y, v, k, C, S[u + 13], 5, 2850285829), v, k, S[u + 2], 9, 4243563512), y, v, S[u + 7], 14, 1735328473), C, y, S[u + 12], 20, 2368359562), k = l(k, C = l(C, y = l(y, v, k, C, S[u + 5], 4, 4294588738), v, k, S[u + 8], 11, 2272392833), y, v, S[u + 11], 16, 1839030562), C, y, S[u + 14], 23, 4259657740), k = l(k, C = l(C, y = l(y, v, k, C, S[u + 1], 4, 2763975236), v, k, S[u + 4], 11, 1272893353), y, v, S[u + 7], 16, 4139469664), C, y, S[u + 10], 23, 3200236656), k = l(k, C = l(C, y = l(y, v, k, C, S[u + 13], 4, 681279174), v, k, S[u + 0], 11, 3936430074), y, v, S[u + 3], 16, 3572445317), C, y, S[u + 6], 23, 76029189), k = l(k, C = l(C, y = l(y, v, k, C, S[u + 9], 4, 3654602809), v, k, S[u + 12], 11, 3873151461), y, v, S[u + 15], 16, 530742520), C, y, S[u + 2], 23, 3299628645), k = h(k, C = h(C, y = h(y, v, k, C, S[u + 0], 6, 4096336452), v, k, S[u + 7], 10, 1126891415), y, v, S[u + 14], 15, 2878612391), C, y, S[u + 5], 21, 4237533241), k = h(k, C = h(C, y = h(y, v, k, C, S[u + 12], 6, 1700485571), v, k, S[u + 3], 10, 2399980690), y, v, S[u + 10], 15, 4293915773), C, y, S[u + 1], 21, 2240044497), k = h(k, C = h(C, y = h(y, v, k, C, S[u + 8], 6, 1873313359), v, k, S[u + 15], 10, 4264355552), y, v, S[u + 6], 15, 2734768916), C, y, S[u + 13], 21, 1309151649), k = h(k, C = h(C, y = h(y, v, k, C, S[u + 4], 6, 4149444226), v, k, S[u + 11], 10, 3174756917), y, v, S[u + 2], 15, 718787259), C, y, S[u + 9], 21, 3951481745);
y = i(y, f);
v = i(v, p);
k = i(k, m);
C = i(C, g);
}
return (d(y) + d(v) + d(k) + d(C)).toLowerCase();
},
clamp: function(e, t, i) {
return Math.max(e, Math.min(t, i));
},
isOutOfScreen: function(e) {
var t = cc.winSize;
return Math.abs(e.x) > t.width / 2 || Math.abs(e.y) > t.height / 2;
},
isStringInteger: function(e) {
return /^\+?(0|[1-9]\d*)$/.test(e);
},
compareVersionStr: function(e, t) {
if (e === t) return 0;
for (var i = e.split("."), n = t.split("."), a = Math.min(i.length, n.length), o = 0; o < a; o++) {
if (parseInt(i[o]) > parseInt(n[o])) return 1;
if (parseInt(i[o]) < parseInt(n[o])) return -1;
}
return i.length > n.length ? 1 : i.length < n.length ? -1 : 0;
},
getShowNickName: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 12;
return h.getStrLength(e) > t ? h.subStrByCharacter(e, t) + "..." : e;
},
getStringByFormat: function(e, t) {
var i = e;
if (arguments.length > 0) if (2 === arguments.length && "object" == ("undefined" == typeof t ? "undefined" : n(t))) {
for (var a in t) if (void 0 !== t[a]) {
var o = new RegExp("({" + a + "})", "g");
i = i.replace(o, t[a]);
}
} else for (var s = 1; s < arguments.length; s++) if (void 0 !== arguments[s]) {
var r = new RegExp("({)" + s + "(})", "g");
i = i.replace(r, arguments[s]);
}
return i;
},
rotationVectorToInt: function(e) {
var t = 0;
if (e) if (this.compareVec2(e, cc.Vec2.ZERO)) t = 0; else {
(t = h.vec2SignAngle(cc.Vec2.UP, e)) <= 5e-4 && (t += 2 * Math.PI);
t = Math.round(1e3 * t);
}
return t;
},
rotationIntToVector: function(e) {
if (0 === e) return cc.Vec2.ZERO;
var t = e / 1e3;
return cc.Vec2.UP.rotate(-t);
},
getDigitFactor: function(e, t) {
return null === e || void 0 === e || e <= 0 ? 1 : 1 == e ? t ? .1 : 10 : Math.pow(t ? .1 : 10, e);
},
getIntVec2: function(e, t) {
var i = cc.v2();
i.set(e);
var n = this.getDigitFactor(t, !0);
n < 1 && i.mulSelf(n);
return i;
},
getFloatParsedByInt: function(e, t) {
return e * this.getDigitFactor(t, !0);
},
checkDownKillWeaponType: function(e) {
return e >= 0 ? 0 : e > -1e3 ? 1 : 2;
},
getTimeCount: function(e, t) {
this.timeCount = {};
var i = (t - e) / 1e3;
this.timeCount.day = Math.floor(i / 86400);
this.timeCount.hour = Math.floor(i % 86400 / 3600);
this.timeCount.minute = Math.floor(i % 86400 % 3600 / 60);
this.timeCount.second = Math.floor(i % 86400 % 3600 % 60);
return this.timeCount;
},
getDayTimeCount: function(e, t) {
var i = (t - e) / 1e3;
return Math.ceil(i / 86400);
},
getRealDayTimeCount: function(e, t) {
var i = (t - new Date(new Date(new Date(e).toLocaleDateString()).getTime()).getTime()) / 1e3;
return Math.ceil(i / 86400);
},
getRemainTimeStr: function(e, t) {
var i = this.getTimeCount(e, t);
return h.getNumStr(24 * i.day + i.hour) + ":" + h.getNumStr(i.minute) + ":" + h.getNumStr(i.second);
},
getNumStr: function(e) {
return e < 0 ? 0 : e < 10 ? "0" + e : e;
},
getRemainTimeLongStr: function(e, t) {
var i = this.getTimeCount(e, t);
return i.day > 0 ? i.day + "天" + i.hour + "小时" : i.hour > 0 ? i.hour + "小时" + i.minute + "分钟" : i.minute > 0 ? i.minute + "分" + i.second + "秒" : "0分0秒";
},
getRemainTimeShortStr: function(e, t) {
var i = this.getTimeCount(e, t);
return i.day > 0 ? i.day + 1 + "天" : i.hour > 0 ? i.hour + 1 + "小时" : i.minute > 0 ? i.minute + 1 + "分" : i.second > 0 ? i.second + "秒" : "0秒";
},
timestampToTime: function(e) {
var t = new Date(e);
return t.getFullYear() + "-" + ((t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1) + "-") + t.getDate();
},
timestampToSecond: function(e) {
var t = new Date(e);
return t.getHours() + "-" + (t.getMinutes() + "-") + t.getSeconds();
},
isAfterOtherTime: function(e, t) {
return t > h.getTimeStampByTimeStr(e);
},
isBeforeOtherTime: function(e, t) {
return t < h.getTimeStampByTimeStr(e);
},
isAfterCheckTime: function(e) {
var t = new Date(e);
console.log("当前时间", t);
t.setHours(0);
t.setMinutes(2);
t.setSeconds(0);
console.log("检查点", t);
var i = this.isAfterOtherTime(t, e);
console.log("结果", i);
return i;
},
isBetweenTwoTime: function(e, t, i) {
var n = h.getTimeStampByTimeStr(e), a = h.getTimeStampByTimeStr(t);
return i > n && i < a;
},
filterDataByTime: function(e, t, i, n, a, o, s) {
for (var r = e.length - 1; r >= 0; r--) {
var c = e[r], l = c.startDate_2 && h.isBeforeOtherTime(c.startDate_2, i), d = c.endDate_2 && h.isAfterOtherTime(c.endDate_2, i);
if (c.startDate_2 && !l && !d) {
c.getWay = 0;
c.introduce = c.introduce_2;
}
if (-1 === t.indexOf(c.id)) {
var u = c.startDate && h.isBeforeOtherTime(c.startDate, i), f = c.endDate && h.isAfterOtherTime(c.endDate, i);
(u || f) && (l || d) ? e.splice(r, 1) : (n.isInReview || a) && c.isHideInReview ? e.splice(r, 1) : o && c.isHideInIOS ? e.splice(r, 1) : s && c.isHideInAndroidApp && e.splice(r, 1);
}
}
},
isBetweenTimeRange: function(e, t) {
if (!e) return !1;
var i = e.split(";"), n = [], a = !0, o = !1, s = void 0;
try {
for (var r, c = i[Symbol.iterator](); !(a = (r = c.next()).done); a = !0) {
var l = r.value, h = this.splitToNumList(l), d = {};
d.startHour = h[0];
d.endHour = h[1];
d.endHour < 0 && (d.endHour = 0);
n.push(d);
}
} catch (e) {
o = !0;
s = e;
} finally {
try {
!a && c.return && c.return();
} finally {
if (o) throw s;
}
}
var u = new Date(t).getHours(), f = !0, p = !1, m = void 0;
try {
for (var g, y = n[Symbol.iterator](); !(f = (g = y.next()).done); f = !0) {
var v = g.value;
if (u >= v.startHour && u < v.endHour) return !0;
}
} catch (e) {
p = !0;
m = e;
} finally {
try {
!f && y.return && y.return();
} finally {
if (p) throw m;
}
}
return !1;
},
isBetweenCountRange: function(e, t) {
if (!e) return !1;
var i = e.split(";"), n = [], a = !0, o = !1, s = void 0;
try {
for (var r, c = i[Symbol.iterator](); !(a = (r = c.next()).done); a = !0) {
var l = r.value, h = this.splitToNumList(l), d = {};
d.min = h[0];
d.nax = h[1];
n.push(d);
}
} catch (e) {
o = !0;
s = e;
} finally {
try {
!a && c.return && c.return();
} finally {
if (o) throw s;
}
}
var u = !0, f = !1, p = void 0;
try {
for (var m, g = n[Symbol.iterator](); !(u = (m = g.next()).done); u = !0) {
var y = m.value;
if (t >= y.min && t <= y.nax) return !0;
}
} catch (e) {
f = !0;
p = e;
} finally {
try {
!u && g.return && g.return();
} finally {
if (f) throw p;
}
}
return !1;
},
isDaySpan: function(e, t) {
return h.timestampToTime(e) != h.timestampToTime(t);
},
isHourSpan: function(e, t, i) {
var n = new Date(e).getHours(), a = new Date(t).getHours();
if (n !== a) {
var o = !0, s = !1, r = void 0;
try {
for (var c, l = i[Symbol.iterator](); !(o = (c = l.next()).done); o = !0) {
var h = c.value;
if (n < h && a >= h) return !0;
}
} catch (e) {
s = !0;
r = e;
} finally {
try {
!o && l.return && l.return();
} finally {
if (s) throw r;
}
}
}
return !1;
},
isInConfigHours: function(e, t) {
var i = new Date(e).getHours();
return this.arrContains(t, i);
},
getTimeStampByTimeStr: function(e) {
e += "";
return cc.sys.os == cc.sys.OS_IOS || s ? new Date(e.replace(/-/g, "/")).getTime() : new Date(e).getTime();
},
arrContains: function(e, t) {
if (e) for (var i = 0; i < e.length; i++) {
if (e[i] === t) return !0;
}
return !1;
},
arrRemove: function(e, t) {
for (var i = 0; i < e.length; i++) if (e[i] === t) {
e.splice(i, 1);
return !0;
}
return !1;
},
createQueryString: function(e) {
var t = "", i = !0;
for (var n in e) if (e.hasOwnProperty(n)) {
var a = n + "=" + e[n];
if (i) {
i = !1;
t = a;
} else t += "&" + a;
}
console.log("query:" + t);
return t;
},
hexToColor: function(e) {
return new cc.Color().fromHEX(e);
},
getRealTimeCount: function(e, t) {
var i = new Date(e);
i.setHours(0, 0, 0, 0);
return h.getTimeCount(parseInt(i.getTime()), t);
},
getCountDownTimeByZero: function(e) {
var t = new Date(e);
t.setHours(0, 0, 0, 0);
var i = h.getTimeCount(parseInt(t.getTime()), e);
i.hour = 23 - i.hour;
i.minute = 59 - i.minute;
i.second = 60 - i.second;
i.hour < 10 && (i.hour = "0" + i.hour);
i.minute < 10 && (i.minute = "0" + i.minute);
i.second < 10 && (i.second = "0" + i.second);
return i;
},
getCountDownTime: function(e) {
e /= 1e3;
var t = {};
t.hour = Math.floor(e % 86400 / 3600);
t.minute = Math.floor(e % 86400 % 3600 / 60);
t.second = Math.floor(e % 86400 % 3600 % 60);
t.hour < 10 && (t.hour = "0" + t.hour);
t.minute < 10 && (t.minute = "0" + t.minute);
t.second < 10 && (t.second = "0" + t.second);
return t;
},
pAngleSigned: function(e, t) {
var i = e.normalize(), n = t.normalize(), a = Math.atan2(i.x * n.y - i.y * n.x, i.dot(n));
return Math.abs(a) < c ? 0 : a;
},
vec2SignAngle: function(e, t) {
return Math.atan2(e.y, e.x) - Math.atan2(t.y, t.x);
},
pSegmentIntersect: function(e, t, i, n) {
var a = cc.v2(0, 0);
return !!(h.pLineIntersect(e, t, i, n, a) && a.x >= 0 && a.x <= 1 && a.y >= 0 && a.y <= 1);
},
pLineIntersect: function(e, t, i, n, a) {
if (e.x === t.x && e.y === t.y || i.x === n.x && i.y === n.y) return !1;
var o = t.x - e.x, s = t.y - e.y, r = n.x - i.x, c = n.y - i.y, l = e.x - i.x, h = e.y - i.y, d = c * o - r * s;
a.x = r * h - c * l;
a.y = o * h - s * l;
if (0 === d) return 0 === a.x || 0 === a.y;
a.x = a.x / d;
a.y = a.y / d;
return !0;
},
setLargeItem: function(e, t) {
if (s && !h.isH5) try {
var i = "GameSandBox://localStorage/" + e;
BK.FileUtil.isFileExist(i) && BK.FileUtil.deleteFile(i);
BK.FileUtil.writeFile(i, t);
} catch (e) {
console.log("getLargeItem exception:" + e);
} else h.setItem(e, t);
},
getLargeItem: function(e) {
if (s && !h.isH5) {
try {
var t = "GameSandBox://localStorage/" + e;
if (BK.FileUtil.isFileExist(t)) {
return BK.FileUtil.readFile(t).readAsString(!0);
}
} catch (e) {
console.log("getLargeItem exception:" + e);
}
return null;
}
return h.getItem(e);
},
setItem: function(e, t) {
if (null !== t && void 0 !== t) {
"string" != typeof t && (t = t.toString());
if (o) wx.setStorage({
key: e,
data: t
}); else try {
cc.sys.localStorage.setItem(e, t);
} catch (t) {
console.log("setItem exception:" + t + " key:" + e);
}
} else console.log("setItem error, item is null or undefined, key:" + e);
},
getItem: function(e) {
if (!o) return cc.sys.localStorage.getItem(e);
try {
return wx.getStorageSync(e);
} catch (e) {
console.log(e);
return null;
}
},
removeItem: function(e) {
cc.sys.localStorage.removeItem(e);
},
log: function(e) {
s && BK.Script.log(1, 1, e);
console.log(e);
},
setInvisibleAfterUpdateRenderData: function(e, t) {
var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
if (e && t) {
var n = cc.v2(t.position);
t.position = l;
t.active = !0;
h.setNodeVisible(t, !0);
e.scheduleOnce(function() {
h.setNodeVisible(t, !1);
t.position = n;
i && i();
}, 2 / cc.game.getFrameRate());
}
},
getRadiusByKnifeCount: function(e) {
return 200 * this.getRadioByCount(e);
},
getRadioByCount: function(e) {
return (e < 8 ? 0 : e > 20 ? 12 : e - 8) / 12 + 1;
},
getIntervalByCount: function(e) {
return e < 50 ? 10 : 500 / e;
},
isInMyView: function(e, t, i, n, a, o) {
var s = e.node.position.sub(o.node.position), r = t.node.parent.convertToWorldSpaceAR(t.node.position), c = e.node.parent.convertToNodeSpaceAR(r).sub(o.node.position);
i.width = n / o.zoomRatio;
i.height = a / o.zoomRatio;
i.center = s;
var l = t.defenceRect.getRect();
l.center = c;
return i.intersects(l);
},
compareVersion: function(e, t) {
e = e.split(".");
t = t.split(".");
for (var i = Math.max(e.length, t.length); e.length < i; ) e.push("0");
for (;t.length < i; ) t.push("0");
for (var n = 0; n < i; n++) {
var a = parseInt(e[n]), o = parseInt(t[n]);
if (a > o) return 1;
if (a < o) return -1;
}
return 0;
},
getPositiveOrNegative: function() {
return [ 1, -1 ][Math.floor(2 * Math.random())];
},
getCenterParam: function(e) {
var t = e[0].parent.convertToWorldSpaceAR(e[0].position), i = e[1].parent.convertToWorldSpaceAR(e[1].position), n = cc.v2((t.x + i.x) / 2, (t.y + i.y) / 2), a = Math.PI / 36 - Math.random() * (Math.PI / 18), o = t.sub(i).rotate(Math.PI / 2 + a);
return [ n, this.getRotationByDir(o) ];
},
getRotationByDir: function(e) {
var t = e.angle(cc.v2(-1, 0)) * (180 / Math.PI);
e.y < 0 && (t = -t);
return t;
},
getGoldStr: function(e) {
return e;
},
getCurStage: function(e, t, i) {
var n = 0, a = !0, o = !1, s = void 0;
try {
for (var r, c = t[Symbol.iterator](); !(a = (r = c.next()).done); a = !0) {
if (e < r.value) break;
n++;
}
} catch (e) {
o = !0;
s = e;
} finally {
try {
!a && c.return && c.return();
} finally {
if (o) throw s;
}
}
return 0 === n ? 0 : this.getRandomInt(0, 100) < i[n] ? 1 : 2;
},
jsonToArray: function(e) {
var t = [];
for (var i in e) {
t[i] = e[i];
h.isJson(t[i]) && (t[i] = h.jsonToArray(t[i]));
}
return t;
},
isJson: function(e) {
return "object" == ("undefined" == typeof e ? "undefined" : n(e)) && "[object object]" == Object.prototype.toString.call(e).toLowerCase() && !e.length;
},
getRandomItemByWeight: function(e) {
for (var t = [], i = 0, n = 0; n < e.length; n++) {
t[n] = i + e[n].weight;
i += e[n].weight;
}
for (var a = h.getRandomInt(0, i), o = 0; o < t.length; o++) {
var s = e[o];
if (a < t[o]) return s;
}
return null;
},
createEventHandler: function(e, t, i, n) {
var a = new cc.Component.EventHandler();
a.target = e;
a.component = t;
a.handler = i;
a.customEventData = n;
return a;
},
copyObj: function(e) {
if (e) {
var t = {};
for (var i in e) t[i] = e[i];
return t;
}
},
getStrlen: function(e) {
for (var t = 0, i = 0; i < e.length; i++) e.charCodeAt(i) > 127 || 94 == e.charCodeAt(i) ? t += 2 : t++;
return t;
}
}
});
cc._RF.pop();
}, {
querystring: 3
} ],
Types: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d0379L9/7RMhr2FOkB99Gk8", "Types");
var n = cc.Enum({
Normal: -1,
Attack: -1,
Defence: -1
}), a = cc.Enum({
Init: -1,
Capture: -1,
CaptureFinish: -1,
Release: -1,
ReleaseFinish: -1
}), o = cc.Enum({
Land: -1,
Attack: -1,
Throw: -1
}), s = cc.Enum({
Big: -1,
Fast: -1,
Hard: -1,
Magnet: -1,
Frenzy: -1,
Count: -1
}), r = cc.Enum({
Normal: -1,
Moving: -1,
Thinking: -1
}), c = cc.Enum({
Begin: -1,
Ing: -1,
End: -1
}), l = [ new cc.Color().fromHEX("#acb1ba"), new cc.Color().fromHEX("#ef8a34"), new cc.Color().fromHEX("#76d348"), new cc.Color().fromHEX("#5bb7ff"), new cc.Color().fromHEX("#d867d9"), new cc.Color().fromHEX("#e7d963"), new cc.Color().fromHEX("#5e62ff"), new cc.Color().fromHEX("#01ddb6"), new cc.Color().fromHEX("#ef5d5d") ], h = [ new cc.Color().fromHEX("#FFFFFF"), new cc.Color().fromHEX("#761111"), new cc.Color().fromHEX("#0D8944"), new cc.Color().fromHEX("#112E9A"), new cc.Color().fromHEX("#8C0063"), new cc.Color().fromHEX("#A85C0A"), new cc.Color().fromHEX("#FFFFFF"), new cc.Color().fromHEX("#097680"), new cc.Color().fromHEX("#FFFFFF") ], d = cc.Enum({
Attack_One: -1,
Attack_Two: -1,
Defence_One: -1,
Defence_Two: -1,
Knife: -1,
Enemy: -1,
Block: -1,
Wall: -1,
Defence: -1,
Time_30: -1,
Time_10: -1
}), u = cc.Enum({
Death: -1,
HitFast: -1,
HitSlow: -1,
Spin: -1,
Kill: -1,
Start: -1,
firstblood: -1,
doublekill: -1,
tribblekill: -1,
quadrkill: -1,
pandakill: -1,
godlike: -1
}), f = cc.Enum({
PLAYER: 0,
FOLLOW_PLAYER: 1,
KNIFE: 2,
BLOCK: 3,
WALL: 4,
COLL_EFFECT: 5,
BLOCK_01: 6,
BLOCK_02: 7,
BLOCK_03: 8,
BLOCK_04: 9,
BLOCK_05: 10,
BLOCK_06: 11,
BLOCK_07: 12,
BLOCK_08: 13,
BUFF: 14,
SHOW_KNIFE_EFFECT: 15,
DODGE_EFFECT: 16,
DESTROY_DEFENCE_EFFECT: 17,
CIRCLE_WALL: 18,
Effect_Reborn: 19,
CIRCLE_BLOCK: 20,
BOX: 21,
NEZHA_EFFECT: 22,
COUNT: 23
}), p = cc.Enum({
Other: 0,
WECHAT: 1,
BROWSER: 2,
IOS: 3,
ANDROID: 4
}), m = cc.Enum({
Other: 0,
RiceBall: 1,
RiceBall_1: 2,
RiceBall_2: 3
}), g = cc.Enum({
NONE: -2,
HOME: 0,
WIN: 1,
MultipGold: 2,
Revive: 3,
AddKnife: 4,
UnlockSkin: 5,
TryOutSkin: 6,
ProtectStar: 7,
Friend: 8,
Sign: 9,
GrowNode: 10,
OfflineGold: 11,
NotEnoughMoney: 12,
RefreshDailyTask: 13,
MultipDailyTask: 14,
MultipAgain: 15,
LevelUp: 16,
Invite: 17
}), y = cc.Enum({
Revive: -1,
MultipGold: -1,
UnlockSkin: -1,
TryOutSkin: -1,
ProtectStar: -1,
Sign: -1,
WatchAdver: -1,
NotEnoughMoney: -1,
GrowNode: -1,
OfflineGold: -1,
MultipDailyTask: -1,
RefreshDailyTask: -1,
MultipAgain: -1,
AddKnife: -1,
BuySkin: -1,
TreasurBox: -1,
ShopFreeDiamond: -1,
UnlockHeroSkin: -1,
Missions: -1,
AddKey: -1
}), v = cc.Enum({
Slow: -1,
HeroDefence: -1,
HeroDefenceThinking: -1,
KnifeLess: -1,
DefenceTime: -1,
AINear: -1,
PickKnife: -1,
NoPickKnifeNum: -1,
TowardHero: -1,
HeroDefenceSilly: -1,
KnifeMoreSilly: -1,
peace: -1,
towardTime: -1,
LowKnife: -1,
moreKnifeToward: -1,
lessKnifeEscape: -1,
ReviveTotal: -1
}), k = cc.Enum({
noPickNum: -1,
noDefence: -1,
removeToward: -1
}), C = cc.Enum({
LOGIN: 0,
PLAYCOUNT: 1,
KILLCOUNT: 2,
RANK: 3,
ADVERCOUNT: 4,
DUANWU: 5,
TREASUREBOX: 6
}), S = cc.Enum({
KILL_COUNT: 0,
TOTAL_PICK_KNIFE_COUNT: 1,
MAX_PICK_KNIFE_COUNT: 2,
KILL_KNIFE_COUNT: 3,
PLAY_COUNT: 4,
WIN_COUNT: 5
}), w = cc.Enum({
Develop: -1,
Publish: -1,
Test: -1,
QA: -1,
Trial: -1
}), T = cc.Enum({
MONEY: -1,
KNIFE_SKIN: -1,
HERO_SKIN: -1,
ZONG_ZI: -1,
CARD: -1,
COUNT: -1
}), N = cc.Enum({
idle: -1,
Show: -1,
Close: -1,
Left: -1,
Right: -1,
Mini: -1,
CloseMini: -1
}), _ = cc.Enum({
pick: -1,
throw: -1,
kill: -1,
revive: -1,
tryFrenzy: -1,
born: -1
}), b = cc.Enum({
Dodge: -1
}), R = cc.Enum({
Speed: -1
}), P = cc.Enum({
Attack: -1,
Defence: -1,
Speed: -1,
Gold: -1,
Offline: -1
}), D = cc.Enum({
Rect: -1,
Circle: -1
}), L = cc.Enum({
Close: -1,
waitToShow: -1,
Open: -1
}), I = cc.Enum({
Free: 0,
Share: 1,
Adver: 2
}), A = cc.Enum({
DEFAULT: 0,
SPIDERMAN: 1,
PIKAQIU: 2,
NEZHA: 3,
ULTRAMAN: 4,
BATMAN: 5,
YELLOWMAN: 6
}), M = cc.Enum({
default: -1,
Login_Start: 100,
Login_Suc: 101,
Load_UserData: 102,
Load_ConfigData: 103,
Switch_BattleFire: 104,
World_Init: 105,
World_Finish: 106,
UI_Match: 107,
First_Game_Start: 108,
Kill_One: 109,
Kill_Two: 110,
Kill_Three: 111,
First_Game_Finish: 112,
GameOverPanel: 113,
BackToHome: 114,
RankUpEnd: 115,
NewHeroClose: 116,
GameTwo: 117
}), B = cc.Enum({
UNKNOWN: 0,
IOS: 1,
ANDROID: 2
}), x = cc.Enum({
DIAMOND: -1,
GOLD: -1,
ADVER: -1,
RANK: -1,
TASK: -1,
BOX: -1,
NFT: -1
});
t.exports = {
ItemGetType: x,
SuitType: A,
KnifeState: n,
KnifeMomentState: a,
KnifeColliderState: o,
AIMoveState: r,
ActionState: c,
TEAM_COLOR: l,
NoticeType: d,
SoundID: u,
NAME_COLOR: h,
PoolType: f,
PlatformType: p,
ChannelType: m,
ShareType: g,
AICfgType: v,
TaskType: C,
DailyTaskType: S,
AdverType: y,
Environment: w,
ItemType: T,
OpenDataMsgType: N,
BuffState: s,
FrenzyAddType: _,
KnifeSkinProperty: b,
HeroSkinProperty: R,
AIFreshCfgType: k,
GrowType: P,
MapType: D,
HeroRebornEffectState: L,
StageType: I,
CustomFunnelEvent: M,
OSType: B
};
cc._RF.pop();
}, {} ],
UIMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "020038f+WhB6IG5qw9o8jkO", "UIMgr");
e("Tools"), e("PlayerData");
var n = e("GSHome");
cc.Class({
extends: cc.Component,
properties: {
GSGameNode: cc.Node,
GSHomeNode: cc.Node,
adverBlock: cc.Node,
_GSGame: null
},
init: function(e) {
this.adverBlock.active = !1;
this._GSGame = this.GSGameNode.getComponent("GSGame");
this._GSHome = this.GSHomeNode.getComponent("GSHome");
this._GSGame.init(e);
this._GSHome.init(e);
this.GSGameNode.active = !1;
this.GSHomeNode.active = !0;
n.gameClubButton && n.gameClubButton.show();
var t = !0, i = !1, a = void 0;
try {
for (var o, s = this._GSHome.userinfoBtns[Symbol.iterator](); !(t = (o = s.next()).done); t = !0) {
var r = o.value;
r && r.show();
}
} catch (e) {
i = !0;
a = e;
} finally {
try {
!t && s.return && s.return();
} finally {
if (i) throw a;
}
}
},
cleanUp: function() {
this._GSGame.cleanUp();
},
addPlayerRankItem: function(e) {
this._GSGame.addPlayerRankItem(e);
},
openGameOverPanel: function(e) {
this._GSGame.openGameOverPanel(e);
},
closeGameOverPanel: function() {
this._GSGame.closeGameOverPanel();
},
addHeroPosArr: function(e, t, i) {
this._GSGame.addHeroPosArr(e, t, i);
},
startGame: function() {
this.GSGameNode.active = !0;
this.GSHomeNode.active = !1;
this.activeGoldNode(!1);
this.activeDiamondNode(!1);
},
hideUserInfoBtn: function() {
var e = !0, t = !1, i = void 0;
try {
for (var n, a = this._GSHome.userinfoBtns[Symbol.iterator](); !(e = (n = a.next()).done); e = !0) {
var o = n.value;
o && o.hide();
}
} catch (e) {
t = !0;
i = e;
} finally {
try {
!e && a.return && a.return();
} finally {
if (t) throw i;
}
}
},
addSpecialNotice: function(e) {
this._GSGame.addSpecialNotice(e);
},
showImportantNotice: function(e) {
this._GSGame.showImportantNotice(e);
},
startCountDown: function(e) {
this._GSGame.startCountDown(e);
},
showKillMsg: function(e, t) {
this._GSGame.showKillMsg(e, t);
},
showKillNotice: function(e) {
this._GSGame.showKillNotice(e);
},
showReviveNotice: function(e) {
this._GSGame.showReviveNotice(e);
},
showTips: function(e) {
this._GSHome.showTips(e);
},
showReward: function(e, t, i) {
this._GSHome.showReward(e, t, i);
},
showPanelLevelUp: function(e) {
this._GSHome.showPanelLevelUp(e);
},
openRevivePanel: function(e, t) {
this._GSGame.openRevivePanel(e, t);
},
refreshRedDot: function() {
this._GSHome.refreshRedDot();
},
showGetMoneyEffect: function(e, t, i) {
this._GSHome.showGetMoneyEffect(e, t, i);
},
showPanelTryOut: function(e, t, i) {
this._GSHome.showPanelTryOut(e, t, i);
},
showPanelTryFrenzy: function(e) {
this._GSHome.showPanelTryFrenzy(e);
},
showPanelTrySuit: function(e, t, i) {
this._GSHome.showPanelTrySuit(e, t, i);
},
showTaskNotice: function(e, t) {
this._GSGame.showTaskNotice(e, t);
},
showCountDownNode: function() {
this._GSGame.showCountDownNode();
},
showPanelSign: function(e) {
this._GSHome.showPanelSign(e);
},
showPanelMatch: function(e, t) {
this._GSHome.showPanelMatch(e, t);
},
closePanelMatch: function() {
this._GSHome.closePanelMatch();
},
refreshProperty: function(e, t) {
this._GSHome.refreshProperty(e, t);
},
startLoadPrefab: function() {
this._GSHome.startLoadPrefab();
this._GSGame.startLoadPrefab();
},
showWatchAdverCount: function() {
this._GSHome.showWatchAdverCount();
},
showGuideStart: function(e) {
this._GSGame.showGuideStart(e);
},
showGuideEnd: function(e) {
this._GSGame.showGuideEnd(e);
},
showGuideSpecial: function(e) {
this._GSGame.showGuideSpecial(e);
},
refreshGuideProcess: function(e) {
this._GSGame.refreshGuideProcess(e);
},
showPanelVictory: function() {
this._GSGame.showPanelVictory();
},
showOfflineMultip: function(e) {
this._GSHome.showOfflineMultip(e);
},
refreshOfflineGoldData: function() {
this._GSHome.refreshOfflineGoldData();
},
showPanelRepay: function(e) {
this._GSHome.showPanelRepay(e);
},
showUnlockGrow: function(e) {
this._GSHome.showUnlockGrow(e);
},
showPanelAddTop: function(e) {
this._GSHome.showPanelAddTop(e);
},
showPanelInvite: function(e) {
this._GSHome.showPanelInvite(e);
},
showPanelDailyTask: function(e) {
this._GSHome.showPanelDailyTask(e);
},
activeGoldNode: function(e) {
this._GSHome.activeGoldNode(e);
},
activeDiamondNode: function(e) {
this._GSHome.activeDiamondNode(e);
},
closePanelShop: function(e) {
this._GSHome.onPanelShopClose(e);
AdvertMgr.instance.showBanner();
},
openAdverBlock: function() {
var e = this;
this.adverBlock.active = !0;
setTimeout(function() {
e.closeAdverBlock();
}, 100);
},
closeAdverBlock: function() {
this.adverBlock.active = !1;
console.log("uimgr:closeAdverBlock");
},
showActiveSuitEffect: function() {
this._GSHome.showActiveSuitEffect();
},
showPanelRewardDetail: function() {
this._GSHome.showPanelRewardDetail();
},
showPanelPKReward: function(e, t) {
this._GSHome.showPanelPKReward(e, t);
},
showPanelWorldReward: function(e, t) {
this._GSHome.showPanelWorldReward(e, t);
},
showPanelHolidayRank: function(e, t) {
this._GSHome.showPanelHolidayRank(e, t);
},
hidePanelHolidayUserinfoBtns: function() {
this._GSHome.hidePanelHolidayUserinfoBtns();
},
showPanelSubscribeReward: function(e) {
this._GSHome.showPanelSubscribeReward(e);
},
showPanelSubscribe: function(e) {
this._GSHome.showPanelSubscribe(e);
},
showPanelBuySkin: function(e) {
this._GSHome.showPanelBuySkin(e);
},
onPanelShopClose: function(e) {
this._GSHome.onPanelShopClose(e);
},
showPanelTreasureBox: function() {
this._GSGame.showPanelTreasureBox();
},
showPanelKeyCount: function(e) {
this._GSGame.showPanelKeyCount(e);
},
showPanelEvaulate: function(e) {
this._GSHome.showPanelEvaulate(e);
},
openPanelKeyCount: function(e) {
this._GSGame.openPanelKeyCount(e);
}
});
cc._RF.pop();
}, {
GSHome: "GSHome",
PlayerData: "PlayerData",
Tools: "Tools"
} ],
UIUtil: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "bc9c4zrrMVJdaTwQk5SNlZM", "UIUtil");
var n = e("PlatformMgr"), a = e("Types").PlatformType, o = e("PlayerData"), s = cc.Class({
extends: cc.Component,
statics: {
loadResSprite: function(e, t) {
cc.loader.loadRes(t, cc.SpriteFrame, function(t, i) {
t ? cc.error(t) : i && (e.spriteFrame = i);
});
},
loadFriendPortrait: function(e, t) {
if (t) if (Number(t)) {
var i = "texture/defaultPortrait/avatar-player-0" + t;
cc.loader.loadRes(i, cc.SpriteFrame, function(i, n) {
i ? cc.error(i) : n && e.iconUrl === t && (e.spriteFrame = n);
});
} else cc.loader.load({
url: t,
type: "jpg"
}, function(i, n) {
i ? cc.error(i) : n && e.iconUrl === t && (e.spriteFrame = new cc.SpriteFrame(n));
});
},
loadResPortrait: function(e, t) {
if (t.isLocal) {
var i = o.instance.iconUrl;
if (Number(i)) {
var s = "texture/defaultPortrait/avatar-player-0" + i;
cc.loader.loadRes(s, cc.SpriteFrame, function(t, n) {
t ? cc.error(t) : n && (e.iconUrl && e.iconUrl !== i || (e.spriteFrame = n));
});
} else if (n.platformType === a.WECHAT) {
s = "";
s = i.includes("?") ? i + "&t=" + Math.random() : i + "?t=" + Math.random();
cc.loader.load({
url: s,
type: "jpg"
}, function(t, n) {
t ? cc.error(t) : n && (e.iconUrl && e.iconUrl !== i || (e.spriteFrame = new cc.SpriteFrame(n)));
});
}
} else {
s = "texture/portrait/pic" + t.iconUrl;
cc.loader.loadRes(s, cc.SpriteFrame, function(i, n) {
i ? cc.error(i) : n && (e.iconUrl && e.iconUrl !== t.iconUrl || (e.spriteFrame = n));
});
}
},
loadAIPortrait: function(e, t) {
var i = "texture/portrait/pic" + t;
cc.loader.loadRes(i, cc.SpriteFrame, function(i, n) {
i ? cc.error(i) : n && e.iconUrl === t && (e.spriteFrame = n);
});
},
loadResFlag: function(e, t) {
var i = "texture/flag/flag-US";
t && (i = "texture/flag/flag-" + t);
cc.loader._getResUuid(i, cc.SpriteFrame) || (i = "texture/flag/flag-unknown");
s.loadResSprite(e, i);
},
loadUIPrefab: function(e, t) {
cc.loader.loadRes(e, cc.Prefab, function(e, i) {
if (e) {
cc.error(e);
t && t(null);
} else i && t && t(cc.instantiate(i));
});
}
}
});
cc._RF.pop();
}, {
PlatformMgr: "PlatformMgr",
PlayerData: "PlayerData",
Types: "Types"
} ],
UpdateMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "3358fRwcA1EfoaZexNqHb38", "UpdateMgr");
var n = e("GameData"), a = e("PlatformMgr"), o = e("Tools");
cc.Class({
statics: {
checkNewClient: function(e) {
if (a.isPlatformUseWxApi() && !a.isDevTool && void 0 !== window && void 0 !== window.wxDownloader && void 0 !== window.wxFsUtils && n.instance.isEnvironmentCheckUpdate()) {
console.log("UNZIP_TAG 开始检查解压缩");
var t = window.wxDownloader, i = window.wxFsUtils;
if (wx.getFileSystemManager) {
var s = wx.getFileSystemManager(), r = "res_unzip_flag_" + n.instance.srcVersion, c = t.cacheDir + "/" + r;
console.log("UNZIP_TAG 开始检查res压缩包 flagFile:" + c);
s.access({
path: c,
success: function() {
console.log("UNZIP_TAG " + c + " 存在，已经解压过了~");
e && e();
},
fail: function() {
if ("1" === o.getItem(r)) {
console.log("UNZIP_TAG " + r + " 存在，已经解压过了~");
e && e();
} else {
var a = "/res/res." + n.instance.srcVersion + ".zip", l = t.REMOTE_SERVER_ROOT + a, h = t.cacheDir + a, d = t.cacheDir + "/res";
console.log("UNZIP_TAG " + r + " 不存在，需要进行下载和解压 url:" + l);
i.exists(d, function(n) {
console.log("UNZIP_TAG 下载目录是否存在:" + n);
n || i.makeDirSync(d, !0);
i.downloadFile(l, h, function(n, a) {
if (n) {
console.error("UNZIP_TAG 下载失败，error:", n);
e && e();
} else {
console.log("UNZIP_TAG 下载成功，开始解压缩");
var l = t.cacheDir;
s.unzip({
zipFilePath: h,
targetPath: l,
success: function() {
console.log("UNZIP_TAG 解压缩成功，写入缓存文件~");
var n = t.getCachedFileList();
if (n) {
var a = s.readdirSync(l);
console.log("UNZIP_TAG 缓存文件夹中的文件数量:" + a.length);
for (var h = 0; h < a.length; h++) {
n[a[h]] = 1;
}
i.writeFile(t.cacheDir + "/" + t.cachedFileName, JSON.stringify(n), "utf8");
console.log("UNZIP_TAG 创建flag文件~");
o.setItem(r, "1");
s.writeFile({
filePath: c,
data: "1",
success: function() {
console.log("UNZIP_TAG 创建flag文件成功~");
e && e();
},
fail: function(t) {
console.log("UNZIP_TAG 创建flag文件失败！errMsg:", t);
e && e();
}
});
} else {
console.log("UNZIP_TAG 缓存信息文件不存在");
e && e();
}
},
fail: function(t) {
console.log("UNZIP_TAG 解压缩失败！errMsg:", t);
e && e();
}
});
}
});
});
}
}
});
} else {
console.log("UNZIP_TAG wx.getFileSystemManager is undefined");
e && e();
}
} else e && e();
}
}
});
cc._RF.pop();
}, {
GameData: "GameData",
PlatformMgr: "PlatformMgr",
Tools: "Tools"
} ],
UtilPhysics: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "c284aJZaxNHpLTQ9LR7Uvfw", "UtilPhysics");
e("GameData");
var n = e("Tools"), a = cc.Class({
statics: {
checkPointLine: function(e, t, i, n) {
var a = (e - i.x) * (n.y - i.y) - (t - i.y) * (n.x - i.x);
return 0 === a ? 0 : a > 0 ? 1 : -1;
},
isCollidingLineRect: function(e, t, i) {
if (i.contains(e) || i.contains(t)) return !0;
for (var n = 0, o = 0, s = i.width / 2, r = i.height / 2, c = 0; c < 4; c++) {
var l = 0, h = 0;
switch (c) {
case 0:
l = -s;
h = r;
break;

case 1:
l = -s;
h = -r;
break;

case 2:
l = s;
h = -r;
break;

case 3:
l = s;
h = r;
}
var d = i.x + l, u = i.y + h;
switch (a.checkPointLine(d, u, e, t)) {
case 0:
return !0;

case 1:
if (o > 0) return !0;
n++;
break;

case -1:
if (n > 0) return !0;
o++;
}
}
return !1;
},
isCollidingRectRect: function(e, t) {
return 2 * Math.abs(t.x - e.x) <= e.width + t.width && 2 * Math.abs(t.y - e.y) <= e.height + t.height;
},
isCollidingRectPoint: function(e, t) {
return t.x >= e.xMin && t.x <= e.xMax && t.y >= e.yMin && t.y <= e.yMax ? t.x === e.xMin || t.x === e.xMax || t.y === e.yMin || t.y === e.yMax ? 0 : 1 : -1;
},
checkMovePointCollideRectReturnHitPos: function(e, t, i, o) {
var s = e, r = e.add(t), c = (a.isCollidingRectPoint(i, s), a.isCollidingRectPoint(i, r));
if (o && c >= 0 || !o && c <= 0) {
var l = i.x, h = i.x + i.width, d = i.y + i.height, u = i.y, f = cc.v2(l, d), p = cc.v2(h, d), m = cc.v2(l, u), g = cc.v2(h, u), y = cc.Vec2.ZERO, v = !1;
s.y > u && (s.y >= d && t.y < 0 || s.y <= d && t.y > 0) && (v = n.pSegmentIntersect(s, r, f, p)) && n.pLineIntersect(s, r, f, p, y);
!v && s.y < d && (s.y <= u && t.y > 0 || s.y >= u && t.y < 0) && (v = n.pSegmentIntersect(s, r, m, g)) && n.pLineIntersect(s, r, m, g, y);
!v && s.x < h && (s.x <= l && t.x > 0 || s.x >= l && t.x < 0) && (v = n.pSegmentIntersect(s, r, f, m)) && n.pLineIntersect(s, r, f, m, y);
!v && s.x > l && (s.x >= h && t.x < 0 || s.x <= h && t.x > 0) && (v = n.pSegmentIntersect(s, r, p, g)) && n.pLineIntersect(s, r, p, g, y);
if (v) return [ !0, y = s.add(t.mul(y.x)) ];
}
return [ !1, null ];
},
checkMoveRectCollideRectReturnHitPos: function(e, t, i, n) {
i = cc.rect(i.x - e.width / 2, i.y - e.height / 2, i.width + e.width, i.height + e.height);
return a.checkMovePointCollideRectReturnHitPos(e.center, t, i, n);
},
checkMovePointCollideRectReturnSlidePos: function(e, t, i, n) {
var o = e, s = e.add(t), r = a.isCollidingRectPoint(i, s);
if (n) {
if (r >= 0) {
var c = i.x, l = i.x + i.width, h = i.y + i.height, d = i.y, u = (i.center, !1);
if (o.x <= c && o.y < h && o.y > d) {
u = !0;
s.x = c;
}
if (o.x >= l && o.y < h && o.y > d) {
u = !0;
s.x = l;
}
if (o.y >= h && o.x < l && o.x > c) {
u = !0;
s.y = h;
}
if (o.y <= d && o.x < l && o.x > c) {
u = !0;
s.y = d;
}
if (o.x <= c && o.y >= h) {
u = !0;
0 !== t.y && o.y !== h && Math.abs(t.x / t.y) >= a.vertexDirScaleAbs(c, h, o) ? s.y = h : s.x = c;
}
if (o.x >= l && o.y >= h) {
u = !0;
0 !== t.y && o.y !== h && Math.abs(t.x / t.y) >= a.vertexDirScaleAbs(l, h, o) ? s.y = h : s.x = l;
}
if (o.x <= c && o.y <= d) {
u = !0;
0 !== t.y && o.y !== d && Math.abs(t.x / t.y) >= a.vertexDirScaleAbs(c, d, o) ? s.y = d : s.x = c;
}
if (o.x >= l && o.y <= d) {
u = !0;
0 !== t.y && o.y !== d && Math.abs(t.x / t.y) >= a.vertexDirScaleAbs(l, d, o) ? s.y = d : s.x = l;
}
if (u) return [ !0, s ];
}
} else if (r < 0) {
s.x = cc.clampf(s.x, i.xMin, i.xMax);
s.y = cc.clampf(s.y, i.yMin, i.yMax);
return [ !0, s ];
}
return [ !1, null ];
},
checkMoveRectCollideRectReturnSlidePos: function(e, t, i, n) {
i = cc.rect(i.x - e.width / 2, i.y - e.height / 2, i.width + e.width, i.height + e.height);
return a.checkMovePointCollideRectReturnSlidePos(e.center, t, i, n);
},
vertexDirScaleAbs: function(e, t, i) {
return Math.abs((e - i.x) / (t - i.y));
},
test: function() {
var e = cc.rect(-320, -320, 640, 640), t = (cc.v2(310, 310), cc.v2(0, 20)), i = cc.rect(310, 310, 20, 20);
t = cc.v2(10, 10);
a.checkMoveRectCollideRectReturnSlidePos(i, t, e, !1);
}
}
});
cc._RF.pop();
}, {
GameData: "GameData",
Tools: "Tools"
} ],
VibrateUtil: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "7c19fEepUtC6Y6w9/ZHqt/K", "VibrateUtil");
var n = e("GameData");
cc.Class({
statics: {
instance: null,
vibrate: function(e) {
n.instance._vibrateOpen && (cc.sys.platform === cc.sys.WECHAT_GAME ? e ? wx.vibrateLong() : wx.vibrateShort() : cc.sys.isNative && (cc.sys.os === cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/VibratorWrapper", e ? "vibrateLong" : "vibrateShort", "()V") : cc.sys.os === cc.sys.OS_IOS && (e ? jsb.reflection.callStaticMethod("JSC", "ddd1") : jsb.reflection.callStaticMethod("JSC", "ddd3"))));
}
}
});
cc._RF.pop();
}, {
GameData: "GameData"
} ],
WallRuleSystem: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "f4ac8DQ0dRBbYuYi9IRqZdy", "WallRuleSystem");
var n = e("Types").NoticeType, a = e("ConfigData");
cc.Class({
extends: cc.Component,
properties: {
wallSpeed: 50
},
init: function(e) {
this.world = e;
this.walls = e.walls;
this.uiMgr = e.uiMgr;
this.time = 0;
this.wallTime = 0;
var t = a.instance.wallData;
this.wallTimeStart = t.wallTimeStart;
this.wallTimeLimit = t.wallTimeLimit;
this.wallTimeMove = t.wallTimeMove;
this.wallTimeInterval = t.wallTimeInterval;
this.wallComps = [];
var i = 0 === e.mapType ? "EntityWall" : "EntityCircleWall", n = !0, o = !1, s = void 0;
try {
for (var r, c = this.walls[Symbol.iterator](); !(n = (r = c.next()).done); n = !0) {
var l = r.value.getComponent(i);
l.setMoveSpeed(this.wallSpeed);
this.wallComps.push(l);
}
} catch (e) {
o = !0;
s = e;
} finally {
try {
!n && c.return && c.return();
} finally {
if (o) throw s;
}
}
var h = !0, d = !1, u = void 0;
try {
for (var f, p = e.players[Symbol.iterator](); !(h = (f = p.next()).done); h = !0) {
f.value.initWalls(e.mapType, this.walls, e.mapWidth, e.mapHeight);
}
} catch (e) {
d = !0;
u = e;
} finally {
try {
!h && p.return && p.return();
} finally {
if (d) throw u;
}
}
},
updateGameLogic: function(e) {
this.time += e;
if (this.time > this.wallTimeStart && !this.startMove) {
this.startMove = !0;
this.wallTime = 0;
}
if (this.startMove) {
this.wallTime += e;
if (!this.isShow) {
this.isShow = !0;
this.uiMgr.showImportantNotice(n.Wall);
}
if (this.wallTime > this.wallTimeLimit + this.wallTimeMove + this.wallTimeInterval) {
this.wallTime = 0;
this.isShow = !1;
} else if (this.wallTime > this.wallTimeLimit + this.wallTimeMove) {
var t = !0, i = !1, a = void 0;
try {
for (var o, s = this.wallComps[Symbol.iterator](); !(t = (o = s.next()).done); t = !0) {
(u = o.value).closeRedBg();
}
} catch (e) {
i = !0;
a = e;
} finally {
try {
!t && s.return && s.return();
} finally {
if (i) throw a;
}
}
} else if (this.wallTime > this.wallTimeLimit) {
var r = !0, c = !1, l = void 0;
try {
for (var h, d = this.wallComps[Symbol.iterator](); !(r = (h = d.next()).done); r = !0) {
var u;
(u = h.value).startRedBg();
u.updateGameLogic(e);
}
} catch (e) {
c = !0;
l = e;
} finally {
try {
!r && d.return && d.return();
} finally {
if (c) throw l;
}
}
this.world.reduceMapSize(this.wallSpeed * e * 2);
}
}
}
});
cc._RF.pop();
}, {
ConfigData: "ConfigData",
Types: "Types"
} ],
WeiShuSdk: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "77123P68hJIHohUUOpIcdMw", "WeiShuSdk");
var n = {
baseUrl: "https://gamebix.oss-cn-shenzhen.aliyuncs.com/",
constellUrl: "https://constellation.mamapai.net/",
appName: "knife666",
uinfo: {
token: "",
uid: "",
is_new: !1
},
channelCode: "",
userData: {},
Init: function(e) {
var t = this;
if (cc.sys.platform == cc.sys.WECHAT_GAME) {
var i = wx.getLaunchOptionsSync ? wx.getLaunchOptionsSync() : {};
this.channelCode = "";
if (i.query) {
if (i.query.scene) {
var n = decodeURIComponent(i.query.scene), a = new RegExp("(^|&)cid=([^&]*)(&|$)"), o = n.match(a);
null != o && (this.channelCode = unescape(o[2]));
} else i.query.cid && (this.channelCode = i.query.cid);
console.log("获取到渠道id: ", this.channelCode);
}
this.onLogin(function() {
e && e();
t.openStatis(i.scene);
});
}
},
onLogin: function(e) {
var t = this;
wx.login({
success: function(i) {
i.code ? t.$post(t.constellUrl + "user/login", {
app: t.appName,
code: i.code,
cid: t.channelCode
}, function(i) {
if (i.data.data && i.data.data.token) {
t.uinfo.token = i.data.data.token;
t.uinfo.uid = i.data.data.uid;
t.uinfo.is_new = i.data.data.is_new;
e && e();
t.getUserData(null, null);
console.log("获取token成功 token: ", t.uinfo.token);
} else console.warn("token不存在！");
}) : console.log("登录失败！" + i.errMsg);
}
});
},
openStatis: function(e) {
this.$post(this.constellUrl + "/data-statistics/open-app", {
app: this.appName,
token: this.uinfo.token,
scene: e
}, function(e) {
console.log("打开应用上报:", e);
});
},
retainStatis: function() {
(!this.userData.cidList || !this.userData.td_Stamp || this.userData.td_Stamp && this.getTimeSpanAt0() > this.userData.td_Stamp) && (this.userData.cidList = []);
if (-1 == this.userData.cidList.indexOf(this.channelCode)) {
this.userData.cidList.push(this.channelCode);
this.saveUserData(null, null);
this.$post(this.constellUrl + "user/old-user-visit", {
app: this.appName,
token: this.uinfo.token,
cid: this.channelCode
}, function(e) {});
}
},
authStatis: function() {
this.channelCode && this.uinfo.token && this.$post(this.constellUrl + "user/update-user-info", {
app: this.appName,
token: this.uinfo.token,
cid: this.channelCode
}, function(e) {});
},
getUserData: function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = this;
this.uinfo.token && this.$post(this.constellUrl + "common/download-data", {
app: this.appName,
token: this.uinfo.token
}, function(n) {
if (n.data && n.data.data && n.data.data.data) {
i.userData = JSON.parse(n.data.data.data);
e && e();
console.log("获取到用户数据: ", i.userData);
} else {
i.userData = {};
t && t();
}
i.channelCode && i.retainStatis();
});
},
saveUserData: function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
this.userData.td_Stamp = Date.now();
this.uinfo.token && this.$post(this.constellUrl + "common/upload-data", {
app: this.appName,
token: this.uinfo.token,
data: JSON.stringify(this.userData)
}, function(t) {
console.log("保存用户数据成功: ", t);
e && e();
});
},
adStatis: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", i = "";
t && (i = e.appid);
this.$post(this.constellUrl + "data-statistics/ad", {
app: this.appName,
token: this.uinfo.token,
ad_appid: e.distid,
middle_appid: i,
ad_id: t
}, function(e) {
console.log("广告位统计-ad上报: ", e);
});
},
navgateTo: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, n = "";
if (-1 != e.path.search(new RegExp("(^|&)?reJ=([^&]*)(&|$)"))) {
(n = this.appName + this.uinfo.uid + Math.round(new Date().getTime() / 1e3) + "").length > 25 && (n = n.substr(n.length - 25, n.length));
e.path += "&ad_id=" + n;
}
var a = this;
window.wx.navigateToMiniProgram && window.wx.navigateToMiniProgram({
appId: e.appid,
path: e.path,
success: function(i) {
n ? a.adStatis(e, n) : a.adStatis(e);
t && t();
},
fail: function() {
i && i();
}
});
},
onPreView: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = this.baseUrl + "QR_code/" + e.path, n = this;
window.wx.previewImage({
current: i,
urls: [ i ],
success: function() {
n.adStatis(e);
t && t();
}
});
},
getTimeSpanAt0: function() {
return new Date(new Date().toDateString()).getTime();
},
$post: function(e, t) {
var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
window.wx.request({
url: e,
data: t,
method: "POST",
success: i,
fail: n
});
},
overVer: function(e) {
var t = wx.getSystemInfoSync().SDKVersion.split("."), i = e.split("."), n = Math.max(t.length, i.length);
t.length < n && t.push("0");
i.length < n && i.push("0");
for (var a = 0; a < n; a++) {
var o = parseInt(t[a]), s = parseInt(i[a]);
if (o > s) return !0;
if (o < s) return !1;
}
return !0;
}
};
t.exports = n;
cc._RF.pop();
}, {} ],
ctx: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "5d3e7rXsBNF45DJIsr/Grm5", "ctx");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {},
update: function(e) {
this.node.scale = 1 / this.node.parent.scale;
}
});
cc._RF.pop();
}, {} ],
mta_analysis: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "26258hTqF9NDoaqgRE5cghO", "mta_analysis");
var n = {
app_id: "",
event_id: "",
api_base: "https://pingtas.qq.com/pingd",
prefix: "_mta_",
version: "1.3.6",
stat_share_app: !1,
stat_pull_down_fresh: !1,
stat_reach_bottom: !1,
stat_param: !0
};
function a(e) {
wx.getNetworkType({
success: function(t) {
e(t.networkType);
}
});
}
function o() {
var e = wx.getSystemInfoSync();
return {
adt: encodeURIComponent(e.model),
scl: e.pixelRatio,
scr: e.windowWidth + "x" + e.windowHeight,
lg: e.language,
fl: e.version,
jv: encodeURIComponent(e.system),
tz: encodeURIComponent(e.platform)
};
}
function s() {
try {
return wx.getStorageSync(n.prefix + "auid");
} catch (e) {}
}
function r() {
try {
var e = h();
wx.setStorageSync(n.prefix + "auid", e);
return e;
} catch (e) {}
}
function c() {
try {
return wx.getStorageSync(n.prefix + "ssid");
} catch (e) {}
}
function l() {
try {
var e = "s" + h();
wx.setStorageSync(n.prefix + "ssid", e);
return e;
} catch (e) {}
}
function h(e) {
for (var t = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ], i = 10; 1 < i; i--) {
var n = Math.floor(10 * Math.random()), a = t[n];
t[n] = t[i - 1];
t[i - 1] = a;
}
for (i = n = 0; 5 > i; i++) n = 10 * n + t[i];
return (e || "") + (n + "") + +new Date();
}
function d() {
try {
var e = getCurrentPages(), t = "/";
0 < e.length && (t = e.pop().__route__);
return t;
} catch (e) {
return "/";
}
}
function u() {
var e = {
dm: "wechat.apps.xx",
url: encodeURIComponent(d() + m(y.Data.pageQuery)),
pvi: "",
si: "",
ty: 0
};
e.pvi = function() {
var t = s();
t || (t = r(), e.ty = 1);
return t;
}();
e.si = function() {
var e = c();
e || (e = l());
return e;
}();
return e;
}
function f() {
var e = o();
a(function(e) {
try {
wx.setStorageSync(n.prefix + "ntdata", e);
} catch (e) {}
});
e.ct = wx.getStorageSync(n.prefix + "ntdata") || "4g";
return e;
}
function p() {
var e, t = y.Data.userInfo, i = [];
for (e in t) t.hasOwnProperty(e) && i.push(e + "=" + t[e]);
t = i.join(";");
return {
r2: n.app_id,
r4: "wx",
ext: "v=" + n.version + (null !== t && "" !== t ? ";ui=" + encodeURIComponent(t) : "")
};
}
function m(e) {
if (!n.stat_param || !e) return "";
e = g(e);
var t, i = [];
for (t in e) i.push(t + "=" + e[t]);
return 0 < i.length ? "?" + i.join("&") : "";
}
function g(e) {
if (1 > n.ignore_params.length) return e;
var t, i = {};
for (t in e) 0 <= n.ignore_params.indexOf(t) || (i[t] = e[t]);
return i;
}
var y = {
App: {
init: function(e) {
"appID" in e && (n.app_id = e.appID);
"eventID" in e && (n.event_id = e.eventID);
"statShareApp" in e && (n.stat_share_app = e.statShareApp);
"statPullDownFresh" in e && (n.stat_pull_down_fresh = e.statPullDownFresh);
"statReachBottom" in e && (n.stat_reach_bottom = e.statReachBottom);
"ignoreParams" in e && (n.ignore_params = e.ignoreParams);
"statParam" in e && (n.stat_param = e.statParam);
l();
try {
"lauchOpts" in e && (y.Data.lanchInfo = e.lauchOpts, y.Data.lanchInfo.landing = 1);
} catch (e) {}
"autoReport" in e && e.autoReport && y.Page.init();
}
},
Page: {
init: function() {
var e = wx;
y.Page.stat();
n.stat_pull_down_fresh && e.onPullDownRefresh && function() {
var t = e.onPullDownRefresh;
e.onPullDownRefresh = function() {
y.Event.stat(n.prefix + "pulldownfresh", {
url: e.__route__
});
t.apply(this, arguments);
};
}();
n.stat_reach_bottom && e.onReachBottom && function() {
var t = e.onReachBottom;
e.onReachBottom = function() {
y.Event.stat(n.prefix + "reachbottom", {
url: e.__route__
});
t.apply(this, arguments);
};
}();
n.stat_share_app && e.onShareAppMessage && function() {
var t = e.onShareAppMessage;
e.onShareAppMessage = function() {
y.Event.stat(n.prefix + "shareapp", {
url: e.__route__
});
return t.apply(this, arguments);
};
}();
},
multiStat: function(e, t) {
if (1 == t) y.Page.stat(e); else {
var i = getCurrentPages()[getCurrentPages().length - 1];
i.onShow && function() {
var t = i.onShow;
i.onShow = function() {
y.Page.stat(e);
t.call(this, arguments);
};
}();
}
},
stat: function(e) {
if ("" != n.app_id) {
var t = [], i = p();
e && (i.r2 = e);
e = [ u(), i, f() ];
if (y.Data.lanchInfo) {
e.push({
ht: y.Data.lanchInfo.scene
});
y.Data.pageQuery && y.Data.pageQuery._mta_ref_id && e.push({
rarg: y.Data.pageQuery._mta_ref_id
});
try {
1 == y.Data.lanchInfo.landing && (i.ext += ";lp=1", y.Data.lanchInfo.landing = 0);
} catch (e) {}
}
e.push({
rdm: "/",
rurl: encodeURIComponent(y.Data.lastPageUrl + m(y.Data.lastPageQuery))
});
e.push({
rand: +new Date()
});
i = 0;
for (var a = e.length; i < a; i++) for (var o in e[i]) e[i].hasOwnProperty(o) && t.push(o + "=" + ("undefined" == typeof e[i][o] ? "" : e[i][o]));
wx.request({
url: n.api_base + "?" + t.join("&").toLowerCase()
});
}
}
},
Event: {
stat: function(e, t) {
if ("" != n.event_id) {
var i = [], a = u(), o = p();
a.dm = "wxapps.click";
a.url = e;
o.r2 = n.event_id;
var s, r = "undefined" == typeof t ? {} : t, c = [];
for (s in r) r.hasOwnProperty(s) && c.push(encodeURIComponent(s) + "=" + encodeURIComponent(r[s]));
r = c.join(";");
o.r5 = r;
r = 0;
for (o = (a = [ a, o, f(), {
rand: +new Date()
} ]).length; r < o; r++) for (var l in a[r]) a[r].hasOwnProperty(l) && i.push(l + "=" + ("undefined" == typeof a[r][l] ? "" : a[r][l]));
wx.request({
url: n.api_base + "?" + i.join("&").toLowerCase()
});
}
}
},
Data: {
userInfo: null,
lanchInfo: null,
pageQuery: null,
lastPageQuery: null,
pageUrl: "",
lastPageUrl: "",
show: !1
}
};
t.exports = y;
cc._RF.pop();
}, {} ],
"use_v2.1.x_cc.Action": [ function(e, t, i) {
"use strict";
cc._RF.push(t, "b7682/HeLdAhJAI6zOAKSBv", "use_v2.1.x_cc.Action");
cc.macro.ROTATE_ACTION_CCW = !0;
cc._RF.pop();
}, {} ]
}, {}, [ "use_v2.1.x_cc.Action", "BuffColliderListener", "HeroCollisionWallListener", "KnifeColliderListener", "NodeCollider", "ActiveByOwner", "PowerArrow", "ScaleByOwner", "ScaleFix", "KnifeBuffComponent", "KnifeCountComponent", "KnifeInit", "KnifeMomentStateComponent", "KnifeOutOfWallComponent", "KnifeOwnerComponent", "KnifeStateComponent", "KnifeColliderNodeCtrl", "KnifeFixByCircleWallCtrl", "KnifeFixByWallCtrl", "KnifeMoveCtrl", "KnifeParentCtrl", "KnifeSkinCtrl", "HeroMove", "HeroMoveFix", "HeroMoveFixByBlock", "HeroMoveFixByCircle", "HeroRotate", "MoveAI", "MoveByKeyboard", "MoveByRandom", "MoveByTouch", "MoveStateNotice", "MoveWithOwnerNode", "AIMgr", "ActionBaseComponent", "ActionDefence", "ActionMove", "ConditionAISlow", "ConditionBaseComponent", "ConditionFindEscapePos", "ConditionFindNextPos", "ConditionFindNoDangerPos", "ConditionHasToward", "ConditionHighKnifeNum", "ConditionHighKnifeNumLocalHero", "ConditionHignKnifeNumNoPick", "ConditionInThenOutLocalHero", "ConditionKilled", "ConditionKnifeLessThenLocalHero", "ConditionKnifeMoreSilly", "ConditionKnifeMoreThenLocalHero", "ConditionLocalHeroDefence", "ConditionLocalHeroDefenceSilly", "ConditionLowKnifeNum", "ConditionLowKnifeNumLocalHero", "ConditionNearAnotherAI", "ConditionNearBlock", "ConditionNearKnife", "ConditionNearLocalHero", "ConditionNoMoreKnife", "ConditionRandomBool", "ConditionReviveTotal", "ConditionTowardLocalHero", "ConditionLastTime", "ConditionLastTimeAttackLocalHero", "ConditionLastTimeHeroAttack", "ConditionLastTimeHeroDefence", "ConditionLastTimePeace", "ConditionLastTimeToward", "CondtionLastTimeNearLocalHero", "CondtionTrue", "AttackRect", "BodyRectComponent", "DefenceRect", "FollowPlayerScale", "HeroFlag", "HeroFrenzyBar", "HeroKey", "HeroKnifeNum", "HeroScale", "PlaySoundByOwner", "PlayerBuffChangeListener", "PlayerBuffComponent", "PlayerFrenzyComponent", "PlayerKnivesComponent", "PlayerName", "PlayerRankIcon", "PlayerReviveFrenzyComponent", "PlayerSuitComponent", "SpeedShadow", "CameraZoomCtrl", "CollisionEventManager", "FollowCameraCtrl", "KnifeCollisionSoundCtrl", "EntityBase", "EntityBlock", "EntityBox", "EntityBuff", "EntityCircleWall", "EntityEffect", "EntityFollowPlayer", "EntityGuide", "EntityKnife", "EntityMap", "EntityPlayer", "EntityWall", "EntityWorld", "LogicPlayer", "AttackBoxCollisionHandleSystem", "BaseCollisionHandleSystem", "CameraZoomSystem", "GameRuleSystem", "GuideSystem", "HeroCollisionHandleSystem", "HeroReviveSystem", "KillMsgListener", "KnifeCollisionHandleSystem", "PickBuffCollisionHandleSystem", "PickKnifeCollisionHandleSystem", "PlayerDistanceSystem", "PlayerRankSystem", "WallRuleSystem", "AddEntitySystem", "GSGame", "GSHome", "HeroPosArrow", "ItemDailyTask", "ItemGuide", "ItemHeroSkin", "ItemHeroSkin_new", "ItemKnifeSkin", "ItemKnifeSkin_new", "ItemMatch", "ItemPKRank", "ItemPKReward", "ItemRank", "ItemRankMini", "ItemRankReward", "ItemRewardDetail", "ItemShopItem", "ItemSign", "ItemTreasureBox", "ItemWorldReward", "KeyCount", "KillMsg", "KillNotice", "ListItemBase", "MyScrollView", "PanelAddTop", "PanelBuySkin", "PanelCheat", "PanelDailyTask", "PanelEvaulate", "PanelFirstGuide", "PanelFriend", "PanelGameOver", "PanelGetSkin", "PanelGrowUp", "PanelHeroPosArr", "PanelHeroShop", "PanelHeroShop_new", "PanelHolidayRank", "PanelInvite", "PanelKnifeShop", "PanelKnifeShop_new", "PanelLevelUp", "PanelMatch", "PanelNotice", "PanelNotification", "PanelOfflineGold", "PanelPkReward", "PanelProperty", "PanelRank", "PanelRankInfo", "PanelRepay", "PanelRevive", "PanelReviveNotice", "PanelReward", "PanelRewardDetail", "PanelShop", "PanelSign", "PanelSubscribe", "PanelSubscribeReward", "PanelTaskNotice", "PanelTips", "PanelTop", "PanelTreasureBox", "PanelTryFrenzy", "PanelTryOut", "PanelTrySuit", "PanelWorldReward", "PlayerRankItem", "UIMgr", "AdBtn", "AdvertMgr", "AudioEngine", "BagItem", "Centered", "CollisionManager", "Contact", "GoldAnim", "LanguageMgr", "Launcher", "Loading", "MywIdget", "PayMgr", "PlatformMgr", "PoolMgr", "PosFix", "ScrollViewCulling", "ShareMgr", "TaskMgr", "Tools", "Types", "UIUtil", "UpdateMgr", "UtilPhysics", "VibrateUtil", "ctx", "ConfigData", "GameData", "PlayerData", "Gif", "Item", "Quee", "Slot", "WeiShuSdk", "mta_analysis", "TestNodePool", "TestTimer" ]);