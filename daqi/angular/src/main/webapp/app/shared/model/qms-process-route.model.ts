import { Moment } from 'moment';

export interface IQmsProcessRoute {
    id?: number;
    materielId?: number;
    orderNumber?: number;
    processNumber?: string;
    processName?: string;
    timeQuota?: number;
    equipmentCd?: string;
    processEquipment?: string;
    organizationCd?: string;
    flagStatus?: string;
    compPkid?: string;
    remark?: string;
    makeUser?: string;
    makeTime?: Moment;
    modifyUser?: string;
    modifyTime?: Moment;
}

export class QmsProcessRoute implements IQmsProcessRoute {
    constructor(
        public id?: number,
        public materielId?: number,
        public orderNumber?: number,
        public processNumber?: string,
        public processName?: string,
        public timeQuota?: number,
        public equipmentCd?: string,
        public processEquipment?: string,
        public organizationCd?: string,
        public flagStatus?: string,
        public compPkid?: string,
        public remark?: string,
        public makeUser?: string,
        public makeTime?: Moment,
        public modifyUser?: string,
        public modifyTime?: Moment
    ) {}
}
