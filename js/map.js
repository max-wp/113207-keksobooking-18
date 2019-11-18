'use strict';

(function () {
  var map = document.querySelector('.map');

  var setMainPinCoordinates = function () {
    window.util.addressInput.value = window.util.mapPinMainPositionX + ', ' + window.util.mapPinMainPositionY;
  };
  setMainPinCoordinates();

  var getDisabledFieldsets = function () {
    window.util.fieldsets.forEach(function (element, i) {
      window.util.fieldsets[i].setAttribute('disabled', '');
    });
  };
  getDisabledFieldsets();

  var receivedData = [];
  var setData = function (data) {
    for (var i = 0; i < data.length; i++) {
      receivedData.push(data[i]);
    }

    window.util.mapPinMain.addEventListener('mousedown', pageActiveHandler);

    window.util.mapPinMain.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.enterKeycode) {
        pageActiveHandler();
      }
    });
  };
  window.backend.load(setData, window.form.showErrorMessage);

  var getPin = function (object) {
    var similarPinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

    var pinElement = similarPinsTemplate.cloneNode(true);
    pinElement.style = 'left: ' + (object.location.x).toString() + 'px; top: ' + (object.location.y).toString() + 'px';
    pinElement.querySelector('img').src = object.author.avatar;
    pinElement.querySelector('img').alt = object.offer.title;

    var openPopupHandler = function () {
      var filters = document.querySelector('.map__filters-container');
      window.form.removePopupCards();
      map.insertBefore(getAdt(object), filters);
    };

    pinElement.addEventListener('click', openPopupHandler);
    pinElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.enterKeycode) {
        evt.preventDefault();
        openPopupHandler();
      }
    });

    return pinElement;
  };

  var getAdt = function (object) {
    var adtTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var adtElement = adtTemplate.cloneNode(true);

    adtElement.querySelector('.popup__title').textContent = object.offer.title;
    adtElement.querySelector('.popup__text--address').textContent = object.offer.address;
    adtElement.querySelector('.popup__text--price').textContent = object.offer.price + '₽/ночь';
    adtElement.querySelector('.popup__type').textContent = window.util.getTranslateTypes(object.offer.type);
    adtElement.querySelector('.popup__text--capacity').textContent = object.offer.rooms + ' ' + window.util.connectNounAndNumbers(object.offer.rooms, window.util.roomsArray) + ' для ' + object.offer.guests + ' ' + window.util.connectNounAndNumbers(object.offer.guests, window.util.guestsArray);
    adtElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
    adtElement.querySelector('.popup__features').innerHTML = '';
    adtElement.querySelector('.popup__features').appendChild(window.util.getFeaturesPic(object.offer.features));
    adtElement.querySelector('.popup__description').textContent = object.offer.description;
    adtElement.querySelector('.popup__photos').innerHTML = '';
    adtElement.querySelector('.popup__photos').appendChild(window.util.getPhotos(object.offer.photos));
    adtElement.querySelector('.popup__avatar').src = object.author.avatar;

    var popupEscPressHandler = function (evt) {
      if (evt.keyCode === window.util.escKeycode) {
        window.form.removePopupCards();
        return;
      }
    };

    map.addEventListener('click', function (evt) {
      if (!evt.target.matches('button[type="button"]')) {
        return;
      }
      window.form.removePopupCards();
      map.removeEventListener('keydown', popupEscPressHandler);
    });

    document.addEventListener('keydown', popupEscPressHandler);

    return adtElement;
  };

  var showPins = function (pins) {
    var similarListElement = document.querySelector('.map__pins');
    var fragmentPins = document.createDocumentFragment();

    var pinsCount = (pins.length > window.util.maxPinsCount) ? window.util.maxPinsCount : pins.length;

    for (var i = 0; i < pinsCount; i++) {
      fragmentPins.appendChild(getPin(pins[i]));
    }
    similarListElement.appendChild(fragmentPins);

    return similarListElement;
  };

  var pageActiveHandler = function () {
    if (!map.classList.contains('map--faded')) {
      return;
    }
    map.classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    window.util.fieldsets.forEach(function (element, i) {
      window.util.fieldsets[i].removeAttribute('disabled', '');
    });
    showPins(receivedData);
  };

  window.util.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var setAdress = function (shift) {
      var mapPinMainPositionX = Math.round((window.util.mapPinMain.offsetLeft - (shift ? shift.x : 0)) + (window.util.mainPinWidth / 2));
      var mapPinMainPositionY = Math.round((window.util.mapPinMain.offsetTop - (shift ? shift.y : 0)) + window.util.mainPinActiveHeight);

      window.util.addressInput.removeAttribute('value');
      window.util.addressInput.value = mapPinMainPositionX + ', ' + mapPinMainPositionY;

      return window.util.addressInput.value;
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var setMapPinMainTop = function () {
        var mapPinMainTop = window.util.mapPinMain.offsetTop - shift.y;
        if (mapPinMainTop > (window.util.positionYMax - window.util.mainPinActiveHeight)) {
          mapPinMainTop = (window.util.positionYMax - window.util.mainPinActiveHeight);
        }
        if (mapPinMainTop < (window.util.positionYMin - window.util.mainPinActiveHeight)) {
          mapPinMainTop = (window.util.positionYMin - window.util.mainPinActiveHeight);
        }
        return mapPinMainTop;
      };

      var setMapPinMainLeft = function () {
        var mapPinMainLeft = window.util.mapPinMain.offsetLeft - shift.x;
        if (mapPinMainLeft > (window.util.positionXMax - (window.util.mainPinWidth / 2))) {
          mapPinMainLeft = Math.round(window.util.positionXMax - (window.util.mainPinWidth / 2));
        }
        if (mapPinMainLeft <= -(window.util.mainPinWidth / 2)) {
          mapPinMainLeft = Math.round(-window.util.mainPinWidth / 2);
        }
        return mapPinMainLeft;
      };

      window.util.mapPinMain.style.top = setMapPinMainTop() + 'px';
      window.util.mapPinMain.style.left = setMapPinMainLeft() + 'px';

      setAdress(shift);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      setAdress();
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  window.map = {
    setMainPinCoordinates: setMainPinCoordinates,
    getDisabledFieldsets: getDisabledFieldsets,
    receivedData: receivedData,
    showPins: showPins,
  };

})();
