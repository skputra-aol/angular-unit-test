import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Words, DataDescription} from '../model/words';
import { Observable} from 'rxjs';

  
@Injectable({
  providedIn: 'root'
})
export class PostService {
  wordsData: string = '';
  listWords: Array<Words>=[]; 

  constructor(
    private httpClient: HttpClient,
  ) {}

  
  getDataWords(url: string): any {
    return this.httpClient.get<any>(url).subscribe(dt=>{
           this.wordsData=(<DataDescription>dt).description.toLowerCase();
this.listWords = this.countWords(this.wordsData);

    });
  }
  
  countWords(text: string): Array<Words> {
    var wordCounts: any = {};
    var words = text.split(/\b/);

    for (var i = 0; i < words.length; i++) {
      if (words[i].trim() != '')
        wordCounts[words[i]] = (wordCounts[words[i]] || 0) + 1;
    }

    var arrWords = Object.entries(wordCounts).sort(function (a: any, b: any) {
      return b[1] - a[1];
    });
    var arrTop = arrWords.slice(0, 10);

    var dt: any = [];
    arrTop.forEach((obj, i) => {
      dt.push({ word: obj[0], occurences: obj[1] });
    });
    this.listWords = dt;

    return dt;
  }

  getPost(url: string): Observable<any> {
    return this.httpClient.get<any>(url);
  }
}