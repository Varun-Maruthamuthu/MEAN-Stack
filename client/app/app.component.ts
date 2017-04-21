import { Component } from '@angular/core';
import { TaskService } from './services/task.service';


@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'appComponent.html',
  providers:[ TaskService ]
})
export class AppComponent  { }
