import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import { enableProdMode } from '@angular/core';

// Enable production mode unless running locally
if (!/localhost|192.168.|127.0./.test(document.location.host)) {
    enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule);
