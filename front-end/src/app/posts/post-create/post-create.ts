import { Component, OnInit } from '@angular/core';
import {
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
import { PostsService } from '../../services/posts-service';

@Component({
  selector: 'app-post-create',
  standalone: true,
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

  constructor(public postsService: PostsService) {}

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

  onAddPost(form: FormGroup) {
    if (form.invalid) {
      return;
    }

    // this.postsService.addPost(form.value.title, form.value.content);

    this.postForm.reset();
  }
}
