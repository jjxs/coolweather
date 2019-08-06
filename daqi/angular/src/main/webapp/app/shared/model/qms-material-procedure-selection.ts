
export interface IQmsMaterialProcedureSelection {
    vehicleType?: string;
    vehicleTypeName?: string;
    technologyCd?: string;
    technologyName?: string;
    materielCd?: string;
    materielName?: string;
    numberCount?: string;
 
}

export class QmsMaterialProcedureSelection implements IQmsMaterialProcedureSelection {
    constructor(
        public vehicleType?: string,
        public vehicleTypeName?: string,
        public technologyCd?: string,
        public technologyName?: string,
        public materielCd?: string,
        public numberCount?: string,
        public materielName?: string
    ) {}
}
