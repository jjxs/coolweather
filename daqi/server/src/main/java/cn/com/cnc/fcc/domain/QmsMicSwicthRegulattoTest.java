package cn.com.cnc.fcc.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A QmsMicSwicthRegulattoTest.
 */
@Entity
@Table(name = "qms_mic_swicth_regulatto_test")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QmsMicSwicthRegulattoTest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 50)
    @Column(name = "sname", length = 50)
    private String sname;

    @Size(max = 50)
    @Column(name = "stype", length = 50)
    private String stype;

    @Size(max = 50)
    @Column(name = "scode", length = 50)
    private String scode;

    @Size(max = 50)
    @Column(name = "ddate", length = 50)
    private String ddate;

    @Size(max = 50)
    @Column(name = "il_0", length = 50)
    private String il0;

    @Size(max = 50)
    @Column(name = "izdg_s", length = 50)
    private String izdgS;

    @Size(max = 50)
    @Column(name = "sworker", length = 50)
    private String sworker;

    @Size(max = 50)
    @Column(name = "ssumup", length = 50)
    private String ssumup;

    @Size(max = 50)
    @Column(name = "sneworold", length = 50)
    private String sneworold;

    @Size(max = 50)
    @Column(name = "idian", length = 50)
    private String idian;

    @Size(max = 50)
    @Column(name = "izdg_0", length = 50)
    private String izdg0;

    @Size(max = 50)
    @Column(name = "izdg_1", length = 50)
    private String izdg1;

    @Size(max = 50)
    @Column(name = "izdg_2", length = 50)
    private String izdg2;

    @Size(max = 50)
    @Column(name = "izdg_3", length = 50)
    private String izdg3;

    @Size(max = 50)
    @Column(name = "izdg_4", length = 50)
    private String izdg4;

    @Size(max = 50)
    @Column(name = "izdg_5", length = 50)
    private String izdg5;

    @Size(max = 50)
    @Column(name = "izdg_6", length = 50)
    private String izdg6;

    @Size(max = 50)
    @Column(name = "izdg_7", length = 50)
    private String izdg7;

    @Size(max = 50)
    @Column(name = "iztq_0", length = 50)
    private String iztq0;

    @Size(max = 50)
    @Column(name = "iztq_1", length = 50)
    private String iztq1;

    @Size(max = 50)
    @Column(name = "iztq_2", length = 50)
    private String iztq2;

    @Size(max = 50)
    @Column(name = "iztq_3", length = 50)
    private String iztq3;

    @Size(max = 50)
    @Column(name = "iztq_4", length = 50)
    private String iztq4;

    @Size(max = 50)
    @Column(name = "iztq_5", length = 50)
    private String iztq5;

    @Size(max = 50)
    @Column(name = "iztq_6", length = 50)
    private String iztq6;

    @Size(max = 50)
    @Column(name = "iztq_7", length = 50)
    private String iztq7;

    @Size(max = 50)
    @Column(name = "iztq_8", length = 50)
    private String iztq8;

    @Size(max = 50)
    @Column(name = "iztq_9", length = 50)
    private String iztq9;

    @Size(max = 50)
    @Column(name = "iztq_10", length = 50)
    private String iztq10;

    @Size(max = 50)
    @Column(name = "iztq_11", length = 50)
    private String iztq11;

    @Size(max = 50)
    @Column(name = "iqdl", length = 50)
    private String iqdl;

    @Size(max = 50)
    @Column(name = "sresult_0", length = 50)
    private String sresult0;

    @Size(max = 50)
    @Column(name = "sresult_1", length = 50)
    private String sresult1;

    @Size(max = 50)
    @Column(name = "sresult_2", length = 50)
    private String sresult2;

    @Size(max = 50)
    @Column(name = "sresult_3", length = 50)
    private String sresult3;

    @Size(max = 50)
    @Column(name = "sresult_4", length = 50)
    private String sresult4;

    @Size(max = 50)
    @Column(name = "sresult_5", length = 50)
    private String sresult5;

    @Size(max = 50)
    @Column(name = "sresult_6", length = 50)
    private String sresult6;

    @Size(max = 50)
    @Column(name = "sresult", length = 50)
    private String sresult;

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

    public String getSname() {
        return sname;
    }

    public QmsMicSwicthRegulattoTest sname(String sname) {
        this.sname = sname;
        return this;
    }

    public void setSname(String sname) {
        this.sname = sname;
    }

    public String getStype() {
        return stype;
    }

    public QmsMicSwicthRegulattoTest stype(String stype) {
        this.stype = stype;
        return this;
    }

    public void setStype(String stype) {
        this.stype = stype;
    }

    public String getScode() {
        return scode;
    }

    public QmsMicSwicthRegulattoTest scode(String scode) {
        this.scode = scode;
        return this;
    }

    public void setScode(String scode) {
        this.scode = scode;
    }

    public String getDdate() {
        return ddate;
    }

    public QmsMicSwicthRegulattoTest ddate(String ddate) {
        this.ddate = ddate;
        return this;
    }

    public void setDdate(String ddate) {
        this.ddate = ddate;
    }

    public String getIl0() {
        return il0;
    }

    public QmsMicSwicthRegulattoTest il0(String il0) {
        this.il0 = il0;
        return this;
    }

    public void setIl0(String il0) {
        this.il0 = il0;
    }

    public String getIzdgS() {
        return izdgS;
    }

    public QmsMicSwicthRegulattoTest izdgS(String izdgS) {
        this.izdgS = izdgS;
        return this;
    }

    public void setIzdgS(String izdgS) {
        this.izdgS = izdgS;
    }

    public String getSworker() {
        return sworker;
    }

    public QmsMicSwicthRegulattoTest sworker(String sworker) {
        this.sworker = sworker;
        return this;
    }

    public void setSworker(String sworker) {
        this.sworker = sworker;
    }

    public String getSsumup() {
        return ssumup;
    }

    public QmsMicSwicthRegulattoTest ssumup(String ssumup) {
        this.ssumup = ssumup;
        return this;
    }

    public void setSsumup(String ssumup) {
        this.ssumup = ssumup;
    }

    public String getSneworold() {
        return sneworold;
    }

    public QmsMicSwicthRegulattoTest sneworold(String sneworold) {
        this.sneworold = sneworold;
        return this;
    }

    public void setSneworold(String sneworold) {
        this.sneworold = sneworold;
    }

    public String getIdian() {
        return idian;
    }

    public QmsMicSwicthRegulattoTest idian(String idian) {
        this.idian = idian;
        return this;
    }

    public void setIdian(String idian) {
        this.idian = idian;
    }

    public String getIzdg0() {
        return izdg0;
    }

    public QmsMicSwicthRegulattoTest izdg0(String izdg0) {
        this.izdg0 = izdg0;
        return this;
    }

    public void setIzdg0(String izdg0) {
        this.izdg0 = izdg0;
    }

    public String getIzdg1() {
        return izdg1;
    }

    public QmsMicSwicthRegulattoTest izdg1(String izdg1) {
        this.izdg1 = izdg1;
        return this;
    }

    public void setIzdg1(String izdg1) {
        this.izdg1 = izdg1;
    }

    public String getIzdg2() {
        return izdg2;
    }

    public QmsMicSwicthRegulattoTest izdg2(String izdg2) {
        this.izdg2 = izdg2;
        return this;
    }

    public void setIzdg2(String izdg2) {
        this.izdg2 = izdg2;
    }

    public String getIzdg3() {
        return izdg3;
    }

    public QmsMicSwicthRegulattoTest izdg3(String izdg3) {
        this.izdg3 = izdg3;
        return this;
    }

    public void setIzdg3(String izdg3) {
        this.izdg3 = izdg3;
    }

    public String getIzdg4() {
        return izdg4;
    }

    public QmsMicSwicthRegulattoTest izdg4(String izdg4) {
        this.izdg4 = izdg4;
        return this;
    }

    public void setIzdg4(String izdg4) {
        this.izdg4 = izdg4;
    }

    public String getIzdg5() {
        return izdg5;
    }

    public QmsMicSwicthRegulattoTest izdg5(String izdg5) {
        this.izdg5 = izdg5;
        return this;
    }

    public void setIzdg5(String izdg5) {
        this.izdg5 = izdg5;
    }

    public String getIzdg6() {
        return izdg6;
    }

    public QmsMicSwicthRegulattoTest izdg6(String izdg6) {
        this.izdg6 = izdg6;
        return this;
    }

    public void setIzdg6(String izdg6) {
        this.izdg6 = izdg6;
    }

    public String getIzdg7() {
        return izdg7;
    }

    public QmsMicSwicthRegulattoTest izdg7(String izdg7) {
        this.izdg7 = izdg7;
        return this;
    }

    public void setIzdg7(String izdg7) {
        this.izdg7 = izdg7;
    }

    public String getIztq0() {
        return iztq0;
    }

    public QmsMicSwicthRegulattoTest iztq0(String iztq0) {
        this.iztq0 = iztq0;
        return this;
    }

    public void setIztq0(String iztq0) {
        this.iztq0 = iztq0;
    }

    public String getIztq1() {
        return iztq1;
    }

    public QmsMicSwicthRegulattoTest iztq1(String iztq1) {
        this.iztq1 = iztq1;
        return this;
    }

    public void setIztq1(String iztq1) {
        this.iztq1 = iztq1;
    }

    public String getIztq2() {
        return iztq2;
    }

    public QmsMicSwicthRegulattoTest iztq2(String iztq2) {
        this.iztq2 = iztq2;
        return this;
    }

    public void setIztq2(String iztq2) {
        this.iztq2 = iztq2;
    }

    public String getIztq3() {
        return iztq3;
    }

    public QmsMicSwicthRegulattoTest iztq3(String iztq3) {
        this.iztq3 = iztq3;
        return this;
    }

    public void setIztq3(String iztq3) {
        this.iztq3 = iztq3;
    }

    public String getIztq4() {
        return iztq4;
    }

    public QmsMicSwicthRegulattoTest iztq4(String iztq4) {
        this.iztq4 = iztq4;
        return this;
    }

    public void setIztq4(String iztq4) {
        this.iztq4 = iztq4;
    }

    public String getIztq5() {
        return iztq5;
    }

    public QmsMicSwicthRegulattoTest iztq5(String iztq5) {
        this.iztq5 = iztq5;
        return this;
    }

    public void setIztq5(String iztq5) {
        this.iztq5 = iztq5;
    }

    public String getIztq6() {
        return iztq6;
    }

    public QmsMicSwicthRegulattoTest iztq6(String iztq6) {
        this.iztq6 = iztq6;
        return this;
    }

    public void setIztq6(String iztq6) {
        this.iztq6 = iztq6;
    }

    public String getIztq7() {
        return iztq7;
    }

    public QmsMicSwicthRegulattoTest iztq7(String iztq7) {
        this.iztq7 = iztq7;
        return this;
    }

    public void setIztq7(String iztq7) {
        this.iztq7 = iztq7;
    }

    public String getIztq8() {
        return iztq8;
    }

    public QmsMicSwicthRegulattoTest iztq8(String iztq8) {
        this.iztq8 = iztq8;
        return this;
    }

    public void setIztq8(String iztq8) {
        this.iztq8 = iztq8;
    }

    public String getIztq9() {
        return iztq9;
    }

    public QmsMicSwicthRegulattoTest iztq9(String iztq9) {
        this.iztq9 = iztq9;
        return this;
    }

    public void setIztq9(String iztq9) {
        this.iztq9 = iztq9;
    }

    public String getIztq10() {
        return iztq10;
    }

    public QmsMicSwicthRegulattoTest iztq10(String iztq10) {
        this.iztq10 = iztq10;
        return this;
    }

    public void setIztq10(String iztq10) {
        this.iztq10 = iztq10;
    }

    public String getIztq11() {
        return iztq11;
    }

    public QmsMicSwicthRegulattoTest iztq11(String iztq11) {
        this.iztq11 = iztq11;
        return this;
    }

    public void setIztq11(String iztq11) {
        this.iztq11 = iztq11;
    }

    public String getIqdl() {
        return iqdl;
    }

    public QmsMicSwicthRegulattoTest iqdl(String iqdl) {
        this.iqdl = iqdl;
        return this;
    }

    public void setIqdl(String iqdl) {
        this.iqdl = iqdl;
    }

    public String getSresult0() {
        return sresult0;
    }

    public QmsMicSwicthRegulattoTest sresult0(String sresult0) {
        this.sresult0 = sresult0;
        return this;
    }

    public void setSresult0(String sresult0) {
        this.sresult0 = sresult0;
    }

    public String getSresult1() {
        return sresult1;
    }

    public QmsMicSwicthRegulattoTest sresult1(String sresult1) {
        this.sresult1 = sresult1;
        return this;
    }

    public void setSresult1(String sresult1) {
        this.sresult1 = sresult1;
    }

    public String getSresult2() {
        return sresult2;
    }

    public QmsMicSwicthRegulattoTest sresult2(String sresult2) {
        this.sresult2 = sresult2;
        return this;
    }

    public void setSresult2(String sresult2) {
        this.sresult2 = sresult2;
    }

    public String getSresult3() {
        return sresult3;
    }

    public QmsMicSwicthRegulattoTest sresult3(String sresult3) {
        this.sresult3 = sresult3;
        return this;
    }

    public void setSresult3(String sresult3) {
        this.sresult3 = sresult3;
    }

    public String getSresult4() {
        return sresult4;
    }

    public QmsMicSwicthRegulattoTest sresult4(String sresult4) {
        this.sresult4 = sresult4;
        return this;
    }

    public void setSresult4(String sresult4) {
        this.sresult4 = sresult4;
    }

    public String getSresult5() {
        return sresult5;
    }

    public QmsMicSwicthRegulattoTest sresult5(String sresult5) {
        this.sresult5 = sresult5;
        return this;
    }

    public void setSresult5(String sresult5) {
        this.sresult5 = sresult5;
    }

    public String getSresult6() {
        return sresult6;
    }

    public QmsMicSwicthRegulattoTest sresult6(String sresult6) {
        this.sresult6 = sresult6;
        return this;
    }

    public void setSresult6(String sresult6) {
        this.sresult6 = sresult6;
    }

    public String getSresult() {
        return sresult;
    }

    public QmsMicSwicthRegulattoTest sresult(String sresult) {
        this.sresult = sresult;
        return this;
    }

    public void setSresult(String sresult) {
        this.sresult = sresult;
    }

    public String getFlagStatus() {
        return flagStatus;
    }

    public QmsMicSwicthRegulattoTest flagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
        return this;
    }

    public void setFlagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
    }

    public String getCompPkid() {
        return compPkid;
    }

    public QmsMicSwicthRegulattoTest compPkid(String compPkid) {
        this.compPkid = compPkid;
        return this;
    }

    public void setCompPkid(String compPkid) {
        this.compPkid = compPkid;
    }

    public String getRemark() {
        return remark;
    }

    public QmsMicSwicthRegulattoTest remark(String remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getReserveFirst() {
        return reserveFirst;
    }

    public QmsMicSwicthRegulattoTest reserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
        return this;
    }

    public void setReserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
    }

    public String getReserveSecond() {
        return reserveSecond;
    }

    public QmsMicSwicthRegulattoTest reserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
        return this;
    }

    public void setReserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
    }

    public String getReserveThird() {
        return reserveThird;
    }

    public QmsMicSwicthRegulattoTest reserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
        return this;
    }

    public void setReserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
    }

    public String getMakeUser() {
        return makeUser;
    }

    public QmsMicSwicthRegulattoTest makeUser(String makeUser) {
        this.makeUser = makeUser;
        return this;
    }

    public void setMakeUser(String makeUser) {
        this.makeUser = makeUser;
    }

    public ZonedDateTime getMakeTime() {
        return makeTime;
    }

    public QmsMicSwicthRegulattoTest makeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
        return this;
    }

    public void setMakeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public QmsMicSwicthRegulattoTest modifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
        return this;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    public ZonedDateTime getModifyTime() {
        return modifyTime;
    }

    public QmsMicSwicthRegulattoTest modifyTime(ZonedDateTime modifyTime) {
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
        QmsMicSwicthRegulattoTest qmsMicSwicthRegulattoTest = (QmsMicSwicthRegulattoTest) o;
        if (qmsMicSwicthRegulattoTest.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), qmsMicSwicthRegulattoTest.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QmsMicSwicthRegulattoTest{" +
            "id=" + getId() +
            ", sname='" + getSname() + "'" +
            ", stype='" + getStype() + "'" +
            ", scode='" + getScode() + "'" +
            ", ddate='" + getDdate() + "'" +
            ", il0='" + getIl0() + "'" +
            ", izdgS='" + getIzdgS() + "'" +
            ", sworker='" + getSworker() + "'" +
            ", ssumup='" + getSsumup() + "'" +
            ", sneworold='" + getSneworold() + "'" +
            ", idian='" + getIdian() + "'" +
            ", izdg0='" + getIzdg0() + "'" +
            ", izdg1='" + getIzdg1() + "'" +
            ", izdg2='" + getIzdg2() + "'" +
            ", izdg3='" + getIzdg3() + "'" +
            ", izdg4='" + getIzdg4() + "'" +
            ", izdg5='" + getIzdg5() + "'" +
            ", izdg6='" + getIzdg6() + "'" +
            ", izdg7='" + getIzdg7() + "'" +
            ", iztq0='" + getIztq0() + "'" +
            ", iztq1='" + getIztq1() + "'" +
            ", iztq2='" + getIztq2() + "'" +
            ", iztq3='" + getIztq3() + "'" +
            ", iztq4='" + getIztq4() + "'" +
            ", iztq5='" + getIztq5() + "'" +
            ", iztq6='" + getIztq6() + "'" +
            ", iztq7='" + getIztq7() + "'" +
            ", iztq8='" + getIztq8() + "'" +
            ", iztq9='" + getIztq9() + "'" +
            ", iztq10='" + getIztq10() + "'" +
            ", iztq11='" + getIztq11() + "'" +
            ", iqdl='" + getIqdl() + "'" +
            ", sresult0='" + getSresult0() + "'" +
            ", sresult1='" + getSresult1() + "'" +
            ", sresult2='" + getSresult2() + "'" +
            ", sresult3='" + getSresult3() + "'" +
            ", sresult4='" + getSresult4() + "'" +
            ", sresult5='" + getSresult5() + "'" +
            ", sresult6='" + getSresult6() + "'" +
            ", sresult='" + getSresult() + "'" +
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
