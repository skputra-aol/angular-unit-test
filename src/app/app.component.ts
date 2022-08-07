import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from './services/post.service';
import { MatchUrl } from './helpers/must-match.validator';
import { Words, DataDescription } from './model/words';
import { environment } from './../environments/environment';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
  regForm!: FormGroup;
  submitted: boolean = false;
  flagBodyText: any = "" ;
  flagWebsite: any = null;

  url: string = environment.apiURL;
  datas: any=[];

  constructor(
    private formBuilder: FormBuilder,
    public service: PostService
  ) {
  }

  ngOnInit() {
    this.regForm = this.formBuilder.group(
      {
        type: ['website', [Validators.required]],
        bodyText: ['', [Validators.required, Validators.minLength(6)]],
        website: [this.url+'1',[Validators.required]]
      },
      {
        validator: MatchUrl('website', this.url, 'type'),
      }
    );
    
  }

  get f() {
    return this.regForm.controls;
  }

  id = () => new Date().getSeconds()+1;
  
  disableType()
  {
    if(this.f['type'].value=="website")
    {
      this.flagBodyText="";
      this.flagWebsite= null;
      this.f['bodyText'].setErrors(null);
    }
    else
    {
      this.flagBodyText=null;
      this.flagWebsite= "";
      this.f['website'].setErrors(null);
    }
  }
  
  onSubmit()
  {
    this.submitted = true;

    if (this.regForm.invalid) {
      return;
    }
    
    if(this.f['type'].value=="website")
    this.datas= this.service.getDataWords(this.f['website'].value);
    else
    this.service.listWords=this.service.countWords(this.f['bodyText'].value.toLowerCase());
  
  }
  
  onReset() {
    window.location.reload();
  }
  
  onDefaultUrl() {
    this.submitted = false;
    this.f['website'].setValue(this.url+this.id());
  }
}
