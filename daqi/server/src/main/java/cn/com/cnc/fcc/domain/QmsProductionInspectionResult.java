package cn.com.cnc.fcc.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A QmsProductionInspectionResult.
 */
@Entity
@Table(name = "qms_production_inspection_result")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QmsProductionInspectionResult implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "inspection_value_id")
    private Integer inspectionValueId;

    @Column(name = "inspection_id")
    private Integer inspectionId;

    @Column(name = "control_id")
    private Integer controlId;

    @Size(max = 1)
    @Column(name = "inspection_diff", length = 1)
    private String inspectionDiff;

    @Size(max = 100)
    @Column(name = "place_diff", length = 100)
    private String placeDiff;

    @Size(max = 40)
    @Column(name = "test_value", length = 40)
    private String testValue;

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

    public Integer getInspectionValueId() {
        return inspectionValueId;
    }

    public QmsProductionInspectionResult inspectionValueId(Integer inspectionValueId) {
        this.inspectionValueId = inspectionValueId;
        return this;
    }

    public void setInspectionValueId(Integer inspectionValueId) {
        this.inspectionValueId = inspectionValueId;
    }

    public Integer getInspectionId() {
        return inspectionId;
    }

    public QmsProductionInspectionResult inspectionId(Integer inspectionId) {
        this.inspectionId = inspectionId;
        return this;
    }

    public void setInspectionId(Integer inspectionId) {
        this.inspectionId = inspectionId;
    }

    public Integer getControlId() {
        return controlId;
    }

    public QmsProductionInspectionResult controlId(Integer controlId) {
        this.controlId = controlId;
        return this;
    }

    public void setControlId(Integer controlId) {
        this.controlId = controlId;
    }

    public String getInspectionDiff() {
        return inspectionDiff;
    }

    public QmsProductionInspectionResult inspectionDiff(String inspectionDiff) {
        this.inspectionDiff = inspectionDiff;
        return this;
    }

    public void setInspectionDiff(String inspectionDiff) {
        this.inspectionDiff = inspectionDiff;
    }

    public String getPlaceDiff() {
        return placeDiff;
    }

    public QmsProductionInspectionResult placeDiff(String placeDiff) {
        this.placeDiff = placeDiff;
        return this;
    }

    public void setPlaceDiff(String placeDiff) {
        this.placeDiff = placeDiff;
    }

    public String getTestValue() {
        return testValue;
    }

    public QmsProductionInspectionResult testValue(String testValue) {
        this.testValue = testValue;
        return this;
    }

    public void setTestValue(String testValue) {
        this.testValue = testValue;
    }

    public String getFlagStatus() {
        return flagStatus;
    }

    public QmsProductionInspectionResult flagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
        return this;
    }

    public void setFlagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
    }

    public String getCompPkid() {
        return compPkid;
    }

    public QmsProductionInspectionResult compPkid(String compPkid) {
        this.compPkid = compPkid;
        return this;
    }

    public void setCompPkid(String compPkid) {
        this.compPkid = compPkid;
    }

    public String getRemark() {
        return remark;
    }

    public QmsProductionInspectionResult remark(String remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getReserveFirst() {
        return reserveFirst;
    }

    public QmsProductionInspectionResult reserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
        return this;
    }

    public void setReserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
    }

    public String getReserveSecond() {
        return reserveSecond;
    }

    public QmsProductionInspectionResult reserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
        return this;
    }

    public void setReserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
    }

    public String getReserveThird() {
        return reserveThird;
    }

    public QmsProductionInspectionResult reserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
        return this;
    }

    public void setReserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
    }

    public String getMakeUser() {
        return makeUser;
    }

    public QmsProductionInspectionResult makeUser(String makeUser) {
        this.makeUser = makeUser;
        return this;
    }

    public void setMakeUser(String makeUser) {
        this.makeUser = makeUser;
    }

    public ZonedDateTime getMakeTime() {
        return makeTime;
    }

    public QmsProductionInspectionResult makeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
        return this;
    }

    public void setMakeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public QmsProductionInspectionResult modifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
        return this;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    public ZonedDateTime getModifyTime() {
        return modifyTime;
    }

    public QmsProductionInspectionResult modifyTime(ZonedDateTime modifyTime) {
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
        QmsProductionInspectionResult qmsProductionInspectionResult = (QmsProductionInspectionResult) o;
        if (qmsProductionInspectionResult.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), qmsProductionInspectionResult.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QmsProductionInspectionResult{" +
            "id=" + getId() +
            ", inspectionValueId=" + getInspectionValueId() +
            ", inspectionId=" + getInspectionId() +
            ", controlId=" + getControlId() +
            ", inspectionDiff='" + getInspectionDiff() + "'" +
            ", placeDiff='" + getPlaceDiff() + "'" +
            ", testValue='" + getTestValue() + "'" +
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
