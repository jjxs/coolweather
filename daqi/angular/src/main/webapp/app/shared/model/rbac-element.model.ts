import { Moment } from 'moment';

export interface IRbacElement {
    id?: number;
    appId?: number;
    storeId?: number;
    elementCode?: string;
    menuId?: number;
    isDis?: number;
    stopFlag?: number;
    delFlage?: number;
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

export class RbacElement implements IRbacElement {
    constructor(
        public id?: number,
        public appId?: number,
        public storeId?: number,
        public elementCode?: string,
        public menuId?: number,
        public isDis?: number,
        public stopFlag?: number,
        public delFlage?: number,
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
