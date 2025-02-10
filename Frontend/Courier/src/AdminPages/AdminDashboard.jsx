import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/NavBars/AdminNavbar";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminDashboard = () => {
    const [data, setData] = useState({
        totalWarehouses: 0,
        totalOrders: 0,
        parcelStatus: {
            placed: 0,
            collected: 0,
            shipped: 0,
            inTransit: 0,
            outForDelivery: 0
        }
    });

    useEffect(() => {
        const storedData = sessionStorage.getItem("dashboardData");

        if (storedData) {
            setData(JSON.parse(storedData));
        } else {
            axios.get("http://localhost:3000/admin/home")
                .then(response => {
                    setData(response.data);
                    sessionStorage.setItem("dashboardData", JSON.stringify(response.data));
                })
                .catch(error => {
                    console.error("Error fetching dashboard data:", error);
                });
        }
    }, []);

    return (
      <div>
        <AdminNavbar />
        <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "20px" }}>

            {/* Top Two Cards */}
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow-lg p-4 mb-4 bg-white rounded text-center">
                        <h3 className="text-success fw-bold">🏭 Total Warehouses</h3>
                        <p className="display-5 fw-bold">{data.totalWarehouses}</p>
                    </div>
                </div>

                <div className="col-md-5">
                    <div className="card shadow-lg p-4 mb-4 bg-white rounded text-center">
                        <h3 className="text-info fw-bold">📦 Total Orders</h3>
                        <p className="display-5 fw-bold">{data.totalOrders}</p>
                    </div>
                </div>
            </div>

            {/* Parcel Status - Larger Section */}
            <div className="row justify-content-center">
    <div className="col-md-10">
        <div className="card shadow-lg p-4 mb-4 bg-white rounded text-center">
            <h3 className="text-warning fw-bold display-5">🚚 Parcel Status</h3>
            <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
                <div className="p-3 bg-light rounded text-center" style={{ width: "160px" }}>
                    <h4 className="text-primary">✅ Placed</h4>
                    <p className="fw-bold display-6">{data.parcelStatus.placed}</p>
                </div>
                <div className="p-3 bg-light rounded text-center" style={{ width: "160px" }}>
                    <h4 className="text-secondary">📥 Collected</h4>
                    <p className="fw-bold display-6">{data.parcelStatus.collected}</p>
                </div>
                <div className="p-3 bg-light rounded text-center" style={{ width: "160px" }}>
                    <h4 className="text-success">📦 Shipped</h4>
                    <p className="fw-bold display-6">{data.parcelStatus.shipped}</p>
                </div>
                <div className="p-3 bg-light rounded text-center" style={{ width: "160px" }}>
                    <h4 className="text-info">🚛 In Transit</h4>
                    <p className="fw-bold display-6">{data.parcelStatus.inTransit}</p>
                </div>
                <div className="p-3 bg-light rounded text-center" style={{ width: "160px" }}>
                    <h4 className="text-danger">🏡 Out for Delivery</h4>
                    <p className="fw-bold display-6">{data.parcelStatus.outForDelivery}</p>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>
    );
};

export default AdminDashboard;
