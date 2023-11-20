import {HttpClientModule} from "@angular/common/http";
import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ScrollTableComponent} from "./scroll-datatable.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('ScrollTableComponent', () => {
  let component: ScrollTableComponent;
  let fixture: ComponentFixture<ScrollTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ScrollTableComponent,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([]),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
