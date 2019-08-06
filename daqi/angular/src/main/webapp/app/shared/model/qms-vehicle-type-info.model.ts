import { Moment } from 'moment';

export interface IQmsVehicleTypeInfo {
    id?: number;
    vehicleClassId?: number;
    vehicleType?: string;
    vehicleTypeName?: string;
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

export class QmsVehicleTypeInfo implements IQmsVehicleTypeInfo {
    constructor(
        public id?: number,
        public vehicleClassId?: number,
        public vehicleType?: string,
        public vehicleTypeName?: string,
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
