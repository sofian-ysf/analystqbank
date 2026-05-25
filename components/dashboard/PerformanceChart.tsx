"use client";

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface PerformanceChartProps {
  weeklyData?: { day: string; questions: number; accuracy: number }[];
}

export default function PerformanceChart({ weeklyData }: PerformanceChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Default data if none provided
  const data = weeklyData || [
    { day: "Mon", questions: 12, accuracy: 72 },
    { day: "Tue", questions: 8, accuracy: 85 },
    { day: "Wed", questions: 15, accuracy: 68 },
    { day: "Thu", questions: 20, accuracy: 78 },
    { day: "Fri", questions: 10, accuracy: 90 },
    { day: "Sat", questions: 25, accuracy: 75 },
    { day: "Sun", questions: 18, accuracy: 82 },
  ];

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, "rgba(31, 184, 205, 0.3)");
    gradient.addColorStop(1, "rgba(31, 184, 205, 0.0)");

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((d) => d.day),
        datasets: [
          {
            label: "Questions",
            data: data.map((d) => d.questions),
            borderColor: "#1FB8CD",
            backgroundColor: gradient,
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "#1FB8CD",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            yAxisID: "y",
          },
          {
            label: "Accuracy %",
            data: data.map((d) => d.accuracy),
            borderColor: "#10B981",
            backgroundColor: "transparent",
            borderDash: [5, 5],
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "#10B981",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            yAxisID: "y1",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "#1F2937",
            titleColor: "#fff",
            bodyColor: "#fff",
            padding: 10,
            cornerRadius: 8,
            displayColors: true,
            boxWidth: 8,
            boxHeight: 8,
            callbacks: {
              title: (context) => context[0].label,
              label: (context) => {
                if (context.datasetIndex === 0) {
                  return ` Questions: ${context.raw}`;
                }
                return ` Accuracy: ${context.raw}%`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#9CA3AF",
              font: {
                size: 10,
              },
            },
          },
          y: {
            type: "linear",
            display: true,
            position: "left",
            grid: {
              color: "#F3F4F6",
            },
            ticks: {
              color: "#9CA3AF",
              font: {
                size: 10,
              },
            },
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            grid: {
              display: false,
            },
            ticks: {
              color: "#9CA3AF",
              font: {
                size: 10,
              },
              callback: (value) => `${value}%`,
            },
            min: 0,
            max: 100,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-[280px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Performance Over Time</h3>
        <span className="text-xs text-gray-500">Cumulative since start</span>
      </div>
      {data.length === 0 ? (
        <div className="h-[calc(100%-2rem)] flex items-center justify-center text-gray-400 text-sm">
          No data yet. Start practicing to see your progress.
        </div>
      ) : (
        <div className="h-[calc(100%-2rem)]">
          <canvas ref={chartRef} />
        </div>
      )}
    </div>
  );
}