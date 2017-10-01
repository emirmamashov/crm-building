let fs = require('fs');

module.exports = {
    remove(db, userId, socket) {
        return new Promise((resolve, reject) => {
            db.UserView.remove({
                $or: [{
                    user: userId
                }, {
                    viewed_user: userId
                }]
            }).then(
                (userview) => {
                    db.UserFilter.remove({
                        user: userId
                    }).then(
                        (userfilters) => {
                            db.Like.remove({
                                $or: [{
                                    from_user: userId
                                }, {
                                    to_user: userId
                                }]
                            }).then(
                                (likes) => {
                                    db.Dialog.remove({
                                        $or: [{
                                            user: userId
                                        }, {
                                            with_user: userId
                                        }]
                                    }).then(
                                        (dialogs) => {
                                            var dialogIds = [];
                                            if (dialogs && dialogs.length > 0) dialogs.map((dialog) => {
                                                if (dialog && dialog._id) {
                                                    dialogIds.push(dialog._id);
                                                }
                                            });

                                            db.Message.remove({
                                                sender: {
                                                    $in: dialogIds
                                                }
                                            }).then(
                                                (messages) => {
                                                    db.Photo.remove({
                                                        user: userId
                                                    }).then(
                                                        (photos) => {
                                                            if (photos && photos.length > 0) photos.map((photo) => {
                                                                if (photo.url) fs.unlinkSync(config.STATIC_DIR + photo.url);
                                                                if (photo.url_40x40) fs.unlinkSync(config.STATIC_DIR + photo.url_40x40);
                                                                if (photo.url_115х116) fs.unlinkSync(config.STATIC_DIR + photo.url_115х116);
                                                                if (photo.url_174х160) fs.unlinkSync(config.STATIC_DIR + photo.url_174х160);
                                                                if (photo.url_360x232) fs.unlinkSync(config.STATIC_DIR + photo.url_360x232);
                                                                if (photo.url_369x336) fs.unlinkSync(config.STATIC_DIR + photo.url_369x336);
                                                                if (photo.url_360x569) fs.unlinkSync(config.STATIC_DIR + photo.url_360x569);
                                                                if (photo.url_360x514) fs.unlinkSync(config.STATIC_DIR + photo.url_360x514);
                                                            });

                                                            db.User.findByIdAndRemove(userId).then(
                                                                (user) => {
                                                                    if (!user) {
                                                                        reject(
                                                                            {
                                                                                    success: false,
                                                                                    message: 'Пользователь не найдено',
                                                                                    status: 'red',
                                                                                    data: {
                                                                                        message: 'user not found',
                                                                                        code: 404
                                                                                    }
                                                                                }
                                                                        );
                                                                    }

                                                                    socket['user/removed'](userId, function(err) {
                                                                        if (err) {
                                                                            console.log(err);
                                                                            reject(
                                                                                {
                                                                                    success: false,
                                                                                    message: 'Что то пошло не так',
                                                                                    status: 'red',
                                                                                    data: {
                                                                                        message: err,
                                                                                        code: 500
                                                                                    }
                                                                                }
                                                                            );
                                                                        }
                                                    
                                                                        resolve({
                                                                                    success: true,
                                                                                    message: 'Успешно удалено!',
                                                                                    status: 'green',
                                                                                    data: {
                                                                                        message: 'Успешно удалено',
                                                                                        code: 200
                                                                                    }
                                                                                });
                                                                    });
                                                                }
                                                            ).catch(
                                                                (err) => {
                                                                    console.log(err);
                                                                    reject(
                                                                        {
                                                                            success: false,
                                                                            message: 'Что то пошло не так',
                                                                            status: 'red',
                                                                            data: {
                                                                                message: err,
                                                                                code: 500
                                                                            }
                                                                        }
                                                                    );
                                                                }
                                                            );
                                                        }
                                                    ).catch(
                                                        (err) => {
                                                            console.log(err);
                                                            reject(
                                                                {
                                                                    success: false,
                                                                    message: 'Что то пошло не так',
                                                                    status: 'red',
                                                                    data: {
                                                                        message: err,
                                                                        code: 500
                                                                    }
                                                                }
                                                            );
                                                        }
                                                    );
                                                }
                                            ).catch(
                                                (err) => {
                                                    console.log(err);
                                                    reject({
                                                            success: false,
                                                            message: 'Что то пошло не так',
                                                            status: 'red',
                                                            data: {
                                                                message: err,
                                                                code: 500
                                                            }
                                                        });
                                                }
                                            );
                                        }
                                    ).catch(
                                        (err) => {
                                            console.log(err);
                                            reject({
                                                            success: false,
                                                            message: 'Что то пошло не так',
                                                            status: 'red',
                                                            data: {
                                                                message: err,
                                                                code: 500
                                                            }
                                                        })
                                        }
                                    );
                                }
                            ).catch(
                                (err) => {
                                    console.log(err);
                                    reject({
                                                            success: false,
                                                            message: 'Что то пошло не так',
                                                            status: 'red',
                                                            data: {
                                                                message: err,
                                                                code: 500
                                                            }
                                                        });
                                }
                            );
                        }
                    ).catch(
                        (err) => {
                            console.log(err);
                            reject({
                                                            success: false,
                                                            message: 'Что то пошло не так',
                                                            status: 'red',
                                                            data: {
                                                                message: err,
                                                                code: 500
                                                            }
                                                        });
                        }
                    );
                }
            ).catch(
                (err) => {
                    console.log(err);
                    reject({
                                                            success: false,
                                                            message: 'Что то пошло не так',
                                                            status: 'red',
                                                            data: {
                                                                message: err,
                                                                code: 500
                                                            }
                                                        });
                }
            );
        });
    }
}