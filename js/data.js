'use strict';

(function () {

  var ADS_COUNT = 8;
  var NUM_AVATARS = [1, 2, 3, 4, 5, 6, 7, 8];
  var TITLES = ['Заголовок 01', 'Заголовок 02', 'Заголовок 03', 'Заголовок 04', 'Заголовок 05', 'Заголовок 06', 'Заголовок 07', 'Заголовок 08'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var INTERVALS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['Описание 01', 'Описание 02', 'Описание 03', 'Описание 04', 'Описание 05', 'Описание 06', 'Описание 07', 'Описание 08'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var AVATAR_WIDTH = 50;
  var AVATAR_HEIGHT = 70;
  var Price = {MIN: 10000, MAX: 50000};
  var Room = {MIN: 1, MAX: 3};
  var Guest = {MIN: 0, MAX: 5};


  var mapWidth = document.querySelector('.map').clientWidth;


  var locationX = mapWidth - AVATAR_WIDTH / 2;
  var locationYmin = 130 - AVATAR_HEIGHT;
  var locattionYmax = 630 - AVATAR_HEIGHT;
  var locationY = {min: locationYmin, max: locattionYmax};

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
  window.data = {
    dataAds: dataAds,
    avatarWidth: AVATAR_WIDTH,
    avatarHeight: AVATAR_HEIGHT
  };

})();
