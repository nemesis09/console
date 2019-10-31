import * as React from 'react';
import { Formik } from 'formik';
import {
  ModalTitle,
  ModalBody,
  ModalSubmitFooter,
  createModalLauncher,
  ModalComponentProps,
} from '@console/internal/components/factory/modal';
import { TextInputTypes } from '@patternfly/react-core';
import {
  MultiColumnField,
  InputField,
  DropdownField,
} from '@console/dev-console/src/components/formik-fields';

export interface TrafficSplittingModalProps {
  save?: () => void;
  revisions: object;
  inprogress: boolean;
  errorMessage?: string;
}

type props = TrafficSplittingModalProps & ModalComponentProps;

const TrafficSplittingModal: React.FC<props> = ({ close, save, revisions, inprogress }) => {
  const handleSave = () => {
    close();
    save();
  };
  return (
    <form className="modal-content" onSubmit={handleSave}>
      <ModalTitle>Set traffic distrubution</ModalTitle>
      <ModalBody>
        <p>Set traffic distribution for the Revisions of the Knative Service</p>
        <Formik initialValues={revisions} onSubmit={() => {}}>
          <MultiColumnField
            name="traffic-splitting"
            addLabel="Add Revision"
            headers={['Split', 'Revision']}
            emptyValues={{ split: '', revision: '' }}
          >
            <InputField name="split" type={TextInputTypes.number} placeholder="100" />
            <DropdownField name="revision" items={revisions} title="select a revision" fullWidth />
          </MultiColumnField>
        </Formik>
      </ModalBody>
      <ModalSubmitFooter inProgress={inprogress} submitText="Save" cancel={close} />
    </form>
  );
};

export const trafficModalLauncher = createModalLauncher<props>(TrafficSplittingModal);

export default TrafficSplittingModal;
