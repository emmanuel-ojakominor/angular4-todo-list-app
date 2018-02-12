# TodoListApp

This is a simple Angular 4 app that exemplifies the four basic http crud operations/methods (Http.post, Http.get, Http.put, Http.delete). Below are screenshots revealing the basic look and feel of the App. 

### Create Screen:
![todo_list_ _task_create_page](https://user-images.githubusercontent.com/17477556/36068903-51222e66-0ea5-11e8-895d-24784d4a4b4f.png)

### Update Screen:
![todo_list_ _task_update_page](https://user-images.githubusercontent.com/17477556/36069176-4f1e5c84-0eaa-11e8-889b-48f62b6fd371.png)

- To create a task, enter values on the form to the right, and click on "Create" Button. 
- To Update, click on the corresponding "Edit" button, and the values autopopulate on the form. After updating, click on "Update" button. 
- For Delete functionality, click on "Delete" button on the grid, and that entry is deleted from the list. 

*(Note: "required" and "maxlength" validations were implemented for create and update functionalities.)*


## Running the App
1. You can find [here](https://github.com/typicode/json-server) the documentation for the json-server (full fake REST API) that can be used for testing purposes. 
2. Clone/download the project source code.
3. Navigate to the project root, and run `npm install`.
4. Run `npm install -g json-server` to install [json-server](https://github.com/typicode/json-server) globally on your system.
5. Navigate to the location of db.json file (should be ../src/assets/db.json) and run `json-server --watch db.json`.
6. Navigate to the project root and run `ng serve --port 4200 -o` to automatically start and navigate the App to your default browser on port 4200 (i.e., localhost:4200).
7. Enjoy.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
