import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery, shadowQueryAll } from './test-helpers.js';
import '../components/file-upload/zev-file-upload.js';
import type { ZevFileUpload } from '../components/file-upload/zev-file-upload.js';

describe('zev-file-upload', () => {
  let element: ZevFileUpload;

  beforeEach(async () => {
    element = fixture<ZevFileUpload>('zev-file-upload');
    await elementUpdated(element);
  });

  afterEach(() => {
    cleanup(element);
  });

  it('should render', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('should render dropzone', async () => {
    const dropzone = shadowQuery<HTMLElement>(element, '.upload__dropzone');
    expect(dropzone).not.toBeNull();
  });

  it('should render label when provided', async () => {
    element.label = 'Upload File';
    await elementUpdated(element);

    const label = shadowQuery<HTMLElement>(element, '.upload__label');
    expect(label?.textContent).toBe('Upload File');
  });

  it('should render hidden file input', async () => {
    const input = shadowQuery<HTMLInputElement>(element, '.upload__input');
    expect(input).not.toBeNull();
    expect(input?.type).toBe('file');
  });

  it('should set accept attribute on input', async () => {
    element.accept = '.pdf,.doc';
    await elementUpdated(element);

    const input = shadowQuery<HTMLInputElement>(element, '.upload__input');
    expect(input?.accept).toBe('.pdf,.doc');
  });

  it('should set multiple attribute on input', async () => {
    element.multiple = true;
    await elementUpdated(element);

    const input = shadowQuery<HTMLInputElement>(element, '.upload__input');
    expect(input?.multiple).toBe(true);
  });

  it('should apply disabled state', async () => {
    element.disabled = true;
    await elementUpdated(element);

    const dropzone = shadowQuery<HTMLElement>(element, '.upload__dropzone');
    expect(dropzone?.classList.contains('upload__dropzone--disabled')).toBe(true);
  });

  it('should display error message', async () => {
    element.error = 'File too large';
    await elementUpdated(element);

    const error = shadowQuery<HTMLElement>(element, '.upload__error');
    expect(error?.textContent).toBe('File too large');
  });

  it('should apply error state to dropzone', async () => {
    element.error = 'Error';
    await elementUpdated(element);

    const dropzone = shadowQuery<HTMLElement>(element, '.upload__dropzone');
    expect(dropzone?.classList.contains('upload__dropzone--error')).toBe(true);
  });

  it('should have clickable dropzone that contains file input', async () => {
    const dropzone = shadowQuery<HTMLElement>(element, '.upload__dropzone');
    const input = shadowQuery<HTMLInputElement>(element, '.upload__input');

    expect(dropzone).not.toBeNull();
    expect(input).not.toBeNull();
    // Verify the input is inside the dropzone (clickable area)
    expect(dropzone?.contains(input!)).toBe(true);
  });

  it('should not trigger input click when disabled', async () => {
    element.disabled = true;
    await elementUpdated(element);

    const input = shadowQuery<HTMLInputElement>(element, '.upload__input');
    const clickSpy = vi.spyOn(input!, 'click');

    const dropzone = shadowQuery<HTMLElement>(element, '.upload__dropzone');
    dropzone?.click();

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('should emit file-select event when files are selected', async () => {
    const handler = vi.fn();
    element.addEventListener('file-select', handler);

    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    const input = shadowQuery<HTMLInputElement>(element, '.upload__input');
    Object.defineProperty(input, 'files', { value: dataTransfer.files });
    input?.dispatchEvent(new Event('change'));

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail.files).toHaveLength(1);
  });

  it('should display selected file', async () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    const input = shadowQuery<HTMLInputElement>(element, '.upload__input');
    Object.defineProperty(input, 'files', { value: dataTransfer.files });
    input?.dispatchEvent(new Event('change'));
    await elementUpdated(element);

    const fileName = shadowQuery<HTMLElement>(element, '.upload__file-name');
    expect(fileName?.textContent).toBe('test.txt');
  });

  it('should emit file-remove event when file is removed', async () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    const input = shadowQuery<HTMLInputElement>(element, '.upload__input');
    Object.defineProperty(input, 'files', { value: dataTransfer.files });
    input?.dispatchEvent(new Event('change'));
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('file-remove', handler);

    const removeBtn = shadowQuery<HTMLButtonElement>(element, '.upload__file-remove');
    removeBtn?.click();

    expect(handler).toHaveBeenCalled();
  });

  it('should emit file-error for files exceeding maxSize', async () => {
    element.maxSize = 10; // 10 bytes
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('file-error', handler);

    const file = new File(['this is a longer content'], 'test.txt', { type: 'text/plain' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    const input = shadowQuery<HTMLInputElement>(element, '.upload__input');
    Object.defineProperty(input, 'files', { value: dataTransfer.files });
    input?.dispatchEvent(new Event('change'));

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail.errors).toHaveLength(1);
  });

  it('should handle drag over', async () => {
    const dropzone = shadowQuery<HTMLElement>(element, '.upload__dropzone');

    const dragOverEvent = new Event('dragover', { bubbles: true }) as DragEvent;
    Object.defineProperty(dragOverEvent, 'preventDefault', { value: vi.fn() });
    Object.defineProperty(dragOverEvent, 'stopPropagation', { value: vi.fn() });
    dropzone?.dispatchEvent(dragOverEvent);
    await elementUpdated(element);

    expect(dropzone?.classList.contains('upload__dropzone--dragging')).toBe(true);
  });

  it('should handle drag leave', async () => {
    const dropzone = shadowQuery<HTMLElement>(element, '.upload__dropzone');

    // First trigger dragover
    const dragOverEvent = new Event('dragover', { bubbles: true }) as DragEvent;
    Object.defineProperty(dragOverEvent, 'preventDefault', { value: vi.fn() });
    Object.defineProperty(dragOverEvent, 'stopPropagation', { value: vi.fn() });
    dropzone?.dispatchEvent(dragOverEvent);
    await elementUpdated(element);

    // Then trigger dragleave
    const dragLeaveEvent = new Event('dragleave', { bubbles: true }) as DragEvent;
    Object.defineProperty(dragLeaveEvent, 'preventDefault', { value: vi.fn() });
    Object.defineProperty(dragLeaveEvent, 'stopPropagation', { value: vi.fn() });
    dropzone?.dispatchEvent(dragLeaveEvent);
    await elementUpdated(element);

    expect(dropzone?.classList.contains('upload__dropzone--dragging')).toBe(false);
  });

  it('should respect maxFiles limit', async () => {
    element.maxFiles = 1;
    element.multiple = true;
    await elementUpdated(element);

    const file1 = new File(['test1'], 'test1.txt', { type: 'text/plain' });
    const file2 = new File(['test2'], 'test2.txt', { type: 'text/plain' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file1);
    dataTransfer.items.add(file2);

    const input = shadowQuery<HTMLInputElement>(element, '.upload__input');
    Object.defineProperty(input, 'files', { value: dataTransfer.files });
    input?.dispatchEvent(new Event('change'));
    await elementUpdated(element);

    const files = shadowQueryAll<HTMLElement>(element, '.upload__file');
    expect(files).toHaveLength(1);
  });
});
