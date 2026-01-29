import React from 'react';
import { createComponent } from '@lit/react';
import type { EventName } from '@lit/react';
import { ZevFileUpload as ZevFileUploadElement } from '@malvezzidatr/zev-core';

export const ZevFileUpload = createComponent({
  tagName: 'zev-file-upload',
  elementClass: ZevFileUploadElement,
  react: React,
  events: {
    onFileSelect: 'file-select' as EventName<CustomEvent<{ files: File[] }>>,
    onFileRemove: 'file-remove' as EventName<CustomEvent<{ file: File; files: File[] }>>,
    onFileError: 'file-error' as EventName<CustomEvent<{ errors: string[] }>>,
  },
});
