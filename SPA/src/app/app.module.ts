import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule, ModalModule } from 'ngx-bootstrap';
import { NgxGalleryModule } from 'ngx-gallery';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from '../../node_modules/ng2-file-upload';
import { RouterModule } from '@angular/router';

import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { AuthGuard } from './_guards/auth.guard';

import { MemberDetailResolver } from './_resolves/member-detail.resolver';
import { MemberListResolver } from './_resolves/member-list.resolver';
import { MemberEditResolver } from './_resolves/member-edit.resolver';
import { ListsResolver } from './_resolves/lists.resolver';
import { MessagesResolver } from './_resolves/message.resolver';

import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { UserService } from './_services/user.service';
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { AdminService } from './_services/admin.service';

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
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { HasRoleDirective } from './_directives/hasRole.directive';

import { appRoutes } from './routes';
import { RolesModalComponent } from './admin/roles-modal/roles-modal.component';




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
    AdminPanelComponent,
    HasRoleDirective,
    UserManagementComponent,
    PhotoManagementComponent,
    RolesModalComponent,
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
    ModalModule.forRoot()
  ],
  providers: [
    AuthService,
    AlertifyService,
    AuthGuard,
    PreventUnsavedChanges,
    UserService,
    AdminService,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    ListsResolver,
    MessagesResolver,
    ErrorInterceptorProvider
  ],
  entryComponents: [
    RolesModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
