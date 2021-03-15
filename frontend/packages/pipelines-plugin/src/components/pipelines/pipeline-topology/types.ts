import { EdgeModel, NodeModel } from '@patternfly/react-topology';
import { PipelineKind, TaskKind, PipelineRunKind } from '../../../types';
import { PipelineVisualizationTaskItem } from '../../../utils/pipeline-utils';
import { AddNodeDirection, NodeType } from './const';

// Builder Callbacks
export type NewTaskListNodeCallback = (direction: AddNodeDirection) => void;
export type NewTaskNodeCallback = (resource: TaskKind) => void;
export type RemoveListTaskCallback = () => void;
export type NodeSelectionCallback = (nodeData: BuilderNodeModelData) => void;

// Node Data Models
export type PipelineRunAfterNodeModelData = {
  selected?: boolean;
  task: {
    name: string;
    runAfter?: string[];
  };
};

type finallyTask = {
  onTaskSelection?: () => void;
  error?: string;
  selected?: boolean;
  disableTooltip?: boolean;
};

export type FinallyNodeModalData = {
  selected?: boolean;
  task: {
    name: string;
    runAfter?: string[];
    isFinallyTask?: boolean;
    finallyTasks?: finallyTask[];
    finallyListTasks?: {
      convertList: (resource: TaskKind) => void;
      onRemoveTask: () => void;
    }[];
    addNewFinallyListNode?: (
      resource: TaskKind,
      name: string,
      listTask: string,
      runAfter?: string[],
    ) => void;
  };
};

export type FinallyTaskNodeModelData = FinallyNodeModalData & {
  isFinallyTask: boolean;
  clusterTaskList?: TaskKind[];
  namespaceTaskList?: TaskKind[];
  pipeline?: PipelineKind;
  pipelineRun?: PipelineRunKind;
};

export type TaskListNodeModelData = PipelineRunAfterNodeModelData & {
  clusterTaskList: TaskKind[];
  namespaceTaskList: TaskKind[];
  onNewTask: NewTaskNodeCallback;
  onRemoveTask: RemoveListTaskCallback | null;
};
export type BuilderNodeModelData = PipelineRunAfterNodeModelData & {
  error?: string;
  task: PipelineVisualizationTaskItem;
  onAddNode: NewTaskListNodeCallback;
  onNodeSelection: NodeSelectionCallback;
};
export type SpacerNodeModelData = PipelineRunAfterNodeModelData & {};
export type TaskNodeModelData = PipelineRunAfterNodeModelData & {
  task: PipelineVisualizationTaskItem;
  pipeline?: PipelineKind;
  pipelineRun?: PipelineRunKind;
};

// Graph Models
type PipelineNodeModel<D extends PipelineRunAfterNodeModelData> = NodeModel & {
  data: D;
  type: NodeType;
};
export type PipelineMixedNodeModel = PipelineNodeModel<PipelineRunAfterNodeModelData>;
export type PipelineTaskNodeModel = PipelineNodeModel<TaskNodeModelData>;
export type PipelineBuilderTaskNodeModel = PipelineNodeModel<BuilderNodeModelData>;
export type PipelineTaskListNodeModel = PipelineNodeModel<TaskListNodeModelData>;
export type PipelineFinallyNodeModel = PipelineNodeModel<FinallyTaskNodeModelData>;

export type PipelineEdgeModel = EdgeModel;

// Node Creators
export type NodeCreator<D extends PipelineRunAfterNodeModelData> = (
  name: string,
  data: D,
) => PipelineNodeModel<D>;
export type NodeCreatorSetup = (
  type: NodeType,
  width?: number,
  height?: number,
) => NodeCreator<PipelineRunAfterNodeModelData>;
