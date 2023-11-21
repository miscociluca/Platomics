import {HttpClientModule} from "@angular/common/http";
import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {VariantModalComponent} from "./variant-modal.component";
import {NgxsModule} from "@ngxs/store";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Variant} from "../../../models/variant";
import {of} from "rxjs";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

describe('VariantModalComponent', () => {
    let component: VariantModalComponent;
    let fixture: ComponentFixture<VariantModalComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [VariantModalComponent],
            imports: [HttpClientModule,
                ReactiveFormsModule,
                FormsModule,
                NgxsModule.forRoot([]),
                MatDialogModule,
                MatIconModule,
                MatDividerModule,
                MatInputModule,
                MatButtonModule,
                FlexLayoutModule,
                MatCheckboxModule,
                MatSelectModule,
                MatAutocompleteModule,
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
        component.form = new FormGroup({
            id: new FormControl(null),
            name: new FormControl(null),
            variantType: new FormControl({value: null, disabled: true}),
            gene: new FormControl({value: null, disabled: true}),
            location: new FormControl({value: null, disabled: true}),
            pathogenicity: new FormControl({value: null, disabled: true}),
            frequency: new FormControl({value: null, disabled: true}),
            exon: new FormControl({value: null, disabled: true}),
            clinicalSignificance: new FormControl({value: null, disabled: true}),
            references: new FormControl({value: null, disabled: true}),
            classification: new FormControl(null),
        });
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('form valid when empty', () => {
        expect(component.form.valid).toBeTruthy();
    });

    it('classification field validity', () => {
        let classification = component.form.controls['classification'];
        expect(classification.valid).toBeTruthy();
    });

    it('submitting a form classifies a variant', () => {
        expect(component.form.valid).toBeTruthy();
        component.form.controls['id'].setValue("62c95c4f-9dbe-43e6-bbac-ce4633ae4a0d");
        component.form.controls['name'].setValue("Variant error");
        component.form.controls['variantType'].setValue("Insertion");
        component.form.controls['gene'].setValue("dedico");
        component.form.controls['location'].setValue("Chromosome 4:921871");
        component.form.controls['pathogenicity'].setValue("Likely Pathogenic");
        component.form.controls['frequency'].setValue("0.03%");
        component.form.controls['exon'].setValue(5);
        component.form.controls['clinicalSignificance'].setValue("Audacia totam usque somnus tepidus.");
        component.form.controls['references'].setValue(['759f2560-2704-4392-ae7b-38b5b87c7499', 'c7c5fe7d-dd86-467d-b630-bbcac4807bb6']);

        let variant: Variant;
        component.template ? component.modalRef = component.dialog.open(component.template, component.config) : null;
        component.show();
        component.save();
        expect(component.form.markAsPristine).toBeTruthy();
        expect(component.modalRef?.close).toBeTruthy();
        expect(component.isUpdating).toBeFalsy();
    });
});
