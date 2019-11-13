'use strict';
var ENTER_KEYCODE = 13;
var AVATAR_POINTER_HEIGHT = 16;
var map = document.querySelector('.map');
var mapFilter = document.querySelector('.map__filters');
var fieldsets = window.form.querySelectorAll('fieldset');
var pinAddress = document.querySelector('#address');

// Переключаем карту из неактивного состояния в активное
var activateMap = function () {
  map.classList.remove('map--faded');
};

// Обработчик нажатия кнопки на главной метке

var pinMain = document.querySelector('.map__pin--main');

function pinMainClickHandler() {
  checkStatePage(false);
}

pinMain.addEventListener('mousedown', pinMainClickHandler);
pinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    pinMainClickHandler();
  }
}
);

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
    renderPin(window.data.dataAds);
    renderAd(window.data.dataAds);
    mapFilter.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    window.form.classList.remove('ad-form--disabled');
    coordinateX = Math.round(+pinMain.style.left.slice(0, -2) + pinMain.clientWidth / 2);
    coordinateY = Math.round(+pinMain.style.top.slice(0, -2) + pinMain.clientHeight + AVATAR_POINTER_HEIGHT);
    pinAddress.value = coordinateX + ', ' + coordinateY;
  }
};
checkStatePage(true);

