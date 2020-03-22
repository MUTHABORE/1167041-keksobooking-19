'use strict';

(function () {
  var KEY_ESC = 27;
  var KEY_ENTER = 13;
  var LEFT_CLICK = 1;
  var similarAd = document.querySelector('.map__pins');
  var MAX_SIMILAR_ADS_AMOUNT = 5;
  var correctAds = [];

  var getRandomInteger = function (min, max) {
    var randomNumber = Math.floor(min + Math.random() * (max - min));
    return randomNumber;
  };

  var getCorrectAds = function () {
    var j = 0;
    for (var i = 0; i < window.xhr.response.length; i++) {
      if (window.xhr.response[i].offer) {
        window.util.correctAds[j] = window.xhr.response[i];
        j += 1;
      }
    }
  };

  var renderFragmentElement = function (createSample) {
    getCorrectAds();

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < MAX_SIMILAR_ADS_AMOUNT; i++) {
      if (i >= window.util.correctAds.length) {
        break;
      }
      fragment.appendChild(createSample(window.util.correctAds[i]));
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
    correctAds: correctAds,
    getCorrectAds: getCorrectAds,
    getRandomInteger: getRandomInteger,
    renderFragmentElement: renderFragmentElement,
    getArrayShorter: getArrayShorter
  };
})();
