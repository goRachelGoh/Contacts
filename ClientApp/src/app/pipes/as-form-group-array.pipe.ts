import { Pipe, PipeTransform } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';

@Pipe({
  name: 'asFormGroupArray',
})
export class AsFormGroupArrayPipe implements PipeTransform {
  transform(control: AbstractControl | null): FormGroup[] {
    if (control) {
      return (control as FormArray).controls as FormGroup[];
    } else {
      return [];
    }
  }
}
