import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { captureAndFinalizePaymentService } from "@/services";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function PaypalPaymentReturnPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("payerID");

  useEffect(() => {
    if (paymentId && payerId) {
      async function capturePayement() {
        const orderId = JSON.parse(sessionStorage.getItem("currentOrderID"));

        const response = await captureAndFinalizePaymentService(
          paymentId,
          payerId,
          orderId
        );
       if (response?.success){
         sessionStorage.removeItem("currentOrderID");
         window.location.href = "/student-courses";
         
       }

      }

      capturePayement();
    }
  }, [payerId, paymentId]);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing payment... Please wait</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalPaymentReturnPage;
