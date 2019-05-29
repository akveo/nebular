[Back to migration guide](https://akveo.github.io/nebular/docs/migration/350400-migration).

Nebular 4.0 significantly reworked theme structure, this list contains the changes to the components theme variables.
Complete set of all component theme variables and theme variables they use could be found on a particular component theme page https://akveo.github.io/nebular/next/docs/components/card/theme.

#### Radio:

Renamed:
- `radio-bg` -> `radio-border-color`, `radio-inner-circle-color`, `radio-[status]-border-color`, `radio-[status]-inner-circle-color`
- `radio-fg` -> `radio-text-color`
- `radio-size` -> `radio-width, radio-height`
- `radio-border-size` -> `radio-border-width`
- `radio-checkmark` -> `radio-inner-circle-color`
- `radio-disabled-checkmark` -> `radio-disabled-inner-circle`
- `radio-indicator` -> `radio-circle`

Removed:
- `radio-checked-bg`
- `radio-checked-size`
- `radio-checked-border-size`
- `radio-checked-border-color`
- `radio-checked-checkmark`
- `radio-disabled-bg`
- `radio-disabled-size`
- `radio-disabled-border-size`
- `radio-bg`
- `radio-checkmark`

#### Checkbox:

Properties `checkbox-bg`, `checkbox-checked-bg` and `checkbox-disabled-bg` replaced with:
- `checkbox-disabled-background-color`
- `checkbox-[status]-background-color`
- `checkbox-[status]-checked-background-color`
- `checkbox-[status]-indeterminate-background-color`
- `checkbox-[status]-focus-background-color`
- `checkbox-[status]-hover-background-color`
- `checkbox-[status]-active-background-color`

Property `checkbox-size` splited into `checkbox-height`, `checkbox-width`.

Removed:
- `checkbox-checked-size`
- `checkbox-checked-border-size`
- `checkbox-disabled-size`
- `checkbox-disabled-border-size`

`checkbox-border-size` -> `checkbox-border-width`

Properties `checkbox-border-color`, `checkbox-checked-border-color`, `checkbox-disabled-border-color` replaced with:
- `checkbox-disabled-border-color`
- `checkbox-[status]-border-color`
- `checkbox-[status]-checked-border-color`
- `checkbox-[status]-indeterminate-border-color`
- `checkbox-[status]-hover-border-color`
- `checkbox-[status]-active-border-color`

Properties `checkbox-checkmark`, `checkbox-checked-checkmark`, `checkbox-disabled-checkmark` replaced with:
- `checkbox-disabled-checkmark-color`
- `checkbox-[status]-checked-checkmark-color`
- `checkbox-[status]-indeterminate-checkmark-color`

#### Input:

Renamed:
- `form-control-border-width` -> `input-border-width`
- `form-control-border-radius` -> `input-rectangle-border-radius`
- `form-control-semi-round-border-radius` -> `input-semi-round-border-radius`
- `form-control-round-border-radius` -> `input-round-border-radius`
- `form-control-text-primary-color` -> `input-text-color`
- `form-control-border-color` -> `input-border-color`
- `form-control-selected-border-color` -> `input-focus-border-color`, `input-[status]-focus-color`
- `form-control-bg` -> `input-background-color`
- `form-control-focus-bg` -> `input-focus-border-color`
- `form-control-placeholder-color` -> `input-placeholder-text-color`
- `form-control-placeholder-font-size` -> `input-placeholder-font-size`
- `form-control-font-size` -> `input-medium-text-font-size`
- `form-control-font-size-sm` -> `input-small-text-font-size`
- `form-control-font-size-lg` -> `input-large-text-font-size`
- `form-control-padding` -> `input-medium-padding`
- `form-control-padding-sm` -> `input-small-padding`
- `form-control-padding-lg` -> `input-large-padding`
- `form-control-info-border-color` -> `input-info-border-color`
- `form-control-success-border-color` -> `input-success-border-color`
- `form-control-danger-border-color` -> `input-danger-border-color`
- `form-control-warning-border-color` -> `input-warning-border-color`
- `form-control-border-type` -> `input-border-style`

Removed:
- `form-control-label-font-weight`
- `form-control-feedback-font-size`
- `form-control-feedback-font-weight`

#### Tooltip:

Renamed:
- `tooltip-bg` -> `tooltip-background-color`
- `tooltip-fg` -> `tooltip-text-color`
- `tooltip-font-size` -> `tooltip-text-font-size`
- `tooltip-status-fg` -> `tooltip-[status]-text-color`
- `tooltip-primary-bg` -> `tooltip-primary-background-color`
- `tooltip-info-bg` -> `tooltip-info-background-color`
- `tooltip-success-bg` -> `tooltip-success-background-color`
- `tooltip-warning-bg` -> `tooltip-warning-background-color`
- `tooltip-danger-bg` -> `tooltip-danger-background-color`

User:

Renamed:
- `user-font-size` -> `user-[size]-initials-text-font-size`, `user-[size]-name-text-font-size`, `user-[size]-title-text-font-size`
- `user-line-height` -> `user-[size]-initials-text-line-height`, `user-[size]-name-text-line-height`, `user-[size]-title-text-line-height`
- `user-bg` -> `user-picture-box-background-color`
- `user-fg` -> `user-initials-text-color`
- `user-fg-highlight` -> `user-picture-box-border-color`
- `user-font-family-secondary` -> `user-name-text-font-family`
- `user-size-small` -> `user-small-height`, `user-small-width`
- `user-size-medium` -> `user-medium-height`, `user-medium-width`
- `user-size-large` -> `user-large-height`, `user-large-width`
- `user-size-xlarge` -> `user-giant-height`, `user-giant-width`

#### Tabset:

Renamed:
- `tabs-font-family` -> `tabset-tab-text-font-family`
- `tabs-font-size` -> `tabset-tab-text-font-size`
- `tabs-content-font-family` -> `tabset-content-text-font-family`
- `tabs-content-font-size` -> `tabset-content-text-font-size`
- `tabs-active-bg` -> `tabset-tab-selected-background-color`
- `tabs-padding` -> `tabset-tab-padding`
- `tabs-content-padding` -> `tabset-content-padding`
- `tabs-header-bg` -> `tabset-tab-background-color`
- `tabs-separator` -> `tabset-divider-color`
- `tabs-fg` -> `tabset-tab-text-color`
- `tabs-fg-disabled` -> `tabset-tab-disabled-text-color`
- `tabs-fg-text` -> `tabset-content-text-color`
- `tabs-fg-heading` -> `tabset-tab-selected-text-color`, `tabset-tab-focus-text-color`, `tabset-tab-hover-text-color`
- `tabs-bg` -> `tabset-content-background-color`
- `tabs-selected` -> `tabset-tab-underline-color`
- `tabs-icon-only-max-width` -> `tabset-tab-text-hide-breakpoint`

Removed:
- `tabs-active-font-weight`
- `tabs-selected-second-color`
- `tabs-selected-degrees`

#### Route Tabset:

Following properties were renamed:
- `route-tabs-font-family` -> `route-tabset-tab-text-font-family`
- `route-tabs-font-size` -> `route-tabset-tab-text-font-size`
- `route-tabs-active-bg` -> `route-tabset-tab-selected-background-color`
- `route-tabs-padding` -> `route-tabset-tab-padding`
- `route-tabs-header-bg` -> `route-tabset-tab-background-color`
- `route-tabs-separator` -> `route-tabset-divider-color`
- `route-tabs-fg` -> `route-tabset-tab-text-color`
- `route-tabs-fg-disabled` -> `route-tabset-tab-disabled-text-color`
- `route-tabs-fg-heading` -> `route-tabset-tab-selected-text-color`, `route-tabset-tab-focus-text-color`, `route-tabset-tab-hover-text-color`
- `route-tabs-selected` -> `route-tabset-tab-underline-color`
- `route-tabs-icon-only-max-width` -> `route-tabset-tab-text-hide-breakpoint`

`route-tabs-bg` property was unused and removed.

#### Card:

Renamed:
- `card-font-size` -> `card-text-font-size`
- `card-font-weight` -> `card-text-font-weight`
- `card-line-height` -> `card-text-line-height`
- `card-bg` -> `card-background-color`
- `card-border-type` -> `card-border-style`
- `card-separator` -> `card-divider-color`
- `card-header-fg` -> `card-header-text-color`
- `card-header-primary-bg` -> `card-header-primary-background-color`
- `card-header-info-bg` -> `card-header-info-background-color`
- `card-header-success-bg` -> `card-header-success-background-color`
- `card-header-warning-bg` -> `card-header-warning-background-color`
- `card-header-danger-bg` -> `card-header-danger-background-color`
- `card-header-disabled-bg` -> `card-header-disabled-background-color`
- `card-margin` -> `card-margin-bottom`
- `card-height-xxsmall` -> `card-height-tiny`
- `card-height-small` -> `card-height-small`
- `card-height-medium` -> `card-height-medium`
- `card-height-large` -> `card-height-large`
- `card-height-xlarge` -> `card-height-giant`

Removed:
- `card-fg`
- `card-fg-text`
- `card-fg-heading`
- `card-header-fg-heading`
- `card-header-active-bg`
- `card-header-active-fg`
- `card-header-border-width`
- `card-header-border-type`
- `card-header-border-color`
- `card-height-xsmall`
- `card-height-xxlarge`

#### Spinner:

Renamed:
- `spinner-bg` -> `spinner-background-color`
- `spinner-circle-bg` -> `spinner-circle-filled-color`
- `spinner-fg` -> `spinner-text-color`
- `spinner-primary-bg` -> `spinner-primary-circle-filled-color`
- `spinner-info-bg` -> `spinner-info-circle-filled-color`
- `spinner-success-bg` -> `spinner-success-circle-filled-color`
- `spinner-warning-bg` -> `spinner-warning-circle-filled-color`
- `spinner-danger-bg` -> `spinner-danger-circle-filled-color`
- `spinner-xsmall` -> `spinner-height-tiny`
- `spinner-small` -> `spinner-height-small`
- `spinner-medium` -> `spinner-height-medium`
- `spinner-large` -> `spinner-height-large`
- `spinner-xlarge` -> `spinner-height-giant`

Removed:
- `spinner-xxsmall`
- `spinner-xxlarge`
- `spinner-disabled-bg`
- `spinner-disabled-fg`
- `spinner-active-bg`

#### Button:

Renamed:
- `btn-fg` -> `button-filled-[status]-text-color`, `button-outline-[status]-[state?]-text-color`, `button-ghost-[status]-[state?]-text-color`, `button-hero-[status]-text-color`
- `btn-font-family` -> `button-text-font-family`
- `btn-line-height` -> `button-[size]-text-line-height`
- `btn-cursor` -> `button-cursor`
- `btn-[status]-bg` -> `button-filled-[status]-background-color`
- `btn-[status]-hover-bg` -> `button-filled-[status]-hover-background-color`
- `btn-[status]-active-bg` -> `button-filled-[status]-active-background-color`
- `btn-padding-y-[size], btn-padding-x-[size]` -> `button-[appearance]-[size]-padding`
- `btn-font-size-[size]` -> `button-[size]-text-font-size`
- `btn-rectangle-border-radius` -> `button-rectangle-border-radius`
- `btn-semi-round-border-radius` -> `button-semi-round-border-radius`
- `btn-round-border-radius` -> `button-round-border-radius`
- `btn-hero-shadow` -> `button-hero-shadow`
- `btn-hero-text-shadow` -> `button-hero-text-shadow`
- `btn-hero-bevel-size` -> `button-hero-bevel-size`
- `btn-hero-glow-size` -> `button-hero-glow-size`
- `btn-hero-[status]-bevel-color` -> `button-hero-[status]-bevel-color`
- `btn-hero-[status]-glow-color` -> `button-hero-[status]-glow-color`
- `btn-hero-[status]-left-bg` -> `button-hero-[status]-left-background-color`
- `btn-hero-[status]-right-bg` -> `button-hero-[status]-right-background-color`
- `btn-hero-[status]-left-hover-bg` -> `button-hero-[status]-hover-left-background-color`
- `btn-hero-[status]-right-hover-bg` -> `button-hero-[status]-hover-right-background-color`
- `btn-hero-[status]-left-active-bg` -> `button-hero-[status]-active-left-background-color`
- `btn-hero-[status]-right-active-bg` -> `button-hero-[status]-active-right-background-color`
- `btn-outline-fg` -> `button-outline-[status]-border-color`
- `btn-outline-hover-fg` -> `button-outline-[status]-hover-border-color`
- `btn-outline-focus-fg` -> `button-outline-[status]-focus-border-color`

Removed:
- `btn-group-bg`
- `btn-group-fg`
- `btn-group-separator`
- `btn-disabled-opacity`
- `btn-secondary-bg`
- `btn-secondary-hover-bg`
- `btn-secondary-active-bg`
- `btn-secondary-border`
- `btn-secondary-border-width`
- `btn-hero-secondary-bevel-color`
- `btn-hero-secondary-glow-color`
- `btn-hero-border-radius`

#### Progress:

Renamed:
- `progress-bar-height-xlg` -> `progress-bar-giant-height`
- `progress-bar-height-lg` -> `progress-bar-large-height`
- `progress-bar-height` -> `progress-bar-medium-height`
- `progress-bar-height-sm` -> `progress-bar-small-height`
- `progress-bar-height-xs` -> `progress-bar-tiny-height`
- `progress-bar-font-size-xlg` -> `progress-bar-giant-text-font-size`
- `progress-bar-font-size-lg` -> `progress-bar-large-text-font-size`
- `progress-bar-font-size` -> `progress-bar-medium-text-font-size`
- `progress-bar-font-size-sm` -> `progress-bar-small-text-font-size`
- `progress-bar-font-size-xs` -> `progress-bar-tiny-text-font-size`
- `progress-bar-radius` -> `progress-bar-border-radius`
- `progress-bar-bg` -> `progress-bar-[status]-background-color`
- `progress-bar-font-color` -> `progress-bar-[status]-background-color`
- `progress-bar-font-weight` -> `progress-bar-[size]-text-font-weight`
- `progress-bar-primary-bg` -> `progress-bar-[status]-background-color`
- `progress-bar-success-bg` -> `progress-bar-[status]-background-color`
- `progress-bar-info-bg` -> `progress-bar-[status]-background-color`
- `progress-bar-warning-bg` -> `progress-bar-[status]-background-color`
- `progress-bar-danger-bg` -> `progress-bar-[status]-background-color`

Removed:
- `progress-bar-default-bg`

#### Accordion:

Renamed:
- `accordion-header-font-family` -> `accordion-header-text-font-family`
- `accordion-header-font-size` -> `accordion-header-text-font-size`
- `accordion-header-font-weight` -> `accordion-header-text-font-weight`
- `accordion-header-fg-heading` -> `accordion-header-text-color`
- `accordion-header-disabled-fg` -> `accordion-header-disabled-text-color`
- `accordion-header-border-type` -> `accordion-header-border-style`
- `accordion-item-bg` -> `accordion-item-background-color`
- `accordion-item-font-size` -> `accordion-item-text-font-size`
- `accordion-item-font-weight` -> `accordion-item-text-font-weight`
- `accordion-item-font-family` -> `accordion-item-text-font-family`
- `accordion-item-fg-text` -> `accordion-item-text-color`
- `accordion-item-shadow` -> `accordion-shadow`

Removed:
- `accordion-separator`

#### Calendar:

Renamed:
- `calendar-header-title-font-size` -> `calendar-header-title-text-font-size`
- `calendar-header-title-font-weight` -> `calendar-header-title-text-font-weight`
- `calendar-header-sub-title-font-size` -> `calendar-header-sub-title-text-font-size`
- `calendar-header-sub-title-font-weight` -> `calendar-header-sub-title-text-font-weight`
- `calendar-selected-item-bg` -> `calendar-cell-selected-background-color`
- `calendar-hover-item-bg` -> `calendar-cell-hover-background-color`
- `calendar-today-item-bg` -> `calendar-cell-today-background-color`
- `calendar-active-item-bg` -> `calendar-cell-active-background-color`
- `calendar-fg` -> `calendar-text-color`
- `calendar-selected-fg` -> `calendar-cell-selected-text-color`
- `calendar-today-fg` -> `calendar-cell-today-text-color`
- `calendar-weekday-font-size` -> `calendar-weekday-text-font-size`
- `calendar-weekday-font-weight` -> `calendar-weekday-text-font-weight`
- `calendar-weekday-fg` -> `calendar-weekday-text-color`
- `calendar-weekday-holiday-fg` -> `calendar-weekday-holiday-text-color`
- `calendar-range-bg-in-range` -> `calendar-in-range-background-color`

Removed:
- `calendar-inactive-opacity`
- `calendar-disabled-opacity`

#### Sidebar:

Renamed:
- `sidebar-fg` -> `sidebar-text-color`
- `sidebar-bg` -> `sidebar-background-color`

#### Datepicker:

Renamed:
- `datepicker-fg` -> `datepicker-text-color`
- `datepicker-bg` -> `datepicker-background-color`
- `datepicker-border` -> `datepicker-border-color`
- `datepicker-border-radius` -> `datepicker-border-radius`

#### Layout:

Renamed:
- `header-font-family` -> `header-text-font-family`
- `header-font-size` -> `header-text-font-size`
- `header-line-height` -> `header-text-line-height`
- `header-fg` -> `header-text-color`
- `header-bg` -> `header-background-color`
- `layout-font-family` -> `layout-text-font-family`
- `layout-font-size` -> `layout-text-font-size`
- `layout-line-height` -> `layout-text-line-height`
- `layout-fg` -> `layout-text-color`
- `layout-bg` -> `layout-background-color`
- `layout-window-mode-bg` -> `layout-window-mode-background-color`
- `footer-fg` -> `footer-text-color`
- `footer-fg-highlight` -> `footer-text-highlight-color`
- `footer-bg` -> `footer-background-color`
- `footer-separator` -> `footer-divider-color`

#### Action:

Renamed:
- `actions-font-size` -> `actions-[size]-text-font-size`
- `actions-font-family` -> `actions-text-font-family`
- `actions-line-height` -> `actions-text-line-height`
- `actions-fg` -> `actions-text-color`
- `actions-bg` -> `actions-background-color`
- `actions-separator` -> `actions-divider-color`
- `actions-padding` -> `actions-[size]-padding`
- `actions-size-small` -> `actions-small-height`
- `actions-size-medium` -> `actions-medium-height`
- `actions-size-large` -> `actions-large-height`

#### Stepper:

Renamed:
- `stepper-index-size` -> `stepper-step-index-width`
- `stepper-label-font-size` -> `stepper-step-text-font-size`
- `stepper-label-font-weight` -> `stepper-step-text-font-weight`
- `stepper-completed-fg` -> `stepper-step-completed-text-color`
- `stepper-fg` -> `stepper-step-text-color`
- `stepper-step-padding` -> `stepper-step-content-padding`

Removed:
- `stepper-accent-color`
- `stepper-completed-icon-size`
- `stepper-completed-icon-weight`

#### Alert:

Renamed:
- `alert-font-size` -> `alert-text-font-size`
- `alert-line-height` -> `alert-text-line-height`
- `alert-font-weight` -> `alert-text-font-weight`
- `alert-fg` -> `alert-text-color`
- `alert-bg` -> `alert-background-color`
- `alert-disabled-bg` -> `alert-disabled-background-color`
- `alert-disabled-fg` -> `alert-disabled-text-color`
- `alert-primary-bg` -> `alert-primary-background-color`
- `alert-info-bg` -> `alert-info-background-color`
- `alert-success-bg` -> `alert-success-background-color`
- `alert-warning-bg` -> `alert-warning-background-color`
- `alert-danger-bg` -> `alert-danger-background-color`
- `alert-height-xsmall` -> `alert-tiny-height`
- `alert-height-small` -> `alert-small-height`
- `alert-height-medium` -> `alert-medium-height`
- `alert-height-large` -> `alert-medium-padding`
- `alert-height-xlarge` -> `alert-large-height`
- `alert-closable-padding` -> `alert-closable-start-padding`
- `alert-margin` -> `alert-bottom-margin`

Removed:
- `alert-outline-fg`
- `alert-active-bg`
- `alert-height-xxsmall`
- `alert-height-xxlarge`
- `alert-button-padding`

#### Badge:

Renamed:
- `badge-fg-text` -> `badge-[status]-text-color`
- `badge-primary-bg-color` -> `badge-primary-background-color`
- `badge-success-bg-color` -> `badge-success-background-color`
- `badge-info-bg-color` -> `badge-info-background-color`
- `badge-warning-bg-color` -> `badge-warning-background-color`
- `badge-danger-bg-color` -> `badge-danger-background-color`

#### Tree-grid:

Renamed:
- `tree-grid-header-bg` -> `tree-grid-header-background`
- `tree-grid-footer-bg` -> `tree-grid-footer-background`
- `tree-grid-row-bg` -> `tree-grid-row-background`
- `tree-grid-row-bg-even` -> `tree-grid-row-even-background`
- `tree-grid-row-hover-bg` -> `tree-grid-row-hover-background`


Removed:
- `tree-grid-sort-header-button-font-weight`
- `tree-grid-sort-header-button-color`
- `tree-grid-icon-color`

#### Select:

Renamed:
- `select-border-width` -> `select-[appearance]-border-width`
- `select-max-height` -> `select-options-list-max-height`
- `select-bg` -> `select-[appearance]-background-color`
- `select-option-disabled-bg` -> `select-option-[appearance]-disabled-background-color`
- `select-option-padding` -> `select-option-[appearance]-[size]-padding`

Removed:
- `select-checkmark-color`
- `select-checkbox-color`
- `select-option-disabled-opacity`

#### Chat:

Removed:
- `chat-font-size` -> `chat-text-font-size`
- `chat-fg` -> `chat-text-color`
- `chat-bg` -> `chat-background-color`
- `chat-height-xsmall` -> `chat-tiny-height`
- `chat-height-small` -> `chat-small-height`
- `chat-height-medium` -> `chat-medium-height`
- `chat-height-large` -> `chat-large-height`
- `chat-height-xlarge` -> `chat-giant-height`
- `chat-separator` -> `chat-divider-color`
- `chat-message-fg` -> `chat-message-text-color`
- `chat-message-bg` -> `chat-message-background`
- `chat-message-reply-bg` -> `chat-message-reply-background-color`
- `chat-message-reply-fg` -> `chat-message-reply-text-color`
- `chat-message-avatar-bg` -> `chat-message-avatar-background-color`
- `chat-message-sender-fg` -> `chat-message-sender-text-color`
- `chat-message-quote-fg` -> `chat-message-quote-background-color`
- `chat-message-quote-bg` -> `chat-message-quote-text-color`
- `chat-message-file-fg` -> `chat-message-file-text-color`
- `chat-message-file-bg` -> `chat-message-file-background-color`
- `chat-primary-bg` -> `chat-primary-background-color`
- `chat-success-bg` -> `chat-success-background-color`
- `chat-info-bg` -> `chat-info-background-color`
- `chat-warning-bg` -> `chat-warning-background-color`
- `chat-danger-bg` -> `chat-danger-background-color`

Removed:
- `chat-fg-text`
- `chat-height-xxsmall`
- `chat-height-xxlarge`
- `chat-form-bg`
- `chat-form-fg`
- `chat-form-border`
- `chat-form-placeholder-fg`
- `chat-form-active-border`
- `chat-disabled-bg`
- `chat-disabled-fg`
- `chat-active-bg`


#### Toastr:

Renamed:
- `toastr-bg` -> `toastr-background`
- `toastr-fg` -> `toastr-text-color`
- `toastr-border` -> `toastr-border-style`, `toastr-border-width`

`toastr-icon-radius` removed.

#### Search:

Renamed:
- `search-bg` -> `search-background-color`
- `search-bg-secondary` -> `search-extra-background-color`
- `search-text` -> `search-text-color`
- `search-info` -> `search-info-text-color`
- `search-dash` -> `search-divider-color`
- `search-placeholder` -> `search-placeholder-text-color`

Removed:
- `search-btn-open-fg`
- `search-btn-close-fg`

#### Menu:

Removed:
- `menu-font-family` -> `menu-text-font-family`
- `menu-font-size` -> `menu-text-font-size`
- `menu-font-weight` -> `menu-text-font-weight`
- `menu-fg` -> `menu-text-color`
- `menu-bg` -> `menu-background-color`
- `menu-active-fg` -> `menu-item-active-text-color`
- `menu-active-bg` -> `menu-item-active-background-color`
- `menu-submenu-bg` -> `menu-submenu-background-color`
- `menu-submenu-fg` -> `menu-submenu-text-color`
- `menu-submenu-active-fg` -> `menu-submenu-item-active-text-color`
- `menu-submenu-active-bg` -> `menu-submenu-item-active-background-color`
- `menu-submenu-active-border-color` -> `menu-submenu-item-active-border-color`
- `menu-submenu-hover-fg` -> `menu-item-hover-text-color`
- `menu-submenu-hover-bg` -> `menu-item-hover-background-color`
- `menu-group-fg` -> `menu-group-text-color`
- `menu-item-separator` -> `menu-item-divider-color`
- `menu-icon-font-size` -> `menu-item-icon-width`
- `menu-icon-margin` -> `menu-item-icon-margin`
- `menu-icon-color` -> `menu-item-icon-color`
- `menu-icon-active-color` -> `menu-item-icon-active-color`


Removed:
- `menu-submenu-active-shadow`
- `menu-active-font-weight`
- `menu-submenu-item-container-padding`
- `menu-group-font-weight`
- `menu-group-font-size`
- `menu-group-padding`

#### Context menu:

Removed:
- `context-menu-fg`
- `context-menu-bg`
- `context-menu-active-fg`
- `context-menu-active-bg`
- `context-menu-arrow-size`

#### Popover:

Renamed:
- `popover-fg` -> `popover-text-color`
- `popover-bg` -> `popover-background-color`
- `popover-border` -> `popover-border-color`                                                                                                                                                                                                                                 	| `outline-width`, `outline-color`                                                                                                                                                                                                        	| Elements outline styles.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      	|


[Back to migration guide](https://akveo.github.io/nebular/docs/migration/350400-migration).
