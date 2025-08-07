import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {
  FormControlName,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PostInterface } from '../interfaces/post-interface';

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
  postForm!: FormGroup;

  ngOnInit() {
    this.postForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required],
      }),
      content: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  @Output() postCreated = new EventEmitter<PostInterface>();

  onAddPost(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    const post: PostInterface = {
      title: form.value.title ?? '',
      content: form.value.content ?? '',
    };
    this.postCreated.emit(post);
  }
}
