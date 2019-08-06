import { Moment } from 'moment';

export interface IQmsUnhealthy {
    id?: number;
    unhealthyCd?: string;
    unhealthyName?: string;
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

export class QmsUnhealthy implements IQmsUnhealthy {
    constructor(
        public id?: number,
        public unhealthyCd?: string,
        public unhealthyName?: string,
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
