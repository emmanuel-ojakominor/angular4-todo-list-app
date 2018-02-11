import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  
  listOfAllTodos: Todo[];
  statusCode: number;
  processingRequest: boolean = false;
  todoTaskToBeUpdated = null;

  // Inject TodoService
  constructor(private todoService: TodoService) { }

  // Create Form
  todoCreateForm = new FormGroup({
    taskName: new FormControl('', [Validators.required, Validators.maxLength(20)] ),
    taskDescription: new FormControl('', [Validators.required, Validators.maxLength(200)])	
  });

  ngOnInit() {
    this.getAllTodos();
  }

  //Fetch all todos
  getAllTodos() {
    this.todoService.getAllTodos()
      .subscribe(
        data => this.listOfAllTodos = data,
        errorCode =>  this.statusCode = errorCode);   
  }

   // On Submit Todo Create Form 
   onSubmitTodoCreateForm() {    
	  //Form is valid, now perform create or update
    this.preProcessConfigurations();
	  let todo = this.todoCreateForm.value;
	  if (this.todoTaskToBeUpdated === null) {  
	    //Generate todo id then create todo
      this.todoService.getAllTodos()
	      .subscribe(todos => {
			 
		   //Generate todo id	 
		   let maxIndex = todos.length - 1;
		   let todoWithMaxIndex = todos[maxIndex];
		   let todoId = todoWithMaxIndex.id + 1;
		    todo.id = todoId;
		   
		   //Create todo
     	  this.todoService.createTodo(todo)
			  .subscribe(successCode => {
				   this.statusCode = successCode;
				   this.getAllTodos();	
				   this.returnToCreateNewTask();
				 },
				 errorCode => this.statusCode = errorCode
			   );
		 });		
	   } else {  
   	     //Handle update todo
        todo.id = this.todoTaskToBeUpdated; 		
	      this.todoService.updateTodo(todo)
	        .subscribe(successCode => {
		     this.statusCode = successCode;
		     this.getAllTodos();	
		     this.returnToCreateNewTask();
		},
		errorCode => this.statusCode = errorCode);	  
	   }
   }

   //Edit Todo Item by Id
   editTodo(todoId: string) {
      this.preProcessConfigurations();
      this.todoService.getTodoById(todoId)
	   .subscribe(todo => {
        this.todoTaskToBeUpdated = todo.id;   
        this.todoCreateForm.setValue({ 
          taskName: todo.taskName, 
          taskDescription: todo.taskDescription });
		      this.processingRequest = false;   
	       },
        errorCode =>  this.statusCode = errorCode);   
   }

   //Delete todo
   deleteTodo(todoId: string) {
      this.preProcessConfigurations();
      this.todoService.deleteTodoById(todoId)
	      .subscribe(successCode => {
		  //this.statusCode = successCode;
	  	  //Expecting success code 204 from server
		  this.statusCode = 204;
		  this.getAllTodos();	
		  this.returnToCreateNewTask();
		},
		errorCode => this.statusCode = errorCode);    
   }

   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
      this.processingRequest = true;   
   }

   //Go back from update to create
   returnToCreateNewTask() {
      this.todoTaskToBeUpdated = null;
      this.todoCreateForm.reset();	  
   }

}
