const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export interface FocusTrapResult {
  deactivate: () => void;
}

export function activateFocusTrap(container: HTMLElement): FocusTrapResult {
  const previousActiveElement = document.activeElement as HTMLElement | null;

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    const focusableElements = Array.from(
      container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    ).filter(el => el.offsetParent !== null);

    if (focusableElements.length === 0) return;

    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      }
    } else {
      if (document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  };

  container.addEventListener('keydown', handleKeydown);

  // Focus first focusable element
  requestAnimationFrame(() => {
    const focusableElements = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  });

  return {
    deactivate: () => {
      container.removeEventListener('keydown', handleKeydown);
      if (previousActiveElement && previousActiveElement.focus) {
        previousActiveElement.focus();
      }
    },
  };
}
