import { Component, OnInit, input } from '@angular/core';
import { ProteinViewerComponent } from '../../../protein-viewer/protein-viewer.component';

@Component({
	selector: 'app-human-protein-structure',
	templateUrl: './human-protein-structure.component.html',
	styleUrls: ['./human-protein-structure.component.scss'],
	imports: [ProteinViewerComponent],
})
export class HumanProteinStructureComponent implements OnInit {
	readonly uniprotId = input<string>(undefined);

	constructor() {}

	ngOnInit() {}
}
