import { Component, OnInit, input, inject } from '@angular/core';
import { take } from 'rxjs/operators';

import { ApiService } from '../../../../services/api.service';

import { HumanGene } from '../../../../interfaces/gene';
import { Variant } from '../../../../interfaces/variant';
import { Animations } from 'src/app/animations';

import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { BasicDatatableComponent } from '../../../basic-datatable/basic-datatable.component';

@Component({
    selector: 'app-decipher',
    templateUrl: './decipher.component.html',
    styleUrls: ['./decipher.component.scss'],
    animations: [Animations.toggleInOut],
    imports: [
    MatButton,
    MatIcon,
    MatTooltip,
    BasicDatatableComponent
],
})
export class DECIPHERComponent implements OnInit {
	private api = inject(ApiService);

	readonly gene = input<HumanGene>(undefined);
	readonly variant = input<Variant>(undefined);

	loading = false;
	data: DECIPHERData[] | null;

	delCount: number | null = null;

	ngOnInit() {
		this.requestData();
	}

	requestData() {
		this.loading = true;
		const gene = this.gene();
  const task = gene
			? this.api.getDECIPHERByGenomLoc(gene.chr, gene.hg19Start, gene.hg19Stop)
			: this.api.getDECIPHERByVariant(this.variant());
		task.pipe(take(1)).subscribe((res: DECIPHERData[]) => {
			if (res && res.length) {
				this.delCount = 0;
				for (let i = 0; i < res.length; ++i) {
					res[i]['position'] = `${res[i].hg19Chr}:${res[i].hg19Start}`;
					if (res[i].hg19Start !== res[i].hg19Stop) {
						res[i]['position'] += `-${res[i].hg19Stop}`;
					}

					res[i]['size'] = res[i].hg19Stop - res[i].hg19Start + 1;
					res[i]['delObs'] = res[i].deletion ? res[i].deletion.obs || 0 : 0;
					res[i]['dupObs'] = res[i].duplication ? res[i].duplication.obs || 0 : 0;

					this.delCount += res[i].deletion.obs || 0;
				}
			}
			this.data = res;
			this.loading = false;
		});
	}
}

interface DECIPHERData {
	hg19Chr: string;
	hg19Start: number;
	hg19Stop: number;
	sampleSize: number;
	study: string;
	freq: number;
	std: number;
	obs: number;
	cnvType: number;
	duplication: {
		std: number;
		obs: number;
		freq: number;
	};
	deletion: {
		std: number;
		obs: number;
		freq: number;
	};
}
