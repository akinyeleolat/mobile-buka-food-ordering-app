const fullname = 'akinyele Oluwatosin A';
const username = 'akinyeleolat';
const email = 'akinyeleolat2005@gmail.com';
const phoneNumber = '+2348032679327';
const password = 'admin@';
const userpassword = 'admin@'
const userType = 'admin';
const deliveryAddress = '5, Oluwalonimi, Ikeja,Lagos';


export const signUpData =
//empty field
{
  fullname: '',
  deliveryAddress,
  username,
  email,
  phoneNumber,
  password,
  userType,
};
// checkspace
export const signUpData1 = {
  fullname,
  deliveryAddress,
  username: ' ',
  email,
  phoneNumber,
  password,
  userType,
};
// invalid string for username
export const signUpData2 = {
  fullname,
  deliveryAddress,
  username: '123',
  email,
  phoneNumber,
  password,
  userType,
};
// invalid phonenumber
export const signUpData3 = {
  fullname,
  deliveryAddress,
  username,
  email,
  phoneNumber: '+23480',
  password,
  userType,
};
// invalid email
export const signUpData4 = {
  fullname,
  deliveryAddress,
  username,
  email: 'akinyele.com',
  phoneNumber,
  password,
  userType,
};
// invalid password
export const signUpData5 = {
  fullname,
  deliveryAddress,
  username,
  email,
  phoneNumber,
  password: 'qwer',
  userType,
};
// invalid users type
export const signUpData6 = {
  fullname,
  deliveryAddress,
  username,
  email,
  phoneNumber,
  password,
  userType: 'test',
};
// correct data
export const signUpData7 = {
  fullname: 'Akinyele James Felix',
  deliveryAddress,
  username: 'admin',
  email: 'jamesbond@james.com',
  phoneNumber: '+2349032679326',
  password,
  userType,
};

export const signUpData11 = {
  fullname: 'Akinyele James Felix',
  deliveryAddress,
  username: 'james',
  email: 'jamesbond2@james.com',
  phoneNumber: '+2349032679327',
  password,
  userType: 'customer',
};

// duplicate email
export const signUpData9 = {
  fullname: 'Akinyele Oluwatoba',
  deliveryAddress: 'Ataoja Estate',
  username: 'testUsername',
  email: 'jamesbond@james.com',
  phoneNumber: '+2347032679328',
  password,
  userType,
};
// duplicate phonenumber
export const signUpData10 = {
  fullname: 'Akinyele Oluwatoba',
  deliveryAddress: 'Ataoja Estate',
  username: 'testUsername1',
  email: 'jamesbond@james.com',
  phoneNumber: '+2347032679328',
  password,
  userType,
};
// duplicate users name
export const signUpData8 = {
  fullname: 'Akinyele Oluwatoba',
  deliveryAddress: 'Ataoja Estate',
  username: 'admin',
  email: 'a@a.com',
  phoneNumber: '+2347032679329',
  password,
  userType,
};
//empty
export const signInData = {
  username: '',
  userpassword: 'asd123@'
}
// space
export const signInData1 = {
  username: ' ',
  userpassword: 'asd123@'
}
// username must be an Alphabet
export const signInData2 = {
  username: '123',
  userpassword: 'asd123@'
}
// invalid login
export const signInData3 = {
  username: 'testusername',
  userpassword: 'testpassword'
}
// valid login
export const signInData4 = {
  username: 'admin',
  userpassword: 'admin@',
}
export const signInData5 = {
  username: 'james',
  userpassword,
}