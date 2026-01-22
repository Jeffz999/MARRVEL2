import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PpiComponent } from './ppi.component';

describe('PpiComponent', () => {
	let component: PpiComponent;
	let fixture: ComponentFixture<PpiComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
    imports: [PpiComponent],
}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PpiComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
