import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { PostCreate } from './posts/post-create/post-create';
import { Header } from './header/header';
import { PostList } from './posts/post-list/post-list';

@Component({
  selector: 'app-root',
  imports: [PostCreate, Header, PostList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
