import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserCredentials } from '../../Store/Model/User.model';
import { Store } from '@ngrx/store';
import { beginLogin } from '../../Store/User/User.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    localStorage.clear();
  }

  loginForm = this.formBuilder.group({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  })

  onFormSubmit() {
    if(this.loginForm.valid){
      const _userObj: UserCredentials = {
        username: this.loginForm.value.username as string,
        password: this.loginForm.value.password as string
      }
      this.store.dispatch(beginLogin({userCredentials: _userObj}))
    }
  }

  resetLoginForm() {
    this.loginForm.reset()
  }
}
