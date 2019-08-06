import { Moment } from 'moment';

export interface IQmsDefect {
    id?: number;
    defectCd?: string;
    defectName?: string;
    parentCd?: string;
    isUse?: string;
    flagStatus?: string;
    compPkid?: string;
    remark?: string;
    makeUser?: string;
    makeTime?: Moment;
    modifyUser?: string;
    modifyTime?: Moment;
}

export class QmsDefect implements IQmsDefect {
    constructor(
        public id?: number,
        public defectCd?: string,
        public defectName?: string,
        public parentCd?: string,
        public isUse?: string,
        public flagStatus?: string,
        public compPkid?: string,
        public remark?: string,
        public makeUser?: string,
        public makeTime?: Moment,
        public modifyUser?: string,
        public modifyTime?: Moment
    ) {}
}
