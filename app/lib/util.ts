export function isEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function debounce<Func extends (...args: any[]) => void | Promise<void>>(
  func: Func,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<Func>) => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      await func(...args);
    }, delay);
  };
}
