module.exports = (filters, app, db, sockets) => {

  if(!filters['socket']) {
    filters['socket'] = {

    };
  }

  filters['socket']['new/message'] = (params, callback) => {
    let data = params;
    let message = data.message;
    let currentUserId = data.currentUserId;

    if (!message || !message.dialog) {
      return callback();
    }

    db.Dialog.findById(message.dialog).then(
      (dialog) => {
        //console.log(sockets[dialog.get('with_user')]);
        if(!sockets[dialog.with_user] || !sockets[dialog.user]) {
          console.log('!sockets[dialog.with_user] || !sockets[dialog.user]');
          return callback();
        }
        if (currentUserId == dialog.get('with_user')) {
          sockets[dialog.user].emit('message', message);
        } else {
          sockets[dialog.with_user].emit('message', message);
        }
        callback();
      }
    ).catch(
      (err) => {
        callback(err);
      }
    );
  };

  //notifications
  filters['socket']['new/notification'] = function (user, callback) { //натификации
    var userId = user._id;
    if (!user || !userId || !sockets[userId]) return callback();
    
    var notification = {
      likes: user.likeNotification,
      messages: user.messageNotifications,
      dialogCreate: user.dialogCreateNotification,
      viewed: user.viewedNotification,
      userId: user._id
    };
    sockets[userId].emit('notification', notification);
    callback();
  }

  //speciality notification when user removed
  filters['socket']['user/removed'] = function (userId, callback) {
    if (!userId) return callback();

    for(var idx in sockets) {
      if (sockets[idx].user._id != userId) {
        sockets[idx].emit('user-removed', userId);
      }
    }
    callback();
  }

  //send notification if reading message
  filters['socket']['message/reading'] = (message, callback) => {
    if (message && message.sender && sockets[message.sender]) {
      sockets[message.sender].emit('message-reading', message);
    }
    callback();
  }

  //return is user have in sockets connection
  filters['socket']['user/connection'] = (userId, callback) => {
    if (sockets[userId]) {
      callback(true);
    } 
    callback(false);
  }

  //send notification online status
  filters['socket']['isonline'] = function (data, callback) {
    let userId = data.userId;
    let status = data.status ? true : false;
    let statusIsVisible = data.statusIsVisible ? true : false;
    console.log(userId);
    if (!userId) return callback('userId is null');
    db.Dialog.find({$or: [{user: userId}, {with_user: userId}]}, function (err, dialogs) { //отправляет ко всем собеседникам данного юзера что он зашел либо вышел
        if (!err && dialogs.length>0) {
          let userIdsToSendnoification = [];
          console.log(dialogs);
          for (let idx in dialogs) {
            console.log(userId);
            console.log(dialogs[idx].user);
            if (dialogs[idx].user.toString() !== userId.toString()) {
              userIdsToSendnoification.push(dialogs[idx].user);
            } else if (dialogs[idx].with_user.toString() !== userId.toString()) {
              userIdsToSendnoification.push(dialogs[idx].with_user);
            }
          }
          //console.log(userIdsToSendnoification);
          if (userIdsToSendnoification.length > 0) {
            db.User.find({_id: {$in: userIdsToSendnoification}}).then(
              (users) => {
                for (let idx in users) {
                  if (sockets[users[idx]._id]) sockets[users[idx]._id].emit('isonline',data);
                }
              }
            ).catch(
              (err) => {
                callback(err);
              }
            );
          }
        }
    });

    callback();
  }

};
