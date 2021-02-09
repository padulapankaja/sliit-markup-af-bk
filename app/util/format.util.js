
/*
* @param data : data which need to send as response
* @param success : success/fail of the response (bool)
* @param message : message which comes from cobot api
* @param description : description which need to send as response
*/
const format = (data = null, success = false, message = '', error = null) => {
    let result = {
        data: data,
        success: success,
        message: message,

    }

    if (error != null) {
        result.error = error
    }

    return result;
}

module.exports = format


