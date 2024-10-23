import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../models/book.model'; // Adjust the import path
import { FormsModule } from '@angular/forms'; // Import FormsModule here

@Component({
  selector: 'app-modal',
  standalone: true,
  imports:[FormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() book!: Book; // Accept a Book instance as input
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveBook = new EventEmitter<Book>(); // Emit the modified book

  // Called when the user clicks "Save changes"
  onSave() {
    // Emit the modified book object to the parent component
    this.saveBook.emit(this.book);
  }
  onClose() {
    this.closeModal.emit();
  }
}
