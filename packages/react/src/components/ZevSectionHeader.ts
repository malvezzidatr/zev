import React from 'react';
import { createComponent } from '@lit/react';
import { ZevSectionHeader as ZevSectionHeaderElement } from '@zev/core';

export const ZevSectionHeader = createComponent({
  tagName: 'zev-section-header',
  elementClass: ZevSectionHeaderElement,
  react: React,
});
