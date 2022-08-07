import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match

export function MatchUrl(controlName: string,stringValue: string, controlFlag: string) {
   
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const flag = formGroup.controls[controlFlag];
       
      if(flag.value==controlName) 
      {
        
        if (control.errors && !control.errors.mustMatch ) {
            
            return;
        }

        if (!control.value.includes(stringValue)) {
            control.setErrors({ mustMatch: true });
        } else {
            control.setErrors(null);
        }
        
      }
      else
      {
        control.setErrors(null);
      }
    }
}