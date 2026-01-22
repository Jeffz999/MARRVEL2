import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { ApiService } from '../../../services/api.service';
import { VariantService } from '../../../services/variant.service';

import { HumanGene } from '../../../interfaces/gene';
import { Variant } from '../../../interfaces/variant';

import { Animations } from 'src/app/animations';
import { MatSelectChange, MatSelect, MatOption } from '@angular/material/select';
import { DIOPTOrtholog } from 'src/app/interfaces/data';
import { NgIf, NgClass, NgFor } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ForwardAnnotationComponent } from './forward-annotation/forward-annotation.component';
import { OmimComponent } from './omim/omim.component';
import { DbnsfpComponent } from './dbnsfp/dbnsfp.component';
import { ClinvarComponent } from './clinvar/clinvar.component';
import { Geno2mpComponent } from './geno2mp/geno2mp.component';
import { DecipherDiseaseComponent } from './decipher/decipher-disease/decipher-disease.component';
import { MatDivider } from '@angular/material/divider';
import { GnomADComponent } from './gnom-ad/gnom-ad.component';
import { GnomADGeneComponent } from './gnom-ad-gene/gnom-ad-gene.component';
import { DgvComponent } from './dgv/dgv.component';
import { DECIPHERComponent } from './decipher/decipher.component';
import { OrthologsComponent } from './orthologs/orthologs.component';
import { GtexBoxplotComponent } from './gtex-boxplot/gtex-boxplot.component';
import { AgrExpressionComponent } from './agr-expression/agr-expression.component';
import { PhenotypesComponent } from './phenotypes/phenotypes.component';
import { GeneOntologyComponent } from './gene-ontology/gene-ontology.component';
import { PrimateComponent } from './primate/primate.component';
import { SmartProteinDomainComponent } from './smart-protein-domain/smart-protein-domain.component';
import { DioptAlignmentComponent } from './diopt-alignment/diopt-alignment.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import { PpiComponent } from './ppi/ppi.component';
import { PdbeComponent } from './pdbe/pdbe.component';
import { HumanProteinStructureComponent } from './human-protein-structure/human-protein-structure.component';
import { PharosComponent } from './pharos/pharos.component';
import { ModelmatcherComponent } from './modelmatcher/modelmatcher.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ScrollTopButtonComponent } from '../../scroll-top-button/scroll-top-button.component';

@Component({
    selector: 'app-human-result',
    templateUrl: './human-result.component.html',
    styleUrls: ['./human-result.component.scss'],
    animations: [Animations.fadeInOut, Animations.toggleInOut],
    imports: [
        NgIf,
        NgClass,
        NavbarComponent,
        MatFormField,
        MatLabel,
        MatSelect,
        NgFor,
        MatOption,
        MatButton,
        MatIcon,
        ForwardAnnotationComponent,
        OmimComponent,
        DbnsfpComponent,
        ClinvarComponent,
        Geno2mpComponent,
        DecipherDiseaseComponent,
        MatDivider,
        GnomADComponent,
        GnomADGeneComponent,
        DgvComponent,
        DECIPHERComponent,
        OrthologsComponent,
        GtexBoxplotComponent,
        AgrExpressionComponent,
        PhenotypesComponent,
        GeneOntologyComponent,
        PrimateComponent,
        SmartProteinDomainComponent,
        DioptAlignmentComponent,
        MatProgressBar,
        PpiComponent,
        PdbeComponent,
        HumanProteinStructureComponent,
        PharosComponent,
        ModelmatcherComponent,
        SidenavComponent,
        ScrollTopButtonComponent,
    ],
})
export class HumanResultComponent implements OnInit, AfterViewInit {
	geneLoading = true;
	sidenavOpened = true;
	smallScreen = false;

	// Input
	geneEntrezId: number | null = null;
	variantInput: string | null = null;
	proteinInput: string | null = null;
	genomeBuild = 'hg19';

	// Processed input
	gene: HumanGene | null = null;
	variant: Variant | null = null;
	hg38Variant: Variant | null = null;
	variantString: string | null = null;

	// Data from server
	geneCandidates: HumanGene[] | null = null;

	omimLoading = true;
	omimData = null;

	orthologsLoading = false;
	orthologs: DIOPTOrtholog[] | null = null;

	ppiLoading = true;
	ppiData;

	constructor(
		private route: ActivatedRoute,
		private api: ApiService,
		private variantService: VariantService,
		private cdr: ChangeDetectorRef,
	) {}

	ngOnInit() {
		this.geneLoading = true;
		this.route.params.subscribe((param) => {
			this.initValues();
			this.geneEntrezId = param.gene ? +param.gene : null;
			this.variantInput = param.variant || null;
			this.proteinInput = param.protein || null;
			switch (this.route.snapshot.routeConfig?.path) {
				case 'human/variant/hg38/:variant':
				case 'human/gene/:gene/variant/hg38/:variant':
					this.genomeBuild = 'hg38';
					break;
				default:
					this.genomeBuild = 'hg19';
			}

			// Get gene information from server
			if (this.geneEntrezId !== null) {
				this.api
					.getGeneByEntrezId(this.geneEntrezId)
					.pipe(take(1))
					.subscribe((res) => {
						this.onGeneLoad(res);
						this.cdr.detectChanges();
					});
			}

			// Parse variant and get gene from variant if there was no user input
			if (this.variantInput !== null && this.variantInput !== '') {
				this.parseVariant()
					.toPromise()
					.then((variant: Variant) => {
						if (this.genomeBuild === 'hg19') {
							return this.variantService
								.liftoverHg19ToHg38(variant)
								.pipe(take(1))
								.toPromise()
								.then((liftover) => {
									if (liftover.success) {
										this.hg38Variant = liftover.data;
									}
									return variant;
								})
								.catch((err) => {
									throw err;
								});
						} else {
							this.hg38Variant = variant;
							return this.variantService
								.liftoverHg38ToHg19(variant)
								.pipe(take(1))
								.toPromise()
								.then((liftover) => {
									if (liftover.success) {
										return liftover.data;
									}
									throw Error(liftover.error?.message);
								})
								.catch((err) => {
									throw err;
								});
						}
					})
					.then((hg19Variant: Variant) => {
						this.variant = hg19Variant;
						this.variantString =
							`Chr${hg19Variant.chr}:` + `${hg19Variant.pos} ` + `${hg19Variant.ref}>${hg19Variant.alt}`;
						if (this.gene) {
							this.geneLoading = false;
							return;
						}
						this.geneCandidates = null;
						this.api
							.getGeneByGenomicLocation(this.variant)
							.pipe(take(1))
							.subscribe((res: HumanGene[]) => {
								this.geneCandidates = res;
								if (res && res.length) {
									this.onGeneLoad(res[0]);
								} else {
									this.geneLoading = false;
									this.gene = null;
								}
								this.cdr.detectChanges();
							});
						return;
					})
					.catch((err) => {
						// TODO: error
						console.log(err);
						this.geneLoading = false;
						this.gene = null;
						this.cdr.detectChanges();
					});
			}
		});
	}

	ngAfterViewInit(): void {
		document.body.style.overflow = 'hidden';
		if (window.innerWidth <= 768) {
			// md
			this.smallScreen = true;
		}
	}

	initValues() {
		this.geneLoading = true;
		this.geneEntrezId = null;
		this.variantInput = null;
		this.proteinInput = null;

		this.gene = null;
		this.variant = null;
		this.variantString = null;

		this.geneCandidates = null;

		this.omimLoading = true;
		this.omimData = null;

		this.orthologsLoading = false;
		this.orthologs = null;
	}

	parseVariant(): Observable<any> {
		return new Observable((obs) => {
			const parsed = this.variantService.parse(this.variantInput);
			if (!parsed.valid) {
				obs.error({
					message: `Invalid variant ${this.variantInput}`,
				});
				obs.complete();
				return;
			}
			switch (parsed.type) {
				case 'hgvs':
					this.genomeBuild = 'hg19';
					this.api
						.getGenomLocByHgvsVar(this.variantInput)
						.pipe(take(1))
						.subscribe(
							(res) => {
								if (res.gene) {
									this.geneEntrezId = res.gene.entrezId;
									this.onGeneLoad(res.gene);
								}
								obs.next({
									chr: res.chr,
									pos: res.pos,
									ref: res.ref,
									alt: res.alt,
								});
								obs.complete();
							},
							(err) => {
								obs.error(err);
								obs.complete();
							},
						);
					break;
				case 'coord':
					obs.next(parsed.variant);
					obs.complete();
					break;
				default:
					obs.error({
						message: `Invalid variant ${this.variantInput}`,
					});
					obs.complete();
					break;
			}
		});
	}

	onGeneSelectionChange(e: MatSelectChange) {
		this.onGeneLoad(e.value);
	}

	onGeneLoad(gene) {
		this.gene = gene;
		this.geneLoading = false;
		this.cdr.detectChanges();

		this.getOMIM();
		this.getOrthologs();

		this.getPPI();
	}

	getPPI() {
		this.ppiLoading = true;
		this.api.getPPI(this.gene).subscribe({
			next: (res) => {
				this.ppiData = res;
				this.ppiLoading = false;
			},
			error: (err) => {
				console.log(err);
				this.ppiData = null;
				this.ppiLoading = false;
			},
		});
	}

	getOMIM() {
		if (!this.gene || !this.gene.xref || !this.gene.xref.omimId) {
			this.omimData = null;
			this.omimLoading = false;
			return;
		}

		this.omimLoading = true;
		this.api
			.getOMIMByMimNumber(this.gene.xref.omimId)
			.pipe(take(1))
			.subscribe(
				(res) => {
					this.omimData = res;
					this.omimLoading = false;
				},
				(err) => {
					console.log(err);
					this.omimData = null;
					this.omimLoading = false;
				},
			);
	}

	getOrthologs() {
		this.orthologsLoading = true;
		this.api
			.getOrthologByEntrezId(this.gene.entrezId)
			.pipe(take(1))
			.subscribe((res) => {
				this.orthologs = res;
				this.orthologsLoading = false;
			});
	}

	toggleSidenav(e) {
		if ('sidenavOpened' in e) {
			this.sidenavOpened = e.sidenavOpened;
		} else {
			const target = window.document.getElementById(e.scrollTo);
			if (target) {
				target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		}
	}
}
