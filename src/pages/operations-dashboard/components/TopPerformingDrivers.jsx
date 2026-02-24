import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TopPerformingDrivers = () => {
  const drivers = [
  {
    id: 1,
    name: "Michael Rodriguez",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e09ed354-1763295969767.png",
    avatarAlt: "Professional headshot of Hispanic male driver with short black hair wearing navy blue uniform",
    completedTrips: 156,
    onTimeRate: 98.5,
    rating: 4.9,
    status: "active"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_15632a94f-1763295548468.png",
    avatarAlt: "Professional headshot of Caucasian female driver with blonde hair in ponytail wearing company uniform",
    completedTrips: 142,
    onTimeRate: 97.8,
    rating: 4.8,
    status: "active"
  },
  {
    id: 3,
    name: "James Chen",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18142c6fb-1763296479151.png",
    avatarAlt: "Professional headshot of Asian male driver with short black hair wearing blue company shirt",
    completedTrips: 138,
    onTimeRate: 96.9,
    rating: 4.9,
    status: "active"
  },
  {
    id: 4,
    name: "Emily Davis",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1436c4089-1763294954354.png",
    avatarAlt: "Professional headshot of African American female driver with curly hair wearing company uniform",
    completedTrips: 134,
    onTimeRate: 97.2,
    rating: 4.7,
    status: "active"
  },
  {
    id: 5,
    name: "David Martinez",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_112d1286c-1763292306318.png",
    avatarAlt: "Professional headshot of Hispanic male driver with beard wearing navy blue company uniform",
    completedTrips: 129,
    onTimeRate: 96.5,
    rating: 4.8,
    status: "active"
  }];


  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Top Performing Drivers</h3>
        <Link
          to="/driver-management-system"
          className="flex items-center gap-2 text-sm text-primary hover:underline">

          <span>View All</span>
          <Icon name="ArrowRight" size="1rem" />
        </Link>
      </div>
      <div className="space-y-4">
        {drivers?.map((driver, index) =>
        <div
          key={driver?.id}
          className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all cursor-pointer group">

            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors">
                <Image
                src={driver?.avatar}
                alt={driver?.avatarAlt}
                className="w-full h-full object-cover" />

              </div>
              <div className="absolute -top-1 -left-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-white">
                {index + 1}
              </div>
              {driver?.status === 'active' &&
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-card"></div>
            }
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-foreground">{driver?.name}</h4>
                <div className="flex items-center gap-1">
                  <Icon name="Star" size="0.875rem" className="text-warning fill-warning" />
                  <span className="text-xs font-medium text-foreground">{driver?.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="CheckCircle2" size="0.75rem" />
                  {driver?.completedTrips} trips
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Clock" size="0.75rem" />
                  {driver?.onTimeRate}% on-time
                </span>
              </div>
            </div>

            <button className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100">
              Assign Trip
            </button>
          </div>
        )}
      </div>
    </div>);

};

export default TopPerformingDrivers;