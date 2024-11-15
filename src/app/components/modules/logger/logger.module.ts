import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from './logger.service';

@NgModule({
	declarations: [],
	imports: [
		CommonModule
	],
	providers: [
		{
			provide: LoggerService,
			useFactory: () => LoggerService.instance()
		}
	]
})
export class LoggerModule {

}