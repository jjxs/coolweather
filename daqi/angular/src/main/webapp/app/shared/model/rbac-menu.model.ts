import { Moment } from 'moment';

export interface IRbacMenu {
    id?: number;
    appId?: number;
    storeId?: number;
    pMenuId?: number;
    menuCode?: string;
    menuName?: string;
    menuUrl?: string;
    menuIcon?: string;
    menuLable?: string;
    menuMobileFlag?: number;
    menuHostSlaveFlag?: number;
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

export class RbacMenu implements IRbacMenu {
    constructor(
        public id?: number,
        public appId?: number,
        public storeId?: number,
        public pMenuId?: number,
        public menuCode?: string,
        public menuName?: string,
        public menuUrl?: string,
        public menuIcon?: string,
        public menuLable?: string,
        public menuMobileFlag?: number,
        public menuHostSlaveFlag?: number,
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
