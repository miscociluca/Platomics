import {HttpClientModule} from "@angular/common/http";
import {async, ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MuiDataTableComponent} from "./mui-datatable.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {VariantListComponent} from "../../variants/variant-list/variant-list.component";
import {MatTableModule} from "@angular/material/table";
import {MenuItem} from "../../../theme/@vex/interfaces/table-column.interface";
import {Variant} from "../../models/variant";

describe('MuiDataTableComponent', () => {
    let component: MuiDataTableComponent;
    let fixture: ComponentFixture<MuiDataTableComponent>;
    const variantsDump = [
        {
            clinicalSignificance: "Audacia totam usque somnus tepidus.",
            exon: 5,
            frequency: "0.03%",
            gene: "dedico",
            id: "62c95c4f-9dbe-43e6-bbac-ce4633ae4a0d",
            location: "Chromosome 4:921871",
            name: "Variant error",
            pathogenicity: "Likely Pathogenic",
            references: ['759f2560-2704-4392-ae7b-38b5b87c7499', 'c7c5fe7d-dd86-467d-b630-bbcac4807bb6'],
            variantType: "Insertion",
        },
        {
            clinicalSignificance: "Audacia totam usque somnus tepidus2",
            exon: 5,
            frequency: "0.03%",
            gene: "dedico",
            id: "62c95c4f-9dbe-43e6-bbac-ce4633ae4a0d",
            location: "Chromosome 4:921871",
            name: "Variant amo",
            pathogenicity: "Pathogenic",
            references: ['759f2560-2704-4392-ae7b-38b5b87c7499', 'c7c5fe7d-dd86-467d-b630-bbcac4807bb6'],
            variantType: "Insertion",
        },
        {
            clinicalSignificance: "Audacia totam usque somnus tepidus3",
            exon: 5,
            frequency: "0.03%",
            gene: "dedico",
            id: "62c95c4f-9dbe-43e6-bbac-ce4633ae4a0d",
            location: "Chromosome 4:921871",
            name: "Variant error",
            pathogenicity: "Likely Pathogenic",
            references: ['759f2560-2704-4392-ae7b-38b5b87c7499', 'c7c5fe7d-dd86-467d-b630-bbcac4807bb6'],
            variantType: "Insertion",
        },

    ];
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
        component.pageSize = 10;
        component.pageSizeOptions = [50, 100, 200, 1000];
        component.title = "Variants";
        component.data = variantsDump;
        component.dummyDataSignal.set(variantsDump ?? []);
        component.menuItems = [
            {id: 1, label: 'View', icon: 'visibility'},
        ];
        component.columns = [
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
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show our variants data', () => {
        const ourDomTableUnderTest = document.querySelector('table#muiTable');
        if (ourDomTableUnderTest) {
            const variantsInTable = Array.from(
                ourDomTableUnderTest.getElementsByClassName('mat-row')
            );
            variantsInTable.forEach(variant => {
                const variantName = variant
                    .getElementsByClassName('mat-column-name')
                    .item(0)?.textContent;
                const variantGene = variant
                    .getElementsByClassName('mat-column-gene')
                    .item(0)?.textContent;
                const variantLocation = variant
                    .getElementsByClassName('mat-column-location')
                    .item(0)?.textContent;
                expect(variantsDump).toContain(
                    jasmine.objectContaining({
                        name: variantName,
                        gene: variantGene,
                        location: variantLocation
                    })
                );
            });
        }
    });

    it('should show the columns we expect', () => {
        const ourDomTableUnderTest = document.querySelector('table#muiTable');
        if (ourDomTableUnderTest) {
            const tableHeaders = Array.from(
                ourDomTableUnderTest.getElementsByClassName('mat-header-cell')
            );
            const headerClasses = [
                'mat-column-name',
                'mat-column-gene',
                'mat-column-location'
            ];
            tableHeaders.forEach(header => {
                expect(headerClasses.some(item => header.classList.contains(item))).toBeTruthy();
            });
        }
    });
});
