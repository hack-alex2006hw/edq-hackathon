var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var fbRef = require('../utils/FirebaseUtils').homeInstance();

var CHANGE_EVENT = 'change';

var _state = {
  Student: {
    users: ['todoemail', 'tylr@gmail.com']
  },
  Assistant: {
    users: ["assi@fds.com, assfe@gmail.com"]
  },
  Teacher: {
    users: ["teach@gma.com"]
  }
};

var setUsers = function(usersObj){
  _state[usersObj.type].users = _state[usersObj.type].users.concat(usersObj.user);
};

var removeUser = function(index) {
  _state.users.splice(index, 1); //todo
}

var ClassListStore = objectAssign({}, EventEmitter.prototype, {
  getState: function() {
    return _state;
  },
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.actionType) {
    case AppConstants.ADD_USER :
      setUsers(action.data);
      ClassListStore.emit(CHANGE_EVENT);
    break;
    case AppConstants.REMOVE_USER :
      removeUser(action.data);
      ClassListStore.emit(CHANGE_EVENT);
    break;
    default :
      return true;
  }
});

module.exports = ClassListStore;