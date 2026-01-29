import React from 'react';
import { createComponent } from '@lit/react';
import type { EventName } from '@lit/react';
import { ZevModal as ZevModalElement } from '@malvezzidatr/zev-core';

export const ZevModal = createComponent({
  tagName: 'zev-modal',
  elementClass: ZevModalElement,
  react: React,
  events: {
    onModalOpen: 'modal-open' as EventName<CustomEvent>,
    onModalClose: 'modal-close' as EventName<CustomEvent>,
  },
});
