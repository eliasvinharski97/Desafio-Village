import { HttpRequest, HttpResponse, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// IDs de pessoas válidos para teste
const validPersonIds = [1, 2, 3, 4, 5];

export function mockApiInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  // Simula validação de pessoa
  if (req.url.match(/\/api\/pessoas\/\d+\/validar$/)) {
    const idPessoa = parseInt(req.url.split('/').slice(-2)[0]);
    return of(new HttpResponse({
      status: 200,
      body: validPersonIds.includes(idPessoa)
    })).pipe(delay(1000)); // Simula delay de rede
  }

  // Passa outras requisições adiante
  return next(req);
} 