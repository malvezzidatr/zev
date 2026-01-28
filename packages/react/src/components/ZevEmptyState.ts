import React from 'react';
import { createComponent } from '@lit/react';
import { ZevEmptyState as ZevEmptyStateElement } from '@malvezzidatr/zev-core';

export const ZevEmptyState = createComponent({
  tagName: 'zev-empty-state',
  elementClass: ZevEmptyStateElement,
  react: React,
});
