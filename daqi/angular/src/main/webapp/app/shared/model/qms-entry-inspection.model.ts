import { Moment } from 'moment';

export interface IQmsEntryInspection {
    id?: number;
    materielId?: number;
    supplierId?: number;
    okNumber?: number;
    ngNumber?: number;
    serialNumber?: string;
    productionCd?: string;
    checkDate?: Moment;
    fileNumber?: string;
    flagStatus?: string;
    compPkid?: string;
    entryId?: number;
    remark?: string;
    groupCd?: string;
    reserveFirst?: string;
    reserveSecond?: string;
    reserveThird?: string;
    makeUser?: string;
    makeTime?: Moment;
    modifyUser?: string;
    modifyTime?: Moment;
}

export class QmsEntryInspection implements IQmsEntryInspection {
    constructor(
        public id?: number,
        public materielId?: number,
        public supplierId?: number,
        public okNumber?: number,
        public ngNumber?: number,
        public serialNumber?: string,
        public productionCd?: string,
        public checkDate?: Moment,
        public fileNumber?: string,
        public flagStatus?: string,
        public compPkid?: string,
        public entryId?: number,
        public remark?: string,
        public groupCd?: string,
        public reserveFirst?: string,
        public reserveSecond?: string,
        public reserveThird?: string,
        public makeUser?: string,
        public makeTime?: Moment,
        public modifyUser?: string,
        public modifyTime?: Moment
    ) {}
}
