'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  var pageActivation = function () {
    var mapFilters = document.querySelector('.map__filters');
    var adFieldsets = document.querySelector('.ad-form');
    var roomNumbers = document.querySelector('#room_number');
    var capacityPersons = document.querySelector('#capacity');
    var selectType = document.querySelector('#type');
    window.form.setCoords();
    map.classList.remove('map--faded');
    adFieldsets.classList.remove('ad-form--disabled');
    window.form.removeDisabledAttr(adFieldsets);
    window.form.removeDisabledAttr(mapFilters);
    capacityPersons.addEventListener('change', window.validation.valueChange);
    roomNumbers.addEventListener('change', window.validation.valueChange);
    window.util.renderFragmentElement(window.data.createPinsAds);
    window.util.renderFragmentElement(window.data.createPinCards);
    window.map.toggleCards();
    window.validation.setMinPrice();
    selectType.addEventListener('change', window.validation.onMinPriceChange);
    window.validation.timeIn.addEventListener('change', window.validation.syncTimeOut);
    window.validation.timeOut.addEventListener('change', window.validation.syncTimeIn);
    mapPinMain.removeEventListener('mousedown', mainButtonMouseActivation);
    mapPinMain.removeEventListener('keydown', mainButtonKeyboardActivation);
    window.map.closePinCard();
  };

  var mainButtonMouseActivation = function (evt) {
    if (evt.which === window.util.LEFT_CLICK) {
      pageActivation();
    }
  };

  var mainButtonKeyboardActivation = function (evt) {
    if (evt.keyCode === window.util.KEY_ENTER) {
      pageActivation();
    }
  };

  mapPinMain.addEventListener('mousedown', mainButtonMouseActivation);
  mapPinMain.addEventListener('keydown', mainButtonKeyboardActivation);
})();
