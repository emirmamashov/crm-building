var validator = require('validate.js');

module.exports = function(filters) {
    if (!filters['input']) {
        filters['input'] = {};
    }
    filters['input']['validate'] = function(constraints) {
        return function(req, res, next) {
            console.log('--------------filters[input][validate]----------');
            //console.log(req.body);
            setMessageWithLang(req, constraints);

            for (var idx in req.body) {
                if (!constraints[idx]) {
                    delete req.body[idx];
                }
            }

            validator.async(req.body, constraints).then(function(attributes) {
                req.body = attributes;
                next();
            }, function(errors) {
                console.log(errors);
                let message = '';
                for (let i = 0; i < errors.length; i++) {
                    if (i === 0) {
                        message = errors[i] + ', ';
                    } else if (i === errors.length - 1) {
                        message += errors[i];
                    } else {
                        message += errors[i] + ', ';
                    }
                }

                return res.status(200).json({
                    success: false,
                    message: message,
                    data: {
                        code: 403,
                        message: 'required check'
                    }
                });
            });
        };
    };
};

function setMessageWithLang(req, constraints) {
    let validationLangMsg = req.__('validation');
    if (constraints.first_name) {
        if (constraints.first_name.presence) constraints.first_name.presence.message = validationLangMsg.first_name.required;
        if (constraints.first_name.length) constraints.first_name.length.message = validationLangMsg.first_name.maxLength;
    }
    if (constraints.last_name && constraints.last_name.length) constraints.last_name.length.message = validationLangMsg.last_name.maxLength;
    if (constraints.gender) {
        if (constraints.gender.presence) constraints.gender.presence.message = validationLangMsg.gender.required;
        if (constraints.gender.inclusion) constraints.gender.inclusion.message = validationLangMsg.gender.inclusion;
    }
    if (constraints.birth_date) {
        if (constraints.birth_date.presence) constraints.birth_date.presence.message = validationLangMsg.birth_date.required;
        if (constraints.birth_date.datetime) constraints.birth_date.datetime.message = validationLangMsg.birth_date.yearsLimit;
    }
    if (constraints.email) {
        if (constraints.email.presence) constraints.email.presence.message = validationLangMsg.email.required;
        if (constraints.email.email) constraints.email.email.message = validationLangMsg.email.format;
    }
}