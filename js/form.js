'use strict';

(function () {
  var adFieldsets = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var addressField = document.querySelector('#address');
  var mapPinMain = document.querySelector('.map__pin--main');

  var setCoords = function () {
    window.map.pinMainLeft = mapPinMain.style.left;
    window.map.pinMainTop = mapPinMain.style.top;
    addressField.setAttribute('value', (parseInt(window.map.pinMainLeft, 10) + window.map.PIN_MAIN_WIDTH_HALF) + ', ' + (parseInt(window.map.pinMainTop, 10) + window.map.PIN_MAIN_HEIGHT));
  };

  addressField.setAttribute('readonly', '');
  addressField.setAttribute('value', (parseInt(window.map.pinMainLeft, 10) + window.map.PIN_MAIN_WIDTH_HALF) + ', ' + (parseInt(window.map.pinMainTop, 10) + window.map.PIN_MAIN_HEIGHT_HALF));

  var setDisabledAttr = function (elem) {
    for (var i = 0; i < elem.length; i++) {
      elem[i].setAttribute('disabled', '');
    }
  };

  var removeDisabledAttr = function (elem) {
    for (var i = 0; i < elem.length; i++) {
      elem[i].removeAttribute('disabled', '');
    }
  };

//  var setDisabledAttr = function (elem) {
//    for (var i = 0; i < elem.length; i++) {
//      elem[i].setAttribute('disabled', '');
//    }
//  };

  setDisabledAttr(adFieldsets);
  setDisabledAttr(mapFilters);

  window.form = {
    setDisabledAttr: setDisabledAttr,
    removeDisabledAttr: removeDisabledAttr,
    setCoords: setCoords,
    addressField: addressField
  };
})();
