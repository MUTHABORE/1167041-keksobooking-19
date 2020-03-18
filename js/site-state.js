'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var adFieldsets = document.querySelector('.ad-form');
  var capacityPersons = document.querySelector('#capacity');
  var roomNumbers = document.querySelector('#room_number');
  var selectType = document.querySelector('#type');
  var resetButton = document.querySelector('.ad-form__reset');
  var addressField = document.querySelector('#address');

  var formSubmit = function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(form), window.backend.onError, siteReset);
    form.removeEventListener('submit', formSubmit);
  };

  var siteResetEnterKey = function (evt) {
    if (evt.keyCode === window.util.KEY_ENTER) {
      siteReset();
    }
  };

  var pageActivation = function () {
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
    formReset();

    form.addEventListener('submit', formSubmit);
  };

  var formReset = function () {
    resetButton.addEventListener('click', siteReset);
    resetButton.addEventListener('keydown', siteResetEnterKey);
  };

  var siteReset = function () {
    capacityPersons.removeEventListener('change', window.validation.valueChange);
    roomNumbers.removeEventListener('change', window.validation.valueChange);
    selectType.removeEventListener('change', window.validation.onMinPriceChange);
    window.validation.timeIn.removeEventListener('change', window.validation.syncTimeOut);
    window.validation.timeOut.removeEventListener('change', window.validation.syncTimeIn);

    map.classList.add('map--faded');
    adFieldsets.classList.add('ad-form--disabled');
    window.form.setDisabledAttr(adFieldsets);
    window.form.setDisabledAttr(mapFilters);
    form.reset();
    var mapPins = document.querySelector('.map__pins');

    var clearCards = function () {
      var adCards = document.querySelectorAll('.map__card');
      for (var i = 0; i < adCards.length; i++) {
        mapPins.removeChild(adCards[i]);
      }
    };

    var clearAds = function () {
      var pinsAds = document.querySelectorAll('.map__pin--secondary');
      for (var i = 0; i < pinsAds.length; i++) {
        mapPins.removeChild(pinsAds[i]);
      }
    };

    clearCards();
    clearAds();
    mapPinMain.style.left = 570 + 'px';
    mapPinMain.style.top = 375 + 'px';
    window.form.setCoords();
    addressField.setAttribute('value', (parseInt(window.map.pinMainLeft, 10) + window.map.PIN_MAIN_WIDTH_HALF) + ', ' + (parseInt(window.map.pinMainTop, 10) + window.map.PIN_MAIN_HEIGHT_HALF));
    mapPinMain.addEventListener('mousedown', mainButtonMouseActivation);
    mapPinMain.addEventListener('keydown', mainButtonKeyboardActivation);

    resetButton.removeEventListener('keydown', siteResetEnterKey);
    resetButton.removeEventListener('click', siteReset);
    form.removeEventListener('submit', formSubmit);
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

