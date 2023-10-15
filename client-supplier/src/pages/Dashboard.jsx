import { useEffect, useState } from "react";

const Dashboard = () => {

    useEffect(() => {
        const getPlacedOrders = async () => {
            const response = await fetch("/api/orders/placed")
        };
    }, []);
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
};
export default Dashboard;