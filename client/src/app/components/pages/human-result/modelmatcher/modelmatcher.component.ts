import { Component, OnChanges, SimpleChanges, input } from '@angular/core';

import { ModelmatcherService } from '../../../../services/modelmatcher.service';

import { HumanGene } from '../../../../interfaces/gene';
import { ModelMatcherData } from '../../../../interfaces/data';
import { TAXONIDS, TAXONID_TO_INFO } from '../../../../data/model-organisms';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { UnitDirective } from '../../../../directives/unit.directive';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
    selector: 'app-modelmatcher',
    templateUrl: './modelmatcher.component.html',
    styleUrls: ['./modelmatcher.component.scss'],
    imports: [
        MatButton,
        MatIcon,
        NgIf,
        MatTooltip,
        UnitDirective,
        MatProgressBar,
        NgFor,
        NgClass,
    ],
})
export class ModelmatcherComponent implements OnChanges {
	readonly gene = input.required<HumanGene>();
	data?: ModelMatcherData[];
	loading = true;

	taxonIdToInfo = TAXONID_TO_INFO;

	constructor(private mmSvc: ModelmatcherService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.gene.previousValue !== changes.gene.currentValue) {
			this.requestData(this.gene().symbol);
		}
	}

	requestData(geneSymbol: string) {
		this.loading = true;
		this.mmSvc
			.getScientistsByGeneSymbol(geneSymbol)
			.toPromise()
			.then((res: ModelMatcherData[]) => {
				this.data = (res || []).map((e) => {
					if (e.lastName === 'Anonymous Scientist') {
						e.lastName = null;
					}
					return e;
				});
				this.loading = false;
			})
			.catch((err: unknown) => {
				this.data = null;
				this.loading = false;
			});
	}
}
