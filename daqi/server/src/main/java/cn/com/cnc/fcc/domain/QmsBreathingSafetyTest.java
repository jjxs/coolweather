package cn.com.cnc.fcc.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A QmsBreathingSafetyTest.
 */
@Entity
@Table(name = "qms_breathing_safety_test")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QmsBreathingSafetyTest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 50)
    @Column(name = "mcgs_time", length = 50)
    private String mcgsTime;

    @Size(max = 50)
    @Column(name = "mcgs_timems", length = 50)
    private String mcgsTimems;

    @Size(max = 50)
    @Column(name = "mcgs_date", length = 50)
    private String mcgsDate;

    @Size(max = 50)
    @Column(name = "ctype", length = 50)
    private String ctype;

    @Size(max = 50)
    @Column(name = "safety_valve", length = 50)
    private String safetyValve;

    @Size(max = 50)
    @Column(name = "respiratory_pressure", length = 50)
    private String respiratoryPressure;

    @Size(max = 50)
    @Column(name = "pinspl", length = 50)
    private String pinspl;

    @Size(max = 50)
    @Column(name = "check_user", length = 50)
    private String checkUser;

    @Size(max = 50)
    @Column(name = "mfyl", length = 50)
    private String mfyl;

    @Size(max = 50)
    @Column(name = "mfyc", length = 50)
    private String mfyc;

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

    public String getMcgsTime() {
        return mcgsTime;
    }

    public QmsBreathingSafetyTest mcgsTime(String mcgsTime) {
        this.mcgsTime = mcgsTime;
        return this;
    }

    public void setMcgsTime(String mcgsTime) {
        this.mcgsTime = mcgsTime;
    }

    public String getMcgsTimems() {
        return mcgsTimems;
    }

    public QmsBreathingSafetyTest mcgsTimems(String mcgsTimems) {
        this.mcgsTimems = mcgsTimems;
        return this;
    }

    public void setMcgsTimems(String mcgsTimems) {
        this.mcgsTimems = mcgsTimems;
    }

    public String getMcgsDate() {
        return mcgsDate;
    }

    public QmsBreathingSafetyTest mcgsDate(String mcgsDate) {
        this.mcgsDate = mcgsDate;
        return this;
    }

    public void setMcgsDate(String mcgsDate) {
        this.mcgsDate = mcgsDate;
    }

    public String getCtype() {
        return ctype;
    }

    public QmsBreathingSafetyTest ctype(String ctype) {
        this.ctype = ctype;
        return this;
    }

    public void setCtype(String ctype) {
        this.ctype = ctype;
    }

    public String getSafetyValve() {
        return safetyValve;
    }

    public QmsBreathingSafetyTest safetyValve(String safetyValve) {
        this.safetyValve = safetyValve;
        return this;
    }

    public void setSafetyValve(String safetyValve) {
        this.safetyValve = safetyValve;
    }

    public String getRespiratoryPressure() {
        return respiratoryPressure;
    }

    public QmsBreathingSafetyTest respiratoryPressure(String respiratoryPressure) {
        this.respiratoryPressure = respiratoryPressure;
        return this;
    }

    public void setRespiratoryPressure(String respiratoryPressure) {
        this.respiratoryPressure = respiratoryPressure;
    }

    public String getPinspl() {
        return pinspl;
    }

    public QmsBreathingSafetyTest pinspl(String pinspl) {
        this.pinspl = pinspl;
        return this;
    }

    public void setPinspl(String pinspl) {
        this.pinspl = pinspl;
    }

    public String getCheckUser() {
        return checkUser;
    }

    public QmsBreathingSafetyTest checkUser(String checkUser) {
        this.checkUser = checkUser;
        return this;
    }

    public void setCheckUser(String checkUser) {
        this.checkUser = checkUser;
    }

    public String getMfyl() {
        return mfyl;
    }

    public QmsBreathingSafetyTest mfyl(String mfyl) {
        this.mfyl = mfyl;
        return this;
    }

    public void setMfyl(String mfyl) {
        this.mfyl = mfyl;
    }

    public String getMfyc() {
        return mfyc;
    }

    public QmsBreathingSafetyTest mfyc(String mfyc) {
        this.mfyc = mfyc;
        return this;
    }

    public void setMfyc(String mfyc) {
        this.mfyc = mfyc;
    }

    public String getFlagStatus() {
        return flagStatus;
    }

    public QmsBreathingSafetyTest flagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
        return this;
    }

    public void setFlagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
    }

    public String getCompPkid() {
        return compPkid;
    }

    public QmsBreathingSafetyTest compPkid(String compPkid) {
        this.compPkid = compPkid;
        return this;
    }

    public void setCompPkid(String compPkid) {
        this.compPkid = compPkid;
    }

    public String getRemark() {
        return remark;
    }

    public QmsBreathingSafetyTest remark(String remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getReserveFirst() {
        return reserveFirst;
    }

    public QmsBreathingSafetyTest reserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
        return this;
    }

    public void setReserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
    }

    public String getReserveSecond() {
        return reserveSecond;
    }

    public QmsBreathingSafetyTest reserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
        return this;
    }

    public void setReserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
    }

    public String getReserveThird() {
        return reserveThird;
    }

    public QmsBreathingSafetyTest reserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
        return this;
    }

    public void setReserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
    }

    public String getMakeUser() {
        return makeUser;
    }

    public QmsBreathingSafetyTest makeUser(String makeUser) {
        this.makeUser = makeUser;
        return this;
    }

    public void setMakeUser(String makeUser) {
        this.makeUser = makeUser;
    }

    public ZonedDateTime getMakeTime() {
        return makeTime;
    }

    public QmsBreathingSafetyTest makeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
        return this;
    }

    public void setMakeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public QmsBreathingSafetyTest modifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
        return this;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    public ZonedDateTime getModifyTime() {
        return modifyTime;
    }

    public QmsBreathingSafetyTest modifyTime(ZonedDateTime modifyTime) {
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
        QmsBreathingSafetyTest qmsBreathingSafetyTest = (QmsBreathingSafetyTest) o;
        if (qmsBreathingSafetyTest.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), qmsBreathingSafetyTest.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QmsBreathingSafetyTest{" +
            "id=" + getId() +
            ", mcgsTime='" + getMcgsTime() + "'" +
            ", mcgsTimems='" + getMcgsTimems() + "'" +
            ", mcgsDate='" + getMcgsDate() + "'" +
            ", ctype='" + getCtype() + "'" +
            ", safetyValve='" + getSafetyValve() + "'" +
            ", respiratoryPressure='" + getRespiratoryPressure() + "'" +
            ", pinspl='" + getPinspl() + "'" +
            ", checkUser='" + getCheckUser() + "'" +
            ", mfyl='" + getMfyl() + "'" +
            ", mfyc='" + getMfyc() + "'" +
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
