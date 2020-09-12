import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Project } from '../models/project';
import { Todo } from '../models/todo';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private _projects = new BehaviorSubject<Project[]>([]);
  private objects: Project[] = [];
  readonly projects: Observable<Project[]> = this._projects.asObservable();

  constructor(private api: ApiService) {
    this.getProjects();
  }

  getProjects(): void {
    this.api.getProjects().subscribe((projects) => {
      this.objects = projects;
      this._projects.next(this.objects);
    });
  }

  updateTodo(todo: Todo): void {
    this.api.updateTodo(todo).subscribe((todo_changed) => {
      if (todo_changed.id === todo.id) {
        todo.toggleCompleted();
        this._projects.next(this.objects);
      }
    });
  }

  createTodo(todo_text: string, project_title: string): void {
      this.api.createTodo(todo_text, project_title).subscribe((todo) => {
        if (todo.text === todo_text) {
          this.getProjects();
        }
      });
  }
}
