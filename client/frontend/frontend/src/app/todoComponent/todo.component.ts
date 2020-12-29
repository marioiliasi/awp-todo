import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Todo} from "@/_models/todo";
import {TodoService} from "@/_services/todo.service";
import {AuthenticationService} from "@/_services";
import {OpenComponent} from "@/openTasks";
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input()todo:Todo;
  constructor(private ts: TodoService,
              private authenticationService: AuthenticationService) { }
  ngOnInit(): void {
  }

  public canEdit = false;

  delete() {
    if(confirm("Are you sure to delete "+this.todo.title)) {
      this.ts.deleteTodo(this.authenticationService.currentUserValue, this.todo);
      window.location.reload();
    }
  }

  archive() {
    console.log(this.todo);
    this.todo.archived = true;
    this.ts.updateTodo(this.authenticationService.currentUserValue, this.todo);
    this.canEdit = false;
    window.location.reload();
  }

  reopen() {
    console.log(this.todo);
    this.todo.archived = false;
    this.ts.updateTodo(this.authenticationService.currentUserValue, this.todo);
    window.location.reload();
  }
  edit() {
    this.canEdit = true;
  }
  close() {
    this.canEdit = false;
  }
  update() {
    console.log(this.todo);
    this.ts.updateTodo(this.authenticationService.currentUserValue, this.todo);
    this.canEdit = false;
  }
}
