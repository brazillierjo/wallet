import OperationsTable from "@/components/Table/OperationTable";
import { OperationType } from "@/utils/enums/operationType";

const Dashboard = () => {
  return (
    <main className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2">
      <div className="flex flex-col gap-4">
        <OperationsTable operationType={OperationType.INCOMES} />
        <OperationsTable operationType={OperationType.EXPENSES} />
      </div>
    </main>
  );
};

export default Dashboard;
