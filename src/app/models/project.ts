import { Todo } from './todo';

export class Project {
  constructor(title: string) {
    this.title = title;
  }
  id: number;
  title: string;
  todos: Todo[];
}
