import React from 'react';
import SectionContainer from './SectionContainer';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ContractOverviewSection = ({ isExpanded, onToggle, formData, setFormData }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                contractInfo: {
                    ...prev.contractInfo,
                    [parent]: { ...prev.contractInfo[parent], [child]: value }
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                contractInfo: { ...prev.contractInfo, [name]: value }
            }));
        }
    };

    const isCompleted = formData.contractInfo.customerName &&
        formData.contractInfo.piNumber &&
        formData.contractInfo.commodity &&
        formData.contractInfo.containerCount > 0 &&
        formData.contractInfo.spoc.name &&
        formData.contractInfo.spoc.email &&
        formData.contractInfo.spoc.phone;

    return (
        <SectionContainer
            title="Section 1: Contract Information"
            icon="FileText"
            isExpanded={isExpanded}
            onToggle={onToggle}
            isMandatory={true}
            isCompleted={isCompleted}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <Input
                        label="Customer Name"
                        name="customerName"
                        value={formData.contractInfo.customerName}
                        onChange={handleChange}
                        placeholder="Enter legal entity name"
                        required
                    />

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Customer SPOC Details</h4>
                        <div className="space-y-4">
                            <Input
                                label="Name"
                                name="spoc.name"
                                value={formData.contractInfo.spoc.name}
                                onChange={handleChange}
                                placeholder="Primary contact name"
                                required
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Email"
                                    name="spoc.email"
                                    type="email"
                                    value={formData.contractInfo.spoc.email}
                                    onChange={handleChange}
                                    placeholder="email@company.com"
                                    required
                                />
                                <Input
                                    label="Phone"
                                    name="spoc.phone"
                                    value={formData.contractInfo.spoc.phone}
                                    onChange={handleChange}
                                    placeholder="+1 234 567 890"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="P.I. Number"
                            name="piNumber"
                            value={formData.contractInfo.piNumber}
                            onChange={handleChange}
                            placeholder="e.g. PI-2024-001"
                            required
                        />
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Commodity <span className="text-destructive">*</span></label>
                            <select
                                name="commodity"
                                value={formData.contractInfo.commodity}
                                onChange={handleChange}
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                required
                            >
                                <option value="">Select Commodity</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Garments">Garments</option>
                                <option value="Automotive Parts">Automotive Parts</option>
                                <option value="Perishables">Perishables</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="No. of Containers"
                            type="number"
                            name="containerCount"
                            value={formData.contractInfo.containerCount}
                            onChange={handleChange}
                            required
                        />
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Container Type <span className="text-destructive">*</span></label>
                            <select
                                name="containerType"
                                value={formData.contractInfo.containerType}
                                onChange={handleChange}
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                required
                            >
                                <option value="">Select Type</option>
                                <option value="20ft Standard">20ft Standard</option>
                                <option value="40ft Standard">40ft Standard</option>
                                <option value="40ft High Cube">40ft High Cube</option>
                                <option value="Reefer">Reefer</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Start Date"
                            type="date"
                            name="startDate"
                            value={formData.contractInfo.startDate}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="End Date"
                            type="date"
                            name="endDate"
                            value={formData.contractInfo.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                <Button
                    variant="default"
                    onClick={onToggle}
                    iconName="ChevronDown"
                    iconPosition="right"
                    disabled={!isCompleted}
                >
                    Next: Route Information
                </Button>
            </div>
        </SectionContainer>
    );
};

export default ContractOverviewSection;
