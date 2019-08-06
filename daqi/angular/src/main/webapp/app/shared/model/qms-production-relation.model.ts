import { Moment } from 'moment';

export interface IQmsProductionRelation {
    id?: number;
    productionInspectionId?: number;
    assemblyId?: number;
    doProductId?: number;
    actualUseLocation?: string;
    assemblyMaterielId?: number;
    useProductId?: number;
    fromDiff?: string;
    confirmUser1?: string;
    confirmTime1?: Moment;
    confirmUser2?: string;
    confirmTime2?: Moment;
    remark?: string;
    flagStatus?: string;
    compPkid?: string;
    reserveFirst?: string;
    reserveSecond?: string;
    reserveThird?: string;
    makeUser?: string;
    makeTime?: Moment;
    modifyUser?: string;
    modifyTime?: Moment;
}

export class QmsProductionRelation implements IQmsProductionRelation {
    constructor(
        public id?: number,
        public productionInspectionId?: number,
        public assemblyId?: number,
        public doProductId?: number,
        public actualUseLocation?: string,
        public assemblyMaterielId?: number,
        public useProductId?: number,
        public fromDiff?: string,
        public confirmUser1?: string,
        public confirmTime1?: Moment,
        public confirmUser2?: string,
        public confirmTime2?: Moment,
        public remark?: string,
        public flagStatus?: string,
        public compPkid?: string,
        public reserveFirst?: string,
        public reserveSecond?: string,
        public reserveThird?: string,
        public makeUser?: string,
        public makeTime?: Moment,
        public modifyUser?: string,
        public modifyTime?: Moment
    ) {}
}
