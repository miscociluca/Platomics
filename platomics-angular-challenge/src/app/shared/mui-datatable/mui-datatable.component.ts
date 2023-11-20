import {
  AfterViewInit,
  Component,
  DestroyRef,
  EventEmitter, inject,
  Input, OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MenuItem, TableColumn} from '../../../theme/@vex/interfaces/table-column.interface';
import {fadeInUp400ms} from '../../../theme/@vex/animations/fade-in-up.animation';
import {stagger40ms} from '../../../theme/@vex/animations/stagger.animation';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {VexPageLayoutComponent} from "../../../theme/@vex/components/vex-page-layout/vex-page-layout.component";
import {
  VexPageLayoutHeaderDirective
} from "../../../theme/@vex/components/vex-page-layout/vex-page-layout-header.directive";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {NgClass, NgFor, NgIf} from "@angular/common";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {
  VexPageLayoutContentDirective
} from "../../../theme/@vex/components/vex-page-layout/vex-page-layout-content.directive";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";

@Component({
  selector: 'mui-datatable',
  templateUrl: './mui-datatable.component.html',
  styleUrls: ['./mui-datatable.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
  standalone: true,
  imports: [
    FlexLayoutModule,
    VexPageLayoutComponent,
    VexPageLayoutHeaderDirective,
    MatButtonToggleModule,
    ReactiveFormsModule,
    VexPageLayoutContentDirective,
    NgIf,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    NgFor,
    NgClass,
    MatPaginatorModule,
    FormsModule,
    MatDialogModule,
    MatInputModule
  ]
})

export class MuiDataTableComponent implements OnInit, AfterViewInit {
  @Output()
  menuItemClicked = new EventEmitter<any>();
  @Output()
  itemSelected = new EventEmitter<any>();
  @Output()
  pageChanged = new EventEmitter<any>();


  @Input()
  columns: TableColumn<any>[] = [];
  @Input()
  menuItems: MenuItem<any>[] = [];
  @Input()
  showSearchBar: boolean = true;
  @Input()
  title: string = '';
  private _data: any[] = [];
  @Input()
  set data(value: any[]) {
    this._data = value;
    this.subject$.next(this._data);
  }
  @Input()
  pageSize = 10;
  @Input()
  pageSizeOptions: number[] = [5, 10, 20, 50];
  @Input()
  showPagination: boolean = true;

  totalRows = 0;
  currentPage = 0;

  @ViewChild(MatPaginator, {static: true}) paginator?: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort?: MatSort;
  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  dataSource: MatTableDataSource<any>;
  searchCtrl = new FormControl();
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor() {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.data$.pipe(
      filter<any[]>(Boolean)
    ).subscribe(data => {
      this.dataSource.data = data;
    });

    this.searchCtrl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.onFilterChange(value));
  }

  pageIsChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    const isLast = !this.paginator?.hasNextPage();
    this.pageChanged.emit({
      pageSize: this.pageSize,
      currentPage: this.currentPage,
      length: event.length,
      isLastPage: isLast
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator || null;
    this.dataSource.sort = this.sort || null;
  }

  menuItemClick(row: any, ids: number) {
    this.menuItemClicked.emit({data: row, id: ids});
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }
}
