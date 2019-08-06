import { Moment } from 'moment';

export interface IPapiToken {
    id?: number;
    appId?: number;
    storeId?: number;
    apiCode?: string;
    apiPassword?: string;
    apiToken?: string;
    apiCount?: number;
    apiDate?: Moment;
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

export class PapiToken implements IPapiToken {
    constructor(
        public id?: number,
        public appId?: number,
        public storeId?: number,
        public apiCode?: string,
        public apiPassword?: string,
        public apiToken?: string,
        public apiCount?: number,
        public apiDate?: Moment,
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
