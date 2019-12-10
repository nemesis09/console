import * as React from 'react';
import { Toolbar, ToolbarGroup, ToolbarItem } from '@patternfly/react-core';
import './TopologyFilterBar.scss';
import { RootState } from '@console/internal/redux';
import { getTopologyFilters } from '@console/internal/reducers/ui';
import { connect, Dispatch } from 'react-redux';
import { setTopologyFilters } from '@console/internal/actions/ui';
import FilterDropdown from './FilterDropdown';
import { TopologyFilters, DisplayFilters } from './filter-utils';

type StateProps = {
  filters: TopologyFilters;
};

type DispatchProps = {
  onFilterChange: (filter: TopologyFilters) => void;
};

type TopologyFilterBarProps = StateProps & DispatchProps;

const TopologyFilterBar: React.FC<TopologyFilterBarProps> = ({ filters, onFilterChange }) => {
  const onDisplayFilterChange = (displayFilters: DisplayFilters): void => {
    const newFilters = { ...filters };
    newFilters.display = displayFilters;
    onFilterChange(newFilters);
  };
  return (
    <Toolbar className="co-namespace-bar odc-toplogy-filter-bar">
      <ToolbarGroup>
        <ToolbarItem className="odc-toplogy-filter-bar-item">
          <FilterDropdown filters={filters.display} onChange={onDisplayFilterChange} />
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  filters: getTopologyFilters(state),
});

const dispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onFilterChange: (filters: TopologyFilters) => {
    dispatch(setTopologyFilters(filters));
  },
});

export default connect(
  mapStateToProps,
  dispatchToProps,
)(TopologyFilterBar);
