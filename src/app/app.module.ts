import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './material/material.module';
import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';
@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent
    ],
    imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        FormsModule,
        AppRoutingModule,
        RouterModule,
        AppRoutingModule,
        ComponentsModule,
        AngularFireModule.initializeApp(environment.firebase),
        MaterialModule,
        Ng4LoadingSpinnerModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
