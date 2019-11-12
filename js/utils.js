'use strict';

(function () {
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

    var randomLength = getRandomLengthArray(array);
    var shuffleArray = getShuffleArray(array);
    var newArray = [];
    for (var i = 0; i <= randomLength; i++) {
      newArray[i] = shuffleArray[i];
    }
    return newArray;
  };

  window.util = {

    getRandomLengthArray: getRandomLengthArray,
    getRandomElementArray: getRandomElementArray,
    getRandomNumberInMinMaxOrMax: getRandomNumberInMinMaxOrMax,
    getShuffleArray: getShuffleArray,
    getNewSizeArray: getNewSizeArray

  };

})();
