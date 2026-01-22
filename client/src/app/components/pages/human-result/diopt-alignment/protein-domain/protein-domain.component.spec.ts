import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProteinDomainComponent } from './protein-domain.component';

describe('ProteinDomainComponent', () => {
	let component: ProteinDomainComponent;
	let fixture: ComponentFixture<ProteinDomainComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
    imports: [ProteinDomainComponent],
}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProteinDomainComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
