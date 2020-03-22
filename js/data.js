'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapWidth = map.getBoundingClientRect().width;
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  var ads = [];

  var PIN_MIN_X = 0;
  var PIN_MAX_X = mapWidth;
  var PIN_MIN_Y = 130;
  var PIN_MAX_Y = 630;
  var PIN_CORR_X = -25;
  var PIN_CORR_Y = -70;

  var TypeTranslate = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

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

    similarCard.querySelector('.popup__avatar').src = '';
    if (pinCards.author.avatar) {
      similarCard.querySelector('.popup__avatar').src = pinCards.author.avatar;
    } else {
      similarCard.querySelector('.popup__avatar').style.display = 'none';
    }

    similarCard.querySelector('.popup__title').innerHTML = '';
    if (pinCards.offer.title) {
      similarCard.querySelector('.popup__title').textContent = pinCards.offer.title;
    } else {
      similarCard.querySelector('.popup__title').style.display = 'none';
    }

    similarCard.querySelector('.popup__text--address').innerHTML = '';
    if (pinCards.offer.address) {
      similarCard.querySelector('.popup__text--address').textContent = pinCards.offer.address;
    } else {
      similarCard.querySelector('.popup__text--address').style.display = 'none';
    }

    similarCard.querySelector('.popup__text--price').innerHTML = '';
    if (pinCards.offer.price) {
      similarCard.querySelector('.popup__text--price').textContent = (pinCards.offer.price) + '/ночь';
    } else {
      similarCard.querySelector('.popup__text--price').style.display = 'none';
    }

    similarCard.querySelector('.popup__type').innerHTML = '';
    if (pinCards.offer.type) {
      similarCard.querySelector('.popup__type').textContent = TypeTranslate[pinCards.offer.type.toUpperCase()];
    } else {
      similarCard.querySelector('.popup__type').style.display = 'none';
    }

    similarCard.querySelector('.popup__text--capacity').innerHTML = '';
    if (pinCards.offer.rooms && pinCards.offer.guests) {
      similarCard.querySelector('.popup__text--capacity').textContent = (pinCards.offer.rooms) + ' комнаты для ' + (pinCards.offer.guests);
    } else {
      similarCard.querySelector('.popup__text--capacity').style.display = 'none';
    }

    similarCard.querySelector('.popup__text--time').innerHTML = '';
    if (pinCards.offer.checkin && pinCards.offer.checkout) {
      similarCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + (pinCards.offer.checkin) + ', выезд до ' + (pinCards.offer.checkout);
    } else {
      similarCard.querySelector('.popup__text--time').style.display = 'none';
    }

    similarCard.querySelector('.popup__description').innerHTML = '';
    if (pinCards.offer.description) {
      similarCard.querySelector('.popup__description').textContent = pinCards.offer.description;
    } else {
      similarCard.querySelector('.popup__description').style.display = 'none';
    }

    var addFeatures = function () {
      similarCard.querySelector('.popup__features').innerHTML = '';

      if (!pinCards.offer.features.length) {
        similarCard.querySelector('.popup__features').style.display = 'none';
      }

      for (var i = 0; i < pinCards.offer.features.length; i++) {
        var listItemFeatures = document.createElement('li');
        listItemFeatures.classList.add('popup__feature');
        listItemFeatures.classList.add('popup__feature--' + pinCards.offer.features[i]);
        similarCard.querySelector('.popup__features').appendChild(listItemFeatures);
      }
    };

    var addPhotos = function () {
      similarCard.querySelector('.popup__photos').innerHTML = '';

      if (!pinCards.offer.photos.length) {
        similarCard.querySelector('.popup__photos').style.display = 'none';
      }

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

  window.data = {
    ads: ads,
    createPinsAds: createPinsAds,
    createPinCards: createPinCards,
    PIN_MIN_X: PIN_MIN_X,
    PIN_MAX_X: PIN_MAX_X,
    PIN_MIN_Y: PIN_MIN_Y,
    PIN_MAX_Y: PIN_MAX_Y,
  };
}());
