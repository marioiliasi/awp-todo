import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import config from '../../config';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    register(user: User) {
      return this.http.post(`${config.apiUrl}/user`, user);
    }

    delete(id: number) {
      return this.http.delete(`${config.apiUrl}/user/${id}`);
    }
}
