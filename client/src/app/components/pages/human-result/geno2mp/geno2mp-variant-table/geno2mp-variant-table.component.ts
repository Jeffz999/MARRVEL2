import { Component, OnChanges, AfterViewInit, input, viewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange, MatSlideToggle } from '@angular/material/slide-toggle';
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

import { Animations } from '../../../../../animations';

import { HPO_BROAD_TO_CAT } from './../../../../../category';
import { Geno2mpPhenotypePictogramComponent } from '../geno2mp-phenotype-pictogram/geno2mp-phenotype-pictogram.component';

@Component({
	selector: 'app-geno2mp-variant-table',
	templateUrl: './geno2mp-variant-table.component.html',
	styleUrls: ['./geno2mp-variant-table.component.scss'],
	animations: [Animations.slideIn],
	imports: [
		MatSlideToggle,
		Geno2mpPhenotypePictogramComponent,
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
export class Geno2mpVariantTableComponent implements OnChanges, AfterViewInit {
	readonly data = input<any[] | null>(undefined);
	phenotypes: object = {};

	affectedProfiles = 0;

	displayedColumns = ['affectedStatus', 'broadTerm', 'mediumTerm', 'narrowTerm'];
	dataSource: MatTableDataSource<any> = new MatTableDataSource();

	filtersColumns: string[] = [];
	showFilters = false;
	filtersToApply = {};

	showOnlyAffected = true;

	readonly sort = viewChild(MatSort);
	readonly paginator = viewChild(MatPaginator);

	constructor() {}

	initFilters() {
		this.filtersToApply = {};
		this.filtersColumns = [];
		for (const colName of this.displayedColumns) {
			this.filtersColumns.push(colName + 'Filter');
		}
		this.dataSource.filterPredicate = (data, filter) => {
			if (this.showOnlyAffected && data.affectedStatus !== 'affected') {
				return false;
			}

			const filters = JSON.parse(filter);
			let isMatched = true;
			for (const fColName in filters) {
				if (!(fColName in filters) || filters[fColName] === '') {
					continue;
				}

				const value = ('' + data[fColName] || '').toLowerCase();
				const filterValue = (filters[fColName] || '').toLowerCase();

				if (value.indexOf(filterValue) === -1) {
					isMatched = false;
					break;
				}
			}
			return isMatched;
		};
		this.dataSource.filter = JSON.stringify(this.filtersToApply);
	}

	ngOnChanges() {
		this.dataSource = new MatTableDataSource(this.data());
		for (const profile of this.data()) {
			if (profile.affectedStatus === 'affected') {
				this.affectedProfiles += 1;
			}
		}
		this.countPhenotypes();

		this.initFilters();
		this.dataSource.sort = this.sort();
		this.dataSource.paginator = this.paginator();
	}

	ngAfterViewInit() {
		this.dataSource.sort = this.sort();
		this.dataSource.paginator = this.paginator();
	}

	onCategoryChange(e: MatSlideToggleChange) {
		this.showOnlyAffected = e.checked;
		this.countPhenotypes();
		this.dataSource.filter = JSON.stringify(this.filtersToApply);
	}

	toggleFilters() {
		this.showFilters = !this.showFilters;
	}

	filter(colName: string, filterValue: string) {
		this.filtersToApply[colName] = filterValue;
		this.dataSource.filter = JSON.stringify(this.filtersToApply);
	}

	countPhenotypes() {
		const phenotypes = {};
		for (const hpoProfile of this.data()) {
			if (this.showOnlyAffected && hpoProfile.affectedStatus !== 'affected') {
				continue;
			}

			for (const hpoId of hpoProfile.broad.hpoIds) {
				const catName = HPO_BROAD_TO_CAT[hpoId];
				phenotypes[catName] = (phenotypes[catName] || 0) + 1;
			}
		}
		this.phenotypes = phenotypes;
	}
}
