import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { EndpointsConstant } from './endpoints.constant';

export interface ProgrammingLang {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OS {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiService = inject(ApiService);

  getProgrammingLang(): Observable<ProgrammingLang[]> {
    return this.apiService.httpGet<ProgrammingLang[]>(EndpointsConstant.PROGRAMMINGLANG);
  }

  getOSs(): Observable<OS[]> {
    return this.apiService.httpGet<OS[]>(EndpointsConstant.OS);
  }

}
