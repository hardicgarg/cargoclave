import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TripInformationPanel = ({ tripData }) => {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Icon name="User" size="1.25rem" />
          Driver Information
        </h3>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-200 flex-shrink-0">
            <Image
              src={tripData?.driver?.avatar}
              alt={tripData?.driver?.avatarAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-slate-900 mb-1">
              {tripData?.driver?.name}
            </p>
            <div className="space-y-1 text-sm text-slate-600">
              <p className="flex items-center gap-2">
                <Icon name="Phone" size="0.875rem" />
                {tripData?.driver?.phone}
              </p>
              <p className="flex items-center gap-2">
                <Icon name="Mail" size="0.875rem" />
                {tripData?.driver?.email}
              </p>
              <p className="flex items-center gap-2">
                <Icon name="CreditCard" size="0.875rem" />
                License: {tripData?.driver?.license}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Icon name="Truck" size="1.25rem" />
          Vehicle Information
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">Vehicle Number</span>
            <span className="text-sm font-semibold text-slate-900">
              {tripData?.vehicle?.number}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">Make & Model</span>
            <span className="text-sm font-semibold text-slate-900">
              {tripData?.vehicle?.makeModel}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">Capacity</span>
            <span className="text-sm font-semibold text-slate-900">
              {tripData?.vehicle?.capacity}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">Fuel Level</span>
            <span className="text-sm font-semibold text-slate-900">
              {tripData?.vehicle?.fuelLevel}%
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Icon name="Building2" size="1.25rem" />
          Customer Information
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-slate-700 mb-1 block">
              Company Name
            </label>
            <p className="text-sm font-semibold text-slate-900">
              {tripData?.customer?.companyName}
            </p>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-700 mb-1 block">
              Contact Person
            </label>
            <p className="text-sm text-slate-900">{tripData?.customer?.contactPerson}</p>
            <p className="text-xs text-slate-600">{tripData?.customer?.contactPhone}</p>
            <p className="text-xs text-slate-600">{tripData?.customer?.contactEmail}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-700 mb-1 block">
              Billing Address
            </label>
            <p className="text-sm text-slate-600">{tripData?.customer?.billingAddress}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Icon name="Package" size="1.25rem" />
          Commodity Details
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">Commodity</span>
            <span className="text-sm font-semibold text-slate-900">
              {tripData?.commodity?.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">Container Type</span>
            <span className="text-sm font-semibold text-slate-900">
              {tripData?.commodity?.containerType}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">Quantity</span>
            <span className="text-sm font-semibold text-slate-900">
              {tripData?.commodity?.quantity}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">Weight</span>
            <span className="text-sm font-semibold text-slate-900">
              {tripData?.commodity?.weight}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">Value</span>
            <span className="text-sm font-semibold text-slate-900">
              ${tripData?.commodity?.value?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Icon name="FileText" size="1.25rem" />
          Delivery Instructions
        </h3>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-3">
          <p className="text-sm text-amber-900">
            {tripData?.deliveryInstructions}
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Icon name="CheckCircle2" size="1rem" className="text-emerald-600" />
            <span>Signature required on delivery</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Icon name="CheckCircle2" size="1rem" className="text-emerald-600" />
            <span>Photo documentation mandatory</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Icon name="CheckCircle2" size="1rem" className="text-emerald-600" />
            <span>Temperature monitoring required</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripInformationPanel;