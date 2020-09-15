import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { plainToClass } from 'class-transformer';
import { Project } from '../models/project';
import { Todo } from '../models/todo';
import {environment} from '../../environments/environment';

const url = environment.api_url;

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getProjects(): Observable<Project[]> {
    return this.http
      .get<Project[]>(url + 'projects')
      .pipe(map((plainProjects) => plainToClass(Project, plainProjects)));
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const body = `{ "todo_id": ${todo.id} }`;
    return this.http
      .patch<Todo>(url + 'projects', body, this.httpOptions)
      .pipe(map((plainTodo) => plainToClass(Todo, plainTodo)));
  }

  createTodo(todoText: string, projectTitle: string): Observable<Todo> {
    const body = `{
      "todo":{
        "text":"${todoText}",
        "project_title":"${projectTitle}"
      }
    }
    `;
    return this.http
      .post(url + 'todos', body, this.httpOptions)
      .pipe(map((plainTodo) => plainToClass(Todo, plainTodo)));
  }
}
