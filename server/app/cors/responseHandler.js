const getErrorStatus = require('../constant/ErrorData');

function findErrorMessage(status) {
  return getErrorStatus.ERROR_STATUS_ARRAY.find(v => v.status === status) || { error: 'There must be an error' };
}

/**
 * Success Reposnse.
 * @param {number} status - Success response status
 * @param {string} successMessage - Success response message
 * @param {any} data - Success response custom data
 */
let successResponse = (status, successMessage, data) => {
  return {
    status,
    message: successMessage,
    data
  }
}

/**
 * Error Reposnse.
 * @param {Response} res - Send error response
 * @param {number} statusCode - Error Status Code
 */
let errorResponse = (statusCode) => {
  return findErrorMessage(statusCode);
}


module.exports = {
  errorResponse,
  successResponse,
};