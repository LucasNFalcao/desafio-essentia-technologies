import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Todolist } from './components/todolist/todolist.component';
import { Header } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Todolist],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
}
