import {HttpClientModule} from "@angular/common/http";
import {async, ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {VariantListComponent} from "./variant-list.component";
import {NgxsModule} from "@ngxs/store";
import {VariantModalComponent} from "../modals/variant-modal/variant-modal.component";
import {MatDialogModule} from "@angular/material/dialog";
import {NgxSpinnerModule} from "ngx-spinner";
import {MuiDataTableComponent} from "../../shared/mui-datatable/mui-datatable.component";
import {ScrollTableComponent} from "../../shared/infinite-scolling-datatable/scroll-datatable.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTableModule} from "@angular/material/table";

describe('VariantListComponent', () => {
  let component: VariantListComponent;
  let fixture: ComponentFixture<VariantListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VariantListComponent, VariantModalComponent],
      imports: [HttpClientModule,
        MuiDataTableComponent,
        ScrollTableComponent,
        BrowserAnimationsModule,
        NgxsModule.forRoot([]),
        MatDialogModule,
        NgxSpinnerModule.forRoot({type: 'ball-scale-multiple'}),
        RouterTestingModule.withRoutes([]),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('provides mock dependencies', () => {
    expect(component.variantModalRef).toEqual(
        jasmine.any(VariantModalComponent),
    );
    expect(
        component.variantModalRef && component.variantModalRef.modalRef,
    ).toEqual(undefined);
  });

});
