import { Moment } from 'moment';

export interface IRbacUser {
    id?: number;
    appId?: number;
    storeId?: number;
    userCode?: string;
    userPassword?: string;
    userName?: string;
    userMobile?: string;
    userMail?: string;
    userLastLoginTime?: Moment;
    userLoginCount?: number;
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
    organizationCd?:string;
}

export class RbacUser implements IRbacUser {
    constructor(
        public id?: number,
        public appId?: number,
        public storeId?: number,
        public userCode?: string,
        public userPassword?: string,
        public userName?: string,
        public userMobile?: string,
        public userMail?: string,
        public userLastLoginTime?: Moment,
        public userLoginCount?: number,
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
