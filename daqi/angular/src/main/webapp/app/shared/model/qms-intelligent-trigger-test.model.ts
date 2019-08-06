import { Moment } from 'moment';

export interface IQmsIntelligentTriggerTest {
    id?: number;
    num?: string;
    sideframeLeft?: string;
    leftValue1?: string;
    leftValue2?: string;
    sideframeRight?: string;
    rightValue1?: string;
    rightValue2?: string;
    leftUser?: string;
    rightUser?: string;
    flagStatus?: string;
    compPkid?: string;
    remark?: string;
    reserveFirst?: string;
    reserveSecond?: string;
    reserveThird?: string;
    makeUser?: string;
    makeTime?: Moment;
    modifyUser?: string;
    modifyTime?: Moment;
}

export class QmsIntelligentTriggerTest implements IQmsIntelligentTriggerTest {
    constructor(
        public id?: number,
        public num?: string,
        public sideframeLeft?: string,
        public leftValue1?: string,
        public leftValue2?: string,
        public sideframeRight?: string,
        public rightValue1?: string,
        public rightValue2?: string,
        public leftUser?: string,
        public rightUser?: string,
        public flagStatus?: string,
        public compPkid?: string,
        public remark?: string,
        public reserveFirst?: string,
        public reserveSecond?: string,
        public reserveThird?: string,
        public makeUser?: string,
        public makeTime?: Moment,
        public modifyUser?: string,
        public modifyTime?: Moment
    ) {}
}
