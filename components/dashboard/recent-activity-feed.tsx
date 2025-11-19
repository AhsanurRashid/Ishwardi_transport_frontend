import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Activity {
  id: number;
  type: "user" | "rent" | "vehicle" | "driver" | "company";
  action: "created" | "updated" | "deleted";
  description: string;
  user: string;
  timestamp: string;
}

interface RecentActivityFeedProps {
  activities: Activity[];
}

export function RecentActivityFeed({ activities }: RecentActivityFeedProps) {
  const getActivityColor = (type: string) => {
    switch (type) {
      case "user":
        return "bg-blue-100 text-blue-600 dark:bg-blue-950/20";
      case "rent":
        return "bg-green-100 text-green-600 dark:bg-green-950/20";
      case "vehicle":
        return "bg-purple-100 text-purple-600 dark:bg-purple-950/20";
      case "driver":
        return "bg-orange-100 text-orange-600 dark:bg-orange-950/20";
      case "company":
        return "bg-pink-100 text-pink-600 dark:bg-pink-950/20";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-950/20";
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "created":
        return "➕";
      case "updated":
        return "✏️";
      case "deleted":
        return "🗑️";
      default:
        return "📝";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activities
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No recent activities
          </p>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <Avatar
                    className={`h-10 w-10 ${getActivityColor(activity.type)}`}
                  >
                    <AvatarFallback className="text-lg">
                      {getActionIcon(activity.action)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-semibold">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">
                        {activity.action}
                      </span>{" "}
                      <span className="font-medium">
                        {activity.description}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(activity.timestamp), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
