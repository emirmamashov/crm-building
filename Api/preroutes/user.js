module.exports = function(filters) {
    // ---------------------------------------------------------
    // route middleware to authenticate and check token
    // ---------------------------------------------------------
    if (!filters['user']) {
        filters['user'] = {};
    }
    filters['user']['authRequired'] = function() {
        return function(req, res, next) {
            if (!req.decoded) {
                let errMsg = req.__('NotAuthorized');
                return res.status(200).json({
                    success: false,
                    message: errMsg,
                    data: {
                        code: 403,
                        notAuth: true,
                        message: 'not auth'
                    }
                })
            }
            req.user = req.decoded._doc;
            next();
        };
    };

};
