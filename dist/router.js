!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):(e="undefined"!=typeof globalThis?globalThis:e||self).MedusaRouter=r()}(this,function(){"use strict";class a{constructor(e){if(new.target!==a)throw new Error("Must use new command to generate instance");if(!e)throw new Error("The instantiation parameter is invalid");return a.__platform__=e,a.__instance__||(a.__instance__=this),a.__instance__}static getInstance(e){return a.__instance__||(a.__instance__=new a(e)),a.__instance__}get $route(){var e=this.getPage(),{route:r,options:t={}}=e,n=this.decoding(t),n={...t,...n};return Reflect.deleteProperty(n,"_query_"),{...e,query:n,fullPath:`/${r}`}}getPage(e=0){var r=typeof e;if("string"!=r&&"number"!=r)throw new Error("The parameter is invalid");const t=getCurrentPages||a.__platform__.getCurrentPages;if(t){var n=t(),{length:r}=n;return e<r?n[r-1-+e]:null}throw new Error('The "getCurrentPages" is not supported on the current platform')}getPages(){const e=getCurrentPages||a.__platform__.getCurrentPages;if(e)return e();throw new Error('The "getCurrentPages" is not supported on the current platform')}decoding(e={}){var{_query_:e="{}"}=e;return JSON.parse(decodeURIComponent(e))}push(e){e=this._paramsPipe(e);a.__platform__.navigateTo(e)}replace(e){var r=this._paramsPipe(e),{closeAll:e=!1}=r;e?a.__platform__.reLaunch(r):a.__platform__.redirectTo(r)}switchTab(e){var r=this._paramsPipe(e),{url:e}=this._urlPipe(r.url);a.__platform__.switchTab({...r,url:e})}goBack(e=1){var r=typeof e;if("number"!=r&&"string"!=r){if("[object Object]"===Object.prototype.toString.call(e)){var{delta:r}=e;if(!r)throw new Error('The "delta" parameter is invalid');a.__platform__.navigateBack(e)}throw new Error("The parameter is invalid")}a.__platform__.navigateBack({delta:e})}goHome(){this.goBack(99)}_encoding(e={}){return encodeURIComponent(JSON.stringify(e))}_urlPipe(e=""){if(!e)throw new Error('The "url" parameter is necessary');if(!("string"==typeof e))throw new Error('The "url" parameter is invalid');var{route:r}=this.getPage(),[t,e]=e.split("?");if(`/${r}`===t)throw new Error(`Cannot jump to the "${t}"`);return{query:this._queryPipe(e),url:t}}_queryPipe(e=""){return e?e.split("&").reduce((e,r)=>{var[t,r]=r.split("=");return{...e,[t]:r}},{}):{}}_paramsPipe(e){if(!e)throw new Error('The "url" parameter is necessary');if("string"==typeof e)return{url:e};if("[object Object]"!==Object.prototype.toString.call(e))throw new Error("The parameter is invalid");var{url:r,query:t}=e,r=this._urlPipe(r);if(t){t=this._encoding({...r.query,...t}),t={...e,url:`${r.url}?_query_=${t}`};return Reflect.deleteProperty(t,"query"),t}return e}}return a});