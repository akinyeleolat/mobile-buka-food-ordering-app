export const checkSpace = (value) => {

  if (String(value).trim() === '') {
    return true;
  }
};
export const checkNumber = (value) => {
  if (String(value).match(/[1-9]/g)) {
    return true;
  }
};
export const checkEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email)) {
    return true;
  }
};
