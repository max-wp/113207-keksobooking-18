'use strict';

// Задание 1. Генерация моки
var ADS_COUNT = 8;
var NUM_AVATARS = [1, 2, 3, 4, 5, 6, 7, 8];
var TITLES = ['Заголовок 01', 'Заголовок 02', 'Заголовок 03', 'Заголовок 04', 'Заголовок 05', 'Заголовок 06', 'Заголовок 07', 'Заголовок 08'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['Описание 01', 'Описание 02', 'Описание 03', 'Описание 04', 'Описание 05', 'Описание 06', 'Описание 07', 'Описание 08'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var AVATAR_X = 50 / 2;
var AVATAR_Y = 70;
var LOCATION_X_MAX_WIDTH_BLOCK_PIN = 1000 - AVATAR_X;
var LOCATION_Y_IN_FIELD = {min: 130 - AVATAR_Y, max: 630 - AVATAR_Y};
var PRICE = {min: 10000, max: 50000};
var ROOMS = {min: 1, max: 3};
var GUESTS = {min: 0, max: 5};


var getRandomLengthArray = function (array) {
  var randomLength = Math.floor(Math.random() * array.length);
  return randomLength;
};

var getRandomElementArray = function (array) {
  var randomIndex = getRandomLengthArray(array);
  return array[randomIndex];
};

function getRandomNumberInMinMaxOrMax(max, min) {
  if (!min) {
    min = 0;
  }
  return Math.floor(Math.random() * (max - min) + min);
}

function getShuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = array[i];
    array[i] = array[j];
    array[j] = t;
  }
  return array;
}

var getNewSizeArray = function (array) {
  var rndLength = getRandomLengthArray(array);
  var shuffleArray = getShuffleArray(array);
  var newArray = [];
  for (var i = 0; i < rndLength; i++) {
    newArray[i] = shuffleArray[i];
  }
  return newArray;
};

var getSimilarAds = function () {

  var similarAds = [];
  for (var i = 0; i < ADS_COUNT; i++) {
    var locationX = getRandomNumberInMinMaxOrMax(LOCATION_X_MAX_WIDTH_BLOCK_PIN);
    var locationY = getRandomNumberInMinMaxOrMax(LOCATION_Y_IN_FIELD.max, LOCATION_Y_IN_FIELD.min);
    similarAds[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + NUM_AVATARS[i] + '.png'
      },
      'offer': {
        'title': TITLES[i],
        'address': locationX + ',' + locationY,
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
        'x': locationX,
        'y': locationY
      }
    };
  }
  return similarAds;
};
var similarAds = getSimilarAds();

// Задание 2 Переключаем карту из неактивного состояния в активное
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Задание 3 Создаем ДОМ-элементы
var getSimilarPin = function (ads) {

  var button = document.createElement('button');
  var img = document.createElement('img');

  button.classList.add('map__pin');
  button.style.left = ads.location.x + 25 + 'px';
  button.style.top = ads.location.y + 70 + 'px';

  img.src = ads.author.avatar;
  img.alt = ads.offer.title;
  img.style.width = '40' + 'px';
  img.style.height = '40' + 'px';
  img.draggable = false;

  button.appendChild(img);
  return button;
};
// Задание 4 Отрисовка элементов в блок
var similarListElement = document.querySelector('.map__pins');

var renderPins = function (pins) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ADS_COUNT; i++) {
    var pinElement = getSimilarPin(pins[i]);
    fragment.appendChild(pinElement);
  }
  similarListElement.appendChild(fragment);
};
renderPins(similarAds);
