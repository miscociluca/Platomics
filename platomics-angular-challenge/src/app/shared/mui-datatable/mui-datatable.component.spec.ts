import {HttpClientModule} from "@angular/common/http";
import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MuiDataTableComponent} from "./mui-datatable.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('MuiDataTableComponent', () => {
  let component: MuiDataTableComponent;
  let fixture: ComponentFixture<MuiDataTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        MuiDataTableComponent,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([]),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuiDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
