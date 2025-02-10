import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCcVisa, FaCreditCard } from "react-icons/fa";
import { SiPaypal } from "react-icons/si";
import { QRCodeCanvas } from "qrcode.react";
import CustomerNavbar from "../components/NavBars/customerNavbar";
import { processPayment } from "../services/user";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [qrValue, setQrValue] = useState("");
  const [orderId, setOrderId] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    cardHolderName: "",
    cardNo: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    const storedOrderId = sessionStorage.getItem("orderId");
    if (storedOrderId) {
      setOrderId(storedOrderId);
    } else {
      console.error("Error: Order ID missing in session storage");
    }
  }, []);

  const paymentLinks = {
    upi: "upi://pay?pa=merchant@upi&pn=Business&mc=1234&tid=TXN123",
    paypal: "https://www.paypal.com/pay?merchant_id=123456",
  };

  const generateQR = (method) => {
    setPaymentMethod(method);
    setQrValue(paymentLinks[method] || "");
  };

  const handleChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem("userId");
    if (!userId || !orderId) {
      alert("User or Order ID is missing.");
      return;
    }

    const paymentData = {
      senderId: userId,
      orderId: orderId,
      amount: 500,
      paymentMethod,
      cardDetails: paymentMethod === "card" ? paymentDetails : null,
    };

    try {
      const response = await processPayment(orderId, paymentData);
      if (response.status === "success") {
        alert("Payment successful!");
        navigate("/customer/track-order");
      } else {
        alert(`Payment failed: ${response.error}`);
      }
    } catch (error) {
      console.error("Payment submission error:", error);
    }
  };

  return (
    <div>
      <CustomerNavbar />
      <div className="payment-container">
        <h5>Complete Payment to Confirm Your Order</h5>
        <div className="payment-card">
          <h2 className="section-title">Select Payment Method</h2>
          <div className="payment-options">
            <button onClick={() => generateQR("upi")} className="payment-btn">
              <FaCreditCard /> UPI QR
            </button>
            <button onClick={() => setPaymentMethod("card")} className="payment-btn">
              <FaCcVisa /> Card Payment
            </button>
            <button onClick={() => generateQR("paypal")} className="payment-btn">
              <SiPaypal /> PayPal
            </button>
          </div>

          {paymentMethod === "upi" && qrValue && (
            <div className="qr-section">
              <h2>Scan QR Code to Pay</h2>
              <QRCodeCanvas value={qrValue} size={200} />
            </div>
          )}

          {paymentMethod === "card" && (
            <form onSubmit={handleSubmit} className="card-form">
              <div className="input-group">
                <label>Name on Card</label>
                <input type="text" name="cardHolderName" value={paymentDetails.cardHolderName} onChange={handleChange} required />
              </div>
              <div className="input-group card-input">
                <label>Card Number</label>
                <input type="text" name="cardNo" value={paymentDetails.cardNo} onChange={handleChange} required />
                <FaCcVisa className="visa-logo" />
              </div>
              <div className="row">
                <div className="input-group half">
                  <label>Expiration</label>
                  <input type="text" name="expiryDate" value={paymentDetails.expiryDate} onChange={handleChange} placeholder="MM/YY" required />
                </div>
                <div className="input-group half">
                  <label>CVV</label>
                  <input type="password" name="cvv" value={paymentDetails.cvv} onChange={handleChange} required />
                </div>
              </div>
              <button type="submit" className="confirm-button">Confirm Payment</button>
            </form>
          )}
        </div>
      </div>
      <style>
        {`
          .payment-container { text-align: center; padding: 20px; }
          .payment-card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); max-width: 450px; margin: auto; }
          .payment-options { display: flex; justify-content: center; gap: 15px; }
          .payment-btn { background: grey; color: white; padding: 10px 15px; border: none; cursor: pointer; border-radius: 6px; }
          .qr-section { margin-top: 20px; }
          .input-group { display: flex; flex-direction: column; margin-bottom: 15px; }
          .row { display: flex; gap: 15px; }
          .half { width: 50%; }
          .confirm-button { background: green; color: white; border: none; padding: 12px; font-size: 15px; border-radius: 6px; cursor: pointer; width: 100%; }
        `}
      </style>
    </div>
  );
};

export default PaymentPage;
