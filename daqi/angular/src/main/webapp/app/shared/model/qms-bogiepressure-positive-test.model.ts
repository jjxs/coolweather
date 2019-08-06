import { Moment } from 'moment';

export interface IQmsBogiepressurePositiveTest {
    id?: number;
    place?: string;
    bolster?: string;
    sideframeLeft?: string;
    sideframeRight?: string;
    crossstaffLeft?: string;
    crossstaffRight?: string;
    checkdate?: string;
    checktime?: string;
    workno?: string;
    checkvalue1?: string;
    checkvalue2?: string;
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

export class QmsBogiepressurePositiveTest implements IQmsBogiepressurePositiveTest {
    constructor(
        public id?: number,
        public place?: string,
        public bolster?: string,
        public sideframeLeft?: string,
        public sideframeRight?: string,
        public crossstaffLeft?: string,
        public crossstaffRight?: string,
        public checkdate?: string,
        public checktime?: string,
        public workno?: string,
        public checkvalue1?: string,
        public checkvalue2?: string,
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
