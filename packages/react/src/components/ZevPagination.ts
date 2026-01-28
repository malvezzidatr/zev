import React from 'react';
import { createComponent } from '@lit/react';
import type { EventName } from '@lit/react';
import { ZevPagination as ZevPaginationElement } from '@malvezzidatr/zev-core';

export const ZevPagination = createComponent({
  tagName: 'zev-pagination',
  elementClass: ZevPaginationElement,
  react: React,
  events: {
    onPageChange: 'page-change' as EventName<CustomEvent<{ page: number }>>,
  },
});
