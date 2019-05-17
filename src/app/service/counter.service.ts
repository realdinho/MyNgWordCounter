import { Injectable } from '@angular/core';

import { Response } from '../model/response';

@Injectable({
  providedIn: 'root'
})
export class CounterService 
{
  responses: Array<Response>;

  constructor() 
  { 
    this.responses = new Array();
  }

  countWords(text): Response 
  {    
    text = text.replace(/<(.|\n)*?>/g, ''); // remove html tags    
    text = text.replace(/(^\s*)|(\s*$)/gi, ''); // exclude  start and end white-space    
    text = text.replace(/[ ]{2,}/gi, ' '); // convert 2 or more spaces to 1
    text = text.replace(/\r /, '');
    
    // check if the text was already inserted
    let query = this.responses.find(res => res.text === text);
    
    if(!query) // if text does not exist
    {
      // create response object
      let newResponse = new Response();
      newResponse.text = text;
      newResponse.wordsQuantity = text.split(' ').length;

      this.responses.push(newResponse); // save response object

      return newResponse; // return saved response
    }
   
    return query; // return saved text if it had already been saved 
  }
}
