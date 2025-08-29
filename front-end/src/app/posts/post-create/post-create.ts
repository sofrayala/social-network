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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,MatProgressSpinnerModule
  ],
  templateUrl: './post-create.html',
  styleUrl: './post-create.css',
})
export class PostCreate implements OnInit {
  postForm!: FormGroup;
  post!: PostInterface;
  isLoading = false;
  imagePreview!:string;
  private mode= 'create'
  private postId: string = '';

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.postForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      image: new FormControl(null, {validators:[Validators.required]})
      
    });
    
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if (paramMap.has('postId')) {
  this.mode = 'edit';
  const postId = paramMap.get('postId');
 if (postId) {
      this.postId = postId;
      this.isLoading = true
      this.postsService.getPost(this.postId).subscribe((postData: any) => {
        this.isLoading = false;
        this.post = {
          id: postData._id,
          title: postData.title,
          content: postData.content
        };
        this.postForm.patchValue({
          title: this.post.title,
          content: this.post.content
        });
      });
    }
}else{
        this.mode = 'create'
      }
    });
  }  

  onImagePicked(event: Event){
const input = event.target as HTMLInputElement;
  let file!: File | undefined;
    if (input.files && input.files.length > 0) {
    file = input.files[0];
    this.postForm.patchValue({image: file});
    this.postForm.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () =>{ 
      this.imagePreview = reader.result as string
    }
    reader.readAsDataURL(file!)
  } else {
    this.imagePreview = '';
  }
  } 

  onSavePost() {
    if (this.postForm.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create'){
      this.postsService.addPost(this.postForm.value.title, this.postForm.value.content);
    }else{
      this.postsService.updatePost(this.postId,this.postForm.value.title, this.postForm.value.content )
    }


    this.postForm.reset();
  }
}
