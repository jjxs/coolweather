package cn.com.cnc.fcc.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A QmsMaster.
 */
@Entity
@Table(name = "qms_master")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QmsMaster implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 10)
    @Column(name = "kbn_cd", length = 10)
    private String kbnCd;

    @Size(max = 30)
    @Column(name = "kbn_name", length = 30)
    private String kbnName;

    @Size(max = 10)
    @Column(name = "prj_cd", length = 10)
    private String prjCd;

    @Size(max = 30)
    @Column(name = "prj_name", length = 30)
    private String prjName;

    @Size(max = 200)
    @Column(name = "remark", length = 200)
    private String remark;

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

    public String getKbnCd() {
        return kbnCd;
    }

    public QmsMaster kbnCd(String kbnCd) {
        this.kbnCd = kbnCd;
        return this;
    }

    public void setKbnCd(String kbnCd) {
        this.kbnCd = kbnCd;
    }

    public String getKbnName() {
        return kbnName;
    }

    public QmsMaster kbnName(String kbnName) {
        this.kbnName = kbnName;
        return this;
    }

    public void setKbnName(String kbnName) {
        this.kbnName = kbnName;
    }

    public String getPrjCd() {
        return prjCd;
    }

    public QmsMaster prjCd(String prjCd) {
        this.prjCd = prjCd;
        return this;
    }

    public void setPrjCd(String prjCd) {
        this.prjCd = prjCd;
    }

    public String getPrjName() {
        return prjName;
    }

    public QmsMaster prjName(String prjName) {
        this.prjName = prjName;
        return this;
    }

    public void setPrjName(String prjName) {
        this.prjName = prjName;
    }

    public String getRemark() {
        return remark;
    }

    public QmsMaster remark(String remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getFlagStatus() {
        return flagStatus;
    }

    public QmsMaster flagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
        return this;
    }

    public void setFlagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
    }

    public String getCompPkid() {
        return compPkid;
    }

    public QmsMaster compPkid(String compPkid) {
        this.compPkid = compPkid;
        return this;
    }

    public void setCompPkid(String compPkid) {
        this.compPkid = compPkid;
    }

    public String getReserveFirst() {
        return reserveFirst;
    }

    public QmsMaster reserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
        return this;
    }

    public void setReserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
    }

    public String getReserveSecond() {
        return reserveSecond;
    }

    public QmsMaster reserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
        return this;
    }

    public void setReserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
    }

    public String getReserveThird() {
        return reserveThird;
    }

    public QmsMaster reserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
        return this;
    }

    public void setReserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
    }

    public String getMakeUser() {
        return makeUser;
    }

    public QmsMaster makeUser(String makeUser) {
        this.makeUser = makeUser;
        return this;
    }

    public void setMakeUser(String makeUser) {
        this.makeUser = makeUser;
    }

    public ZonedDateTime getMakeTime() {
        return makeTime;
    }

    public QmsMaster makeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
        return this;
    }

    public void setMakeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public QmsMaster modifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
        return this;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    public ZonedDateTime getModifyTime() {
        return modifyTime;
    }

    public QmsMaster modifyTime(ZonedDateTime modifyTime) {
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
        QmsMaster qmsMaster = (QmsMaster) o;
        if (qmsMaster.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), qmsMaster.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QmsMaster{" +
            "id=" + getId() +
            ", kbnCd='" + getKbnCd() + "'" +
            ", kbnName='" + getKbnName() + "'" +
            ", prjCd='" + getPrjCd() + "'" +
            ", prjName='" + getPrjName() + "'" +
            ", remark='" + getRemark() + "'" +
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
