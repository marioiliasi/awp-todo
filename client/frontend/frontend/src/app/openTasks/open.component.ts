import {Component, OnInit, ViewChild} from '@angular/core';
import {TodoService} from "@/_services/todo.service";
import {AuthenticationService} from "@/_services";
import {Todo} from "@/_models/todo";
import {TodoComponent} from "@/todoComponent";

@Component({
  selector: 'app-tab1',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.scss']
})
export class OpenComponent implements OnInit {

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
    this.load();
  }

  public load(){
    const resp: any = this.todoService.getOpen(this.authenticationService.currentUserValue);
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

  public addTodo(){
    console.log(this.todo);
    this.todo.items = [{text:this.todo.items}];
    this.todo.type = 'note';
    this.todoService.addTodo(this.authenticationService.currentUserValue, this.todo);
    window.location.reload();
  }

  public search(searchValue: string){
    console.log(searchValue);
    if(searchValue){
      const newList: Todo[] = [];
      this.todoList.forEach(task => {
        if(task.title.toUpperCase().includes(searchValue.toUpperCase())){
          newList.push(task);
        } else{
          for (let item of task.items) {
            if(item.text.toUpperCase().includes(searchValue.toUpperCase())){
              newList.push(task);
            }
          }
        }
      });
      this.todoList = newList;
    } else{
      this.load();
    }
  }

}
