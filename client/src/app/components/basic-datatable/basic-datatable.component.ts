import { Component, OnInit, Input, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';

import { Animations } from '../../animations';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { UnitDirective } from '../../directives/unit.directive';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { FilterInputComponent } from '../filter-input/filter-input.component';
import { HighlightSearch } from '../../highlight';

@Component({
    selector: 'app-basic-datatable',
    templateUrl: './basic-datatable.component.html',
    styleUrls: ['./basic-datatable.component.scss'],
    animations: [Animations.slideIn, Animations.fadeInOut],
    imports: [
        NgIf,
        UnitDirective,
        MatIconButton,
        MatIcon,
        MatTooltip,
        MatTable,
        MatSort,
        NgFor,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatSortHeader,
        NgClass,
        MatCellDef,
        MatCell,
        FilterInputComponent,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        MatPaginator,
        HighlightSearch,
    ],
})
export class BasicDatatableComponent implements OnInit, OnChanges, AfterViewInit {
	@Input() data: any[] | null;
	@Input() title: string;
	@Input() unit: string;
	@Input() loading: boolean | null = null;

	@Input() sortActive: string;
	@Input() sortDirection = 'asc';
	@Input() displayedColumns: string[];
	@Input() columnNames: string[];
	dataSource: MatTableDataSource<any> = new MatTableDataSource();

	filtersColumns: string[] = [];
	showFilters = false;
	filtersToApply = {};

	@Input() url: boolean[];
	@Input() urlPrefixes: string[] = [];
	@Input() urlPostfixes: string[] = [];

	@Input() types: boolean[];

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor() {}

	initFilters() {
		this.filtersToApply = {};
		this.filtersColumns = [];
		for (const colName of this.displayedColumns) {
			this.filtersColumns.push(colName + 'Filter');
		}
		this.dataSource.filterPredicate = (data, filter) => {
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
	}

	ngOnInit() {}

	ngOnChanges() {
		this.dataSource = new MatTableDataSource(this.data);
		this.initFilters();
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	toggleFilters() {
		this.showFilters = !this.showFilters;
	}

	filter(colName: string, filterValue: string) {
		this.filtersToApply[colName] = filterValue;
		this.dataSource.filter = JSON.stringify(this.filtersToApply);
	}

	toFixed(num: number) {
		return typeof num === 'number' ? num.toFixed(6) : null;
	}
}
