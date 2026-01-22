import { Component, OnInit, ElementRef, viewChild, output, inject } from '@angular/core';
import { UntypedFormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipGrid, MatChipRow, MatChipRemove, MatChipInput } from '@angular/material/chips';

import { ApiService } from 'src/app/services/api.service';
import { Gene } from 'src/app/interfaces/gene';
import { MatFormField, MatLabel, MatInput, MatHint } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { NgIf, NgFor } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-model-gene-search',
    templateUrl: './model-gene-search.component.html',
    styleUrls: ['./model-gene-search.component.scss'],
    imports: [
        MatFormField,
        MatLabel,
        MatSelect,
        FormsModule,
        MatOption,
        NgIf,
        MatChipGrid,
        MatChipRow,
        MatChipRemove,
        MatIcon,
        MatInput,
        MatAutocompleteTrigger,
        MatChipInput,
        ReactiveFormsModule,
        MatAutocomplete,
        NgFor,
        MatHint,
    ],
})
export class ModelGeneSearchComponent implements OnInit {
	private api = inject(ApiService);

	readonly geneSelected = output<Gene>();

	taxonId = '7227';

	gene: Gene | null;
	geneKeyword: string | null;
	geneInputCtrl = new UntypedFormControl();
	geneSuggestion = [];
	readonly geneInput = viewChild<ElementRef<HTMLInputElement>>('geneInput');
	readonly matAutocomplete = viewChild<MatAutocomplete>('auto');

	ngOnInit() {}

	onModelChange() {
		this.removeGene();
		this.geneSuggestion = [];
		this.geneInputCtrl.setValue(null);
	}

	onGeneInput(e) {
		this.geneKeyword = e.target.value;
		if (this.geneKeyword) {
			this.api.getGenesBySymbolPrefix(+this.taxonId, this.geneKeyword).subscribe((res) => {
				this.geneSuggestion = res;
			});
		} else {
			this.geneSuggestion = [];
		}
	}

	geneAutocompleteSelected(e: MatAutocompleteSelectedEvent) {
		const idx = e.option.value;
		this.gene = this.geneSuggestion[idx];
		this.geneSelected.emit(this.gene);
		this.geneKeyword = '';
		this.geneInput().nativeElement.value = '';
		this.geneInputCtrl.setValue(null);
	}

	addGene(e: MatChipInputEvent) {
		if (!this.matAutocomplete().isOpen) {
			const input = e.input;
			const value = e.value;

			if (value) {
				this.gene = this.geneSuggestion[value];

				this.geneSelected.emit(this.gene);
			}

			if (input) {
				input.value = '';
			}
			this.geneKeyword = '';
			this.geneInputCtrl.setValue(null);
			this.geneSuggestion = [];
		}
	}
	removeGene() {
		this.gene = null;
		this.geneKeyword = '';

		this.geneSelected.emit(null);
	}
}
