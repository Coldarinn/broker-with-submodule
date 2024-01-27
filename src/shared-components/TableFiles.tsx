import React from "react";
import styled from "@emotion/styled";
import { Button, ButtonNormalized } from "~/Button";
import { Tooltip } from "~/Tooltip";
import PlusIcon from "@/assets/images/icons/plus.svg";
import DownloadIcon from "@/assets/images/icons/download.svg";
import { Modal } from "./Modal";
import { AddFiles } from "./AddFiles";
import { customFetch } from "@/modules/fetch.ts";

type Props = {
  id: string;
  filesLength: number;
};

export const TableFiles = ({ id, filesLength }: Props) => {
  const [filesCount, setFilesCount] = React.useState(filesLength);
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const increaseFiles = (count: number) => {
    setFilesCount(filesCount + count);
  };

  return (
    <>
      <Files>
        <Tooltip
          content="Скачать архив с файлами"
          placement="top-end"
          withArrow
        >
          {() => (
            <DownloadButton onClick={onDownload(id)}>
              <DownloadIcon width={24} height={24} />
              <DownloadCount>{filesCount}</DownloadCount>
            </DownloadButton>
          )}
        </Tooltip>

        <Tooltip content="Добавить файлы" placement="top-end" withArrow>
          {() => (
            <AddButton color="secondary" onClick={() => setIsOpenModal(true)}>
              <PlusIcon width={20} height={20} />
            </AddButton>
          )}
        </Tooltip>
      </Files>

      <Modal isVisible={isOpenModal} onRequestClose={closeModal}>
        <AddFiles id={id} onClose={closeModal} increaseFiles={increaseFiles} />
      </Modal>
    </>
  );
};

const onDownload = (id: string) => () => {
  customFetch(`/landplot/${id}/files`).then(async (res) => {
    const url = URL.createObjectURL(await res.blob());
    const link = document.createElement("a");
    try {
      link.href = url;
      link.download =
        res.headers
          .get("Content-Disposition")
          ?.split('filename="')[1]
          ?.split('"')?.[0] ?? "files.zip";
      document.body.append(link);
      link.click();
    } finally {
      link.remove();
    }
  });
};

const Files = styled.div`
  display: flex;
  justify-content: space-between;
`;
const DownloadButton = styled(ButtonNormalized)`
  width: 48px;
  height: 48px;

  position: relative;

  color: #fff;
  border-radius: 12px;
  background: #1f1f1f;

  transition: 0.2s;

  &:hover {
    color: #ff8a25;
  }
`;
const DownloadCount = styled.span`
  padding: 0 2px;

  position: absolute;
  right: 0;
  top: 0;

  border-radius: 5px;
  background: radial-gradient(
    1166.16% 151.98% at -5.84% 106.58%,
    #ac400f 0%,
    #dd7921 100%
  );

  color: #fff;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0.72px;
`;
const AddButton = styled(Button)`
  padding: 14px;

  color: #fff;
`;
