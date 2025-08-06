import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { PostInterface } from '../../post-interface';

@Component({
  selector: 'app-post-list',
  imports: [MatExpansionModule],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
})
export class PostList {
  @Input() posts: PostInterface[] = [];
}
