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
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

Si contestaste que no, no te preocupes. Puedes crearlo manualmente e importarlo en el archivo `app.module.ts`

```js
// app.module.ts
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  // ..
  imports: [AppRoutingModule],
})
export class AppModule {}
```

#### 3. **Imports de componentes en el routing**

A continuación, importa en este nuevo archivo los componentes, y crea una regla para crear una ruta para cada uno de ellos de la siguiente manera:

```js
// app-routing.module.ts
import { AboutComponent } from "./components/about/about.component";
import { CatalogoComponent } from "./components/catalogo/catalogo.component";

const routes: Routes = [
  {
    path: "about",
    component: AboutComponent,
  },
  {
    path: "catalogo",
    component: CatalogoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
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
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "catalogo",
    component: CatalogoComponent,
  },
  {
    path: "home",
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
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
    path: "catalogo",
    component: CatalogoComponent,
  },
  {
    path: "catalogo/:categoryId",
    component: CatalogoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
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

# **RouterLink y RouterActive**

Toda aplicación requiere de una barra de navegación, de un menú o enlaces para redireccionar a través de sus rutas.

## Redirección de ruta en Angular

No es buena práctica realizar una redirección a otra ruta utilizando un simple `href`, ya que el mismo genera que se recargue toda la página y vuelva a renderizarse los componentes.

Angular posee una alternativa para evitar el redireccionamiento utilizando la directiva `routerLink`.

Comienza creando enlaces con el elemento `HTML <a>`, pero en lugar de utilizar `href`, utiliza `routerLink`.

```js
<!-- components/nav-bar/nav-bar.components.html -->
<div class="header-right hidde-menu">
    <a routerLink="/home">Home</a>
    <a routerLink="/catalogo">Catalogo</a>
    <a routerLink="/about">About</a>
</div>
```

Es así de simple, si las rutas son correctas y están creadas en el archivo `app-routing.module.ts`, Angular renderizará a través del `<router-outlet></router-outlet>` el componente correspondiente a la ruta sin recargar la página.

### **Parámetros dinámicos en las rutas**

También es posible hacer un binding en el `routerLink` para crear rutas con parámetros dinámicos. Para esto, rodea esta directiva de `[]` y pásale como input un array. Angular se encargará de construir las rutas con cada elemento del mismo.

```html
<!-- modules/website/components/nav-bar/nav-bar.components.html -->
<div class="header-right hidde-menu">
  <a [routerLink]="['/catalogo', 'electronica']">Electrónica</a>
  <a [routerLink]="['/catalogo', 12]">Categoría 12</a>
  <a [routerLink]="['/catalogo', '13ABC']">Categoría 13ABC</a>
</div>
```

El ejemplo anterior dará como resultado las rutas `/catalogo/electronica`, `/catalogo/12` y`/catalogo/13ABC`. Cada ruta con su propio parámetro dinámico que podrás capturar posteriormente en el controlador de tu componente.

### **Cómo identificar ruta activada**

Para mejorar la experiencia del usuario utilizando la aplicación, es buena práctica resaltar con algún estilo CSS particular la ruta activada en el momento. Angular hace esto por nosotros gracias a la `directiva routerLinkActive`.

```html
<div class="header-right hidde-menu">
  <a routerLink="/home" routerLinkActive="active">Home</a>
  <a routerLink="/catalogo" routerLinkActive="active">Catalogo</a>
  <a routerLink="/about" routerLinkActive="active">About</a>
</div>
```

Cuando Angular identifique que la misma ruta del enlace está activa, le agregará la clase `active`. Ya luego es tarea de darle estilos a esta clase para que luzca diferente con respecto a las rutas desactivadas.

# Ruta 404

Puede ocurrir en tu aplicación que el usuario ingrese a una ruta que no exista. Ya sea por un error de programación o un error manual de que el usuario ingrese una ruta que no esté definida.

## Qué es componente 404

Es una buena práctica manipular las rutas no existentes creando un componente con un mensaje típico de “página no encontrada” o similar.

Para esto, define una ruta con un doble asterisco que le indica a Angular que renderice un componente siempre que la ruta no exista.

```js
// app-routing.module.ts
import { NotFoundComponent } from "./components/not-found/not-found.component";

const routes: Routes = [
  {
    path: "about",
    component: AboutComponent,
  },
  {
    path: "catalogo",
    component: CatalogoComponent,
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "**",
    component: NotFoundComponent, // 404
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

Es muy importante que esta regla para manejo de rutas no definidas se encuentre ubicado en el último lugar del array. Angular analiza las rutas en el mismo orden en que las defines. Si esta regla se encuentra en primer lugar, puede anular las demás y darte algunos problemas.

# Detalle de cada producto

Es momento de hacer un repaso de todo lo aprendido hasta aquí.

- Creación de rutas
- Creación de rutas con parámetros
- Redirección a otras rutas con RouterLink
- Destacar ruta actual con RouterActive
- Ruta 404

El desafío para ti es avanzar con tu aplicación para fortalecer los conocimientos. Crea una barra de navegación que te permita navegar por tu app. Crea rutas dinámicas que reciban parámetros por URL para capturarlos y hacer solicitudes a una API. Además, customizar una página 404 para las rutas no definidas.

# Qué API de prueba usar para practicar

Si aún no iniciaste tu propio proyecto de prueba o no sabes qué hacer, existen muchas APIs gratuitas que puedes utilizar para practicar y construir aplicaciones. Te comparto las más populares para que las investigues:

- MockAPI
- OpenWeather
- Pokémon API
- The Rick and Morty API

Anímate a explorar estas API y divertirte desarrollando aplicaciones y practicando todo lo que ya sabes sobre Angular hasta aquí.

# Parametros URL

Una característica sobre las URL es la posibilidad de transportar información opcional a través de parámetros de consulta.

## **Query Params**

Los parámetros de ruta, por ejemplo `/catalogo/:categoryId`, son obligatorios. Sin el ID la ruta no funcionaría. Por otro lado, existen los parámetros de consulta que los reconocerás seguidos de un `?` y separados por un `&`, por ejemplo `/catalogo?limit=10&offset=0`.

#### 1. Creando rutas con parámetros

Para crear rutas con este tipo de parámetros, utiliza la directiva queryParams propia de Angular de la siguiente manera.

```html
<div class="header-right hidde-menu">
  <a
    routerLink="/catalogo"
    [queryParams]="{ category: 'electronica' }"
    routerLinkActive="active"
    >Electrónica</a
  >
</div>
```

La directiva queryParams recibe un objeto y creará la ruta `/catalogo?category=electronica`.

#### 2. **Capturar parámetros en las rutas**

Para capturar estos datos en el componente, es aconsejable realizarlo en el hook de ciclo de vida `ngOnInit()`.

```js
// modules/website/component/catalogo/catalogo.component.ts
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params: Params) => {
        console.log(params.category);
      });
  }
}
```

Suscribiéndote a **queryParams**, podrás capturar y hacer uso de esta información.

Recuerda que estos parámetros suelen no ser obligatorios, tu aplicación debería seguir funcionando si los mismos no existen.

# Programación Modular

Para activar las técnicas de **_Lazy Loading_** y **_CodeSplitting_** en Angular tienes que construir tus aplicaciones de forma modular.

## Cuáles son los módulos en Angular

Por defecto, Angular posee un solo módulo en el archivo `app.module.ts`. Todos tus componentes, servicios, pipe, etc. se importan aquí. Utiliza un decorador llamado `@ngModule()` con un aspecto similar al siguiente:

```js
// app.module.ts
@NgModule({
  imports: [], // Imports de otros módulos.
  declarations: [], // Imports de los componentes del módulo.
  exports: [], // Exports de componentes u otros para ser utilizados en otros módulos.
  providers: [], // Inyección de servicios.
  bootstrap: [], // Import del componente principal de la aplicación.
})
export class AppModule {}
```

Al modularizar una aplicación, cada módulo tendrá sus componentes exclusivos, servicios o los archivos que fuesen a necesitar.

## Tipos de Módulos en Angular

Podemos identificar varios tipos de módulos. El **AppModule** es el módulo raíz que da inicio a tu aplicación. Existen los Routing Modules para la definición de rutas.

El Shared Module que posee servicios o componentes compartidos por toda la aplicación. El Feature/Domain Module que son módulos propios de tu aplicación.

De esta manera, Angular construye un ecosistema de módulos, pudiendo dividir una APP en N partes para optimizar el rendimiento y mantener un orden en el código fuente para que sea comprensible y escalable.

# Vistas anidadas

Trabajar con Angular en una aplicación modularizada da la posibilidad de que, cada módulo, tenga a su vez N cantidad de páginas hijas. Veamos cómo es posible estructurar un proyecto para este propósito.

## Proceso para modularizar una aplicación

El CLI de Angular te ayudará a crear rápidamente un nuevo módulo. Para esto, utiliza el comando `ng generate module <module-name> --routing`, o en su forma corta `ng g m <module-name> --routing`.

Presta atención al flag `--routing` que le indica a Angular que tiene que crear, además del módulo, el archivo base para agregarle rutas a este nuevo módulo.

#### 1. **Crear módulos necesarios**

Comienza creando algunos módulos para tu aplicación. Por ejemplo, separaremos la app en un módulo para todo el sitio público y otro para el administrador.

- `ng generate module modules/website --routing`
- `ng generate module modules/cms --routing`

#### 2. **Preparación del routing**

A continuación, prepara tu `app-routing.module.ts` para Lazy Loading y CodeSplitting importando los módulos de la siguiente manera:

```js
// app-routing.module.ts
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./components/not-found/not-found.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./modules/website/website.module").then((m) => m.WebsiteModule),
  },
  {
    path: "cms",
    loadChildren: () =>
      import("./modules/cms/cms.module").then((m) => m.CmsModule),
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

Observa que, a excepción del módulo 404, solo estamos importando los módulos de una manera especial. Con `loadChildren`, cada módulo será enviado bajo demanda, ya que ahora se cargan de manera asíncrona.

#### 3. **Renderizar módulos**

El componente principal de tu aplicación será el encargado de renderizar cada módulo. Para esto, asegúrate de que solo posea el `<router-outlet>`, porque es todo lo que necesitas para lograrlo.

```js
// app.component.ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: "<router-outlet></router-outlet>",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {}
```

Incluso puedes borrar el archivo app.components.html y colocar el `<router-outlet>` dentro de la propiedad `template` en el decorador `@Component()` para simplificar tu código.

#### 4. **Componentes base**

Cada uno de tú módulos, también deberá tener un componente base al cual denominaremos Layout.

- `ng g c modules/website/layout`
- `ng g c modules/cms/layout`

Para el caso del layout del módulo website, agrégale su propio `<router-outlet>` además del componente para la barra de navegación.

```html
<!-- modules/website/layout/layout.component.html -->
<app-nav-bar></app-nav-bar>
<router-outlet></router-outlet>
```

Mientras que el layout del módulo CMS, solo necesitará del `<router-outlet>`, ya que, de momento, no posee `<header>` o `<footer>` exclusivo.

```html
<!-- modules/cms/layout/layout.component.html -->
<router-outlet></router-outlet>
```

#### 5. **Routing de cada módulo**

Finalmente, cada `<router-outlet>` de cada módulo renderizará los componentes que posea dichos módulos. Para esto, prepara el routing de cada módulo de la siguiente manera.

```js
// modules/website/website-routing.module.ts
const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "/home",
        pathMatch: "full",
      },
      {
        path: "home",
        component: HomeComponent,
      },
      {
        path: "about",
        component: AboutComponent,
      },
      {
        path: "catalogo",
        component: CatalogoComponent,
      },
      {
        path: "catalogo/:categoryId",
        component: CatalogoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsiteRoutingModule {}
```

Presta atención a la propiedad `children` que construye las nuevas reglas para las rutas.

De esta manera, puedes tener un `<router-outlet>` dentro de otro `<router-outlet>` para renderizar páginas hijas de cada módulo y tener un layout personalizado por nada uno de ellos. Además de estar optimizado el rendimiento de tu aplicación gracias al **_Lazy Loading y CodeSplitting_**.
