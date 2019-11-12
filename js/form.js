'use strict';

(function () {
// Поля формы

  var inputTitle = form.querySelector('#title');
  var inputPrice = form.querySelector('#price');
  var inputType = form.querySelector('#type');
  var inputTimein = form.querySelector('#timein');
  var inputTimeout = form.querySelector('#timeout');
  var inputRoomNumber = form.querySelector('#room_number');
  var inputCapacity = form.querySelector('#capacity');

  // Валидация заголовка
  inputTitle.addEventListener('invalid', function () {
    if (inputTitle.validity.tooShort) {
      var min = inputTitle.getAttribute('minLength');
      inputTitle.setCustomValidity('Имя должно состоять минимум из ' + min + ' -ти символов');
    } else if (inputTitle.validity.tooLong) {
      inputTitle.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (inputTitle.validity.valueMissing) {
      inputTitle.setCustomValidity('Поле обязательно для заполнения');
    } else {
      inputTitle.setCustomValidity('');
    }
  });

  // Валидация цены за ночь в соответствии с выбранным типом жилья
  inputType.addEventListener('change', function (evt) {
    inputType.value = evt.target.value;
    if (evt.target.value === 'bungalo') {
      inputPrice.setAttribute('min', 0);
      inputPrice.setAttribute('placeholder', 0);
    } else if (evt.target.value === 'flat') {
      inputPrice.setAttribute('min', 1000);
      inputPrice.setAttribute('placeholder', 1000);
    } else if (evt.target.value === 'house') {
      inputPrice.setAttribute('min', 5000);
      inputPrice.setAttribute('placeholder', 5000);
    } else {
      inputPrice.setAttribute('min', 10000);
      inputPrice.setAttribute('placeholder', 10000);
    }
  });

  // Валидация времени заезда и выезда

  inputTimein.addEventListener('change', function (evt) {
    var target = evt.target.options.selectedIndex;
    inputTimeout.options[target].selected = true;
  });

  inputTimeout.addEventListener('change', function (evt) {
    var target = evt.target.options.selectedIndex;
    inputTimein.options[target].selected = true;
  });

  // Валидация количества комнат и гостей

  inputRoomNumber.addEventListener('change', function (evt) {
    var target = evt.target.options.selectedIndex;
    if (target === 0) {

      inputCapacity.options[2].disabled = false;
      inputCapacity.options[0].disabled = true;
      inputCapacity.options[1].disabled = true;
      inputCapacity.options[3].disabled = true;

    } else if (target === 1) {

      inputCapacity.options[1].disabled = false;
      inputCapacity.options[2].disabled = false;
      inputCapacity.options[0].disabled = true;
      inputCapacity.options[3].disabled = true;

    } else if (target === 2) {

      inputCapacity.options[0].disabled = false;
      inputCapacity.options[1].disabled = false;
      inputCapacity.options[2].disabled = false;
      inputCapacity.options[3].disabled = true;

    } else if (target === 3) {

      inputCapacity.options[3].disabled = false;
      inputCapacity.options[0].disabled = true;
      inputCapacity.options[1].disabled = true;
      inputCapacity.options[2].disabled = true;

    }
    evt.preventDefault();
  });

})();
