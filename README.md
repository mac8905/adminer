# ![prestalud](media/LOGO.png)

## PRESTALUD
Prototipo telemático para el control del uso e inventario de los recursos del laboratorio de industrial de la Universidad Distrital Francisco José de Caldas Facultad Tecnológica.

Telematic prototype for use control and inventory of the industrial laboratory's resources of the Universidad Distrital Francisco José de Caldas Facultad Tecnológica.

* NodeJS -v6.10.0
* npm -v3.10.10
* Firebase -v3.6.10
* Angular -v4

## Install

1. Clone the repository.
```
$ git clone https://gitlab.com/prestalud_team/adminer.git
```

2. Install dependencies.
```
$ cd adminer
$ npm install
```

3. Run project on Development Enviroment
```
$ cd adminer
$ npm start
```

5. View on web
```
$ http://localhost:4200
```

4. Run project on Production Enviroment

5. Option 1 
```
$ cd adminer
$ npm run build:prod
```

6. Option 2
```
$ cd adminer
$ ng build --env=prod --output-hashing
```

7. If haven't http-server
```
$ npm install http-server -g
```

8. Run command on project main directory
```
$ http-server ./dist -o -s
```

9. Run forever
```
$ http-server ./dist -o -s &
```

10. Find pid
```
$ netstat -aon | more
```

11. Find pid
```
$ lsof -i :8080
```

12. Kill pid
```
$ taskkill /PID 7796
```

13. Run on web
```
ip-adress:port/index.html
```

14. Run for validate prod enviroment
```
ng serve --env=prod
```

## Team
20151678009 - MIGUEL CARO <003.mcaro@gmail.com>

20151678003 - WILMAR CAICEDO <wacaicedos@gmail.com>