import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountService]
    });

    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create an account', () => {
    const mockAccount = {
      idPessoa: 1,
      saldo: 1000,
      limiteSaqueDiario: 1000,
      tipoConta: 1,
      flagAtivo: true
    };

    service.createAccount(mockAccount).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.apiUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockAccount);
  });

  it('should get account details', () => {
    const mockAccount = {
      idConta: 1,
      idPessoa: 1,
      saldo: 1000,
      limiteSaqueDiario: 1000,
      tipoConta: 1,
      flagAtivo: true
    };

    service.getAccount(1).subscribe(account => {
      expect(account).toEqual(mockAccount);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAccount);
  });

  it('should make a deposit', () => {
    const mockResponse = { message: 'Deposit successful' };

    service.deposit(1, 500).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/1/deposito`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ valor: 500 });
    req.flush(mockResponse);
  });

  it('should make a withdrawal', () => {
    const mockResponse = { message: 'Withdrawal successful' };

    service.withdraw(1, 500).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/1/saque`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ valor: 500 });
    req.flush(mockResponse);
  });

  it('should toggle account status', () => {
    const mockResponse = { message: 'Status updated' };

    service.toggleBlockStatus(1).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/1/bloqueio`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('should get statement with date filter', () => {
    const mockStatement = {
      transactions: [
        { id: 1, valor: 500, dataTransacao: new Date() }
      ]
    };

    const filter = {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-31')
    };

    service.getStatementByPeriod(1, filter).subscribe(statement => {
      expect(statement).toEqual(mockStatement);
    });

    const req = httpMock.expectOne(request => 
      request.url === `${service.apiUrl}/1/extrato` && 
      request.params.has('startDate') && 
      request.params.has('endDate')
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockStatement);
  });
}); 