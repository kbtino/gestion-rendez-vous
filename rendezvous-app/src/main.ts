import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule } from '@angular/router';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // pour activer le routing
    provideAnimationsAsync(), // pour activer les animations Angular Material. ici utilise pour la date en francais
    importProvidersFrom(HttpClientModule), // pour activer HttpClient dans les services
    { provide: LOCALE_ID, useValue: 'fr-FR' }, // pour définir la locale en français
  ] 
});