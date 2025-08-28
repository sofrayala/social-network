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
import { ActivatedRoute, ParamMap } from '@angular/router';

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
export class PostCreate implements OnInit {
  postForm!: FormGroup;
  private mode= 'create'
  private postId: string = '';
  post!: PostInterface;

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.postForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required],
      }),
      content: new FormControl(null, {
        validators: [Validators.required],
      }),
      
    });
    
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if (paramMap.has('postId')) {
  this.mode = 'edit';
  const postId = paramMap.get('postId');
  if (postId) {
    this.postId = postId;
    const postData = this.postsService.getPost(this.postId);
    if (postData && postData.id && postData.title && postData.content) {
      this.post = {
        id: postData.id,
        title: postData.title,
        content: postData.content
      };
      this.postForm.patchValue({
        title: this.post.title,
        content: this.post.content
      });
    }
  }
}else{
        this.mode = 'create'
      }
    })
  }

  onSavePost(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    if(this.mode === 'create'){
      this.postsService.addPost(form.value.title, form.value.content);
    }else{
      this.postsService.updatePost(this.postId,form.value.title, form.value.content )
    }


    this.postForm.reset();
  }
}
