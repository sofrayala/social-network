import { Injectable, signal } from '@angular/core';
import { PostInterface } from '../posts/interfaces/post-interface';
import { HttpClient } from '@angular/common/http';
import { map, subscribeOn } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: PostInterface[] = [];
  private postsUpdated = signal<PostInterface[]>([]);

  constructor(private http:HttpClient, private router: Router){}

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

  getPost(id:string){
    return this.http.get<{_id: string, title: string, content:string}>("http://localhost:3000/api/posts/" + id)
  }

  addPost(title: string, content: string) {
    const post = {title: title, content: content };
    this.http.post<{message: string; post:PostInterface}>('http://localhost:3000/api/posts', post)
    .subscribe((responseData)=>{
      const newPost: PostInterface = {
        id: responseData.post.id,
        title: responseData.post.title,
        content: responseData.post.content
      };
      this.postsUpdated.update((currentPosts) => [...currentPosts, newPost]);
      this.router.navigate(["/"])

    })
  }

 

  updatePost(id:string, title:string, content:string){
    const post: PostInterface = {id: id, title: title, content: content};
    this.http.put("http://localhost:3000/api/posts/" + id, post).subscribe(

      response =>{
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.set([...this.posts]);
        this.router.navigate(["/"])
      }
    )
  }

  deletePost(postId: string){
    this.http.delete("http://localhost:3000/api/posts/" + postId)
    .subscribe(()=>{
      const updatedPosts = this.posts.filter(post => post.id != postId);
      this.posts = updatedPosts
      this.postsUpdated.set([...updatedPosts])
      this.getPosts()
    })
  }
}
