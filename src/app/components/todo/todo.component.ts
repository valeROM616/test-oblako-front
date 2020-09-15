import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {ProjectsService} from '../../services/projects.service';
import {Project} from 'src/app/models/project';

interface NewTask {
  text: string;
  selectedCategory: string;
  customNewCategory: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  todoReactiveForm: FormGroup;

  projects$: Observable<Project[]>;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private projectsService: ProjectsService
  ) {
    this.projects$ = this.projectsService.projects;
  }

  ngOnInit(): void {
    this.initForm();
    this.subscriptions.push(
      this.todoReactiveForm
        .get('selectedCategory')
        .valueChanges.subscribe((value) => {
        if (value === 'new') {
          this.todoReactiveForm.get('customNewCategory').enable();
        } else {
          this.todoReactiveForm.get('customNewCategory').disable();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  trackByFn(index, item): number {
    return item.id;
  }

  initForm() {
    this.todoReactiveForm = this.fb.group({
      text: [null, [Validators.required]],
      selectedCategory: [null, [Validators.required]],
      customNewCategory: [
        {value: null, disabled: true},
        [Validators.required],
      ],
    });
  }

  submit(new_task: NewTask) {
    if (new_task.selectedCategory === 'new') {
      this.projectsService.createTodo(
        new_task.text,
        new_task.customNewCategory
      );
    } else {
      this.projectsService.createTodo(new_task.text, new_task.selectedCategory);
    }
  }
}
