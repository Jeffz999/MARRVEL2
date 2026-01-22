import { Component, OnInit, Input } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { RankscoreVisualComponent } from '../rankscore-visual/rankscore-visual.component';

@Component({
    selector: 'app-dbnsfp-score-cell',
    templateUrl: './dbnsfp-score-cell.component.html',
    styleUrls: ['./dbnsfp-score-cell.component.scss'],
    imports: [
        NgIf,
        NgClass,
        MatTooltip,
        RankscoreVisualComponent,
    ],
})
export class DbnsfpScoreCellComponent implements OnInit {
	@Input() methodName: string;
	@Input() methodTooltip: string;
	@Input() scoreTooltip: string;
	@Input() score: number;
	@Input() prediction: string;
	@Input() predictionColorClass: object;
	@Input() rankscore: number;
	@Input() minValue: number;
	@Input() maxValue: number;

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
