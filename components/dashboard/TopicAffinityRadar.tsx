"use client";

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { cfaLevel1Curriculum } from "@/lib/curriculum";

Chart.register(...registerables);

interface TopicAffinityRadarProps {
  topicStats: {
    [topicId: string]: {
      totalQuestions: number;
      attemptedQuestions: number;
      correctAnswers: number;
    };
  };
}

export default function TopicAffinityRadar({ topicStats }: TopicAffinityRadarProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Prepare data - show accuracy per topic (all 10 categories)
  const topics = cfaLevel1Curriculum;
  const labels = topics.map((t) => {
    // Shorten labels to fit all 10 topics
    const words = t.name.split(" ");
    if (words.length > 2) {
      return words.slice(0, 2).join(" ");
    }
    return t.name;
  });
  const accuracyData = topics.map((topic) => {
    const stats = topicStats[topic.id];
    if (!stats || stats.attemptedQuestions === 0) return 0;
    return Math.round((stats.correctAnswers / stats.attemptedQuestions) * 100);
  });

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "radar",
      data: {
        labels,
        datasets: [
          {
            label: "Accuracy %",
            data: accuracyData,
            backgroundColor: "rgba(16, 185, 129, 0.2)",
            borderColor: "#10B981",
            pointBackgroundColor: "#10B981",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
            displayColors: false,
            callbacks: {
              label: (context) => `${context.label}: ${context.raw}%`,
            },
          },
        },
        scales: {
          r: {
            angleLines: {
              color: "#E5E7EB",
            },
            grid: {
              color: "#E5E7EB",
            },
            pointLabels: {
              color: "#6B7280",
              font: {
                size: 9,
              },
            },
            ticks: {
              display: false,
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
  }, [topicStats, labels, accuracyData]);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-[280px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Performance by Category</h3>
        <span className="text-xs text-gray-500">All 10 categories</span>
      </div>
      <div className="h-[calc(100%-2rem)]">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}