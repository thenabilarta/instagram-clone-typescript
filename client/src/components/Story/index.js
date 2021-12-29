"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var story_module_css_1 = __importDefault(require("./story.module.css"));
function Story(_a) {
    var user = _a.user;
    if (user) {
        return (<div className={story_module_css_1.default.story}>
        <div className={story_module_css_1.default.storyLine}>
          <div className={story_module_css_1.default.storyImage}>
            <img src={user.profilePictureSRC} alt=""/>
          </div>
        </div>
        <div className={story_module_css_1.default.storyUsername}>
          <p>{user.username}</p>
        </div>
      </div>);
    }
    else {
        return null;
    }
}
exports.default = Story;
