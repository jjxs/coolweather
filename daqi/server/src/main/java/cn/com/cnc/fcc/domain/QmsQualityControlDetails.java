package cn.com.cnc.fcc.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A QmsQualityControlDetails.
 */
@Entity
@Table(name = "qms_quality_control_details")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QmsQualityControlDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "bom_technology_id")
    private Integer bomTechnologyId;

    @Size(max = 400)
    @Column(name = "inspection_item", length = 400)
    private String inspectionItem;

    @Size(max = 1000)
    @Column(name = "technical_requirement", length = 1000)
    private String technicalRequirement;

    @Size(max = 100)
    @Column(name = "inspection_instrument", length = 100)
    private String inspectionInstrument;

    @Size(max = 100)
    @Column(name = "place_diff", length = 100)
    private String placeDiff;

    @Column(name = "standard")
    private Double standard;

    @Column(name = "upper_deviation")
    private Double upperDeviation;

    @Column(name = "lower_deviation")
    private Double lowerDeviation;

    @Size(max = 1)
    @Column(name = "inspection_result_diff", length = 1)
    private String inspectionResultDiff;

    @Size(max = 200)
    @Column(name = "remark", length = 200)
    private String remark;

    @Size(max = 10)
    @Column(name = "inspection_type", length = 10)
    private String inspectionType;

    @Size(max = 1)
    @Column(name = "is_check_obj", length = 1)
    private String isCheckObj;

    @Size(max = 1)
    @Column(name = "abc_type", length = 1)
    private String abcType;

    @Size(max = 1)
    @Column(name = "flag_status", length = 1)
    private String flagStatus;

    @Size(max = 10)
    @Column(name = "comp_pkid", length = 10)
    private String compPkid;

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

    public Integer getBomTechnologyId() {
        return bomTechnologyId;
    }

    public QmsQualityControlDetails bomTechnologyId(Integer bomTechnologyId) {
        this.bomTechnologyId = bomTechnologyId;
        return this;
    }

    public void setBomTechnologyId(Integer bomTechnologyId) {
        this.bomTechnologyId = bomTechnologyId;
    }

    public String getInspectionItem() {
        return inspectionItem;
    }

    public QmsQualityControlDetails inspectionItem(String inspectionItem) {
        this.inspectionItem = inspectionItem;
        return this;
    }

    public void setInspectionItem(String inspectionItem) {
        this.inspectionItem = inspectionItem;
    }

    public String getTechnicalRequirement() {
        return technicalRequirement;
    }

    public QmsQualityControlDetails technicalRequirement(String technicalRequirement) {
        this.technicalRequirement = technicalRequirement;
        return this;
    }

    public void setTechnicalRequirement(String technicalRequirement) {
        this.technicalRequirement = technicalRequirement;
    }

    public String getInspectionInstrument() {
        return inspectionInstrument;
    }

    public QmsQualityControlDetails inspectionInstrument(String inspectionInstrument) {
        this.inspectionInstrument = inspectionInstrument;
        return this;
    }

    public void setInspectionInstrument(String inspectionInstrument) {
        this.inspectionInstrument = inspectionInstrument;
    }

    public String getPlaceDiff() {
        return placeDiff;
    }

    public QmsQualityControlDetails placeDiff(String placeDiff) {
        this.placeDiff = placeDiff;
        return this;
    }

    public void setPlaceDiff(String placeDiff) {
        this.placeDiff = placeDiff;
    }

    public Double getStandard() {
        return standard;
    }

    public QmsQualityControlDetails standard(Double standard) {
        this.standard = standard;
        return this;
    }

    public void setStandard(Double standard) {
        this.standard = standard;
    }

    public Double getUpperDeviation() {
        return upperDeviation;
    }

    public QmsQualityControlDetails upperDeviation(Double upperDeviation) {
        this.upperDeviation = upperDeviation;
        return this;
    }

    public void setUpperDeviation(Double upperDeviation) {
        this.upperDeviation = upperDeviation;
    }

    public Double getLowerDeviation() {
        return lowerDeviation;
    }

    public QmsQualityControlDetails lowerDeviation(Double lowerDeviation) {
        this.lowerDeviation = lowerDeviation;
        return this;
    }

    public void setLowerDeviation(Double lowerDeviation) {
        this.lowerDeviation = lowerDeviation;
    }

    public String getInspectionResultDiff() {
        return inspectionResultDiff;
    }

    public QmsQualityControlDetails inspectionResultDiff(String inspectionResultDiff) {
        this.inspectionResultDiff = inspectionResultDiff;
        return this;
    }

    public void setInspectionResultDiff(String inspectionResultDiff) {
        this.inspectionResultDiff = inspectionResultDiff;
    }

    public String getRemark() {
        return remark;
    }

    public QmsQualityControlDetails remark(String remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getInspectionType() {
        return inspectionType;
    }

    public QmsQualityControlDetails inspectionType(String inspectionType) {
        this.inspectionType = inspectionType;
        return this;
    }

    public void setInspectionType(String inspectionType) {
        this.inspectionType = inspectionType;
    }

    public String getIsCheckObj() {
        return isCheckObj;
    }

    public QmsQualityControlDetails isCheckObj(String isCheckObj) {
        this.isCheckObj = isCheckObj;
        return this;
    }

    public void setIsCheckObj(String isCheckObj) {
        this.isCheckObj = isCheckObj;
    }

    public String getAbcType() {
        return abcType;
    }

    public QmsQualityControlDetails abcType(String abcType) {
        this.abcType = abcType;
        return this;
    }

    public void setAbcType(String abcType) {
        this.abcType = abcType;
    }

    public String getFlagStatus() {
        return flagStatus;
    }

    public QmsQualityControlDetails flagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
        return this;
    }

    public void setFlagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
    }

    public String getCompPkid() {
        return compPkid;
    }

    public QmsQualityControlDetails compPkid(String compPkid) {
        this.compPkid = compPkid;
        return this;
    }

    public void setCompPkid(String compPkid) {
        this.compPkid = compPkid;
    }

    public String getReserveFirst() {
        return reserveFirst;
    }

    public QmsQualityControlDetails reserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
        return this;
    }

    public void setReserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
    }

    public String getReserveSecond() {
        return reserveSecond;
    }

    public QmsQualityControlDetails reserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
        return this;
    }

    public void setReserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
    }

    public String getReserveThird() {
        return reserveThird;
    }

    public QmsQualityControlDetails reserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
        return this;
    }

    public void setReserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
    }

    public String getMakeUser() {
        return makeUser;
    }

    public QmsQualityControlDetails makeUser(String makeUser) {
        this.makeUser = makeUser;
        return this;
    }

    public void setMakeUser(String makeUser) {
        this.makeUser = makeUser;
    }

    public ZonedDateTime getMakeTime() {
        return makeTime;
    }

    public QmsQualityControlDetails makeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
        return this;
    }

    public void setMakeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public QmsQualityControlDetails modifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
        return this;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    public ZonedDateTime getModifyTime() {
        return modifyTime;
    }

    public QmsQualityControlDetails modifyTime(ZonedDateTime modifyTime) {
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
        QmsQualityControlDetails qmsQualityControlDetails = (QmsQualityControlDetails) o;
        if (qmsQualityControlDetails.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), qmsQualityControlDetails.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QmsQualityControlDetails{" +
            "id=" + getId() +
            ", bomTechnologyId=" + getBomTechnologyId() +
            ", inspectionItem='" + getInspectionItem() + "'" +
            ", technicalRequirement='" + getTechnicalRequirement() + "'" +
            ", inspectionInstrument='" + getInspectionInstrument() + "'" +
            ", placeDiff='" + getPlaceDiff() + "'" +
            ", standard=" + getStandard() +
            ", upperDeviation=" + getUpperDeviation() +
            ", lowerDeviation=" + getLowerDeviation() +
            ", inspectionResultDiff='" + getInspectionResultDiff() + "'" +
            ", remark='" + getRemark() + "'" +
            ", inspectionType='" + getInspectionType() + "'" +
            ", isCheckObj='" + getIsCheckObj() + "'" +
            ", abcType='" + getAbcType() + "'" +
            ", flagStatus='" + getFlagStatus() + "'" +
            ", compPkid='" + getCompPkid() + "'" +
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
