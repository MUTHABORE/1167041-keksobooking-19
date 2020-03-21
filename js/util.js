'use strict';

(function () {
  var KEY_ESC = 27;
  var KEY_ENTER = 13;
  var LEFT_CLICK = 1;
  var similarAd = document.querySelector('.map__pins');
  var MAX_SIMILAR_ADS_AMOUNT = 5;

  var getRandomInteger = function (min, max) {
    var randomNumber = Math.floor(min + Math.random() * (max - min));
    return randomNumber;
  };

  var renderFragmentElement = function (createSample) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < MAX_SIMILAR_ADS_AMOUNT; i++) {
      fragment.appendChild(createSample(window.xhr.response[i]));
    }
    similarAd.appendChild(fragment);
  };

  var getArrayShorter = function (array) {
    var shortArray = [];
    for (var k = 0; k < getRandomInteger(0, array.length); k++) {
      shortArray[k] = array[k];
    }
    return shortArray;
  };

  window.util = {
    KEY_ESC: KEY_ESC,
    KEY_ENTER: KEY_ENTER,
    LEFT_CLICK: LEFT_CLICK,
    MAX_SIMILAR_ADS_AMOUNT: MAX_SIMILAR_ADS_AMOUNT,
    getRandomInteger: getRandomInteger,
    renderFragmentElement: renderFragmentElement,
    getArrayShorter: getArrayShorter
  };
})();
