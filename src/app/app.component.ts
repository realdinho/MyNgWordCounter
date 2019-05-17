import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { CounterService } from '../app/service/counter.service';
import { ValidationService } from '../app/service/validation.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  title = 'My Angular Word Counter';
  myForm: FormGroup; 
  textOut;
  textOutQuantity = 0;
  wordsQuantity = 0;   
  errorMsgText;
  errorMsgUrl;
  errorMsg;
  submitAttempt: boolean = false;
  formValid: boolean = false;

  constructor(
    private http: HttpClient,
    private counterService: CounterService,
    private validator: ValidationService 
    ) 
  {

    this.myForm = new FormGroup({
      inputText: new FormControl('', Validators.required),
      inputUrl: new FormControl('', Validators.compose([Validators.required, validator.url]))
    });

  }

  submitText() 
  {
    this.submitAttempt = true;    

    if(this.myForm.valid)
    {
      this.formValid = true;

      // count words from text
      let text = this.myForm["value"].inputText;
      let response = this.counterService.countWords(text);
      this.wordsQuantity = response.wordsQuantity;

      // count words from text_out property in a URL
      let url = this.myForm["value"].inputUrl;

      this.http.get(url).subscribe(res => 
      {
        // check if the URL contins text_out property
        if(res['text_out'] === null || res['text_out'] === undefined)
        {
          this.errorMsg = 'No "text_out" property found!';          
        }
        {
          let response = this.counterService.countWords(res['text_out']);    
          this.textOutQuantity = response.wordsQuantity;
          this.textOut = response.text;
          this.errorMsg = 'Text in "text_out" property:';
        }
      },
      err => {
        this.errorMsg = 'No "text_out" property found!';
        this.textOut = "";
      });
    }
    else
    {
      if(this.myForm["controls"]["inputText"].errors !== null)
      {
        this.errorMsgText = "Text required!";
      }

      if(this.myForm["controls"]["inputUrl"].errors !== null)
      {
        if(this.myForm["controls"]["inputUrl"].errors["required"])
        {
          this.errorMsgUrl = "URL required!";
        }
        else
        {
          this.errorMsgUrl = "Invalid URL!";
        }
      }
    }
  }

}


