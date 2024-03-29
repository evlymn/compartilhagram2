import {Injectable, NgZone} from '@angular/core';
import {
  ActionCodeSettings,
  Auth,
  authState,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  user,
  User,
  UserCredential,
} from '@angular/fire/auth';

import {Router} from '@angular/router';
import {GithubAuthProvider, GoogleAuthProvider, onIdTokenChanged} from '@firebase/auth';
import {RealtimeService} from "../database/realtime.service";
import {BehaviorSubject} from "rxjs";
// import {AppUpdateService} from "../../app/app-update.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _route = '/';
  private userCredentials!: UserCredential;
  public logoutMessage = new BehaviorSubject<{ from: string }>({from: ''});


  constructor(
    // private appUpdateService: AppUpdateService,
    private auth: Auth,
    private router: Router,
    private ngZone: NgZone,
    private _realtime: RealtimeService,
  ) {
    this.setActiveRoute(this.router.url);
    this.onAuthStateChanged();
    this.onIdTokenChanged();
  }

  getAdditionalUserInfo(userCredential: UserCredential) {
    return getAdditionalUserInfo(userCredential);
  }

  setActiveRoute(url: string) {
    this._route = url;
  }

  public get authState() {
    return authState(this.auth);
  }

  public getUser() {
    return user(this.auth);
  }


  set user(val: User | null) {
    localStorage.setItem('AOkPPWQ9Z2m2W94aRDNOw2', JSON.stringify(val));
  }

  get user(): User | null {
    if (localStorage.getItem('AOkPPWQ9Z2m2W94aRDNOw2')) {
      return JSON.parse(localStorage.getItem('AOkPPWQ9Z2m2W94aRDNOw2')!) as User;
    } else {
      return null;
    }
  }

  private onIdTokenChanged() {
    onIdTokenChanged(this.auth, async usr => {
      if (usr) {
        this.user = usr
      }
    })
  }

  private onAuthStateChanged() {
    onAuthStateChanged(this.auth, usr => {
      if (usr) {
        this.logUser(usr).catch();
        this.user = usr;
        this.onDeleteLogout(usr.uid!);
        const whichRoute = (this._route == '/' || this._route == '' || this._route == '/login');
        this._route = whichRoute ? '/home' : this._route;
        this.router.navigateByUrl(this._route).catch(reason => console.log(reason));
      } else {
        this.router.navigateByUrl('/login').catch(reason => console.log(reason));
      }
    });
  }

  async logUser(user: User) {
    const data = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
      dateTime: new Date().getTime(),
      provider: user.providerId,
      uid: user.uid,
      phoneNumber: user.phoneNumber,
      creationTime: user.metadata?.creationTime,
      lastSignInTime: user.metadata?.lastSignInTime
    }
    this._realtime.set('users/' + user.uid, data).catch();
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    this.userCredentials = await signInWithEmailAndPassword(this.auth, email, password);
    return this.userCredentials;
  }

  onDeleteLogout(uid: string) {
    this._realtime.onValueChanges('system/users/onDelete/').subscribe(sub => {
      if (sub.length > 0) {
        if (sub.some(s => s.id == uid)) {
          this.logoutMessage.next({from: 'delete'});
          this.signOut();
        }
      }
    })
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    this.userCredentials = await createUserWithEmailAndPassword(this.auth, email, password);
    return this.userCredentials;
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
  }

  async signInWithGithub() {
    const provider = new GithubAuthProvider();
    return signInWithPopup(this.auth, provider)
  }


  async updateProfile(data: { displayName?: string, photoURL?: string }) {
    await this._realtime.update('users/' + this.auth.currentUser?.uid, {
      displayName: data.displayName,
      photoURL: data.photoURL
    });
    return updateProfile(this.auth.currentUser as User, data);
  }

  sendEmailVerification(actionCodeSettings?: ActionCodeSettings) {
    return sendEmailVerification(this.auth.currentUser as User, actionCodeSettings);
  }

  sendPasswordResetEmail(email: string, actionCodeSettings?: ActionCodeSettings) {
    return sendPasswordResetEmail(this.auth, email, actionCodeSettings);
  }


  signOut() {
    signOut(this.auth).catch();
  }
}
