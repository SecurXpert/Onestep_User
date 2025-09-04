import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const PharmacyDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchOrders = () => {
    setIsLoading(true);
    try {
      const allOrders = JSON.parse(localStorage.getItem("pharmacyOrders") || "[]");
      setOrders(allOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    const handleOrderUpdate = () => {
      console.log("Pharmacy order updated event received");
      fetchOrders();
    };
    window.addEventListener("pharmacyOrderUpdated", handleOrderUpdate);

    return () => {
      window.removeEventListener("pharmacyOrderUpdated", handleOrderUpdate);
    };
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    try {
      const allOrders = JSON.parse(localStorage.getItem("pharmacyOrders") || "[]");
      const updatedOrders = allOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      localStorage.setItem("pharmacyOrders", JSON.stringify(updatedOrders));
      setOrders(updatedOrders);

      const event = new Event("pharmacyOrderUpdated");
      window.dispatchEvent(event);

      alert(`Order status updated to: ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again.");
    }
  };

  const handleDownloadReport = (report) => {
    if (!report?.fileData) return;
    try {
      const link = document.createElement("a");
      link.href = report.fileData;
      link.download = report.fileName || `report-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading report:", error);
      alert("Failed to download report. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-center text-black">Pharmacy Dashboard</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
      {isLoading ? (
        <div className="text-center text-gray-500 flex items-center justify-center">
          <FaSpinner className="animate-spin mr-2" />
          Loading orders...
        </div>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders available.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="w-full bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-purple-700">
                  Order from Dr. {order.doctorName} for {order.patientEmail}
                </h3>
                <p className="text-gray-600 text-sm">Date: {order.date}</p>
              </div>
              <div>
                <p className="text-gray-800 font-medium">Delivery Address:</p>
                <p className="text-gray-600">{order.address || "Not Provided"}</p>
              </div>
              <div>
                <p className="text-gray-800 font-medium">Medications:</p>
                <ul className="list-disc pl-5 text-gray-600">
                  {order.medications.map((med, index) => (
                    <li key={index}>
                      {med.name} (Qty: {med.quantity})
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-gray-800 font-medium">Bill Summary:</p>
                <table className="w-full text-sm text-gray-600 mt-2">
                  <thead>
                    <tr>
                      <th className="text-left">Medication</th>
                      <th className="text-right">Qty</th>
                      <th className="text-right">Cost (INR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.billItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item.medication}</td>
                        <td className="text-right">{item.quantity}</td>
                        <td className="text-right">{item.cost.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="2" className="text-right font-medium">
                        Subtotal:
                      </td>
                      <td className="text-right">{order.subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="text-right font-medium">
                        GST (18%):
                      </td>
                      <td className="text-right">{order.gst.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="text-right font-bold">
                        Total:
                      </td>
                      <td className="text-right font-bold">{order.total.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {order.report && (
                <div>
                  <p className="text-gray-800 font-medium">Report:</p>
                  <p className="text-gray-600">{order.report.fileName}</p>
                  <img
                    src={order.report.fileData}
                    alt={order.report.fileName}
                    className="mt-2 max-w-full h-auto rounded"
                    style={{ maxHeight: "200px" }}
                  />
                  <button
                    onClick={() => handleDownloadReport(order.report)}
                    className="mt-2 flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-full hover:bg-green-700 transition shadow-md"
                  >
                    <span className="text-sm font-semibold">Download</span>
                  </button>
                </div>
              )}
              <div>
                <p className="text-gray-800 font-medium">Delivery Status:</p>
                <p className="text-gray-600">{order.status}</p>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  className="w-full border p-2 rounded mt-2"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packed">Packed</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
              <p className="text-xs text-gray-400">
                Order ID: <span className="font-mono">{order.id}</span>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PharmacyDashboard;