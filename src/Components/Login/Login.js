import React from 'react';

   
function Login() {
    
    function loginBtn() {
        let {REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env
        let redirectUri = encodeURIComponent('http://localhost:3006/auth/callback')

        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
    }
 
    return (
        <div className='login'>
                <button onClick={loginBtn} className='button'>Login</button>
            </div>
        )
}

export default Login









