import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalTodoItem } from '../modal-todo-item/modal-todo-item.component';

@Component({
  selector: 'app-todolist',
  imports: [FormsModule, NgClass, ModalTodoItem],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
})
export class Todolist {
  taskArray = [
    {
      id: 1,
      title: 'Sample Task',
      description: 'This is a sample task description.',
      isCompleted: false,
      isReadOnly: true,
    },
    {
      id: 2,
      title: 'Another Sample Task',
      description: 'This is an another sample task description.',
      isCompleted: false,
      isReadOnly: true,
    },
  ];

  modalInfo: {
    title: string;
    isToOpen: boolean;
    idTask: number;
    titleTask: string;
    textTask: string;
  } = {
    title: '',
    isToOpen: false,
    idTask: -1,
    titleTask: '',
    textTask: '',
  };

  isToEditMode: boolean = false;

  onCreateTask(form: NgForm) {
    this.taskArray.push({
      id: this.taskArray.length + 1,
      title: form.value.titleTask,
      description: form.value.textTask,
      isCompleted: false,
      isReadOnly: true,
    });
  }

  onEditTask(index: number) {
    this.isToEditMode = true;
    this.modalInfo.idTask = index;
    this.onOpenModal(
      'Edit Task',
      true,
      this.taskArray[index].title,
      this.taskArray[index].description
    );
  }

  onUpdateTask(form: NgForm) {
    this.taskArray[this.modalInfo.idTask].title =
      form.value.titleTask || this.taskArray[this.modalInfo.idTask].title;
    this.taskArray[this.modalInfo.idTask].description =
      form.value.textTask || this.taskArray[this.modalInfo.idTask].description;
  }

  onDeleteTask(index: number) {
    this.taskArray.splice(index, 1);
  }

  onCheckboxChange(index: number) {
    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
  }

  onOpenModal(title: string, isToOpen: boolean, titleTask: string = '', textTask: string = '') {
    this.modalInfo = { title, isToOpen, titleTask, textTask, idTask: this.modalInfo.idTask };
  }

  onCloseModal() {
    this.modalInfo = { ...this.modalInfo, isToOpen: false, idTask: -1 };
    this.isToEditMode = false;
  }
}
