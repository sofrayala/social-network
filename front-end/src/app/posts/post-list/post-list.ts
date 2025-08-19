import { Component, Input, OnInit, effect } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { PostInterface } from '../interfaces/post-interface';
import { PostsService } from '../../services/posts-service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-post-list',
  imports: [MatExpansionModule, MatButton],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
})
export class PostList implements OnInit {
  posts: any;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getPosts();
    this.posts = this.postsService.postsSignal;
  }
}
