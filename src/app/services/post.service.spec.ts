import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import { Words } from '../model/words';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('countWords testing ..', () => {
  let service: PostService;
  let serviceWordsInput: string;
  let serviceWordsResult: Array<Words>; 
  let expectedWords: Array<Words>; 
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule 
      ],
    }).compileComponents();

    service = TestBed.inject(PostService);


    serviceWordsInput=`
    top_10 top_10 top_10 top_10 top_10 top_10 top_10 top_10 top_10 top_10
    top_9 top_9 top_9 top_9 top_9 top_9 top_9 top_9 top_9
    top_8 top_8 top_8 top_8 top_8 top_8 top_8 top_8
    top_7 top_7 top_7 top_7 top_7 top_7 top_7 
    top_6 top_6 top_6 top_6 top_6 top_6 
    top_5 top_5 top_5 top_5 top_5 
    top_4 top_4 top_4 top_4 
    top_3 top_3 top_3 
    top_2 top_2 
    top_1 
    top_x_a
    top_x_b
    top_x_c
    top_x_d
    `;

    expectedWords=([
      {word: "top_10", occurences: 10 },
      {word: "top_9", occurences: 9 },
      {word: "top_8", occurences: 8 },
      {word: "top_7", occurences: 7 },
      {word: "top_6", occurences: 6 },
      {word: "top_5", occurences: 5 },
      {word: "top_4", occurences: 4 },
      {word: "top_3", occurences: 3 },
      {word: "top_2", occurences: 2 },
      {word: "top_1", occurences: 1 }
    ]);

    serviceWordsResult= service.countWords(serviceWordsInput);
  });

  it('should be 10 row result', () => {
    expect(expectedWords.length).toEqual(10);
  });

  it('should be match items results', () => {
    expect(expectedWords).toEqual(serviceWordsResult);
  });
});


