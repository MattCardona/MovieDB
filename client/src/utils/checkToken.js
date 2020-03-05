import decode from 'jwt-decode';

const checkExpToken = (token, signout) => {
  const user = decode(token);
  const currentTime = Date.now() / 1000;

  if (user.exp < currentTime) {
    // console.log("%c user.exp", "color: pink;font-weight: bold;");
    signout();
  }
};

export default checkExpToken;