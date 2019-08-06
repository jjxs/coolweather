import { Moment } from 'moment';

export interface IQmsVehicleTypeClass {
    id?: number;
    vehicleClass?: string;
    vehicleClassName?: string;
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

export class QmsVehicleTypeClass implements IQmsVehicleTypeClass {
    constructor(
        public id?: number,
        public vehicleClass?: string,
        public vehicleClassName?: string,
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
