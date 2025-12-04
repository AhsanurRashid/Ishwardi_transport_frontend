import { getRecentActivityLogsAction } from "@/app/actions/activity-log-action";
import { RecentActivityFeed } from "./recent-activity-feed";

export async function RecentActivityFeedWrapper() {
  const activityData = await getRecentActivityLogsAction(10);

  if (activityData?.error || !activityData?.logs) {
    return (
      <div className="text-sm text-muted-foreground">
        Failed to load activity logs
      </div>
    );
  }

  // Transform API data to component format
  const activities = activityData.logs.map((log: any) => ({
    id: log.id,
    type: log.log_name.toLowerCase(), // "User", "Rent", "Payment" -> "user", "rent", "payment"
    action: log.description, // "created", "updated", "deleted"
    description: getActivityDescription(log),
    user: log.create_user?.name || "Unknown User",
    timestamp: log.created_at,
  }));

  return <RecentActivityFeed activities={activities} />;
}

// Helper function to generate readable description
function getActivityDescription(log: any): string {
  const logName = log.log_name.toLowerCase();
  const action = log.description;

  if (logName === "payment") {
    const subject = log.subject;
    const amount = Math.abs(parseFloat(subject?.amount || "0"));
    const paymentType = subject?.payment_type || "payment";
    return `a ${paymentType} of ৳${amount.toLocaleString()}`;
  }

  if (logName === "rent") {
    const subject = log.subject;
    return `a rent for ${subject?.company || "a company"} (${
      subject?.vehicle || "vehicle"
    })`;
  }

  if (logName === "user") {
    const subject = log.subject;
    return `user: ${subject?.name || "Unknown"}`;
  }

  if (logName === "vehicle") {
    const subject = log.subject;
    return `vehicle: ${subject?.registration_number || "Unknown"}`;
  }

  if (logName === "driver") {
    const subject = log.subject;
    return `driver: ${subject?.name || "Unknown"}`;
  }

  if (logName === "company") {
    const subject = log.subject;
    return `company: ${subject?.company_name || "Unknown"}`;
  }

  return `${logName}`;
}
