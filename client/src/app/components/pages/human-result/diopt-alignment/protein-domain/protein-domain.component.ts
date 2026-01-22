import { Component, OnInit, AfterViewInit, input, viewChild, output } from '@angular/core';
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

import { MatTooltip } from '@angular/material/tooltip';

@Component({
	selector: 'app-protein-domain',
	templateUrl: './protein-domain.component.html',
	styleUrls: ['./protein-domain.component.scss'],
	imports: [
		MatTable,
		MatSort,
		MatColumnDef,
		MatHeaderCellDef,
		MatHeaderCell,
		MatSortHeader,
		MatCellDef,
		MatCell,
		MatTooltip,
		MatHeaderRowDef,
		MatHeaderRow,
		MatRowDef,
		MatRow,
		MatPaginator,
	],
})
export class ProteinDomainComponent implements OnInit, AfterViewInit {
	readonly data = input<DomainData[]>(undefined);

	readonly highlight = output<any>();

	dataSource: MatTableDataSource<DomainData> = new MatTableDataSource();
	displayedColumns = ['domainName', 'domainStart', 'domainStop', 'domainDescription', 'proteinId'];
	readonly paginator = viewChild(MatPaginator);
	readonly sort = viewChild(MatSort);

	constructor() {}

	ngOnInit() {
		this.dataSource = new MatTableDataSource(this.data());
	}
	ngAfterViewInit() {
		this.initTableAcc();
	}

	initTableAcc() {
		this.dataSource.sort = this.sort();
		this.dataSource.paginator = this.paginator();
		this.dataSource.sortData = (data: DomainData[], sort: MatSort) => {
			return data.sort((a: DomainData, b: DomainData) => {
				const dirMul = sort.direction === 'asc' ? 1 : -1;
				switch (sort.active) {
					case 'domainStart':
						const aStart = isNaN(+a.domainStart) ? +a.domainStart.substr(1) : +a.domainStart;
						const bStart = isNaN(+b.domainStart) ? +b.domainStart.substr(1) : +b.domainStart;
						return (aStart < bStart ? -1 : 1) * dirMul;
					case 'domainStop':
						const aStop = isNaN(+a.domainStop) ? +a.domainStop.substr(1) : +a.domainStop;
						const bStop = isNaN(+b.domainStop) ? +b.domainStop.substr(1) : +b.domainStop;
						return (aStop < bStop ? -1 : 1) * dirMul;
					default:
						return (a[sort.active] < b[sort.active] ? -1 : 1) * dirMul;
				}
			});
		};
	}

	onDomainClick(from, to) {
		this.highlight.emit({
			from: from && from.length && from[0] === '<' ? from.substr(1) : from,
			to: to,
		});
	}
}

interface DomainData {
	index: string;
	domainName: string;
	domainStart: string;
	domainStop: string;
	domainDescription?: string;
	proteinId?: string;
	externalId?: string;
}
