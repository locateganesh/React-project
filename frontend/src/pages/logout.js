import { redirect } from "react-router-dom";

export function action() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('expiration');
    return redirect('/');
}