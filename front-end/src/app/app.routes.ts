import { Routes } from '@angular/router';
import { PostList } from './posts/post-list/post-list';
import { PostCreate } from './posts/post-create/post-create';

export const routes: Routes = [
    {path: '', component: PostList},
    {path: 'create', component: PostCreate},
    {path: 'edit/:postId', component: PostCreate}
];
