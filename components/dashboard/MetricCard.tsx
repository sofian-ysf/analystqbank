"use client";

import { ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
}

export default function MetricCard({
  label,
  value,
  subtext,
  icon,
  iconBg,
  iconColor,
}: MetricCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center`}>
          <span className={iconColor}>{icon}</span>
        </div>
      </div>
      <p className="text-3xl font-semibold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
      {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
    </div>
  );
}