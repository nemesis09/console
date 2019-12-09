import * as React from 'react';
import { Dropdown, DropdownToggle, DropdownItem, Checkbox } from '@patternfly/react-core';
import { CaretDownIcon } from '@patternfly/react-icons';

type FilterDropdownItem = {
  key: string;
  label: string;
  children?: string;
  checked: boolean;
};

type FilterDropdownProps = {
  items: FilterDropdownItem[];
};

const FilterDropdown: React.FC<FilterDropdownProps> = ({ items }) => {
  const [isOpen, setIsOpen] = React.useState();
  const onToggle = (open) => setIsOpen(open);

  const dropdownItems = items.map(({key, label, children, checked}) => (
    <DropdownItem key={key}>
      <Checkbox style={!!children ? {marginLeft: 15px} : undefined} label={label} id={key} isChecked={checked} />
    </DropdownItem>
  ));
  return (
    <Dropdown
      isOpen={isOpen}
      toggle={
        <DropdownToggle id="toggle-id" onToggle={onToggle} iconComponent={CaretDownIcon}>
          Display
        </DropdownToggle>
      }
      dropdownItems={[,]}
    />
  );
};

export default FilterDropdown;
