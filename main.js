(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){e.classList.add("popup_opened"),document.addEventListener("keydown",r),e.addEventListener("click",o)}function n(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",r),e.removeEventListener("click",o)}e.d({},{MG:()=>U,LM:()=>H});var r=function(e){"Escape"===e.key&&n(document.querySelector(".popup_opened"))};function o(e){var t=document.querySelector(".popup_opened");e.target===t&&n(t)}var c=document.querySelector(".popup-edit"),a=document.querySelector(".popup__big-image"),u=document.querySelector(".profile__name"),i=document.querySelector(".profile__caption"),l=document.querySelector(".profile__avatar"),d=document.querySelector(".popup__editForm"),s=d.querySelector(".popup__input_type_name"),p=d.querySelector(".popup__input_type_status"),f=document.querySelector(".popup__image"),m=document.querySelector(".popup__image-caption"),_={formSelector:".popup__form",inputSelector:".popup__input ",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},v={url:"https://nomoreparties.co/v1/plus-cohort-25",headers:{authorization:"adc8e3cc-cb42-435c-8b1d-a7d4774aba24","Content-Type":"application/json"}},y=function(e){var t=e.button,n=e.text,r=e.disabled;t.disabled=!!r&&"disabled",t.textContent=n},h=function(e){var t=Array.from(e.querySelectorAll(_.inputSelector)),n=e.querySelector(_.submitButtonSelector);t.forEach((function(r){r.addEventListener("input",(function(){b(e,r),function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(_.inactiveButtonClass),t.disabled=!1):(t.classList.add(_.inactiveButtonClass),t.disabled=!0)}(t,n)}))}))},b=function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t){var n=_.inputErrorClass,r=_.errorClass,o=e.querySelector("#".concat(t.id,"-error"));t.classList.remove(n),o.classList.remove(r),o.textContent=""}(e,t):function(e,t,n){var r=_.inputErrorClass,o=_.errorClass,c=e.querySelector("#".concat(t.id,"-error"));t.classList.add(r),c.textContent=n,c.classList.add(o)}(e,t,t.validationMessage)},S=function(e,t,n){var r=e.querySelector(".card__like");e.querySelector(".card__like-counter").textContent=t.length,function(e,t){return Boolean(e.find((function(e){return e._id===t})))}(t,n)?r.classList.add("card__like_active"):r.classList.remove("card__like_active")},q=function(e,n,r){var o=function(e,n){var r=document.querySelector("#cards-template").content.querySelector(".card").cloneNode(!0),o=r.querySelector(".card__image"),c=r.querySelector(".card__heading"),u=r.querySelector(".card__like"),i=r.querySelector(".card__trash-icon");return o.src=e.link,o.alt=e.name,c.textContent=e.name,S(r,e.likes,n),e.owner._id!==n&&i.remove(),u.addEventListener("click",(function(){H(e._id,u.classList.contains("card__like_active"),r)})),i.addEventListener("click",(function(){return U(e._id,r)})),o.addEventListener("click",(function(){t(a),f.alt=e.name,m.textContent=e.name,f.src=e.link})),r}(n,r);e.prepend(o)},g=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function C(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var L=document.forms["profile-form"],E=document.forms["card-form"],k=document.forms["avatar-form"],x=document.querySelector(".popup-new-avatar"),A=document.querySelector(".profile__edit-button"),w=document.querySelector(".profile__add-button"),O=document.querySelector(".popup__button_add"),j=document.querySelector(".popup-add"),P=document.querySelectorAll(".popup__close"),B=document.querySelector(".popup__input_type_place"),T=document.querySelector(".popup__input_type_url"),D=document.querySelector(".popup__input_type_avatar_url"),M=document.querySelector(".popup__button_new-avatar"),I=document.querySelector(".popup__button-edit-profile"),N=document.querySelector(".cards"),J=null;A.addEventListener("click",(function(){t(c),s.value=u.textContent,p.value=i.textContent})),w.addEventListener("click",(function(){t(j),j.querySelector(_.submitButtonSelector).classList.add(_.inactiveButtonClass)})),L.addEventListener("submit",(function(){u.textContent=s.value,i.textContent=p.value,n(c)})),P.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return n(t)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),h(e)}))}(_),Promise.all([fetch("".concat(v.url,"/users/me"),{headers:v.headers}).then(g).catch((function(e){return console.log("Ошибка в userInfo: ".concat(e))})),fetch("".concat(v.url,"/cards"),{headers:v.headers}).then(g)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return C(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?C(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];s.textContent=o.name,p.textContent=o.about,l.src=o.avatar,J=o._id,c.forEach((function(e){q(N,e,J)}))})).catch((function(e){return console.log("Ошибка в getInfo: ".concat(e))})),L.addEventListener("submit",(function(e){var t;e.preventDefault(),y({button:I,text:"Сохраняем...",disabled:!0}),(t={name:s.value,about:p.value},fetch("".concat(v.url,"/users/me"),{method:"PATCH",headers:v.headers,body:JSON.stringify(t)}).then(g)).then((function(e){u.textContent=e.name,i.textContent=e.about,n(c)})).catch((function(e){return console.log("Ошибка в handleProfile: ".concat(e))})).finally((function(){y({button:O,text:"Сохранить",disabled:!1})}))})),E.addEventListener("submit",(function(e){var t;e.preventDefault(),y({button:O,text:"Сохраняем...",disabled:!0}),(t={name:B.value,link:T.value},console.log(t),fetch("".concat(v.url,"/cards"),{method:"POST",headers:v.headers,body:JSON.stringify(t)}).then(g)).then((function(t){q(N,t,J),n(j),e.target.reset()})).catch((function(e){return console.log("Ошибка в addNewCard: ".concat(e))})).finally((function(){y({button:O,text:"Сохранить",disabled:!1})}))})),k.addEventListener("submit",(function(e){var t;e.preventDefault(),y({button:M,text:"Сохраняем...",disabled:!0}),(t={avatar:D.value},fetch("".concat(v.url,"/users/me/avatar"),{method:"PATCH",headers:v.headers,body:JSON.stringify(t)}).then(g)).then((function(t){l.src=t.avatar,n(x),e.target.reset()})).catch((function(e){return console.log("Ошибка в submitAvatar: ".concat(e))})).finally((function(){y({button:M,text:"Сохранить",disabled:!1})}))}));var H=function(e,t,n){var r,o;(r=e,o=t,fetch("".concat(v.url,"/cards/likes/").concat(r),{method:o?"DELETE":"PUT",headers:v.headers}).then((function(e){return g(e)}))).then((function(e){S(n,e.likes,J)})).catch((function(e){return console.log("Ошибка в handleWatchingLikesState: ".concat(e))}))},U=function(e,t){(function(e){return fetch("".concat(v.url,"/cards/").concat(e),{method:"DELETE",headers:v.headers}).then(g)})(e).then((function(){!function(e){e.remove(),e=null}(t)})).catch((function(e){return console.log("Ошибка в handleDeleteCard: ".concat(e))}))}})();