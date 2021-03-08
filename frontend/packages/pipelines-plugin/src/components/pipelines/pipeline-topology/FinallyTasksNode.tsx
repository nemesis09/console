import * as React from 'react';
// import * as cx from 'classnames';
import { observer, Node, NodeModel, useHover, createSvgIdUrl } from '@patternfly/react-topology';
// import { SvgDropShadowFilter } from '@console/topology/src/components/svg';
import { pipelineRunFilterReducer } from '../../../utils/pipeline-filter-reducer';
import { PipelineVisualizationTask } from '../detail-page-tabs/pipeline-details/PipelineVisualizationTask';
import { FinallyNodeModelData } from './types';
import '../detail-page-tabs/pipeline-details/PipelineVisualizationTask.scss';

type FinallyTaskNodeProps = {
  element: Node<NodeModel, FinallyNodeModelData>;
  disableTooltip?: boolean;
};

const FinallyTaskNode: React.FC<FinallyTaskNodeProps> = ({ element, disableTooltip }) => {
  // console.log('### in finally tasks node', element);
  const elements = element.getData().task?.finallyTasks;

  const FILTER_ID = 'SvgTaskDropShadowFilterIdFinally';

  const [hover, hoverRef] = useHover();

  return (
    <g ref={hoverRef}>
      {/* <SvgDropShadowFilter dy={1} id={FILTER_ID} /> */}
      <rect
        filter={hover ? createSvgIdUrl(FILTER_ID) : ''}
        width={150}
        height={100}
        x={-15}
        y={-35}
        rx={5}
        style={{ fill: 'none', stroke: 'black', strokeOpacity: 1 }}
      />
      {elements.map((el) => {
        // console.log('### inside finally elements array', el);
        const { height, width } = element.getBounds();
        const { pipeline, pipelineRun, selected } = element.getData();
        return (
          <PipelineVisualizationTask
            pipelineRunName={pipelineRun?.metadata?.name}
            task={el}
            pipelineRunStatus={pipelineRun && pipelineRunFilterReducer(pipelineRun)}
            namespace={pipeline?.metadata?.namespace}
            disableTooltip={disableTooltip}
            selected={selected}
            width={width}
            height={height}
          />
        );
      })}
    </g>
  );
};

export default observer(FinallyTaskNode);
