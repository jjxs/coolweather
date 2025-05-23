package cn.com.cnc.fcc.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A QmsNrvTelation.
 */
@Entity
@Table(name = "qms_nrv_telation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QmsNrvTelation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 20)
    @Column(name = "vehicle_type", length = 20)
    private String vehicleType;

    @Size(max = 20)
    @Column(name = "vehicle_cd", length = 20)
    private String vehicleCd;

    @Size(max = 10)
    @Column(name = "materiel_cd", length = 10)
    private String materielCd;

    @Size(max = 10)
    @Column(name = "parent_materiel_cd", length = 10)
    private String parentMaterielCd;

    @Size(max = 10)
    @Column(name = "serial_number", length = 10)
    private String serialNumber;

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

    public String getVehicleType() {
        return vehicleType;
    }

    public QmsNrvTelation vehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
        return this;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getVehicleCd() {
        return vehicleCd;
    }

    public QmsNrvTelation vehicleCd(String vehicleCd) {
        this.vehicleCd = vehicleCd;
        return this;
    }

    public void setVehicleCd(String vehicleCd) {
        this.vehicleCd = vehicleCd;
    }

    public String getMaterielCd() {
        return materielCd;
    }

    public QmsNrvTelation materielCd(String materielCd) {
        this.materielCd = materielCd;
        return this;
    }

    public void setMaterielCd(String materielCd) {
        this.materielCd = materielCd;
    }

    public String getParentMaterielCd() {
        return parentMaterielCd;
    }

    public QmsNrvTelation parentMaterielCd(String parentMaterielCd) {
        this.parentMaterielCd = parentMaterielCd;
        return this;
    }

    public void setParentMaterielCd(String parentMaterielCd) {
        this.parentMaterielCd = parentMaterielCd;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public QmsNrvTelation serialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
        return this;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getFlagStatus() {
        return flagStatus;
    }

    public QmsNrvTelation flagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
        return this;
    }

    public void setFlagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
    }

    public String getCompPkid() {
        return compPkid;
    }

    public QmsNrvTelation compPkid(String compPkid) {
        this.compPkid = compPkid;
        return this;
    }

    public void setCompPkid(String compPkid) {
        this.compPkid = compPkid;
    }

    public String getRemark() {
        return remark;
    }

    public QmsNrvTelation remark(String remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getReserveFirst() {
        return reserveFirst;
    }

    public QmsNrvTelation reserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
        return this;
    }

    public void setReserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
    }

    public String getReserveSecond() {
        return reserveSecond;
    }

    public QmsNrvTelation reserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
        return this;
    }

    public void setReserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
    }

    public String getReserveThird() {
        return reserveThird;
    }

    public QmsNrvTelation reserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
        return this;
    }

    public void setReserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
    }

    public String getMakeUser() {
        return makeUser;
    }

    public QmsNrvTelation makeUser(String makeUser) {
        this.makeUser = makeUser;
        return this;
    }

    public void setMakeUser(String makeUser) {
        this.makeUser = makeUser;
    }

    public ZonedDateTime getMakeTime() {
        return makeTime;
    }

    public QmsNrvTelation makeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
        return this;
    }

    public void setMakeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public QmsNrvTelation modifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
        return this;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    public ZonedDateTime getModifyTime() {
        return modifyTime;
    }

    public QmsNrvTelation modifyTime(ZonedDateTime modifyTime) {
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
        QmsNrvTelation qmsNrvTelation = (QmsNrvTelation) o;
        if (qmsNrvTelation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), qmsNrvTelation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QmsNrvTelation{" +
            "id=" + getId() +
            ", vehicleType='" + getVehicleType() + "'" +
            ", vehicleCd='" + getVehicleCd() + "'" +
            ", materielCd='" + getMaterielCd() + "'" +
            ", parentMaterielCd='" + getParentMaterielCd() + "'" +
            ", serialNumber='" + getSerialNumber() + "'" +
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
