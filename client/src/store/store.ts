import { makeAutoObservable } from 'mobx';
import { AuthResponse, User } from '../models/interfaces';
import AuthService from '../services/auth.service';
import axios from 'axios';
import { API_URL } from '../http';

export default class Store {
    user = {} as User;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    };

    setAuth(bool: boolean) {
        this.isAuth = bool;
    };

    setUser(user: User) {
        this.user = user;
    };

    setLoading(bool: boolean) {
        this.isLoading = bool;
    };

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error);
        }
    };

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error);
        }
    };

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as User);
        } catch (error) {
            console.log(error);
        }
    };

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error);
        } finally {
            this.setLoading(false);
        }
    };

}