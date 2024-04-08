import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { EntryComponent } from './entry/entry.component';
import { GeneratePasswordComponent } from './generate-password/generate-password.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create-password', component: CreatePasswordComponent },
  { path: 'onboarding', component: OnboardingComponent },
  { path: 'entry/:id', component: EntryComponent },
  { path: 'generate-password', component: GeneratePasswordComponent },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
