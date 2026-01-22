import { Component, OnInit, input } from '@angular/core';
import { take } from 'rxjs/operators';

import { ApiService } from '../../../../services/api.service';
import { Variant } from '../../../../interfaces/variant';
import { GnomADVariantData } from 'src/app/interfaces/data';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { UnitDirective } from '../../../../directives/unit.directive';

@Component({
    selector: 'app-gnom-ad',
    templateUrl: './gnom-ad.component.html',
    styleUrls: ['./gnom-ad.component.scss'],
    imports: [
        NgIf,
        MatIcon,
        MatTooltip,
        UnitDirective,
    ],
})
export class GnomADComponent implements OnInit {
	readonly variant = input<Variant>(undefined);

	loading = false;
	data: GnomADVariantData;
	alleleCount?: number;
	homCount?: number;

	constructor(private api: ApiService) {}

	ngOnInit() {
		const variant = this.variant();
  if (variant) {
			this.loading = true;
			this.api
				.getGnomADVaraint(variant)
				.pipe(take(1))
				.subscribe((res) => {
					this.data = res;
					this.alleleCount = (this.data.exome?.alleleCount || 0) + (this.data.genome?.alleleCount || 0);
					this.homCount = (this.data.exome?.homCount || 0) + (this.data.genome?.homCount || 0);
					this.loading = false;
				});
		}
	}

	retUnlNull(mightNum: number | null | undefined, retValIfNull: any): number | string {
		if (mightNum != null && !isNaN(mightNum)) {
			return mightNum;
		}
		return retValIfNull;
	}
}
