import { Moment } from 'moment';

export interface IBomInformation {
    id?: number;
    vehicleId?: number;
    vehicleName?: string;
    materielId?: number;
    materielCd?: string;
    parentMaterielID?: number;
    rootMaterielId?: number;
    vId?: number;
    mId?: number;
    parentMaterielName?: string;
    materielName?: string;
    sequence?: number;
    quantity?: number;
    isMust?: string;
    supplyType?: string;
    flagStatus?: string;
    compPkid?: string;
    remark?: string;
    reserveFirst?: string;
    reserveSecond?: string;
    reserveThird?: string;
    makeUser?: string;
    makeTime?: Moment;
    modifyUser?: string;
    modifyTime?: Moment;
}

export class BomInformation implements IBomInformation {
    constructor(
        public id?: number,
        public vehicleId?: number,
        public materielCd?: string,
        public vehicleName?: string,
        public materielId?: number,
        public parentMaterielID?: number,
        public rootMaterielId?: number,
        public vId?: number,
        public mId?: number,
        public parentMaterielName?: string,
        public materielName?: string,
        public sequence?: number,
        public quantity?: number,
        public isMust?: string,
        public supplyType?: string,
        public flagStatus?: string,
        public compPkid?: string,
        public remark?: string,
        public reserveFirst?: string,
        public reserveSecond?: string,
        public reserveThird?: string,
        public makeUser?: string,
        public makeTime?: Moment,
        public modifyUser?: string,
        public modifyTime?: Moment
    ) { }
}
