import { Component, OnInit, input } from '@angular/core';

@Component({
	selector: 'app-rankscore-visual',
	templateUrl: './rankscore-visual.component.html',
	styleUrls: ['./rankscore-visual.component.scss'],
	imports: [],
})
export class RankscoreVisualComponent implements OnInit {
	readonly rankscore = input<number>(undefined);

	constructor() {}

	ngOnInit() {}

	getColor(score: number) {
		// 255, 71, 71
		// 71, 198, 255
		return `rgb(${Math.floor(184 * score + 71)},${Math.floor(198 - 127 * score)},${Math.floor(255 - 184 * score)})`;
	}
}
