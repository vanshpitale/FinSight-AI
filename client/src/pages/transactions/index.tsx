import {
  Card,
  CardContent,
} from "@/components/ui/card";
import PageLayout from "@/components/page-layout";
import AddTransactionDrawer from "@/components/transaction/add-transaction-drawer";
import TransactionTable from "@/components/transaction/transaction-table";
import ImportTransactionModal from "@/components/transaction/import-transaction-modal";

export default function Transactions() {

  return (
    <PageLayout
      title="All Transactions"
      subtitle="Showing all transactions"
      addMarginTop
      rightAction={
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
          <ImportTransactionModal />
          <AddTransactionDrawer />
        </div>
      }
    >
      <Card className="border-0 shadow-none mt-20">
        <CardContent className="pt-2">
          <TransactionTable pageSize={20} />
        </CardContent>
      </Card>
    </PageLayout>
  );
}
