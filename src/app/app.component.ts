import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from './services/post.service';
import { Observable, of, throwError } from 'rxjs';
import { MatchUrl } from './helpers/must-match.validator';

import { HttpClient } from '@angular/common/http';
import { Words, DataDescription } from './model/words';
import { STRING_TYPE } from '@angular/compiler';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
  registerForm!: FormGroup;
  submitted: boolean = false;

  urlOther: string = 'http://jsonplaceholder.typicode.com/posts/';
  url: string = 'http://jsonplaceholder.typicode.com/posts/';
  words: string = '';
  listWords: any = [];
  runWords!: Observable<any>;

  datas: any=[];

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private service: PostService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        bodyText: ['', [Validators.required, Validators.minLength(6)]],
        website: ['', Validators.required],
      },
      {
        validator: MatchUrl('website', this.url),
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit2() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.onSubmit();

  }

  onSubmit(){

    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    
    this.datas= this.service.getPostWords(this.f['website'].value).subscribe(dt=>{
      
      this.words=(<DataDescription>dt).body;
      this.service.countWords(this.words);
      this.registerForm.controls['bodyText'].setValue(this.words);
      this.listWords = this.service.getWordsCount();

    });

  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
    this.words = '';
    this.listWords = [];
  }
  onDefaultUrl() {
    this.submitted = false;
    this.registerForm.controls['website'].setValue(this.url+ new Date().getSeconds());
  }
}