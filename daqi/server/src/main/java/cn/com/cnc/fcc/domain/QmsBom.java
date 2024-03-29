package cn.com.cnc.fcc.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A QmsBom.
 */
@Entity
@Table(name = "qms_bom")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QmsBom implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "vehicle_id")
    private Integer vehicleId;

    @Column(name = "materiel_id")
    private Integer materielId;

    @Column(name = "parent_materiel_id")
    private Integer parentMaterielID;

    @Column(name = "root_materiel_id")
    private Integer rootMaterielId;

    @Column(name = "jhi_sequence")
    private Integer sequence;

    @Column(name = "quantity")
    private Integer quantity;

    @Size(max = 1)
    @Column(name = "is_must", length = 1)
    private String isMust;

    @Size(max = 1)
    @Column(name = "supply_type", length = 1)
    private String supplyType;

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

    public Integer getVehicleId() {
        return vehicleId;
    }

    public QmsBom vehicleId(Integer vehicleId) {
        this.vehicleId = vehicleId;
        return this;
    }

    public void setVehicleId(Integer vehicleId) {
        this.vehicleId = vehicleId;
    }

    public Integer getMaterielId() {
        return materielId;
    }

    public QmsBom materielId(Integer materielId) {
        this.materielId = materielId;
        return this;
    }

    public void setMaterielId(Integer materielId) {
        this.materielId = materielId;
    }

    public Integer getParentMaterielID() {
        return parentMaterielID;
    }

    public QmsBom parentMaterielID(Integer parentMaterielID) {
        this.parentMaterielID = parentMaterielID;
        return this;
    }

    public void setParentMaterielID(Integer parentMaterielID) {
        this.parentMaterielID = parentMaterielID;
    }

    public Integer getRootMaterielId() {
        return rootMaterielId;
    }

    public QmsBom rootMaterielId(Integer rootMaterielId) {
        this.rootMaterielId = rootMaterielId;
        return this;
    }

    public void setRootMaterielId(Integer rootMaterielId) {
        this.rootMaterielId = rootMaterielId;
    }

    public Integer getSequence() {
        return sequence;
    }

    public QmsBom sequence(Integer sequence) {
        this.sequence = sequence;
        return this;
    }

    public void setSequence(Integer sequence) {
        this.sequence = sequence;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public QmsBom quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getIsMust() {
        return isMust;
    }

    public QmsBom isMust(String isMust) {
        this.isMust = isMust;
        return this;
    }

    public void setIsMust(String isMust) {
        this.isMust = isMust;
    }

    public String getSupplyType() {
        return supplyType;
    }

    public QmsBom supplyType(String supplyType) {
        this.supplyType = supplyType;
        return this;
    }

    public void setSupplyType(String supplyType) {
        this.supplyType = supplyType;
    }

    public String getFlagStatus() {
        return flagStatus;
    }

    public QmsBom flagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
        return this;
    }

    public void setFlagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
    }

    public String getCompPkid() {
        return compPkid;
    }

    public QmsBom compPkid(String compPkid) {
        this.compPkid = compPkid;
        return this;
    }

    public void setCompPkid(String compPkid) {
        this.compPkid = compPkid;
    }

    public String getRemark() {
        return remark;
    }

    public QmsBom remark(String remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getReserveFirst() {
        return reserveFirst;
    }

    public QmsBom reserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
        return this;
    }

    public void setReserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
    }

    public String getReserveSecond() {
        return reserveSecond;
    }

    public QmsBom reserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
        return this;
    }

    public void setReserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
    }

    public String getReserveThird() {
        return reserveThird;
    }

    public QmsBom reserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
        return this;
    }

    public void setReserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
    }

    public String getMakeUser() {
        return makeUser;
    }

    public QmsBom makeUser(String makeUser) {
        this.makeUser = makeUser;
        return this;
    }

    public void setMakeUser(String makeUser) {
        this.makeUser = makeUser;
    }

    public ZonedDateTime getMakeTime() {
        return makeTime;
    }

    public QmsBom makeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
        return this;
    }

    public void setMakeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public QmsBom modifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
        return this;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    public ZonedDateTime getModifyTime() {
        return modifyTime;
    }

    public QmsBom modifyTime(ZonedDateTime modifyTime) {
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
        QmsBom qmsBom = (QmsBom) o;
        if (qmsBom.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), qmsBom.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QmsBom{" +
            "id=" + getId() +
            ", vehicleId=" + getVehicleId() +
            ", materielId=" + getMaterielId() +
            ", parentMaterielID=" + getParentMaterielID() +
            ", rootMaterielId=" + getRootMaterielId() +
            ", sequence=" + getSequence() +
            ", quantity=" + getQuantity() +
            ", isMust='" + getIsMust() + "'" +
            ", supplyType='" + getSupplyType() + "'" +
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
