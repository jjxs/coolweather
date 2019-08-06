import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FccRbacElementModule } from './rbac-element/rbac-element.module';
import { FccRbacUserRightRelationModule } from './rbac-user-right-relation/rbac-user-right-relation.module';
import { FccRbacUserModule } from './rbac-user/rbac-user.module';
import { FccRbacRoleRightRelationModule } from './rbac-role-right-relation/rbac-role-right-relation.module';
import { FccRbacRoleModule } from './rbac-role/rbac-role.module';
import { FccRbacRightModule } from './rbac-right/rbac-right.module';
import { FccRbacMenuRightRelationModule } from './rbac-menu-right-relation/rbac-menu-right-relation.module';
import { FccRbacMenuModule } from './rbac-menu/rbac-menu.module';
import { FccPapiTokenModule } from './papi-token/papi-token.module';
import { FccHstServerInfoModule } from './hst-server-info/hst-server-info.module';
import { FccHstServerInfoDetailsModule } from './hst-server-info-details/hst-server-info-details.module';
import { FccQmsProcessRouteModule } from './qms-process-route/qms-process-route.module';
import { FccQmsMaterielModule } from './qms-materiel/qms-materiel.module';
import { FccQmsEquipmentModule } from './qms-equipment/qms-equipment.module';
import { FccQmsOrganizationInfoModule } from './qms-organization-info/qms-organization-info.module';
import { FccQmsSupplierModule } from './qms-supplier/qms-supplier.module';
import { FccQmsUnitModule } from './qms-unit/qms-unit.module';
import { FccQmsMaterielTypeModule } from './qms-materiel-type/qms-materiel-type.module';
import { FccQmsMaterielDetailsModule } from './qms-materiel-details/qms-materiel-details.module';
import { FccQmsEntryInspectionModule } from './qms-entry-inspection/qms-entry-inspection.module';
import { FccQmsEnclosureModule } from './qms-enclosure/qms-enclosure.module';
import { FccQmsProductionInspectionModule } from './qms-production-inspection/qms-production-inspection.module';
import { FccQmsVehicleTypeInfoModule } from './qms-vehicle-type-info/qms-vehicle-type-info.module';
import { FccQmsQualityControlModule } from './qms-quality-control/qms-quality-control.module';
import { FccQmsQualityControlDetailsModule } from './qms-quality-control-details/qms-quality-control-details.module';
import { FccQmsQualityControlDetailsRelationModule } from './qms-quality-control-details-relation/qms-quality-control-details-relation.module';
import { FccQmsInspectionInfoModule } from './qms-inspection-info/qms-inspection-info.module';
import { FccQmsBomModule } from './qms-bom/qms-bom.module';
import { FccQmsBomTechnologyModule } from './qms-bom-technology/qms-bom-technology.module';
import { FccQmsPartsAssemblyRelationModule } from './qms-parts-assembly-relation/qms-parts-assembly-relation.module';
import { FccQmsProductionRelationModule } from './qms-production-relation/qms-production-relation.module';
import { FccQmsProcessModule } from './qms-process/qms-process.module';
import { FccQmsUnhealthyModule } from './qms-unhealthy/qms-unhealthy.module';
import { FccQmsDefectModule } from './qms-defect/qms-defect.module';
import { FccQmsProductModule } from './qms-product/qms-product.module';
import { FccQmsInspectionDetailsModule } from './qms-inspection-details/qms-inspection-details.module';
import { FccQmsNrvTelationModule } from './qms-nrv-telation/qms-nrv-telation.module';
import { FccQmsNoticeModule } from './qms-notice/qms-notice.module';
import { FccQmsControlDetailsModule } from './qms-control-details/qms-control-details.module';
import { FccQmsEntryControlDetailsModule } from './qms-entry-control-details/qms-entry-control-details.module';
import { FccQmsProductionInspectionResultModule } from './qms-production-inspection-result/qms-production-inspection-result.module';
import { FccQmsEntryInspectionResultModule } from './qms-entry-inspection-result/qms-entry-inspection-result.module';
import { FccQmsMaterielEntryModule } from './qms-materiel-entry/qms-materiel-entry.module';
import { FccQmsMaterielSupplierModule } from './qms-materiel-supplier/qms-materiel-supplier.module';
import { FccQmsMasterModule } from './qms-master/qms-master.module';
import { FccQmsVehicleTypeClassModule } from './qms-vehicle-type-class/qms-vehicle-type-class.module';
import { FccQmsSupplierClassModule } from './qms-supplier-class/qms-supplier-class.module';
import { FccQmsEntryControlCriterionModule } from './qms-entry-control-criterion/qms-entry-control-criterion.module';
import { FccQmsProductionTaskModule } from './qms-production-task/qms-production-task.module';
import { FccQmsCarRecordbookMainModule } from './qms-car-recordbook-main/qms-car-recordbook-main.module';
import { FccQmsCarRecordbookDetailsModule } from './qms-car-recordbook-details/qms-car-recordbook-details.module';
import { FccQmsBogiepressureTonTestModule } from './qms-bogiepressure-ton-test/qms-bogiepressure-ton-test.module';
import { FccQmsBogiepressurePositiveTestModule } from './qms-bogiepressure-positive-test/qms-bogiepressure-positive-test.module';
import { FccQmsIntelligentTriggerTestModule } from './qms-intelligent-trigger-test/qms-intelligent-trigger-test.module';
import { FccQmsMicSwicthRegulattoTestModule } from './qms-mic-swicth-regulatto-test/qms-mic-swicth-regulatto-test.module';
import { FccQmsBreathingSafetyTestModule } from './qms-breathing-safety-test/qms-breathing-safety-test.module';
import { FccQmsApproveFlowModule } from './qms-approve-flow/qms-approve-flow.module';
import { FccQmsApproveResultModule } from './qms-approve-result/qms-approve-result.module';
import { FccQmsUnqualifiedMaterielModule } from './qms-unqualified-materiel/qms-unqualified-materiel.module';
import { FccQmsUnqualifiedProductModule } from './qms-unqualified-product/qms-unqualified-product.module';
import { FccQmsUnqualifiedProductDetailsModule } from './qms-unqualified-product-details/qms-unqualified-product-details.module';
import { FccQmsProductionInspectionValueModule } from './qms-production-inspection-value/qms-production-inspection-value.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        
        FccRbacElementModule,
        FccRbacUserRightRelationModule,
        FccRbacUserModule,
        FccRbacRoleRightRelationModule,
        FccRbacRoleModule,
        FccRbacRightModule,
        FccRbacMenuRightRelationModule,
        FccRbacMenuModule,
        FccPapiTokenModule,
        FccHstServerInfoModule,
        FccHstServerInfoDetailsModule,
        FccQmsProcessRouteModule,
        FccQmsMaterielModule,
        FccQmsEquipmentModule,
        FccQmsOrganizationInfoModule,
        FccQmsSupplierModule,
        FccQmsUnitModule,
        FccQmsMaterielTypeModule,
        FccQmsMaterielDetailsModule,
        FccQmsEntryInspectionModule,
        FccQmsEnclosureModule,
        FccQmsProductionInspectionModule,
        FccQmsVehicleTypeInfoModule,
        FccQmsQualityControlModule,
        FccQmsQualityControlDetailsModule,
        FccQmsQualityControlDetailsRelationModule,
        FccQmsInspectionInfoModule,
        FccQmsBomModule,
        FccQmsBomTechnologyModule,
        FccQmsPartsAssemblyRelationModule,
        FccQmsProductionRelationModule,
        FccQmsProcessModule,
        FccQmsUnhealthyModule,
        FccQmsDefectModule,
        FccQmsProductModule,
        FccQmsInspectionDetailsModule,
        FccQmsNrvTelationModule,
        FccQmsNoticeModule,
        FccQmsControlDetailsModule,
        FccQmsEntryControlDetailsModule,
        FccQmsProductionInspectionResultModule,
        FccQmsEntryInspectionResultModule,
        FccQmsMaterielEntryModule,
        FccQmsMaterielSupplierModule,
        FccQmsMasterModule,
        FccQmsVehicleTypeClassModule,
        FccQmsSupplierClassModule,
        FccQmsEntryControlCriterionModule,
        FccQmsProductionTaskModule,
        FccQmsCarRecordbookMainModule,
        FccQmsCarRecordbookDetailsModule,
        FccQmsBogiepressureTonTestModule,
        FccQmsBogiepressurePositiveTestModule,
        FccQmsIntelligentTriggerTestModule,
        FccQmsMicSwicthRegulattoTestModule,
        FccQmsBreathingSafetyTestModule,
        FccQmsApproveFlowModule,
        FccQmsApproveResultModule,
        FccQmsUnqualifiedMaterielModule,
        FccQmsUnqualifiedProductModule,
        FccQmsUnqualifiedProductDetailsModule,
        FccQmsProductionInspectionValueModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccEntityModule {}
