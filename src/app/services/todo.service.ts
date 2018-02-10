import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { extractData, handleError } from '../utils/utils';
import { Todo } from '../models/todo';

@Injectable()
export class TodoService {
  
   //URL for CRUD operations
   todoUrl: string = "http://localhost:3000/todos";
  
  //Inject Http instance
  constructor(private http: Http) { }
  

  // Fetch all todos
  getAllTodos(): Observable<Todo[]> {
    return this.http.get(this.todoUrl)
     .map(extractData)
     .catch(handleError);
  }

  //Create todo
  createTodo(todo: Todo): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
      return this.http.post(this.todoUrl, todo, options)
        .map(success => success.status)
        .catch(handleError);
  }

  //Fetch todo by id
  getTodoById(articleId: string): Observable<Todo> {
  let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: cpHeaders });
  console.log(this.todoUrl +"/"+ articleId);
  return this.http.get(this.todoUrl +"/"+ articleId)
      .map(extractData)
      .catch(handleError);
  }	
  
  //Update todo
  updateTodo(todo: Todo):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.put(this.todoUrl +"/"+ todo.id, todo, options)
        .map(success => success.status)
        .catch(handleError);
  }
  
  //Delete todo	
  deleteTodoById(todoId: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.delete(this.todoUrl +"/"+ todoId)
      .map(success => success.status)
      .catch(handleError);
  }	

}
