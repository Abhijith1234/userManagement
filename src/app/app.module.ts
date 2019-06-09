import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {ManageUserComponent} from './manage-user/manage-user.component';
import {UserTableComponent} from './user-table/user-table.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ManageUserComponent,
    UserTableComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forRoot([
      {
        path: 'allUser',
        component: UserTableComponent
      },
      {
        path: 'manageUser',
        component: ManageUserComponent
      },
      {
        path: '**',
        redirectTo: '/manageUser'
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule {
}
