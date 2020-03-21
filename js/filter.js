'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var selectType = document.querySelector('#housing-type');
  var selectPrice = document.querySelector('#housing-price');
  var selectRooms = document.querySelector('#housing-rooms');
  var selectGuests = document.querySelector('#housing-guests');
  var selectFeatures = document.querySelectorAll('.map__checkbox');

  var TIMEOUT = 500;
  var lastTimeout;

  var PriceInstruction = {
    LOW_RANGE: 10000,
    HIGH_RANGE: 50000,
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  var filterByField = function (filterElem, dataValue) {
    return filterElem.value === 'any' ? true : dataValue.toString() === filterElem.value;
  };

  var filterByPrice = function (dataValue) {
    if (selectPrice.value === PriceInstruction.LOW) {
      return dataValue < PriceInstruction.LOW_RANGE;
    } else if (selectPrice.value === PriceInstruction.MIDDLE) {
      return dataValue >= PriceInstruction.LOW_RANGE && dataValue < PriceInstruction.HIGH_RANGE;
    } else if (selectPrice.value === PriceInstruction.HIGH) {
      return dataValue >= PriceInstruction.HIGH_RANGE;
    }
    return true;
  };

  var filterByFeatures = function (dataField) {
    var featuresFilterChecked = document.querySelectorAll('.map__checkbox:checked');
    var featuresChecked = Array.from(featuresFilterChecked);

    return featuresChecked.every(function (elem) {
      return dataField.includes(elem.value);
    });
  };

  var renderFilterAds = function (ads, target, quantity) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ads.length; i++) {
      fragment.appendChild(target(ads[i]));
      if (i >= quantity - 1) {
        break;
      }
    }
    mapPins.appendChild(fragment);
  };

  window.filteredAds = function () {
    return window.xhr.response.filter(function (elem) {
      return filterByField(selectType, elem.offer.type) &&
      filterByField(selectRooms, elem.offer.rooms) &&
      filterByField(selectGuests, elem.offer.guests) &&
      filterByPrice(elem.offer.price) &&
      filterByFeatures(elem.offer.features);
    });
  };

  var createFilteredAds = function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      window.siteState.removeData();
      var filterAds = window.filteredAds();

      renderFilterAds(filterAds, window.data.createPinsAds, window.util.MAX_SIMILAR_ADS_AMOUNT);
      renderFilterAds(filterAds, window.data.createPinCards, window.util.MAX_SIMILAR_ADS_AMOUNT);
      window.map.toggleCards();
      window.map.closePinCard();
    }, TIMEOUT);
  };

  selectType.addEventListener('change', createFilteredAds);
  selectPrice.addEventListener('change', createFilteredAds);
  selectRooms.addEventListener('change', createFilteredAds);
  selectGuests.addEventListener('change', createFilteredAds);
  selectFeatures.forEach(function (elem) {
    elem.addEventListener('change', createFilteredAds);
  });
}());
