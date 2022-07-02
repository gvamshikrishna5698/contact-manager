import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { ListContactComponent } from './list-contact/llist-contact.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { RouteGaurdService } from './service/http/route-gaurd.service';
import { AuthGuard } from './service/http/auth.guard';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [RouteGaurdService],
  },
  {
    path: 'error',
    component: ErrorComponent,
    canActivate: [RouteGaurdService],
  },
  {
    path: 'contacts',
    component: ListContactComponent,
    canActivate: [RouteGaurdService],
  },
  {
    path: 'contact/:id',
    component: ContactComponent,
    canActivate: [RouteGaurdService],
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] },
  },
  { path: '', component: LoginComponent },
  { path: '**', component: ErrorComponent, canActivate: [RouteGaurdService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
