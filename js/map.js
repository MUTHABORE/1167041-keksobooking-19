'use strict';

(function () {
  var PIN_MAIN_WIDTH_HALF = 33;
  var PIN_MAIN_HEIGHT_HALF = 33;
  var PIN_MAIN_HEIGHT = 65;

  var map = document.querySelector('.map');
  // var mapFilters = document.querySelector('.map__filters');
  var mapPinMain = document.querySelector('.map__pin--main');
  var pinMainLeft = mapPinMain.style.left;
  var pinMainTop = mapPinMain.style.top;
  // var similarAd = document.querySelector('.map__pins');
  // var addressField = document.querySelector('#address');

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

      window.data.mapWidth = map.getBoundingClientRect().width;
      window.data.PIN_MAX_X = window.data.mapWidth;

      var setMoveLimit = function () {
        if (parseInt(mapPinMain.style.top, 10) <= window.data.PIN_MIN_Y - PIN_MAIN_HEIGHT) {
          mapPinMain.style.top = window.data.PIN_MIN_Y - PIN_MAIN_HEIGHT + 'px';
        } else if (parseInt(mapPinMain.style.top, 10) >= window.data.PIN_MAX_Y) {
          mapPinMain.style.top = window.data.PIN_MAX_Y + 'px';
        }

        if (parseInt(mapPinMain.style.left, 10) <= window.data.PIN_MIN_X - PIN_MAIN_WIDTH_HALF) {
          mapPinMain.style.left = window.data.PIN_MIN_X - PIN_MAIN_WIDTH_HALF + 'px';
        } else if (parseInt(mapPinMain.style.left, 10) >= window.data.PIN_MAX_X - PIN_MAIN_WIDTH_HALF) {
          mapPinMain.style.left = window.data.PIN_MAX_X - PIN_MAIN_WIDTH_HALF + 'px';
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
    pinMainLeft: pinMainLeft,
    pinMainTop: pinMainTop,
    PIN_MAIN_WIDTH_HALF: PIN_MAIN_WIDTH_HALF,
    PIN_MAIN_HEIGHT: PIN_MAIN_HEIGHT,
    PIN_MAIN_HEIGHT_HALF: PIN_MAIN_HEIGHT_HALF,
    toggleCards: toggleCards,
    closePinCard: closePinCard,
  };
})();
