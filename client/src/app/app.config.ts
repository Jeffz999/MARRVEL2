import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withNavigationErrorHandler, withRouterConfig } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZonelessChangeDetection(),
		provideRouter(
			routes,
			withRouterConfig({ onSameUrlNavigation: 'reload' }),
			withNavigationErrorHandler((error) => console.error('Navigation Error:', error)),
		),
		provideHttpClient(),
		provideAnimations(),
	],
};
