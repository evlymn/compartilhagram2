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
  signOut,
  updateProfile,
  user,
  User,
  UserCredential,
} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {onIdTokenChanged} from '@firebase/auth';
import {RealtimeService} from "../database/realtime.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _route = '';
  user!: User | null;
  userCredentials!: UserCredential;
  public logoutMessage = new BehaviorSubject<{ from: string }>({from: ''});

  constructor(private auth: Auth, private router: Router,
              private ngZone: NgZone, private _realtime: RealtimeService) {
    this.onAuthStateChanged();
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

  public get userAsync() {
    return user(this.auth);
  }


  onIdTokenChanged() {
    onIdTokenChanged(this.auth, async usr => {
      if (usr) {
        const tokenResult = await usr?.getIdTokenResult();
        //  console.log('IdToken', tokenResult?.authTime);
      } else {
        //  console.log('else')
        //this.signOut();
      }

    })
  }

  private onAuthStateChanged() {
    onAuthStateChanged(this.auth, usr => {
      this.user = usr;
      if (usr) {
        this.onDeleteLogout(usr?.uid!);
        this.ngZone.run(() => {
           this.router.navigate(['home']).catch(reason => console.log(reason));
        });
      } else {
        // this.ngZone.run(() => {
        this.router.navigateByUrl('/').catch(reason => console.log(reason));
        // });
      }
    });
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

  updateProfile(data: any) {
    return updateProfile(this.auth.currentUser as User, data)
  }

  sendEmailVerification(actionCodeSettings?: ActionCodeSettings) {
    return sendEmailVerification(this.auth.currentUser as User, actionCodeSettings);
  }

  sendPasswordResetEmail(email: string, actionCodeSettings?: ActionCodeSettings) {
    return sendPasswordResetEmail(this.auth, email, actionCodeSettings);
  }

  signOut() {
    signOut(this.auth);
  }
}
