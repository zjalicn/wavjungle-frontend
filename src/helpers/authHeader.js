//AuthHeader makes authenticated HTTP requests to server API
//contains JSON Web token of the currently logged in user
//return empty object if no user

export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token){
        return { 'Authorization': user.token };
    } else {
        return {};
    }
}