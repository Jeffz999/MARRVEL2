import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GnomADGeneComponent } from './gnom-ad-gene.component';

describe('GnomADGeneComponent', () => {
	let component: GnomADGeneComponent;
	let fixture: ComponentFixture<GnomADGeneComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
    imports: [GnomADGeneComponent],
}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GnomADGeneComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
