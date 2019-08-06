package cn.com.cnc.fcc.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A QmsEnclosure.
 */
@Entity
@Table(name = "qms_enclosure")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QmsEnclosure implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "inspection_info_id")
    private Integer inspectionInfoId;

    @Size(max = 1)
    @Column(name = "inspection_kbn", length = 1)
    private String inspectionKbn;

    @Size(max = 100)
    @Column(name = "enclosure_address", length = 100)
    private String enclosureAddress;

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

    public Integer getInspectionInfoId() {
        return inspectionInfoId;
    }

    public QmsEnclosure inspectionInfoId(Integer inspectionInfoId) {
        this.inspectionInfoId = inspectionInfoId;
        return this;
    }

    public void setInspectionInfoId(Integer inspectionInfoId) {
        this.inspectionInfoId = inspectionInfoId;
    }

    public String getInspectionKbn() {
        return inspectionKbn;
    }

    public QmsEnclosure inspectionKbn(String inspectionKbn) {
        this.inspectionKbn = inspectionKbn;
        return this;
    }

    public void setInspectionKbn(String inspectionKbn) {
        this.inspectionKbn = inspectionKbn;
    }

    public String getEnclosureAddress() {
        return enclosureAddress;
    }

    public QmsEnclosure enclosureAddress(String enclosureAddress) {
        this.enclosureAddress = enclosureAddress;
        return this;
    }

    public void setEnclosureAddress(String enclosureAddress) {
        this.enclosureAddress = enclosureAddress;
    }

    public String getMakeUser() {
        return makeUser;
    }

    public QmsEnclosure makeUser(String makeUser) {
        this.makeUser = makeUser;
        return this;
    }

    public void setMakeUser(String makeUser) {
        this.makeUser = makeUser;
    }

    public ZonedDateTime getMakeTime() {
        return makeTime;
    }

    public QmsEnclosure makeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
        return this;
    }

    public void setMakeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public QmsEnclosure modifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
        return this;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    public ZonedDateTime getModifyTime() {
        return modifyTime;
    }

    public QmsEnclosure modifyTime(ZonedDateTime modifyTime) {
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
        QmsEnclosure qmsEnclosure = (QmsEnclosure) o;
        if (qmsEnclosure.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), qmsEnclosure.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QmsEnclosure{" +
            "id=" + getId() +
            ", inspectionInfoId=" + getInspectionInfoId() +
            ", inspectionKbn='" + getInspectionKbn() + "'" +
            ", enclosureAddress='" + getEnclosureAddress() + "'" +
            ", makeUser='" + getMakeUser() + "'" +
            ", makeTime='" + getMakeTime() + "'" +
            ", modifyUser='" + getModifyUser() + "'" +
            ", modifyTime='" + getModifyTime() + "'" +
            "}";
    }
}
