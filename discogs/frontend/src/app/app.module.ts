import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/list-product/list-product.component';
import { HomeComponent } from './components/home/home.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SublevelMenuComponent } from './components/sidenav/sublevel-menu.component';
import { BodyComponent } from './body/body.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ArtistsComponent } from './components/artists/artists.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';

import { NgxPaginationModule} from 'ngx-pagination';
import { MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    // SettingsComponent,
    // SearchbarComponent,
    ProductListComponent,
    // SuperchollosComponent,
    // CategoriesComponent,
    ProductComponent,
    // ProfileComponent,
    BodyComponent,
    HomeComponent,
    SublevelMenuComponent,
    BodyComponent,
    ArtistsComponent,
    SearchbarComponent,
    ProductDetailComponent,

    // CategoryMainComponent,


  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    //BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    //FontAwesomeModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
