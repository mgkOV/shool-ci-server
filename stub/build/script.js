(function(){"use strict";

function toggleAccordion(event) {
  var allAccordions = document.querySelectorAll(".e-accordion");
  var accordion = event.target.closest(".e-accordion");
  if (!accordion) return;
  var accordionMore = accordion.querySelector(".e-accordion__more");
  allAccordions.forEach(function (a) {
    if (a === accordion) return;
    var more = a.querySelector(".e-accordion__more_view_default");
    if (!more) return;
    more.classList.remove("e-accordion__more_view_default");
  });
  accordionMore.classList.toggle("e-accordion__more_view_default");
}

function switchTheme(event) {
  var onoff = event.target.closest(".onoffswitch");
  if (!onoff) return;
  var defaults = document.querySelectorAll(".theme_color_project-default");
  var inverses = document.querySelectorAll(".theme_color_project-inverse");
  defaults.forEach(function (d) {
    return changeTheme(d, "theme_color_project-default", "theme_color_project-inverse");
  });
  inverses.forEach(function (d) {
    return changeTheme(d, "theme_color_project-inverse", "theme_color_project-default");
  });
  onoff.classList.toggle("onoffswitch_checked");
}

function changeTheme(el, theme1, theme2) {
  el.classList.remove(theme1);
  el.classList.add(theme2);
}

document.addEventListener("DOMContentLoaded", ready);

function ready() {
  document.body.addEventListener("click", handleClick);
}

function handleClick(event) {
  switchTheme(event);
  toggleAccordion(event);
}})();