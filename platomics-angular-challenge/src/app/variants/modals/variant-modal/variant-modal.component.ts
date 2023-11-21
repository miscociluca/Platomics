import {Component, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {Classification, Variant} from '../../../models/variant';
import {VariantsState} from "../../../store/variants.state";
import {Observable} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {Variants} from "../../../store/variants.actions";

@Component({
    selector: 'variant-modal',
    templateUrl: './variant-modal.component.html',
    styleUrls: ['./variant-modal.component.scss']
})
export class VariantModalComponent {
    @Select(VariantsState.getSelectedVariant) selectedVariant?: Observable<Variant>;
    modalRef?: MatDialogRef<VariantModalComponent>;
    public readonly Classification = Classification;
    classificationStates = [
        Classification.Benign,
        Classification["Likely Benign"],
        Classification["Uncertain Significance"],
        Classification["Likely Pathogenic"],
        Classification.Pathogenic]
    form!: FormGroup;
    config: MatDialogConfig = {
        hasBackdrop: true,
    };
    @ViewChild('template', {static: true}) template?: TemplateRef<any>;
    isUpdating?: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store,
        public dialog: MatDialog
    ) {
        this.form = this.createFormGroupWithBuilder(this.formBuilder);
    }

    show() {
        this.form.reset();
        this.form.patchValue({
            enabled: false
        });
        this.selectedVariant?.subscribe(variant => {
            if (variant) {
                this.form.patchValue({
                    name: variant.name,
                    id: variant.id || undefined,
                    variantType: variant.variantType,
                    gene: variant.gene,
                    location: variant.location,
                    pathogenicity: variant.pathogenicity,
                    frequency: variant.frequency,
                    exon: variant.exon,
                    clinicalSignificance: variant.clinicalSignificance,
                    references: variant.references?.join(" , "),
                    classification: variant?.classification
                });
            }
        })
        this.template ? this.modalRef = this.dialog.open(this.template, this.config) : null;
    }

    private createFormGroupWithBuilder(formBuilder: FormBuilder): FormGroup {
        return formBuilder.group({
            id: formBuilder.control(null),
            name: formBuilder.control(null),
            variantType: formBuilder.control({value: null, disabled: true}),
            gene: formBuilder.control({value: null, disabled: true}),
            location: formBuilder.control({value: null, disabled: true}),
            pathogenicity: formBuilder.control({value: null, disabled: true}),
            frequency: formBuilder.control({value: null, disabled: true}),
            exon: formBuilder.control({value: null, disabled: true}),
            clinicalSignificance: formBuilder.control({value: null, disabled: true}),
            references: formBuilder.control({value: null, disabled: true}),
            classification: this.formBuilder.control(null),
        });
    }

    public save() {
        if (this.form?.invalid) {
            return;
        }
        const formData = this.form?.getRawValue();
        const updatedVariant: any = {
            id: formData.id,
            classification: formData.classification
        };
        if (!this.isUpdating) {
            this.store.dispatch(new Variants.Classify(updatedVariant, updatedVariant.id)).subscribe(() => {
                this.clearForm();
            })
        }
    }

    clearForm() {
        this.store.dispatch(new Variants.SetSelectedVariant(null)).subscribe(() => {
            this.form?.markAsPristine();
            this.modalRef?.close();
            this.isUpdating = false;
        })
    }
}
