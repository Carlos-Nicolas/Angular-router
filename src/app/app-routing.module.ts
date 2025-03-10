import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminGuard} from './guards/admin.guard'

import {NotFoundComponent} from './not-found/not-found.component'
//import {QuicklinkStrategy} from 'ngx-quicklink';



const routes: Routes = [

  {
    path:'',
    loadChildren: ()=> import('./website/website.module').then(m => m.WebsiteModule)
  },

  {
    path:'cms',
    canActivate:[AdminGuard],
    loadChildren: ()=> import('./cms/cms.module').then(m => m.CmsModule)
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
