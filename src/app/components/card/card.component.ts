import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Todo} from 'src/app/models/todo';
import {Project} from '../../models/project';
import {ProjectsService} from '../../services/projects.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})

export class CardComponent implements OnInit {
  projects$: Observable<Project[]>;

  constructor(
    private projectsService: ProjectsService,
  ) {}

  trackByFn(index, item): number {
    return item.id;
  }

  ngOnInit(): void {
    this.projects$ = this.projectsService.projects;
  }

  switchTodoIsCompleted(todo: Todo): void {
    this.projectsService.updateTodo(todo);
  }
}
