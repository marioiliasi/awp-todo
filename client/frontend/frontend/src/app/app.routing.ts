import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_helpers';
import {ClosedComponent} from "@/closedTasks";
import {OpenComponent} from "@/openTasks";

const routes: Routes = [
    { path: '', component: OpenComponent, canActivate: [AuthGuard] },
    { path: 'closed', component: ClosedComponent, canActivate: [AuthGuard] },
    { path: 'open', component: OpenComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
