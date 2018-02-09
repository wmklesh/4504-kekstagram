'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var picturesContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content;

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomKeyFromArray = function (array) {
  return Math.floor((Math.random() * array.length));
};

var getRandomComments = function (arrayComments, numbersOfComments) {
  var comments = [];

  if (numbersOfComments > arrayComments.length) {
    numbersOfComments = arrayComments.length;
  }

  for (var i = 0; i < numbersOfComments; i++) {
    var keyComment = getRandomKeyFromArray(arrayComments);
    comments[i] = arrayComments[keyComment];
    arrayComments.splice(keyComment, 1);
  }

  return comments;
};

var generatePicturesData = function (arrayComments, numberOfPictures) {
  var pictures = [];

  for (var i = 0; i < numberOfPictures; i++) {
    pictures[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInt(15, 200),
      comments: getRandomComments(arrayComments, getRandomInt(1, 2))
    };
  }

  return pictures;
};

var renderPicture = function (picture, template) {
  var pictureElement = template.cloneNode(true);

  pictureElement.querySelector('img').src = picture.url;
  pictureElement.querySelector('.picture-likes').textContent = picture.likes;
  pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;

  return pictureElement;
};

var viewPictures = function (pictures, container, template) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPicture(pictures[i], template));
  }

  return container.appendChild(fragment);
};

var pictures = generatePicturesData(COMMENTS, 25);
viewPictures(pictures, picturesContainer, pictureTemplate);


