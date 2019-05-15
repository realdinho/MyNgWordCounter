import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { CounterService } from '../app/service/counter.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  title = 'MyNgWordCounter';
  myForm: FormGroup; 
  textOut;
  textOutQuantity = 0;
  wordsQuantity = 0;   

  constructor(
    private counterService: CounterService, 
    private http: HttpClient) 
  {

    this.myForm = new FormGroup({
      inputText: new FormControl('', Validators.required),
      url: new FormControl('', Validators.compose([Validators.required, urlValidator]))
    });

  }

  submitText() 
  {
    let text = this.myForm["value"].inputText;
    let url = this.myForm["value"].url;

    if(this.myForm.valid)
    {
      this.getRandomText(url).subscribe((data) => this.getRandomTextWordCount(data));

      let response = this.counterService.countWords(text);
      this.wordsQuantity = response.wordsQuantity;
    }
  }

  getRandomText(url) 
  {
    return this.http.get(url);
  }

  getRandomTextWordCount(data) 
  {
    const {'text_out': randomText} = data;
    const randomTextResult = this.counterService.countWords(randomText);

    this.textOutQuantity = randomTextResult.wordsQuantity;
    this.textOut = randomTextResult.text;
  }
}

let urlValidator = (control: AbstractControl) => 
{
  if (!control.value.startsWith('http') || !control.value.includes('.me')) 
  {
    return { validUrl: true };
  }

  return null;
};

