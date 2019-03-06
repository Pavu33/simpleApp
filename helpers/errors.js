
'use strict';

const _ = require('underscore');
const responseCodes = require('./response-codes');


function AppError(message, code, name='AppError') {
    this.name = name;
    this.message = message || 'Default Message';
    this.code = code;
    this.stack = (new Error()).stack;
}

AppError.prototype = Object.create(Error.prototype);
AppError.prototype.constructor = AppError;

module.exports = {
    internalServer: function(formatForWire) {
        const error = new AppError(
            'Internal server error',
            responseCodes.InternalServer,
            'InternalServerError'
        );
        return formatForWire ? this.formatErrorForWire(error) : error;
    },

    formatErrorForWire: function(AppError) {
        return _.omit(AppError, 'stack');
    },

    resourceNotFound: function(formatForWire) {
      const error = new AppError('Resource Not Found', responseCodes.ResourceNotFound, 'ResourceNotFound');
      return formatForWire ? this.formatErrorForWire(error) : error;
   },


   invalidPassword: function(formatForWire) {
      const error = new AppError('Invalid Password', responseCodes.Unauthorized, 'InvalidPassword');
      return formatForWire ? this.formatErrorForWire(error) : error;
   },

   emailAlreadyExists: function(formatForWire) {
    const error = new AppError('Email Already Exists', responseCodes.Unauthorized, 'emailAlreadyExists');
    return formatForWire ? this.formatErrorForWire(error) : error;
 },

  


};
