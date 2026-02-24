import React from 'react';
import SectionContainer from './SectionContainer';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ContractOverviewSection = ({ isExpanded, onToggle, formData, setFormData }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, overview: { ...prev.overview, [name]: value } }));
    };

    const isCompleted = formData.overview.customer && formData.overview.commodityType;

    return (
        <SectionContainer
            title="Contract Overview"
            icon="FileText"
            isExpanded={isExpanded}
            onToggle={onToggle}
            isMandatory={true}
            isCompleted={isCompleted}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Customer</label>
                        <div className="flex space-x-2">
                            <select
                                name="customer"
                                value={formData.overview.customer}
                                onChange={handleChange}
                                className="flex-1 rounded-lg border border-slate-200 p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="">Select Customer</option>
                                <option value="Global Logistics Inc.">Global Logistics Inc.</option>
                                <option value="Maritime Express">Maritime Express</option>
                                <option value="TechSupply Corp">TechSupply Corp</option>
                            </select>
                            <Button variant="outline" size="sm" iconName="Plus" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="P.I. Number"
                            name="piNumber"
                            value={formData.overview.piNumber}
                            onChange={handleChange}
                            placeholder="e.g. PI-2024-001"
                        />
                        <Input
                            label="Total No. of Containers"
                            type="number"
                            name="totalContainers"
                            value={formData.overview.totalContainers}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Start Date"
                            type="date"
                            name="startDate"
                            value={formData.overview.startDate}
                            onChange={handleChange}
                        />
                        <Input
                            label="End Date"
                            type="date"
                            name="endDate"
                            value={formData.overview.endDate}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <h4 className="text-sm font-semibold text-slate-900 mb-4">Movement Mode</h4>
                        <div className="flex flex-wrap gap-4">
                            {['Through Truck', 'Through Trailer', 'Both'].map((mode) => (
                                <label key={mode} className="flex items-center space-x-2 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="movementMode"
                                        value={mode}
                                        checked={formData.overview.movementMode === mode}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                                    />
                                    <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{mode}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Movement Pattern</label>
                        <select
                            name="movementPattern"
                            value={formData.overview.movementPattern}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="Factory → CFS → Port">Factory → CFS → Port</option>
                            <option value="Factory → Port">Factory → Port</option>
                            <option value="Custom Flow">Custom Flow</option>
                        </select>
                        <p className="mt-2 text-[0.6875rem] text-slate-400">
                            * This pattern pre-configures recommended lifecycle stages.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                <Button
                    variant="default"
                    onClick={onToggle}
                    iconName="ChevronDown"
                    iconPosition="right"
                >
                    Next: Route Planning
                </Button>
            </div>
        </SectionContainer>
    );
};

export default ContractOverviewSection;
