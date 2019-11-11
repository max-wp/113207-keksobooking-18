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
    var xLocation = getRandomNumberInMinMaxOrMax(locationX);
    var yLocation = getRandomNumberInMinMaxOrMax(locationY.max, locationY.min);

    dataAds[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + NUM_AVATARS[i] + '.png'
      },
      'offer': {
        'title': TITLES[i],
        'address': xLocation + ',' + yLocation,
        'price': getRandomNumberInMinMaxOrMax(Price.MAX, Price.MIN),
        'type': getRandomElementArray(TYPES),
        'rooms': getRandomNumberInMinMaxOrMax(Room.MAX, Room.MIN),
        'guests': getRandomNumberInMinMaxOrMax(Guest.MAX, Guest.MIN),
        'checkin': getRandomElementArray(INTERVALS),
        'checkout': getRandomElementArray(INTERVALS),
        'features': getNewSizeArray(FEATURES),
        'description': DESCRIPTIONS[i],
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
