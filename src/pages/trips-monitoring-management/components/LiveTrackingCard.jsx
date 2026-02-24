import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LiveTrackingCard = () => {
  const activeTrips = [
  {
    id: 'TRP-2025-1127',
    driver: 'John Smith',
    driverAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fdbf1da3-1763299816234.png",
    driverAvatarAlt: 'Professional headshot of Caucasian male driver with short brown hair wearing navy blue uniform',
    vehicle: 'TRK-001',
    currentLocation: 'Highway I-95, Mile 234',
    destination: 'Miami, FL',
    eta: '2:30 PM',
    speed: '65 mph',
    status: 'on-time'
  },
  {
    id: 'TRP-2025-1128',
    driver: 'Maria Garcia',
    driverAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1633a6836-1763301455488.png",
    driverAvatarAlt: 'Professional headshot of Hispanic female driver with long dark hair wearing company uniform',
    vehicle: 'TRK-003',
    currentLocation: 'Route 66, Mile 112',
    destination: 'Phoenix, AZ',
    eta: '4:15 PM',
    speed: '58 mph',
    status: 'delayed'
  },
  {
    id: 'TRP-2025-1129',
    driver: 'David Chen',
    driverAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a8b4d412-1763296666105.png",
    driverAvatarAlt: 'Professional headshot of Asian male driver with short black hair and glasses wearing blue shirt',
    vehicle: 'TRK-005',
    currentLocation: 'I-10 East, Mile 456',
    destination: 'Houston, TX',
    eta: '6:45 PM',
    speed: '70 mph',
    status: 'on-time'
  }];


  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="Radio" size="1.25rem" className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Live Tracking</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">Live</span>
        </div>
      </div>
      <div className="space-y-4">
        {activeTrips?.map((trip) =>
        <div
          key={trip?.id}
          className="p-4 bg-muted/50 rounded-lg border border-border hover:border-primary/50 transition-colors">

            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <Image
                src={trip?.driverAvatar}
                alt={trip?.driverAvatarAlt}
                className="w-10 h-10 rounded-full object-cover" />

                <div>
                  <div className="font-medium text-foreground">{trip?.driver}</div>
                  <div className="text-xs text-muted-foreground">{trip?.vehicle}</div>
                </div>
              </div>
              <span
              className={`text-xs font-medium px-2 py-1 rounded ${
              trip?.status === 'on-time' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`
              }>

                {trip?.status === 'on-time' ? 'On Time' : 'Delayed'}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Icon name="MapPin" size="1rem" className="text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm text-foreground">{trip?.currentLocation}</div>
                  <div className="text-xs text-muted-foreground">Current Location</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Icon name="Navigation" size="1rem" className="text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm text-foreground">{trip?.destination}</div>
                  <div className="text-xs text-muted-foreground">Destination • ETA: {trip?.eta}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2 border-t border-border">
                <div className="flex items-center gap-1">
                  <Icon name="Gauge" size="0.875rem" className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{trip?.speed}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Clock" size="0.875rem" className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{trip?.eta}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <button className="w-full mt-4 py-2 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors font-medium">
        View All Active Trips
      </button>
    </div>);

};

export default LiveTrackingCard;