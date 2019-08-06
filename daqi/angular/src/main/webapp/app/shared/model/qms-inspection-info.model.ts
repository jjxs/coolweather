import { Moment } from 'moment';

export interface IQmsInspectionInfo {
    id?: number;
    vehicleType?: string;
    no?: number;
    vehicleTypeName?: string;
    constitutiveCoding?: string;
    constitutiveName?: string;
    constitutiveCodingName?: string;
    vehicleNumber?: string;
    componentNumber?: string;
    flagStatus?: string;
    compPkid?: string;
    makeUser?: string;
    makeTime?: Moment;
    modifyUser?: string;
    modifyTime?: Moment;
}

export class QmsInspectionInfo implements IQmsInspectionInfo {
    constructor(
        public id?: number,
        public vehicleType?: string,
        public no?: number,
        public vehicleTypeName?: string,
        public constitutiveCoding?: string,
        public constitutiveName?: string,
        public constitutiveCodingName?: string,
        public vehicleNumber?: string,
        public componentNumber?: string,
        public flagStatus?: string,
        public compPkid?: string,
        public makeUser?: string,
        public makeTime?: Moment,
        public modifyUser?: string,
        public modifyTime?: Moment
    ) {}
}
