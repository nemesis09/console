export const VALID_HIGHLIGHT_LABELS = [
  'Perspective Switcher',
  'Kubernetes',
  'Topology',
  'K8s',
  'CaPiTaLs',
  'ALLCAPS',
  'search',
  'help icon',
  'label(s)',
  'with $pecial character$',
  'with great emphasis!',
  'my long link with spaces and _under_scores_',
  'allow-dashes',
];

export const INVALID_HIGHLIGHT_LABELS = [
  '[[]]]',
  '{{}}',
  '',
  ']{',
  'valid characters that should work but an extra ]',
  '[]',
  '{}',
];

export const VALID_IDS = [
  'tour-perspective-dropdown',
  'tour-help-button',
  'tour-search-nav',
  'qs-perspective-switcher',
  'qs-nav-topology',
  'qs-nav-search',
];

export const INVALID_IDS = [
  'something with spaces',
  'symbols~!@#$%^&*()`:;"\'<,>.?/|\\',
  '#id',
  '.class',
  '[data-attr]',
  'regular-text',
  '',
  '[]',
  '()',
  '{}',
];

export const VALID_HIGHLIGHT_LINKS = [
  '[Perspective Switcher]{{highlight qs-perspective-switcher}}',
  '[Topology]{{highlight qs-nav-topology}}',
  '[Search]{{highlight qs-nav-search}}',
  '[Help]{{highlight qs-masthead-help}}',
];

export const INVALID_HIGHLIGHT_LINKS = [
  '[[link]{{highlight qs-perspective-switcher}}',
  '[link]{{highight qs-perspective-switcher}}',
  '[link]{{highlight perspective-switcher}}',
];
