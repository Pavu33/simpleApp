'use strict';
const responseCodes = require('./../helpers/response-codes');


module.exports = function(res, error, payload) {
    let status;
    let message;
    if (!!error) {
       
        status = error.code || responseCodes.BadRequest;
        message = error.message;
        
     } else {
    
        status = responseCodes.OK;
        message = res.message;

    }
    
    res.status(status).send(JSON.stringify({
        error: error,
        message: message,
        payload: payload,
        status: status
    }));
};

