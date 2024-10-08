"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  TruckIcon,
  PackageIcon,
  RulerIcon,
  WeightIcon,
  TagIcon,
  RefreshCw,
} from "lucide-react";
import DiscountResults from "./discount-results";

export default function ShippingDiscountPrediction() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    serviceType: "",
    packageWeight: "",
    distance: "",
    length: "",
    width: "",
    height: "",
    trackingCharge1: "",
    trackingCharge2: "",
    trackingCharge3: "",
  });
  const [errors, setErrors] = useState({});
  const [isResetActive, setIsResetActive] = useState(false);
  const [result, setResult] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.serviceType)
      newErrors.serviceType = "Service type is required";
    if (!formData.packageWeight)
      newErrors.packageWeight = "Package weight is required";
    if (!formData.distance) newErrors.distance = "Distance is required";
    if (!formData.length) newErrors.length = "Length is required";
    if (!formData.width) newErrors.width = "Width is required";
    if (!formData.height) newErrors.height = "Height is required";
    if (!formData.trackingCharge1)
      newErrors.trackingCharge1 = "Tracking charge 1 is required";
    if (!formData.trackingCharge2)
      newErrors.trackingCharge2 = "Tracking charge 2 is required";
    if (!formData.trackingCharge3)
      newErrors.trackingCharge3 = "Tracking charge 3 is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await fetch("/api/discount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("API request failed");
      }
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      // Handle the error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleReset = () => {
    setFormData({
      serviceType: "",
      packageWeight: "",
      distance: "",
      length: "",
      width: "",
      height: "",
      trackingCharge1: "",
      trackingCharge2: "",
      trackingCharge3: "",
    });
    setErrors({});
    setIsResetActive(false);
  };

  useEffect(() => {
    setIsResetActive(Object.values(formData).some((value) => value !== ""));
  }, [formData]);

  if (result) {
    return <DiscountResults result={result} formData={formData} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1C1E] to-[#2C2C2E] text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl"
      >
        <Card className="w-full bg-[#2C2C2E] border-[#FFB800] border-opacity-30 shadow-lg shadow-[#FFB800]/20">
          <CardHeader className="relative overflow-hidden">
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 bg-[#FFB800] rounded-full opacity-10"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />

            <CardTitle className="text-4xl font-bold text-[#FFB800] z-10 relative mb-2">
              Predict Your Shipping Contract Discounts
            </CardTitle>
            <CardDescription className=" z-10 relative text-lg text-white">
              Enter your shipment details to get the best discount predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="serviceType"
                  className="flex items-center text-gray-300 text-lg"
                >
                  <TruckIcon className="w-6 h-6 mr-2 text-[#FFB800]" />
                  Service Type
                </Label>
                <Select
                  name="serviceType"
                  onValueChange={(value) =>
                    handleInputChange({
                      target: { name: "serviceType", value },
                    })
                  }
                  value={formData.serviceType}
                  required
                >
                  <SelectTrigger className="w-full bg-[#3A3A3C] border-[#FFB800] border-opacity-30 focus:ring-[#FFB800] focus:ring-opacity-50 text-white p-3">
                    <SelectValue
                      placeholder="Select service type"
                      className="text-gray-400"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-[#3A3A3C] text-white">
                    <SelectItem
                      className="focus:bg-[#FFB800] focus:text-black"
                      value="0"
                    >
                      FedEx Two-Day
                    </SelectItem>
                    <SelectItem
                      className="focus:bg-[#FFB800] focus:text-black"
                      value="1"
                    >
                      FedEx Priority Overnight
                    </SelectItem>
                    <SelectItem className="!hover:bg-[#FFB800]" value="2">
                      FedEx Standard Overnight
                    </SelectItem>
                    <SelectItem
                      className="focus:bg-[#FFB800] focus:text-black"
                      value="3"
                    >
                      Ground
                    </SelectItem>
                    <SelectItem
                      className="focus:bg-[#FFB800] focus:text-black"
                      value="4"
                    >
                      Ground Return
                    </SelectItem>
                    <SelectItem
                      className="focus:bg-[#FFB800] focus:text-black"
                      value="5"
                    >
                      Home Delivery
                    </SelectItem>
                    <SelectItem
                      className="focus:bg-[#FFB800] focus:text-black"
                      value="6"
                    >
                      SmartPost
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.serviceType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.serviceType}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="packageWeight"
                  className="flex items-center text-gray-300 text-lg"
                >
                  <WeightIcon className="w-6 h-6 mr-2 text-[#FFB800]" />
                  Package Weight (lbs)
                </Label>
                <Input
                  type="number"
                  id="packageWeight"
                  name="packageWeight"
                  placeholder="Enter weight"
                  className="bg-[#3A3A3C] border-[#FFB800] border-opacity-30 focus:ring-[#FFB800] focus:ring-opacity-50 text-white placeholder-gray-400 p-3"
                  onChange={handleInputChange}
                  value={formData.packageWeight}
                  required
                />
                {errors.packageWeight && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.packageWeight}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="distance"
                  className="flex items-center text-gray-300 text-lg"
                >
                  <TruckIcon className="w-6 h-6 mr-2 text-[#FFB800]" />
                  Distance (km)
                </Label>
                <Input
                  type="number"
                  id="distance"
                  name="distance"
                  placeholder="Enter distance"
                  className="bg-[#3A3A3C] border-[#FFB800] border-opacity-30 focus:ring-[#FFB800] focus:ring-opacity-50 text-white placeholder-gray-400 p-3"
                  onChange={handleInputChange}
                  value={formData.distance}
                  required
                />
                {errors.distance && (
                  <p className="text-red-500 text-sm mt-1">{errors.distance}</p>
                )}
              </div>

              <div className="space-y-2 col-span-full">
                <Label className="flex items-center text-gray-300 text-lg">
                  <RulerIcon className="w-6 h-6 mr-2 text-[#FFB800]" />
                  Package Dimensions (cm)
                </Label>
                <div className="flex justify-between">
                  <div className="w-[32%]">
                    <Input
                      type="number"
                      id="length"
                      name="length"
                      placeholder="Length"
                      className="bg-[#3A3A3C] border-[#FFB800] border-opacity-30 focus:ring-[#FFB800] focus:ring-opacity-50 text-white placeholder-gray-400 p-3 w-full"
                      onChange={handleInputChange}
                      value={formData.length}
                      required
                    />
                    {errors.length && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.length}
                      </p>
                    )}
                  </div>

                  <div className="w-[32%]">
                    <Input
                      type="number"
                      id="width"
                      name="width"
                      placeholder="Width"
                      className="bg-[#3A3A3C] border-[#FFB800] border-opacity-30 focus:ring-[#FFB800] focus:ring-opacity-50 text-white placeholder-gray-400 p-3 w-full"
                      onChange={handleInputChange}
                      value={formData.width}
                      required
                    />
                    {errors.width && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.width}
                      </p>
                    )}
                  </div>

                  <div className="w-[32%]">
                    <Input
                      type="number"
                      id="height"
                      name="height"
                      placeholder="Height"
                      className="bg-[#3A3A3C] border-[#FFB800] border-opacity-30 focus:ring-[#FFB800] focus:ring-opacity-50 text-white placeholder-gray-400 p-3 w-full"
                      onChange={handleInputChange}
                      value={formData.height}
                      required
                    />
                    {errors.height && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.height}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {[1, 2, 3].map((num) => (
                <div key={num} className="space-y-2">
                  <Label
                    htmlFor={`trackingCharge${num}`}
                    className="flex items-center text-gray-300 text-lg"
                  >
                    <TagIcon className="w-6 h-6 mr-2 text-[#FFB800]" />
                    Tracking ID Charge Description {num}
                  </Label>
                  <Input
                    id={`trackingCharge${num}`}
                    name={`trackingCharge${num}`}
                    placeholder="Enter description"
                    className="bg-[#3A3A3C] border-[#FFB800] border-opacity-30 focus:ring-[#FFB800] focus:ring-opacity-50 text-white placeholder-gray-400 p-3"
                    onChange={handleInputChange}
                    value={formData[`trackingCharge${num}`]}
                    required
                  />
                  {errors[`trackingCharge${num}`] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[`trackingCharge${num}`]}
                    </p>
                  )}
                </div>
              ))}

              <motion.div className="col-span-full flex justify-end items-center space-x-[29.6px]">
                <Button
                  type="button"
                  onClick={handleReset}
                  className="bg-[#3A3A3C] hover:bg-[#4A4A4C] text-white font-bold py-4 px-6 w-[120px]"
                  disabled={!isResetActive}
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Reset
                </Button>
                <Button
                  type="submit"
                  className="bg-[#FFB800] hover:bg-[#FFA000] text-black font-bold relative overflow-hidden text-xl py-4 px-6 w-[240px]"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <motion.div
                      className="absolute inset-0 bg-white"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    />
                  )}

                  <span className="relative z-10 text-base font-medium">
                    {isLoading ? "Predicting..." : "Predict My Discount"}
                  </span>
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
