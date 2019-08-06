import { Moment } from 'moment';

export interface IQmsOrganizationInfo {
    id?: number;
    parentCd?: string;
    organizationCd?: string;
    organizationName?: string;
    attribute?: string;
    flagStatus?: string;
    compPkid?: string;
    remark?: string;
    makeUser?: string;
    makeTime?: Moment;
    modifyUser?: string;
    modifyTime?: Moment;
}

export class QmsOrganizationInfo implements IQmsOrganizationInfo {
    constructor(
        public id?: number,
        public parentCd?: string,
        public organizationCd?: string,
        public organizationName?: string,
        public attribute?: string,
        public flagStatus?: string,
        public compPkid?: string,
        public remark?: string,
        public makeUser?: string,
        public makeTime?: Moment,
        public modifyUser?: string,
        public modifyTime?: Moment
    ) {}
}
