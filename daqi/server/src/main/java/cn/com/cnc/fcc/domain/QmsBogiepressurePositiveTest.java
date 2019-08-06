package cn.com.cnc.fcc.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A QmsBogiepressurePositiveTest.
 */
@Entity
@Table(name = "qms_bogiepressure_positive_test")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QmsBogiepressurePositiveTest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 50)
    @Column(name = "place", length = 50)
    private String place;

    @Size(max = 50)
    @Column(name = "bolster", length = 50)
    private String bolster;

    @Size(max = 50)
    @Column(name = "sideframe_left", length = 50)
    private String sideframeLeft;

    @Size(max = 50)
    @Column(name = "sideframe_right", length = 50)
    private String sideframeRight;

    @Size(max = 50)
    @Column(name = "crossstaff_left", length = 50)
    private String crossstaffLeft;

    @Size(max = 50)
    @Column(name = "crossstaff_right", length = 50)
    private String crossstaffRight;

    @Size(max = 50)
    @Column(name = "checkdate", length = 50)
    private String checkdate;

    @Size(max = 50)
    @Column(name = "checktime", length = 50)
    private String checktime;

    @Size(max = 50)
    @Column(name = "workno", length = 50)
    private String workno;

    @Size(max = 50)
    @Column(name = "checkvalue_1", length = 50)
    private String checkvalue1;

    @Size(max = 50)
    @Column(name = "checkvalue_2", length = 50)
    private String checkvalue2;

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

    public String getPlace() {
        return place;
    }

    public QmsBogiepressurePositiveTest place(String place) {
        this.place = place;
        return this;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getBolster() {
        return bolster;
    }

    public QmsBogiepressurePositiveTest bolster(String bolster) {
        this.bolster = bolster;
        return this;
    }

    public void setBolster(String bolster) {
        this.bolster = bolster;
    }

    public String getSideframeLeft() {
        return sideframeLeft;
    }

    public QmsBogiepressurePositiveTest sideframeLeft(String sideframeLeft) {
        this.sideframeLeft = sideframeLeft;
        return this;
    }

    public void setSideframeLeft(String sideframeLeft) {
        this.sideframeLeft = sideframeLeft;
    }

    public String getSideframeRight() {
        return sideframeRight;
    }

    public QmsBogiepressurePositiveTest sideframeRight(String sideframeRight) {
        this.sideframeRight = sideframeRight;
        return this;
    }

    public void setSideframeRight(String sideframeRight) {
        this.sideframeRight = sideframeRight;
    }

    public String getCrossstaffLeft() {
        return crossstaffLeft;
    }

    public QmsBogiepressurePositiveTest crossstaffLeft(String crossstaffLeft) {
        this.crossstaffLeft = crossstaffLeft;
        return this;
    }

    public void setCrossstaffLeft(String crossstaffLeft) {
        this.crossstaffLeft = crossstaffLeft;
    }

    public String getCrossstaffRight() {
        return crossstaffRight;
    }

    public QmsBogiepressurePositiveTest crossstaffRight(String crossstaffRight) {
        this.crossstaffRight = crossstaffRight;
        return this;
    }

    public void setCrossstaffRight(String crossstaffRight) {
        this.crossstaffRight = crossstaffRight;
    }

    public String getCheckdate() {
        return checkdate;
    }

    public QmsBogiepressurePositiveTest checkdate(String checkdate) {
        this.checkdate = checkdate;
        return this;
    }

    public void setCheckdate(String checkdate) {
        this.checkdate = checkdate;
    }

    public String getChecktime() {
        return checktime;
    }

    public QmsBogiepressurePositiveTest checktime(String checktime) {
        this.checktime = checktime;
        return this;
    }

    public void setChecktime(String checktime) {
        this.checktime = checktime;
    }

    public String getWorkno() {
        return workno;
    }

    public QmsBogiepressurePositiveTest workno(String workno) {
        this.workno = workno;
        return this;
    }

    public void setWorkno(String workno) {
        this.workno = workno;
    }

    public String getCheckvalue1() {
        return checkvalue1;
    }

    public QmsBogiepressurePositiveTest checkvalue1(String checkvalue1) {
        this.checkvalue1 = checkvalue1;
        return this;
    }

    public void setCheckvalue1(String checkvalue1) {
        this.checkvalue1 = checkvalue1;
    }

    public String getCheckvalue2() {
        return checkvalue2;
    }

    public QmsBogiepressurePositiveTest checkvalue2(String checkvalue2) {
        this.checkvalue2 = checkvalue2;
        return this;
    }

    public void setCheckvalue2(String checkvalue2) {
        this.checkvalue2 = checkvalue2;
    }

    public String getFlagStatus() {
        return flagStatus;
    }

    public QmsBogiepressurePositiveTest flagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
        return this;
    }

    public void setFlagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
    }

    public String getCompPkid() {
        return compPkid;
    }

    public QmsBogiepressurePositiveTest compPkid(String compPkid) {
        this.compPkid = compPkid;
        return this;
    }

    public void setCompPkid(String compPkid) {
        this.compPkid = compPkid;
    }

    public String getRemark() {
        return remark;
    }

    public QmsBogiepressurePositiveTest remark(String remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getReserveFirst() {
        return reserveFirst;
    }

    public QmsBogiepressurePositiveTest reserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
        return this;
    }

    public void setReserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
    }

    public String getReserveSecond() {
        return reserveSecond;
    }

    public QmsBogiepressurePositiveTest reserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
        return this;
    }

    public void setReserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
    }

    public String getReserveThird() {
        return reserveThird;
    }

    public QmsBogiepressurePositiveTest reserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
        return this;
    }

    public void setReserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
    }

    public String getMakeUser() {
        return makeUser;
    }

    public QmsBogiepressurePositiveTest makeUser(String makeUser) {
        this.makeUser = makeUser;
        return this;
    }

    public void setMakeUser(String makeUser) {
        this.makeUser = makeUser;
    }

    public ZonedDateTime getMakeTime() {
        return makeTime;
    }

    public QmsBogiepressurePositiveTest makeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
        return this;
    }

    public void setMakeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public QmsBogiepressurePositiveTest modifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
        return this;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    public ZonedDateTime getModifyTime() {
        return modifyTime;
    }

    public QmsBogiepressurePositiveTest modifyTime(ZonedDateTime modifyTime) {
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
        QmsBogiepressurePositiveTest qmsBogiepressurePositiveTest = (QmsBogiepressurePositiveTest) o;
        if (qmsBogiepressurePositiveTest.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), qmsBogiepressurePositiveTest.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QmsBogiepressurePositiveTest{" +
            "id=" + getId() +
            ", place='" + getPlace() + "'" +
            ", bolster='" + getBolster() + "'" +
            ", sideframeLeft='" + getSideframeLeft() + "'" +
            ", sideframeRight='" + getSideframeRight() + "'" +
            ", crossstaffLeft='" + getCrossstaffLeft() + "'" +
            ", crossstaffRight='" + getCrossstaffRight() + "'" +
            ", checkdate='" + getCheckdate() + "'" +
            ", checktime='" + getChecktime() + "'" +
            ", workno='" + getWorkno() + "'" +
            ", checkvalue1='" + getCheckvalue1() + "'" +
            ", checkvalue2='" + getCheckvalue2() + "'" +
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
