import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeadComponent } from './shared/components/head/head.component';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./module/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'inicio',
        component: HeadComponent,
        loadChildren: () => import('./module/inicio/inicio.module').then(m => m.InicioModule)
    },
    {
        path: 'paciente',
        component: HeadComponent,
        loadChildren: () => import('./module/paciente/paciente.module').then(m => m.PacienteModule)
    },
    {
        path: 'enfermedad',
        component: HeadComponent,
        loadChildren: () => import('./module/enfermedad/enfermedad.module').then(m => m.EnfermedadModule)
    },
    {
        path: 'doctor',
        component: HeadComponent,
        loadChildren: () => import('./module/doctor/doctor.module').then(m => m.DoctorModule)
    },
    {
        path: 'cama',
        component: HeadComponent,
        loadChildren: () => import('./module/cama/cama.module').then(m => m.CamaModule)
    },
    {
        path: 'internar',
        component: HeadComponent,
        loadChildren: () => import('./module/internar/internar.module').then(m => m.InternarModule)
    },
    {
        path: 'visita',
        component: HeadComponent,
        loadChildren: () => import('./module/visita/visita.module').then(m => m.VisitaModule)
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }