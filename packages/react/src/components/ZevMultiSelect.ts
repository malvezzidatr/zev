import React from 'react';
import { createComponent } from '@lit/react';
import type { EventName } from '@lit/react';
import { ZevMultiSelect as ZevMultiSelectElement } from '@malvezzidatr/zev-core';

export const ZevMultiSelect = createComponent({
  tagName: 'zev-multi-select',
  elementClass: ZevMultiSelectElement,
  react: React,
  events: {
    onMultiSelectChange: 'multi-select-change' as EventName<CustomEvent<{ values: string[]; labels: string[] }>>,
    onMultiSelectSearch: 'multi-select-search' as EventName<CustomEvent<{ query: string }>>,
  },
});
