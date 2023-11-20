import {HttpClientModule} from "@angular/common/http";
import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {VariantModalComponent} from "./variant-modal.component";
import {NgxsModule} from "@ngxs/store";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

describe('VariantModalComponent', () => {
  let component: VariantModalComponent;
  let fixture: ComponentFixture<VariantModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VariantModalComponent],
      imports: [HttpClientModule,
        NgxsModule.forRoot([]),
        MatDialogModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
