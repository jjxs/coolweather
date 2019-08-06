package cn.com.cnc.fcc.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A QmsEntryInspectionResult.
 */
@Entity
@Table(name = "qms_entry_inspection_result")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QmsEntryInspectionResult implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "entry_control_detail_id")
    private Integer entryControlDetailId;

    @Size(max = 10)
    @Column(name = "goods_cd", length = 10)
    private String goodsCd;

    @Column(name = "control_id")
    private Integer controlId;

    @Size(max = 10)
    @Column(name = "place_diff", length = 10)
    private String placeDiff;

    @Size(max = 40)
    @Column(name = "test_value", length = 40)
    private String testValue;

    @Column(name = "record_num")
    private Integer recordNum;

    @Size(max = 1)
    @Column(name = "check_result", length = 1)
    private String checkResult;

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
    @Column(name = "group_cd", length = 20)
    private String groupCd;

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

    public Integer getEntryControlDetailId() {
        return entryControlDetailId;
    }

    public QmsEntryInspectionResult entryControlDetailId(Integer entryControlDetailId) {
        this.entryControlDetailId = entryControlDetailId;
        return this;
    }

    public void setEntryControlDetailId(Integer entryControlDetailId) {
        this.entryControlDetailId = entryControlDetailId;
    }

    public String getGoodsCd() {
        return goodsCd;
    }

    public QmsEntryInspectionResult goodsCd(String goodsCd) {
        this.goodsCd = goodsCd;
        return this;
    }

    public void setGoodsCd(String goodsCd) {
        this.goodsCd = goodsCd;
    }

    public Integer getControlId() {
        return controlId;
    }

    public QmsEntryInspectionResult controlId(Integer controlId) {
        this.controlId = controlId;
        return this;
    }

    public void setControlId(Integer controlId) {
        this.controlId = controlId;
    }

    public String getPlaceDiff() {
        return placeDiff;
    }

    public QmsEntryInspectionResult placeDiff(String placeDiff) {
        this.placeDiff = placeDiff;
        return this;
    }

    public void setPlaceDiff(String placeDiff) {
        this.placeDiff = placeDiff;
    }

    public String getTestValue() {
        return testValue;
    }

    public QmsEntryInspectionResult testValue(String testValue) {
        this.testValue = testValue;
        return this;
    }

    public void setTestValue(String testValue) {
        this.testValue = testValue;
    }

    public Integer getRecordNum() {
        return recordNum;
    }

    public QmsEntryInspectionResult recordNum(Integer recordNum) {
        this.recordNum = recordNum;
        return this;
    }

    public void setRecordNum(Integer recordNum) {
        this.recordNum = recordNum;
    }

    public String getCheckResult() {
        return checkResult;
    }

    public QmsEntryInspectionResult checkResult(String checkResult) {
        this.checkResult = checkResult;
        return this;
    }

    public void setCheckResult(String checkResult) {
        this.checkResult = checkResult;
    }

    public String getFlagStatus() {
        return flagStatus;
    }

    public QmsEntryInspectionResult flagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
        return this;
    }

    public void setFlagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
    }

    public String getCompPkid() {
        return compPkid;
    }

    public QmsEntryInspectionResult compPkid(String compPkid) {
        this.compPkid = compPkid;
        return this;
    }

    public void setCompPkid(String compPkid) {
        this.compPkid = compPkid;
    }

    public String getRemark() {
        return remark;
    }

    public QmsEntryInspectionResult remark(String remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getGroupCd() {
        return groupCd;
    }

    public QmsEntryInspectionResult groupCd(String groupCd) {
        this.groupCd = groupCd;
        return this;
    }

    public void setGroupCd(String groupCd) {
        this.groupCd = groupCd;
    }

    public String getReserveFirst() {
        return reserveFirst;
    }

    public QmsEntryInspectionResult reserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
        return this;
    }

    public void setReserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
    }

    public String getReserveSecond() {
        return reserveSecond;
    }

    public QmsEntryInspectionResult reserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
        return this;
    }

    public void setReserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
    }

    public String getReserveThird() {
        return reserveThird;
    }

    public QmsEntryInspectionResult reserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
        return this;
    }

    public void setReserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
    }

    public String getMakeUser() {
        return makeUser;
    }

    public QmsEntryInspectionResult makeUser(String makeUser) {
        this.makeUser = makeUser;
        return this;
    }

    public void setMakeUser(String makeUser) {
        this.makeUser = makeUser;
    }

    public ZonedDateTime getMakeTime() {
        return makeTime;
    }

    public QmsEntryInspectionResult makeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
        return this;
    }

    public void setMakeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public QmsEntryInspectionResult modifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
        return this;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    public ZonedDateTime getModifyTime() {
        return modifyTime;
    }

    public QmsEntryInspectionResult modifyTime(ZonedDateTime modifyTime) {
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
        QmsEntryInspectionResult qmsEntryInspectionResult = (QmsEntryInspectionResult) o;
        if (qmsEntryInspectionResult.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), qmsEntryInspectionResult.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QmsEntryInspectionResult{" +
            "id=" + getId() +
            ", entryControlDetailId=" + getEntryControlDetailId() +
            ", goodsCd='" + getGoodsCd() + "'" +
            ", controlId=" + getControlId() +
            ", placeDiff='" + getPlaceDiff() + "'" +
            ", testValue='" + getTestValue() + "'" +
            ", recordNum=" + getRecordNum() +
            ", checkResult='" + getCheckResult() + "'" +
            ", flagStatus='" + getFlagStatus() + "'" +
            ", compPkid='" + getCompPkid() + "'" +
            ", remark='" + getRemark() + "'" +
            ", groupCd='" + getGroupCd() + "'" +
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
