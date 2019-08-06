package cn.com.cnc.fcc.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A QmsInspectionInfo.
 */
@Entity
@Table(name = "qms_inspection_info")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QmsInspectionInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 20)
    @Column(name = "vehicle_type", length = 20)
    private String vehicleType;

    @Column(name = "no")
    private Integer no;

    @Size(max = 100)
    @Column(name = "vehicle_type_name", length = 100)
    private String vehicleTypeName;

    @Size(max = 20)
    @Column(name = "constitutive_coding", length = 20)
    private String constitutiveCoding;

    @Size(max = 100)
    @Column(name = "constitutive_name", length = 100)
    private String constitutiveName;

    @Size(max = 20)
    @Column(name = "constitutive_coding_name", length = 20)
    private String constitutiveCodingName;

    @Size(max = 20)
    @Column(name = "vehicle_number", length = 20)
    private String vehicleNumber;

    @Size(max = 20)
    @Column(name = "component_number", length = 20)
    private String componentNumber;

    @Size(max = 1)
    @Column(name = "flag_status", length = 1)
    private String flagStatus;

    @Size(max = 10)
    @Column(name = "comp_pkid", length = 10)
    private String compPkid;

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

    public QmsInspectionInfo vehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
        return this;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public Integer getNo() {
        return no;
    }

    public QmsInspectionInfo no(Integer no) {
        this.no = no;
        return this;
    }

    public void setNo(Integer no) {
        this.no = no;
    }

    public String getVehicleTypeName() {
        return vehicleTypeName;
    }

    public QmsInspectionInfo vehicleTypeName(String vehicleTypeName) {
        this.vehicleTypeName = vehicleTypeName;
        return this;
    }

    public void setVehicleTypeName(String vehicleTypeName) {
        this.vehicleTypeName = vehicleTypeName;
    }

    public String getConstitutiveCoding() {
        return constitutiveCoding;
    }

    public QmsInspectionInfo constitutiveCoding(String constitutiveCoding) {
        this.constitutiveCoding = constitutiveCoding;
        return this;
    }

    public void setConstitutiveCoding(String constitutiveCoding) {
        this.constitutiveCoding = constitutiveCoding;
    }

    public String getConstitutiveName() {
        return constitutiveName;
    }

    public QmsInspectionInfo constitutiveName(String constitutiveName) {
        this.constitutiveName = constitutiveName;
        return this;
    }

    public void setConstitutiveName(String constitutiveName) {
        this.constitutiveName = constitutiveName;
    }

    public String getConstitutiveCodingName() {
        return constitutiveCodingName;
    }

    public QmsInspectionInfo constitutiveCodingName(String constitutiveCodingName) {
        this.constitutiveCodingName = constitutiveCodingName;
        return this;
    }

    public void setConstitutiveCodingName(String constitutiveCodingName) {
        this.constitutiveCodingName = constitutiveCodingName;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public QmsInspectionInfo vehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
        return this;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public String getComponentNumber() {
        return componentNumber;
    }

    public QmsInspectionInfo componentNumber(String componentNumber) {
        this.componentNumber = componentNumber;
        return this;
    }

    public void setComponentNumber(String componentNumber) {
        this.componentNumber = componentNumber;
    }

    public String getFlagStatus() {
        return flagStatus;
    }

    public QmsInspectionInfo flagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
        return this;
    }

    public void setFlagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
    }

    public String getCompPkid() {
        return compPkid;
    }

    public QmsInspectionInfo compPkid(String compPkid) {
        this.compPkid = compPkid;
        return this;
    }

    public void setCompPkid(String compPkid) {
        this.compPkid = compPkid;
    }

    public String getMakeUser() {
        return makeUser;
    }

    public QmsInspectionInfo makeUser(String makeUser) {
        this.makeUser = makeUser;
        return this;
    }

    public void setMakeUser(String makeUser) {
        this.makeUser = makeUser;
    }

    public ZonedDateTime getMakeTime() {
        return makeTime;
    }

    public QmsInspectionInfo makeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
        return this;
    }

    public void setMakeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public QmsInspectionInfo modifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
        return this;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    public ZonedDateTime getModifyTime() {
        return modifyTime;
    }

    public QmsInspectionInfo modifyTime(ZonedDateTime modifyTime) {
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
        QmsInspectionInfo qmsInspectionInfo = (QmsInspectionInfo) o;
        if (qmsInspectionInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), qmsInspectionInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QmsInspectionInfo{" +
            "id=" + getId() +
            ", vehicleType='" + getVehicleType() + "'" +
            ", no=" + getNo() +
            ", vehicleTypeName='" + getVehicleTypeName() + "'" +
            ", constitutiveCoding='" + getConstitutiveCoding() + "'" +
            ", constitutiveName='" + getConstitutiveName() + "'" +
            ", constitutiveCodingName='" + getConstitutiveCodingName() + "'" +
            ", vehicleNumber='" + getVehicleNumber() + "'" +
            ", componentNumber='" + getComponentNumber() + "'" +
            ", flagStatus='" + getFlagStatus() + "'" +
            ", compPkid='" + getCompPkid() + "'" +
            ", makeUser='" + getMakeUser() + "'" +
            ", makeTime='" + getMakeTime() + "'" +
            ", modifyUser='" + getModifyUser() + "'" +
            ", modifyTime='" + getModifyTime() + "'" +
            "}";
    }
}
