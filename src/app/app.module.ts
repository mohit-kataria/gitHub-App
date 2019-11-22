import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GitService } from './git.service';
import { UserComponent } from './user/user.component';
import { ErrorComponent } from './error/error.component';
import { SearchComponent } from './search/search.component';
import { CookieService } from 'ngx-cookie-service'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    ErrorComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path:'login', component:LoginComponent},
      {path:'',redirectTo:'login',pathMatch:'full'},
      {path:'*',component:LoginComponent},
      {path:'user/:username', component:UserComponent},
      {path:'search/:name',component:SearchComponent},
      {path:'error/:code/:message',component:ErrorComponent}
    ])

  ],
  providers: [GitService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
