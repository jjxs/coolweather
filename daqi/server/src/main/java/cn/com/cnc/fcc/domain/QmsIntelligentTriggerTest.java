package cn.com.cnc.fcc.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A QmsIntelligentTriggerTest.
 */
@Entity
@Table(name = "qms_intelligent_trigger_test")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QmsIntelligentTriggerTest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 50)
    @Column(name = "num", length = 50)
    private String num;

    @Size(max = 50)
    @Column(name = "sideframe_left", length = 50)
    private String sideframeLeft;

    @Size(max = 50)
    @Column(name = "left_value_1", length = 50)
    private String leftValue1;

    @Size(max = 50)
    @Column(name = "left_value_2", length = 50)
    private String leftValue2;

    @Size(max = 50)
    @Column(name = "sideframe_right", length = 50)
    private String sideframeRight;

    @Size(max = 50)
    @Column(name = "right_value_1", length = 50)
    private String rightValue1;

    @Size(max = 50)
    @Column(name = "right_value_2", length = 50)
    private String rightValue2;

    @Size(max = 50)
    @Column(name = "left_user", length = 50)
    private String leftUser;

    @Size(max = 50)
    @Column(name = "right_user", length = 50)
    private String rightUser;

    @Size(max = 1)
    @Column(name = "flag_status", length = 1)
    private String flagStatus;

    @Size(max = 10)
    @Column(name = "comp_pkid", length = 10)
    private String compPkid;

    @Size(max = 200)
    @Column(name = "remark", length = 200)
    private String remark;

    @Size(max = 20)
    @Column(name = "reserve_first", length = 20)
    private String reserveFirst;

    @Size(max = 20)
    @Column(name = "reserve_second", length = 20)
    private String reserveSecond;

    @Size(max = 20)
    @Column(name = "reserve_third", length = 20)
    private String reserveThird;

    @Size(max = 10)
    @Column(name = "make_user", length = 10)
    private String makeUser;

    @Column(name = "make_time")
    private ZonedDateTime makeTime;

    @Size(max = 10)
    @Column(name = "modify_user", length = 10)
    private String modifyUser;

    @Column(name = "modify_time")
    private ZonedDateTime modifyTime;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNum() {
        return num;
    }

    public QmsIntelligentTriggerTest num(String num) {
        this.num = num;
        return this;
    }

    public void setNum(String num) {
        this.num = num;
    }

    public String getSideframeLeft() {
        return sideframeLeft;
    }

    public QmsIntelligentTriggerTest sideframeLeft(String sideframeLeft) {
        this.sideframeLeft = sideframeLeft;
        return this;
    }

    public void setSideframeLeft(String sideframeLeft) {
        this.sideframeLeft = sideframeLeft;
    }

    public String getLeftValue1() {
        return leftValue1;
    }

    public QmsIntelligentTriggerTest leftValue1(String leftValue1) {
        this.leftValue1 = leftValue1;
        return this;
    }

    public void setLeftValue1(String leftValue1) {
        this.leftValue1 = leftValue1;
    }

    public String getLeftValue2() {
        return leftValue2;
    }

    public QmsIntelligentTriggerTest leftValue2(String leftValue2) {
        this.leftValue2 = leftValue2;
        return this;
    }

    public void setLeftValue2(String leftValue2) {
        this.leftValue2 = leftValue2;
    }

    public String getSideframeRight() {
        return sideframeRight;
    }

    public QmsIntelligentTriggerTest sideframeRight(String sideframeRight) {
        this.sideframeRight = sideframeRight;
        return this;
    }

    public void setSideframeRight(String sideframeRight) {
        this.sideframeRight = sideframeRight;
    }

    public String getRightValue1() {
        return rightValue1;
    }

    public QmsIntelligentTriggerTest rightValue1(String rightValue1) {
        this.rightValue1 = rightValue1;
        return this;
    }

    public void setRightValue1(String rightValue1) {
        this.rightValue1 = rightValue1;
    }

    public String getRightValue2() {
        return rightValue2;
    }

    public QmsIntelligentTriggerTest rightValue2(String rightValue2) {
        this.rightValue2 = rightValue2;
        return this;
    }

    public void setRightValue2(String rightValue2) {
        this.rightValue2 = rightValue2;
    }

    public String getLeftUser() {
        return leftUser;
    }

    public QmsIntelligentTriggerTest leftUser(String leftUser) {
        this.leftUser = leftUser;
        return this;
    }

    public void setLeftUser(String leftUser) {
        this.leftUser = leftUser;
    }

    public String getRightUser() {
        return rightUser;
    }

    public QmsIntelligentTriggerTest rightUser(String rightUser) {
        this.rightUser = rightUser;
        return this;
    }

    public void setRightUser(String rightUser) {
        this.rightUser = rightUser;
    }

    public String getFlagStatus() {
        return flagStatus;
    }

    public QmsIntelligentTriggerTest flagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
        return this;
    }

    public void setFlagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
    }

    public String getCompPkid() {
        return compPkid;
    }

    public QmsIntelligentTriggerTest compPkid(String compPkid) {
        this.compPkid = compPkid;
        return this;
    }

    public void setCompPkid(String compPkid) {
        this.compPkid = compPkid;
    }

    public String getRemark() {
        return remark;
    }

    public QmsIntelligentTriggerTest remark(String remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getReserveFirst() {
        return reserveFirst;
    }

    public QmsIntelligentTriggerTest reserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
        return this;
    }

    public void setReserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
    }

    public String getReserveSecond() {
        return reserveSecond;
    }

    public QmsIntelligentTriggerTest reserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
        return this;
    }

    public void setReserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
    }

    public String getReserveThird() {
        return reserveThird;
    }

    public QmsIntelligentTriggerTest reserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
        return this;
    }

    public void setReserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
    }

    public String getMakeUser() {
        return makeUser;
    }

    public QmsIntelligentTriggerTest makeUser(String makeUser) {
        this.makeUser = makeUser;
        return this;
    }

    public void setMakeUser(String makeUser) {
        this.makeUser = makeUser;
    }

    public ZonedDateTime getMakeTime() {
        return makeTime;
    }

    public QmsIntelligentTriggerTest makeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
        return this;
    }

    public void setMakeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public QmsIntelligentTriggerTest modifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
        return this;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    public ZonedDateTime getModifyTime() {
        return modifyTime;
    }

    public QmsIntelligentTriggerTest modifyTime(ZonedDateTime modifyTime) {
        this.modifyTime = modifyTime;
        return this;
    }

    public void setModifyTime(ZonedDateTime modifyTime) {
        this.modifyTime = modifyTime;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        QmsIntelligentTriggerTest qmsIntelligentTriggerTest = (QmsIntelligentTriggerTest) o;
        if (qmsIntelligentTriggerTest.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), qmsIntelligentTriggerTest.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QmsIntelligentTriggerTest{" +
            "id=" + getId() +
            ", num='" + getNum() + "'" +
            ", sideframeLeft='" + getSideframeLeft() + "'" +
            ", leftValue1='" + getLeftValue1() + "'" +
            ", leftValue2='" + getLeftValue2() + "'" +
            ", sideframeRight='" + getSideframeRight() + "'" +
            ", rightValue1='" + getRightValue1() + "'" +
            ", rightValue2='" + getRightValue2() + "'" +
            ", leftUser='" + getLeftUser() + "'" +
            ", rightUser='" + getRightUser() + "'" +
            ", flagStatus='" + getFlagStatus() + "'" +
            ", compPkid='" + getCompPkid() + "'" +
            ", remark='" + getRemark() + "'" +
            ", reserveFirst='" + getReserveFirst() + "'" +
            ", reserveSecond='" + getReserveSecond() + "'" +
            ", reserveThird='" + getReserveThird() + "'" +
            ", makeUser='" + getMakeUser() + "'" +
            ", makeTime='" + getMakeTime() + "'" +
            ", modifyUser='" + getModifyUser() + "'" +
            ", modifyTime='" + getModifyTime() + "'" +
            "}";
    }
}
