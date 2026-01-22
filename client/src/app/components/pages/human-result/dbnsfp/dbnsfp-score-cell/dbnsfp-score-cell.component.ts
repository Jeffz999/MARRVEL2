import { Component, OnInit, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { RankscoreVisualComponent } from '../rankscore-visual/rankscore-visual.component';

@Component({
	selector: 'app-dbnsfp-score-cell',
	templateUrl: './dbnsfp-score-cell.component.html',
	styleUrls: ['./dbnsfp-score-cell.component.scss'],
	imports: [NgClass, MatTooltip, RankscoreVisualComponent],
})
export class DbnsfpScoreCellComponent implements OnInit {
	readonly methodName = input<string>(undefined);
	readonly methodTooltip = input<string>(undefined);
	readonly scoreTooltip = input<string>(undefined);
	readonly score = input<number>(undefined);
	readonly prediction = input<string>(undefined);
	readonly predictionColorClass = input<object>(undefined);
	readonly rankscore = input<number>(undefined);
	readonly minValue = input<number>(undefined);
	readonly maxValue = input<number>(undefined);

	constructor() {}

	ngOnInit() {}

	getColorBin(minValue: number, maxValue: number, value: number) {
		const NBins = 7;
		const binWidth = (maxValue - minValue) / NBins;
		for (let bin = 1; bin < NBins; ++bin) {
			const maxValueThisBin = minValue + binWidth * bin;
			if (value < maxValueThisBin) {
				return `color-${bin}`;
			}
		}
		return `color-${NBins}`;
	}
}
