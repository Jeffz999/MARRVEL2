import { Component, OnInit, input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs/operators';

import { ApiService } from 'src/app/services/api.service';

import { HumanGene } from './../../../../../interfaces/gene';
import { Variant } from 'src/app/interfaces/variant';
import { PhenotypePopulated } from 'src/app/interfaces/data';

import { CATEGORIES } from 'src/app/category';
import { Animations } from 'src/app/animations';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Geno2mpPhenotypePictogramComponent } from '../../geno2mp/geno2mp-phenotype-pictogram/geno2mp-phenotype-pictogram.component';
import { BasicDatatableComponent } from '../../../../basic-datatable/basic-datatable.component';

@Component({
    selector: 'app-decipher-disease',
    templateUrl: './decipher-disease.component.html',
    styleUrls: ['./decipher-disease.component.scss'],
    animations: [Animations.toggleInOut],
    imports: [
        NgIf,
        MatButton,
        MatIcon,
        MatSlideToggle,
        Geno2mpPhenotypePictogramComponent,
        BasicDatatableComponent,
    ],
})
export class DecipherDiseaseComponent implements OnInit {
	readonly gene = input<HumanGene>(undefined);
	readonly variant = input<Variant>(undefined);

	loading = false;
	data = null;

	variantTableVisible = false;
	tableTitle = '';
	dataSource: MatTableDataSource<DecipherDiseaseData> = new MatTableDataSource();
	displayedColumns = ['variant', 'varType', 'pathogenicity', 'inheritance'];

	showSnvs = true;
	showCnvs = true;
	hasSnvResult = false;

	categories = CATEGORIES;
	categoryNameToCounts = null;

	constructor(private api: ApiService) {}

	ngOnInit() {
		this.getData();
	}

	getData() {
		this.loading = true;
		const variant = this.variant();
  const task = variant
			? this.api.getDECIPHERDiseaseByVariant(variant)
			: this.api.getDECIPHERDiseaseByGenomLoc(this.gene().chr, this.gene().hg19Start, this.gene().hg19Stop);
		task.pipe(take(1)).subscribe(
			(res) => {
				this.setData(res);
				this.setTableTitle();
				this.loading = false;
			},
			(err) => {
				this.data = null;
				this.dataSource = null;
				this.loading = false;
			},
		);
	}

	setTableTitle() {
		this.tableTitle = `Detailed Information of `;
		const variant = this.variant();
  if (variant) {
			if (this.showSnvs) {
				this.tableTitle += `Single-Nucleotide Variant ${variant.chr}:${variant.pos} ${variant.ref}>${variant.alt}`;
				if (this.showCnvs) {
					this.tableTitle += ' and ';
				}
			}
			if (this.showCnvs) {
				this.tableTitle += `Copy-Number Variants Contain ${variant.chr}:${variant.pos}`;
			}
		} else {
			this.tableTitle += `variants on ${this.gene().symbol} (${this.gene().chr}:${this.gene().hg19Start}-${this.gene().hg19Stop})`;
		}
	}

	setData(data: DecipherDiseaseData[]) {
		data.map((D) => {
			D['variant'] = `${D.hg19Chr}:${D.hg19Start}`;
			if (D.hg19Start !== D.hg19Stop) {
				D['variant'] += `-${D.hg19Stop}`;
			}
			if (D.ref && D.alt) {
				D['variant'] += ` ${D.ref}>${D.alt}`;
			}
			D['varType'] = D.cnvType === 1 ? 'CNV' : 'SNV';
			this.hasSnvResult = D.cnvType !== 1 ? true : this.hasSnvResult;
		});
		const filteredData = data.filter(
			(D) => (this.showCnvs && D.cnvType === 1) || (this.showSnvs && D.cnvType === -1),
		);
		this.dataSource = new MatTableDataSource(filteredData);
		this.categoryNameToCounts = this.getCategoryCount(filteredData);
		this.data = data;
	}

	getCategoryCount(data: DecipherDiseaseData[]) {
		const counts = {};
		for (const row of data) {
			if (row.phenotypes) {
				for (const phenotype of row.phenotypes) {
					if (phenotype.ontology && phenotype.ontology.categories && phenotype.ontology.categories.length) {
						counts[phenotype.ontology.categories[0].name] =
							(counts[phenotype.ontology.categories[0].name] || 0) + 1;
					}
				}
			}
		}
		return counts;
	}

	onFilterChange(tag: string, value) {
		switch (tag) {
			case 'showCnvs':
				this.showCnvs = value;
				break;
			case 'showSnvs':
				this.showSnvs = value;
				break;
		}
		this.setData(this.data);
		this.setTableTitle();
	}
}

interface DecipherDiseaseData {
	hg19Chr: string;
	hg19Start: number;
	hg19Stop: number;
	ref?: string;
	alt?: string;
	genotype: string;
	pathogenicity: string;
	variantClass: string;
	cnvType: number;
	phenotypes: PhenotypePopulated[];
}
