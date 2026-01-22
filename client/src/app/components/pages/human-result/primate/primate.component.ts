import { Component, OnInit, input } from '@angular/core';

import { HumanGene } from 'src/app/interfaces/gene';
import { PrimateData } from 'src/app/interfaces/data';
import { Variant } from 'src/app/interfaces/variant';
import { Animations } from 'src/app/animations';

import { ApiService } from 'src/app/services/api.service';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { BasicDatatableComponent } from '../../../basic-datatable/basic-datatable.component';

@Component({
    selector: 'app-primate',
    templateUrl: './primate.component.html',
    styleUrls: ['./primate.component.scss'],
    animations: [Animations.toggleInOut],
    imports: [
        MatTooltip,
        MatIcon,
        NgIf,
        MatFormField,
        MatLabel,
        MatSelect,
        MatOption,
        BasicDatatableComponent,
    ],
})
export class PrimateComponent implements OnInit {
	readonly variant = input<Variant>(undefined);
	readonly gene = input<HumanGene>(undefined);

	searchBy = 'variant';

	loading = true;
	data: PrimateData;
	geneLoading = true;
	dataByGene: any[];

	constructor(private apiService: ApiService) {}

	ngOnInit() {
		const variant = this.variant();
  if (variant) {
			this.loading = true;
			this.apiService.getPrimateByVariant(variant).subscribe(
				(res: PrimateData) => {
					this.data = res;
					this.loading = false;
				},
				(err) => {
					console.log(err);
					this.data = null;
					this.loading = false;
				},
			);
		} else {
			this.searchBy = this.gene() ? 'gene' : 'variant';
			this.data = null;
			this.loading = false;
		}

		const gene = this.gene();
  if (gene) {
			this.geneLoading = true;
			this.apiService.getPrimateByGene(gene).subscribe(
				(res) => {
					this.dataByGene = (res || []).map((e: PrimateData) => {
						return {
							variant: `${e.chr}:${e.pos} ${e.ref}>${e.alt}`,
							alleleCount: e.alleleCount,
							alleleNum: e.alleleNum,
							alleleFreq: e.alleleFreq,
							dataSource: 'HGSC',
						};
					});
					this.geneLoading = false;
				},
				(err) => {
					console.log(err);
					this.dataByGene = [];
					this.geneLoading = false;
				},
			);
		} else {
			this.geneLoading = false;
		}
	}
}
