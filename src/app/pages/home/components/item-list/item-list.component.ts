import { Component, input } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatList, MatListItem } from '@angular/material/list';
import { OS, ProgrammingLang } from '../../../../services/data.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [MatList, MatListItem, MatProgressBar],
  template: `
    @if(items().length > 0) {
    <mat-list>
      @for(item of items(); track $index) {
      <mat-list-item>{{ item.name }}</mat-list-item>
      }@empty {
      <span>Nessuna categoria è stata trovata!</span>
      }
    </mat-list>
    } @else {
    <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    }
  `,
})
export class ItemListComponent {
  items = input.required<ProgrammingLang[] | OS[]>();
}
