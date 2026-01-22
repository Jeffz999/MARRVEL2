import { Component, OnInit, input, inject } from '@angular/core';

import { HumanGene } from 'src/app/interfaces/gene';
import { ApiService } from 'src/app/services/api.service';
import { Animations } from 'src/app/animations';
import { NgIf, NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription } from '@angular/material/expansion';
import { MatTooltip } from '@angular/material/tooltip';
import { PharosLigandTableComponent } from './pharos-ligand-table/pharos-ligand-table.component';

@Component({
    selector: 'app-pharos',
    templateUrl: './pharos.component.html',
    styleUrls: ['./pharos.component.scss'],
    animations: [Animations.toggleInOut],
    imports: [
        NgIf,
        MatButton,
        MatIcon,
        MatAccordion,
        NgFor,
        MatTooltip,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        MatExpansionPanelDescription,
        PharosLigandTableComponent,
    ],
})
export class PharosComponent implements OnInit {
	private api = inject(ApiService);

	readonly gene = input<HumanGene>(undefined);

	loading = false;
	data;

	idgDevLevTrans = {
		Tdark: 'Little is known about this target',
		Tbio: 'No known drugs for this target',
		Tchem: 'This target has at least one CHEMBL compound',
		Tclin: 'This target has at least one approved drug',
	};

	ngOnInit() {
		this.loading = true;
		this.api.getPharosTargetsByEntrezId(this.gene().entrezId).subscribe(
			(res) => {
				this.data = res;
				this.loading = false;
			},
			(err) => {
				this.data = null;
				this.loading = false;
			},
		);
	}

	getDevTrans(devTag, targetName) {
		return this.idgDevLevTrans[devTag].replace(/this\starget/i, targetName);
	}
}
