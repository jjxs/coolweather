import { Moment } from 'moment';

export interface IRbacUserRightRelation {
    id?: number;
    appId?: number;
    storeId?: number;
    roleId?: number;
    userId?: number;
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

export class RbacUserRightRelation implements IRbacUserRightRelation {
    constructor(
        public id?: number,
        public appId?: number,
        public storeId?: number,
        public roleId?: number,
        public userId?: number,
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
