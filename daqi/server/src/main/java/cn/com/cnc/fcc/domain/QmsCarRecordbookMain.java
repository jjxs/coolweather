package cn.com.cnc.fcc.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A QmsCarRecordbookMain.
 */
@Entity
@Table(name = "qms_car_recordbook_main")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QmsCarRecordbookMain implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "recordbook_seq")
    private Integer recordbookSeq;

    @Size(max = 100)
    @Column(name = "recordbook_name", length = 100)
    private String recordbookName;

    @Column(name = "recordbook_num")
    private Integer recordbookNum;

    @Size(max = 1)
    @Column(name = "recordbook_check", length = 1)
    private String recordbookCheck;

    @Size(max = 20)
    @Column(name = "filecodepre", length = 20)
    private String filecodepre;

    @Size(max = 20)
    @Column(name = "edit_user", length = 20)
    private String editUser;

    @Size(max = 20)
    @Column(name = "check_user", length = 20)
    private String checkUser;

    @Size(max = 20)
    @Column(name = "standard_user", length = 20)
    private String standardUser;

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

    public Integer getRecordbookSeq() {
        return recordbookSeq;
    }

    public QmsCarRecordbookMain recordbookSeq(Integer recordbookSeq) {
        this.recordbookSeq = recordbookSeq;
        return this;
    }

    public void setRecordbookSeq(Integer recordbookSeq) {
        this.recordbookSeq = recordbookSeq;
    }

    public String getRecordbookName() {
        return recordbookName;
    }

    public QmsCarRecordbookMain recordbookName(String recordbookName) {
        this.recordbookName = recordbookName;
        return this;
    }

    public void setRecordbookName(String recordbookName) {
        this.recordbookName = recordbookName;
    }

    public Integer getRecordbookNum() {
        return recordbookNum;
    }

    public QmsCarRecordbookMain recordbookNum(Integer recordbookNum) {
        this.recordbookNum = recordbookNum;
        return this;
    }

    public void setRecordbookNum(Integer recordbookNum) {
        this.recordbookNum = recordbookNum;
    }

    public String getRecordbookCheck() {
        return recordbookCheck;
    }

    public QmsCarRecordbookMain recordbookCheck(String recordbookCheck) {
        this.recordbookCheck = recordbookCheck;
        return this;
    }

    public void setRecordbookCheck(String recordbookCheck) {
        this.recordbookCheck = recordbookCheck;
    }

    public String getFilecodepre() {
        return filecodepre;
    }

    public QmsCarRecordbookMain filecodepre(String filecodepre) {
        this.filecodepre = filecodepre;
        return this;
    }

    public void setFilecodepre(String filecodepre) {
        this.filecodepre = filecodepre;
    }

    public String getEditUser() {
        return editUser;
    }

    public QmsCarRecordbookMain editUser(String editUser) {
        this.editUser = editUser;
        return this;
    }

    public void setEditUser(String editUser) {
        this.editUser = editUser;
    }

    public String getCheckUser() {
        return checkUser;
    }

    public QmsCarRecordbookMain checkUser(String checkUser) {
        this.checkUser = checkUser;
        return this;
    }

    public void setCheckUser(String checkUser) {
        this.checkUser = checkUser;
    }

    public String getStandardUser() {
        return standardUser;
    }

    public QmsCarRecordbookMain standardUser(String standardUser) {
        this.standardUser = standardUser;
        return this;
    }

    public void setStandardUser(String standardUser) {
        this.standardUser = standardUser;
    }

    public String getFlagStatus() {
        return flagStatus;
    }

    public QmsCarRecordbookMain flagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
        return this;
    }

    public void setFlagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
    }

    public String getCompPkid() {
        return compPkid;
    }

    public QmsCarRecordbookMain compPkid(String compPkid) {
        this.compPkid = compPkid;
        return this;
    }

    public void setCompPkid(String compPkid) {
        this.compPkid = compPkid;
    }

    public String getRemark() {
        return remark;
    }

    public QmsCarRecordbookMain remark(String remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getReserveFirst() {
        return reserveFirst;
    }

    public QmsCarRecordbookMain reserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
        return this;
    }

    public void setReserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
    }

    public String getReserveSecond() {
        return reserveSecond;
    }

    public QmsCarRecordbookMain reserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
        return this;
    }

    public void setReserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
    }

    public String getReserveThird() {
        return reserveThird;
    }

    public QmsCarRecordbookMain reserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
        return this;
    }

    public void setReserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
    }

    public String getMakeUser() {
        return makeUser;
    }

    public QmsCarRecordbookMain makeUser(String makeUser) {
        this.makeUser = makeUser;
        return this;
    }

    public void setMakeUser(String makeUser) {
        this.makeUser = makeUser;
    }

    public ZonedDateTime getMakeTime() {
        return makeTime;
    }

    public QmsCarRecordbookMain makeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
        return this;
    }

    public void setMakeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public QmsCarRecordbookMain modifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
        return this;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    public ZonedDateTime getModifyTime() {
        return modifyTime;
    }

    public QmsCarRecordbookMain modifyTime(ZonedDateTime modifyTime) {
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
        QmsCarRecordbookMain qmsCarRecordbookMain = (QmsCarRecordbookMain) o;
        if (qmsCarRecordbookMain.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), qmsCarRecordbookMain.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QmsCarRecordbookMain{" +
            "id=" + getId() +
            ", recordbookSeq=" + getRecordbookSeq() +
            ", recordbookName='" + getRecordbookName() + "'" +
            ", recordbookNum=" + getRecordbookNum() +
            ", recordbookCheck='" + getRecordbookCheck() + "'" +
            ", filecodepre='" + getFilecodepre() + "'" +
            ", editUser='" + getEditUser() + "'" +
            ", checkUser='" + getCheckUser() + "'" +
            ", standardUser='" + getStandardUser() + "'" +
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
