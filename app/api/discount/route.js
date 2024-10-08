import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.json();

    // Prepare the request data
    const reqData = {
      service_type: formData.serviceType,
      actual_weight_amount: formData.packageWeight,
      dim_length: formData.length,
      dim_width: formData.width,
      dim_height: formData.height,
      tracking_id_charge_description_1: formData.trackingCharge1,
      tracking_id_charge_description_3: formData.trackingCharge2,
      tracking_id_charge_description_4: formData.trackingCharge3,
      distance: formData.distance,
    };

    // Make the prediction request
    const response = await fetch("http://54.85.32.221/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    });

    if (!response.ok) {
      throw new Error("Prediction API request failed");
    }

    const data = await response.json();

    // Return the prediction result
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in prediction route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
