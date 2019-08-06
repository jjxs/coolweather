import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute, panelmenuRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
const LAYOUT_ROUTES = [navbarRoute, panelmenuRoute, ...errorRoute];

@NgModule({

  imports: [
    RouterModule.forRoot(
      [
        ...LAYOUT_ROUTES,
        {
          path: 'admin',
          loadChildren: './admin/admin.module#FccAdminModule'
        },
        {
          path: 'rbac-menu',
          loadChildren: './entities/rbac-menu/rbac-menu.module#FccRbacMenuModule'
        }, {
          path: 'rbac-user',
          loadChildren: './entities/rbac-user/rbac-user.module#FccRbacUserModule'
        }, {
          path: 'rbac-right',
          loadChildren: './entities/rbac-right/rbac-right.module#FccRbacRightModule'
        }, {
          path: 'rbac-role',
          loadChildren: './entities/rbac-role/rbac-role.module#FccRbacRoleModule'
        }, {
          path: 'supplier',
          loadChildren: './crrc/basics/crrctest/qms-supplier.module#FccQmsSupplierModule'
        }, {
          path: 'process',
          loadChildren: './crrc/basics/process/qms-process.module#FccQmsProcessModule'
        }, {
          path: 'organizational_Information',
          loadChildren: './crrc/basics/organizationalInformation/organizationalInformation.module#FccOrganizationalInformationModule'
        }, {
          path: 'unit',
          loadChildren: './crrc/basics/unit/qms-unit.module#FccQmsUnitModule'
        }, {
          path: 'adverse-reaction-information',
          loadChildren: './crrc/basics/adverse-reaction-information/adverse-reaction-information.module#FccAdverseReactionInformationModule'
        }, {
          path: 'materiel',
          loadChildren: './crrc/basics/materiel/qms-materiel.module#FccQmsMaterielModule'
        }, {
          path: 'defect-information',
          loadChildren: './crrc/basics/defect-information/defect-information.module#FccDefectInformationModule'
        }, {
          path: 'materiel-type-info',
          loadChildren: './crrc/basics/materiel-type-info/materiel-type-info.module#FccMaterielTypeInfoModule'
        }, {
          path: 'bom-infomation',
          loadChildren: './crrc/basics/bom-infomation/bom-infomation.module#FccBomInformationModule'
        }, {
          path: 'control',
          loadChildren: './crrc/basics/control/qms-control-details.module#FccQmsControlDetailsModule'
        }, {
          path: 'qms-materiel-supplier',
          loadChildren: './crrc/basics/materielSupplier/materielSupplier.module#FccQmsMaterielSupplierModule'
        }, {
          path: 'vehicle-type-class',
          loadChildren: './crrc/basics/vehicle-type-class/qms-vehicle-type-class.module#FccQmsVehicleTypeClassModule'
        }, {
          path: 'supplierClass',
          loadChildren: './crrc/basics/supplierClass/qms-supplier-class.module#FccQmsSupplierClassModule'
        }, {
          path: 'qms-entry-control-details',
          loadChildren: './crrc/entry-inspection/qms-entry-control-details/qms-entry-control-details.module#FccQmsEntryControlDetailsModule'
        }, {
          path: 'vehicle-type-info',
          loadChildren: './crrc/basics/vehicle-type-info/vehicle-type-info.module#FccVehicleTypeInfoModule'
        }, {
          path: 'productProcessCheck',
          loadChildren: './crrc/productProcess/productProcessCheck/qms-production-inspection.module#FccQmsProductionInspectionModule'
        }, {
          path: 'product',
          loadChildren: './crrc/basics/product/qms-product.module#FccQmsProductModule'
        }, {
          path: 'process-informations',
          loadChildren: './crrc/basics/process-informations/process-informations.module#FccProcessInformationsModule'

        }, {
          path: 'productProcessSelfCheck',
          loadChildren: './crrc/productProcess/productProcessSelfCheck/qms-production-inspection.self.module#FccQmsProductionInspectionSelfModule'
        }, {
          path: 'qms-materiel-entry',
          loadChildren: './crrc/entry-inspection/qms-materiel-entry/qms-materiel-entry.module#FccQmsMaterielEntryModule'
        },{
          path: 'rbacRight',
          loadChildren: './crrc/user/rabcRight/rbac-right.module#FccRbacRightModule'
        },{
          path: 'rbacRole',
          loadChildren: './crrc/user/rbacRole/rbac-role.module#FccRbacRoleModule'
        },{
          path: 'rbacUser',
          loadChildren: './crrc/user/rbacUser/rbac-user.module#FccRbacUserModule'
        },{
          path: 'forwardTrace',
          loadChildren: './crrc/trace/forwardTrace/qms-product.module#FccQmsProductModule'
        }
      ],
      { useHash: true, enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class FccAppRoutingModule {}
