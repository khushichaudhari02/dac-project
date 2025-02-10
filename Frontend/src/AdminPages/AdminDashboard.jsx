import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Pie } from "react-chartjs-2";
import AdminNavbar from "../components/NavBars/AdminNavbar";
import { FaBuilding, FaBox, FaUsers } from "react-icons/fa";

// Register Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const chartData = {
    labels: ["Item Accepted by Courier", "Collected", "Shipped", "In-Transit", "Out of Delivery"],
    datasets: [
      {
        data: [28, 25, 39, 49, 64],
        backgroundColor: ["blue", "orange", "green", "purple", "red"],
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="flex-1 p-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-3 gap-6 mt-4">
          <div className="bg-pink-500 text-black p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaBuilding className="text-3xl mb-2" />
            <h3 className="text-lg">Total Branches</h3>
            <p className="text-3xl font-bold">7</p>
          </div>
          <div className="bg-green-500 text-black p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaBox className="text-3xl mb-2" />
            <h3 className="text-lg">Total Parcels</h3>
            <p className="text-3xl font-bold">13</p>
          </div>
          <div className="bg-blue-500 text-black p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaUsers className="text-3xl mb-2" />
            <h3 className="text-lg">Total Staff</h3>
            <p className="text-3xl font-bold">4</p>
          </div>
        </div>

        {/* Table + Chart */}
        <div className="flex flex-wrap mt-6 gap-6">
          {/* Status Table */}
          <div className="w-full lg:w-1/2 bg-white shadow-md p-6 rounded-lg overflow-x-auto">
            <h3 className="font-bold text-lg mb-4">Parcel Status</h3>
            <table className="w-full border border-gray-300 text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-3">Sr.No</th>
                  <th className="border p-3">Status</th>
                  <th className="border p-3">Count</th>
                </tr>
              </thead>
              <tbody>
                {["Item Accepted by Courier", "Collected", "Shipped", "In-Transit", "Out of Delivery"].map((status, index) => (
                  <tr key={index} className="odd:bg-gray-100">
                    <td className="border p-3">{index + 1}</td>
                    <td className="border p-3">{status}</td>
                    <td className="border p-3">{chartData.datasets[0].data[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pie Chart */}
          {/* <div className="rounded-lg">
            <h3 className="font-bold">Daily Activities</h3>
            <Pie data={chartData} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
