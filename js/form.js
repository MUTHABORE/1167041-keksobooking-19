'use strict';

(function () {
  var adFieldsets = document.querySelector('.ad-form');

  var setCoords = function () {
    window.map.pinMainLeft = window.map.mapPinMain.style.left;
    window.map.pinMainTop = window.map.mapPinMain.style.top;
    window.map.addressField.setAttribute('value', (parseInt(window.map.pinMainLeft, 10) + window.map.PIN_MAIN_WIDTH_HALF) + ', ' + (parseInt(window.map.pinMainTop, 10) + window.map.PIN_MAIN_HEIGHT));
  };

  window.map.addressField.setAttribute('readonly', '');
  window.map.addressField.setAttribute('value', (parseInt(window.map.pinMainLeft, 10) + window.map.PIN_MAIN_WIDTH_HALF) + ', ' + (parseInt(window.map.pinMainTop, 10) + window.map.PIN_MAIN_HEIGHT_HALF));

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

  setDisabledAttr(adFieldsets);
  setDisabledAttr(window.map.mapFilters);

  window.form = {
    adFieldsets: adFieldsets,
    removeDisabledAttr: removeDisabledAttr,
    setCoords: setCoords
  };
})();
