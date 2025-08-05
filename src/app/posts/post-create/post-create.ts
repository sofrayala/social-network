import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-post-create',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
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
