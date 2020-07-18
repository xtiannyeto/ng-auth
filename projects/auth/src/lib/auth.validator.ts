import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface ValidationResult {
  [key: string]: boolean;
}

@Injectable()
export class AuthValidator {
  constructor() {}

  static passworFormat(control: FormControl): ValidationResult {
    const PASSWORD_REGEXP = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&]){8,}'
    );
    if (control.value !== '' && !PASSWORD_REGEXP.test(control.value)) {
      return { format: true };
    }

    return null;
  }

  static areEqual(group: FormGroup): ValidationResult {
    let val;
    let valid = true;

    for (const name in group.controls) {
      if (val === undefined) {
        val = group.controls[name].value;
      } else {
        if (val !== group.controls[name].value) {
          valid = false;
          break;
        }
      }
    }

    if (valid) {
      return null;
    }

    return {
      areEqual: true
    };
  }
}
