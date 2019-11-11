'use strict';

// *****************************
// Настройки отображения страницы
// *****************************

var form = document.querySelector('.ad-form');
var mapFilter = document.querySelector('.map__filters');
var fieldsets = form.querySelectorAll('fieldset');
var pinAddress = document.querySelector('#address');

// Переключаем карту из неактивного состояния в активное
var activateMap = function () {
  map.classList.remove('map--faded');
};

// Определение состояния страницы (активная/неактивная)
var checkStatePage = function (statePage) {

  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = statePage;
  }
  pinAddress.readOnly = true;
  // Неактивное состояние страницы
  var coordinateX;
  var coordinateY;
  if (statePage) {
    mapFilter.classList.add('ad-form--disabled');

    coordinateX = Math.round(+pinMain.style.left.slice(0, -2) + pinMain.clientWidth / 2);
    coordinateY = Math.round(+pinMain.style.top.slice(0, -2) + pinMain.clientHeight / 2);
    pinAddress.value = coordinateX + ', ' + coordinateY;

    // Активное состояние страницы
  } else {

    activateMap();
    renderPin(dataAds);
    renderAd(dataAds);
    mapFilter.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    coordinateX = Math.round(+pinMain.style.left.slice(0, -2) + pinMain.clientWidth / 2);
    coordinateY = Math.round(+pinMain.style.top.slice(0, -2) + pinMain.clientHeight + AVATAR_POINTER_HEIGHT);
    pinAddress.value = coordinateX + ', ' + coordinateY;
  }
};
checkStatePage(true);
