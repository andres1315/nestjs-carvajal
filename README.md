## Description

App [Back] Prueba tecnica.
App [Front] https://github.com/andres1315/Appreact_carvajal.git

## Tecnologias

#Los endpoint se ejecutan sobre el puerto 3010 con prefijo api
Ejemplo:http://localhost:3010/api/....
## Installation

```bash
# Instalar todas las dependencias
$ npm install

#Configurar la variable de entorno de desarrollo. documento ejemplo(.env.example) nombre archivo.env(.env)
#Configurar la variable de entorno de produccion. documento ejemplo(.env.example) nombre archivo.env(.prod.env)
```
## Correr Migraciones de base de datos
```bash
#Generar
$ npm run migration:generate

#Correr
$ npm run migration:run

#Link [ERD] https://drive.google.com/file/d/1VmcZLYUwuL7Nvb1MNxVAYcfNBBIAwj0L/view?usp=sharing
```


## Running the app

```bash
#Construir
$ npm run build

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

