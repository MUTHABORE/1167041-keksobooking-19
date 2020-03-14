'use strict';

(function () {
  var pageActivation = function () {
    window.form.setCoords();
    window.map.map.classList.remove('map--faded');
    window.form.adFieldsets.classList.remove('ad-form--disabled');
    window.form.removeDisabledAttr(window.form.adFieldsets);
    window.form.removeDisabledAttr(window.map.mapFilters);
    window.validation.capacityPersons.addEventListener('change', window.validation.valueChange);
    window.validation.roomNumbers.addEventListener('change', window.validation.valueChange);
    window.util.renderFragmentElement(window.map.createPinsAds);
    window.util.renderFragmentElement(window.map.createPinCards);
    window.map.toggleCards();
    window.validation.setMinPrice();
    window.validation.selectType.addEventListener('change', window.validation.onMinPriceChange);
    window.validation.timeIn.addEventListener('change', window.validation.syncTimeOut);
    window.validation.timeOut.addEventListener('change', window.validation.syncTimeIn);
    window.map.mapPinMain.removeEventListener('mousedown', mainButtonMouseActivation);
    window.map.mapPinMain.removeEventListener('keydown', mainButtonKeyboardActivation);
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

  window.map.mapPinMain.addEventListener('mousedown', mainButtonMouseActivation);
  window.map.mapPinMain.addEventListener('keydown', mainButtonKeyboardActivation);
})();
