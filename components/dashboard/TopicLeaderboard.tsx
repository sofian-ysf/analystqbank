"use client";

import { cfaLevel1Curriculum } from "@/lib/curriculum";
import {
  TrendUp,
  TrendDown,
  Minus,
  Scales,
  ChartBar,
  Globe,
  ClipboardText,
  Buildings,
  ChartLineUp,
  Bank,
  ArrowsClockwise,
  Hammer,
  Briefcase,
} from "@phosphor-icons/react";

// Map curriculum topic IDs to Phosphor icons
const topicIcons: { [key: string]: typeof Scales } = {
  "ethical-professional-standards": Scales,
  "quantitative-methods": ChartBar,
  "economics": Globe,
  "financial-statement-analysis": ClipboardText,
  "corporate-issuers": Buildings,
  "equity-investments": ChartLineUp,
  "fixed-income": Bank,
  "derivatives": ArrowsClockwise,
  "alternative-investments": Hammer,
  "portfolio-management": Briefcase,
};

interface TopicLeaderboardProps {
  topicStats: {
    [topicId: string]: {
      totalQuestions: number;
      attemptedQuestions: number;
      correctAnswers: number;
    };
  };
}

export default function TopicLeaderboard({ topicStats }: TopicLeaderboardProps) {
  const topicData = cfaLevel1Curriculum.map((topic) => {
    const stats = topicStats[topic.id];
    const attempted = stats?.attemptedQuestions || 0;
    const correct = stats?.correctAnswers || 0;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : null;

    return {
      ...topic,
      attempted,
      correct,
      accuracy,
    };
  });

  // Sort by accuracy (highest first) to show strongest areas, topics with no attempts at bottom
  const sortedTopics = [...topicData].sort((a, b) => {
    if (a.accuracy === null && b.accuracy === null) return 0;
    if (a.accuracy === null) return 1;
    if (b.accuracy === null) return -1;
    return b.accuracy - a.accuracy;
  });

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col h-[280px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Topic Leaderboard</h3>
        <span className="text-xs text-gray-500">Ranked by strongest</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {sortedTopics.map((topic, index) => {
          const Icon = topicIcons[topic.id] || Scales;
          const isStrong = topic.accuracy !== null && topic.accuracy >= 75;

          return (
            <div
              key={topic.id}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              {/* Rank */}
              <div className={`
                w-6 h-6 rounded-lg flex items-center justify-center text-xs font-semibold flex-shrink-0
                ${index === 0 ? "bg-green-100 text-green-600" : ""}
                ${index > 0 && isStrong ? "bg-blue-100 text-blue-600" : ""}
                ${!isStrong && topic.accuracy !== null ? "bg-gray-100 text-gray-600" : ""}
                ${topic.accuracy === null ? "bg-gray-200 text-gray-500" : ""}
              `}>
                {index + 1}
              </div>

              {/* Topic Icon */}
              <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 flex-shrink-0">
                <Icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{topic.name}</p>
                <p className="text-xs text-gray-500">
                  {topic.attempted > 0
                    ? `${topic.attempted}/${topic.questionCount} questions`
                    : "Not started"
                  }
                </p>
              </div>

              {/* Accuracy */}
              <div className="text-right flex-shrink-0">
                {topic.accuracy !== null ? (
                  <div className="flex items-center gap-1">
                    {topic.accuracy >= 75 ? (
                      <TrendUp size={12} className="text-green-500" />
                    ) : topic.accuracy >= 60 ? (
                      <Minus size={12} className="text-yellow-500" />
                    ) : (
                      <TrendDown size={12} className="text-red-500" />
                    )}
                    <span className={`text-sm font-semibold ${
                      topic.accuracy >= 75 ? "text-green-600" :
                      topic.accuracy >= 60 ? "text-yellow-600" : "text-red-600"
                    }`}>
                      {topic.accuracy}%
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-gray-400">—</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}