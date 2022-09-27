# **Creando rutas**

Todas las aplicaciones front-end van a necesitar de **múltiples páginas**, las cuales **serán identificadas por una ruta**. Veamos cómo puedes relacionar rutas y componentes en Angular.

# Rutas y Componentes

Puedes enlazar componentes a las rutas para cuando ingreses a X ruta, se muestre Y componente.

#### 1. **Creando componentes**
Comienza creando un par de componentes de prueba. Apóyate del CLI de Angular de la siguiente manera:

- `ng g c components/about`
- `ng g c components/catalogo`

#### 2. **Creando el routing**
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
#### 3. **Imports de componentes en el routing**
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

#### 4. **Directiva para el renderizado de páginas**
Finalmente, tienes que importar la directiva `<router-outlet>` en el componente raíz de tu aplicación.


```html
<!-- app.component.html -->
<router-outlet></router-outlet>
```

Angular utiliza esta directiva para renderizar el componente de la ruta actual donde el usuario se encuentre.

Ingresa a `localhost:4200/catalogo` o `localhost:4200/about`, para observar cada componente.


# **Creando el Home**

Crear rutas y relacionarlas con componentes en Angular es una tarea trivial. Anímate a construir tu primera aplicación con rutas, crea una página de inicio y otra página para listar productos o hablar de ti.

## **Cómo optimizar rutas en Angular**

Veamos algunos consejos para optimizar tus rutas.
Ocurrirá en tu aplicación que el usuario no ingrese ninguna ruta. Siempre es buena práctica tener otra por defecto y puedes realizarlo de la siguiente manera:

```js
// app-routing.module.ts
const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'catalogo',
    component: CatalogoComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

Observa la primera regla que tiene el `path` vacío y un `redirectTo` para redireccionar al componente “home” cuando no se ingresa ninguna ruta. Utiliza también la opción `pathMatch` para asegurar que la ruta sea exacta.

# **Página de categorías**

Cuando construyes URLs en tu aplicación, éstas **pueden poseer parámetros dinámicos**, por lo general, IDs para identificar registros, para capturarlos y manipularlos posteriormente.


## **Capturando parámetros de URL**
Veamos a continuación dos maneras de capturar estos parámetros, una síncrona y otra asíncrona.

## **Captura de parámetros síncronos**

El mejor lugar para capturar parámetros de URL, sean síncronos o no, es utilizando los hooks de ciclo de vida de Angular, más concretamente `ngOnInit()`.

#### 1. **Creando rutas**
Comienza creando tus rutas que permitan ingresar parámetros dinámicos de la siguiente manera:

```js
// app-routing.module.ts
const routes: Routes = [
  {
    path: 'catalogo',
    component: CatalogoComponent
  },
  {
    path: 'catalogo/:categoryId',
    component: CatalogoComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

Observa que ambas rutas apuntan al mismo componente, eso está bien. La diferencia estará en que la segunda ruta posee `:categoryId` y podrás capturar el parámetro utilizando ese mismo nombre.


#### 2. **Inyección de servicios necesarios**
En el componente correspondiente, inyecta el servicio **ActivatedRoute** y también importa **Params** para tipar tus datos y manipularlos más fácilmente. Ambos imports provenientes de `@angular/router`.

```js
// modules/website/components/catalogo/catalogo.components.ts
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent {
  constructor(private route: ActivatedRoute) { }
}
```

#### 3. **Capturando parámetros**
Es momento de capturar los parámetros en el `ngOnInit()`. Para esto, basta con una línea de código como la siguiente:

```js
// modules/website/components/catalogo/catalogo.components.ts
ngOnInit(): void {
  const categoryId = this.route.snapshot.paramMap.get('categoryId');
  console.log(categoryId);
}
```
Guardarás en la constante `categoryId` el valor del parámetro que lleva el mismo nombre que definiste en el archivo `app-routing.module.ts`. Luego podrás utilizarlos para realizar peticiones a un servidor o para lo que necesites.

### **Captura de parámetros asíncronos**

Una URL puede cambiar y a veces es conveniente estar escuchando de forma activa los cambios en la misma.
Para que los Observables nos ayuden a estar atentos a estos cambios, Angular también nos permite suscribirnos a los cambios en los parámetros de URL de la siguiente manera.

```js
// modules/website/components/catalogo/catalogo.components.ts
ngOnInit(): void {
  this.route.paramMap
    .subscribe((params: Params) => {
      const categoryId = params.get('categoryId');
      console.log(categoryId);
    });
}
```

A través del nombre del parámetro definido en el archivo `app-routing.module.ts`, capturas los datos para manipularlos posteriormente.

De esta manera, puedes pasar parámetros dinámicamente, de forma síncrona o asíncrona, dependiendo tu necesidad y construir tu aplicación.


# **Evitando doble subscribe**

Uno de los principales problemas de los observables es el Callback Hell. La anidación de N cantidad de suscripciones, una dentro de la otra, vuelve tu código muy difícil de mantener y de leer.

## Solucionando problemas de Callbacks

Utilizando promesas, puedes resolver esto fácilmente con `async/await`. Pero si hablamos de observables, nuestra mejor amiga, la librería RxJS, llega para aportar su solución.

Un ejemplo común de esta problemática en Angular es como la siguiente:

```js
readAndUpdate(): void {
  // Ejemplo de callback hell
  this.apiService.getProduct(1)
    .subscribe(res => {
      this.apiService.updateProduct(1, { name: 'Nuevo nombre del producto' })
        .subscribe(res2 => {
          // ...
        });
    });
}
```
Donde se está realizando una petición para la lectura de un producto e inmediatamente se está actualizando el mismo. Generando un `subscribe` dentro de otro.

Tal vez, hasta dos `subscribe` es aceptable, pero no se recomienda continuar con esa estructura de código y es posible resolverlo de la siguiente manera.

```js
import { switchMap } from 'rxjs/operators';

readAndUpdate(): void {
  // Solución callback hell
  this.apiService.getProduct(1)
    .pipe(
      switchMap(products => this.apiService.updateProduct(1, { name: 'Nuevo nombre' }) )
    )
    .subscribe(res => {
      // Producto actualizado
    });
}
```

Importando `switchMap` desde `rxjs/operators`, lo que hace esta función es recibir el dato que emite un observable, y utilizarlo inmediatamente como input para el segundo. De esta manera, el código queda más limpio y profesional.

