const Boom = require('@hapi/boom')

function success(data, message = "Success", statusCode = 200) {
    return (res) => res.response({ 
        statusCode,
        message,
        data
    }).code(statusCode)
}

const error = (data, message = "Error", statusCode = 500) => Boom.badData(message, data)

module.exports = {
    success,
    error
}