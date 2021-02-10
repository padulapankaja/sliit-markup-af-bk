
/*
* format error come from express-validator
*/
const errors_format = (errors = []) => {
    return errors.reduce((acc, current, index) => {
        if (index == 0) {
            return current.msg
        } else {
            return acc
        }
    }, '')
}

module.exports = errors_format


