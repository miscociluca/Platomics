import {Component, OnInit, ViewChild} from "@angular/core";
import {Variant} from "../../models/variant";
import {MenuItem, TableColumn} from '../../../theme/@vex/interfaces/table-column.interface';
import {NgxSpinnerService} from "ngx-spinner";
import {Observable} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {VariantsState} from "../../store/variants.state";
import {Variants} from "../../store/variants.actions";
import {withLatestFrom} from "rxjs/operators";
import {VariantModalComponent} from "../modals/variant-modal/variant-modal.component";
import {toSignal} from "@angular/core/rxjs-interop";
import {TableTypeEnum} from "../../models/enums/table-type.enum";

@Component({
  selector: "variant-list",
  templateUrl: "./variant-list.component.html",
  styleUrls: ["./variant-list.component.scss"],
})
export class VariantListComponent {
  columns: TableColumn<Variant>[] = [
    {label: 'Name', property: 'name', type: 'text', visible: true, cssClasses: ['font-medium']},
    {label: 'Gene', property: 'gene', type: 'text', visible: true, cssClasses: ['font-medium']},
    {
      label: 'Location',
      property: 'location',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'Variant Type',
      property: 'variantType',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {label: 'Actions', property: 'actions', type: 'button', visible: true}
  ];
  menuItems: MenuItem<Variant>[] = [
    {id: 1, label: 'View', icon: 'visibility'},
  ];

  @ViewChild('variantModalRef', {static: true})
  variantModalRef!: VariantModalComponent;
  @Select(VariantsState.getVariantsList)
  public variants$!: Observable<Variant[]>;
  variantsSignal = toSignal(this.variants$);
  tableType = TableTypeEnum.pagination;
  protected readonly TableTypeEnum = TableTypeEnum;

  constructor(private store: Store, private spinner: NgxSpinnerService) {}

  menuItemClicked(item: { data: any; id: number }) {
    switch (item.id) {
      case 1:
        this.store.dispatch(new Variants.SetSelectedVariant(item.data)).subscribe(() => {
          this.variantModalRef.show();
        });
        break;
      default:
        break;
    }
  }

  public onPageChangeEvent($event: any): void {
    this.scrollPageToStart();
    if ($event.isLastPage) {
      this.spinner.show();
      setTimeout(() => {
        this.store.dispatch(new Variants.GenerateNewBatch());
        this.spinner.hide();
      }, 1000);

    }
  }

  public onEndOfPageReached() {
    this.store.dispatch(new Variants.GenerateNewBatch());
  }

  private scrollPageToStart(): void {
    window.scrollTo(0, 0);
  }
}
