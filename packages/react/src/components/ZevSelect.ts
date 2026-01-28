import React from 'react';
import { createComponent } from '@lit/react';
import type { EventName } from '@lit/react';
import { ZevSelect as ZevSelectElement } from '@malvezzidatr/zev-core';

export const ZevSelect = createComponent({
  tagName: 'zev-select',
  elementClass: ZevSelectElement,
  react: React,
  events: {
    onSelectChange: 'select-change' as EventName<CustomEvent<{ value: string; label: string }>>,
  },
});
