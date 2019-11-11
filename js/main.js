'use strict';

// Переключаем карту из неактивного состояния в активное
var activateMap = function () {
  map.classList.remove('map--faded');
};

// *****************************
// Отрисовка меток
// *****************************

// Функция создания элементов разметки
var makeElement = function (tagName, className, text) {
  var element = document.createElement(tagName);
  if (className) {
    element.classList.add(className);
  }
  if (text) {
    element.textContent = text;
  }
  return element;
};

// Создаем ДОМ-элемент (разметку) метки
var getPinElement = function (data) {

  var button = makeElement('button', 'map__pin');
  var img = makeElement('img');

  button.style.left = data.location.x + AVATAR_WIDTH / 2 + 'px';
  button.style.top = data.location.y + AVATAR_HEIGHT + 'px';

  img.src = data.author.avatar;
  img.alt = data.offer.title;
  img.style.width = '40' + 'px';
  img.style.height = '40' + 'px';
  img.draggable = false;

  button.appendChild(img);
  return button;
};

// Отрисовка меток на карте (заполнение блока DOM элементами)

var renderPin = function (pin) {
  var listAd = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ADS_COUNT; i++) {
    var pinElement = getPinElement(pin[i]);
    fragment.appendChild(pinElement);
  }
  listAd.appendChild(fragment);
};

// *****************************
// Отрисовка объявлений
// *****************************

// Создаем ДОМ-элемент (разметку) объявления на основе template
var getAdElement = function (data) {

  var template = document.querySelector('#card').content;
  var ad = template.querySelector('.map__card');

  var adElement = ad.cloneNode(true);
  // Селекторы элементов
  var closeButton = adElement.querySelector('.popup__close');
  var title = adElement.querySelector('.popup__title');
  var address = adElement.querySelector('.popup__text--address');
  var price = adElement.querySelector('.popup__text--price');
  var priceexplanation = price.querySelector('span');
  var type = adElement.querySelector('.popup__type');
  var roomsGuest = adElement.querySelector('.popup__text--capacity');
  var checkInOut = adElement.querySelector('.popup__text--time');

  // var featureList = adElement.querySelector('.popup__features');
  // var featureItem = featureList.querySelectorAll('.popup__feature');

  var description = adElement.querySelector('.popup__description');
  var avatar = adElement.querySelector('.popup__avatar');
  var photos = adElement.querySelector('.popup__photos');

  // Передача данных элементам

  // Заголовок
  title.textContent = data.offer.title;

  // Адрес
  address.textContent = data.offer.address;

  // Цена
  price.textContent = data.offer.price;
  priceexplanation.textContent = ' /ночь';
  price.appendChild(priceexplanation);

  // Тип удобств
  switch (data.offer.type) {
    case 'flat':
      type.textContent = 'Квартира';
      break;
    case 'bungalo':
      type.textContent = 'Бунгало';
      break;
    case 'house':
      type.textContent = 'Дом';
      break;
    case 'palace':
      type.textContent = 'Дворец';
      break;
  }
  // Комнаты и гости

  var roomText;
  if (data.offer.rooms === 1) {
    roomText = ' комната для ';
  } else if (data.offer.rooms === 100) {
    roomText = ' комнат для ';
  } else {
    roomText = ' комнаты для ';
  }

  var guestText;
  if (data.offer.guests === 1) {
    guestText = ' гостя';
  } else {
    guestText = ' гостей';
  }

  roomsGuest.textContent = data.offer.rooms + roomText + data.offer.guests + guestText;

  // Время заезда и выезда
  checkInOut.textContent = 'Заезд после' + data.offer.checkin + ', выезд до' + data.offer.checkout;

  // Дополнительные услуги
  // в разработке

  // Описание
  description.textContent = data.offer.description;

  // Фотографии номера
  while (photos.firstChild) {
    photos.removeChild(photos.firstChild);
  }

  for (var i = 0; i < data.offer.photos.length; i++) {
    var photoItem = makeElement('img', 'popup__photo', 'data.offer.title');
    photoItem.src = data.offer.photos[i];
    photoItem.width = 45;
    photoItem.height = 40;
    photos.appendChild(photoItem);
  }
  // Аватар
  avatar.src = data.author.avatar;

  // Закрытие попап окна
  var closePopup = function () {
    adElement.remove();
    document.removeEventListener('keydown', escPressHandler);
  };

  var escPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  document.addEventListener('keydown', escPressHandler);

  closeButton.addEventListener('click', function () {
    closePopup();
  });

  // *****************************
  // Валидация формы
  // *****************************

  // Поля формы
  var inputTitle = form.querySelector('#title');
  var inputPrice = form.querySelector('#price');
  var inputType = form.querySelector('#type');
  var inputTimein = form.querySelector('#timein');
  var inputTimeout = form.querySelector('#timeout');
  var inputRoomNumber = form.querySelector('#room_number');
  var inputCapacity = form.querySelector('#capacity');

  // Валидация заголовка
  inputTitle.addEventListener('invalid', function () {
    if (inputTitle.validity.tooShort) {
      var min = inputTitle.getAttribute('minLength');
      inputTitle.setCustomValidity('Имя должно состоять минимум из ' + min + ' -ти символов');
    } else if (inputTitle.validity.tooLong) {
      inputTitle.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (inputTitle.validity.valueMissing) {
      inputTitle.setCustomValidity('Поле обязательно для заполнения');
    } else {
      inputTitle.setCustomValidity('');
    }
  });

  // Валидация цены за ночь в соответствии с выбранным типом жилья
  inputType.addEventListener('change', function (evt) {
    inputType.value = evt.target.value;
    if (evt.target.value === 'bungalo') {
      inputPrice.setAttribute('min', 0);
      inputPrice.setAttribute('placeholder', 0);
    } else if (evt.target.value === 'flat') {
      inputPrice.setAttribute('min', 1000);
      inputPrice.setAttribute('placeholder', 1000);
    } else if (evt.target.value === 'house') {
      inputPrice.setAttribute('min', 5000);
      inputPrice.setAttribute('placeholder', 5000);
    } else {
      inputPrice.setAttribute('min', 10000);
      inputPrice.setAttribute('placeholder', 10000);
    }
  });

  // Валидация времени заезда и выезда

  inputTimein.addEventListener('change', function (evt) {
    var target = evt.target.options.selectedIndex;
    inputTimeout.options[target].selected = true;
  });

  inputTimeout.addEventListener('change', function (evt) {
    var target = evt.target.options.selectedIndex;
    inputTimein.options[target].selected = true;
  });

  // Валидация количества комнат и гостей

  inputRoomNumber.addEventListener('change', function (evt) {
    var target = evt.target.options.selectedIndex;
    if (target === 0) {

      inputCapacity.options[2].disabled = false;
      inputCapacity.options[0].disabled = true;
      inputCapacity.options[1].disabled = true;
      inputCapacity.options[3].disabled = true;

    } else if (target === 1) {

      inputCapacity.options[1].disabled = false;
      inputCapacity.options[2].disabled = false;
      inputCapacity.options[0].disabled = true;
      inputCapacity.options[3].disabled = true;

    } else if (target === 2) {

      inputCapacity.options[0].disabled = false;
      inputCapacity.options[1].disabled = false;
      inputCapacity.options[2].disabled = false;
      inputCapacity.options[3].disabled = true;

    } else if (target === 3) {

      inputCapacity.options[3].disabled = false;
      inputCapacity.options[0].disabled = true;
      inputCapacity.options[1].disabled = true;
      inputCapacity.options[2].disabled = true;

    }
    evt.preventDefault();
  });


  return adElement;
};


// *****************************
// Структура данных
// *****************************

// Функция получения массива данных моки;

var map = document.querySelector('.map');
var mapWidth = map.clientWidth;

var locationX = mapWidth - AVATAR_WIDTH / 2;
var locationYmin = 130 - AVATAR_HEIGHT;
var locattionYmax = 630 - AVATAR_HEIGHT;
var locationY = {min: locationYmin, max: locattionYmax};

var getDataAd = function () {
  var dataAds = [];
  for (var i = 0; i < ADS_COUNT; i++) {
    var xLocation = getRandomNumberInMinMaxOrMax(locationX);
    var yLocation = getRandomNumberInMinMaxOrMax(locationY.max, locationY.min);

    dataAds[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + NUM_AVATARS[i] + '.png'
      },
      'offer': {
        'title': TITLES[i],
        'address': xLocation + ',' + yLocation,
        'price': getRandomNumberInMinMaxOrMax(PRICE.max, PRICE.min),
        'type': getRandomElementArray(TYPES),
        'rooms': getRandomNumberInMinMaxOrMax(ROOMS.max, ROOMS.min),
        'guests': getRandomNumberInMinMaxOrMax(GUESTS.max, GUESTS.min),
        'checkin': getRandomElementArray(CHECKIN),
        'checkout': getRandomElementArray(CHECKOUT),
        'features': getNewSizeArray(FEATURES),
        'description': DESCRIPTION[i],
        'photos': getNewSizeArray(PHOTOS)
      },
      'location': {
        'x': xLocation,
        'y': yLocation
      }
    };
  }
  return dataAds;
};
var dataAds = getDataAd();
// Отрисовка объявлений на карте (заполнение блока DOM элементами)

var renderAd = function (ad) {
  var listAd = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ADS_COUNT; i++) {
    var elementAd = getAdElement(ad[i]);
    fragment.appendChild(elementAd);
  }
  listAd.appendChild(fragment);
};


// *****************************
// Настройки отображения страницы
// *****************************

var form = document.querySelector('.ad-form');
var pinMain = document.querySelector('.map__pin--main');
var mapFilter = document.querySelector('.map__filters');
var fieldsets = form.querySelectorAll('fieldset');
var pinAddress = document.querySelector('#address');

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

// Обработчик нажатия кнопки на главной метке

function pinMainClickHandler(evt) {
  checkStatePage(false);
  evt.preventDefault();
}

pinMain.addEventListener('mousedown', pinMainClickHandler);
pinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    pinMainClickHandler();
  }
  evt.preventDefault();
}
);
