import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PharosLigandTableComponent } from './pharos-ligand-table.component';

describe('PharosLigandTableComponent', () => {
	let component: PharosLigandTableComponent;
	let fixture: ComponentFixture<PharosLigandTableComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
    imports: [PharosLigandTableComponent],
}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PharosLigandTableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
