import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipes/full-name.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { MultiplyDirective } from './directives/multiply.directive';
import { MatListModule } from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FullNamePipe, HighlightDirective, MultiplyDirective],
  imports: [CommonModule],
  exports: [
    FullNamePipe,
    MatIconModule, 
    HighlightDirective, 
    MultiplyDirective,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
})
export class SharedModule {}
