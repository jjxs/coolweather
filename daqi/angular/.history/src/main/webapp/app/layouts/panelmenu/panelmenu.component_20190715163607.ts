import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { JhiLanguageHelper, Principal, LoginService } from 'app/core';
import { JhiEventManager, JhiLanguageService } from 'ng-jhipster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { FindLanguageFromKeyPipe } from '../../shared/language/find-language-from-key.pipe';
import { RbacMenu } from '../../shared/model/rbac-menu.model';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-panelmenu',
  templateUrl: './panelmenu.component.html',
  styleUrls: [
    'panelmenu.scss'
  ]
})

export class PanelMenuComponent implements OnInit {
  account: Account;
  rbacMenus: RbacMenu[];
  items: MenuItem[] = [];
  languages: any[];

  constructor(
    private principal: Principal,
    private eventManager: JhiEventManager,
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService,
    private loginService: LoginService,
    private languageHelper: JhiLanguageHelper,
    private translate: TranslateService,
    private languageService: JhiLanguageService,
    private findLanguage: FindLanguageFromKeyPipe,
    private router: Router
  ) { }

  ngOnInit() {
    const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');

    this.languageHelper.getAll().then(languages => {
      this.languages = languages;
    });

    if (!!token) {
      this.principal.identity().then(account => {
        this.account = account;
        if (account != null) {
          this.rbacMenus = account.rbacMenus;
          this.creatMenus(false);
        }
      });
    }

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (this.account != null) {
        this.creatMenus(true);
      }
    });

    this.registerAuthenticationSuccess();
  }

  registerAuthenticationSuccess() {
    this.eventManager.subscribe('authenticationSuccess', message => {
      this.principal.identity().then(account => {
        this.account = account;
        if (account != null) {
          this.rbacMenus = account.rbacMenus;
          this.creatMenus(false);
        }
      });
    });
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  changeLanguage(languageKey: string) {
    this.sessionStorage.store('locale', languageKey);
    this.languageService.changeLanguage(languageKey);
  }

  creatMenus(isLanguageExpanded: boolean) {
    this.items = [];
    const itemHome: MenuItem = {};

    itemHome.label = this.translate.get('menu.home')['value'];
    itemHome.icon = 'pi pi-fw pi-home';
    itemHome.routerLink = '/';

    this.items.push(itemHome);

    // 新增模块
    // this.createExtraMenuList();
    // Yl左侧menu新增CRRC
    this.createCRRCList();
    if (this.rbacMenus != null) {
      this.rbacMenus.forEach(element => {
        if (element.pMenuId === 0) {
          const itemBusinessP: MenuItem = {};
          const itemBusinessS: MenuItem[] = [];
          itemBusinessP.label = this.translate.get(element.menuLable)['value'];
          itemBusinessP.icon = element.menuIcon;
          itemBusinessP.routerLink = element.menuUrl;

          this.rbacMenus.filter(function (elem) {
            return elem.pMenuId === element.id;
          }).forEach(elementSub => {
            const item: MenuItem = {};
            item.label = this.translate.get(elementSub.menuLable)['value'];
            item.routerLink = elementSub.menuUrl;
            itemBusinessS.push(item);
          });

          itemBusinessP.items = itemBusinessS;
          this.items.push(itemBusinessP);
        }
      });
    }

    if (this.languages.length > 1) {
      const itemLanguage: MenuItem = {};
      const itemLanguageItems: MenuItem[] = [];

      itemLanguage.label = this.translate.get('menu.language')['value'];
      itemLanguage.icon = 'pi pi-fw pi-th-large';
      itemLanguage.expanded = isLanguageExpanded;

      this.languages.forEach(element => {
        const item: MenuItem = {};
        item.label = this.findLanguage.transform(element);
        item.command = event => {
          this.changeLanguage(element);
        };
        itemLanguageItems.push(item);
      });

      itemLanguage.items = itemLanguageItems;
      this.items.push(itemLanguage);
    }

    const itemAccount: MenuItem = {};

    itemAccount.label = this.translate.get('menu.account.main')['value'];
    itemAccount.icon = 'pi pi-fw pi-user';
    itemAccount.items = [
      {
        label: this.translate.get('menu.account.logout')['value'],
        command: event => {
          this.loginService.logout();
          this.router.navigate(['']);
        }
      }
    ];

    this.items.push(itemAccount);
  }

  // 新增模块
  createExtraMenuList() {
    const itemNRV: MenuItem = {};

    itemNRV.label = this.translate.get('menu.NRV.main')['value'];
    itemNRV.icon = 'pi pi-fw pi-list';
    itemNRV.items = [
      {
        label: this.translate.get('menu.productProcess')['value'],
        routerLink: 'nrv/production_Process'
      },
      {
        label: this.translate.get('menu.purchaseInfo')['value'],
        routerLink: 'purchase/'
      },
      {
        label: this.translate.get('menu.prodRelation')['value'],
        routerLink: 'prod-relation'
      },
      {
        label: this.translate.get('menu.vehicleTypInfo')['value'],
        routerLink: 'vehicle-type-info/'
      }
    ];
    this.items.push(itemNRV);
  }
  // Yl左侧menu新增CRRC
  createCRRCList() {
    const itemNRV: MenuItem = {};

    itemNRV.label = "CRRC";
    itemNRV.icon = 'pi pi-fw pi-list';
    itemNRV.items = [
      {
        label: "基础数据管理",
        items: [
          {
            label: "供应商信息",
            routerLink: 'supplier/',
          },{
            label: "供应商分类信息",
            routerLink: 'supplierClass/',
          },
          {
            label: "工序信息",
            routerLink: 'process/',
          }, {
            label: this.translate.get('menu.organizationInfo')['value'],
            routerLink: 'organizational_Information/',
          }, {
            label: "单位信息",
            routerLink: 'unit/',
          }, {
            label: this.translate.get('menu.unhealthyInfo')['value'],
            routerLink: 'adverse-reaction-information/',
          },{
            label: "物料信息",
            routerLink: 'materiel/',
          }, {
            label: this.translate.get('menu.defectInformation')['value'],
            routerLink: 'defect-information/',
          }, {
            label: this.translate.get('menu.materielType')['value'],
            routerLink: 'materiel-type-info/',
          }, {
            label: this.translate.get('menu.bominfromation')['value'],
            routerLink: 'bom-infomation/',
          },{
            label: "检验项目信息",
            routerLink: 'control/',
          },{
            label: "物料供应商关联信息",
            routerLink: 'qms-materiel-supplier/',
          },{
            label: this.translate.get('menu.vehicleTypeInfo')['value'],
            routerLink: 'vehicle-type-class/',
          }, {
            label: this.translate.get('menu.vehicleTypInfo')['value'],
            routerLink: 'vehicle-type-info/'
          }
        ]
      },
      {
        label: "生产过程检验管理",
        items: [
          {
            label: "生产检验过程一览",
            routerLink: 'supplier/',
          }
        ]
      }

    ];
    this.items.push(itemNRV);
  }

}
