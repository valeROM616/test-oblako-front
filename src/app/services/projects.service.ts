import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Project} from '../models/project';
import {Todo} from '../models/todo';
import {ApiService} from './api.service';

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
      todo_changed.toggleCompleted();
      this._projects.next(this.objects);
    });
  }

  createTodo(todo_text: string, project_title: string): void {
    this.api.createTodo(todo_text, project_title).subscribe(todo => {
      let project: Project = this.objects.find(e => e.id === todo.project_id);
      if (typeof project !== 'undefined') {
        project.todos.push(todo);
      } else {
        let newProject = new Project(project_title);
        newProject.todos = [todo];
        this.objects.push(newProject);
      }
    });
  }
}
