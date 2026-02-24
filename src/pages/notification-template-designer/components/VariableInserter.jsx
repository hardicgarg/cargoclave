import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const VariableInserter = ({ currentVariables, onInsertVariable }) => {
  const variableCategories = [
    {
      category: 'Contracts',
      icon: 'FileText',
      color: 'bg-blue-100 text-blue-700',
      variables: [
        { name: 'contract_id', description: 'Unique contract identifier' },
        { name: 'contract_date', description: 'Contract creation date' },
        { name: 'contract_value', description: 'Total contract value' },
        { name: 'contract_status', description: 'Current contract status' }
      ]
    },
    {
      category: 'Trips',
      icon: 'Truck',
      color: 'bg-green-100 text-green-700',
      variables: [
        { name: 'trip_id', description: 'Unique trip identifier' },
        { name: 'driver_name', description: 'Assigned driver name' },
        { name: 'vehicle_number', description: 'Vehicle registration number' },
        { name: 'origin', description: 'Trip origin location' },
        { name: 'destination', description: 'Trip destination location' },
        { name: 'distance', description: 'Total trip distance' },
        { name: 'estimated_arrival', description: 'Expected arrival time' }
      ]
    },
    {
      category: 'Customers',
      icon: 'Users',
      color: 'bg-purple-100 text-purple-700',
      variables: [
        { name: 'customer_name', description: 'Customer full name' },
        { name: 'customer_email', description: 'Customer email address' },
        { name: 'customer_phone', description: 'Customer phone number' },
        { name: 'company_name', description: 'Customer company name' }
      ]
    },
    {
      category: 'System Events',
      icon: 'Bell',
      color: 'bg-orange-100 text-orange-700',
      variables: [
        { name: 'event_date', description: 'Event occurrence date' },
        { name: 'event_time', description: 'Event occurrence time' },
        { name: 'alert_type', description: 'Type of alert/notification' },
        { name: 'priority_level', description: 'Priority level (High/Medium/Low)' }
      ]
    },
    {
      category: 'Commodities',
      icon: 'Package',
      color: 'bg-yellow-100 text-yellow-700',
      variables: [
        { name: 'commodity', description: 'Commodity name/type' },
        { name: 'commodity_quantity', description: 'Quantity of commodity' },
        { name: 'commodity_weight', description: 'Total weight' },
        { name: 'container_type', description: 'Container specification' }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Icon name="Code" size="1.5rem" className="text-purple-600" />
          <h3 className="text-xl font-bold text-gray-900">Dynamic Variables</h3>
        </div>
        <p className="text-sm text-gray-600">
          Click on any variable below to insert it into your template. Variables are replaced with actual data when notifications are sent.
        </p>
      </div>
      {/* Current Variables */}
      {currentVariables?.length > 0 && (
        <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Icon name="Check" size="1rem" className="text-green-600" />
            Variables Used in This Template
          </h4>
          <div className="flex flex-wrap gap-2">
            {currentVariables?.map((variable) => (
              <span
                key={variable}
                className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
              >
                <Icon name="Braces" size="0.75rem" />
                {variable}
              </span>
            ))}
          </div>
        </div>
      )}
      {/* Variable Categories */}
      <div className="space-y-4">
        {variableCategories?.map((category, index) => (
          <motion.div
            key={category?.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            <div className={`px-4 py-3 ${category?.color} bg-opacity-50 border-b border-gray-200`}>
              <div className="flex items-center gap-2">
                <Icon name={category?.icon} size="1.25rem" />
                <h4 className="font-semibold">{category?.category}</h4>
                <span className="ml-auto text-xs opacity-75">
                  {category?.variables?.length} variables
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {category?.variables?.map((variable) => (
                  <motion.button
                    key={variable?.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onInsertVariable(variable?.name)}
                    className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all text-left"
                  >
                    <div className="mt-1 p-1.5 bg-gray-100 rounded">
                      <Icon name="Braces" size="0.875rem" className="text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-mono font-semibold text-gray-900 mb-0.5">
                        {'{{'}{variable?.name}{'}}'}
                      </p>
                      <p className="text-xs text-gray-600">{variable?.description}</p>
                    </div>
                    <Icon name="Plus" size="1rem" className="text-gray-400 mt-1" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Usage Guide */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex gap-3">
          <Icon name="Info" size="1.25rem" className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="text-sm font-semibold text-blue-900 mb-1">How to Use Variables</h5>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Click any variable to insert it at the current cursor position</li>
              <li>• Variables are case-sensitive and must match exactly</li>
              <li>• You can manually type variables using the format: {'{{'} variable_name {'}}'}</li>
              <li>• Preview tab shows how variables will be replaced with actual data</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariableInserter;