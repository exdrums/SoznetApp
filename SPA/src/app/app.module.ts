import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { NgxGalleryModule } from 'ngx-gallery';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from '../../node_modules/ng2-file-upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMaterialModule } from './mymaterial.module';

import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { UserService } from './_services/user.service';

import { ErrorInterceptorProvider } from './_services/error.interceptor';

import { ListsResolver } from './_resolves/lists.resolver';
import { MessagesResolver } from './_resolves/message.resolver';
import { MemberEditResolver } from './_resolves/member-edit.resolver';
import { MemberDetailResolver } from './_resolves/member-detail.resolver';
import { MemberListResolver } from './_resolves/member-list.resolver';

import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

import { TimeAgoPipe } from 'time-ago-pipe';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';

import { appRoutes } from './routes';

export function getAccessToken(): string {
  return localStorage.getItem('token');
}

export const jwtConfig = {
  tokenGetter: getAccessToken,
  whitelistedDomains: ['localhost:5000']
};

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    MemberMessagesComponent,
    PhotoEditorComponent,
    TimeAgoPipe
],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    TabsModule.forRoot(),
    NgxGalleryModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    JwtModule.forRoot({
      config: jwtConfig
    }),
    FileUploadModule,
    BrowserAnimationsModule,
    MyMaterialModule
  ],
  providers: [
    AuthService,
    AlertifyService,
    UserService,
    AuthGuard,
    PreventUnsavedChanges,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    ListsResolver,
    MessagesResolver,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
