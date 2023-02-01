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


# Creando el CMS Module

Es momento de poner manos a la obra con todo lo aprendido hasta aquí. Anímate a crear una aplicación con algunos módulos y páginas hijas para explorar cómo se desarrolla profesionalmente las aplicaciones con Angular.

## Ejercicio para crear un CMS Module

Te recomiendo lo siguiente: si ya tienes una aplicación, reestructúrala de forma modular con todas sus páginas y crea un segundo módulo llamado CMS. Un **CMS (Content Management System)** no es más que un administrador privado para los usuarios de la aplicación para que puedan cargar contenido.

Cada módulo puede tener su propio `<header>`, `<footer>` o su propio layout además de las páginas pertinentes al mismo.


# Creando un Shared Module

La documentación oficial de Angular recomienda la creación de un SharedModule. Un módulo compartido donde guardarás los componentes, pipes, directivas o servicios que dos o más de tus otros módulos necesitarán.

# **Cómo crear un módulo compartido**

Al igual que con cualquier módulo, créalo con el comando `ng g m modules/shared` aunque este nuevo módulo no necesitará routing.

Importa en este módulo las piezas de código que serán utilizadas por tus otros módulos como, por ejemplo, un servicio para consumo de APIs o un componente para construir un paginador. Pipes y Directivas customizadas también es buena práctica colocarlas aquí.

Solo recuerda importar este **SharedModule** en el módulo principal de tu aplicación, así como en cada módulo individualmente de tu app.

De esta manera, cumples con las buenas prácticas en el desarrollo de software con Angular y mantienes tu código fuente ordenado. Los futuros desarrolladores que tomen el proyecto lo agradecerán.

# All Modules y Custom Strategy

Al haber activado la técnica de ***Lazy Loading*** , puedes **personalizar el envío de estos módulos** al cliente con diferentes estrategias.

## Cómo hacer precarga de módulos bajo demanda

Por defecto, la aplicación enviará al cliente solo el módulo que necesita. Si ingresas al módulo website, solo se cargará su respectivo archivo JS.

Si el usuario solicita otro módulo, este se cargará solo cuando sea necesario

Esto puede causarte problemas, ya que si el módulo solicitado es algo pesado o la conexión es lenta, tardará varios segundos en estar listo y no será buena la experiencia de usuario.

# Cómo hacer precarga de todos los módulos

Puedes decirle a tu aplicación que, por defecto, precargue todos los módulos con la siguiente configuración.

```js
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/website/website.module').then(m => m.WebsiteModule),
  },
  {
    path: 'cms',
    loadChildren: () => import('./modules/cms/cms.module').then(m => m.CmsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

Importando **PreloadAllModules** desde `@angular/router`, lo pasas como parámetro al `import` en el decorador `@NgModule().` De esta manera, se cargarán en el primer render TODOS los módulos que tu aplicación tenga, pudiendo ver por consola algo como lo siguiente.

## Pasos para una estrategia personalizada de precarga

Precargar todos los módulos a la vez, puede ser contraproducente. Imagina que tu aplicación posea 50 o 100 módulos. Sería lo mismo que tener todo en un mismo archivo `main.js`.

Para solucionar esto, puedes personalizar la estrategia de descarga de módulos indicando qué módulos si se deben precargar y cuáles no.


#### 1. **Agrega metadata a cada ruta**
Agrégale a cada regla en el routing de tu aplicación, metadata para indicarle a cada módulo si debe ser precargado, o no.

```js
// app-routing.module.ts
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/website/website.module').then(m => m.WebsiteModule),
    data: { preload: true },
  },
  {
    path: 'cms',
    loadChildren: () => import('./modules/cms/cms.module').then(m => m.CmsModule),
    data: { preload: true },
  }
];
```


Con la propiedad `data: { preload: true }`, le indicas al servicio CustomPreloadingStrategy si el módulo debe ser precargado en el primer render de tu app.


#### 2. **Crea un servicio con estrategia personalizada**
Crea un servicio al cual llamaremos CustomPreloadingStrategy con la siguiente lógica.


```js
// modules/shared/services/custom-preloading-strategy.service.ts
import { Injectable } from '@angular/core';
import { Route, PreloadingStrategy } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadingStrategyService implements PreloadingStrategy {

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data.preload)
      return load();
    else
      return of(null);
  }

}
```

El servicio implementa **PreloadingStrategy** y sobreescribiendo el método `preload()`, hace uso de la metadata para desarrollar tu propia lógica de renderizado de módulos.


#### 3. **Importa tu estrategia**
Finalmente, importa tu estrategia personalizada en el routing.


```js
// app-routing.module.ts
import { CustomPreloadingStrategyService } from './modules/shared/services/custom-preloading-strategy.service';

// ..

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: CustomPreloadingStrategyService,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

De esta manera, ya puedes personalizar qué módulos serán enviados al cliente y cuáles no, mejorando así el rendimiento de tu aplicación.
# QuickLink Strategy

Puedes optar entre precargar todos los módulos con ***Lazy Loading***, o **seleccionar los que a ti te parecen los más importantes** que el usuario necesitará. ***Justamente ese es un inconveniente con esta técnica, no tiene en cuenta al usuario.***

Veamos otra forma de precargar módulos teniendo en cuenta al mismo.

## Cómo hacer precarga de módulos en pantalla

La estrategia de pregarga de módulos **QuickLink** utiliza la API nativa del navegador Intersection Observer API para observar el viewport de la pantalla y solo precargar los módulos cuyos enlaces hacia ellos estén visibles.

En otras palabras, si en pantalla hay un enlace visible que redirecciona a un módulo en particular, este será precargado.

Puede ocurrir que un usuario administrador, tenga a disposición todos los módulos de la aplicación. Pero que un usuario con menor privilegio solo podrá acceder a unos pocos módulos y no tiene sentido que precargue todos.


### 1. Instalando la dependencia
Para activar esta estrategia, instala la dependencia **ngx-quicklink** con `npm i ngx-quicklink --save`.

### 2. Importando el módulo
Importa el módulo QuicklinkModule, en el módulo principal de tu aplicación.

```js
// app.module.ts
import { QuicklinkModule } from 'ngx-quicklink'

@NgModule({
  imports: [
    // ..
    QuicklinkModule
  ],
})
export class AppModule { }
```
### 3. Importando la estrategia
Importa la estrategia en el routing de la aplicación.

```js
// app-routing.module.ts
import { QuicklinkStrategy } from 'ngx-quicklink'

// ..

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: QuicklinkStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

También, muy importante, importa el módulo **QuicklinkModule** en cada uno de los módulos de tu aplicación que quieras que sea precargado.


```sh
TIP: Puedes importar **QuicklinkModule** en el **SharedModule** si deseas no tener que hacerlo módulo por módulo y solo lo haces en el módulo compartido.
```

Ahora si, podrás observar que solo los módulos visibles en el viewport se precargan, ignorando los que el usuario no necesitará.


# Conoce a los Guardianes

Una aplicación tendrá N cantidad de rutas, pero es posible que muchas de estas tengan restricciones de acceso solo para administradores o determinados roles de usuario.

En estos casos, los **Guards llegan para ayudarnos a darle seguridad a nuestras rutas**.

## Cómo segurizar Rutas

Con ayuda del CLI de Angular, puedes crear tu primer guardián con el comando `ng generate guard <nombre-guard>` o en su forma corta `ng g g <nombre-guard>`.

### 1. Creando el primer guard

Al utilizar este comando, nos hará una pregunta sobre qué interfaz quieres que implemente por defecto:

Cada opción tiene una funcionalidad distinta para cada tipo de Guard. Escoge la primera opción llamada **CanActivate**.

Al auto generar el código, verás tu primer Guard con el siguiente aspecto.

```js
// modules/shared/guards/admin.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
```

Un Guard puede devolver un booleano, una promesa con un booleano o un observable, también con un booleano. Dependiendo la lógica que tengas que aplicar para el caso sea síncrona o asíncrona.

## 2. Importando el guard
Ahora importa el nuevo Guard el routing de tu aplicación.


```js
// app-routing.module.ts
import { AdminGuard } from './modules/shared/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/website/website.module').then(m => m.WebsiteModule),
    data: { preload: true },
  },
  {
    path: 'cms',
    loadChildren: () => import('./modules/cms/cms.module').then(m => m.CmsModule),
    canActivate: [ AdminGuard ],
    data: { preload: true },
  }
];
```
Agrégale a las rutas que quieras segurizar `canActivate: [ AdminGuard ]`.
De esta manera, ya puedes implementar la lógica que necesites para cada Guard. En este caso, permitir el acceso al módulo CMS solo para usuarios administradores.


# Implementando redirects

Los Guards se encargan de **permitir el ingreso o no de los usuarios a las rutas**. Cuando un usuario no tiene acceso, es una buena práctica informarle qué está pasando y por qué no está entrando a una ruta.

## Cómo redireccionar desde un Guard

Para mejorar la experiencia de usuario, cuando no se tiene permisos para ingresar a X ruta, es recomendable redireccionar al usuario a la home de la aplicación o a alguna otra página pertinente.

Para esto, inyecta el servicio Router importándolo desde `@angular/router` en el Guard para realizar una redirección.

```js
// modules/shared/guards/admin.guard.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Lógica para determinar si el usuario tiene permisos o no.
    let allow = true;
    
    if (!allow)
      this.router.navigate(['/home']);
    return allow;
  }
}
```

Así es como puedes crear la lógica que necesites en tus Guards. Cuando el usuario no tenga permisos de acceso, redireccionarlo a otra página para que no quede en una página en blanco.


# Estado de login

La lógica de los Guards suelen necesitar de los datos de un usuario para determinar si tiene acceso o no a una ruta. Veamos como es posible obtener los datos del usuario utilizando **Observables** y **RxJS**.

## Qué es el estado de la aplicación

Se lo conoce como ***“estado”*** al valor de los datos que la aplicación utiliza en un momento dado. A medida que el usuario interactúa con la app, el estado cambia.

## ¿Cómo conocer el estado del usuario?
Una buena manera de conocer el estado del usuario en todo momento es creando un Observable que notifique a los interesados si hay algún cambio en los datos del mismo.


## 1. Observable para el estado del usuario
En el servicio de autentificación, crea el Observable que contendrá los datos del usuario para que los interesados puedan suscribirse y escuchar los cambios.

```js
// modules/shared/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  email: string;
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userData: User | null = null;
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  setUser(u: User): void {
    this.userData = u;
    this.userSubject.next(this.userData);
  }

}
```

## 2. Guardando datos del usuario
Luego de un login exitoso, guarda el usuario en el Observable.


```js
this.auth.setUser({
  email: 'prueba@platzi.com',
  name: 'Platzi',
  role: 'admin'
});
```

## 3. Acceder a los datos
De esta manera, podrás acceder a los datos del usuario en los Guards y permitir el acceso o no al mismo.


```js
// modules/shared/guards/admin.guard.ts
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.auth.user$
      .pipe(
        map(user => {
          if (user)
            return true;
          else {
            this.router.navigate(['/home']);
            return false;
          }
        })
      );

  }
}
```
De esta manera, los Guards se convierten en asíncronos, que suele ser lo más apropiado para validar tokens y permisos de los usuarios para el ingreso o no a una ruta.


# Guard para Admin

Es tu turno de continuar explorando los Guards de Angular y sus posibilidades para la segurización de rutas. El reto para ti es crear un Guard que valide el “rol” del usuario logueado y le permita o no entrar a los módulos de administración de tu aplicación.


## Proceso para hacer Guard para Admin
Recuerda importar los Guards en el routing de tu aplicación, ya sea para bloquear el acceso a los módulos o el acceso a un componente individual.

```js
// app-routing.module.ts
import { AuthGuard } from './modules/shared/guards/auth.guard';
import { AdminGuard } from './modules/shared/guards/admin.guard';

const routes: Routes = [
  {
    path: 'cms',
    loadChildren: () => import('./modules/cms/cms.module').then(m => m.CmsModule),
    canActivate: [ AuthGuard, AdminGuard ]
  },
];
```

También puedes segurizar las reglas de tu routing con más de un Guard a la vez, separando así la lógica de autenticación y autorización de los usuarios.

# CanDeactivate

Así como los Guards pueden permitir o denegar el acceso a una ruta, también pueden permitir (o no) el caso contrario, que un usuario salga de una página.


## Cómo proteger la salida de una ruta  


¿Tienes en una página un formulario muy largo, o un proceso que demora algunos minutos, y el usuario cierra el navegador o se redirecciona a otra ruta?

Puedes alertarle de que el progreso del formulario se perderá o que un proceso aún no ha finalizado utilizando los Guards del tipo CanDeactivate.

1. Creando el guard
Crea un Guard utilizando el comando `ng g g <nombre-guard>` y esta vez selecciona que implemente la interfaz **CanDeactivate**.


El aspecto del nuevo Guard será como el siguiente.

```js
// modules/shared/guards/exit.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExitGuard implements CanDeactivate<unknown> {

  canDeactivate(component: unknown, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

}
```

La función canDeactivate() devuelve un booleano (o una promesa u observable con un booleano) para permitir o no la salida del usuario de la página dependiendo la lógica que tu quieras.

## 2. Importando el guard
Importa el Guard en la ruta que necesites, esta vez en la propiedad canDeactivate de cada regla.

```js
// modules/cms/cms-routing.module.ts
import { ExitGuard } from '../shared/guards/exit.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full'
      },
      {
        path: 'admin',
        component: AdminComponent,
        canDeactivate: [ ExitGuard ],
      },
    ]
  }
];
```

## Lógica dinámica del Guard

En los Guards del tipo CanDeactivate puedes implementar la lógica que necesites para permitir o no la salida del usuario de una página. En este caso, la lógica está atada al Guard y no tiene relación con el estado del componente, dificultando la programación de esa lógica.

Puedes relacionar el Guard con el Componente, para que sea el mismo quién determine la lógica y valide si permitir o no la salida del usuario.

## 1. Interfaz personalizada
Crea una interfaz para tipar tu componente y obligarlo a implementar una función que contendrá la lógica necesaria.

```js
// modules/shared/guards/exit.guard.ts
export interface OnExit {
  onExit: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ExitGuard implements CanDeactivate<unknown> {

  canDeactivate(component: OnExit, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return component.onExit ? component.onExit() : true;
  }
}
```

La interfaz **OnExit** tiene una función llamada `onExit()` que los componentes tendrán que implementar para permitir la salida. En el return del Guard, has el llamado a dicha función para validar o no la lógica del componente.

## 2. Implementando la interfaz
Implementa la interfaz en el componente cuya lógica dependerá de que el usuario pueda o no salir de la página.

```js
// modules/cms/components/admin/admin.component.ts
import { Component } from '@angular/core';
import { OnExit } from '../../../shared/guards/exit.guard';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnExit {

  onExit() {
    const exit = confirm('¿Seguro desea salir?');
    return exit;
  }
}
```

De esta manera, solo necesitará un Guard del tipo **CanDeactivate**, cada componente que lo necesite, implementará la interfaz y aplicará la lógica necesaria para su funcionamiento.


# Netlify Deployment

Es momento de **desplegar tu aplicación en un entorno productivo** para tener acceso al mismo desde cualquier parte del mundo. Es importante, como desarrollador o desarrolladora de software, que conozcas herramientas que te permitan desplegar aplicaciones rápidamente y mostrar tu trabajo al mundo.


Veamos como hacerlo con **Netlify**.

# Desplegar una aplicación con Netlify
Netlify es un importante proveedor de hosting cloud que puedes utilizar de forma gratuita para jugar y hacer pruebas desplegando aplicaciones fácilmente.

## 1. Creación de cuenta
Si aún no la tienes, crea una cuenta en Netlify. Te recomiendo hacerlo utilizando tu cuenta de GitHub (o GitLab/Bitbucket) para tener acceso rápido al repositorio de tu proyecto.

## 2. Creación de archivo de configuración
Crea en la raíz de tu proyecto un archivo llamado `netlify.toml` con el siguiente contenido:

```js
[build]
  publish = "dist/angular-modules"
  command = "npm run build"
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  ```

Dicho archivo posee la configuración básica para enlazar el repositorio de tu proyecto con Netlify. Asegúrate de configurar correctamente la ruta en `publish` con el build de tu aplicación dentro de la carpeta `dist`.

## 3. Crear nuevo proyecto en Netlify
Un vez tengas preparado tu proyecto, ve a Netlify, selecciona crear nuevo proyecto y a continuación selecciona tu proveedor de repositorios.

## 4. Sincronizando con el repositorio
Busca dentro de tu cuenta el repositorio que quieres desplegar.

## 5. Desplegando tu aplicación
Selecciona finalmente la rama de tu repositorio que Netlify utilizará y has clic en “Deploy site”.


Luego de algunos minutos, tu aplicación quedará desplegada en una URL pública de prueba que Netlify provee.


Haciendo clic en “Open published deploy”, podrás ver tu app corriendo en un entorno de producción.


# Para que te sirve un sistema de CI/CD
Un sistema de CI/CD hace referencia a Integración Continua y Entrega Continua, por sus siglas en español. Un concepto muy importante que tienes que al menos conocer del mundo DevOps.

En pocas palabras, es una técnica para automatizar los despliegues cada vez que se hace commit en X rama. En este caso, el sistema de CI/CD está conectado con la rama “Master”. Cada vez que hagas un push de un commit a dicha rama, Netlify actualizará tu proyecto sin que tengas que hacer nada.
