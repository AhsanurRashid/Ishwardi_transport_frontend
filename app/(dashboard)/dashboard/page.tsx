import { QuickStatsWrapper } from "@/components/dashboard/quick-stats-wrapper";
import { RevenueChartWrapper } from "@/components/dashboard/revenue-chart-wrapper";
import { Suspense } from "react";
import { StatsSkeleton } from "@/components/skeletons/stats-skeleton";
import { TopCompanies } from "@/components/dashboard/top-companies";
import { DueAmountSummary } from "@/components/dashboard/due-amount-summary";
import { RentBreakdown } from "@/components/dashboard/rent-breakdown";
import { VehicleUtilization } from "@/components/dashboard/vehicle-utilization";
import { DriverAvailability } from "@/components/dashboard/driver-availability";
import { DocumentExpiryAlerts } from "@/components/dashboard/document-expiry-alerts";
import { RecentRentActivities } from "@/components/dashboard/recent-rent-activities";
import { RentStatusChart } from "@/components/dashboard/rent-status-chart";
import { RentTypeChart } from "@/components/dashboard/rent-type-chart";
import { PopularRoutes } from "@/components/dashboard/popular-routes";
import { ManagementOverview } from "@/components/dashboard/management-overview";
import { AlertsNotifications } from "@/components/dashboard/alerts-notifications";
import { QuickActionsPanel } from "@/components/dashboard/quick-actions-panel";
import { RecentActivityFeedWrapper } from "@/components/dashboard/recent-activity-feed-wrapper";
import { getDashboardDataAction } from "@/app/actions/dashboard-action";

// TODO: Replace with actual data from API
const mockData = {
  quickStats: {
    totalActiveRents: 45,
    monthlyRevenue: 2500000,
    pendingDues: 350000,
    activeVehicles: { active: 32, total: 50 },
  },
  monthlyRevenue: [
    { month: "Jun", revenue: 1800000 },
    { month: "Jul", revenue: 2100000 },
    { month: "Aug", revenue: 1950000 },
    { month: "Sep", revenue: 2300000 },
    { month: "Oct", revenue: 2200000 },
    { month: "Nov", revenue: 2500000 },
  ],
  topCompanies: [
    { id: 1, name: "ABC Transport Ltd", totalRevenue: 850000, totalRents: 25 },
    { id: 2, name: "XYZ Logistics", totalRevenue: 650000, totalRents: 18 },
    { id: 3, name: "Global Shipping Co", totalRevenue: 450000, totalRents: 12 },
    { id: 4, name: "Express Cargo", totalRevenue: 350000, totalRents: 10 },
    { id: 5, name: "Swift Movers", totalRevenue: 200000, totalRents: 8 },
  ],
  dueAmount: {
    totalDue: 1500000,
    collected: 1150000,
    pending: 350000,
  },
  rentBreakdown: {
    rentAmount: 2100000,
    demurrageAmount: 400000,
  },
  vehicleUtilization: {
    totalVehicles: 50,
    activeVehicles: 32,
    idleVehicles: 15,
    underMaintenance: 3,
  },
  driverAvailability: {
    totalDrivers: 45,
    activeDrivers: 40,
    onDuty: 30,
    available: 10,
  },
  expiringDocuments: [
    {
      vehicleId: 1,
      vehicleNumber: "DH-1234",
      documentType: "fitness" as const,
      expiryDate: "2025-11-25",
      daysRemaining: 5,
    },
    {
      vehicleId: 2,
      vehicleNumber: "DH-5678",
      documentType: "tax" as const,
      expiryDate: "2025-12-01",
      daysRemaining: 11,
    },
    {
      vehicleId: 3,
      vehicleNumber: "DH-9012",
      documentType: "insurance" as const,
      expiryDate: "2025-11-28",
      daysRemaining: 8,
    },
  ],
  recentRents: [
    {
      id: 1,
      company: "ABC Transport Ltd",
      vehicle: "DH-1234",
      type: "up" as const,
      rentAmount: 85000,
      date: "2025-11-19",
      status: 1,
    },
    {
      id: 2,
      company: "XYZ Logistics",
      vehicle: "DH-5678",
      type: "down" as const,
      rentAmount: 72000,
      date: "2025-11-18",
      status: 2,
    },
    {
      id: 3,
      company: "Global Shipping Co",
      vehicle: "DH-9012",
      type: "up" as const,
      rentAmount: 95000,
      date: "2025-11-17",
      status: 1,
    },
  ],
  rentStatus: [
    { status: "Pending", count: 8, color: "#f59e0b" },
    { status: "Active", count: 45, color: "#3b82f6" },
    { status: "Completed", count: 120, color: "#10b981" },
    { status: "Cancelled", count: 5, color: "#ef4444" },
  ],
  rentType: {
    upTrips: 95,
    downTrips: 83,
  },
  popularRoutes: [
    { from: "Dhaka", to: "Chittagong", count: 45, revenue: 1250000 },
    { from: "Dhaka", to: "Rajshahi", count: 38, revenue: 980000 },
    { from: "Chittagong", to: "Dhaka", count: 42, revenue: 1150000 },
    { from: "Sylhet", to: "Dhaka", count: 28, revenue: 750000 },
    { from: "Khulna", to: "Dhaka", count: 25, revenue: 680000 },
  ],
  managementOverview: {
    usersByRole: [
      { role: "admin", count: 2 },
      { role: "moderator", count: 5 },
      { role: "editor", count: 8 },
      { role: "user", count: 15 },
    ],
    totalCompanies: {
      active: 28,
      inactive: 5,
    },
    totalVehicles: {
      total: 50,
      byType: [
        { type: "Truck", count: 30 },
        { type: "Covered Van", count: 15 },
        { type: "Pickup", count: 5 },
      ],
    },
    totalDrivers: {
      active: 40,
      inactive: 5,
    },
  },
  alerts: [
    {
      id: 1,
      type: "document" as const,
      severity: "high" as const,
      title: "Fitness Certificate Expiring Soon",
      description: "Vehicle DH-1234 fitness certificate expires in 5 days",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      type: "payment" as const,
      severity: "medium" as const,
      title: "Overdue Payment",
      description: "ABC Transport Ltd has pending dues of ৳50,000",
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      type: "vehicle" as const,
      severity: "low" as const,
      title: "Vehicle Idle for 7 Days",
      description: "Vehicle DH-7890 has been idle for 7 days",
      timestamp: "1 day ago",
    },
  ],
  recentActivities: [
    {
      id: 1,
      type: "rent" as const,
      action: "created" as const,
      description: "a new rent for ABC Transport Ltd",
      user: "Admin User",
      timestamp: "2025-11-20T10:30:00Z",
    },
    {
      id: 2,
      type: "vehicle" as const,
      action: "updated" as const,
      description: "vehicle DH-1234 information",
      user: "Moderator User",
      timestamp: "2025-11-20T09:15:00Z",
    },
    {
      id: 3,
      type: "driver" as const,
      action: "created" as const,
      description: "a new driver: John Doe",
      user: "Admin User",
      timestamp: "2025-11-19T16:45:00Z",
    },
    {
      id: 4,
      type: "company" as const,
      action: "updated" as const,
      description: "XYZ Logistics contact information",
      user: "Editor User",
      timestamp: "2025-11-19T14:20:00Z",
    },
  ],
};

const Dashboard = async () => {
  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your transport operations.
        </p>
      </div>

      {/* Quick Stats - Top Priority */}
      <Suspense fallback={<StatsSkeleton />}>
        <QuickStatsWrapper />
      </Suspense>

      {/* Critical Alerts */}
      <div className="grid gap-6 md:grid-cols-2">
        <DocumentExpiryAlerts expiringDocuments={mockData.expiringDocuments} />
        <AlertsNotifications alerts={mockData.alerts} />
      </div>

      {/* Advanced Revenue Analytics - Full Width */}
      <RevenueChartWrapper />

      {/* Financial Overview Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <RentBreakdown {...mockData.rentBreakdown} />
        <DueAmountSummary {...mockData.dueAmount} />
      </div>

      {/* Top Companies */}
      <TopCompanies companies={mockData.topCompanies} />

      {/* Operational Metrics Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <VehicleUtilization {...mockData.vehicleUtilization} />
        <DriverAvailability {...mockData.driverAvailability} />
        <QuickActionsPanel />
      </div>

      {/* Recent Activities */}
      <RecentRentActivities rents={mockData.recentRents} />

      {/* Status Breakdowns and Analytics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <RentStatusChart data={mockData.rentStatus} />
        <RentTypeChart {...mockData.rentType} />
        <PopularRoutes routes={mockData.popularRoutes} />
      </div>

      {/* Management Overview and Activity Feed */}
      <div className="grid gap-6 md:grid-cols-2">
        <ManagementOverview {...mockData.managementOverview} />
        <Suspense
          fallback={
            <div className="h-[400px] bg-muted animate-pulse rounded-lg" />
          }
        >
          <RecentActivityFeedWrapper />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
