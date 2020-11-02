import { Component, OnInit, Inject, Renderer, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { DOCUMENT } from '@angular/platform-browser';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private _router: Subscription;
    @ViewChild(NavbarComponent) navbar: NavbarComponent;

    constructor(private renderer: Renderer,
        private router: Router, @Inject(DOCUMENT)
        private document: any,
        private element: ElementRef,
        public location: Location,
        private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) {
    }

    ngOnInit() {

        this.startLoadingSpinner();
        var navbar: HTMLElement = this.element.nativeElement.children[0].children[0];
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            if (window.outerWidth > 1500) {
                window.document.children[0].scrollTop = 0;
            } else {
                window.document.activeElement.scrollTop = 0;
            }
            this.navbar.sidebarClose();

            this.renderer.listenGlobal('window', 'scroll', (event) => {
                const number = window.scrollY;
                var _location = this.location.path();
                _location = _location.split('/')[2];

                if (number > 150 || window.pageYOffset > 150) {
                    navbar.classList.remove('navbar-transparent');
                } else if (_location !== 'login' && this.location.path() !== '/nucleoicons') {
                    // remove logic
                    // navbar.classList.add('navbar-transparent');
                }
            });
        });
    }

    startLoadingSpinner() {
        this.ng4LoadingSpinnerService.show();

        setTimeout(function () {
            this.ng4LoadingSpinnerService.hide();
        }.bind(this), 1500);
        console.log("app component")
    }

}
