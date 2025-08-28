import { Component, Input, OnInit, effect } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { PostInterface } from '../interfaces/post-interface';
import { PostsService } from '../../services/posts-service';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-post-list',
  imports: [MatExpansionModule, MatButton, RouterLink, MatProgressSpinnerModule],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
})
export class PostList implements OnInit {
  posts: any;
  isLoading=false;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts();
    this.isLoading = false;
    this.posts = this.postsService.postsSignal;
  }

  onDelete(postId : string){
    this.postsService.deletePost(postId)
  }
}
