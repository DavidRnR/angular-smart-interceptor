import { inject, Injectable, signal } from '@angular/core';
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

  programmingLanguages = signal<ProgrammingLang[]>([]);
  os = signal<OS[]>([]);

  loadProgrammingLang(): void {
    this.apiService
      .httpGet<ProgrammingLang[]>(EndpointsConstant.PROGRAMMINGLANG)
      .subscribe((data) => {
        this.programmingLanguages.set(data);
      });
  }

  loadOSs(): void {
    this.apiService.httpGet<OS[]>(EndpointsConstant.OS).subscribe((data) => {
      this.os.set(data);
    });
  }
}
