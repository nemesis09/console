import * as React from 'react';
import { observer, Node } from '@patternfly/react-topology';
import { pipelineRunFilterReducer } from '../../../utils/pipeline-filter-reducer';
import { PipelineVisualizationTask } from '../detail-page-tabs/pipeline-details/PipelineVisualizationTask';
import {
  NODE_WIDTH,
  NODE_HEIGHT,
  FINALLY_NODE_PADDING,
  FINALLY_NODE_VERTICAL_SPACING,
} from './const';
import { getFinallyTaskHeight } from './utils';

const FinallyNode: React.FC<{ element: Node }> = ({ element }) => {
  const { task, pipeline, pipelineRun } = element.getData();
  const { finallyTasks = [], finallyListTasks = [] } = task;
  const allTasksLength = finallyTasks.length + finallyListTasks.length;
  return (
    <>
      <rect
        fill="transparent"
        strokeWidth={1}
        stroke="var(--pf-global--BorderColor--light-100)"
        width={NODE_WIDTH + FINALLY_NODE_PADDING * 2}
        height={getFinallyTaskHeight(allTasksLength, true)}
        rx="20"
        ry="20"
      />
      {finallyTasks.map((ft, i) => (
        <g
          key={ft.name}
          transform={`translate(${FINALLY_NODE_PADDING}, ${NODE_HEIGHT * i +
            FINALLY_NODE_VERTICAL_SPACING * i +
            FINALLY_NODE_PADDING})`}
        >
          <PipelineVisualizationTask
            pipelineRunName={pipelineRun?.metadata?.name}
            task={ft}
            pipelineRunStatus={pipelineRun && pipelineRunFilterReducer(pipelineRun)}
            namespace={pipeline?.metadata?.namespace}
            disableTooltip={false}
            selected={ft.selected}
            width={NODE_WIDTH}
            height={NODE_HEIGHT}
            isFinallyTask
          />
        </g>
      ))}
    </>
  );
};

export default observer(FinallyNode);
