import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatProgressBar } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatList, MatListItem } from '@angular/material/list';
import { AuthorizationService } from './../../services/authorization.service';
import { ProgrammingLang, DataService, OS } from '../../services/data.service';
import { ItemListComponent } from './components/item-list/item-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  providers: [DataService, AuthorizationService],
  imports: [
    CommonModule,
    ItemListComponent,
    MatButton,
    MatList,
    MatListItem,
    MatToolbar,
    MatToolbarRow,
    MatProgressBar,
  ],
})
export class HomeComponent implements OnInit {
  dataService: DataService = inject(DataService);
  authorizationService: AuthorizationService = inject(AuthorizationService);
  router = inject(Router);

  programmingLanguages: WritableSignal<ProgrammingLang[]> = this.dataService.programmingLanguages;
  os: WritableSignal<OS[]> = this.dataService.os;

  ngOnInit(): void {
    this.dataService.loadProgrammingLang();
    this.dataService.loadOSs();
  }

  logout() {
    this.authorizationService.logout();
    // Redirect to login page
    this.router.navigate(['/login']);
  }
}
