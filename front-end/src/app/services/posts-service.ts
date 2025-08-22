import { Injectable, signal } from '@angular/core';
import { PostInterface } from '../posts/interfaces/post-interface';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: PostInterface[] = [];
  private postsUpdated = signal<PostInterface[]>([]);

  constructor(private http:HttpClient){}

  getPosts() {
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map((postData)=>{ return postData.posts.map((post: { title: any; content: any; _id: any; }) =>{
      return {
        title: post.title,
        content: post.content,
        id: post._id
      }
    }) }))
    .subscribe((transformedPosts)=>{
      this.posts = transformedPosts
      this.postsUpdated.set([...this.posts])
    })
  }

  get postsSignal() {
    return this.postsUpdated.asReadonly();
  }

  addPost(id: string, title: string, content: string) {
    const post: PostInterface = { id: id, title: title, content: content };
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
    .subscribe((responseData)=>{
      console.log(responseData.message)
      this.postsUpdated.update((currentPosts) => [...currentPosts, post]);
    })
  }
}
