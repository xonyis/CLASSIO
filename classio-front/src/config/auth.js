export function saveAuthData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    // Décoder le JWT pour extraire le rôle
    const decoded = JSON.parse(atob(token.split('.')[1]));
    localStorage.setItem('role', decoded.role);
}

export function getAuthData() {
    return {
        token: localStorage.getItem('token') || '',
        role: localStorage.getItem('role') || ''
    };
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
}
