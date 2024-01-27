import React from "react";
import styled from "@emotion/styled";
import { Layout } from "@/shared-components/Layout";
import { Pagination, usePaginationQuery } from "~/Pagination";
import { Table, ColumnType } from "../shared-components/Table";
import { Button, ButtonNormalized } from "~/Button";
import PlusIcon from "@/assets/images/icons/plus.svg";
import DownloadIcon from "@/assets/images/icons/download.svg";
import { Tooltip } from "~/Tooltip";
import { Modal } from "@/shared-components/Modal";
import { CreateObject } from "@/shared-components/CreateObject";
import { TableStatusSelect } from "@/shared-components/TableStatusSelect";
import { TableFiles } from "@/shared-components/TableFiles";
import { customFetch } from "@/modules/fetch";
import { useUser } from "@/modules/user";
import { formatPhoneNumber } from "@/modules/utils/formatPhoneNumber";

const limit = 4;

export const Home: React.FC = () => {
  const { state } = useUser();

  const isAdmin = state.role === "app_admin";

  const [page, setPage] = usePaginationQuery();

  const [pageCount, setPageCount] = React.useState(1);
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const [data, setData] = React.useState([]);

  const onPageChange = async (page: number) => {
    setPage(page);
    getLandplots(page);
  };

  const getLandplots = async (newPage: number = 1) => {
    const data = await customFetch(
      `/landplot?limit=${limit}&offset=${(newPage - 1) * limit}`
    ).then((x) => x.json());
    setData(data.rows);
    setPageCount(Math.ceil(data.total / limit));
  };

  React.useEffect(() => {
    getLandplots();
  }, []);

  return (
    <Layout>
      <Wrapper>
        <Header>
          <Title>Мои объекты</Title>
          {isAdmin ? (
            <ExceldButton color="secondary" onClick={onDownload}>
              <DownloadIcon width={20} height={20} />
              <span>выгрузить в excel</span>
            </ExceldButton>
          ) : (
            <Button onClick={() => setIsOpenModal(true)}>
              <PlusIcon width={20} height={20} />
              <span>ПРЕДЛОЖИТЬ ОБЪЕКТ</span>
            </Button>
          )}
        </Header>

        {isAdmin ? (
          <Table data={data} columns={columns2} colGap={8} />
        ) : (
          <Table data={data} columns={columns} />
        )}

        {pageCount > 1 && (
          <Pagination
            currentPage={page}
            pageCount={pageCount}
            key={1}
            onPageChange={(page) => onPageChange(page)}
          />
        )}
      </Wrapper>

      <Modal isVisible={isOpenModal} onRequestClose={closeModal}>
        <CreateObject onClose={closeModal} getLandplots={getLandplots} />
      </Modal>
    </Layout>
  );
};

const onDownload = () => {
  customFetch("/landplot/excel").then(async (res) => {
    const url = URL.createObjectURL(await res.blob());
    const link = document.createElement("a");
    try {
      link.href = url;
      link.download =
        res.headers
          .get("Content-Disposition")
          ?.split('filename="')[1]
          ?.split('"')?.[0] ?? "landplots.xlsx";
      document.body.append(link);
      link.click();
    } finally {
      link.remove();
    }
  });
};

type Data = {
  id: string;
  location: string;
  address: string;
  area: string;
  price: string;
  cadastreNumber: string;
  description: string;
  ownerName: string;
  responsible: {
    name: string;
    email: string;
    phone: string;
  };
  status: "cancelled" | "review";
  createdAt: string;
  files: string;
};

const columns: ColumnType<Data>[] = [
  {
    key: "id",
    title: "ID",
    width: 42,
  },
  {
    key: "location",
    title: "расположение",
    width: 126,
  },
  {
    key: "address",
    title: "адрес",
    width: 156,
  },
  {
    key: "area",
    title: "площадь",
    width: 106,
  },
  {
    key: "price",
    title: "цена",
    width: 155,
  },
  {
    key: "cadastreNumber",
    title: "кадастровые номера",
    width: 181,
  },
  {
    key: "description",
    title: "описание",
    width: 236,
  },
  {
    key: "ownerName",
    title: "собственник",
    width: 216,
  },
  {
    key: "responsible",
    title: "отвественный",
    width: 216,
    render: (_, item) => (
      <Responsible>
        <span>{item.responsible.name}</span>

        <Info>
          <Mail>{item.responsible.email}</Mail>
          <Phone>{formatPhoneNumber(item.responsible.phone)}</Phone>
        </Info>
      </Responsible>
    ),
  },
  {
    key: "status",
    title: "статус",
    width: 133,
    render: (_, item) => (
      <Status status={item.status}>
        {item.status === "review" ? "Ревью" : "Отказ"}
      </Status>
    ),
  },
  {
    key: "createdAt",
    title: "дата создания",
    width: 120,
    render: (_, item) => (
      <div>{item.createdAt.split("T")[0].split("-").reverse().join(".")}</div>
    ),
  },
  {
    key: "files",
    title: "файлы",
    width: 122,
    render: (_, item) => (
      <TableFiles id={item.id} filesLength={item.files.length} />
    ),
  },
];

export type Data2 = Data & {
  owner: { name: string };
};

const columns2: ColumnType<Data2>[] = [
  {
    key: "id",
    title: "ID",
    width: 32,
  },
  {
    key: "location",
    title: "расположение",
    width: 106,
  },
  {
    key: "address",
    title: "адрес",
    width: 136,
  },
  {
    key: "area",
    title: "площадь",
    width: 86,
  },
  {
    key: "price",
    title: "цена",
    width: 135,
  },
  {
    key: "cadastreNumber",
    title: "кадастровые номера",
    width: 161,
  },
  {
    key: "description",
    title: "описание",
    width: 216,
  },
  {
    key: "ownerName",
    title: "собственник",
    width: 196,
  },
  {
    key: "responsible",
    title: "отвественный",
    width: 196,
    render: (_, item) => (
      <Responsible>
        <span>{item.responsible.name}</span>

        {item.responsible.name !== item.owner.name && (
          <Info>
            <Mail>{item.responsible.email}</Mail>
            <Phone>{formatPhoneNumber(item.responsible.phone)}</Phone>
          </Info>
        )}
      </Responsible>
    ),
  },
  {
    key: "source",
    title: "Источник",
    width: 196,
    render: (_, item) => <div>{item.owner.name}</div>,
  },
  {
    key: "status",
    title: "статус",
    width: 183,
    render: (_, item) => <TableStatusSelect item={item} />,
  },
  {
    key: "createdAt",
    title: "дата создания",
    width: 100,
    render: (_, item) => (
      <div>{item.createdAt.split("T")[0].split("-").reverse().join(".")}</div>
    ),
  },
  {
    key: "files",
    title: "файлы",
    width: 56,
    render: (_, item) => (
      <Tooltip content="Скачать архив с файлами" placement="top-end" withArrow>
        {() => (
          <DownloadButton onClick={onDownload1(item.id)}>
            <DownloadIcon width={24} height={24} />
            <DownloadCount>{item.files.length}</DownloadCount>
          </DownloadButton>
        )}
      </Tooltip>
    ),
  },
];

const onDownload1 = (id: string) => () => {
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

const Wrapper = styled.div`
  padding: 24px 30px;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.div`
  color: #fff;
  font-size: 32px;
  line-height: 150%;
`;
const ExceldButton = styled(Button)`
  padding: 14px 32px 14px 36px;
  text-transform: uppercase;
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
const Status = styled.div<Pick<Data, "status">>`
  ${({ status }) =>
    status === "cancelled" ? "background: #E64242;" : "background: #FF8A25;"}
  padding: 0 6px;

  font-size: 14px;
  border-radius: 100px;
  color: #fff;
  line-height: 20px;
`;
const Responsible = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
const Info = styled.div`
  padding: 4px 0;

  text-align: center;
  border-radius: 8px;
  background: #1f1f1f;
`;
const Mail = styled(ButtonNormalized)`
  margin-bottom: 4px;

  color: #ff8a25;
  font-size: 14px;
  line-height: 150%;
  text-decoration-line: underline;
`;
const Phone = styled(ButtonNormalized)`
  color: #fff;
  font-size: 14px;
  line-height: 150%;
`;
