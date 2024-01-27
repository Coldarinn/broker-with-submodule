import { customFetch } from "@/modules/fetch";
import { Data2 } from "@/screens/Home";
import { Select } from "~/Select";
import React from "react";

type Props = {
  item: Data2;
};

const options = [
  { value: "review", name: "Рассмотрение" },
  { value: "cancelled", name: "Отказ" },
];

export const TableStatusSelect = ({ item }: Props) => {
  const [selected, setSelected] = React.useState<(typeof options)[number]>(
    item.status === "review" ? options[0] : options[1]
  );

  const onSelect = async (option: (typeof options)[number]) => {
    if (option.value !== selected.value) {
      const body = {
        ownerName: item.ownerName,
        location: item.location,
        address: item.address,
        area: item.area,
        price: `${+item.price}`,
        cadastreNumber: item.cadastreNumber,
        description: item.description,
        status: option.value,
      };

      await customFetch(`/landplot/${item.id}`, {
        method: "PATCH",
        body: body as any,
      });

      setSelected(option);
    }
  };

  return <Select value={selected} options={options} onChange={onSelect} />;
};
