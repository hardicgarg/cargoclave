import React from 'react';
import Icon from '../../../components/AppIcon';

const RouteVisualization = ({ tripData }) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden h-full">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Live Route Tracking</h3>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs text-emerald-600">
              <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
              Live
            </span>
          </div>
        </div>
      </div>
      <div className="relative h-[600px]">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Trip Route Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${tripData?.currentLat},${tripData?.currentLng}&z=12&output=embed`}
          className="border-0"
        />

        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Icon name="Truck" size="1.25rem" className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {tripData?.vehicleNumber}
                </p>
                <p className="text-xs text-slate-600">
                  Last updated: {tripData?.lastUpdate}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">
                {tripData?.currentSpeed} km/h
              </p>
              <p className="text-xs text-slate-600">Current Speed</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-slate-50 rounded-lg p-2">
              <p className="text-xs text-slate-600 mb-1">Distance Covered</p>
              <p className="text-sm font-semibold text-slate-900">
                {tripData?.distanceCovered} km
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-2">
              <p className="text-xs text-slate-600 mb-1">Remaining</p>
              <p className="text-sm font-semibold text-slate-900">
                {tripData?.distanceRemaining} km
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-2">
              <p className="text-xs text-slate-600 mb-1">ETA</p>
              <p className="text-sm font-semibold text-slate-900">
                {tripData?.eta}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteVisualization;