import React from 'react';
import { createComponent } from '@lit/react';
import { ZevBadge as ZevBadgeElement } from '@malvezzidatr/zev-core';

export const ZevBadge = createComponent({
  tagName: 'zev-badge',
  elementClass: ZevBadgeElement,
  react: React,
});
