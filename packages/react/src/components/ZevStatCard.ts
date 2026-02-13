import React from 'react';
import { createComponent } from '@lit/react';
import { ZevStatCard as ZevStatCardElement } from '@malvezzidatr/zev-core';

export const ZevStatCard = createComponent({
  tagName: 'zev-stat-card',
  elementClass: ZevStatCardElement,
  react: React,
});
