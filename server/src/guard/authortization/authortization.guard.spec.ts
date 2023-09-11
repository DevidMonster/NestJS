import { AuthortizationGuard } from './authortization.guard';

describe('AuthortizationGuard', () => {
  it('should be defined', () => {
    expect(new AuthortizationGuard()).toBeDefined();
  });
});
