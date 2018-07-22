import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatSidenavModule,
    MatToolbarModule, MatIconModule, MatListModule,
    MatMenuModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { LayoutModule } from '../../node_modules/@angular/cdk/layout';

@NgModule({
    imports: [
        LayoutModule,
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule
    ],
    exports: [
        LayoutModule,
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule
    ]
})
export class MyMaterialModule { }
