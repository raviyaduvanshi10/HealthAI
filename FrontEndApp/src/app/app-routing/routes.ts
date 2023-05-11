import { Routes } from "@angular/router";
import { LoginComponent } from "../components/login/login.component";
import { DefaultComponent } from "../components/default/default.component";
import { HomeComponent } from "../components/home/home.component";
import { RegisterUserComponent } from "../components/register-user/register-user.component";
import { PredictionComponent } from "../components/prediction/prediction.component";



export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch:'full'},
    {path:'login', component:LoginComponent},
    {
        path: 'default', component: DefaultComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'prediction', component: PredictionComponent }
        ]
    },
    {path:'registeruser', component:RegisterUserComponent}
]