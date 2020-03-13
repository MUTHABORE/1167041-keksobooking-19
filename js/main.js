'use strict';

//util

var KEY_ESC = 27;
var KEY_ENTER = 13;
var LEFT_CLICK = 1;
//map
var map = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters');
var mapPinMain = document.querySelector('.map__pin--main');
var pinMainLeft = mapPinMain.style.left;
var pinMainTop = mapPinMain.style.top;
var PIN_MAIN_WIDTH_HALF = 33;
var PIN_MAIN_HEIGHT_HALF = 33;
var PIN_MAIN_HEIGHT = 65;
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var templateCard = document.querySelector('#card').content.querySelector('.map__card');
var similarAd = document.querySelector('.map__pins');
var addressField = document.querySelector('#address');

//form

var adFieldsets = document.querySelector('.ad-form');

//validity

var roomNumbers = document.querySelector('#room_number');
var capacityPersons = document.querySelector('#capacity');
var housingSelect = document.querySelector('#type');
var inputPrice = document.querySelector('#price');
var selectType = document.querySelector('#type');
var inputHousingType = selectType[selectType.options.selectedIndex].value;
var selectedRoom = parseInt(roomNumbers[roomNumbers.options.selectedIndex].value, 10);
var selectedCapacity = parseInt(capacityPersons[capacityPersons.options.selectedIndex].value, 10);


//валидация

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

//address

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



//activation

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
  toggleCards();
  setMinPrice();
  selectType.addEventListener('change', onMinPriceChange);
  timeIn.addEventListener('change', syncTimeOut);
  timeOut.addEventListener('change', syncTimeIn);
  mapPinMain.removeEventListener('mousedown', mainButtonMouseActivation);
  mapPinMain.removeEventListener('keydown', mainButtonKeyboardActivation);
  closePinCard();
};

var mainButtonMouseActivation = function (evt) {
  if (evt.which === LEFT_CLICK) {
    pageActivation();
  }
};

var mainButtonKeyboardActivation = function (evt) {
  if (evt.keyCode === KEY_ENTER) {
    pageActivation();
  }
};

mapPinMain.addEventListener('mousedown', mainButtonMouseActivation);
mapPinMain.addEventListener('keydown', mainButtonKeyboardActivation);

//similar ads

var ads = [];

var similarAds = 8;

var ADS_PRICE = ['Любая', '10000 - 50000₽', 'От 10000₽', 'До 50000₽'];
var ADS_TYPES = ['PALACE', 'FLAT', 'HOUSE', 'BUNGALO'];
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
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALO: 'Бунгало'
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
          description: getAdDescription,
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

//pin ads

var createPinsAds = function (pinAds) {
  var similarPin = templatePin.cloneNode(true);

  similarPin.style.left = pinAds.location.x + PIN_CORR_X + 'px';
  similarPin.style.top = pinAds.location.y + PIN_CORR_Y + 'px';
  similarPin.querySelector('img').src = pinAds.author.avatar;
  similarPin.querySelector('img').alt = pinAds.offer.title;
  similarPin.classList.add('map__pin--secondary');

  return similarPin;
};

//pin cards

var createPinCards = function (pinCards) {
  var similarCard = templateCard.cloneNode(true);

  similarCard.querySelector('.popup__avatar').src = pinCards.author.avatar;
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

var toggleCards = function () {
  var cards = document.querySelectorAll('.map__card');
  var pins = document.querySelectorAll('.map__pin--secondary');

  var closeAllCards = function () {
    for (var i = 0; i < cards.length; i++) {
      cards[i].style.display = 'none';
      pins[i].classList.remove('map__pin--active');
    }
  };

  pins.forEach(function (elem, i) {
    elem.addEventListener('mousedown', function (evt) {
      if (evt.which === LEFT_CLICK) {
        closeAllCards();
        cards[i].style.display = 'block';
        pins[i].classList.add('map__pin--active');
        console.log(pins);
      }
    });

    elem.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KEY_ENTER) {
        closeAllCards();
        cards[i].style.display = 'block';
        pins[i].classList.add('map__pin--active');
      }
    });
  });

  closeAllCards();
};

var closePinCard = function () {
  var pinCloseButtons = document.querySelectorAll('.popup__close');
  console.log(pinCloseButtons);
  var cards = document.querySelectorAll('.map__card');
  var pins = document.querySelectorAll('.map__pin--secondary');

  pinCloseButtons.forEach(function(elem, i) {
    elem.addEventListener('mousedown', function (evt) {
      if (evt.which === LEFT_CLICK) {
        pins[i].classList.remove('map__pin--active');
        cards[i].style.display = 'none';
      }
    });
    elem.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KEY_ENTER) {
        pins[i].classList.remove('map__pin--active');
        cards[i].style.display = 'none';
      };
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KEY_ESC) {
        pins[i].classList.remove('map__pin--active');
        cards[i].style.display = 'none';
      };
    });
  });
};
  
//getInvalidCapacityAlert();

//util

var getRandomInteger = function (min, max) {
  var randomNumber = Math.floor(min + Math.random() * (max - min));
  return randomNumber;
};

var renderFragmentElement = function (createSample) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(createSample(ads[i]));
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
