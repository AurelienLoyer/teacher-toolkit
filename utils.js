// Utils methods

let utils = {};

utils.isValidJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }

module.exports = utils;
