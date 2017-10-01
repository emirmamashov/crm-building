module.exports = {
    email: {
        presence: {
            message: '^Введите логин.'
        },
        length: {
            maximum: 50,
            message: '^Длина email не должно привышать 50символов.'
        },
        email: {
            message: 'неправильного формата'
        }
    },
    password: {
        presence: {
            message: '^Введите пароль.'
        },
        length: {
            maximum: 25,
            minimum: 6,
            message: '^Длина должна быть больше 6 и меньше 25сиволов.'
        }
    }
};