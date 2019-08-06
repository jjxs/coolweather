package cn.com.cnc.fcc.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A QmsUnqualifiedMateriel.
 */
@Entity
@Table(name = "qms_unqualified_materiel")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QmsUnqualifiedMateriel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "materiel_details_id")
    private Integer materielDetailsId;

    @Column(name = "bom_technology_id")
    private Integer bomTechnologyId;

    @Column(name = "process_id")
    private Integer processId;

    @Column(name = "discover_user_id")
    private Integer discoverUserId;

    @Column(name = "discover_time")
    private ZonedDateTime discoverTime;

    @Size(max = 1000)
    @Column(name = "problem_description", length = 1000)
    private String problemDescription;

    @Size(max = 1)
    @Column(name = "deal_with", length = 1)
    private String dealWith;

    @Size(max = 1)
    @Column(name = "use_diff", length = 1)
    private String useDiff;

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

    public Integer getMaterielDetailsId() {
        return materielDetailsId;
    }

    public QmsUnqualifiedMateriel materielDetailsId(Integer materielDetailsId) {
        this.materielDetailsId = materielDetailsId;
        return this;
    }

    public void setMaterielDetailsId(Integer materielDetailsId) {
        this.materielDetailsId = materielDetailsId;
    }

    public Integer getBomTechnologyId() {
        return bomTechnologyId;
    }

    public QmsUnqualifiedMateriel bomTechnologyId(Integer bomTechnologyId) {
        this.bomTechnologyId = bomTechnologyId;
        return this;
    }

    public void setBomTechnologyId(Integer bomTechnologyId) {
        this.bomTechnologyId = bomTechnologyId;
    }

    public Integer getProcessId() {
        return processId;
    }

    public QmsUnqualifiedMateriel processId(Integer processId) {
        this.processId = processId;
        return this;
    }

    public void setProcessId(Integer processId) {
        this.processId = processId;
    }

    public Integer getDiscoverUserId() {
        return discoverUserId;
    }

    public QmsUnqualifiedMateriel discoverUserId(Integer discoverUserId) {
        this.discoverUserId = discoverUserId;
        return this;
    }

    public void setDiscoverUserId(Integer discoverUserId) {
        this.discoverUserId = discoverUserId;
    }

    public ZonedDateTime getDiscoverTime() {
        return discoverTime;
    }

    public QmsUnqualifiedMateriel discoverTime(ZonedDateTime discoverTime) {
        this.discoverTime = discoverTime;
        return this;
    }

    public void setDiscoverTime(ZonedDateTime discoverTime) {
        this.discoverTime = discoverTime;
    }

    public String getProblemDescription() {
        return problemDescription;
    }

    public QmsUnqualifiedMateriel problemDescription(String problemDescription) {
        this.problemDescription = problemDescription;
        return this;
    }

    public void setProblemDescription(String problemDescription) {
        this.problemDescription = problemDescription;
    }

    public String getDealWith() {
        return dealWith;
    }

    public QmsUnqualifiedMateriel dealWith(String dealWith) {
        this.dealWith = dealWith;
        return this;
    }

    public void setDealWith(String dealWith) {
        this.dealWith = dealWith;
    }

    public String getUseDiff() {
        return useDiff;
    }

    public QmsUnqualifiedMateriel useDiff(String useDiff) {
        this.useDiff = useDiff;
        return this;
    }

    public void setUseDiff(String useDiff) {
        this.useDiff = useDiff;
    }

    public String getFlagStatus() {
        return flagStatus;
    }

    public QmsUnqualifiedMateriel flagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
        return this;
    }

    public void setFlagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
    }

    public String getCompPkid() {
        return compPkid;
    }

    public QmsUnqualifiedMateriel compPkid(String compPkid) {
        this.compPkid = compPkid;
        return this;
    }

    public void setCompPkid(String compPkid) {
        this.compPkid = compPkid;
    }

    public String getRemark() {
        return remark;
    }

    public QmsUnqualifiedMateriel remark(String remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getReserveFirst() {
        return reserveFirst;
    }

    public QmsUnqualifiedMateriel reserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
        return this;
    }

    public void setReserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
    }

    public String getReserveSecond() {
        return reserveSecond;
    }

    public QmsUnqualifiedMateriel reserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
        return this;
    }

    public void setReserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
    }

    public String getReserveThird() {
        return reserveThird;
    }

    public QmsUnqualifiedMateriel reserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
        return this;
    }

    public void setReserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
    }

    public String getMakeUser() {
        return makeUser;
    }

    public QmsUnqualifiedMateriel makeUser(String makeUser) {
        this.makeUser = makeUser;
        return this;
    }

    public void setMakeUser(String makeUser) {
        this.makeUser = makeUser;
    }

    public ZonedDateTime getMakeTime() {
        return makeTime;
    }

    public QmsUnqualifiedMateriel makeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
        return this;
    }

    public void setMakeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public QmsUnqualifiedMateriel modifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
        return this;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    public ZonedDateTime getModifyTime() {
        return modifyTime;
    }

    public QmsUnqualifiedMateriel modifyTime(ZonedDateTime modifyTime) {
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
        QmsUnqualifiedMateriel qmsUnqualifiedMateriel = (QmsUnqualifiedMateriel) o;
        if (qmsUnqualifiedMateriel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), qmsUnqualifiedMateriel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QmsUnqualifiedMateriel{" +
            "id=" + getId() +
            ", materielDetailsId=" + getMaterielDetailsId() +
            ", bomTechnologyId=" + getBomTechnologyId() +
            ", processId=" + getProcessId() +
            ", discoverUserId=" + getDiscoverUserId() +
            ", discoverTime='" + getDiscoverTime() + "'" +
            ", problemDescription='" + getProblemDescription() + "'" +
            ", dealWith='" + getDealWith() + "'" +
            ", useDiff='" + getUseDiff() + "'" +
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
