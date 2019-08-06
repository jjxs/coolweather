package cn.com.cnc.fcc.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A QmsBogiepressureTonTest.
 */
@Entity
@Table(name = "qms_bogiepressure_ton_test")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QmsBogiepressureTonTest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 50)
    @Column(name = "pkid", length = 50)
    private String pkid;

    @Size(max = 50)
    @Column(name = "productdate", length = 50)
    private String productdate;

    @Size(max = 50)
    @Column(name = "checker", length = 50)
    private String checker;

    @Size(max = 50)
    @Column(name = "checkdate", length = 50)
    private String checkdate;

    @Size(max = 50)
    @Column(name = "x_1", length = 50)
    private String x1;

    @Size(max = 50)
    @Column(name = "y_1", length = 50)
    private String y1;

    @Size(max = 50)
    @Column(name = "z_1", length = 50)
    private String z1;

    @Size(max = 50)
    @Column(name = "v_1", length = 50)
    private String v1;

    @Size(max = 50)
    @Column(name = "a_1", length = 50)
    private String a1;

    @Size(max = 50)
    @Column(name = "x_2", length = 50)
    private String x2;

    @Size(max = 50)
    @Column(name = "y_2", length = 50)
    private String y2;

    @Size(max = 50)
    @Column(name = "z_2", length = 50)
    private String z2;

    @Size(max = 50)
    @Column(name = "v_2", length = 50)
    private String v2;

    @Size(max = 50)
    @Column(name = "a_2", length = 50)
    private String a2;

    @Size(max = 50)
    @Column(name = "judge", length = 50)
    private String judge;

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

    public String getPkid() {
        return pkid;
    }

    public QmsBogiepressureTonTest pkid(String pkid) {
        this.pkid = pkid;
        return this;
    }

    public void setPkid(String pkid) {
        this.pkid = pkid;
    }

    public String getProductdate() {
        return productdate;
    }

    public QmsBogiepressureTonTest productdate(String productdate) {
        this.productdate = productdate;
        return this;
    }

    public void setProductdate(String productdate) {
        this.productdate = productdate;
    }

    public String getChecker() {
        return checker;
    }

    public QmsBogiepressureTonTest checker(String checker) {
        this.checker = checker;
        return this;
    }

    public void setChecker(String checker) {
        this.checker = checker;
    }

    public String getCheckdate() {
        return checkdate;
    }

    public QmsBogiepressureTonTest checkdate(String checkdate) {
        this.checkdate = checkdate;
        return this;
    }

    public void setCheckdate(String checkdate) {
        this.checkdate = checkdate;
    }

    public String getx1() {
        return x1;
    }

    public QmsBogiepressureTonTest x1(String x1) {
        this.x1 = x1;
        return this;
    }

    public void setx1(String x1) {
        this.x1 = x1;
    }

    public String gety1() {
        return y1;
    }

    public QmsBogiepressureTonTest y1(String y1) {
        this.y1 = y1;
        return this;
    }

    public void sety1(String y1) {
        this.y1 = y1;
    }

    public String getz1() {
        return z1;
    }

    public QmsBogiepressureTonTest z1(String z1) {
        this.z1 = z1;
        return this;
    }

    public void setz1(String z1) {
        this.z1 = z1;
    }

    public String getv1() {
        return v1;
    }

    public QmsBogiepressureTonTest v1(String v1) {
        this.v1 = v1;
        return this;
    }

    public void setv1(String v1) {
        this.v1 = v1;
    }

    public String geta1() {
        return a1;
    }

    public QmsBogiepressureTonTest a1(String a1) {
        this.a1 = a1;
        return this;
    }

    public void seta1(String a1) {
        this.a1 = a1;
    }

    public String getx2() {
        return x2;
    }

    public QmsBogiepressureTonTest x2(String x2) {
        this.x2 = x2;
        return this;
    }

    public void setx2(String x2) {
        this.x2 = x2;
    }

    public String gety2() {
        return y2;
    }

    public QmsBogiepressureTonTest y2(String y2) {
        this.y2 = y2;
        return this;
    }

    public void sety2(String y2) {
        this.y2 = y2;
    }

    public String getz2() {
        return z2;
    }

    public QmsBogiepressureTonTest z2(String z2) {
        this.z2 = z2;
        return this;
    }

    public void setz2(String z2) {
        this.z2 = z2;
    }

    public String getv2() {
        return v2;
    }

    public QmsBogiepressureTonTest v2(String v2) {
        this.v2 = v2;
        return this;
    }

    public void setv2(String v2) {
        this.v2 = v2;
    }

    public String geta2() {
        return a2;
    }

    public QmsBogiepressureTonTest a2(String a2) {
        this.a2 = a2;
        return this;
    }

    public void seta2(String a2) {
        this.a2 = a2;
    }

    public String getJudge() {
        return judge;
    }

    public QmsBogiepressureTonTest judge(String judge) {
        this.judge = judge;
        return this;
    }

    public void setJudge(String judge) {
        this.judge = judge;
    }

    public String getFlagStatus() {
        return flagStatus;
    }

    public QmsBogiepressureTonTest flagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
        return this;
    }

    public void setFlagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
    }

    public String getCompPkid() {
        return compPkid;
    }

    public QmsBogiepressureTonTest compPkid(String compPkid) {
        this.compPkid = compPkid;
        return this;
    }

    public void setCompPkid(String compPkid) {
        this.compPkid = compPkid;
    }

    public String getRemark() {
        return remark;
    }

    public QmsBogiepressureTonTest remark(String remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getReserveFirst() {
        return reserveFirst;
    }

    public QmsBogiepressureTonTest reserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
        return this;
    }

    public void setReserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
    }

    public String getReserveSecond() {
        return reserveSecond;
    }

    public QmsBogiepressureTonTest reserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
        return this;
    }

    public void setReserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
    }

    public String getReserveThird() {
        return reserveThird;
    }

    public QmsBogiepressureTonTest reserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
        return this;
    }

    public void setReserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
    }

    public String getMakeUser() {
        return makeUser;
    }

    public QmsBogiepressureTonTest makeUser(String makeUser) {
        this.makeUser = makeUser;
        return this;
    }

    public void setMakeUser(String makeUser) {
        this.makeUser = makeUser;
    }

    public ZonedDateTime getMakeTime() {
        return makeTime;
    }

    public QmsBogiepressureTonTest makeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
        return this;
    }

    public void setMakeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public QmsBogiepressureTonTest modifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
        return this;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    public ZonedDateTime getModifyTime() {
        return modifyTime;
    }

    public QmsBogiepressureTonTest modifyTime(ZonedDateTime modifyTime) {
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
        QmsBogiepressureTonTest qmsBogiepressureTonTest = (QmsBogiepressureTonTest) o;
        if (qmsBogiepressureTonTest.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), qmsBogiepressureTonTest.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QmsBogiepressureTonTest{" +
            "id=" + getId() +
            ", pkid='" + getPkid() + "'" +
            ", productdate='" + getProductdate() + "'" +
            ", checker='" + getChecker() + "'" +
            ", checkdate='" + getCheckdate() + "'" +
            ", x1='" + getx1() + "'" +
            ", y1='" + gety1() + "'" +
            ", z1='" + getz1() + "'" +
            ", v1='" + getv1() + "'" +
            ", a1='" + geta1() + "'" +
            ", x2='" + getx2() + "'" +
            ", y2='" + gety2() + "'" +
            ", z2='" + getz2() + "'" +
            ", v2='" + getv2() + "'" +
            ", a2='" + geta2() + "'" +
            ", judge='" + getJudge() + "'" +
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
