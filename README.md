# **Creando rutas**

Todas las aplicaciones front-end van a necesitar de **múltiples páginas**, las cuales **serán identificadas por una ruta**. Veamos cómo puedes relacionar rutas y componentes en Angular.

# Rutas y Componentes

Puedes enlazar componentes a las rutas para cuando ingreses a X ruta, se muestre Y componente.

1. **Creando componentes**
Comienza creando un par de componentes de prueba. Apóyate del CLI de Angular de la siguiente manera:

- `ng g c components/about`
- `ng g c components/catalogo`

### 2. **Creando el routing**
Al utilizar el comando `ng new <project-name>` Angular nos pregunta lo siguiente:

```sh
Would you like to add Angular routing? (y/N)
```

Si contestamos que sí, creará el siguiente archivo junto con el módulo principal de tu app.

```js
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

Si contestaste que no, no te preocupes. Puedes crearlo manualmente e importarlo en el archivo `app.module.ts`

```js
// app.module.ts
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  // ..
  imports: [
    AppRoutingModule
  ],
})
export class AppModule { }
```
3. **Imports de componentes en el routing**
A continuación, importa en este nuevo archivo los componentes, y crea una regla para crear una ruta para cada uno de ellos de la siguiente manera:

```js
// app-routing.module.ts
import { AboutComponent } from './components/about/about.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'catalogo',
    component: CatalogoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

4. **Directiva para el renderizado de páginas**
Finalmente, tienes que importar la directiva `<router-outlet>` en el componente raíz de tu aplicación.


```html
<!-- app.component.html -->
<router-outlet></router-outlet>
```

Angular utiliza esta directiva para renderizar el componente de la ruta actual donde el usuario se encuentre.

Ingresa a `localhost:4200/catalogo` o `localhost:4200/about`, para observar cada componente.
