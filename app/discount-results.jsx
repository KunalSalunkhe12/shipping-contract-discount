"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Download,
  ArrowLeft,
  TrendingUp,
  RefreshCw,
  Package,
  DollarSign,
  Truck,
  Weight,
  Ruler,
  MapPin,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function DiscountResults({ result, formData }) {
  const router = useRouter();
  console.log(result);
  // Mock data for the charts
  const costBreakdownData = [
    { name: "Original Price", value: 100 },
    { name: "Discounted Price", value: 85 },
  ];

  const comparisonData = [
    { name: "Standard Rate", value: 100 },
    { name: "Your Rate", value: 85 },
  ];

  const pieChartData = [
    { name: "Savings", value: 15 },
    { name: "Cost", value: 85 },
  ];

  const COLORS = ["#6b7280", "#FFB800"];
  const COLORS_PIE = ["#FFB800", "#6b7280"];

  // Mock shipping details
  const shippingDetails = {
    serviceType: formData.serviceType,
    weight: formData.packageWeight,
    dimensions: `${formData.length} x ${formData.width} x ${formData.height}`,
    distance: formData.distance,
    trackingId: formData.trackingCharge1,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1C1E] to-[#2C2C2E] text-white p-8 relative overflow-hidden">
      {/* Cool background graphics */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#FFB800"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto relative z-10"
      >
        <h1 className="text-5xl font-bold text-left mb-12 text-[#FFB800] glow">
          Here&apos;s Your Predicted Shipping Discount!
        </h1>

        <Card className="bg-[#3A3A3C] border-[#FFB800] border-opacity-30 shadow-lg mb-12 overflow-hidden">
          <CardContent className="flex items-center justify-center p-12 relative">
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 bg-[#FFB800] rounded-full opacity-20"
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

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <Trophy className="text-[#FFB800] w-28 h-28 mr-8" />
            </motion.div>
            <div className="text-left">
              <p className="text-2xl font-normal mb-0 text-white">
                You&apos;ve unlocked a
              </p>
              <motion.p
                className="text-6xl font-semibold text-[#FFB800] glow"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {result.prediction}% discount
              </motion.p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <Card className="bg-[#3A3A3C] border-[#FFB800] border-opacity-30 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <CardHeader className="pb-0">
              <CardTitle className="flex items-center text-2xl text-white">
                <Package className="text-[#FFB800] w-8 h-8 mr-3" />
                Discount Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mt-0 flex justify-center">
                <PieChart width={200} height={200}>
                  <Pie
                    data={pieChartData}
                    cx={100}
                    cy={100}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS_PIE[index % COLORS_PIE.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </div>
              <p className="text-xl font-medium text-white text-left mb-1">
                {result.prediction}% Discount Applied!
              </p>
              <p className="text-left text-gray-300">
                This could save you up to $150 on your shipping costs.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#3A3A3C] border-[#FFB800] border-opacity-30 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-white">
                <DollarSign className="text-[#FFB800] w-8 h-8 mr-3" />
                Cost Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costBreakdownData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#FFB800">
                    {costBreakdownData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-[#3A3A3C] border-[#FFB800] border-opacity-30 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-white">
                <Truck className="text-[#FFB800] w-8 h-8 mr-3" />
                Shipping Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pr-1">
              <div className="flex items-center">
                <Truck className="text-[#FFB800] w-5 h-5 mr-2" />
                <span className="text-gray-400">Service Type:</span>
                <span className="ml-2 font-semibold text-white">
                  {shippingDetails.serviceType}
                </span>
              </div>
              <div className="flex items-center">
                <Weight className="text-[#FFB800] w-5 h-5 mr-2" />
                <span className="text-gray-400">Weight:</span>
                <span className="ml-2 font-semibold text-white">
                  {shippingDetails.weight}
                </span>
              </div>
              <div className="flex items-center">
                <Ruler className="text-[#FFB800] w-5 h-5 mr-2" />
                <span className="text-gray-400">Dimensions:</span>
                <span className="ml-2 font-semibold text-white">
                  {shippingDetails.dimensions}
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="text-[#FFB800] w-5 h-5 mr-2" />
                <span className="text-gray-400">Distance:</span>
                <span className="ml-2 font-semibold text-white">
                  {shippingDetails.distance}
                </span>
              </div>
              <div className="flex items-center">
                <Package className="text-[#FFB800] w-5 h-5 mr-2" />
                <span className="text-gray-400">Tracking ID:</span>
                <span className="ml-2 font-semibold text-white">
                  {shippingDetails.trackingId}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="mb-4 md:mb-0 bg-[#3A3A3C] text-[#FFB800] border-[#FFB800] border-opacity-30 hover:bg-[#FFB800] hover:text-black transition-colors duration-300 text-lg py-3 px-6"
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Input
          </Button>
          <div className="flex space-x-4">
            <Button
              onClick={() => window.location.reload()}
              className="bg-[#3A3A3C] text-[#FFB800] border-[#FFB800] border-opacity-30 hover:bg-[#FFB800] hover:text-black text-lg py-3 px-6 transform hover:scale-105 transition-transform duration-300"
            >
              <RefreshCw className="mr-2 h-5 w-5" /> Recalculate
            </Button>
            <Button className="bg-[#FFB800] hover:bg-[#c3992f] text-black text-lg py-3 px-6 transform hover:scale-105 transition-transform duration-300">
              <Download className="mr-2 h-5 w-5" /> Download Report
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
