export class NotAuthorizedError extends Error {
  constructor(message?: string) {
    super();
    this.message = message || '권한이 없습니다.';
  }
}
