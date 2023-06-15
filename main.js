(()=>{"use strict";function e(e){e.classList.add("popup_opened"),document.addEventListener("keydown",r),e.addEventListener("click",o)}function t(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",r),e.removeEventListener("click",o)}var r=function(e){"Escape"===e.key&&t(document.querySelector(".popup_opened"))};function o(e){var r=document.querySelector(".popup_opened");e.target===r&&t(r)}var n=document.querySelector(".popup-edit"),c=document.querySelector(".popup__big-image"),u=document.querySelector(".profile__name"),i=document.querySelector(".profile__caption"),a=document.querySelector(".popup__editForm"),l=a.querySelector(".popup__input_type_name"),s=a.querySelector(".popup__input_type_status"),p=document.querySelector(".popup__image"),d=document.querySelector(".popup__image-caption"),_={formSelector:".popup__form",inputSelector:".popup__input ",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},m=function(e){var t=Array.from(e.querySelectorAll(_.inputSelector)),r=e.querySelector(_.submitButtonSelector);t.forEach((function(o){o.addEventListener("input",(function(){v(e,o),function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(_.inactiveButtonClass),t.disabled=!1):(t.classList.add(_.inactiveButtonClass),t.disabled=!0)}(t,r)}))}))},v=function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t){var r=_.inputErrorClass,o=_.errorClass,n=e.querySelector("#".concat(t.id,"-error"));t.classList.remove(r),n.classList.remove(o),n.textContent=""}(e,t):function(e,t,r){var o=_.inputErrorClass,n=_.errorClass,c=e.querySelector("#".concat(t.id,"-error"));t.classList.add(o),c.textContent=r,c.classList.add(n)}(e,t,t.validationMessage)};function f(t,r){var o=document.querySelector("#cards-template").content.querySelector(".card").cloneNode(!0),n=o.querySelector(".card__image"),u=o.querySelector(".card__heading");return n.src=r,n.alt=t,u.textContent=t,o.querySelector(".card__like").addEventListener("click",(function(e){e.target.classList.toggle("card__like_active")})),o.querySelector(".card__trash-icon").addEventListener("click",(function(e){e.target.closest(".card").remove()})),n.addEventListener("click",(function(){e(c),p.src=n.src,p.alt=n.alt,d.textContent=n.alt})),o}var y=document.forms["profile-form"],S=document.forms["card-form"],q=document.querySelector(".profile__edit-button"),L=document.querySelector(".profile__add-button"),E=document.querySelector(".popup-add"),C=document.querySelectorAll(".popup__close"),b=document.querySelector(".popup__input_type_place"),g=document.querySelector(".popup__input_type_url"),k=document.querySelector(".cards");q.addEventListener("click",(function(){e(n),l.value=u.textContent,s.value=i.textContent})),L.addEventListener("click",(function(){e(E),E.querySelector(_.submitButtonSelector).classList.add(_.inactiveButtonClass)})),y.addEventListener("submit",(function(){u.textContent=l.value,i.textContent=s.value,t(n)})),C.forEach((function(e){var r=e.closest(".popup");e.addEventListener("click",(function(){return t(r)}))})),initialCards.forEach((function(e){var t=f(e.name,e.link);k.append(t)})),S.addEventListener("submit",(function(e){k.prepend(f(b.value,g.value)),e.target.reset(),t(E)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),m(e)}))}(_)})();