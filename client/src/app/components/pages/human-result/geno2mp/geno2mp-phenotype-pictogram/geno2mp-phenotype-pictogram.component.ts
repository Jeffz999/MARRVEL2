import { Component, OnChanges, SimpleChanges, input } from '@angular/core';

import { CAT_TO_ICON } from '../../../../../category';

import { MatTooltip } from '@angular/material/tooltip';

@Component({
	selector: 'app-geno2mp-phenotype-pictogram',
	templateUrl: './geno2mp-phenotype-pictogram.component.html',
	styleUrls: ['./geno2mp-phenotype-pictogram.component.scss'],
	imports: [MatTooltip],
})
export class Geno2mpPhenotypePictogramComponent implements OnChanges {
	categories = Object.keys(CAT_TO_ICON);
	catToIcon = CAT_TO_ICON;

	readonly categoryStatus = input<object>({});

	constructor() {}

	ngOnChanges(changes: SimpleChanges) {}
}
