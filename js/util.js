'use strict';

(function () {
  var KEY_ESC = 27;
  var KEY_ENTER = 13;
  var LEFT_CLICK = 1;
  var similarAd = document.querySelector('.map__pins');

  var getRandomInteger = function (min, max) {
    var randomNumber = Math.floor(min + Math.random() * (max - min));
    return randomNumber;
  };

  var renderFragmentElement = function (createSample) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.data.ads.length; i++) {
      fragment.appendChild(createSample(window.data.ads[i]));
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
    getRandomInteger: getRandomInteger,
    renderFragmentElement: renderFragmentElement,
    getArrayShorter: getArrayShorter
  };
})();
