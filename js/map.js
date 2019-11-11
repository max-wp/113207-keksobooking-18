'use strict';

// *****************************
// Отрисовка меток
// *****************************

// Функция создания элементов разметки
var makeElement = function (tagName, className, text) {
  var element = document.createElement(tagName);
  if (className) {
    element.classList.add(className);
  }
  if (text) {
    element.textContent = text;
  }
  return element;
};

// Создаем ДОМ-элемент (разметку) метки
var getPinElement = function (data) {

  var button = makeElement('button', 'map__pin');
  var picture = makeElement('img');

  button.style.left = data.location.x + AVATAR_WIDTH / 2 + 'px';
  button.style.top = data.location.y + AVATAR_HEIGHT + 'px';

  picture.src = data.author.avatar;
  picture.alt = data.offer.title;
  picture.style.width = '40' + 'px';
  picture.style.height = '40' + 'px';
  picture.draggable = false;

  button.appendChild(picture);
  return button;
};

// Отрисовка меток на карте (заполнение блока DOM элементами)

var renderPin = function (pin) {
  var listAd = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ADS_COUNT; i++) {
    var pinElement = getPinElement(pin[i]);
    fragment.appendChild(pinElement);
  }
  listAd.appendChild(fragment);
}
