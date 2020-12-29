import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import config from '../../config';
import {Task} from "protractor/built/taskScheduler";
import {Todo} from "@/_models/todo";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class TodoService {
    constructor(private http: HttpClient) { }

    getOpen(user: User) {
      const url = `${config.apiUrl}/user/${user._id}/todos`;
      console.log(url);
      return this.http.get<Todo[]>(url);
    }

    getClosed(user: User) {
      console.log(user._id);
      return this.http.get<Todo[]>(`${config.apiUrl}/user/${user._id}/todos/archived`);
    }

    addTodo(user: User, todo: Todo) {
      todo.userId = user._id;
      const url = `${config.apiUrl}/user/${user._id}/todo`;
      console.log(todo);
      console.log(url);
      return this.http.post<Todo>(url, todo).subscribe();
    }

    updateTodo(user: User, todo: Todo) {
      todo.userId = user._id;
      const url = `${config.apiUrl}/user/${user._id}/todo/${todo._id}`;
      console.log(todo);
      console.log(url);
      return this.http.put<Todo>(url, todo).subscribe(response => {});
    }

    deleteTodo(user: User, todo: Todo) {
      todo.userId = user._id;
      const url = `${config.apiUrl}/user/${user._id}/todo/${todo._id}`;
      console.log(todo);
      console.log(url);
      return this.http.delete<Todo>(url).subscribe();
    }
}
