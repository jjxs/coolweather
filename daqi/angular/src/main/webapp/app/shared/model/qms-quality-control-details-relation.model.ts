import { Moment } from 'moment';

export interface IQmsQualityControlDetailsRelation {
    id?: number;
    vehicleType?: string;
    qualityControlNumber?: string;
    assemblyCd?: string;
    assemblyMaterielCd?: string;
    assemblyMaterielName?: string;
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

export class QmsQualityControlDetailsRelation implements IQmsQualityControlDetailsRelation {
    constructor(
        public id?: number,
        public vehicleType?: string,
        public qualityControlNumber?: string,
        public assemblyCd?: string,
        public assemblyMaterielCd?: string,
        public assemblyMaterielName?: string,
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
