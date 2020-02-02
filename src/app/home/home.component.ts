import { AuthorizationService } from './../services/authorization.service';
import { Component, OnInit } from '@angular/core';
import { ProgrammingLang, DataService, OS } from '../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  programmingLangs$: Observable<ProgrammingLang[]>;
  oss$: Observable<OS[]>;

  constructor(private dataService: DataService, private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.loadData();
  }

  logout() {
    this.authorizationService.logout();
  }

  private loadData() {
    this.programmingLangs$ = this.dataService.getProgrammingLang();
    this.oss$ = this.dataService.getOSs();
  }
 
}
