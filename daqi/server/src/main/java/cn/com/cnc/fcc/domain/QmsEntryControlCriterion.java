package cn.com.cnc.fcc.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A QmsEntryControlCriterion.
 */
@Entity
@Table(name = "qms_entry_control_criterion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QmsEntryControlCriterion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "materiel_id")
    private Integer materielId;

    @Size(max = 400)
    @Column(name = "inspection_item", length = 400)
    private String inspectionItem;

    @Size(max = 1000)
    @Column(name = "technical_requirement", length = 1000)
    private String technicalRequirement;

    @Size(max = 100)
    @Column(name = "inspection_instrument", length = 100)
    private String inspectionInstrument;

    @Column(name = "standard")
    private Double standard;

    @Column(name = "upper_deviation")
    private Double upperDeviation;

    @Column(name = "lower_deviation")
    private Double lowerDeviation;

    @Column(name = "item_number")
    private Integer itemNumber;

    @Size(max = 1)
    @Column(name = "inspection_result_diff", length = 1)
    private String inspectionResultDiff;

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

    public Integer getMaterielId() {
        return materielId;
    }

    public QmsEntryControlCriterion materielId(Integer materielId) {
        this.materielId = materielId;
        return this;
    }

    public void setMaterielId(Integer materielId) {
        this.materielId = materielId;
    }

    public String getInspectionItem() {
        return inspectionItem;
    }

    public QmsEntryControlCriterion inspectionItem(String inspectionItem) {
        this.inspectionItem = inspectionItem;
        return this;
    }

    public void setInspectionItem(String inspectionItem) {
        this.inspectionItem = inspectionItem;
    }

    public String getTechnicalRequirement() {
        return technicalRequirement;
    }

    public QmsEntryControlCriterion technicalRequirement(String technicalRequirement) {
        this.technicalRequirement = technicalRequirement;
        return this;
    }

    public void setTechnicalRequirement(String technicalRequirement) {
        this.technicalRequirement = technicalRequirement;
    }

    public String getInspectionInstrument() {
        return inspectionInstrument;
    }

    public QmsEntryControlCriterion inspectionInstrument(String inspectionInstrument) {
        this.inspectionInstrument = inspectionInstrument;
        return this;
    }

    public void setInspectionInstrument(String inspectionInstrument) {
        this.inspectionInstrument = inspectionInstrument;
    }

    public Double getStandard() {
        return standard;
    }

    public QmsEntryControlCriterion standard(Double standard) {
        this.standard = standard;
        return this;
    }

    public void setStandard(Double standard) {
        this.standard = standard;
    }

    public Double getUpperDeviation() {
        return upperDeviation;
    }

    public QmsEntryControlCriterion upperDeviation(Double upperDeviation) {
        this.upperDeviation = upperDeviation;
        return this;
    }

    public void setUpperDeviation(Double upperDeviation) {
        this.upperDeviation = upperDeviation;
    }

    public Double getLowerDeviation() {
        return lowerDeviation;
    }

    public QmsEntryControlCriterion lowerDeviation(Double lowerDeviation) {
        this.lowerDeviation = lowerDeviation;
        return this;
    }

    public void setLowerDeviation(Double lowerDeviation) {
        this.lowerDeviation = lowerDeviation;
    }

    public Integer getItemNumber() {
        return itemNumber;
    }

    public QmsEntryControlCriterion itemNumber(Integer itemNumber) {
        this.itemNumber = itemNumber;
        return this;
    }

    public void setItemNumber(Integer itemNumber) {
        this.itemNumber = itemNumber;
    }

    public String getInspectionResultDiff() {
        return inspectionResultDiff;
    }

    public QmsEntryControlCriterion inspectionResultDiff(String inspectionResultDiff) {
        this.inspectionResultDiff = inspectionResultDiff;
        return this;
    }

    public void setInspectionResultDiff(String inspectionResultDiff) {
        this.inspectionResultDiff = inspectionResultDiff;
    }

    public String getFlagStatus() {
        return flagStatus;
    }

    public QmsEntryControlCriterion flagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
        return this;
    }

    public void setFlagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
    }

    public String getCompPkid() {
        return compPkid;
    }

    public QmsEntryControlCriterion compPkid(String compPkid) {
        this.compPkid = compPkid;
        return this;
    }

    public void setCompPkid(String compPkid) {
        this.compPkid = compPkid;
    }

    public String getRemark() {
        return remark;
    }

    public QmsEntryControlCriterion remark(String remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getReserveFirst() {
        return reserveFirst;
    }

    public QmsEntryControlCriterion reserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
        return this;
    }

    public void setReserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
    }

    public String getReserveSecond() {
        return reserveSecond;
    }

    public QmsEntryControlCriterion reserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
        return this;
    }

    public void setReserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
    }

    public String getReserveThird() {
        return reserveThird;
    }

    public QmsEntryControlCriterion reserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
        return this;
    }

    public void setReserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
    }

    public String getMakeUser() {
        return makeUser;
    }

    public QmsEntryControlCriterion makeUser(String makeUser) {
        this.makeUser = makeUser;
        return this;
    }

    public void setMakeUser(String makeUser) {
        this.makeUser = makeUser;
    }

    public ZonedDateTime getMakeTime() {
        return makeTime;
    }

    public QmsEntryControlCriterion makeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
        return this;
    }

    public void setMakeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public QmsEntryControlCriterion modifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
        return this;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    public ZonedDateTime getModifyTime() {
        return modifyTime;
    }

    public QmsEntryControlCriterion modifyTime(ZonedDateTime modifyTime) {
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
        QmsEntryControlCriterion qmsEntryControlCriterion = (QmsEntryControlCriterion) o;
        if (qmsEntryControlCriterion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), qmsEntryControlCriterion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QmsEntryControlCriterion{" +
            "id=" + getId() +
            ", materielId=" + getMaterielId() +
            ", inspectionItem='" + getInspectionItem() + "'" +
            ", technicalRequirement='" + getTechnicalRequirement() + "'" +
            ", inspectionInstrument='" + getInspectionInstrument() + "'" +
            ", standard=" + getStandard() +
            ", upperDeviation=" + getUpperDeviation() +
            ", lowerDeviation=" + getLowerDeviation() +
            ", itemNumber=" + getItemNumber() +
            ", inspectionResultDiff='" + getInspectionResultDiff() + "'" +
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
