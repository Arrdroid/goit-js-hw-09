!function(){var t=document.querySelector("[data-start]"),n=document.querySelector("[data-stop]"),e=null;function a(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,"0"))}t.addEventListener("click",(function(){null===e&&(e=setInterval(a,1e3),t.disabled=!0)})),n.addEventListener("click",(function(){clearInterval(e),e=null,t.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.ae22b981.js.map
