import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService} from '@angular/fire/analytics';
import {connectAuthEmulator, getAuth, provideAuth} from '@angular/fire/auth';
import {connectDatabaseEmulator, getDatabase, provideDatabase} from '@angular/fire/database';
import {connectFunctionsEmulator, getFunctions, provideFunctions} from '@angular/fire/functions';
import {getMessaging, provideMessaging} from '@angular/fire/messaging';
import {connectStorageEmulator, getStorage, provideStorage} from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      const auth = getAuth();
      if (environment?.emulators) {
        connectAuthEmulator(auth, 'http://localhost:9099');
      }
      return auth;
    }),
    provideDatabase(() => {
      const data = getDatabase();
      if (environment.emulators) {
        connectDatabaseEmulator(data, '127.0.0.1', 9002);
      }
      return data
    }),
    provideStorage(() => {
      const storage = getStorage();
      if (environment.emulators) {
        connectStorageEmulator(storage, '127.0.0.1', 9199);
      }
      return storage
    }),
    provideFunctions(() => {
      const func = getFunctions();
      if (environment.emulators) {
        connectFunctionsEmulator(func, '127.0.0.1', 5001);
      }
      return func;
    }),

    provideAnalytics(() => getAnalytics()),
    provideMessaging(() => getMessaging()),
  ],
  providers: [
    ScreenTrackingService, UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
