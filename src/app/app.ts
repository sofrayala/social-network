import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { PostCreate } from './posts/post-create/post-create';
import { Header } from './header/header';
import { PostList } from './posts/post-list/post-list';
import { PostInterface } from './posts/interfaces/post-interface';

@Component({
  selector: 'app-root',
  imports: [PostCreate, Header, PostList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  storedPosts: PostInterface[] = [];

  onPostAdded(post: PostInterface) {
    this.storedPosts.push(post);
  }
}
