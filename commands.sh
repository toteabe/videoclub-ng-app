npm i -g @angular/cli@21
ng version

#Creando la aplicación Angular
ng new videoclub-ng-bs-app --style=scss --routing=true
#Creando componentes e interfaces
ng g c categoria-list.component
ng g c categoria-form.component
ng g i model/categoria.interface

#Instalando Bootstrap y ng-bootstrap
ng add @ng-bootstrap/ng-bootstrap

#
npm i -g json-server@0.17.4
json-server --watch db.json

ng serve -o