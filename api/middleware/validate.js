/**
 * This function check for space.
 * @param {number} value any
 * @returns {boolean} true or false.
 */
export const checkSpace = (value) => {

  if (String(value).trim() === '') {
    return true;
  }
};

/**
 * This function check if the value is a number.
 * @param {number} value any
 * @returns {boolean} true or false.
 */
export const checkNumber = (value) => {
  if (String(value).match(/[1-9]/g)) {
    return true;
  }
};
/**
 * This function check if the value is a string.
 * @param {string} value any
 * @returns {boolean} true or false.
 */
export const checkString = (value) => {
  // .toLowerCase()
  if (String(value).match(/[a-z]/g)) {
    return true;
  }
};

/**
 * This function check if the value is a valid email.
 * @param {number} value any
 * @returns {boolean} true or false.
 */
export const checkEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email)) {
    return true;
  }
};
