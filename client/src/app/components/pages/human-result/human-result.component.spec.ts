import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HumanResultComponent } from './human-result.component';

describe('SearchComponent', () => {
	let component: HumanResultComponent;
	let fixture: ComponentFixture<HumanResultComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
    imports: [HumanResultComponent],
}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HumanResultComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
