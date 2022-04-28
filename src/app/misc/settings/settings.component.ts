import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Manufacturer, Product, Role, Source, Step, Tag, User } from 'src/app/models/model';
import { AppState } from 'src/app/state/app.state';
import { selectSteps, selectUsers } from 'src/app/state/misc/misc.selectors';
import { MiscService } from '../misc.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {
  users$: Observable<ReadonlyArray<User>> = this.store.select(selectUsers)
  roles: Role[] = []
  steps$: Observable<ReadonlyArray<Step>> = this.store.select(selectSteps)
  tags: Tag[] = []
  sources: Source[] = []
  taskTypes: TaskType[] = []
  products: Product[] = []
  manufactureres: Manufacturer[] = []
  constructor(private misc: MiscService, private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.misc.Users().subscribe(users => this.users = users)
    this.misc.Roles().subscribe(roles => this.roles = roles)
    // this.misc.Steps().subscribe(steps => this.steps = steps)
    this.misc.Tags().subscribe(tags => this.tags = tags)
    this.misc.Sources().subscribe(sources => this.sources = sources)
    this.misc.TaskTypes().subscribe(taskTypes => this.taskTypes = taskTypes)
    this.misc.Products().subscribe(products => this.products = products)
    this.misc.Manufacturers().subscribe(manufactureres => this.manufactureres = manufactureres)
  }

}
