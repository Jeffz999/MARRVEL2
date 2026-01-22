import { Component, input } from '@angular/core';

import { Animations } from './../../../../animations';

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
	imports: [MatButton, MatIcon, MatTooltip, UnitDirective, BasicDatatableComponent],
})
export class OmimComponent {
	readonly gene = input(undefined);
	readonly loading = input(undefined);
	readonly data = input(undefined);

	constructor() {}
}
