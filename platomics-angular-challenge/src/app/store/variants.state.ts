import {Injectable} from '@angular/core';
import {Action, NgxsOnInit, Selector, State, StateContext} from '@ngxs/store';
import {Variants} from './variants.actions';
import {faker} from '@faker-js/faker';
import {Variant} from "../models/variant";
import {append, patch} from "@ngxs/store/operators";

export interface VariantsStateModel {
  variants: Variant[];
  selectedVariant: Variant | null;
}

@Injectable()
@State<VariantsStateModel>({
  name: 'variants',
  defaults: {
    variants: [],
    selectedVariant: null
  },
})
export class VariantsState implements NgxsOnInit {
  constructor() {}

  ngxsOnInit(ctx: StateContext<VariantsStateModel>): void {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      variants: this.generateVariantBatch(),
    });
  }

  @Selector()
  static getVariantsList(state: VariantsStateModel): Variant[] {
    return state.variants;
  }

  @Selector()
  static getSelectedVariant(state: VariantsStateModel) {
    return state.selectedVariant;
  }

  @Action(Variants.GetAll)
  getData(ctx: StateContext<VariantsStateModel>): void {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      variants: this.generateVariantBatch(),
    });
  }

  @Action(Variants.SetSelectedVariant)
  setSelectedVariant(ctx: StateContext<VariantsStateModel>, {payload}: Variants.SetSelectedVariant) {
    const state = ctx.getState();
    const variantsList = [...state.variants];
    const variantIndex = variantsList.findIndex(item => item.id === payload?.id);
    let result = variantsList[variantIndex];
    ctx.setState({
      ...state,
      selectedVariant: payload !== null ? result : payload
    });

  }

  @Action(Variants.Classify)
  classifyVariant(ctx: StateContext<VariantsStateModel>, {payload, id}: Variants.Classify): void {
    const state = ctx.getState();
    const variantsList = [...state.variants];
    const variantIndex = variantsList.findIndex(item => item.id === id);
    variantsList[variantIndex].classification = payload.classification;
    ctx.setState({
      ...state,
      variants: variantsList,
    });
  }


  @Action(Variants.GenerateNewBatch)
  addNewVariants(ctx: StateContext<VariantsStateModel>): void {
    const newVariants = this.generateVariantBatch();
    ctx.setState(
      patch<VariantsStateModel>({
        variants: append(newVariants)
      })
    );
  }

  private generateVariantBatch(): Variant[] {
    const variants: Variant[] = [];
    for (let i = 0; i < 1000; i++) {
      const variant = this.generateVariant();
      variants.push(variant);
    }
    return variants;
  }

  private generateVariant(): Variant {
    return {
      id: faker.string.uuid(),
      name: `Variant ${faker.lorem.word()}`,
      gene: faker.lorem.word(),
      location: `Chromosome ${faker.number.int(22)}:${faker.number.int(
        1000000
      )}`,
      variantType: faker.helpers.arrayElement([
        'Missense Mutation',
        'Frameshift Deletion',
        'Insertion',
      ]),
      frequency: `${faker.number.int({min: 1, max: 10}) / 100}%`,
      pathogenicity: faker.helpers.arrayElement([
        'Benign',
        'Likely Benign',
        'Uncertain Significance',
        'Likely Pathogenic',
        'Pathogenic',
      ]),
      exon: faker.number.int({min: 1, max: 20}),
      clinicalSignificance: faker.lorem.sentence(),
      references: [faker.string.uuid(), faker.string.uuid()],
    };
  }
}
