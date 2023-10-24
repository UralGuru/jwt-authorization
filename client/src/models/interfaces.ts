export interface User {
    id: string;
    email: string;
    isActivated: boolean;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}