import { Injectable, signal } from '@angular/core';
import { PostInterface } from '../posts/interfaces/post-interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: PostInterface[] = [];
  private postsUpdated = signal<PostInterface[]>([]);

  getPosts() {
    return [...this.posts];
  }

  get postsSignal() {
    return this.postsUpdated.asReadonly();
  }

  addPost(title: string, content: string) {
    const post: PostInterface = { title: title, content: content };
    this.postsUpdated.update((currentPosts) => [...currentPosts, post]);
  }
}
