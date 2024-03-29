package cn.com.cnc.fcc.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A QmsDefect.
 */
@Entity
@Table(name = "qms_defect")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QmsDefect implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 10)
    @Column(name = "defect_cd", length = 10)
    private String defectCd;

    @Size(max = 100)
    @Column(name = "defect_name", length = 100)
    private String defectName;

    @Size(max = 10)
    @Column(name = "parent_cd", length = 10)
    private String parentCd;

    @Size(max = 1)
    @Column(name = "is_use", length = 1)
    private String isUse;

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

    public String getDefectCd() {
        return defectCd;
    }

    public QmsDefect defectCd(String defectCd) {
        this.defectCd = defectCd;
        return this;
    }

    public void setDefectCd(String defectCd) {
        this.defectCd = defectCd;
    }

    public String getDefectName() {
        return defectName;
    }

    public QmsDefect defectName(String defectName) {
        this.defectName = defectName;
        return this;
    }

    public void setDefectName(String defectName) {
        this.defectName = defectName;
    }

    public String getParentCd() {
        return parentCd;
    }

    public QmsDefect parentCd(String parentCd) {
        this.parentCd = parentCd;
        return this;
    }

    public void setParentCd(String parentCd) {
        this.parentCd = parentCd;
    }

    public String getIsUse() {
        return isUse;
    }

    public QmsDefect isUse(String isUse) {
        this.isUse = isUse;
        return this;
    }

    public void setIsUse(String isUse) {
        this.isUse = isUse;
    }

    public String getFlagStatus() {
        return flagStatus;
    }

    public QmsDefect flagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
        return this;
    }

    public void setFlagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
    }

    public String getCompPkid() {
        return compPkid;
    }

    public QmsDefect compPkid(String compPkid) {
        this.compPkid = compPkid;
        return this;
    }

    public void setCompPkid(String compPkid) {
        this.compPkid = compPkid;
    }

    public String getRemark() {
        return remark;
    }

    public QmsDefect remark(String remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getMakeUser() {
        return makeUser;
    }

    public QmsDefect makeUser(String makeUser) {
        this.makeUser = makeUser;
        return this;
    }

    public void setMakeUser(String makeUser) {
        this.makeUser = makeUser;
    }

    public ZonedDateTime getMakeTime() {
        return makeTime;
    }

    public QmsDefect makeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
        return this;
    }

    public void setMakeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public QmsDefect modifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
        return this;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    public ZonedDateTime getModifyTime() {
        return modifyTime;
    }

    public QmsDefect modifyTime(ZonedDateTime modifyTime) {
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
        QmsDefect qmsDefect = (QmsDefect) o;
        if (qmsDefect.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), qmsDefect.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QmsDefect{" +
            "id=" + getId() +
            ", defectCd='" + getDefectCd() + "'" +
            ", defectName='" + getDefectName() + "'" +
            ", parentCd='" + getParentCd() + "'" +
            ", isUse='" + getIsUse() + "'" +
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
