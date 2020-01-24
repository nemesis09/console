import * as React from 'react';
import { ContextMenuItem, ContextSubMenuItem, GraphElement, Node, Graph } from '@console/topology';
import {
  history,
  KebabItem,
  KebabOption,
  KebabMenuOption,
  kebabOptionsToMenu,
  isKebabSubMenu,
} from '@console/internal/components/utils';
import { workloadActions } from './actions/workloadActions';
import { groupActions } from './actions/groupActions';
import { nodeActions } from './actions/nodeActions';
import { graphActions } from './actions/graphActions';
import { TopologyApplicationObject } from './topology-types';

const onKebabOptionClick = (option: KebabOption) => {
  if (option.callback) {
    option.callback();
  }
  if (option.href) {
    history.push(option.href);
  }
};

export const createMenuItems = (actions: KebabMenuOption[], onOptionClick?) => {
  console.log(actions);
  return actions.map((option) =>
    onOptionClick ? (
      <ContextMenuItem
        key={option.label}
        component={<KebabItem option={option} onClick={() => onOptionClick(option)} />}
      />
    ) : isKebabSubMenu(option) ? (
      <ContextSubMenuItem label={option.label} key={option.label}>
        {createMenuItems(option.children)}
      </ContextSubMenuItem>
    ) : (
      <ContextMenuItem
        key={option.label}
        component={<KebabItem option={option} onClick={() => onKebabOptionClick(option)} />}
      />
    ),
  );
};
export const workloadContextMenu = (element: Node) =>
  createMenuItems(kebabOptionsToMenu(workloadActions(element.getData())));

export const groupContextMenu = (element: Node) => {
  const applicationData: TopologyApplicationObject = {
    id: element.getId(),
    name: element.getLabel(),
    resources: element.getChildren().map((node: GraphElement) => node.getData()),
  };

  return createMenuItems(kebabOptionsToMenu(groupActions(applicationData)));
};
export const nodeContextMenu = (element: Node) =>
  createMenuItems(kebabOptionsToMenu(nodeActions(element.getData())));

export const graphContextMenu = (element: Graph) =>
  createMenuItems(kebabOptionsToMenu(graphActions(element.getController().getElements())));
