"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var navbarmobile_module_css_1 = __importDefault(require("./navbarmobile.module.css"));
var instagramlogo_png_1 = __importDefault(require("../../assets/instagramlogo.png"));
function Navbar() {
    var history = (0, react_router_dom_1.useNavigate)();
    return (<div className={navbarmobile_module_css_1.default.navbarWrapperMobile}>
      <div className={navbarmobile_module_css_1.default.navbarInnerWrapperMobile}>
        <div className={navbarmobile_module_css_1.default.navbarMobile}>
          <div className={navbarmobile_module_css_1.default.logoWrapperMobile}>
            <img onClick={function () { return history("/"); }} className={navbarmobile_module_css_1.default.logoMobile} src={instagramlogo_png_1.default} alt=""/>
          </div>
        </div>
      </div>
    </div>);
}
exports.default = Navbar;
