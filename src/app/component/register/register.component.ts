import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { showAlert } from '../../Store/Common/App.action';
import { Users } from '../../Store/Model/User.model';
import { beginRegister } from '../../Store/User/User.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private _fb: FormBuilder, private _store: Store) {}

  registerForm: FormGroup = this._fb.group({
    username: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(3)])
    ),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    phone: new FormControl('', Validators.required),
    gender: new FormControl('male'),
  });

  onFormSubmit() {
    if (this.registerForm.valid) {
      if(this.registerForm.value.password === this.registerForm.value.confirmPassword) {
        const _userObj: Users = {
          username: this.registerForm.value.username,
          password: this.registerForm.value.password,
          name: this.registerForm.value.name,
          email: this.registerForm.value.email,
          phone: this.registerForm.value.phone,
          gender: this.registerForm.value.gender,
          role: 'user',
          status: true
        }
        this._store.dispatch(beginRegister({userData: _userObj}))
      }
      else {
        this._store.dispatch(showAlert({message: "Passwords Mismatch", resultType: "fail"}))
      }
    }
  }
}
