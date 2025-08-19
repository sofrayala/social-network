import { Injectable, signal } from '@angular/core';
import { PostInterface } from '../posts/interfaces/post-interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: PostInterface[] = [];
  private postsUpdated = signal<PostInterface[]>([]);

  constructor(private http:HttpClient){}

  getPosts() {
    this.http.get<{message: string, posts: PostInterface[]}>('http://localhost:3000/api/posts')
    .subscribe((postData)=>{
      this.posts = postData.posts
      this.postsUpdated.set([...this.posts])
    })
  }

  get postsSignal() {
    return this.postsUpdated.asReadonly();
  }

  addPost(id: string, title: string, content: string) {
    const post: PostInterface = { id: id, title: title, content: content };
    this.postsUpdated.update((currentPosts) => [...currentPosts, post]);
  }
}
