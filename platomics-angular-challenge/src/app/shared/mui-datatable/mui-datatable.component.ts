import {
  AfterViewInit,
  Component, computed,
  DestroyRef,
  EventEmitter, inject,
  Input, OnChanges,
  OnInit,
  Output, signal,
  SimpleChanges, TrackByFunction,
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

export class MuiDataTableComponent implements OnInit {
  @Output()
  menuItemClicked = new EventEmitter<any>();
  @Output()
  itemSelected = new EventEmitter<any>();
  @Output()
  pageChanged = new EventEmitter<any>();

  @Input({required: true}) set data(data: any[] | undefined) {
    this.dummyDataSignal.set(data ?? []);
    this.dataSourceSignal().paginator = this.paginator || null;
    this.dataSourceSignal().sort = this.sort || null;
  }

  dummyDataSignal = signal<any[]>([]);
  dataSourceSignal = computed(() => {
    const data = this.dummyDataSignal();
    return new MatTableDataSource<any>(data);
  });

  identity: TrackByFunction<any> = (_, item: any) => item.id;
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
  pageSize = 10;
  @Input()
  pageSizeOptions: number[] = [5, 10, 20, 50];
  @Input()
  showPagination: boolean = true;

  currentPage = 0;

  @ViewChild(MatPaginator, {static: true}) paginator?: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort?: MatSort;

  searchCtrl = new FormControl();
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit() {
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

  menuItemClick(row: any, ids: number) {
    this.menuItemClicked.emit({data: row, id: ids});
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  onFilterChange(value: string) {
    if (!this.dataSourceSignal()) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSourceSignal().filter = value;
  }
}
