'use strict';

(function () {

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
  function pinMainClickHandler(evt) {
    evt.preventDefault();
    checkStatePage(false);
  }

  pinMain.addEventListener('mousedown', pinMainClickHandler);
  pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      pinMainClickHandler();
    }
  }
  );

  // Обработчик перемещения главной метки

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var StartCoords = {
      X: evt.clientX,
      Y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var Shift = {
        X: StartCoords.X - moveEvt.clientX,
        Y: StartCoords.Y - moveEvt.clientY
      };

      StartCoords = {
        X: moveEvt.clientX,
        Y: moveEvt.clientY
      };

      pinMain.style.top = (pinMain.offsetTop - Shift.Y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - Shift.X) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

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
      window.renderPin(window.data.dataAds);
      window.renderAd(window.data.dataAds);
      mapFilter.classList.remove('ad-form--disabled');
      map.classList.remove('map--faded');
      window.form.classList.remove('ad-form--disabled');
      coordinateX = Math.round(+pinMain.style.left.slice(0, -2) + pinMain.clientWidth / 2);
      coordinateY = Math.round(+pinMain.style.top.slice(0, -2) + pinMain.clientHeight + AVATAR_POINTER_HEIGHT);
      pinAddress.value = coordinateX + ', ' + coordinateY;
    }
  };
  checkStatePage(true);

})();
