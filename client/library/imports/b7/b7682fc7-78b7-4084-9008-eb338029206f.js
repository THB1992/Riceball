"use strict";
cc._RF.push(module, 'b7682/HeLdAhJAI6zOAKSBv', 'use_v2.1.x_cc.Action');
// migration/use_v2.1.x_cc.Action.js

"use strict";

/*
 * This script is automatically generated by Cocos Creator and is only used for projects compatible with the v2.1.0/2.1.1 version.
 * You do not need to manually add this script in any other project.
 * If you don't use cc.Action in your project, you can delete this script directly.
 * If your project is hosted in VCS such as git, submit this script together.
 *
 * 此脚本由 Cocos Creator 自动生成，仅用于兼容 v2.1.0/2.1.1 版本的工程，
 * 你无需在任何其它项目中手动添加此脚本。
 * 如果你的项目中没用到 Action，可直接删除该脚本。
 * 如果你的项目有托管于 git 等版本库，请将此脚本一并上传。
 */

// Revert the rotation direction of Actions associated with 2D rotation (such as cc.rotateBy) to keep it consistent with v2.1.0/2.1.1.
// 将跟 2D 旋转相关的 Action （如 cc.rotateBy）的旋转朝向取反，以保持跟 v2.1.0/2.1.1 行为一致。
cc.macro.ROTATE_ACTION_CCW = true;

cc._RF.pop();