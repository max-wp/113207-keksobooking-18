// 'use strict';
// // *****************************
// // Структура данных
// // *****************************

// // Функция получения массива данных моки;

// var map = document.querySelector('.map');
// var mapWidth = map.clientWidth;

// var locationX = mapWidth - AVATAR_WIDTH / 2;
// var locationYmin = 130 - AVATAR_HEIGHT;
// var locattionYmax = 630 - AVATAR_HEIGHT;
// var locationY = {min: locationYmin, max: locattionYmax};

// var getDataAd = function () {
//   var dataAds = [];
//   for (var i = 0; i < ADS_COUNT; i++) {
//     var xLocation = getRandomNumberInMinMaxOrMax(locationX);
//     var yLocation = getRandomNumberInMinMaxOrMax(locationY.max, locationY.min);

//     dataAds[i] = {
//       'author': {
//         'avatar': 'img/avatars/user0' + NUM_AVATARS[i] + '.png'
//       },
//       'offer': {
//         'title': TITLES[i],
//         'address': xLocation + ',' + yLocation,
//         'price': getRandomNumberInMinMaxOrMax(PRICE.max, PRICE.min),
//         'type': getRandomElementArray(TYPES),
//         'rooms': getRandomNumberInMinMaxOrMax(ROOMS.max, ROOMS.min),
//         'guests': getRandomNumberInMinMaxOrMax(GUESTS.max, GUESTS.min),
//         'checkin': getRandomElementArray(CHECKIN),
//         'checkout': getRandomElementArray(CHECKOUT),
//         'features': getNewSizeArray(FEATURES),
//         'description': DESCRIPTION[i],
//         'photos': getNewSizeArray(PHOTOS)
//       },
//       'location': {
//         'x': xLocation,
//         'y': yLocation
//       }
//     };
//   }
//   return dataAds;
// };
// var dataAds = getDataAd();

// var renderAd = function (ad) {
//   var listAd = document.querySelector('.map__pins');
//   var fragment = document.createDocumentFragment();

//   for (var i = 0; i < ADS_COUNT; i++) {
//     var elementAd = getAdElement(ad[i]);
//     fragment.appendChild(elementAd);
//   }
//   listAd.appendChild(fragment);
// };
