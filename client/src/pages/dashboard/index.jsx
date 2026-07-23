import StatsCards from "./components/StatsCards";
import AnalyticsChart from "./components/AnalyticsChart";
import RealtimeCard from "./components/RealtimeCard";
import TopVideos from "./components/TopVideos";
import RecentUploads from "./components/RecentUploads";
import LatestComments from "./components/LatestComments";
import ActivityFeed from "./components/ActivityFeed";
import useAuthStore from "../../store/authStore/useAuthStore";

export default function Dashboard() {
  const userData = useAuthStore((state) => state.userData);
  const hour = new Date().getHours();

  const greeting = () => {
    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else if (hour >= 17 && hour < 21) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  };
  return (
    <div className="space-y-6 p-6 bg-default-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold">
          {`${greeting()}, ${userData.firstName} ${userData.lastName} 👋`}
        </h1>
        <p className="text-default-500 mt-1">
          Here's what's happening with your YouTube channel today.
        </p>
      </div>

      <StatsCards />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AnalyticsChart />
        </div>

        <RealtimeCard />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <TopVideos />
        <ActivityFeed />
      </div>
      <RecentUploads />
      <LatestComments />
    </div>
  );
}
