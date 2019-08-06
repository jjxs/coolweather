import { Moment } from 'moment';

export interface IQmsNrvTelation {
    id?: number;
    vehicleType?: string;
    vehicleCd?: string;
    materielCd?: string;
    parentMaterielCd?: string;
    serialNumber?: string;
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

export class QmsNrvTelation implements IQmsNrvTelation {
    constructor(
        public id?: number,
        public vehicleType?: string,
        public vehicleCd?: string,
        public materielCd?: string,
        public parentMaterielCd?: string,
        public serialNumber?: string,
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
    ) {}
}
