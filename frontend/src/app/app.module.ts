import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

//Rutas
import { routing, appRoutingProviders } from './app.routing';

//Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { CategoriasListComponent } from './components/categorias-list.component';
import { ErrorComponent } from './components/error.component';
import { ProductosListComponent } from './components/productos-list.component';
import { TreeViewComponent } from './components/tree-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoriasListComponent,
    ErrorComponent,
    ProductosListComponent,
    TreeViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
