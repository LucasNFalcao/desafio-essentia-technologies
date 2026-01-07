import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalTodoItem } from '../modal-todo-item/modal-todo-item.component';
import { TaskService } from '../../services/task';
import { Task } from '../../../Task';

@Component({
  selector: 'app-todolist',
  imports: [FormsModule, NgClass, ModalTodoItem],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
})
export class Todolist implements OnInit {
  taskArray: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.taskArray = tasks;
    });
  }

  modalInfo: {
    title: string;
    isToOpen: boolean;
    titleTask: string;
    textTask: string;
  } = {
    title: '',
    isToOpen: false,
    titleTask: '',
    textTask: '',
  };

  isToEditMode: boolean = false;

  onCreateTask(form: NgForm) {
    const newTask: Task = {
      title: form.value.titleTask,
      description: form.value.textTask,
      completed: false,
    };

    this.taskService.createTask(newTask).subscribe((task) => {
      this.taskArray.push(task);
      this.onCloseModal();
    });

    this.taskService.getTasks().subscribe((tasks) => {
      console.log(tasks);
    });
  }

  onEditTask(index: number) {
    this.isToEditMode = true;
    this.onOpenModal(
      'Editar Tarefa',
      true,
      this.taskArray[index].title,
      this.taskArray[index].description
    );
  }

  onUpdateTask(form: NgForm, task: Task) {
    this.taskArray[this.modalInfo.idTask].title =
      form.value.titleTask || this.taskArray[this.modalInfo.idTask].title;
    this.taskArray[this.modalInfo.idTask].description =
      form.value.textTask || this.taskArray[this.modalInfo.idTask].description;

    this.taskService.updateTask(task).subscribe(() => {
      this.onCloseModal();
    });
  }

  onDeleteTask(idRemove: String) {
    this.taskService.deleteTask(idRemove).subscribe(() => {
      this.taskArray = this.taskArray.filter((task) => task.id !== idRemove);
    });
  }

  onCheckboxChange(index: number) {
    this.taskService
      .updateTaskStatus(index, !this.taskArray[index].completed)
      .subscribe(() => (this.taskArray[index].completed = !this.taskArray[index].completed));
  }

  onOpenModal(title: string, isToOpen: boolean, titleTask: string = '', textTask: string = '') {
    this.modalInfo = { title, isToOpen, titleTask, textTask };
  }

  onCloseModal() {
    this.modalInfo = { ...this.modalInfo, isToOpen: false };
    this.isToEditMode = false;
  }
}
