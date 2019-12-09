import * as React from 'react';
import { Toolbar, ToolbarGroup, ToolbarItem } from '@patternfly/react-core';
import './TopologyFilterBar.scss';
import FilterDropdown from './FilterDropdown';
import { RootState } from '@console/internal/redux';
import { getTopologyDisplayFilters } from '@console/internal/reducers/ui';
import { connect, Dispatch } from 'react-redux';
import { setTopologyDisplayFilters } from '@console/internal/actions/ui';

type TopologyFilters = any;

type StateProps = {
  filters: TopologyFilters;
};

type DispatchProps = {
  onFilterChange: (filter: TopologyFilters) => void;
};

type TopologyFilterBarProps = StateProps & DispatchProps;

const getDropdownFilterItems = (topologyFilters: TopologyFilters) => {
  if()
}

const TopologyFilterBar: React.FC<TopologyFilterBarProps> = ({ filters, onFilterChange }) => {
  const filterItems = getDropdownFilterItems(filters);
  return (
    <Toolbar className="co-namespace-bar odc-toplogy-filter-bar">
      <ToolbarGroup>
        <ToolbarItem className="odc-toplogy-filter-bar-item">
          <FilterDropdown items= />
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  filters: getTopologyDisplayFilters(state),
});

const dispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onFilterChange: (filters: TopologyFilters) => {
    dispatch(setTopologyDisplayFilters(filters));
  },
});

export default connect(
  mapStateToProps,
  dispatchToProps,
)(TopologyFilterBar);
