import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, RouterLink, MatButton, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
