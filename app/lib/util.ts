export function isEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function debounce<Args extends unknown[]>(
  func: (...args: Args) => void | Promise<void>,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Args) => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      await func(...args);
    }, delay);
  };
}
