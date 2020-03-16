import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"]
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  forgotForm: FormGroup;
  ngOnInit() {
    this.forgotForm = this.fb.group({
      email: ["", Validators.compose([Validators.required, Validators.email])]
    });
  }
  getNewPassword() {
    const email = this.forgotForm.value["email"];
  }
}
