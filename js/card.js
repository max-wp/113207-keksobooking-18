'use strict';
// *****************************
// Отрисовка объявлений
// *****************************

var ESC_KEYCODE = 27;

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
    var photoItem = window.util.makeElement('img', 'popup__photo', 'data.offer.title');
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

  return adElement;
};
// Отрисовка объявлений на карте (заполнение блока DOM элементами)

var renderAd = function (ad) {
  var listAd = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ad.length; i++) {
    var elementAd = getAdElement(ad[i]);
    fragment.appendChild(elementAd);
  }
  listAd.appendChild(fragment);
}
