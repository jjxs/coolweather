import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Principal } from 'app/core/auth/principal.service';

/**
 * @whatItDoes Conditionally includes an HTML element if current user has any
 * of the authorities passed as the `expression`.
 *
 * @howToUse
 * ```
 *     <some-element *jhiHasAnyAuthority="'ROLE_ADMIN'">...</some-element>
 *
 *     <some-element *jhiHasAnyAuthority="['ROLE_ADMIN', 'ROLE_USER']">...</some-element>
 * ```
 */
@Directive({
    selector: '[jhiHasAnyAuthority]'
})
export class HasAnyAuthorityDirective {
    private authorities: string[];

    constructor(private principal: Principal, private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {}

    @Input()
    set jhiHasAnyAuthority(value: string | string[]) {
        this.authorities = typeof value === 'string' ? [value] : value;
        this.updateView();
        // Get notified each time authentication state changes.
        this.principal.getAuthenticationState().subscribe(identity => this.updateView());
    }

    private updateView(): void {
        this.principal.hasAnyAuthority(this.authorities).then(result => {
            this.viewContainerRef.clear();

            if (result) {
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            }

            // 2019/01/23 houiy 菜单添加 Add Start
            if (!this.principal.isAuthenticated()) {
                document.querySelector('#navDiv').classList.remove('cnc-main-nav-div-show');
                document.querySelector('#navDiv').classList.add('cnc-main-nav-div-none');

                document.querySelector('#menuDiv').classList.remove('cnc-main-nav-div-menu-show');
                document.querySelector('#menuDiv').classList.add('cnc-main-nav-div-menu-none');

                document.querySelector('#mainDiv').classList.add('cnc-main-div-center');
                document.querySelector('#mainDiv').classList.remove('cnc-main-nav');
            } else {
                document.querySelector('#navDiv').classList.remove('cnc-main-nav-div-none');
                document.querySelector('#navDiv').classList.add('cnc-main-nav-div-show');

                document.querySelector('#menuDiv').classList.remove('cnc-main-nav-div-menu-none');
                document.querySelector('#menuDiv').classList.add('cnc-main-nav-div-menu-show');

                document.querySelector('#mainDiv').classList.remove('cnc-main-div-center');
                document.querySelector('#mainDiv').classList.add('cnc-main-nav');
            }
            // 2019/01/23 houiy 菜单添加 Add End
        });
    }
}
