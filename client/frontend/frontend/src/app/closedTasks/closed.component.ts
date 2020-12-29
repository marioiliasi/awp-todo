import {Component, OnInit, ViewChild} from '@angular/core';
import {TodoService} from "@/_services/todo.service";
import {AuthenticationService} from "@/_services";
import {Todo} from "@/_models/todo";
import {TodoComponent} from "@/todoComponent";

@Component({
  selector: 'app-tab1',
  templateUrl: './closed.component.html',
  styleUrls: ['./closed.component.scss']
})
export class ClosedComponent implements OnInit {

  constructor(private todoService: TodoService,
              private authenticationService: AuthenticationService) {

  }

  public todo: Todo = {
    _id: "",
    archived: false,
    createdAt: undefined,
    deleted: false,
    items: undefined,
    title: "",
    type: "",
    updatedAt: undefined,
    userId: ""
  };
  public todoList: Todo[] = [];

  ngOnInit() {
    const resp: any = this.todoService.getClosed(this.authenticationService.currentUserValue);
    console.log("......!@#$$");
    console.log(resp);
    resp.subscribe(
      (res) => {
        console.log(res.data);
        this.todoList = res.data;
        // if(this.todoList.length > 0){
        //   this.todo = this.todoList[0];
        // }
      },
      (err) => console.log(err),
      () => console.log('done!'));
    // this.todo = this.child.selectedTodo;
  }

}
