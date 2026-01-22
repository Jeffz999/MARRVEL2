import { Component, OnInit, input } from '@angular/core';

import { ApiService } from '../../../../services/api.service';
import { HumanGene } from '../../../../interfaces/gene';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { GnomADGeneVisualComponent } from './gnom-ad-gene-visual/gnom-ad-gene-visual.component';

@Component({
    selector: 'app-gnom-ad-gene',
    templateUrl: './gnom-ad-gene.component.html',
    styleUrls: ['./gnom-ad-gene.component.scss'],
    imports: [
        NgIf,
        MatIcon,
        MatTooltip,
        GnomADGeneVisualComponent,
    ],
})
export class GnomADGeneComponent implements OnInit {
	readonly gene = input<HumanGene>(undefined);

	loading = false;
	data: GnomADGeneSummary;

	constructor(private api: ApiService) {}

	ngOnInit() {
		const gene = this.gene();
  if (gene && gene.entrezId) {
			this.loading = true;
			this.api.getGnomADGeneByEntrezId(gene.entrezId).subscribe((res) => {
				this.data = res;
				this.loading = false;
			});
		}
	}

	toFixed(S: number | null, digit: number): string {
		return S && S.toFixed ? S.toFixed(digit) : 'N/A';
	}
}

interface GnomADGeneSummary {
	ensemblId: string;
	mis: {
		oeLower: number | null;
		oeUpper: number | null;
		obs: number | null;
		oe: number | null;
		exp: number | null;
		z: number | null;
	};
	syn: {
		oeLower: number | null;
		oeUpper: number | null;
		obs: number | null;
		oe: number | null;
		exp: number | null;
		z: number | null;
	};
	lof: {
		oeLower: number | null;
		oeUpper: number | null;
		oe: number | null;
		obs: number | null;
		exp: number | null;
		z: number | null;
		pLI: number | null;
	};
}
