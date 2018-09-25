const genString = () => {
  const text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

console.log(genString());

const SignUpData = (genString) => {
  const fullname = genString() + ' ' + genString();
  const username = genString();
  const email = 'akinyeleolat2005@gmail.com';
  const phoneNumber = '+2348032679327';
  const password = 'asd123@';
  const userType = 'customer';
}