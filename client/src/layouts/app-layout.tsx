import Navbar from "@/components/navbar";
import { Outlet } from "react-router-dom";
import EditTransactionDrawer from "@/components/transaction/edit-transaction-drawer";
// import Footer from "@/components/footer";

const AppLayout = () => {
  return (
    <>
    <div className="min-h-screen pb-10">
      <Navbar />
      <main className="w-full max-w-full">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
    <EditTransactionDrawer />
    </>
  );
};

export default AppLayout;
