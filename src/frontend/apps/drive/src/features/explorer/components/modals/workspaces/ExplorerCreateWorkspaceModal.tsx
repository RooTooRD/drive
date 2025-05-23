import {
  Button,
  Modal,
  ModalProps,
  ModalSize,
} from "@openfun/cunningham-react";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { WorkspaceForm } from "./WorkspaceForm";
import { useMutationCreateWorskpace } from "@/features/explorer/hooks/useMutations";
import { useAddWorkspaceNode } from "@/features/explorer/components/tree/hooks/useAddTreeNode";

type Inputs = {
  title: string;
  description: string;
};

export const ExplorerCreateWorkspaceModal = (
  props: Pick<ModalProps, "isOpen" | "onClose">
) => {
  const { t } = useTranslation();
  const form = useForm<Inputs>();
  const createWorkspace = useMutationCreateWorskpace();

  const { addWorkspaceNode } = useAddWorkspaceNode();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    form.reset();
    createWorkspace.mutate(
      {
        ...data,
      },
      {
        onSuccess: (data) => {
          addWorkspaceNode(data);
          props.onClose();
        },
      }
    );
  };

  return (
    <Modal
      {...props}
      size={ModalSize.MEDIUM}
      title={t("explorer.workspaces.create.title")}
      rightActions={
        <>
          <Button color="secondary" onClick={props.onClose}>
            {t("explorer.workspaces.create.cancel")}
          </Button>
          <Button type="submit" form="workspace-form">
            {t("explorer.workspaces.create.submit")}
          </Button>
        </>
      }
    >
      <div className="clr-greyscale-600 fs-s m-0">
        {t("explorer.workspaces.create.description")}
      </div>
      <WorkspaceForm onSubmit={onSubmit} />
    </Modal>
  );
};
