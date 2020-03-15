'use strict';

(function () {
  var roomNumbers = document.querySelector('#room_number');
  var capacityPersons = document.querySelector('#capacity');
  var inputPrice = document.querySelector('#price');
  var selectType = document.querySelector('#type');
  var inputHousingType = selectType[selectType.options.selectedIndex].value;
  var selectedRoom = parseInt(roomNumbers[roomNumbers.options.selectedIndex].value, 10);
  var selectedCapacity = parseInt(capacityPersons[capacityPersons.options.selectedIndex].value, 10);

  var GUESTS_VALIDITY_INSTRUCTION = {
    0: [100],
    1: [1, 2, 3],
    2: [2, 3],
    3: [3]
  };

  var isValidCapacity = function (quantityGuest) {
    var arrCapacity = GUESTS_VALIDITY_INSTRUCTION[quantityGuest];

    var validateCapacity = false;

    for (var i = 0; i < arrCapacity.length; i++) {
      if (selectedRoom === arrCapacity[i]) {
        validateCapacity = true;
        break;
      }
    }

    return validateCapacity;
  };

  var getInvalidCapacityAlert = function () {
    if (!isValidCapacity(selectedCapacity)) {
      capacityPersons.setCustomValidity('Количесво мест не соответсвует количеству комнат');
    } else {
      capacityPersons.setCustomValidity('');
    }
  };

  var valueChange = function () {
    selectedRoom = parseInt(roomNumbers[roomNumbers.options.selectedIndex].value, 10);
    selectedCapacity = parseInt(capacityPersons[capacityPersons.options.selectedIndex].value, 10);

    getInvalidCapacityAlert();
  };

  var PRICE_VALIDITY_INSTRUCTION = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };


  var setMinPrice = function () {
    inputPrice.setAttribute('min', PRICE_VALIDITY_INSTRUCTION[inputHousingType]);
    inputPrice.setAttribute('placeholder', PRICE_VALIDITY_INSTRUCTION[inputHousingType]);
  };

  var onMinPriceChange = function () {
    inputHousingType = selectType[selectType.options.selectedIndex].value;

    setMinPrice();
  };

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var syncTimeOut = function () {
    timeOut.selectedIndex = timeIn.selectedIndex;
  };

  var syncTimeIn = function () {
    timeIn.selectedIndex = timeOut.selectedIndex;
  };

  getInvalidCapacityAlert();

  window.validation = {
    valueChange: valueChange,
    setMinPrice: setMinPrice,
    selectType: selectType,
    onMinPriceChange: onMinPriceChange,
    timeIn: timeIn,
    timeOut: timeOut,
    syncTimeOut: syncTimeOut,
    syncTimeIn: syncTimeIn,
  };
})();
