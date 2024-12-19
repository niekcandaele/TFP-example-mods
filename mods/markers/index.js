/* eslint-disable react/prop-types */
import { MarkersComponent } from './mapComponent';
import { MarkersSettings } from './settings';
const modId = 'TFP_MarkersExample';

const Markers = {
  about: `This mod manages markers on a Leaflet map.`,
  routes: {},
  settings: {
    'Map markers': MarkersSettings,
  },
  mapComponents: [MarkersComponent],
};

window[modId] = Markers;
window.dispatchEvent(new Event(`mod:${modId}:ready`));
