"use client";

import { FC } from "react";

import Table from "@/components/Table/Table";
import Card from "@/components/ui/Card";
import { deleteOperation, fetchOperations } from "@/utils/api/operations";
import { Operation } from "@/utils/interfaces/operation";
import { OperationType } from "@/utils/requestCheck";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Props {
  operationType: OperationType;
}

const OperationsTable: FC<Props> = ({ operationType }) => {
  const queryClient = useQueryClient();

  const {
    data: operations = [],
    isLoading,
    isError,
  } = useQuery<Operation[]>({
    queryKey: [operationType],
    queryFn: () => fetchOperations(operationType),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteOperation(operationType, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [operationType],
      });
    },
  });

  const handleDelete = async (operationId: number) => deleteMutation.mutate(operationId);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <div>Error fetching {operationType}</div>;

  return (
    <main className="flex flex-col">
      <Card>
        <Table operationType={operationType} tableData={operations} onDelete={handleDelete} />
      </Card>
    </main>
  );
};

export default OperationsTable;
