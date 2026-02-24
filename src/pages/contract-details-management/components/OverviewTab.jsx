import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OverviewTab = ({ contract }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Building2" size="1.25rem" className="text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-900">Customer Details</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Company Name:</span>
              <span className="text-sm font-medium text-slate-900">{contract?.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Customer ID:</span>
              <span className="text-sm font-medium text-slate-900">{contract?.customerId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Contact Email:</span>
              <span className="text-sm font-medium text-slate-900">{contract?.customerEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Contact Phone:</span>
              <span className="text-sm font-medium text-slate-900">{contract?.customerPhone}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Package" size="1.25rem" className="text-emerald-600" />
            <h3 className="text-lg font-semibold text-slate-900">Commodity & Container</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Commodity:</span>
              <span className="text-sm font-medium text-slate-900">{contract?.commodity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Container Type:</span>
              <span className="text-sm font-medium text-slate-900">{contract?.containerType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Quantity:</span>
              <span className="text-sm font-medium text-slate-900">{contract?.quantity} units</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Weight:</span>
              <span className="text-sm font-medium text-slate-900">{contract?.weight}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="MapPin" size="1.25rem" className="text-purple-600" />
          <h3 className="text-lg font-semibold text-slate-900">Route Information</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <Icon name="MapPin" size="1.25rem" className="text-emerald-600" />
              </div>
              <div className="w-0.5 h-16 bg-slate-200 my-2"></div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Icon name="Flag" size="1.25rem" className="text-blue-600" />
              </div>
            </div>
            
            <div className="flex-1 space-y-6">
              <div>
                <div className="text-xs font-medium text-slate-500 mb-1">PICKUP LOCATION</div>
                <div className="text-sm font-medium text-slate-900">{contract?.pickupLocation}</div>
                <div className="text-xs text-slate-600 mt-1">{contract?.pickupAddress}</div>
                <div className="text-xs text-slate-500 mt-1">Date: {contract?.pickupDate}</div>
              </div>
              
              <div>
                <div className="text-xs font-medium text-slate-500 mb-1">DROP LOCATION</div>
                <div className="text-sm font-medium text-slate-900">{contract?.dropLocation}</div>
                <div className="text-xs text-slate-600 mt-1">{contract?.dropAddress}</div>
                <div className="text-xs text-slate-500 mt-1">Date: {contract?.dropDate}</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-xs text-slate-500">Distance</div>
              <div className="text-lg font-semibold text-slate-900">{contract?.distance}</div>
              <div className="text-xs text-slate-500 mt-2">Est. Duration</div>
              <div className="text-sm font-medium text-slate-900">{contract?.estimatedDuration}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Map" size="1.25rem" className="text-orange-600" />
          <h3 className="text-lg font-semibold text-slate-900">Route Visualization</h3>
        </div>
        
        <div className="w-full h-96 bg-slate-100 rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Route Map"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${contract?.pickupLat},${contract?.pickupLng}&z=10&output=embed`}
            className="border-0"
          />
        </div>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Users" size="1.25rem" className="text-indigo-600" />
          <h3 className="text-lg font-semibold text-slate-900">SPOC Contacts</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contract?.spocContacts?.map((spoc, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-slate-50 rounded-lg">
              <Image
                src={spoc?.avatar}
                alt={spoc?.avatarAlt}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="font-medium text-slate-900">{spoc?.name}</div>
                <div className="text-xs text-slate-500 mb-2">{spoc?.role}</div>
                <div className="flex items-center space-x-1 text-xs text-slate-600">
                  <Icon name="Mail" size="0.75rem" />
                  <span>{spoc?.email}</span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-slate-600 mt-1">
                  <Icon name="Phone" size="0.75rem" />
                  <span>{spoc?.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="DollarSign" size="1.25rem" className="text-green-600" />
          <h3 className="text-lg font-semibold text-slate-900">Financial Details</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-slate-600 mb-1">Contract Value</div>
            <div className="text-2xl font-semibold text-slate-900">{contract?.contractValue}</div>
          </div>
          <div>
            <div className="text-sm text-slate-600 mb-1">Payment Terms</div>
            <div className="text-lg font-medium text-slate-900">{contract?.paymentTerms}</div>
          </div>
          <div>
            <div className="text-sm text-slate-600 mb-1">Payment Status</div>
            <div className="text-lg font-medium text-emerald-600">{contract?.paymentStatus}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;