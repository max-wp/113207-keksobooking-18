'use strict';

// Отрисовка объявлений на карте (заполнение блока DOM элементами)

var renderAd = function (ad) {
  var listAd = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ADS_COUNT; i++) {
    var elementAd = getAdElement(ad[i]);
    fragment.appendChild(elementAd);
  }
  listAd.appendChild(fragment);
}
