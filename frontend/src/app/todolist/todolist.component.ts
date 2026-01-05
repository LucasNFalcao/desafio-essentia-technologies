import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  imports: [FormsModule, NgClass],
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

  onCreateTask(form: NgForm) {
    this.taskArray.push({
      id: this.taskArray.length + 1,
      title: form.value.titleTask,
      description: form.value.textTask,
      isCompleted: false,
      isReadOnly: true,
    });

    form.reset();
  }

  onEditTask(index: number) {
    this.taskArray[index].isReadOnly = !this.taskArray[index].isReadOnly;
  }

  onUpdateTask(index: number, form: NgForm) {
    this.taskArray[index].title = form.value.titleTask;
    this.taskArray[index].description = form.value.textTask;
  }

  onDeleteTask(index: number) {
    this.taskArray.splice(index, 1);
  }

  onCheckboxChange(index: number) {
    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
    console.log(this.taskArray[index].isCompleted);
  }
}
