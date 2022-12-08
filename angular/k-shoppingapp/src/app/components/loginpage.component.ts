import {Component,OnInit} from '@angular/core';
import {LoginService} from '../services/login.service';
import {User} from '../models/user.model';
import {Router} from '@angular/router';

@Component({
	selector:"loginpage",
	templateUrl:"./loginpage.component.html",
	styleUrls:['./loginpage.component.css']
})
export class LoginPage implements OnInit {

	user:User = new User("","");
	message:string = "";
	
	constructor(private loginService:LoginService,private router:Router){}
	
	ngOnInit() {
		if(this.loginService.isUserLogged()) {
			this.router.navigate(["/list"]);
		}
	}
	
	register() {
		this.loginService.register(this.user).subscribe(
			(data) => this.message = data.message,
			(error) => this.message = error.message,
			() => this.message = "Register success"
		)
	}
	
	login() {
		this.loginService.login(this.user).subscribe(
			(data) => {
				this.message = "Login success"
				this.loginService.setLoginState(true,data.token);
				this.router.navigate(["/list"])
			},
			(error) => this.message = error.message,
			() => console.log("Login complete")
		)
	}
}