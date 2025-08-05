import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  imports: [ReactiveFormsModule],
  templateUrl: './post-create.html',
  styleUrl: './post-create.css',
})
export class PostCreate {
  enteredValue = new FormControl('');
  newPost: string = 'NO CONTENT';

  onAddPost() {
    this.newPost = this.enteredValue.value ?? '';
  }
}
