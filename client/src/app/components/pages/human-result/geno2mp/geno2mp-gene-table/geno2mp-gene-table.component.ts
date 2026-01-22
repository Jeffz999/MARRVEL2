import { Component, OnChanges, AfterViewInit, SimpleChanges, input, viewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import {
	MatTableDataSource,
	MatTable,
	MatColumnDef,
	MatHeaderCellDef,
	MatHeaderCell,
	MatCellDef,
	MatCell,
	MatHeaderRowDef,
	MatHeaderRow,
	MatRowDef,
	MatRow,
} from '@angular/material/table';

import { Geno2MPResult } from '../../../../../interfaces/data';

@Component({
	selector: 'app-geno2mp-gene-table',
	templateUrl: './geno2mp-gene-table.component.html',
	styleUrls: ['./geno2mp-gene-table.component.scss'],
	imports: [
		MatTable,
		MatSort,
		MatColumnDef,
		MatHeaderCellDef,
		MatHeaderCell,
		MatSortHeader,
		MatCellDef,
		MatCell,
		MatHeaderRowDef,
		MatHeaderRow,
		MatRowDef,
		MatRow,
		MatPaginator,
	],
})
export class Geno2mpGeneTableComponent implements OnChanges, AfterViewInit {
	readonly data = input<any[] | null>(undefined);
	readonly showNonCoding = input(false);
	readonly showSynonymous = input(false);
	readonly showMissense = input(false);
	readonly showNonsense = input(true);

	displayedColumns = ['hg19Chr', 'hg19Pos', 'ref', 'alt', 'nHpoProfiles', 'homCount', 'hetCount', 'funcAnno'];
	dataSource: MatTableDataSource<Geno2MPResult> = new MatTableDataSource();
	readonly sort = viewChild(MatSort);
	readonly paginator = viewChild<MatPaginator>('geno2mpGenePaginator');

	hpoProfiles: number;
	categoriesVisible = {
		'Non-Coding': false,
		'Synonymous/Unknown': false,
		'Missense/Other Indel': false,
		'Splice/Frameshift/Nonsense/Stop Loss': true,
	};

	constructor() {}

	ngAfterViewInit() {
		this.dataSource.sort = this.sort();
		this.dataSource.paginator = this.paginator();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.data && changes.data.currentValue) {
			this.sumHpos();
			this.initDataTable();
		}

		if (changes.showNonCoding) {
			this.categoriesVisible['Non-Coding'] = this.showNonCoding();

			this.sumHpos();
			this.dataSource.filter = ' ';
		}
		if (changes.showSynonymous) {
			this.categoriesVisible['Synonymous/Unknown'] = this.showSynonymous();

			this.sumHpos();
			this.dataSource.filter = ' ';
		}
		if (changes.showMissense) {
			this.categoriesVisible['Missense/Other Indel'] = changes.showMissense.currentValue;

			this.sumHpos();
			this.dataSource.filter = ' ';
		}
		if (changes.showNonsense) {
			this.categoriesVisible['Splice/Frameshift/Nonsense/Stop Loss'] = this.showNonsense();

			this.sumHpos();
			this.dataSource.filter = ' ';
		}
	}

	sumHpos() {
		this.hpoProfiles = 0;
		for (const e of this.data()) {
			if (this.categoriesVisible[e.category]) {
				this.hpoProfiles += e.nHpoProfiles;
			}
		}
	}

	initDataTable() {
		this.dataSource = new MatTableDataSource(this.data());
		this.initFilters();
		this.dataSource.sort = this.sort();
		this.dataSource.paginator = this.paginator();
	}

	initFilters() {
		this.dataSource.filterPredicate = (data, filter) => {
			return this.categoriesVisible[data['category']];
		};
		this.dataSource.filter = ' ';
	}
}
