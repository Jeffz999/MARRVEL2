import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { NgIf, NgFor } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-pharos-ligand-table',
    templateUrl: './pharos-ligand-table.component.html',
    styleUrls: ['./pharos-ligand-table.component.scss'],
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatCellDef,
        MatCell,
        NgIf,
        MatTooltip,
        NgFor,
        MatButton,
        MatIcon,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        MatPaginator,
    ],
})
export class PharosLigandTableComponent implements OnInit, OnChanges, AfterViewInit {
	readonly ligands = input(undefined);

	displayedColumns: string[] = ['name', 'structure', 'targetProperties', 'extLink'];
	dataSource = new MatTableDataSource<any>();
	@ViewChild(MatPaginator) paginator: MatPaginator;
	idgDevLevTrans = {
		Tdark: 'Little is known about this target',
		Tbio: 'No known drugs for this target',
		Tchem: 'Target has at least one CHEMBL compound',
		Tclin: 'Target has at least one approved drug',
	};

	constructor() {}

	ngOnInit() {
		this.dataSource = new MatTableDataSource(
			this.ligands().map((ligand) => {
				if (!ligand.targetProperties.length) {
					ligand.targetProperties = ligand.targetProperties != null ? [ligand.targetProperties] : [];
				}
				return ligand;
			}),
		);
		this.dataSource.paginator = this.paginator;
	}

	ngOnChanges() {
		this.dataSource.paginator = this.paginator;
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}

	encodeForUrl(str: string) {
		return encodeURIComponent(str);
	}
}
