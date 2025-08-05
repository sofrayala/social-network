import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { PostCreate } from './posts/post-create/post-create';

@Component({
  selector: 'app-root',
  imports: [PostCreate],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'mean-course';
}
