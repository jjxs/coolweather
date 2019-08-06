import { Moment } from 'moment';

export interface IHstServerInfo {
    id?: number;
    appId?: number;
    storeId?: number;
    hostSlaveFlag?: number;
    nodeId?: string;
    pNodeId?: string;
    nodeUrl?: string;
    nodeJoinTime?: Moment;
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

export class HstServerInfo implements IHstServerInfo {
    constructor(
        public id?: number,
        public appId?: number,
        public storeId?: number,
        public hostSlaveFlag?: number,
        public nodeId?: string,
        public pNodeId?: string,
        public nodeUrl?: string,
        public nodeJoinTime?: Moment,
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
