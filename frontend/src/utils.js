import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const getUserFromToken = () => {
    const token = Cookies.get('authToken');
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.user;
    } catch (error) {
        console.error('Invalid token', error);
        return null;
    }
};

export const TokenOnly = () => {
    const token = Cookies.get('authToken');
    if (!token) return null;

    return token;
}
