import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GtexBoxplotComponent } from './gtex-boxplot.component';

describe('GtexBoxplotComponent', () => {
	let component: GtexBoxplotComponent;
	let fixture: ComponentFixture<GtexBoxplotComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [GtexBoxplotComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GtexBoxplotComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
