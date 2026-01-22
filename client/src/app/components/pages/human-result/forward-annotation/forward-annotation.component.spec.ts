import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ForwardAnnotationComponent } from './forward-annotation.component';

describe('ForwardAnnotationComponent', () => {
	let component: ForwardAnnotationComponent;
	let fixture: ComponentFixture<ForwardAnnotationComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [ForwardAnnotationComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ForwardAnnotationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
