'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var SUCCESS_CODE = 200;
  var successStatus;

  var load = function (onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.open('GET', URL_LOAD);
    xhr.send();

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        window.backend.successStatus = true;
      } else {
        onError();
      }
    });

    window.xhr = xhr;
  };

  var upload = function (data, onError, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess();
        onSuccessPopup();
      } else {
        onError();
      }
    });

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  var onError = function () {
    var templateError = document.querySelector('#error').content.querySelector('.error');
    var main = document.querySelector('main');

    var fragment = document.createDocumentFragment();
    fragment.appendChild(templateError.cloneNode(true));
    main.appendChild(fragment);

    var errorButton = document.querySelector('.error__button');
    var errorPopup = document.querySelector('.error');
    var errorMessage = document.querySelector('.error__message');

    var onCloseError = function () {
      main.removeChild(errorPopup);
      document.removeEventListener('click', onCloseError);
      errorButton.removeEventListener('keydown', onCloseErrorEnter);
      document.removeEventListener('keydown', onCloseErrorEsc);
    };

    var onCloseErrorEnter = function (evt) {
      if (evt.keyCode === window.util.KEY_ENTER) {
        onCloseError();
      }
    };

    var onCloseErrorEsc = function (evt) {
      if (evt.keyCode === window.util.KEY_ESC) {
        onCloseError();
      }
    };

    document.addEventListener('click', onCloseError);
    errorButton.addEventListener('keydown', onCloseErrorEnter);
    document.addEventListener('keydown', onCloseErrorEsc);

    errorMessage.addEventListener('click', function (evt) {
      evt.stopPropagation();
    });
  };

  var onSuccessPopup = function () {
    var templateSuccess = document.querySelector('#success').content.querySelector('.success');
    var main = document.querySelector('main');

    var fragment = document.createDocumentFragment();
    fragment.appendChild(templateSuccess.cloneNode(true));
    main.appendChild(fragment);

    var successPopup = document.querySelector('.success');
    var succesMessage = document.querySelector('.success__message');

    var onCloseSuccess = function () {
      main.removeChild(successPopup);
      document.removeEventListener('click', onCloseSuccess);
      document.removeEventListener('keydown', onCloseSuccessEsc);
    };

    var onCloseSuccessEsc = function (evt) {
      if (evt.keyCode === window.util.KEY_ESC) {
        onCloseSuccess();
      }
    };

    document.addEventListener('keydown', onCloseSuccessEsc);
    document.addEventListener('click', onCloseSuccess);

    succesMessage.addEventListener('click', function (evt) {
      evt.stopPropagation();
    });
  };

  load(onError);

  window.backend = {
    onError: onError,
    upload: upload,
    successStatus: successStatus
  };
}());
