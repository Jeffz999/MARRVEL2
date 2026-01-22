import { Component, OnInit, input } from '@angular/core';


@Component({
    selector: 'app-gnom-ad-gene-visual',
    templateUrl: './gnom-ad-gene-visual.component.html',
    styleUrls: ['./gnom-ad-gene-visual.component.scss'],
    imports: [],
})
export class GnomADGeneVisualComponent implements OnInit {
	readonly oeLower = input(undefined);
	readonly oeUpper = input(undefined);
	readonly oe = input(undefined);

	constructor() {}

	ngOnInit() {}

	min(a, b) {
		return Math.min(a, b);
	}
	max(a, b) {
		return Math.max(a, b);
	}
}
