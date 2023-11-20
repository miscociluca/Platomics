import {CommonModule, NgClass, NgFor, NgIf} from '@angular/common';
import {
  Component,
  computed, DestroyRef, EventEmitter, inject,
  Input,
  OnInit, Output,
  signal,
  TrackByFunction,
} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {ScrollNearEndDirective} from "../directives/scroll-near-end.directive";
import {ExtendedModule, FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {VexPageLayoutComponent} from "../../../theme/@vex/components/vex-page-layout/vex-page-layout.component";
import {
  VexPageLayoutContentDirective
} from "../../../theme/@vex/components/vex-page-layout/vex-page-layout-content.directive";
import {MenuItem, TableColumn} from "../../../theme/@vex/interfaces/table-column.interface";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {
  VexPageLayoutHeaderDirective
} from "../../../theme/@vex/components/vex-page-layout/vex-page-layout-header.directive";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {fadeInUp400ms} from "../../../theme/@vex/animations/fade-in-up.animation";
import {stagger40ms} from "../../../theme/@vex/animations/stagger.animation";

@Component({
  selector: 'mui-scrolling-table',
  templateUrl: './scroll-datatable.component.html',
  styleUrls: ['./scroll-datatable.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
  standalone: true,
  imports: [
    CommonModule,
    ScrollNearEndDirective,
    ExtendedModule,
    FlexModule,
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
  ],
})
export class ScrollTableComponent implements OnInit {
  @Output()
  endOfPageReached = new EventEmitter<any>();
  @Output()
  menuItemClicked = new EventEmitter<any>();
  @Output()
  itemSelected = new EventEmitter<any>();
  @Input()
  defaultValue = 100;
  @Input()
  columns: TableColumn<any>[] = [];
  @Input()
  menuItems: MenuItem<any>[] = [];
  @Input()
  showSearchBar: boolean = true;
  @Input()
  title: string = '';
  searchCtrl = new FormControl();
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  @Input({required: true}) set data(data: any[] | undefined) {
    this.dummyDataSignal.set(data ?? []);
    this.limitSignal.set(this.defaultValue);
  }

  private dummyDataSignal = signal<any[]>([]);
  private limitSignal = signal<number>(this.defaultValue);

  dataSourceSignal = computed(() => {
    const data = this.dummyDataSignal().slice(0, this.limitSignal());
    return new MatTableDataSource<any>(data);
  });

  identity: TrackByFunction<any> = (_, item: any) => item.id;

  onNearEndScroll(): void {
    this.limitSignal.update((val) => val + this.defaultValue);
    if (this.dummyDataSignal().length === this.limitSignal()) {
      this.endOfPageReached.emit();
    }
  }

  ngOnInit() {
    this.searchCtrl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.onFilterChange(value));
  }

  menuItemClick(row: any, ids: number) {
    this.menuItemClicked.emit({data: row, id: ids});
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  onFilterChange(value: string) {
    if (!this.dataSourceSignal) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSourceSignal().filter = value;
  }
}
