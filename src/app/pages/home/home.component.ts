import { Component, inject } from '@angular/core';
import { AuthorizationService } from './../../services/authorization.service';
import { ProgrammingLang, DataService, OS } from '../../services/data.service';
import { Observable } from 'rxjs';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatProgressBar } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatList, MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  providers: [DataService, AuthorizationService],
  imports: [
    CommonModule,
    MatButton,
    MatList,
    MatListItem,
    MatToolbar,
    MatToolbarRow,
    MatProgressBar,
  ],
})
export class HomeComponent {
  dataService: DataService = inject(DataService);
  authorizationService: AuthorizationService = inject(AuthorizationService);
  router = inject(Router);

  programmingLangs$: Observable<ProgrammingLang[]> = this.dataService.getProgrammingLang();
  oss$: Observable<OS[]> = this.dataService.getOSs();

  logout() {
    this.authorizationService.logout();
    // Redirect to login page
    this.router.navigate(['/login']);
  }
}
