import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyTestComponent } from './myTest/myTest/myTest.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HeaderComponent } from './header/header.component';
import { AuthModule } from './auth/auth.module';
import { ShowsGameHighlowComponent } from './shows-game/shows-game-highlow/shows-game-highlow.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from "./error/error.component";
import { ClipCardComponent } from './all-shows/clip-card/clip-card.component';
import { ClipCreateComponent } from './all-shows/clip-create/clip-create.component';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';


import { MatDialogModule } from '@angular/material/dialog';

import { ReactiveFormsModule } from '@angular/forms';
import { ShowsListComponent } from './all-shows/shows-list/shows-list.component';
import { SingleShowViewComponent } from './all-shows/single-show-view/single-show-view.component';
import { FriendsSearchComponent } from './friends/friends-search/friends-search.component';
import { FriendCardComponent } from './friends/friend-card/friend-card.component';
import { FriendsListComponent } from './friends/friends-list/friends-list.component';
import { FriendsShowsListComponent } from './friends/friends-shows-list/friends-shows-list.component';
import { ShowListOnlyComponent } from './all-shows/show-list-only/show-list-only.component';
import { SingleShowViewUserComponent } from './all-shows/single-show-view-user/single-show-view-user.component';
import { SingleShowViewFriendComponent } from './all-shows/single-show-view-friend/single-show-view-friend.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { SettingsComponent } from './settings/settings.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';


@NgModule({
  declarations: [
    AppComponent,
    MyTestComponent,
    HeaderComponent,
    ShowsGameHighlowComponent,
    ErrorComponent,
    ClipCardComponent,
    ClipCreateComponent,
    ShowsListComponent,
    SingleShowViewComponent,
    FriendsSearchComponent,
    FriendCardComponent,
    FriendsListComponent,
    FriendsShowsListComponent,
    ShowListOnlyComponent,
    SingleShowViewUserComponent,
    SingleShowViewFriendComponent,
    InfoPageComponent,
    ChangePasswordComponent,
    SettingsComponent,
    ForgetPasswordComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    AuthModule,
    FormsModule,
    MatOptionModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  // entryComponents: [ErrorComponent]
})
export class AppModule { }
