import { Moment } from 'moment';

export interface IHstServerInfoDetails {
    id?: number;
    appId?: number;
    storeId?: number;
    infoId?: number;
    hostName?: string;
    ipAddress?: string;
    osUser?: string;
    osName?: string;
    osVersion?: string;
    osArch?: string;
    stopFlag?: number;
    delFlag?: number;
    insProgarmCd?: string;
    insOperCd?: string;
    insDateTime?: Moment;
    updProgarmCd?: string;
    updOperCd?: string;
    updDateTime?: Moment;
    delProgarmCd?: string;
    delOperCd?: string;
    delDateTime?: Moment;
    triggerDateTime?: Moment;
}

export class HstServerInfoDetails implements IHstServerInfoDetails {
    constructor(
        public id?: number,
        public appId?: number,
        public storeId?: number,
        public infoId?: number,
        public hostName?: string,
        public ipAddress?: string,
        public osUser?: string,
        public osName?: string,
        public osVersion?: string,
        public osArch?: string,
        public stopFlag?: number,
        public delFlag?: number,
        public insProgarmCd?: string,
        public insOperCd?: string,
        public insDateTime?: Moment,
        public updProgarmCd?: string,
        public updOperCd?: string,
        public updDateTime?: Moment,
        public delProgarmCd?: string,
        public delOperCd?: string,
        public delDateTime?: Moment,
        public triggerDateTime?: Moment
    ) {}
}
