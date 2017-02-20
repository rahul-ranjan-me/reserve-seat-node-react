import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { Header } from './structure/header/app.header.component';
import { TopNav } from './structure/topNav/app.topNav.component';

import { ProfileComponent } from './profile/app.profile.component';
import { RegisterComponent } from './register/app.register.component';
import { BookedSeatsComponent } from './bookedSeats/app.bookedSeats.component';
import { LoginComponent } from './login/app.login.component';
import { ChooseSeatComponent } from './chooseSeat/app.chooseSeat.component';
import { SeatViewerComponent } from './seatViewer/app.seatViewer.component';
import { ListChosenSeatsComponent } from './listChosenSeats/app.listChosenSeats.component';
import { InventoryComponent } from './inventory/app.inventory.component';
import { PageNotFoundComponent } from './pageNotFound/app.pageNotFound.component';

import {RegisterService} from './register/app.register.service';
import {LoginService} from './login/app.login.service';
import {TopNavService} from './structure/topNav/app.topNav.service';
import {SeatViewerService} from './seatViewer/app.seatViewer.service';
import {ListChosenSeatsService} from './listChosenSeats/app.listChosenSeats.service';

const appRoutes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'bookedSeats', component: BookedSeatsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'chooseSeat', component: ChooseSeatComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'component', component: AppComponent },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    Header,
    TopNav,

    ProfileComponent,
    RegisterComponent,
    BookedSeatsComponent,
    LoginComponent,
    ChooseSeatComponent,
    SeatViewerComponent,
    ListChosenSeatsComponent,
    InventoryComponent,
    PageNotFoundComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    RegisterService,
    LoginService,
    TopNavService,
    SeatViewerService,
    ListChosenSeatsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
