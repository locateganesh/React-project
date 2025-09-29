import { redirect } from "react-router-dom";

export function getTokenDuration() {
    const storedExpirationDate = sessionStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    return expirationDate.getTime() - now.getTime();
}

export function getAuthToken() {
    const token =  sessionStorage.getItem('token');

    if (!token) {
        return null;
    }

    const tokenDuration = getTokenDuration();

    if (tokenDuration < 0) {
        return 'EXPIRED';
    }

    return token;
}

export function tokenLoader() {
    return getAuthToken();
}

export function checkAuthToken() {
    // this function will be added in the next lecture
    // make sure it looks like this in the end
    const token = getAuthToken();
    
    if (!token) {
        return redirect('/auth');
    }
    
    return null; // this is required, Loader should return else null.
}