import React from 'react';
import { createComponent } from '@lit/react';
import type { EventName } from '@lit/react';
import { ZevInput as ZevInputElement } from '@malvezzidatr/zev-core';

export const ZevInput = createComponent({
  tagName: 'zev-input',
  elementClass: ZevInputElement,
  react: React,
  events: {
    onInputChange: 'input-change' as EventName<CustomEvent<{ value: string }>>,
  },
});
