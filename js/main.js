'use strict';

var ADS_COUNT = 8;
var NUM_AVATARS = [1, 2, 3, 4, 5, 6, 7, 8];
var TITLES = ['Заголовок 01', 'Заголовок 02', 'Заголовок 03', 'Заголовок 04', 'Заголовок 05', 'Заголовок 06', 'Заголовок 07', 'Заголовок 08'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['Описание 01', 'Описание 02', 'Описание 03', 'Описание 04', 'Описание 05', 'Описание 06', 'Описание 07', 'Описание 08'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var AVATAR_WIDTH = 50;
var AVATAR_HEIGHT = 70;
var PRICE = {min: 10000, max: 50000};
var ROOMS = {min: 1, max: 3};
var GUESTS = {min: 0, max: 5};
var ENTER_KEYCODE = 13;

// *****************************
// Функции для генерации данных
// *****************************

// Случайная длина массива
var getRandomLengthArray = function (array) {
  var randomLength = Math.floor(Math.random() * array.length);
  return randomLength;
};

// Случайный индекс массива
var getRandomElementArray = function (array) {
  var randomIndex = getRandomLengthArray(array);
  return array[randomIndex];
};

// Случайное целое число из указанного диапазона, либо до максимального
function getRandomNumberInMinMaxOrMax(max, min) {
  if (!min) {
    min = 0;
  }
  return Math.floor(Math.random() * (max - min) + min);
}

// Перемешивание элементов массива
function getShuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = array[i];
    array[i] = array[j];
    array[j] = t;
  }
  return array;
}
// Получение массива со случайным набором
var getNewSizeArray = function (array) {
  var rndLength = getRandomLengthArray(array);
  var shuffleArray = getShuffleArray(array);
  var newArray = [];
  for (var i = 0; i < rndLength; i++) {
    newArray[i] = shuffleArray[i];
  }
  return newArray;
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

// Переключаем карту из неактивного состояния в активное
var hideMap = function () {
  map.classList.remove('map--faded');
};

// *****************************
// Отрисовка меток
// *****************************

// Создаем ДОМ-элемент (разметку) метки
var getPinElement = function (data) {

  var button = document.createElement('button');
  var img = document.createElement('img');

  button.classList.add('map__pin');
  button.style.left = data.location.x + 25 + 'px';
  button.style.top = data.location.y + 70 + 'px';

  img.src = data.author.avatar;
  img.alt = data.offer.title;
  img.style.width = '40' + 'px';
  img.style.height = '40' + 'px';
  img.draggable = false;

  button.appendChild(img);
  return button;
};

// Отрисовка меток на карте (заполнение блока DOM элементами)

var mapPin = document.querySelector('.map__pins');

var renderPin = function (pin) {

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ADS_COUNT; i++) {
    var pinElement = getPinElement(pin[i]);
    fragment.appendChild(pinElement);
  }
  mapPin.appendChild(fragment);
};

// Неактивное состояние полей
var defaultStatePage = function () {

  var mapFilter = document.querySelector('.map__filters');
  var form = document.querySelector('.ad-form');
  var fieldsets = form.querySelectorAll('fieldset');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = true;
  }
  mapFilter.classList.add('ad-form--disabled');

};
defaultStatePage();

// var pinMain = document.querySelector('.map__pin--main');
// var pinAddress = document.querySelector('#address');

// // Получение координат
// var topPin = pinMain.getAttribute('style');
// console.log(topPin);
// console.log(topPin.style.top);
// console.log(styleAtt);
// console.log(pinAddress + ' Значение value:' + pinAddress.value);


// function pinMainMouseDownHandler() {
//   map.classList.remove('map--faded');
//   form.classList.remove('ad-form--disabled');
//   mapFilter.classList.remove('ad-form--disabled');
//   hideMap(map);
//   for (var i = 0; i < fieldsets.length; i++) {
//     fieldsets[i].disabled = false;
//   }
//   pinAddress.value = '153, 250';

// }
// pinMain.addEventListener('mousedown', pinMainMouseDownHandler);
// pinMain.addEventListener('keydown', function (evt) {
//   if (evt.keyCode === ENTER_KEYCODE) {
//     pinMainMouseDownHandler();
//   }
// }
// );
