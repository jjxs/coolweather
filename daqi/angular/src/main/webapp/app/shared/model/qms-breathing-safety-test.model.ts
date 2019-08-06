import { Moment } from 'moment';

export interface IQmsBreathingSafetyTest {
    id?: number;
    mcgsTime?: string;
    mcgsTimems?: string;
    mcgsDate?: string;
    ctype?: string;
    safetyValve?: string;
    respiratoryPressure?: string;
    pinspl?: string;
    checkUser?: string;
    mfyl?: string;
    mfyc?: string;
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

export class QmsBreathingSafetyTest implements IQmsBreathingSafetyTest {
    constructor(
        public id?: number,
        public mcgsTime?: string,
        public mcgsTimems?: string,
        public mcgsDate?: string,
        public ctype?: string,
        public safetyValve?: string,
        public respiratoryPressure?: string,
        public pinspl?: string,
        public checkUser?: string,
        public mfyl?: string,
        public mfyc?: string,
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
