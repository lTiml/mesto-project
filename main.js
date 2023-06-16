(()=>{"use strict";var e={};function t(e){e.classList.add("popup_opened"),document.addEventListener("keydown",r),e.addEventListener("click",o)}function n(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",r),e.removeEventListener("click",o)}(e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})})(e);var r=function(e){"Escape"===e.key&&n(document.querySelector(".popup_opened"))};function o(e){var t=document.querySelector(".popup_opened");e.target===t&&n(t)}var c=document.querySelector(".popup-edit"),a=(document.querySelector(".popup__big-image"),document.querySelector(".profile__name")),u=document.querySelector(".profile__caption"),i=document.querySelector(".profile__avatar"),l=document.querySelector(".popup__editForm"),d=l.querySelector(".popup__input_type_name"),s=l.querySelector(".popup__input_type_status"),p=(document.querySelector(".popup__image"),document.querySelector(".popup__image-caption"),{formSelector:".popup__form",inputSelector:".popup__input ",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"}),f={url:"https://nomoreparties.co/v1/plus-cohort-25",headers:{authorization:"adc8e3cc-cb42-435c-8b1d-a7d4774aba24","Content-Type":"application/json"}},m=function(e){var t=e.button,n=e.text,r=e.disabled;t.disabled=!!r&&"disabled",t.textContent=n},_=function(e){var t=Array.from(e.querySelectorAll(p.inputSelector)),n=e.querySelector(p.submitButtonSelector);t.forEach((function(r){r.addEventListener("input",(function(){v(e,r),function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(p.inactiveButtonClass),t.disabled=!1):(t.classList.add(p.inactiveButtonClass),t.disabled=!0)}(t,n)}))}))},v=function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t){var n=p.inputErrorClass,r=p.errorClass,o=e.querySelector("#".concat(t.id,"-error"));t.classList.remove(n),o.classList.remove(r),o.textContent=""}(e,t):function(e,t,n){var r=p.inputErrorClass,o=p.errorClass,c=e.querySelector("#".concat(t.id,"-error"));t.classList.add(r),c.textContent=n,c.classList.add(o)}(e,t,t.validationMessage)},y=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},h=function(e,t,n){var r=e.querySelector(".card__like");e.querySelector(".card__like-counter").textContent=t.length,function(e,t){return Boolean(e.find((function(e){return e._id===t})))}(t,n)?r.classList.add("card__like_active"):r.classList.remove("card__like_active")},b=function(e,t,n){(function(e,t){return fetch("".concat(f.url,"/cards/likes/").concat(e),{method:t?"DELETE":"PUT",headers:f.headers}).then((function(e){return y(e)}))})(e,t).then((function(e){h(n,e.likes,userId)})).catch((function(e){return console.log("handleWatchingLikesState error: ".concat(e))}))};function S(e,t){var n=document.querySelector("#cards-template").content.querySelector(".card").cloneNode(!0),r=n.querySelector(".card__image"),o=n.querySelector(".card__heading"),c=n.querySelector(".card__like"),a=n.querySelector(".card__trash-icon");return r.src=e.link,r.alt=e.name,o.textContent=e.name,h(n,e.likes,t),e.owner._id!==t&&a.remove(),c.addEventListener("click",(function(){b(e._id,c.classList.contains("card__like_active"),n)})),a.addEventListener("click",(function(){return function(e,t){(function(e){return fetch("".concat(f.url,"/cards/").concat(e),{method:"DELETE",headers:f.headers}).then(y)})(e).then((function(){!function(e){e.remove(),e=null}(t)})).catch((function(e){return console.log("handleDeleteCard error: ".concat(e))}))}(e._id,n)})),n}var q=function(t,n){var r=S(t,n);e.default.prepend(r)};function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var C=document.forms["profile-form"],E=document.forms["card-form"],L=document.forms["avatar-form"],k=document.querySelector(".popup-new-avatar"),x=document.querySelector(".profile__edit-button"),A=document.querySelector(".profile__add-button"),j=document.querySelector(".popup__button_add"),w=document.querySelector(".popup-add"),O=document.querySelectorAll(".popup__close"),T=document.querySelector(".popup__input_type_place"),P=document.querySelector(".popup__input_type_url"),B=document.querySelector(".popup__input_type_avatar_url"),D=document.querySelector(".popup__button_new-avatar"),I=document.querySelector(".popup__button-edit-profile"),M=document.querySelector(".cards");x.addEventListener("click",(function(){t(c),d.value=a.textContent,s.value=u.textContent})),A.addEventListener("click",(function(){t(w),w.querySelector(p.submitButtonSelector).classList.add(p.inactiveButtonClass)})),C.addEventListener("submit",(function(){a.textContent=d.value,u.textContent=s.value,n(c)})),O.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return n(t)}))})),w.addEventListener("submit",(function(e){M.prepend(S(T.value,P.value)),e.target.reset(),n(w)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),_(e)}))}(p),Promise.all([fetch("".concat(f.url,"/users/me"),{headers:f.headers}).then(y).catch((function(e){return console.log("Ошибка в userInfo: ".concat(e))})),fetch("".concat(f.url,"/cards"),{headers:f.headers}).then(y)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return g(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?g(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];d.textContent=o.name,s.textContent=o.about,i.src=o.avatar,o._id,c.forEach((function(e){q(M,e)}))})).catch((function(e){return console.log("Ошибка в getInfo: ".concat(e))})),C.addEventListener("submit",(function(e){var t;e.preventDefault(),m({button:I,text:"Сохраняем...",disabled:!0}),(t={name:d.value,about:s.value},fetch("".concat(f.url,"/users/me"),{method:"PATCH",headers:f.headers,body:JSON.stringify(t)}).then(y)).then((function(e){a.textContent=e.name,u.textContent=e.about,n(c)})).catch((function(e){return console.log("Ошибка в handleProfile: ".concat(e))})).finally((function(){m({button:j,text:"Сохранить",disabled:!1})}))})),E.addEventListener("submit",(function(e){var t;e.preventDefault(),m({button:j,text:"Сохраняем...",disabled:!0}),(t={name:T.value,link:P.value},console.log(t),fetch("".concat(f.url,"/cards"),{method:"POST",headers:f.headers,body:JSON.stringify(t)}).then(y)).then((function(t){q(M,t),n(w),e.target.reset()})).catch((function(e){return console.log("Ошибка в addNewCard: ".concat(e))})).finally((function(){m({button:j,text:"Сохранить",disabled:!1})}))})),L.addEventListener("submit",(function(e){var t;e.preventDefault(),m({button:D,text:"Сохраняем...",disabled:!0}),(t={avatar:B.value},fetch("".concat(f.url,"/users/me/avatar"),{method:"PATCH",headers:f.headers,body:JSON.stringify(t)}).then(y)).then((function(t){i.src=t.avatar,n(k),e.target.reset()})).catch((function(e){return console.log("Ошибка в submitAvatar: ".concat(e))})).finally((function(){m({button:D,text:"Сохранить",disabled:!1})}))}))})();