import { Moment } from 'moment';

export interface IQmsQualityControl {
    id?: number;
    vehicleType?: string;
    productionCd?: string;
    productionName?: string;
    technologyCd?: string;
    technologyName?: string;
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

export class QmsQualityControl implements IQmsQualityControl {
    constructor(
        public id?: number,
        public vehicleType?: string,
        public productionCd?: string,
        public productionName?: string,
        public technologyCd?: string,
        public technologyName?: string,
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
