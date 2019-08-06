package cn.com.cnc.fcc.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(CacheConfigurationBuilder
                .newCacheConfigurationBuilder(Object.class, Object.class,
                        ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(
                        ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(cn.com.cnc.fcc.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.SystemBean.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.RbacElement.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.RbacUserRightRelation.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.RbacUser.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.RbacRoleRightRelation.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.RbacRole.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.RbacRight.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.RbacMenuRightRelation.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.RbacMenu.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.PapiToken.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.HstServerInfo.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.HstServerInfoDetails.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.PapiTokenSlave.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsProcessRoute.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsMateriel.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsEquipment.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsOrganizationInfo.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsSupplier.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsUnit.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsMaterielType.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsMaterielDetails.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsEntryInspection.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsEnclosure.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsProductionInspection.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsVehicleTypeInfo.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsQualityControlDetails.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsInspectionInfo.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsBom.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsBomTechnology.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsPartsAssemblyRelation.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsProductionRelation.class.getName(), jcacheConfiguration);

            cm.createCache(cn.com.cnc.fcc.domain.QmsProcess.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsUnhealthy.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsDefect.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsProduct.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsInspectionDetails.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsNrvTelation.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsNotice.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsControlDetails.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsEntryControlDetails.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsProductionInspectionResult.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsEntryInspectionResult.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsMaterielEntry.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsMaterielSupplier.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsMaster.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsVehicleTypeClass.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsSupplierClass.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsEntryControlCriterion.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsCarRecordbookDetails.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsProductionTask.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsCarRecordbookMain.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsBogiepressureTonTest.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsBogiepressurePositiveTest.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsIntelligentTriggerTest.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsMicSwicthRegulattoTest.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsBreathingSafetyTest.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsApproveFlow.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsApproveResult.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsUnqualifiedMateriel.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsUnqualifiedProduct.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsUnqualifiedProductDetails.class.getName(), jcacheConfiguration);
            cm.createCache(cn.com.cnc.fcc.domain.QmsProductionInspectionValue.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
