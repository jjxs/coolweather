package cn.com.cnc.fcc.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A PapiTokenSlave.
 */
@Entity
@Table(name = "papi_token_slave")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PapiTokenSlave implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "app_id")
    private Integer appId;

    @Column(name = "store_id")
    private Integer storeId;

    @Size(max = 3)
    @Column(name = "dis_type", length = 3)
    private String disType;

    @Size(max = 20)
    @Column(name = "api_code", length = 20)
    private String apiCode;

    @Size(max = 64)
    @Column(name = "api_password", length = 64)
    private String apiPassword;

    @Size(max = 255)
    @Column(name = "api_token", length = 255)
    private String apiToken;

    @Size(max = 255)
    @Column(name = "memo_info", length = 255)
    private String memoInfo;

    @Column(name = "stop_flag")
    private Integer stopFlag;

    @Column(name = "del_flag")
    private Integer delFlag;

    @Size(max = 20)
    @Column(name = "ins_progarm_cd", length = 20)
    private String insProgarmCd;

    @Size(max = 20)
    @Column(name = "ins_oper_cd", length = 20)
    private String insOperCd;

    @Column(name = "ins_date_time")
    private ZonedDateTime insDateTime;

    @Size(max = 20)
    @Column(name = "upd_progarm_cd", length = 20)
    private String updProgarmCd;

    @Size(max = 20)
    @Column(name = "upd_oper_cd", length = 20)
    private String updOperCd;

    @Column(name = "upd_date_time")
    private ZonedDateTime updDateTime;

    @Size(max = 20)
    @Column(name = "del_progarm_cd", length = 20)
    private String delProgarmCd;

    @Size(max = 20)
    @Column(name = "del_oper_cd", length = 20)
    private String delOperCd;

    @Column(name = "del_date_time")
    private ZonedDateTime delDateTime;

    @Column(name = "trigger_date_time")
    private ZonedDateTime triggerDateTime;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAppId() {
        return appId;
    }

    public PapiTokenSlave appId(Integer appId) {
        this.appId = appId;
        return this;
    }

    public void setAppId(Integer appId) {
        this.appId = appId;
    }

    public Integer getStoreId() {
        return storeId;
    }

    public PapiTokenSlave storeId(Integer storeId) {
        this.storeId = storeId;
        return this;
    }

    public void setStoreId(Integer storeId) {
        this.storeId = storeId;
    }

    public String getDisType() {
        return disType;
    }

    public PapiTokenSlave disType(String disType) {
        this.disType = disType;
        return this;
    }

    public void setDisType(String disType) {
        this.disType = disType;
    }

    public String getApiCode() {
        return apiCode;
    }

    public PapiTokenSlave apiCode(String apiCode) {
        this.apiCode = apiCode;
        return this;
    }

    public void setApiCode(String apiCode) {
        this.apiCode = apiCode;
    }

    public String getApiPassword() {
        return apiPassword;
    }

    public PapiTokenSlave apiPassword(String apiPassword) {
        this.apiPassword = apiPassword;
        return this;
    }

    public void setApiPassword(String apiPassword) {
        this.apiPassword = apiPassword;
    }

    public String getApiToken() {
        return apiToken;
    }

    public PapiTokenSlave apiToken(String apiToken) {
        this.apiToken = apiToken;
        return this;
    }

    public void setApiToken(String apiToken) {
        this.apiToken = apiToken;
    }

    public String getMemoInfo() {
        return memoInfo;
    }

    public PapiTokenSlave memoInfo(String memoInfo) {
        this.memoInfo = memoInfo;
        return this;
    }

    public void setMemoInfo(String memoInfo) {
        this.memoInfo = memoInfo;
    }

    public Integer getStopFlag() {
        return stopFlag;
    }

    public PapiTokenSlave stopFlag(Integer stopFlag) {
        this.stopFlag = stopFlag;
        return this;
    }

    public void setStopFlag(Integer stopFlag) {
        this.stopFlag = stopFlag;
    }

    public Integer getDelFlag() {
        return delFlag;
    }

    public PapiTokenSlave delFlag(Integer delFlag) {
        this.delFlag = delFlag;
        return this;
    }

    public void setDelFlag(Integer delFlag) {
        this.delFlag = delFlag;
    }

    public String getInsProgarmCd() {
        return insProgarmCd;
    }

    public PapiTokenSlave insProgarmCd(String insProgarmCd) {
        this.insProgarmCd = insProgarmCd;
        return this;
    }

    public void setInsProgarmCd(String insProgarmCd) {
        this.insProgarmCd = insProgarmCd;
    }

    public String getInsOperCd() {
        return insOperCd;
    }

    public PapiTokenSlave insOperCd(String insOperCd) {
        this.insOperCd = insOperCd;
        return this;
    }

    public void setInsOperCd(String insOperCd) {
        this.insOperCd = insOperCd;
    }

    public ZonedDateTime getInsDateTime() {
        return insDateTime;
    }

    public PapiTokenSlave insDateTime(ZonedDateTime insDateTime) {
        this.insDateTime = insDateTime;
        return this;
    }

    public void setInsDateTime(ZonedDateTime insDateTime) {
        this.insDateTime = insDateTime;
    }

    public String getUpdProgarmCd() {
        return updProgarmCd;
    }

    public PapiTokenSlave updProgarmCd(String updProgarmCd) {
        this.updProgarmCd = updProgarmCd;
        return this;
    }

    public void setUpdProgarmCd(String updProgarmCd) {
        this.updProgarmCd = updProgarmCd;
    }

    public String getUpdOperCd() {
        return updOperCd;
    }

    public PapiTokenSlave updOperCd(String updOperCd) {
        this.updOperCd = updOperCd;
        return this;
    }

    public void setUpdOperCd(String updOperCd) {
        this.updOperCd = updOperCd;
    }

    public ZonedDateTime getUpdDateTime() {
        return updDateTime;
    }

    public PapiTokenSlave updDateTime(ZonedDateTime updDateTime) {
        this.updDateTime = updDateTime;
        return this;
    }

    public void setUpdDateTime(ZonedDateTime updDateTime) {
        this.updDateTime = updDateTime;
    }

    public String getDelProgarmCd() {
        return delProgarmCd;
    }

    public PapiTokenSlave delProgarmCd(String delProgarmCd) {
        this.delProgarmCd = delProgarmCd;
        return this;
    }

    public void setDelProgarmCd(String delProgarmCd) {
        this.delProgarmCd = delProgarmCd;
    }

    public String getDelOperCd() {
        return delOperCd;
    }

    public PapiTokenSlave delOperCd(String delOperCd) {
        this.delOperCd = delOperCd;
        return this;
    }

    public void setDelOperCd(String delOperCd) {
        this.delOperCd = delOperCd;
    }

    public ZonedDateTime getDelDateTime() {
        return delDateTime;
    }

    public PapiTokenSlave delDateTime(ZonedDateTime delDateTime) {
        this.delDateTime = delDateTime;
        return this;
    }

    public void setDelDateTime(ZonedDateTime delDateTime) {
        this.delDateTime = delDateTime;
    }

    public ZonedDateTime getTriggerDateTime() {
        return triggerDateTime;
    }

    public PapiTokenSlave triggerDateTime(ZonedDateTime triggerDateTime) {
        this.triggerDateTime = triggerDateTime;
        return this;
    }

    public void setTriggerDateTime(ZonedDateTime triggerDateTime) {
        this.triggerDateTime = triggerDateTime;
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
        PapiTokenSlave papiTokenSlave = (PapiTokenSlave) o;
        if (papiTokenSlave.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), papiTokenSlave.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PapiTokenSlave{" +
            "id=" + getId() +
            ", appId=" + getAppId() +
            ", storeId=" + getStoreId() +
            ", disType='" + getDisType() + "'" +
            ", apiCode='" + getApiCode() + "'" +
            ", apiPassword='" + getApiPassword() + "'" +
            ", apiToken='" + getApiToken() + "'" +
            ", memoInfo='" + getMemoInfo() + "'" +
            ", stopFlag=" + getStopFlag() +
            ", delFlag=" + getDelFlag() +
            ", insProgarmCd='" + getInsProgarmCd() + "'" +
            ", insOperCd='" + getInsOperCd() + "'" +
            ", insDateTime='" + getInsDateTime() + "'" +
            ", updProgarmCd='" + getUpdProgarmCd() + "'" +
            ", updOperCd='" + getUpdOperCd() + "'" +
            ", updDateTime='" + getUpdDateTime() + "'" +
            ", delProgarmCd='" + getDelProgarmCd() + "'" +
            ", delOperCd='" + getDelOperCd() + "'" +
            ", delDateTime='" + getDelDateTime() + "'" +
            ", triggerDateTime='" + getTriggerDateTime() + "'" +
            "}";
    }
}
