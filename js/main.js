'use strict';

// Переключаем карту из неактивного состояния в активное
var activateMap = function () {
  map.classList.remove('map--faded');
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

  // // Валидация формы
  validationForm();

  return adElement;
};

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
// var pinMain = document.querySelector('.map__pin--main');
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

// // Обработчик нажатия кнопки на главной метке

// function pinMainClickHandler(evt) {
//   checkStatePage(false);
//   evt.preventDefault();
// }

// pinMain.addEventListener('mousedown', pinMainClickHandler);
// pinMain.addEventListener('keydown', function (evt) {
//   if (evt.keyCode === ENTER_KEYCODE) {
//     pinMainClickHandler();
//   }
//   evt.preventDefault();
// }
// );
