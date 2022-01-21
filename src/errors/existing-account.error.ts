export class ExistingAccountError extends Error {
  constructor(message?: string) {
    super();
    this.message = message || '이미 존재하는 계정입니다.';
  }
}
