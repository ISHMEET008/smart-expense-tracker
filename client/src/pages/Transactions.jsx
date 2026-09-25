import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

function Transactions() {
  return (
    <div className="flex bg-slate-950 min-h-screen">
      
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">

          <div>
            <h1 className="text-white text-4xl font-bold">
              Transactions
            </h1>

            <p className="text-slate-400 mt-2">
              View and manage all your expenses in one place.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Transactions;