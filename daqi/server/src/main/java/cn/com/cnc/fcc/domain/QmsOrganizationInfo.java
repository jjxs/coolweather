package cn.com.cnc.fcc.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A QmsOrganizationInfo.
 */
@Entity
@Table(name = "qms_organization_info")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QmsOrganizationInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 10)
    @Column(name = "parent_cd", length = 10)
    private String parentCd;

    @Size(max = 10)
    @Column(name = "organization_cd", length = 10)
    private String organizationCd;

    @Size(max = 100)
    @Column(name = "organization_name", length = 100)
    private String organizationName;

    @Size(max = 1)
    @Column(name = "attribute", length = 1)
    private String attribute;

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

    public String getParentCd() {
        return parentCd;
    }

    public QmsOrganizationInfo parentCd(String parentCd) {
        this.parentCd = parentCd;
        return this;
    }

    public void setParentCd(String parentCd) {
        this.parentCd = parentCd;
    }

    public String getOrganizationCd() {
        return organizationCd;
    }

    public QmsOrganizationInfo organizationCd(String organizationCd) {
        this.organizationCd = organizationCd;
        return this;
    }

    public void setOrganizationCd(String organizationCd) {
        this.organizationCd = organizationCd;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public QmsOrganizationInfo organizationName(String organizationName) {
        this.organizationName = organizationName;
        return this;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public String getAttribute() {
        return attribute;
    }

    public QmsOrganizationInfo attribute(String attribute) {
        this.attribute = attribute;
        return this;
    }

    public void setAttribute(String attribute) {
        this.attribute = attribute;
    }

    public String getFlagStatus() {
        return flagStatus;
    }

    public QmsOrganizationInfo flagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
        return this;
    }

    public void setFlagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
    }

    public String getCompPkid() {
        return compPkid;
    }

    public QmsOrganizationInfo compPkid(String compPkid) {
        this.compPkid = compPkid;
        return this;
    }

    public void setCompPkid(String compPkid) {
        this.compPkid = compPkid;
    }

    public String getRemark() {
        return remark;
    }

    public QmsOrganizationInfo remark(String remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getMakeUser() {
        return makeUser;
    }

    public QmsOrganizationInfo makeUser(String makeUser) {
        this.makeUser = makeUser;
        return this;
    }

    public void setMakeUser(String makeUser) {
        this.makeUser = makeUser;
    }

    public ZonedDateTime getMakeTime() {
        return makeTime;
    }

    public QmsOrganizationInfo makeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
        return this;
    }

    public void setMakeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public QmsOrganizationInfo modifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
        return this;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    public ZonedDateTime getModifyTime() {
        return modifyTime;
    }

    public QmsOrganizationInfo modifyTime(ZonedDateTime modifyTime) {
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
        QmsOrganizationInfo qmsOrganizationInfo = (QmsOrganizationInfo) o;
        if (qmsOrganizationInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), qmsOrganizationInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QmsOrganizationInfo{" +
            "id=" + getId() +
            ", parentCd='" + getParentCd() + "'" +
            ", organizationCd='" + getOrganizationCd() + "'" +
            ", organizationName='" + getOrganizationName() + "'" +
            ", attribute='" + getAttribute() + "'" +
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
