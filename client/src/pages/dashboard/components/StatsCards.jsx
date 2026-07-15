import { Card, CardBody, Chip } from "@heroui/react";
import { Users, Eye, Clock3, DollarSign } from "lucide-react";
import { stats } from "./data";

const icons = {
  Subscribers: Users,
  Views: Eye,
  "Watch Time": Clock3,
  Revenue: DollarSign,
};

export default function StatsCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = icons[item.title];

        return (
          <Card
            key={item.title}
            className="shadow-md hover:shadow-xl transition-all duration-300"
          >
            <CardBody className="flex justify-between">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-default-500 text-sm">{item.title}</p>

                  <h2 className="text-3xl font-bold mt-2">{item.value}</h2>

                  <Chip
                    color={item.color}
                    size="sm"
                    className="mt-3"
                    variant="flat"
                  >
                    {item.growth}
                  </Chip>
                </div>

                <div className="rounded-full bg-default-100 p-4">
                  <Icon size={28} />
                </div>
              </div>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}
