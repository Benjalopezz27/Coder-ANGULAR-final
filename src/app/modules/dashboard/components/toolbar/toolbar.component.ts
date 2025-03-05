import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SelectAuthUserEmail } from '../../../../store/auth/auth.select';

@Component({
  selector: 'app-toolbar',
  standalone: false,

  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  authUserEmail$:  Observable<string | undefined>
  @Output() drawerToggle = new EventEmitter();
  constructor(private store: Store){
    this.authUserEmail$ = this.store.select(SelectAuthUserEmail)  
  }
}
