import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DelegatComponent } from './delegat/delegat.component';
import { HomeComponent } from './home/home.component';
import { OrganizatorComponent } from './organizator/organizator.component';
import { RegistrationComponent } from './registration/registration.component';
import { VodjaComponent } from './vodja/vodja.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'organizator', component: OrganizatorComponent},
  {path: 'vodja', component: VodjaComponent},
  {path : 'delegat', component: DelegatComponent},
  {path : 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
