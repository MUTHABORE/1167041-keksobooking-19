'use strict';

var adFieldset = document.querySelectorAll('.ad-form fieldset');

var setDisabledAttr = function (elem) {
  for (var i = 0; i < elem.length; i++) {
    elem[i].setAttribute ('disabled', '');
  }
};

setDisabledAttr (adFieldset);

var getRandomInteger = function (min, max) {
  var randomNumber = Math.floor(min + Math.random() * (max - min));
  return randomNumber;
};

var RIGHT_CLICK = 'Contextmenu';

var mapActivateButton = document.querySelector('.map__pin--main');

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


var getArrayShorter = function (array) {
  var shortArray = [];
  for (var k = 0; k < getRandomInteger(0, array.length); k++) {
    array[k] = shortArray[k];
  }
  return shortArray;
};

var createSimilarAds = function () {
  for (var i = 0; i < similarAds; i++) {
    ads[i] =
      {
        'author': {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        'offer': {
          title: 'строка, заголовок предложения',
          address: '',
          price: ADS_PRICE[getRandomInteger(0, ADS_PRICE.length)],
          type: ADS_TYPES[getRandomInteger(0, ADS_TYPES.length)],
          rooms: ADS_ROOMS[getRandomInteger(0, ADS_ROOMS.length)],
          guests: ADS_GUESTS[getRandomInteger(0, ADS_GUESTS.length)],
          checkin: ADS_CHECKIN[getRandomInteger(0, ADS_CHECKIN.length)],
          checkout: ADS_CHECKOUT[getRandomInteger(0, ADS_CHECKOUT.length)],
          features: getArrayShorter(ADS_FEATURES),
          description: 'строка с описанием',
          photos: getArrayShorter(ADS_PHOTOS),
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

var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var similarAd = document.querySelector('.map__pins');


var createPinsAds = function (pinAds) {
  var similarPin = templatePin.cloneNode(true);

  similarPin.style.left = pinAds.location.x + PIN_CORR_X + 'px';
  similarPin.style.top = pinAds.location.y + PIN_CORR_Y + 'px';
  similarPin.querySelector('img').src = pinAds.author.avatar;
  similarPin.querySelector('img').alt = pinAds.offer.title;

  return similarPin;
};

var renderFragmentElement = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(createPinsAds(ads[i]));
  }

  similarAd.appendChild(fragment);
};

mapActivateButton.addEventListener('click', function (evt) {
  if (evt.key === RIGHT_CLICK) {
  } else {
    renderFragmentElement();
  }
});


