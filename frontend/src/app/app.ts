import { Component, signal } from '@angular/core';
import { Todolist } from './components/todolist/todolist.component';
import { Header } from './components/header/header.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [Header, Todolist],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
}
