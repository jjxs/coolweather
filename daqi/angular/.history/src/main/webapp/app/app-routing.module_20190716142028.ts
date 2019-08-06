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
          path: 'supplierInformation',
          loadChildren: './crrc/basics/supplierInformation/supplierInformation.module#SupplierInformationModule'
        }, {
          path: 'supplier',
          loadChildren: './crrctest/qms-supplier.module#FccQmsSupplierModule'
        }, {
          path: 'process',
          loadChildren: './process/qms-process.module#FccQmsProcessModule'
        }, {
          path: 'organizational_Information',
          loadChildren: './crrc/organizationalInformation/organizationalInformation.module#FccOrganizationalInformationModule'
        }, {
          path: 'unit',
          loadChildren: './unit/qms-unit.module#FccQmsUnitModule'
        }, {
          path: 'adverse-reaction-information',
          loadChildren: './crrc/adverse-reaction-information/adverse-reaction-information.module#FccAdverseReactionInformationModule'
        }, {
          path: 'materiel',
          loadChildren: './materiel/qms-materiel.module#FccQmsMaterielModule'
        }, {
          path: 'defect-information',
          loadChildren: './crrc/defect-information/defect-information.module#FccDefectInformationModule'
        }, {
          path: 'materiel-type-info',
          loadChildren: './crrc/materiel-type-info/materiel-type-info.module#FccMaterielTypeInfoModule'
        }, {
          path: 'bom-infomation',
          loadChildren: './crrc/bom-infomation/bom-infomation.module#FccBomInformationModule'
        }, {
          path: 'control',
          loadChildren: './control/qms-control-details.module#FccQmsControlDetailsModule'
        }, {
          path: 'qms-materiel-supplier',
          loadChildren: './crrc/materielSupplier/materielSupplier.module#FccQmsMaterielSupplierModule'
        }, {
          path: 'vehicle-type-class',
          loadChildren: './vehicle-type-class/qms-vehicle-type-class.module#FccQmsVehicleTypeClassModule'
        }, {
          path: 'supplierClass',
          loadChildren: './supplierClass/qms-supplier-class.module#FccQmsSupplierClassModule'
        }, {
          path: 'qms-entry-control-details',
          loadChildren: './crrc/qms-entry-control-details/qms-entry-control-details.module#FccQmsEntryControlDetailsModule'
        }, {
          path: 'vehicle-type-info',
          loadChildren: './crrc/vehicle-type-info/vehicle-type-info.module#FccVehicleTypeInfoModule'
        }, {
          path: 'productProcessCheck',
          loadChildren: './crrc/productProcessCheck/qms-production-inspection.module#FccQmsProductionInspectionModule'
        }
      ],
      { useHash: true, enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class FccAppRoutingModule {}
