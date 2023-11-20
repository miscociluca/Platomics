import {Variant} from "../models/variant";

export namespace Variants {

  export class GetAll {
    static readonly type = '[Variants API] Get All Variants';

    constructor() {
    }
  }

  export class GenerateNewBatch {
    static readonly type = '[Variants API] Generate New Batch of Variants';

    constructor() {
    }
  }

  export class Classify {
    static readonly type = '[Variants API] Classify Variant';

    constructor(public payload: Variant, public id: string) {
    }
  }

  export class SetSelectedVariant {
    static readonly type = '[Variants API] Set Selected Variant';

    constructor(public payload: Variant | null) {
    }
  }
}
