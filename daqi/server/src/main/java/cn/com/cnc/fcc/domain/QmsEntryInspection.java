package cn.com.cnc.fcc.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A QmsEntryInspection.
 */
@Entity
@Table(name = "qms_entry_inspection")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QmsEntryInspection implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "materiel_id")
    private Integer materielId;

    @Column(name = "supplier_id")
    private Integer supplierId;

    @Column(name = "ok_number")
    private Integer okNumber;

    @Column(name = "ng_number")
    private Integer ngNumber;

    @Size(max = 10)
    @Column(name = "serial_number", length = 10)
    private String serialNumber;

    @Size(max = 10)
    @Column(name = "production_cd", length = 10)
    private String productionCd;

    @Column(name = "check_date")
    private ZonedDateTime checkDate;

    @Size(max = 10)
    @Column(name = "file_number", length = 10)
    private String fileNumber;

    @Size(max = 1)
    @Column(name = "flag_status", length = 1)
    private String flagStatus;

    @Size(max = 10)
    @Column(name = "comp_pkid", length = 10)
    private String compPkid;

    @Column(name = "entry_id")
    private Integer entryId;

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

    public Integer getMaterielId() {
        return materielId;
    }

    public QmsEntryInspection materielId(Integer materielId) {
        this.materielId = materielId;
        return this;
    }

    public void setMaterielId(Integer materielId) {
        this.materielId = materielId;
    }

    public Integer getSupplierId() {
        return supplierId;
    }

    public QmsEntryInspection supplierId(Integer supplierId) {
        this.supplierId = supplierId;
        return this;
    }

    public void setSupplierId(Integer supplierId) {
        this.supplierId = supplierId;
    }

    public Integer getOkNumber() {
        return okNumber;
    }

    public QmsEntryInspection okNumber(Integer okNumber) {
        this.okNumber = okNumber;
        return this;
    }

    public void setOkNumber(Integer okNumber) {
        this.okNumber = okNumber;
    }

    public Integer getNgNumber() {
        return ngNumber;
    }

    public QmsEntryInspection ngNumber(Integer ngNumber) {
        this.ngNumber = ngNumber;
        return this;
    }

    public void setNgNumber(Integer ngNumber) {
        this.ngNumber = ngNumber;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public QmsEntryInspection serialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
        return this;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getProductionCd() {
        return productionCd;
    }

    public QmsEntryInspection productionCd(String productionCd) {
        this.productionCd = productionCd;
        return this;
    }

    public void setProductionCd(String productionCd) {
        this.productionCd = productionCd;
    }

    public ZonedDateTime getCheckDate() {
        return checkDate;
    }

    public QmsEntryInspection checkDate(ZonedDateTime checkDate) {
        this.checkDate = checkDate;
        return this;
    }

    public void setCheckDate(ZonedDateTime checkDate) {
        this.checkDate = checkDate;
    }

    public String getFileNumber() {
        return fileNumber;
    }

    public QmsEntryInspection fileNumber(String fileNumber) {
        this.fileNumber = fileNumber;
        return this;
    }

    public void setFileNumber(String fileNumber) {
        this.fileNumber = fileNumber;
    }

    public String getFlagStatus() {
        return flagStatus;
    }

    public QmsEntryInspection flagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
        return this;
    }

    public void setFlagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
    }

    public String getCompPkid() {
        return compPkid;
    }

    public QmsEntryInspection compPkid(String compPkid) {
        this.compPkid = compPkid;
        return this;
    }

    public void setCompPkid(String compPkid) {
        this.compPkid = compPkid;
    }

    public Integer getEntryId() {
        return entryId;
    }

    public QmsEntryInspection entryId(Integer entryId) {
        this.entryId = entryId;
        return this;
    }

    public void setEntryId(Integer entryId) {
        this.entryId = entryId;
    }

    public String getRemark() {
        return remark;
    }

    public QmsEntryInspection remark(String remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getGroupCd() {
        return groupCd;
    }

    public QmsEntryInspection groupCd(String groupCd) {
        this.groupCd = groupCd;
        return this;
    }

    public void setGroupCd(String groupCd) {
        this.groupCd = groupCd;
    }

    public String getReserveFirst() {
        return reserveFirst;
    }

    public QmsEntryInspection reserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
        return this;
    }

    public void setReserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
    }

    public String getReserveSecond() {
        return reserveSecond;
    }

    public QmsEntryInspection reserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
        return this;
    }

    public void setReserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
    }

    public String getReserveThird() {
        return reserveThird;
    }

    public QmsEntryInspection reserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
        return this;
    }

    public void setReserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
    }

    public String getMakeUser() {
        return makeUser;
    }

    public QmsEntryInspection makeUser(String makeUser) {
        this.makeUser = makeUser;
        return this;
    }

    public void setMakeUser(String makeUser) {
        this.makeUser = makeUser;
    }

    public ZonedDateTime getMakeTime() {
        return makeTime;
    }

    public QmsEntryInspection makeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
        return this;
    }

    public void setMakeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public QmsEntryInspection modifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
        return this;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    public ZonedDateTime getModifyTime() {
        return modifyTime;
    }

    public QmsEntryInspection modifyTime(ZonedDateTime modifyTime) {
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
        QmsEntryInspection qmsEntryInspection = (QmsEntryInspection) o;
        if (qmsEntryInspection.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), qmsEntryInspection.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QmsEntryInspection{" +
            "id=" + getId() +
            ", materielId=" + getMaterielId() +
            ", supplierId=" + getSupplierId() +
            ", okNumber=" + getOkNumber() +
            ", ngNumber=" + getNgNumber() +
            ", serialNumber='" + getSerialNumber() + "'" +
            ", productionCd='" + getProductionCd() + "'" +
            ", checkDate='" + getCheckDate() + "'" +
            ", fileNumber='" + getFileNumber() + "'" +
            ", flagStatus='" + getFlagStatus() + "'" +
            ", compPkid='" + getCompPkid() + "'" +
            ", entryId=" + getEntryId() +
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
