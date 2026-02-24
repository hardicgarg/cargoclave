import React from 'react';
import SectionContainer from './SectionContainer';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SurveyConfigurationSection = ({ isExpanded, onToggle, formData, setFormData }) => {
    const toggleRequirement = () => {
        setFormData(prev => ({
            ...prev,
            surveyInfo: { ...prev.surveyInfo, required: !prev.surveyInfo.required }
        }));
    };

    const addContainer = () => {
        setFormData(prev => ({
            ...prev,
            surveyInfo: {
                ...prev.surveyInfo,
                containers: [
                    ...prev.surveyInfo.containers,
                    { id: Date.now(), number: '', type: '', surveys: [] }
                ]
            }
        }));
    };

    const removeContainer = (id) => {
        setFormData(prev => ({
            ...prev,
            surveyInfo: {
                ...prev.surveyInfo,
                containers: prev.surveyInfo.containers.filter(c => c.id !== id)
            }
        }));
    };

    const updateContainer = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            surveyInfo: {
                ...prev.surveyInfo,
                containers: prev.surveyInfo.containers.map(c => c.id === id ? { ...c, [field]: value } : c)
            }
        }));
    };

    const addSurvey = (containerId) => {
        setFormData(prev => ({
            ...prev,
            surveyInfo: {
                ...prev.surveyInfo,
                containers: prev.surveyInfo.containers.map(c => c.id === containerId ? {
                    ...c,
                    surveys: [
                        ...c.surveys,
                        {
                            id: Date.now(),
                            type: 'Yard Survey',
                            surveyor: { name: '', email: '', phone: '' },
                            location: '',
                            date: '',
                            priority: 'Medium'
                        }
                    ]
                } : c)
            }
        }));
    };

    const updateSurvey = (containerId, surveyId, field, value) => {
        setFormData(prev => ({
            ...prev,
            surveyInfo: {
                ...prev.surveyInfo,
                containers: prev.surveyInfo.containers.map(c => {
                    if (c.id === containerId) {
                        return {
                            ...c,
                            surveys: c.surveys.map(s => {
                                if (s.id === surveyId) {
                                    if (field.startsWith('surveyor.')) {
                                        const sField = field.split('.')[1];
                                        return { ...s, surveyor: { ...s.surveyor, [sField]: value } };
                                    }
                                    return { ...s, [field]: value };
                                }
                                return s;
                            })
                        };
                    }
                    return c;
                })
            }
        }));
    };

    const removeSurvey = (containerId, surveyId) => {
        setFormData(prev => ({
            ...prev,
            surveyInfo: {
                ...prev.surveyInfo,
                containers: prev.surveyInfo.containers.map(c => c.id === containerId ? {
                    ...c,
                    surveys: c.surveys.filter(s => s.id !== surveyId)
                } : c)
            }
        }));
    };

    const isCompleted = !formData.surveyInfo.required ||
        (formData.surveyInfo.containers.length > 0 &&
            formData.surveyInfo.containers.every(c => c.number && c.type));

    return (
        <SectionContainer
            title="Section 3: Surveyor Information"
            icon="ClipboardCheck"
            isExpanded={isExpanded}
            onToggle={onToggle}
            isMandatory={false}
            isCompleted={isCompleted}
        >
            <div className="space-y-8">
                <label className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer group hover:bg-white transition-all">
                    <input
                        type="checkbox"
                        checked={formData.surveyInfo.required}
                        onChange={toggleRequirement}
                        className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                    />
                    <div>
                        <span className="block font-bold text-slate-800">Is Survey Required?</span>
                        <span className="text-xs text-slate-500">Enable this if specific cargo surveys are needed at any stage.</span>
                    </div>
                </label>

                {formData.surveyInfo.required && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="border-l-4 border-blue-500 pl-6 space-y-8">
                            {formData.surveyInfo.containers.map((container, cIndex) => (
                                <div key={container.id} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm relative">
                                    <button onClick={() => removeContainer(container.id)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500">
                                        <Icon name="Trash2" size="1rem" />
                                    </button>

                                    <div className="flex items-center space-x-3 mb-6">
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">Container Entry {cIndex + 1}</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6 mb-8">
                                        <Input
                                            label="Container Number"
                                            placeholder="e.g. MSCU1234567"
                                            value={container.number}
                                            onChange={(e) => updateContainer(container.id, 'number', e.target.value)}
                                            required
                                        />
                                        <Input
                                            label="Container Type"
                                            placeholder="e.g. 40ft HC"
                                            value={container.type}
                                            onChange={(e) => updateContainer(container.id, 'type', e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Surveys for this container */}
                                    <div className="space-y-4">
                                        <h5 className="text-[0.625rem] font-black text-slate-400 uppercase tracking-widest flex items-center space-x-2">
                                            <Icon name="Search" size="0.75rem" />
                                            <span>Nested Survey Records</span>
                                        </h5>

                                        <div className="grid grid-cols-1 gap-4">
                                            {container.surveys.map((survey) => (
                                                <div key={survey.id} className="p-4 bg-blue-50/30 rounded-lg border border-blue-100 relative group">
                                                    <button onClick={() => removeSurvey(container.id, survey.id)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-opacity">
                                                        <Icon name="X" size="1rem" />
                                                    </button>

                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                        <div className="space-y-4">
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <label className="block text-[0.6875rem] font-bold text-slate-500 mb-1 leading-none">Type <span className="text-destructive">*</span></label>
                                                                    <select
                                                                        value={survey.type}
                                                                        onChange={(e) => updateSurvey(container.id, survey.id, 'type', e.target.value)}
                                                                        className="w-full rounded-md border border-slate-200 bg-white p-2 text-xs"
                                                                    >
                                                                        <option>Yard Survey</option>
                                                                        <option>CFS Survey</option>
                                                                        <option>Port Survey</option>
                                                                    </select>
                                                                </div>
                                                                <div>
                                                                    <label className="block text-[0.6875rem] font-bold text-slate-500 mb-1 leading-none">Priority <span className="text-destructive">*</span></label>
                                                                    <select
                                                                        value={survey.priority}
                                                                        onChange={(e) => updateSurvey(container.id, survey.id, 'priority', e.target.value)}
                                                                        className="w-full rounded-md border border-slate-200 bg-white p-2 text-xs"
                                                                    >
                                                                        <option>Low</option>
                                                                        <option>Medium</option>
                                                                        <option>High</option>
                                                                        <option>Urgent</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <Input
                                                                label="Survey Location (Google Search)"
                                                                iconName="Search"
                                                                placeholder="Auto-suggest facility..."
                                                                className="h-9 text-xs"
                                                                value={survey.location}
                                                                onChange={(e) => updateSurvey(container.id, survey.id, 'location', e.target.value)}
                                                            />
                                                            <Input
                                                                label="Survey Date"
                                                                type="date"
                                                                className="h-9 text-xs"
                                                                value={survey.date}
                                                                onChange={(e) => updateSurvey(container.id, survey.id, 'date', e.target.value)}
                                                                description={`Must be before ${formData.contractInfo.endDate || 'End Date'}`}
                                                            />
                                                        </div>

                                                        <div className="p-4 bg-white rounded-lg border border-blue-100 shadow-sm space-y-3">
                                                            <label className="block text-[0.625rem] font-black text-blue-500 uppercase">Surveyor SPOC</label>
                                                            <Input
                                                                placeholder="Surveyor Name"
                                                                className="h-8 text-xs font-semibold"
                                                                value={survey.surveyor.name}
                                                                onChange={(e) => updateSurvey(container.id, survey.id, 'surveyor.name', e.target.value)}
                                                            />
                                                            <div className="grid grid-cols-1 gap-2">
                                                                <Input
                                                                    placeholder="Email Address"
                                                                    className="h-8 text-xs"
                                                                    value={survey.surveyor.email}
                                                                    onChange={(e) => updateSurvey(container.id, survey.id, 'surveyor.email', e.target.value)}
                                                                />
                                                                <Input
                                                                    placeholder="Phone Number"
                                                                    className="h-8 text-xs"
                                                                    value={survey.surveyor.phone}
                                                                    onChange={(e) => updateSurvey(container.id, survey.id, 'surveyor.phone', e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            <button onClick={() => addSurvey(container.id)} className="flex items-center space-x-2 text-blue-600 text-xs font-bold hover:text-blue-700 p-2 border border-dashed border-blue-200 rounded-lg bg-blue-50/50 justify-center">
                                                <Icon name="Plus" size="1rem" />
                                                <span>Add Survey Record for this Container</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <Button
                                variant="outline"
                                iconName="Plus"
                                onClick={addContainer}
                                className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 shadow-none border-t-0 rounded-t-none"
                            >
                                Add Another Container Section
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
                <Button
                    variant="default"
                    onClick={onToggle}
                    disabled={!isCompleted}
                    iconName="ChevronDown"
                    iconPosition="right"
                >
                    Final Step: Workflow Preview
                </Button>
            </div>
        </SectionContainer>
    );
};

export default SurveyConfigurationSection;
