import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

import { JhiLanguageHelper } from 'app/core';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html',
    styleUrls: [
        'main.scss',
    ]
})
export class JhiMainComponent implements OnInit {
    pageHeight: string;
    goMaterialSelect: boolean;

    constructor(private jhiLanguageHelper: JhiLanguageHelper, private router: Router) {
        this.goMaterialSelect = true;
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'fccApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    @HostListener('window:resize', ['$event'])
    onResize(e) {
        // this.pageHeight = (document.documentElement.clientHeight - 60) + 'px';
        this.pageHeight = '90vh';
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });

        this.pageHeight = (document.documentElement.clientHeight - 60) + 'px';
    }

    modalDisplay() {
        this.goMaterialSelect = !this.goMaterialSelect;
      }
}
