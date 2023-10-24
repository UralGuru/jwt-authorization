import $api from '../http';
import { AxiosResponse } from 'axios';
import { User } from '../models/interfaces';

export default class UserService {
    static async getUsers(): Promise<AxiosResponse<User[]>> {
        return $api.get<User[]>('users');
    };
}