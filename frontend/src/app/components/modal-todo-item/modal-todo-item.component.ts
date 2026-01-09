import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-modal-todo-item',
  imports: [CommonModule, NgClass, FormsModule],
  templateUrl: './modal-todo-item.component.html',
  styleUrl: './modal-todo-item.component.css',
})
export class ModalTodoItem {
  @Input() modalInfo!: {
    idTask: string | null;
    title: string;
    isToOpen: boolean;
    titleTask: string;
    textTask: string;
  };
  @Input() isToEditMode!: boolean;
  @Output() createTask = new EventEmitter<NgForm>();
  @Output() updateTask = new EventEmitter<NgForm>();
  @Output() closeModal = new EventEmitter<void>();

  readonly MAX_TITLE_LENGTH = 250;
  titleTaskInvalid: boolean = false;
  textTaskInvalid: boolean = false;

  onVerifySubmit(form: NgForm) {
    if (
      !form.value.titleTask ||
      form.value.titleTask.trim() === '' ||
      form.value.titleTask.length > this.MAX_TITLE_LENGTH
    ) {
      this.titleTaskInvalid = true;
    } else {
      this.titleTaskInvalid = false;
    }

    if (!form.value.textTask || form.value.textTask.trim() === '') {
      this.textTaskInvalid = true;
    } else {
      this.textTaskInvalid = false;
    }

    if (this.titleTaskInvalid || this.textTaskInvalid) {
      return;
    }
    if (this.isToEditMode) {
      // Here you would typically emit an event to update the task
      // For example: this.updateTask.emit({ ... });
      this.updateTask.emit(form);
    } else {
      this.createTask.emit(form);
    }
    this.onCloseModal(form);
  }

  onCloseModal(form: NgForm) {
    this.titleTaskInvalid = false;
    this.textTaskInvalid = false;
    form.reset();
    this.closeModal.emit();
  }
}
