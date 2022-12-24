import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// Angular Fire
import { Auth, signInWithPopup, getAuth, updateProfile, onAuthStateChanged } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, GoogleAuthProvider } from '@firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private afAuth: Auth,
    private router: Router,
    private http: HttpClient
  ) { }

  // HTTP API
  private apiUrl = "http://localhost/api/user/";
  private httpOption = {
    // HTTPヘッダとは、Webコンテンツの伝送に用いられるHTTPで、メッセージの前半にある制御情報を記した領域のこと。 WebサーバやWebブラウザが相手方に伝えたい情報を格納する部分で、利用者の目には直接触れない。
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // JavaScript FileAPI
  private reader =  new FileReader();
  private file: any;
  public photoSrc: string | null = '';

  // Firebase Storage
  private storage = getStorage();
  private metadata = {
    contentType: 'image/jpeg'
  };
  private storageRef: any;

  // Firebase Auth
  private auth: any = getAuth();
  public currentUser: {
    displayName: string | null,
    photoURL: string | null,
    uid: string | null
  } = {
    displayName: '',
    photoURL: '',
    uid: ''
  };
  public isLogin: boolean | undefined;

  // Google プロバイダ オブジェクトのインスタンスを作成。
  private provider = new GoogleAuthProvider();

  // Cloud Firestore
  private db = getFirestore();
  public userInfo: {
    displayName: string,
    userText: string | undefined,
    twitterUrl: string | null | undefined,
    instagramUrl: string | null | undefined
  } = {
    displayName: "",
    userText: "",
    twitterUrl: "",
    instagramUrl: ""
  };


  // Functions
  createUserEmail(email: string, password: string): Promise<void> {
    return createUserWithEmailAndPassword(this.afAuth, email, password)
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

  previewUserPhoto(photo: any) {
    this.file = photo.target.files[0];
    this.reader.readAsDataURL(this.file);
    this.reader.onload = ((e: any) => {
      this.photoSrc = e.target['result'];
    });
  }

  registerUserInfo(value:{displayName: string}): void {
    onAuthStateChanged(this.auth, async (user) => {
      // ログイン状態であれば下記を実行する
      if(user) {
        console.log(user);
        this.currentUser.displayName = value.displayName;

        // 写真がある場合、AuthenticationとCloud FirestoreにphotoURLを保存
        if(this.file) {
          // 参照パスを設定
          this.storageRef = ref(this.storage, `userphoto/${this.file.name}`);
          await uploadBytes(this.storageRef, this.file, this.metadata)
            .then((_) => {
              console.log('Upload Blob File!');
              // file変数を初期化
              this.file = null;
              // Cloud StorageのURLを取得し、保存する
              getDownloadURL(this.storageRef)
                .then((downloadURL) => {
                  console.log('Get DownloadURL!');
                  this.currentUser.photoURL = downloadURL;
                  // Authenticationのuserをアップデート←下の非同期処理が先に走ってくれれば不要。
                  const value = this.currentUser;
                  updateProfile(this.auth.currentUser, value)
                    .then((_) => console.log('updateProfile (if File)!'));
                })
            })
        }

        // await同士は同期処理になるものの、uploadBytesのthenの終了前に↓が走り始めてしまう。
        await updateProfile(this.auth.currentUser, this.currentUser)
          .then((_) => console.log('updateProfile!'));
        await setDoc(doc(this.db, "users", user.uid) ,{
          displayName: this.currentUser.displayName,
          photoURL: this.currentUser.photoURL,
          // ↓先に空の状態でドキュメントフィールドを作成しておく
          userText: "",
          twitterUrl: "",
          instagramUrl: ""
        },{merge: true})
          .then(() => {
            console.log('addDoc complete!');
            this.router.navigateByUrl('/');
          });
      } else {
        console.log('ログインしていません');
        this.router.navigateByUrl('/signup');
      }
    });
  }

  async getCurrentUser(): Promise<any> {
    return onAuthStateChanged(this.auth, (user): void => {
      this.isLogin = !!user;
      if(user) {
        return this.setCurrentUser(user);
      }
    })
  }

  setCurrentUser(user: any): void {
    this.currentUser.displayName = user.displayName;
    this.currentUser.photoURL = user.photoURL;
    this.currentUser.uid = user.uid;
    this.photoSrc = user.photoURL;
    console.log('Get currentuser!');
  }

  async getUserInfo(): Promise<void> {
    if(this.currentUser.uid) {
      const docRef = doc(this.db, "users", this.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if(docSnap.exists()) {
        const userInfo = docSnap.data();
        this.userInfo.displayName = userInfo['displayName'];
        this.userInfo.userText = userInfo['userText'];
        this.userInfo.twitterUrl = userInfo['twitterUrl'];
        this.userInfo.instagramUrl = userInfo['instagramUrl'];
        console.log('Get userinfo!');
        } else {
          console.log("No document for currentuser");
        }
      } else {
        console.log('Not found currentUser uid');
      }
    }


  // registerUserInfoとほぼ同じだから一緒にしてしまおう
  updateUserInfo(value: {
    displayName: string | null,
    userText: string | null | undefined,
    twitterUrl: string | null | undefined,
    instagramUrl: string | null | undefined
  }): void {
    onAuthStateChanged(this.auth, async (user) => {
      // ログイン状態であれば下記を実行する
      if(user) {
        console.log(user);
        this.currentUser.displayName = value.displayName;

        // 写真がある場合、AuthenticationとCloud FirestoreにphotoURLを保存
        if(this.file) {
          // 参照パスを設定
          this.storageRef = ref(this.storage, `userphoto/${this.file.name}`);

          await uploadBytes(this.storageRef, this.file, this.metadata)
            .then((_) => {
              console.log('Upload Blob File!');
              // file変数を初期化
              this.file = null;
              // Cloud StorageのURLを取得し、保存する
              getDownloadURL(this.storageRef)
                .then((downloadURL) => {
                  console.log('Get DownloadURL!');
                  this.currentUser.photoURL = downloadURL;
                  // Authenticationのuserをアップデート←下の非同期処理が先に走ってくれれば不要。
                  const value = this.currentUser;
                  updateProfile(this.auth.currentUser, value)
                    .then((_) => console.log('updateProfile (if File)!'));
                })
            })
        }

        // await同士は同期処理になるものの、uploadBytesのthenの終了前に↓が走り始めてしまう。
        await updateProfile(this.auth.currentUser, this.currentUser)
          .then((_) => console.log('updateProfile!'));
        // ↓初期設定時に空だとエラーになってまう
        await setDoc(doc(this.db, "users", user.uid) ,{
          displayName: this.currentUser.displayName,
          photoURL: this.currentUser.photoURL,
          userText: value.userText,
          twitterUrl: value.twitterUrl,
          instagramUrl: value.instagramUrl
        },{merge: true})
          .then(() => {
            console.log('addDoc complete!');
          });
        await this.router.navigateByUrl('/mypage')
          .then(() => console.log('userupdate all complete!'));

      } else {
        console.log('ログインしていません');
        this.router.navigateByUrl('/');
      }

    });
  }

}
