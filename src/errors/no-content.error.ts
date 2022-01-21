export class NoContentError extends Error {
  constructor(message?: string) {
    super();
    this.message = message || '내용이 없습니다.';
  }
}
