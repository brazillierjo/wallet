"use client";

import { FC } from "react";

import Table from "@/components/Table/Table";
import Card from "@/components/ui/Card";
import { OperationType } from "@/utils/enums/operationType";

interface Props {
  operationType: OperationType;
}

const OperationsTable: FC<Props> = ({ operationType }) => {
  return (
    <main className="flex flex-col">
      <Card>
        <Table operationType={operationType} tableData={[]} onDelete={() => console.log("onDelete")} />
      </Card>
    </main>
  );
};

export default OperationsTable;
