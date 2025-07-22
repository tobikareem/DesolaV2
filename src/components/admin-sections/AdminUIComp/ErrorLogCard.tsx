import { Eye } from "lucide-react";
import { ErrorLog } from "../../../utils/ErrorLogs";
import { Btn } from "../../ui/Button";
import { AlertTriangle, Info, XCircle} from "lucide-react";

interface Props {
  log: ErrorLog;
}

import type { LucideIcon } from "lucide-react";
import { Text } from "../../ui/TextComp";

const IconsType: Record<ErrorLog["type"], LucideIcon> = {
  critical: XCircle,
  high: AlertTriangle,
  medium: AlertTriangle,
  low: Info,
};

const IconColors: Record<ErrorLog["type"], string> = {
  critical: "text-red-600",
  high: "text-orange-500",
  medium: "text-yellow-500",
  low: "text-blue-500",
};

const badgeColors: Record<string, string> = {
  high: "bg-red-100 text-red-600",
  medium: "bg-yellow-100 text-yellow-600",
  low: "bg-blue-100 text-blue-600",
  critical: "bg-pink-200 text-red-700",

  "api failure": "bg-red-100 text-red-500",
  "pricing error": "bg-orange-100 text-orange-600",
  timeout: "bg-yellow-100 text-yellow-600",
  crash: "bg-purple-100 text-purple-600",
  Resolved: "bg-green-100 text-green-700",
};

export const ErrorLogCard = ({ log }: Props) => {
  const Icon = IconsType[log.type];
  const iconColor = IconColors[log.type];

  return (
    <div
      className={`rounded-xl border flex items-start justify-between p-6 mb-3 ${
        log.type === "critical"
          ? "bg-red-50"
          : log.type === "high"
          ? "bg-orange-50"
          : ""
      }`}
    >
      <div className="flex gap-3 w-full">
        <div className="pt-1">
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                badgeColors[log.type]
              }`}
            >
              {log.type}
            </span>

            {log.tags.map((tag: string) => (
              <span
                key={tag}
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeColors[tag]}`}
              >
                {tag}
              </span>
            ))}

            {log.status === "Resolved" && (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700">
                Resolved
              </span>
            )}
          </div>

          <Text
            as="h3"
            size="sm"
            weight="medium"
            fontStyle="font-grotesk"
            className="text-sm font-medium text-gray-900"
          >
            {log.message}
          </Text>

          <p className="text-xs text-gray-500 mt-1">
            {log.timestamp} &nbsp; User: {log.user} &nbsp; ID: {log.id}
          </p>
        </div>

        <div className="flex gap-2 flex-wrap items-start">
          <Btn className="flex items-center gap-1 text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 text-gray-700">
            <Eye className="w-4 h-4" />
            Details
          </Btn>

          {log.status === "Unresolved" && (
            <>
              <Btn className="text-sm px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700">
                Mark Resolved
              </Btn>
              <Btn className="text-sm px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700">
                Escalate
              </Btn>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
