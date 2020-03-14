'use strict';

(function () {
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
  var mapWidth = map.getBoundingClientRect().width;
  var PIN_MIN_X = 0;
  var PIN_MAX_X = mapWidth;
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
            price: ADS_PRICE[window.util.getRandomInteger(0, ADS_PRICE.length)],
            type: ADS_TYPES[window.util.getRandomInteger(0, ADS_TYPES.length)],
            rooms: ADS_ROOMS[window.util.getRandomInteger(0, ADS_ROOMS.length)],
            guests: ADS_GUESTS[window.util.getRandomInteger(0, ADS_GUESTS.length)],
            checkin: ADS_CHECKIN[window.util.getRandomInteger(0, ADS_CHECKIN.length)],
            checkout: ADS_CHECKOUT[window.util.getRandomInteger(0, ADS_CHECKOUT.length)],
            features: window.util.getArrayShorter(ADS_FEATURES),
            description: getAdDescription,
            photos: window.util.getArrayShorter(ADS_PHOTOS)
          },
          'location': {
            x: window.util.getRandomInteger(PIN_MIN_X, PIN_MAX_X),
            y: window.util.getRandomInteger(PIN_MIN_Y, PIN_MAX_Y)
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
    similarPin.classList.add('map__pin--secondary');

    return similarPin;
  };

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
        if (evt.which === window.util.LEFT_CLICK) {
          closeAllCards();
          cards[i].style.display = 'block';
          pins[i].classList.add('map__pin--active');
        }
      });

      elem.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.util.KEY_ENTER) {
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
    var cards = document.querySelectorAll('.map__card');
    var pins = document.querySelectorAll('.map__pin--secondary');

    pinCloseButtons.forEach(function (elem, i) {
      elem.addEventListener('mousedown', function (evt) {
        if (evt.which === window.util.LEFT_CLICK) {
          pins[i].classList.remove('map__pin--active');
          cards[i].style.display = 'none';
        }
      });
      elem.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.util.KEY_ENTER) {
          pins[i].classList.remove('map__pin--active');
          cards[i].style.display = 'none';
        }
      });
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.util.KEY_ESC) {
          pins[i].classList.remove('map__pin--active');
          cards[i].style.display = 'none';
        }
      });
    });
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoord = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoord.x - moveEvt.clientX,
        y: startCoord.y - moveEvt.clientY
      };

      startCoord = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapWidth = map.getBoundingClientRect().width;
      PIN_MAX_X = mapWidth;

      var setMoveLimit = function () {
        if (parseInt(mapPinMain.style.top, 10) <= PIN_MIN_Y - PIN_MAIN_HEIGHT) {
          mapPinMain.style.top = PIN_MIN_Y - PIN_MAIN_HEIGHT + 'px';
        } else if (parseInt(mapPinMain.style.top, 10) >= PIN_MAX_Y) {
          mapPinMain.style.top = PIN_MAX_Y + 'px';
        }

        if (parseInt(mapPinMain.style.left, 10) <= PIN_MIN_X - PIN_MAIN_WIDTH_HALF) {
          mapPinMain.style.left = PIN_MIN_X - PIN_MAIN_WIDTH_HALF + 'px';
        } else if (parseInt(mapPinMain.style.left, 10) >= PIN_MAX_X - PIN_MAIN_WIDTH_HALF) {
          mapPinMain.style.left = PIN_MAX_X - PIN_MAIN_WIDTH_HALF + 'px';
        }
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      setMoveLimit();
      window.form.setCoords();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    map: map,
    ads: ads,
    addressField: addressField,
    pinMainLeft: pinMainLeft,
    pinMainTop: pinMainTop,
    PIN_MAIN_WIDTH_HALF: PIN_MAIN_WIDTH_HALF,
    PIN_MAIN_HEIGHT: PIN_MAIN_HEIGHT,
    PIN_MAIN_HEIGHT_HALF: PIN_MAIN_HEIGHT_HALF,
    mapFilters: mapFilters,
    mapPinMain: mapPinMain,
    createPinsAds: createPinsAds,
    createPinCards: createPinCards,
    toggleCards: toggleCards,
    similarAd: similarAd,
    closePinCard: closePinCard,
  };
})();
