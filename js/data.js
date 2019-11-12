'use strict';
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
    var xLocation = window.util.getRandomNumberInMinMaxOrMax(locationX);
    var yLocation = window.util.getRandomNumberInMinMaxOrMax(locationY.max, locationY.min);

    dataAds[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + NUM_AVATARS[i] + '.png'
      },
      'offer': {
        'title': TITLES[i],
        'address': xLocation + ',' + yLocation,
        'price': window.util.getRandomNumberInMinMaxOrMax(Price.MAX, Price.MIN),
        'type': window.util.getRandomElementArray(TYPES),
        'rooms': window.util.getRandomNumberInMinMaxOrMax(Room.MAX, Room.MIN),
        'guests': window.util.getRandomNumberInMinMaxOrMax(Guest.MAX, Guest.MIN),
        'checkin': window.util.getRandomElementArray(INTERVALS),
        'checkout': window.util.getRandomElementArray(INTERVALS),
        'features': window.util.getNewSizeArray(FEATURES),
        'description': DESCRIPTIONS[i],
        'photos': window.util.getNewSizeArray(PHOTOS)
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
