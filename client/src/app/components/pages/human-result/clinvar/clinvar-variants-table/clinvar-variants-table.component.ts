import { Component, OnInit, OnChanges, input, viewChild } from '@angular/core';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';

import { HumanGene } from '../../../../../interfaces/gene';
import { Variant } from '../../../../../interfaces/variant';
import { ClinVarVarinat } from '../../../../../interfaces/data';
import { NgIf } from '@angular/common';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatPrefix, MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-clinvar-variants-table',
    templateUrl: './clinvar-variants-table.component.html',
    styleUrls: ['./clinvar-variants-table.component.scss'],
    imports: [
    NgIf,
    MatSlideToggle,
    FormsModule,
    MatFormField,
    MatIcon,
    MatPrefix,
    MatInput,
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
    MatPaginator
],
})
export class ClinvarVariantsTableComponent implements OnInit, OnChanges {
	readonly gene = input<HumanGene>(undefined);
	readonly variant = input<Variant>(undefined);
	readonly data = input<ClinVarVarinat[]>(undefined);

	showSearch = false;
	showMatchingVarsFirst = true;
	displayedColumns: string[] = ['title', 'location', 'condition', 'significance', 'reviewStatus'];
	dataSource: MatTableDataSource<ClinVarVarinat> = new MatTableDataSource();

	readonly sort = viewChild(MatSort);
	readonly paginator = viewChild(MatPaginator);

	constructor() {}

	ngOnInit() {
		this.initTable();
	}

	ngOnChanges() {
		this.initTable();
	}

	initTable() {
		this.dataSource = new MatTableDataSource(this.data());
		this.dataSource.sort = this.sort();
		this.dataSource.sortData = (data, sort: MatSort) => {
			return data.sort((a, b) => {
				const variant = this.variant();
    const aMatching = variant && a.start <= variant.pos && variant.pos <= a.stop;
				const variantValue = this.variant();
    const bMatching = variantValue && b.start <= variantValue.pos && variantValue.pos <= b.stop;
				const variantVal = this.variant();
    if (variantVal) {
					// Exact match
					if (a.start === a.stop && a.start === variantVal.pos) {
						return -1;
					}
					if (b.start === b.stop && b.start === variantVal.pos) {
						return 1;
					}
					// Includes the location
					if (this.showMatchingVarsFirst && aMatching !== bMatching) {
						return aMatching ? -1 : 1;
					}
				}
				const dirMul = sort.direction === 'asc' ? 1 : -1;
				switch (sort.active) {
					case 'variation':
						return a.title < b.title ? -1 * dirMul : a.title > b.title ? 1 * dirMul : 0;
					case 'location':
						return a.start < b.start || (a.start === b.start && a.stop < b.stop) ? -1 * dirMul : 1 * dirMul;
					case 'condition':
						return a.condition < b.condition ? -1 * dirMul : a.condition > b.condition ? 1 * dirMul : 0;
					case 'significance':
						const aDesc = (a.significance || { description: '' }).description;
						const bDesc = (b.significance || { description: '' }).description;
						return aDesc < bDesc ? -1 * dirMul : aDesc > bDesc ? 1 * dirMul : 0;
				}
				return 1;
			});
		};
		this.dataSource.paginator = this.paginator();
	}

	onSearchChange(e) {
		this.dataSource.filter = e.target.value;
	}
}
