import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component'
import { ProductService } from './services/product.service';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'artists/:artist', component: ArtistsComponent},
  {path: 'product-detail/:title/:artist', component: ProductDetailComponent},
  {path: 'products', component: ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
