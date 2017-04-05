// API Server URL
const URL = "http://localhost:3000"

export function login(pUsername, pPassword) {
  if(pUsername == null || pUsername === ''){
    return {type: 'loginError', message: 'Username can\'t be blank'};
  }
  if(pPassword == null || pPassword === ''){
    return {type: 'loginError', message: 'Password can\'t be blank'};
  }
  // API POST url
  let url = URL +'/api/sessions';
  return dispatch => {
    dispatch({type:'login'});
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        auth: {
          username: pUsername,
          password: pPassword,
        }
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log(responseJson)
      dispatch({
        type: 'loggedIn',
        token: responseJson.jwt,
      });
      dispatch({
        type: 'loginRoute',
      })
    })
    .catch((error) => {
      console.log(error)
      dispatch({
        type: 'apiError',
        message: 'The username and password doesn\'t match',
      })
    });
  }
}
