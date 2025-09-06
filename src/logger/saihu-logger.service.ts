import { LoggerService } from '@nestjs/common';

export class SaihuLogger implements LoggerService {
  log(message: any, context?: string) {
    // Hide Nest internal logs
    if (context?.includes('InstanceLoader')) return;
    if (context?.includes('RoutesResolver')) return;
    if (context?.includes('RouterExplorer')) return;
    if (context?.includes('NestFactory')) return;
    if (context?.includes('NestApplication')) return;
    if (context?.includes('ClientProxy')) return;
    if (context?.includes('NestMicroservice')) return;

    console.log(`[${context}]`, message);
  }
  error(message: any, trace?: string, context?: string) {
    console.error(`[${context}]`, message, trace);
  }
  warn(message: any, context?: string) {
    console.warn(`[${context}]`, message);
  }
  debug() {}
  verbose() {}
}
