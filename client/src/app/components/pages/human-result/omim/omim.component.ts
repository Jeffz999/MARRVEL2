import { Component, Input } from '@angular/core';

import { Animations } from './../../../../animations';
import { NgIf, NgClass } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { UnitDirective } from '../../../../directives/unit.directive';
import { BasicDatatableComponent } from '../../../basic-datatable/basic-datatable.component';

@Component({
    selector: 'app-omim',
    templateUrl: './omim.component.html',
    styleUrls: ['./omim.component.scss'],
    animations: [Animations.fadeInOut, Animations.toggleInOut],
    imports: [
        NgIf,
        MatButton,
        MatIcon,
        MatTooltip,
        UnitDirective,
        NgClass,
        BasicDatatableComponent,
    ],
})
export class OmimComponent {
	@Input() gene;
	@Input() loading;
	@Input() data;

	constructor() {}
}
