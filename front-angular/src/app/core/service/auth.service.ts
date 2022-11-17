import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// Angular Fire
import { getAuth, signOut, signInWithEmailAndPassword } from '@angular/fire/auth';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  // Firebase Auth
  private auth: any = getAuth();

  // Functions
  logout(): void {
    signOut(this.auth)
      .then(() => {
        this.userService.currentUser = {displayName: null, photoURL: null};
        this.router.navigateByUrl('/login');
      }).catch(() => {
        console.log('missed logout')
      });
  }

  login(email: string, password: string): Promise<boolean | void> {
    // catchメソッドが使用された場合返り値がないため voidも指定
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        console.log('success login!');
        this.router.navigateByUrl('/');
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        alert('メールアドレスとパスワードが正しくありません。');
      });
  }

}
