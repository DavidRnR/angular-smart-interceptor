import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { EndpointsConstant } from './endpoints.constant';

export interface ProgrammingLang {
  _id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

export interface OS {
  _id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

@Injectable()
export class DataService {

  constructor(private apiService: ApiService) {
  }

  getProgrammingLang(): Observable<ProgrammingLang[]> {

    const subject = new Subject<ProgrammingLang[]>();

    this.apiService.httpGet(EndpointsConstant.APP_PROGRAMMINGLANG).subscribe((pls: ProgrammingLang[]) => {
      subject.next(pls);
    }, (err) => {
      console.error(err);
      subject.error(err);
    }, () => {
      subject.complete();
    });

    return subject.asObservable();
  }

  getOSs(): Observable<OS[]> {

    const subject = new Subject<OS[]>();

    this.apiService.httpGet(EndpointsConstant.APP_OS).subscribe((oss: OS[]) => {
      subject.next(oss);
    }, (err) => {
      console.error(err);
      subject.error(err);
    }, () => {
      subject.complete();
    });

    return subject.asObservable();
  }

}
