import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Geno2mpGeneTableComponent } from './geno2mp-gene-table.component';

describe('Geno2mpGeneTableComponent', () => {
	let component: Geno2mpGeneTableComponent;
	let fixture: ComponentFixture<Geno2mpGeneTableComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [Geno2mpGeneTableComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(Geno2mpGeneTableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
