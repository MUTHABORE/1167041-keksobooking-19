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

//  var SIMILAR_ADS = 8;
//  var ADS_PRICE = ['Любая', '10000 - 50000₽', 'От 10000₽', 'До 50000₽'];
//  var ADS_TYPES = ['PALACE', 'FLAT', 'HOUSE', 'BUNGALO'];
//  var ADS_ROOMS = ['Любое число комнат', 'Одна комната', 'Две комнаты', 'Три комнаты'];
//  var ADS_GUESTS = ['Любое число гостей', 'Два гостя', 'Один гость', 'Не для гостей'];
//  var ADS_CHECKIN = ['12:00', '13:00', '14:00'];
//  var ADS_CHECKOUT = ['12:00', '13:00', '14:00'];
//  var ADS_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
//  var ADS_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


  var TypeTranslate = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

//  var createSimilarAds = function () {
//    var getAdTitle = document.querySelector('#title').value;
//    var getAdDescription = document.querySelector('#description').value;
//
//
//    for (var i = 0; i < SIMILAR_ADS; i++) {
//      ads[i] =
//        {
//          'author': {
//            avatar: 'img/avatars/user0' + (i + 1) + '.png'
//          },
//          'offer': {
//            title: getAdTitle,
//            address: '',
//            price: ADS_PRICE[window.util.getRandomInteger(0, ADS_PRICE.length)],
//            type: ADS_TYPES[window.util.getRandomInteger(0, ADS_TYPES.length)],
//            rooms: ADS_ROOMS[window.util.getRandomInteger(0, ADS_ROOMS.length)],
//            guests: ADS_GUESTS[window.util.getRandomInteger(0, ADS_GUESTS.length)],
//            checkin: ADS_CHECKIN[window.util.getRandomInteger(0, ADS_CHECKIN.length)],
//            checkout: ADS_CHECKOUT[window.util.getRandomInteger(0, ADS_CHECKOUT.length)],
//            features: window.util.getArrayShorter(ADS_FEATURES),
//            description: getAdDescription,
//            photos: window.util.getArrayShorter(ADS_PHOTOS)
//          },
//          'location': {
//            x: window.util.getRandomInteger(PIN_MIN_X, PIN_MAX_X),
//            y: window.util.getRandomInteger(PIN_MIN_Y, PIN_MAX_Y)
//          }
//        };
//
//      ads[i].offer.address = ads[i].location.x + ' ,' + ads[i].location.y;
//    }
//  };
//
//  createSimilarAds();

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
    similarCard.querySelector('.popup__type').textContent = TypeTranslate[pinCards.offer.type];
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
