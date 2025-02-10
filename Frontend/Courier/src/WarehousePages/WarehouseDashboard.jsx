import React, { useEffect, useState } from "react";
import WarehouseNavbar from '../components/NavBars/WarehouseNavbar'; 
import axios from "axios";

const WarehouseDashboard = () => {
    const [data, setData] = useState({
        totalParcels: 0,
        totalDeliveryAgents: 0,
        parcelStatus: {
            received: 0,
            stored: 0,
            dispatched: 0,
            pending: 0
        }
    });

    useEffect(() => {
        const storedData = sessionStorage.getItem("warehouseDashboardData");

        if (storedData) {
            setData(JSON.parse(storedData));
        } else {
            axios.get("http://localhost:3000/warehouse/home")
                .then(response => {
                    setData(response.data);
                    sessionStorage.setItem("warehouseDashboardData", JSON.stringify(response.data));
                })
                .catch(error => {
                    console.error("Error fetching warehouse dashboard data:", error);
                });
        }
    }, []);

    return (
        <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
            <WarehouseNavbar />
            <div className="container mt-4">
                

                {/* Top Two Cards */}
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="card shadow-lg p-4 mb-4 bg-white rounded text-center">
                            <h3 className="text-success fw-bold">Total Parcels</h3>
                            <p className="display-5 fw-bold">{data.totalParcels}</p>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <div className="card shadow-lg p-4 mb-4 bg-white rounded text-center">
                            <h3 className="text-info fw-bold">Total Delivery Agents</h3>
                            <p className="display-5 fw-bold">{data.totalDeliveryAgents}</p>
                        </div>
                    </div>
                </div>

                {/* Parcel Status - Larger Section */}
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card shadow-lg p-4 mb-4 bg-white rounded text-center">
                            <h3 className="text-warning fw-bold display-5">📊 Parcel Status</h3>
                            <div className="row text-center mt-3">
                                <div className="col-md-3">
                                    <div className="p-3 bg-light rounded">
                                        <h4 className="text-primary">📦 Received</h4>
                                        <p className="fw-bold display-6">{data.parcelStatus.received}</p>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="p-3 bg-light rounded">
                                        <h4 className="text-secondary">🏬 Stored</h4>
                                        <p className="fw-bold display-6">{data.parcelStatus.stored}</p>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="p-3 bg-light rounded">
                                        <h4 className="text-success">🚚 Dispatched</h4>
                                        <p className="fw-bold display-6">{data.parcelStatus.dispatched}</p>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="p-3 bg-light rounded">
                                        <h4 className="text-danger">⏳ Pending</h4>
                                        <p className="fw-bold display-6">{data.parcelStatus.pending}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default WarehouseDashboard;
