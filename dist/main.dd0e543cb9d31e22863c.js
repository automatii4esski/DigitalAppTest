/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/Form.js":
/*!************************!*\
  !*** ./src/js/Form.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Form: () => (/* binding */ Form)
/* harmony export */ });
/* harmony import */ var _FormValidation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormValidation */ "./src/js/FormValidation.js");

class Form {
  elementClass;
  element;
  errorElements = {};
  schema;
  validation = new _FormValidation__WEBPACK_IMPORTED_MODULE_0__.FormValidation();
  constructor(elementClass, schema) {
    this.elementClass = elementClass;
    this.element = document.querySelector('.' + elementClass);
    this.schema = schema;
    this.findErrorElements();
  }
  findErrorElements() {
    let element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.element;
    for (const el of element.querySelectorAll('[data-error]')) {
      this.errorElements[el.dataset.for] = el;
    }
  }
  resetForm() {
    this.element.reset();
    this.resetErrors();
  }
  resetSingleError(name) {
    this.validation.resetSingleError(name);
    this.errorElements[name].textContent = '';
  }
  resetErrors() {
    for (const value of Object.values(this.errorElements)) {
      value.textContent = '';
    }
    this.validation.resetErrors();
  }
  validateForm() {
    if (!this.schema) return;
    const formData = new FormData(this.element);
    const errors = this.validation.validateFormData(formData, this.schema);
    if (Object.keys(errors).length !== 0) return false;
    return true;
  }
  fillErrors() {
    for (const [key, value] of Object.entries(this.validation.errors)) {
      this.errorElements[key].textContent = value;
    }
  }
}

/***/ }),

/***/ "./src/js/FormValidation.js":
/*!**********************************!*\
  !*** ./src/js/FormValidation.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormValidation: () => (/* binding */ FormValidation)
/* harmony export */ });
/* harmony import */ var _Messages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Messages */ "./src/js/Messages.js");

class FormValidation {
  errors = {};
  resetErrors() {
    this.errors = {};
  }
  resetSingleError(name) {
    delete this.errors[name];
  }
  validateFormData(formData, schema) {
    for (const [key, value] of formData.entries()) {
      const params = schema[key];
      if (!params) continue;
      if (!this.validateByIsRequired(key, value, params)) continue;
      if (!this.validateByMinLength(key, value, params)) continue;
      if (!this.validateByMaxLength(key, value, params)) continue;
      if (!this.validateByRegEx(key, value, params)) continue;
    }
    return this.errors;
  }
  validateByMaxLength(key, value, params) {
    if (params.maxLength && value.length > params.maxLength) {
      this.errors[key] = _Messages__WEBPACK_IMPORTED_MODULE_0__.Messages.maxLengthError(params.maxLength);
      return false;
    }
    return true;
  }
  validateByMinLength(key, value, params) {
    if (params.minLength && value.length < params.minLength) {
      this.errors[key] = _Messages__WEBPACK_IMPORTED_MODULE_0__.Messages.minLengthError(params.minLength);
      return false;
    }
    return true;
  }
  validateByIsRequired(key, value, params) {
    if (params.isRequired && !value) {
      this.errors[key] = _Messages__WEBPACK_IMPORTED_MODULE_0__.Messages.isRequiredError(key);
      return false;
    }
    return true;
  }
  validateByRegEx(key, value, params) {
    if (params.regEx && !params.regEx.test(value)) {
      this.errors[key] = _Messages__WEBPACK_IMPORTED_MODULE_0__.Messages.invalidFormatError(key);
      return false;
    }
    return true;
  }
}

/***/ }),

/***/ "./src/js/Main.js":
/*!************************!*\
  !*** ./src/js/Main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modal */ "./src/js/Modal.js");
/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Overlay */ "./src/js/Overlay.js");
/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Form */ "./src/js/Form.js");
/* harmony import */ var _Schemas__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Schemas */ "./src/js/Schemas.js");




const contactButton = document.querySelector('.contact__button');
const messageForm = new _Form__WEBPACK_IMPORTED_MODULE_2__.Form('modal-message__form', _Schemas__WEBPACK_IMPORTED_MODULE_3__.messageFormSchema);
const modalMessage = new _Modal__WEBPACK_IMPORTED_MODULE_0__.ModalForm('modal-message', messageForm);
const modalSuccess = new _Modal__WEBPACK_IMPORTED_MODULE_0__.Modal('modal-success');
_Modal__WEBPACK_IMPORTED_MODULE_0__.Modal.commonWrapper.addEventListener('click', e => e.stopPropagation());
_Modal__WEBPACK_IMPORTED_MODULE_0__.Modal.commonCloseButton.addEventListener('click', () => _Overlay__WEBPACK_IMPORTED_MODULE_1__.Overlay.hideWithModal());
_Overlay__WEBPACK_IMPORTED_MODULE_1__.Overlay.element.addEventListener('click', () => _Overlay__WEBPACK_IMPORTED_MODULE_1__.Overlay.hideWithModal());
contactButton.addEventListener('click', () => modalMessage.show());
messageForm.element.addEventListener('submit', e => {
  e.preventDefault();
  if (!messageForm.validateForm()) {
    messageForm.fillErrors();
    return;
  }
  modalMessage.hide();
  modalSuccess.show();
});
messageForm.element.addEventListener('change', e => {
  messageForm.resetSingleError(e.target.name);
});

/***/ }),

/***/ "./src/js/Messages.js":
/*!****************************!*\
  !*** ./src/js/Messages.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Messages: () => (/* binding */ Messages)
/* harmony export */ });
class Messages {
  static isRequiredError(name) {
    return `Field ${name} is requierd`;
  }
  static maxLengthError(length) {
    return `Max length is ${length}`;
  }
  static minLengthError(length) {
    return `Min length is ${length}`;
  }
  static invalidFormatError(name) {
    return `${name} has invalid format`;
  }
}

/***/ }),

/***/ "./src/js/Modal.js":
/*!*************************!*\
  !*** ./src/js/Modal.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Modal: () => (/* binding */ Modal),
/* harmony export */   ModalForm: () => (/* binding */ ModalForm)
/* harmony export */ });
/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Form */ "./src/js/Form.js");
/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Overlay */ "./src/js/Overlay.js");


class Modal {
  static commonWrapper = document.querySelector('.modal-wrapper');
  static commonCloseButton = document.querySelector('.modal-wrapper__close-button');
  elementClass;
  element;
  constructor(elementClass) {
    this.elementClass = elementClass;
    this.element = document.querySelector('.' + elementClass);
  }
  show() {
    _Overlay__WEBPACK_IMPORTED_MODULE_1__.Overlay.show();
    _Overlay__WEBPACK_IMPORTED_MODULE_1__.Overlay.setOnHide(() => this.hide());
    this.element.classList.remove(this.elementClass + '--hidden');
  }
  hide() {
    this.element.classList.add(this.elementClass + '--hidden');
  }
}
class ModalForm extends Modal {
  form;
  constructor(elementClass, form) {
    super(elementClass);
    this.form = form;
  }
  hide() {
    super.hide();
    this.form.resetForm();
  }
}

/***/ }),

/***/ "./src/js/Overlay.js":
/*!***************************!*\
  !*** ./src/js/Overlay.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Overlay: () => (/* binding */ Overlay)
/* harmony export */ });
class Overlay {
  static elementClass = 'modal-overlay';
  static element = document.querySelector('.' + this.elementClass);
  static bodyElement = document.querySelector('body');
  static onHide;
  static show() {
    this.element.classList.remove(this.elementClass + '--hidden');
    this.bodyElement.classList.add('body--hidden');
  }
  static hide() {
    this.element.classList.add(this.elementClass + '--hidden');
    this.bodyElement.classList.remove('body--hidden');
  }
  static hideWithModal() {
    this.onHide && this.onHide();
    this.hide();
  }
  static setOnHide(onHideFunction) {
    this.onHide = onHideFunction;
  }
}

/***/ }),

/***/ "./src/js/Schemas.js":
/*!***************************!*\
  !*** ./src/js/Schemas.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   messageFormSchema: () => (/* binding */ messageFormSchema)
/* harmony export */ });
const messageFormSchema = {
  fullName: {
    minLength: 4,
    isRequired: true
  },
  email: {
    minLength: 3,
    isRequired: true,
    regEx: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  },
  message: {
    maxLength: 25
  }
};

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/assets/fonts sync recursive \\.(woff%7Cwoff2)$/":
/*!***************************************************!*\
  !*** ./src/assets/fonts/ sync \.(woff%7Cwoff2)$/ ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./Galien-Bold.woff": "./src/assets/fonts/Galien-Bold.woff",
	"./Galien-Bold.woff2": "./src/assets/fonts/Galien-Bold.woff2",
	"./Gilroy-Bold.woff": "./src/assets/fonts/Gilroy-Bold.woff",
	"./Gilroy-Bold.woff2": "./src/assets/fonts/Gilroy-Bold.woff2",
	"./Gilroy-Light.woff": "./src/assets/fonts/Gilroy-Light.woff",
	"./Gilroy-Light.woff2": "./src/assets/fonts/Gilroy-Light.woff2",
	"./Gilroy-Medium.woff": "./src/assets/fonts/Gilroy-Medium.woff",
	"./Gilroy-Medium.woff2": "./src/assets/fonts/Gilroy-Medium.woff2",
	"./Gilroy-Regular.woff": "./src/assets/fonts/Gilroy-Regular.woff",
	"./Gilroy-Regular.woff2": "./src/assets/fonts/Gilroy-Regular.woff2",
	"./Gilroy-SemiBold.woff": "./src/assets/fonts/Gilroy-SemiBold.woff",
	"./Gilroy-SemiBold.woff2": "./src/assets/fonts/Gilroy-SemiBold.woff2"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/assets/fonts sync recursive \\.(woff%7Cwoff2)$/";

/***/ }),

/***/ "./src/assets/img sync recursive \\.(png%7Cjpg%7Cgif%7Csvg%7Cwebp)$/":
/*!*****************************************************************!*\
  !*** ./src/assets/img/ sync \.(png%7Cjpg%7Cgif%7Csvg%7Cwebp)$/ ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./content/home-bg.png": "./src/assets/img/content/home-bg.png",
	"./content/service-1.png": "./src/assets/img/content/service-1.png",
	"./content/service-2.png": "./src/assets/img/content/service-2.png",
	"./content/service-3.png": "./src/assets/img/content/service-3.png",
	"./icons/arrow-right.svg": "./src/assets/img/icons/arrow-right.svg",
	"./icons/cross.svg": "./src/assets/img/icons/cross.svg",
	"./icons/success.svg": "./src/assets/img/icons/success.svg",
	"./logo-alt.svg": "./src/assets/img/logo-alt.svg",
	"./logo.svg": "./src/assets/img/logo.svg"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/assets/img sync recursive \\.(png%7Cjpg%7Cgif%7Csvg%7Cwebp)$/";

/***/ }),

/***/ "./src/assets/fonts/Galien-Bold.woff":
/*!*******************************************!*\
  !*** ./src/assets/fonts/Galien-Bold.woff ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Galien-Bold.woff";

/***/ }),

/***/ "./src/assets/fonts/Galien-Bold.woff2":
/*!********************************************!*\
  !*** ./src/assets/fonts/Galien-Bold.woff2 ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Galien-Bold.woff2";

/***/ }),

/***/ "./src/assets/fonts/Gilroy-Bold.woff":
/*!*******************************************!*\
  !*** ./src/assets/fonts/Gilroy-Bold.woff ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Gilroy-Bold.woff";

/***/ }),

/***/ "./src/assets/fonts/Gilroy-Bold.woff2":
/*!********************************************!*\
  !*** ./src/assets/fonts/Gilroy-Bold.woff2 ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Gilroy-Bold.woff2";

/***/ }),

/***/ "./src/assets/fonts/Gilroy-Light.woff":
/*!********************************************!*\
  !*** ./src/assets/fonts/Gilroy-Light.woff ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Gilroy-Light.woff";

/***/ }),

/***/ "./src/assets/fonts/Gilroy-Light.woff2":
/*!*********************************************!*\
  !*** ./src/assets/fonts/Gilroy-Light.woff2 ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Gilroy-Light.woff2";

/***/ }),

/***/ "./src/assets/fonts/Gilroy-Medium.woff":
/*!*********************************************!*\
  !*** ./src/assets/fonts/Gilroy-Medium.woff ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Gilroy-Medium.woff";

/***/ }),

/***/ "./src/assets/fonts/Gilroy-Medium.woff2":
/*!**********************************************!*\
  !*** ./src/assets/fonts/Gilroy-Medium.woff2 ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Gilroy-Medium.woff2";

/***/ }),

/***/ "./src/assets/fonts/Gilroy-Regular.woff":
/*!**********************************************!*\
  !*** ./src/assets/fonts/Gilroy-Regular.woff ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Gilroy-Regular.woff";

/***/ }),

/***/ "./src/assets/fonts/Gilroy-Regular.woff2":
/*!***********************************************!*\
  !*** ./src/assets/fonts/Gilroy-Regular.woff2 ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Gilroy-Regular.woff2";

/***/ }),

/***/ "./src/assets/fonts/Gilroy-SemiBold.woff":
/*!***********************************************!*\
  !*** ./src/assets/fonts/Gilroy-SemiBold.woff ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Gilroy-SemiBold.woff";

/***/ }),

/***/ "./src/assets/fonts/Gilroy-SemiBold.woff2":
/*!************************************************!*\
  !*** ./src/assets/fonts/Gilroy-SemiBold.woff2 ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Gilroy-SemiBold.woff2";

/***/ }),

/***/ "./src/assets/img/content/home-bg.png":
/*!********************************************!*\
  !*** ./src/assets/img/content/home-bg.png ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/img/content/home-bg.png";

/***/ }),

/***/ "./src/assets/img/content/service-1.png":
/*!**********************************************!*\
  !*** ./src/assets/img/content/service-1.png ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/img/content/service-1.png";

/***/ }),

/***/ "./src/assets/img/content/service-2.png":
/*!**********************************************!*\
  !*** ./src/assets/img/content/service-2.png ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/img/content/service-2.png";

/***/ }),

/***/ "./src/assets/img/content/service-3.png":
/*!**********************************************!*\
  !*** ./src/assets/img/content/service-3.png ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/img/content/service-3.png";

/***/ }),

/***/ "./src/assets/img/icons/arrow-right.svg":
/*!**********************************************!*\
  !*** ./src/assets/img/icons/arrow-right.svg ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/img/icons/arrow-right.svg";

/***/ }),

/***/ "./src/assets/img/icons/cross.svg":
/*!****************************************!*\
  !*** ./src/assets/img/icons/cross.svg ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/img/icons/cross.svg";

/***/ }),

/***/ "./src/assets/img/icons/success.svg":
/*!******************************************!*\
  !*** ./src/assets/img/icons/success.svg ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/img/icons/success.svg";

/***/ }),

/***/ "./src/assets/img/logo-alt.svg":
/*!*************************************!*\
  !*** ./src/assets/img/logo-alt.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/img/logo-alt.svg";

/***/ }),

/***/ "./src/assets/img/logo.svg":
/*!*********************************!*\
  !*** ./src/assets/img/logo.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/img/logo.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.scss */ "./src/styles/main.scss");
/* harmony import */ var _assets_fonts_Gilroy_Medium_woff__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/fonts/Gilroy-Medium.woff */ "./src/assets/fonts/Gilroy-Medium.woff");
/* harmony import */ var _js_Main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/Main */ "./src/js/Main.js");


__webpack_require__("./src/assets/img sync recursive \\.(png%7Cjpg%7Cgif%7Csvg%7Cwebp)$/");
__webpack_require__("./src/assets/fonts sync recursive \\.(woff%7Cwoff2)$/");

})();

/******/ })()
;
//# sourceMappingURL=main.dd0e543cb9d31e22863c.js.map