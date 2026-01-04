import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Todolist } from './todolist/todolist.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Todolist],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
}
