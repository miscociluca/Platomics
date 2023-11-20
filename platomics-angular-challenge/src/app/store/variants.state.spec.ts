import { NgxsModule, Store } from '@ngxs/store';
import { VariantsState } from './variants.state';
import { TestBed, async, waitForAsync } from '@angular/core/testing';

describe('Variant state actions', () => {
  let store: Store;
  let state: VariantsState;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([VariantsState])],
    }).compileComponents();
    store = TestBed.inject(Store);
    state = TestBed.inject(VariantsState);
  }));

  it('should initialize store', () => {
    expect(store).toBeDefined();
  });
});
