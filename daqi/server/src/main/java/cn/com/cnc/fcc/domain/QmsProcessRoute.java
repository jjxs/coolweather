package cn.com.cnc.fcc.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A QmsProcessRoute.
 */
@Entity
@Table(name = "qms_process_route")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QmsProcessRoute implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "materiel_id")
    private Integer materielId;

    @Column(name = "order_number")
    private Integer orderNumber;

    @Size(max = 10)
    @Column(name = "process_number", length = 10)
    private String processNumber;

    @Size(max = 100)
    @Column(name = "process_name", length = 100)
    private String processName;

    @Column(name = "time_quota")
    private Integer timeQuota;

    @Size(max = 10)
    @Column(name = "equipment_cd", length = 10)
    private String equipmentCd;

    @Size(max = 100)
    @Column(name = "process_equipment", length = 100)
    private String processEquipment;

    @Size(max = 10)
    @Column(name = "organization_cd", length = 10)
    private String organizationCd;

    @Size(max = 1)
    @Column(name = "flag_status", length = 1)
    private String flagStatus;

    @Size(max = 10)
    @Column(name = "comp_pkid", length = 10)
    private String compPkid;

    @Size(max = 200)
    @Column(name = "remark", length = 200)
    private String remark;

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

    public QmsProcessRoute materielId(Integer materielId) {
        this.materielId = materielId;
        return this;
    }

    public void setMaterielId(Integer materielId) {
        this.materielId = materielId;
    }

    public Integer getOrderNumber() {
        return orderNumber;
    }

    public QmsProcessRoute orderNumber(Integer orderNumber) {
        this.orderNumber = orderNumber;
        return this;
    }

    public void setOrderNumber(Integer orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getProcessNumber() {
        return processNumber;
    }

    public QmsProcessRoute processNumber(String processNumber) {
        this.processNumber = processNumber;
        return this;
    }

    public void setProcessNumber(String processNumber) {
        this.processNumber = processNumber;
    }

    public String getProcessName() {
        return processName;
    }

    public QmsProcessRoute processName(String processName) {
        this.processName = processName;
        return this;
    }

    public void setProcessName(String processName) {
        this.processName = processName;
    }

    public Integer getTimeQuota() {
        return timeQuota;
    }

    public QmsProcessRoute timeQuota(Integer timeQuota) {
        this.timeQuota = timeQuota;
        return this;
    }

    public void setTimeQuota(Integer timeQuota) {
        this.timeQuota = timeQuota;
    }

    public String getEquipmentCd() {
        return equipmentCd;
    }

    public QmsProcessRoute equipmentCd(String equipmentCd) {
        this.equipmentCd = equipmentCd;
        return this;
    }

    public void setEquipmentCd(String equipmentCd) {
        this.equipmentCd = equipmentCd;
    }

    public String getProcessEquipment() {
        return processEquipment;
    }

    public QmsProcessRoute processEquipment(String processEquipment) {
        this.processEquipment = processEquipment;
        return this;
    }

    public void setProcessEquipment(String processEquipment) {
        this.processEquipment = processEquipment;
    }

    public String getOrganizationCd() {
        return organizationCd;
    }

    public QmsProcessRoute organizationCd(String organizationCd) {
        this.organizationCd = organizationCd;
        return this;
    }

    public void setOrganizationCd(String organizationCd) {
        this.organizationCd = organizationCd;
    }

    public String getFlagStatus() {
        return flagStatus;
    }

    public QmsProcessRoute flagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
        return this;
    }

    public void setFlagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
    }

    public String getCompPkid() {
        return compPkid;
    }

    public QmsProcessRoute compPkid(String compPkid) {
        this.compPkid = compPkid;
        return this;
    }

    public void setCompPkid(String compPkid) {
        this.compPkid = compPkid;
    }

    public String getRemark() {
        return remark;
    }

    public QmsProcessRoute remark(String remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getMakeUser() {
        return makeUser;
    }

    public QmsProcessRoute makeUser(String makeUser) {
        this.makeUser = makeUser;
        return this;
    }

    public void setMakeUser(String makeUser) {
        this.makeUser = makeUser;
    }

    public ZonedDateTime getMakeTime() {
        return makeTime;
    }

    public QmsProcessRoute makeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
        return this;
    }

    public void setMakeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public QmsProcessRoute modifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
        return this;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    public ZonedDateTime getModifyTime() {
        return modifyTime;
    }

    public QmsProcessRoute modifyTime(ZonedDateTime modifyTime) {
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
        QmsProcessRoute qmsProcessRoute = (QmsProcessRoute) o;
        if (qmsProcessRoute.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), qmsProcessRoute.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QmsProcessRoute{" +
            "id=" + getId() +
            ", materielId=" + getMaterielId() +
            ", orderNumber=" + getOrderNumber() +
            ", processNumber='" + getProcessNumber() + "'" +
            ", processName='" + getProcessName() + "'" +
            ", timeQuota=" + getTimeQuota() +
            ", equipmentCd='" + getEquipmentCd() + "'" +
            ", processEquipment='" + getProcessEquipment() + "'" +
            ", organizationCd='" + getOrganizationCd() + "'" +
            ", flagStatus='" + getFlagStatus() + "'" +
            ", compPkid='" + getCompPkid() + "'" +
            ", remark='" + getRemark() + "'" +
            ", makeUser='" + getMakeUser() + "'" +
            ", makeTime='" + getMakeTime() + "'" +
            ", modifyUser='" + getModifyUser() + "'" +
            ", modifyTime='" + getModifyTime() + "'" +
            "}";
    }
}
