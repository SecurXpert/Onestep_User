import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AppContext } from "../context/AppContext";
import { FaBell, FaVideo } from "react-icons/fa";
import { medicationPrices } from "../assets/assets";


// NotificationCard component
const NotificationCard = ({ id, message, timestamp, onDismiss }) => {
  const formatISTTime = (timestamp) => {
    if (!timestamp) return "Time not available";
    try {
      const dateObj = new Date(timestamp);
      return (
        dateObj.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }) + " IST"
      );
    } catch {
      return "Time not available";
    }
  };

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-md shadow-sm flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-700">{message}</p>
        <p className="text-xs text-gray-500">{formatISTTime(timestamp)}</p>
      </div>
      <button
        onClick={() => onDismiss(id)}
        className="text-red-500 hover:text-red-600 text-xs font-medium"
      >
        Dismiss
      </button>
    </div>
  );
};

// VirtualLinkCard component
const VirtualLinkCard = ({  message, timestamp, meetingLink }) => {
  const formatISTTime = (timestamp) => {
    if (!timestamp) return "Time not available";
    try {
      const dateObj = new Date(timestamp);
      return (
        dateObj.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }) + " IST"
      );
    } catch {
      return "Time not available";
    }
  };

  const handleJoinMeeting = () => {
    if (meetingLink) {
      window.open(meetingLink, "_blank");
    }
  };

  return (
    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-md shadow-sm flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-700">{message}</p>
        <p className="text-xs text-gray-500">{formatISTTime(timestamp)}</p>
      </div>
      <button
        onClick={handleJoinMeeting}
        className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700 transition"
      >
        Join Meeting
      </button>
    </div>
  );
};

// PrescriptionCard component
const PrescriptionCard = ({ id, doctorName, date, medications, instructions, report, onBookMedicine, timestamp, appointmentId }) => {
  const [isBooking, setIsBooking] = useState(false);
  const [orderType, setOrderType] = useState("full");
  const [customQuantities, setCustomQuantities] = useState({});
  const [budget, setBudget] = useState("");
  const { topdoctors } = useContext(AppContext);

  const getInitials = (name) => {
    if (!name || name === "Unknown") return "Dr";
    const names = name.split(" ");
    return names.map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const doctor = topdoctors.find((doc) => doc.name === doctorName);
  const doctorImage = doctor ? doctor.image : null;

  const formatISTTime = (timestamp) => {
    if (!timestamp) return "Time not available";
    try {
      const dateObj = new Date(timestamp);
      return (
        dateObj.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }) + " IST"
      );
    } catch {
      return "Time not available";
    }
  };

  const handleQuantityChange = (med, value) => {
    setCustomQuantities((prev) => ({
      ...prev,
      [med]: value,
    }));
  };

  const adjustQuantitiesToBudget = () => {
    if (!budget || isNaN(budget) || budget <= 0) {
      alert("Please enter a valid budget.");
      return;
    }

    const maxBudget = parseFloat(budget);
    let remainingBudget = maxBudget / 1.18; // Account for 18% GST
    let newQuantities = {};
    let allocated = 0;

    const perMedBudget = remainingBudget / medications.length;
    medications.forEach((med) => {
      const price = medicationPrices[med] || 10;
      const maxQty = Math.floor(perMedBudget / price);
      newQuantities[med] = maxQty > 0 ? maxQty : 0;
      allocated += maxQty * price;
    });

    while (allocated > remainingBudget) {
      const medToReduce = medications.find((med) => newQuantities[med] > 0);
      if (!medToReduce) break;
      newQuantities[medToReduce] -= 1;
      allocated -= medicationPrices[medToReduce] || 10;
    }

    setCustomQuantities(newQuantities);
    setOrderType("custom");
    alert(`Quantities adjusted to fit within ₹${maxBudget} budget.`);
  };

  const calculateBill = () => {
    const quantities = orderType === "full"
      ? medications.reduce((acc, med) => ({ ...acc, [med]: 1 }), {})
      : customQuantities;

    let subtotal = 0;
    const billItems = medications.map((med) => {
      const qty = parseInt(quantities[med] || 0);
      const cost = (medicationPrices[med] || 10) * qty;
      subtotal += cost;
      return { medication: med, quantity: qty, cost };
    });

    const gst = subtotal * 0.18; // 18% GST
    const total = subtotal + gst;

    return { billItems, subtotal, gst, total };
  };

  const handleBookMedicine = () => {
    const quantities = orderType === "full"
      ? medications.reduce((acc, med) => ({ ...acc, [med]: 1 }), {})
      : customQuantities;

    if (orderType === "custom" && Object.keys(quantities).length !== medications.length) {
      alert("Please specify quantities for all medications or use budget adjustment.");
      return;
    }

    const { total } = calculateBill();
    if (budget && total > parseFloat(budget)) {
      alert(`Total cost (₹${total.toFixed(2)}) exceeds your budget (₹${budget}). Please adjust quantities or increase budget.`);
      return;
    }

    onBookMedicine(id, quantities, calculateBill(), appointmentId, report);
    setIsBooking(false);
    setCustomQuantities({});
    setBudget("");
    setOrderType("full");
  };

  const handleDownloadReport = () => {
    if (!report?.fileData) return;
    try {
      const link = document.createElement("a");
      link.href = report.fileData;
      link.download = report.fileName || `report-${id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading report:", error);
      alert("Failed to download report. Please try again.");
    }
  };

  const order = JSON.parse(localStorage.getItem("pharmacyOrders") || "[]").find(
    (o) => o.prescriptionId === id
  );

  const statusSteps = ["Order Placed", "Packed", "In Transit", "Delivered"];
  const currentStatusIndex = order ? statusSteps.indexOf(order.status) : -1;

  const { billItems, subtotal, gst, total } = calculateBill();

  return (
    <div className="bg-white shadow-sm rounded-lg p-3 border border-gray-100 hover:shadow-md transition">
      <Sidebar/>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            {doctorImage ? (
              <img
                src={doctorImage}
                alt={doctorName}
                className="w-10 h-10 rounded-full object-cover shadow-sm"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-base font-medium shadow-sm">
                {getInitials(doctorName)}
              </div>
            )}
            <div>
              <h3 className="text-base font-semibold text-purple-700">{doctorName}</h3>
              <p className="text-xs text-gray-500">{date} | {formatISTTime(timestamp)}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-700 font-medium">Medications:</p>
            <ul className="list-disc pl-4 text-sm text-gray-600">
              {medications.map((med, index) => (
                <li key={index}>{med}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm text-gray-700 font-medium">Instructions:</p>
            <p className="text-sm text-gray-600 line-clamp-2">{instructions}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsBooking(!isBooking)}
              className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700 transition"
            >
              {isBooking ? "Cancel" : "Book Medicine"}
            </button>
          </div>
          {isBooking && (
            <div className="mt-2 p-2 border rounded bg-gray-50">
              <p className="text-xs font-medium text-gray-700">Order Type:</p>
              <select
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                className="w-full border p-1 rounded text-xs mt-1"
              >
                <option value="full">Full Course</option>
                <option value="custom">Custom Quantity</option>
              </select>
              {orderType === "custom" && (
                <div className="mt-2">
                  <p className="text-xs font-medium text-gray-700">Set Budget (INR):</p>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="number"
                      min="0"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-24 border p-1 rounded text-xs"
                      placeholder="Enter budget"
                    />
                    <button
                      onClick={adjustQuantitiesToBudget}
                      className="bg-purple-600 text-white text-xs px-3 py-1 rounded hover:bg-purple-700 transition"
                    >
                      Adjust Quantities
                    </button>
                  </div>
                  <p className="text-xs font-medium text-gray-700 mt-2">Quantities:</p>
                  {medications.map((med, index) => (
                    <div key={index} className="flex items-center gap-2 mt-1">
                      <label className="text-xs text-gray-600">{med}:</label>
                      <input
                        type="number"
                        min="0"
                        value={customQuantities[med] || ""}
                        onChange={(e) => handleQuantityChange(med, e.target.value)}
                        className="w-16 border p-1 rounded text-xs"
                        placeholder="Qty"
                      />
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-2">
                <p className="text-xs font-medium text-gray-700">Bill Summary:</p>
                <table className="w-full text-xs text-gray-600 mt-1">
                  <thead>
                    <tr>
                      <th className="text-left">Medication</th>
                      <th className="text-right">Qty</th>
                      <th className="text-right">Cost (INR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item.medication}</td>
                        <td className="text-right">{item.quantity}</td>
                        <td className="text-right">{item.cost.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="2" className="text-right font-medium">Subtotal:</td>
                      <td className="text-right">{subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="text-right font-medium">GST (18%):</td>
                      <td className="text-right">{gst.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="text-right font-bold">Total:</td>
                      <td className="text-right font-bold">{total.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button
                onClick={handleBookMedicine}
                className="mt-2 bg-green-600 text-white text-xs px-3 py-1 rounded hover:bg-green-700 transition"
              >
                Proceed to Payment
              </button>
            </div>
          )}
          {order && (
            <div className="mt-2">
              <p className="text-xs text-gray-700 font-medium">Delivery Status:</p>
              <div className="flex items-center gap-1 mt-1">
                {statusSteps.map((step, index) => (
                  <div key={step} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs text-white ${
                        index <= currentStatusIndex ? "bg-green-600" : "bg-gray-300"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <p className="text-xs text-gray-600 mt-1 text-center line-clamp-1">{step}</p>
                    {index < statusSteps.length - 1 && (
                      <div
                        className={`h-1 flex-1 w-full mt-1 ${
                          index < currentStatusIndex ? "bg-green-600" : "bg-gray-300"
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          <p className="text-xs text-gray-400 mt-2">
            ID: <span className="font-mono">{id}</span>
          </p>
        </div>
        {report && (
          <div className="flex-shrink-0 w-full sm:w-40">
            <img
              src={report.fileData}
              alt="Report"
              className="w-full h-auto rounded object-cover"
              style={{ maxHeight: "120px" }}
            />
            <div className="flex justify-center">
              <button
                onClick={handleDownloadReport}
                className="bg-green-600 text-white text-xs mt-3 px-3 py-2 rounded hover:bg-green-700 transition"
              >
                Download Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// UserDashboardMock component
const UserDashboardMock = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useContext(AuthContext);
  const [prescriptions, setPrescriptions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [virtualLinks, setVirtualLinks] = useState([]);
  const [profile, setProfile] = useState({ address: "123 Main St, Mumbai" });
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showVirtualLinks, setShowVirtualLinks] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);
  const [showVirtualLinkBadge, setShowVirtualLinkBadge] = useState(true);

  useEffect(() => {
    try {
      const savedProfile = JSON.parse(localStorage.getItem("userProfile")) || {
        address: "123 Main St, Mumbai",
      };
      setProfile(savedProfile);
    } catch (error) {
      console.error("Error initializing localStorage:", error);
    }
  }, []);

  const fetchPrescriptions = () => {
    try {
      const allPrescriptions = JSON.parse(localStorage.getItem("prescriptions") || "[]");
      const allReports = JSON.parse(localStorage.getItem("reports") || "[]");
      const userPrescriptions = allPrescriptions
        .filter((pres) => pres.patientEmail === user?.email)
        .map((pres) => {
          const report = allReports.find((r) => r.appointmentId === pres.appointmentId);
          return { ...pres, report };
        })
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setPrescriptions(userPrescriptions);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
      setPrescriptions([]);
    }
  };

  const fetchNotifications = () => {
    try {
      const allNotifications = JSON.parse(localStorage.getItem("notifications") || "[]");
      const userNotifications = allNotifications
        .filter((notif) => notif.patientEmail === user?.email && !notif.read && !notif.message.includes("Join your virtual appointment"))
        .map((notif) => ({
          ...notif,
        }));
      setNotifications(userNotifications);
      setShowNotificationBadge(userNotifications.length > 0);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
      setShowNotificationBadge(false);
    }
  };

  const fetchVirtualLinks = () => {
    try {
      const allNotifications = JSON.parse(localStorage.getItem("notifications") || "[]");
      const userVirtualLinks = allNotifications
        .filter((notif) => notif.patientEmail === user?.email && !notif.read && notif.message.includes("Join your virtual appointment"))
        .map((notif) => ({
          id: notif.id,
          message: `Virtual appointment with ${notif.message.match(/Dr\. ([^\s]+)/)?.[1] || 'Unknown'}`,
          timestamp: notif.timestamp,
          meetingLink: notif.message.match(/https:\/\/meet\.example\.com\/[^\s]+/)?.[0] || null,
        }));
      setVirtualLinks(userVirtualLinks);
      setShowVirtualLinkBadge(userVirtualLinks.length > 0);
    } catch (error) {
      console.error("Error fetching virtual links:", error);
      setVirtualLinks([]);
      setShowVirtualLinkBadge(false);
    }
  };

  const handleDismissNotification = (notificationId) => {
    try {
      const allNotifications = JSON.parse(localStorage.getItem("notifications") || "[]");
      const updatedNotifications = allNotifications.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      );
      localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
      fetchNotifications();
      fetchVirtualLinks();
    } catch (error) {
      console.error("Error dismissing notification:", error);
      alert("Failed to dismiss notification. Please try again.");
    }
  };

  const handleBookMedicine = (prescriptionId, quantities, bill, appointmentId, report) => {
    const prescription = prescriptions.find((p) => p.id === prescriptionId);
    if (!prescription) {
      alert("Prescription not found.");
      return;
    }

    const newOrder = {
      prescriptionId,
      patientEmail: prescription.patientEmail,
      doctorName: prescription.doctorName,
      doctorId: prescription.doctorId,
      medications: Object.entries(quantities).map(([med, qty]) => ({ name: med, quantity: qty })),
      billItems: bill.billItems,
      subtotal: bill.subtotal,
      gst: bill.gst,
      total: bill.total,
      address: profile.address || newAddress || "Not Provided",
      appointmentId,
      report: report || null,
    };

    navigate("/payment", { state: { order: newOrder } });
  };

  const handleSaveAddress = () => {
    if (!newAddress.trim()) {
      alert("Please enter a valid address.");
      return;
    }
    try {
      const updatedProfile = { ...profile, address: newAddress };
      localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
      setProfile(updatedProfile);
      setNewAddress("");
      setIsAddingAddress(false);
      alert("Address saved successfully!");
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address. Please try again.");
    }
  };

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setShowNotificationBadge(false);
    }
  };

  const handleToggleVirtualLinks = () => {
    setShowVirtualLinks(!showVirtualLinks);
    if (!showVirtualLinks) {
      setShowVirtualLinkBadge(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate("/login-register");
      return;
    }

    fetchPrescriptions();
    fetchNotifications();
    fetchVirtualLinks();

    const handlePrescriptionChange = () => {
      fetchPrescriptions();
    };

    const handleOrderChange = () => {
      fetchPrescriptions();
    };

    const handleNotificationChange = () => {
      fetchNotifications();
      fetchVirtualLinks();
    };

    window.addEventListener("prescriptionUpdated", handlePrescriptionChange);
    window.addEventListener("pharmacyOrderUpdated", handleOrderChange);
    window.addEventListener("notificationUpdated", handleNotificationChange);

    return () => {
      window.removeEventListener("prescriptionUpdated", handlePrescriptionChange);
      window.removeEventListener("pharmacyOrderUpdated", handleOrderChange);
      window.removeEventListener("notificationUpdated", handleNotificationChange);
    };
  }, [isLoggedIn, user, navigate]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">My Prescriptions</h1>
          <div className="relative">
            <button
              onClick={handleToggleNotifications}
              className="text-gray-600 hover:text-gray-800 transition"
            >
              <FaBell className="text-xl" />
              {showNotificationBadge && notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
          </div>
          <div className="relative">
            <button
              onClick={handleToggleVirtualLinks}
              className="text-gray-600 hover:text-gray-800 transition"
              title="Virtual Meeting Links"
            >
              <FaVideo className="text-xl" />
              {showVirtualLinkBadge && virtualLinks.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {virtualLinks.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      {showNotifications && (
        <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100">
          <h2 className="text-lg font-semibold text-purple-700 mb-3">Notifications</h2>
          {notifications.length === 0 ? (
            <p className="text-sm text-gray-500">No new notifications.</p>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  id={notification.id}
                  message={notification.message}
                  timestamp={notification.timestamp}
                  onDismiss={handleDismissNotification}
                />
              ))}
            </div>
          )}
        </div>
      )}
      {showVirtualLinks && (
        <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100">
          <h2 className="text-lg font-semibold text-purple-700 mb-3">Virtual Meeting Links</h2>
          {virtualLinks.length === 0 ? (
            <p className="text-sm text-gray-500">No virtual meeting links available.</p>
          ) : (
            <div className="space-y-2">
              {virtualLinks.map((link) => (
                <VirtualLinkCard
                  key={link.id}
                  id={link.id}
                  message={link.message}
                  timestamp={link.timestamp}
                  meetingLink={link.meetingLink}
                />
              ))}
            </div>
          )}
        </div>
      )}
      <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100">
        <p className="text-sm text-gray-700 font-medium">Delivery Address:</p>
        <p className="text-sm text-gray-600">{profile.address || "Not Provided"}</p>
        <button
          onClick={() => setIsAddingAddress(!isAddingAddress)}
          className="mt-2 text-blue-600 text-sm hover:underline"
        >
          {isAddingAddress ? "Cancel" : "Add New Address"}
        </button>
        {isAddingAddress && (
          <div className="mt-2 space-y-2">
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Enter new address"
              className="w-full border p-2 rounded text-sm"
            />
            <button
              onClick={handleSaveAddress}
              className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700 transition"
            >
              Save Address
            </button>
          </div>
        )}
      </div>
      {prescriptions.length === 0 ? (
        <p className="text-center text-sm text-gray-500">No prescriptions available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prescriptions.map((prescription) => (
            <PrescriptionCard
              key={prescription.id}
              id={prescription.id}
              doctorName={prescription.doctorName}
              date={prescription.date}
              medications={prescription.medications}
              instructions={prescription.instructions}
              report={prescription.report}
              onBookMedicine={handleBookMedicine}
              timestamp={prescription.timestamp}
              appointmentId={prescription.appointmentId}
            />
          ))}
        </div>
      )}
      <button
        className="bg-red-600 text-white text-sm px-4 py-2 rounded-md hover:bg-red-700 transition"
        onClick={() => {
          localStorage.removeItem("prescriptions");
          localStorage.removeItem("pharmacyOrders");
          localStorage.removeItem("notifications");
          localStorage.removeItem("userProfile");
          window.location.reload();
        }}
      >
        Clear All
      </button>
    </div>
  );
};

export default UserDashboardMock;