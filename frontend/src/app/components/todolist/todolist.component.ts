import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalTodoItem } from '../modal-todo-item/modal-todo-item.component';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task.model';

@Component({
  standalone: true,
  selector: 'app-todolist',
  imports: [CommonModule, FormsModule, NgClass, ModalTodoItem],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
})
export class Todolist implements OnInit {
  taskArray = signal<Task[]>([]);

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.taskArray.set(tasks);
    });
  }

  modalInfo: {
    title: string;
    idTask: string | null;
    isToOpen: boolean;
    titleTask: string;
    textTask: string;
  } = {
    title: '',
    idTask: null,
    isToOpen: false,
    titleTask: '',
    textTask: '',
  };

  isToEditMode: boolean = false;

  onCreateTask(form: NgForm) {
    const newTask = {
      title: form.value.titleTask,
      description: form.value.textTask,
      completed: false,
    };

    this.taskService.createTask(newTask).subscribe((task) => {
      this.taskArray.update((tasks) => [...tasks, task]);
      this.onCloseModal();
    });
  }

  onEditTask(task: Task) {
    this.isToEditMode = true;

    this.modalInfo = {
      idTask: task.id,
      title: 'Editar Tarefa',
      isToOpen: true,
      titleTask: task.title,
      textTask: task.description,
    };
  }

  onUpdateTask(form: NgForm) {
    if (!this.modalInfo.idTask) return;

    const updatedTask: Task = {
      id: this.modalInfo.idTask,
      title: form.value.titleTask,
      description: form.value.textTask,
      completed: false,
    };

    this.taskService.updateTask(updatedTask).subscribe(() => {
      this.taskArray.update((tasks) =>
        tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
      this.onCloseModal();
    });
  }

  onDeleteTask(idRemove: string) {
    this.taskService.deleteTask(idRemove).subscribe(() => {
      this.taskArray.update((tasks) => tasks.filter((t) => t.id !== idRemove));
    });
  }

  onCheckboxChange(id: string) {
    const index = this.taskArray().findIndex((task) => task.id === id);
    if (index === -1) return;

    this.taskService.updateTaskStatus(id, !this.taskArray()[index].completed).subscribe(() => {
      this.taskArray.update((tasks) =>
        tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    });
  }

  onOpenModal(
    title: string,
    isToOpen: boolean,
    titleTask = '',
    textTask = '',
    idTask: string | null = null
  ) {
    this.modalInfo = { title, isToOpen, titleTask, textTask, idTask };
  }

  onCloseModal() {
    this.modalInfo = { ...this.modalInfo, isToOpen: false };
    this.isToEditMode = false;
  }
}
