import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsFormControlPipe } from './as-form-control.pipe';
import { AsFormGroupArrayPipe } from './as-form-group-array.pipe';

@NgModule({
  declarations: [AsFormControlPipe, AsFormGroupArrayPipe],
  imports: [CommonModule],
  exports: [AsFormControlPipe, AsFormGroupArrayPipe],
})
export class PipesModule {}
