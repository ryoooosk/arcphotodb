import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Angular Fire
import { getAuth, signOut, signInWithEmailAndPassword, Auth, signInWithPopup } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, GoogleAuthProvider } from '@firebase/auth';
// Service
import { UserService } from '../../shared/service/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private auth: Auth,
    private userService: UserService
  ) { }

  // Firebase Auth
  private fireAuth: any = getAuth();

  private apiUrl = "http://localhost/api/user/";
  private httpOption = {
    // HTTPヘッダとは、Webコンテンツの伝送に用いられるHTTPで、メッセージの前半にある制御情報を記した領域のこと。 WebサーバやWebブラウザが相手方に伝えたい情報を格納する部分で、利用者の目には直接触れない。
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Google プロバイダ オブジェクトのインスタンスを作成。
  private provider = new GoogleAuthProvider();

  // Functions
  createUserEmail(email: string, password: string): Promise<void> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      // ユーザ登録が成功すると自動的に作成したユーザーでログインされ、userCredential にユーザーオブジェクト入る。
      .then((userCredential) => {
        const { user } = userCredential;
        const createUser = { uid: user.uid, email: user.email };
        this.http.post(`${this.apiUrl}create`, createUser, this.httpOption)
          .subscribe(_ => console.log('usercreate success!'));
      });
  }

  createUserGoogle(): void {
    // getAuth()でAuthenticationを初期化。
    signInWithPopup(this.auth, this.provider)
      .then((result) => {
        const credential: any = GoogleAuthProvider.credentialFromResult(result);
        const token: any = credential.accessToken;
        const user = result.user;
        this.router.navigateByUrl('/newuser')
      });
  }

  logout(): void {
    signOut(this.auth)
      .then(() => {
        this.userService.currentUser = {displayName: null, photoURL: null, uid: null};
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
