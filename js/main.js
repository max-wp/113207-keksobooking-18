'use strict';
// Задание 1

var ADS_COUNT = 8;
var NUM_AVATARS = [1, 2, 3, 4, 5, 6, 7, 8];
var TITLES = ['Заголовок 01', 'Заголовок 02', 'Заголовок 03', 'Заголовок 04', 'Заголовок 05', 'Заголовок 06', 'Заголовок 07', 'Заголовок 08'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['Описание 01', 'Описание 02', 'Описание 03', 'Описание 04', 'Описание 05', 'Описание 06', 'Описание 07', 'Описание 08'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_X_ADDRESS = 600;
var LOCATION_Y_ADDRESS = 350;
var LOCATION_X_IN_FIELD = 200;
var LOCATION_Y_IN_FIELD = {min: 130, max: 630};
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

function getRandomNumberInMinMax(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

var getNewSizeArray = function (array) {
  var rndLength = getRandomLengthArray(array);
  var newArray = [];
  for (var i = 0; i < rndLength; i++) {
    newArray[i] = array[i];
  }
  return newArray;
};

var getSimilarAds = function () {
  var similarAds = [];
  for (var i = 0; i < ADS_COUNT; i++) {
    similarAds[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + NUM_AVATARS[i] + '.png'
      },
      'offer': {
        'title': TITLES[i],
        'address': LOCATION_X_ADDRESS + ',' + LOCATION_Y_ADDRESS,
        'price': getRandomNumberInMinMax(PRICE.min, PRICE.max),
        'type': getRandomElementArray(TYPES),
        'rooms': getRandomNumberInMinMax(ROOMS.min, ROOMS.max),
        'guests': getRandomNumberInMinMax(GUESTS.min, GUESTS.max),
        'checkin': getRandomElementArray(CHECKIN),
        'checkout': getRandomElementArray(CHECKOUT),
        'features': getNewSizeArray(FEATURES),
        'description': DESCRIPTION[i],
        'photos': getNewSizeArray(PHOTOS)
      },
      'location': {
        'x': LOCATION_X_IN_FIELD,
        'y': getRandomNumberInMinMax(LOCATION_Y_IN_FIELD.min, LOCATION_Y_IN_FIELD.max)
      }
    };
  }
  return similarAds;
};
var similarAds = getSimilarAds();
console.log(similarAds);

// Задание 2
var ads = document.querySelector('.map');
ads.classList.remove('map--faded');

// Задание 3

var getSimilarPin = function (ads) {

  var button = document.createElement('button');
  var img = document.createElement('img');

  for (var i = 0; i < ads.length; i++) {

    button.classList.add('map__pin');
    button.style.left = (ads[i]).location.x + 'px';
    button.style.top = (ads[i]).location.y + 'px';

    img.src = (ads[i]).author.avatar;
    img.alt = (ads[i]).offer.title;
    img.style.width = '40' + 'px';
    img.style.height = '40' + 'px';

    button.appendChild(img);

  }

};
var ads = getSimilarPin(similarAds);
console.log(ads);
