import { AuthorizationService } from './../services/authorization.service';
import { Component, OnInit } from '@angular/core';
import { ProgrammingLang, DataService, OS } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  programmingLangs: ProgrammingLang[];
  oss: OS[];

  spinners = {
    pl: false,
    os: false
  };
  constructor(private dataService: DataService, private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.getProgrammingLangs();
    this.getOSs();
  }

  logout() {
    this.authorizationService.logout();
  }

  private getProgrammingLangs() {
    this.spinners.pl = true;

    this.dataService.getProgrammingLang().subscribe((pls: ProgrammingLang[]) => {
      this.programmingLangs = pls;
      this.spinners.pl = false;
    });
  }

  private getOSs() {
    this.spinners.os = true;

    this.dataService.getOSs().subscribe((oss: OS[]) => {
      this.oss = oss;
      this.spinners.os = false;
    });
  }
}
