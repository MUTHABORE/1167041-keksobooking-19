'use strict';

var KEY_ENTER = 13;
var LEFT_CLICK = 1;
var map = document.querySelector('.map');
var adFieldsets = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters');
var addressField = document.querySelector('#address');
var mapPinMain = document.querySelector('.map__pin--main');
var pinMainLeft = mapPinMain.style.left;
var pinMainTop = mapPinMain.style.top;
var PIN_MAIN_WIDTH_HALF = 33;
var PIN_MAIN_HEIGHT_HALF = 33;
var PIN_MAIN_HEIGHT = 65;
var roomNumbers = document.querySelector('#room_number');
var capacityPersons = document.querySelector('#capacity');
var selectedOptionRoomNumber = parseInt(roomNumbers[roomNumbers.options.selectedIndex].value, 10);
var selectedOptionCapacity = parseInt(capacityPersons[capacityPersons.options.selectedIndex].value, 10);
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var templateCard = document.querySelector('#card').content.querySelector('.map__card');
var similarAd = document.querySelector('.map__pins');

var GUESTS_VALIDITY_INSTRUCTION = {
  0: [100],
  1: [1, 2, 3],
  2: [2, 3],
  3: [3]
};

var getCapacityValidity = function (quantityGuest) {
  var arrCapacity = GUESTS_VALIDITY_INSTRUCTION[quantityGuest];

  var validateCapacity = false;

  for (var i = 0; i < arrCapacity.length; i++) {
    if (selectedOptionRoomNumber === arrCapacity[i]) {
      validateCapacity = true;
      break;
    }
  }

  return validateCapacity;
};

getCapacityValidity(selectedOptionCapacity);

var getInvalidCapacityAlert = function () {
  if (!getCapacityValidity(selectedOptionCapacity)) {
    capacityPersons.setCustomValidity('Количесво мест не соответсвует количеству комнат');
  } else {
    capacityPersons.setCustomValidity('');
  }
};

var valueChange = function () {
  selectedOptionRoomNumber = parseInt(roomNumbers[roomNumbers.options.selectedIndex].value, 10);
  selectedOptionCapacity = parseInt(capacityPersons[capacityPersons.options.selectedIndex].value, 10);

  getInvalidCapacityAlert();
};

addressField.setAttribute('readonly', '');
addressField.setAttribute('value', (parseInt(pinMainLeft, 10) + PIN_MAIN_WIDTH_HALF) + ', ' + (parseInt(pinMainTop, 10) + PIN_MAIN_HEIGHT_HALF));

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
setDisabledAttr(mapFilters);

var getRandomInteger = function (min, max) {
  var randomNumber = Math.floor(min + Math.random() * (max - min));
  return randomNumber;
};

var mapActivateButton = document.querySelector('.map__pin--main');

var pageActivation = function () {
  addressField.setAttribute('value', (parseInt(pinMainLeft, 10) + PIN_MAIN_WIDTH_HALF) + ', ' + (parseInt(pinMainTop, 10) + PIN_MAIN_HEIGHT));
  map.classList.remove('map--faded');
  adFieldsets.classList.remove('ad-form--disabled');
  removeDisabledAttr(adFieldsets);
  removeDisabledAttr(mapFilters);
  capacityPersons.addEventListener('change', valueChange);
  roomNumbers.addEventListener('change', valueChange);
  renderFragmentElement(createPinsAds);
  renderFragmentElement(createPinCards);
};

mapActivateButton.addEventListener('mousedown', function (evt) {
  if (evt.which === LEFT_CLICK) {
    pageActivation();
  }
});
mapActivateButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEY_ENTER) {
    pageActivation();
  }
});

var ads = [];

var similarAds = 8;

var ADS_PRICE = ['Любая', '10000 - 50000₽', 'От 10000₽', 'До 50000₽'];
var ADS_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ADS_ROOMS = ['Любое число комнат', 'Одна комната', 'Две комнаты', 'Три комнаты'];
var ADS_GUESTS = ['Любое число гостей', 'Два гостя', 'Один гость', 'Не для гостей'];
var ADS_CHECKIN = ['12:00', '13:00', '14:00'];
var ADS_CHECKOUT = ['12:00', '13:00', '14:00'];
var ADS_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ADS_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_MIN_X = 0;
var PIN_MAX_X = 1200;
var PIN_MIN_Y = 130;
var PIN_MAX_Y = 630;
var PIN_CORR_X = -25;
var PIN_CORR_Y = -70;

var TYPE_TRANSLATE = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var getArrayShorter = function (array) {
  var shortArray = [];
  for (var k = 0; k < getRandomInteger(0, array.length); k++) {
    shortArray[k] = array[k];
  }
  return shortArray;
};

var createSimilarAds = function () {
  var getAdTitle = document.querySelector('#title').value;
  var getAdDescription = document.querySelector('#description').value;


  for (var i = 0; i < similarAds; i++) {
    ads[i] =
      {
        'author': {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        'offer': {
          title: getAdTitle,
          address: '',
          price: ADS_PRICE[getRandomInteger(0, ADS_PRICE.length)],
          type: ADS_TYPES[getRandomInteger(0, ADS_TYPES.length)],
          rooms: ADS_ROOMS[getRandomInteger(0, ADS_ROOMS.length)],
          guests: ADS_GUESTS[getRandomInteger(0, ADS_GUESTS.length)],
          checkin: ADS_CHECKIN[getRandomInteger(0, ADS_CHECKIN.length)],
          checkout: ADS_CHECKOUT[getRandomInteger(0, ADS_CHECKOUT.length)],
          features: getArrayShorter(ADS_FEATURES),
          description: 'строка с описанием',
          photos: getArrayShorter(ADS_PHOTOS)
        },
        'location': {
          x: getRandomInteger(PIN_MIN_X, PIN_MAX_X),
          y: getRandomInteger(PIN_MIN_Y, PIN_MAX_Y)
        }
      };

    ads[i].offer.address = ads[i].location.x + ' ,' + ads[i].location.y;
  }
};

createSimilarAds();

var createPinsAds = function (pinAds) {
  var similarPin = templatePin.cloneNode(true);

  similarPin.style.left = pinAds.location.x + PIN_CORR_X + 'px';
  similarPin.style.top = pinAds.location.y + PIN_CORR_Y + 'px';
  similarPin.querySelector('img').src = pinAds.author.avatar;
  similarPin.querySelector('img').alt = pinAds.offer.title;

  return similarPin;
};

var renderFragmentElement = function (createSample) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(createSample(ads[i]));
  }

  similarAd.appendChild(fragment);
};

var createPinCards = function (pinCards) {
  var similarCard = templateCard.cloneNode(true);

  similarCard.querySelector('.popup__title').textContent = pinCards.offer.title;
  similarCard.querySelector('.popup__text--address').textContent = pinCards.offer.address;
  similarCard.querySelector('.popup__text--price').textContent = (pinCards.offer.price) + '/ночь';
  similarCard.querySelector('.popup__type').textContent = TYPE_TRANSLATE[pinCards.offer.type];
  similarCard.querySelector('.popup__text--capacity').textContent = (pinCards.offer.rooms) + ' комнаты для ' + (pinCards.offer.guests);
  similarCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + (pinCards.offer.checkin) + ', выезд до ' + (pinCards.offer.checkout);
  similarCard.querySelector('.popup__description').textContent = pinCards.offer.description;

  var addFeatures = function () {
    similarCard.querySelector('.popup__features').innerHTML = '';

    for (var i = 0; i < pinCards.offer.features.length; i++) {
      var listItemFeatures = document.createElement('li');
      listItemFeatures.classList.add('popup__feature');
      listItemFeatures.classList.add('popup__feature--' + pinCards.offer.features[i]);
      similarCard.querySelector('.popup__features').appendChild(listItemFeatures);
    }
  };

  var addPhotos = function () {
    similarCard.querySelector('.popup__photos').innerHTML = '';

    for (var i = 0; i < pinCards.offer.photos.length; i++) {
      var imgPhotos = document.createElement('img');
      imgPhotos.classList.add('popup__photo');
      imgPhotos.setAttribute('src', pinCards.offer.photos[i]);
      imgPhotos.setAttribute('alt', 'Фотография жилья');
      imgPhotos.setAttribute('width', '45');
      imgPhotos.setAttribute('height', '40');

      similarCard.querySelector('.popup__photos').appendChild(imgPhotos);
    }
  };

  addFeatures();
  addPhotos();

  return similarCard;
};

getInvalidCapacityAlert();
