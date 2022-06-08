# STAY-WITH-ME

Clone the project from

```
https://github.com/chekobil/stay-with-me
```

and run

```
npm install
```

## Tecnologías

Utilizo Vite como bundler, con Vue3 + Typescript,
escribo templates en PUG y estilos en SASS, utilizo composition API con la nomenclatura simplificada "script setup"
Vue-router, muy básico, dos rutas, la ruta genérica redirecciona al listado de usuarios y desde el menú se puede acceder a la otra ruta para crear un nuevo usuario.
Store gestionado con Pinia, para almacenar el listado de usuarios, de esta forma se llama a la API sólo en la primera carga del aplicación.
No había usado nunca Element-Plus, uso el componente Table, Button y Menu.

## Escenario Offline

He implementado un Store que almacena los datos de usuarios descargados y los mantiene mientras la aplicación siga funcionando, incluso aunque se pierda la conexión con la API, los datos de usuarios seguirían disponibles. En caso de querer manejar este escenario más a fondo, desactivaría las funcionalidades que hacen llamadas a la API, en este caso, desactivaría la opción de DELETE y CREATE (no está implementado) y el listado de usuarios se seguiría mostrando incluso aunque se navegue por la aplicación.
Si quisiera ir más allá y persisitir los datos incluso aunque el usuario haya cerrado la aplicación, guardaría los datos descargados en el "storage" del navegador y gestionaría el acceso a datos de esta forma: si hay conexión con la API, descargo los datos y los almaceno tanto en el store como en el storage, si no hay conexión, los leo del storage y los almaceno en el store.

### TO-DO list

- [x] create new Vite Vue3, TS, Pinia, Vue-Router
- [x] create repo and connect
- [x] composable, para conectar a API https://jsonplaceholder.typicode.com/
- [x] Listado de Users con botón para mostrar toda la info / delete user
- [x] CRUD options, falta POST new user
- [x] Explicacion escenario Offline
- [x] BONUS: boton y vista para añadir nuevo user
