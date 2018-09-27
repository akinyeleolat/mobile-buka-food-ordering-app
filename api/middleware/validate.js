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
/**
 * This function check if the value is a valid phoneNumber.
 * @param {number} value any
 * @returns {boolean} true or false.
 */
export const checkPhoneNumber = (phoneNumber) => {
  if (phoneNumber.match(/^\+?([0-9]{3})\)?[-. ]?([0-9]{10})$/) && (phoneNumber.length >= 10)) {
    return true;
  }
};
/**
 * This function check if the value is a valid password text, number and sysmbols not less than 6.
 * @param {number} value any
 * @returns {boolean} true or false.
 */
export const checkPassword = (value) => {
  if ((String(value).match(/[A-Za-z0-9]/g)) && (String(value).match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g)) && (value.length >= 6)) {
    return true;
  }
};