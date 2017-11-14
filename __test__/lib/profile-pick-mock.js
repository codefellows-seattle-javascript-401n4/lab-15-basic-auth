'use strict';

const userMock = require('./user-mock.js');
const ProfilePic = require('../../models/profile-pic.js');

const create = () => {
  let result = {};
  return userMock.create()
    .then(user => {
      result.temUser = user;
      return new ProfilePic({
        url: 'https://avatars0.githubusercontent.com/u/1447359?s=460&v=4',
        account: user._id,
      }).save();
    })
    .then(profilePic => {
      result.profilePic = profilePic;
      return result;
    });
};


const remove = () => {
  return Promise.all([
    userMock.remove,
    ProfilePic.remove({}),
  ]);
};