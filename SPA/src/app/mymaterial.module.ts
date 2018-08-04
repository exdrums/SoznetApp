import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatSidenavModule,
    MatToolbarModule, MatIconModule, MatListModule,
    MatMenuModule, MatFormFieldModule, MatInputModule,
    MatGridListModule, MatCardModule, MatRadioModule} from '@angular/material';
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
        MatCheckboxModule,
        MatGridListModule,
        MatCardModule,
        MatRadioModule
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
        MatCheckboxModule,
        MatGridListModule,
        MatCardModule,
        MatRadioModule
    ]
})
export class MyMaterialModule { }
