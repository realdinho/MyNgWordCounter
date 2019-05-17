import { Injectable } from '@angular/core';

import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService 
{
  
  // validate URL
  url(control: FormControl) 
  {
    let URL_REGEXP = /^(http:\/\/|https:\/\/)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[a-z]{3}.?([a-z]+)?$/;

    return URL_REGEXP.test(control.value) ? null : 
    {
      validateUrl: 
      {
        invalid: true
      }
    };
  }

}
