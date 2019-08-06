import { Moment } from 'moment';

export interface IQmsEquipment {
    id?: number;
    equipmentCd?: string;
    equipmentName?: string;
    flagStatus?: string;
    compPkid?: string;
    remark?: string;
    makeUser?: string;
    makeTime?: Moment;
    modifyUser?: string;
    modifyTime?: Moment;
}

export class QmsEquipment implements IQmsEquipment {
    constructor(
        public id?: number,
        public equipmentCd?: string,
        public equipmentName?: string,
        public flagStatus?: string,
        public compPkid?: string,
        public remark?: string,
        public makeUser?: string,
        public makeTime?: Moment,
        public modifyUser?: string,
        public modifyTime?: Moment
    ) {}
}
