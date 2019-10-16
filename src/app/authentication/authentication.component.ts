import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  loginMode: boolean = true;
  authForm: FormGroup;
  loading=false;
  error:string;
  obsResp: any;
 

  constructor(private authenticationService: AuthenticationService,
    private router:Router) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.authForm = new FormGroup({
      "email": new FormControl('', [Validators.required, Validators.email]),
      "password": new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  switchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit() {
    this.loading=true;
    if (!this.authForm.valid) {
      return;
    }
    if (this.loginMode) {
      this.obsResp=this.authenticationService.login(this.authForm.value);
    } else {
      this.obsResp=this.authenticationService.signup(this.authForm.value);
    }
    this.obsResp.subscribe(
      data=>{
        this.router.navigate(['recipe']);
        this.loading=false;
      },errRes=>{
        this.error=errRes.error.error.message;
        this.loading=false;
      }
    )
    this.authForm.reset();
  }

}
