'use strict';

(function () {

  // Создаем ДОМ-элемент (разметку) метки
  var getPinElement = function (data) {

    var button = window.util.makeElement('button', 'map__pin');
    var picture = window.util.makeElement('img');

    button.style.left = data.location.x + window.data.avatarWidth / 2 + 'px';
    button.style.top = data.location.y + window.data.avatarHeight + 'px';

    picture.src = data.author.avatar;
    picture.alt = data.offer.title;
    picture.style.width = '40' + 'px';
    picture.style.height = '40' + 'px';
    picture.draggable = false;

    button.appendChild(picture);
    return button;
  };

  // Отрисовка меток на карте (заполнение блока DOM элементами)

  window.renderPin = function (pin) {
    var listAd = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pin.length; i++) {
      var pinElement = getPinElement(pin[i]);
      fragment.appendChild(pinElement);
    }
    listAd.appendChild(fragment);
  };

})();
