import React from 'react';
import SectionContainer from './SectionContainer';
import Icon from '../../../components/AppIcon';

const SurveyConfigurationSection = ({ isExpanded, onToggle, formData, setFormData }) => {
    // Check if any survey stage is enabled in the lifecycle
    const anySurveyEnabled =
        formData.lifecycle.trailer.yardSurvey.enabled ||
        formData.lifecycle.trailer.cfsSurvey.enabled ||
        formData.lifecycle.trailer.portSurvey.enabled;

    if (!anySurveyEnabled) return null;

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            survey: { ...prev.survey, [field]: value }
        }));
    };

    const enabledStages = [
        formData.lifecycle.trailer.yardSurvey.enabled && 'Yard',
        formData.lifecycle.trailer.cfsSurvey.enabled && 'CFS',
        formData.lifecycle.trailer.portSurvey.enabled && 'Port'
    ].filter(Boolean);

    return (
        <SectionContainer
            title="Survey Configuration"
            icon="ClipboardCheck"
            isExpanded={isExpanded}
            onToggle={onToggle}
            isCompleted={true}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div>
                            <h5 className="text-sm font-semibold text-slate-900">Container-level Surveys</h5>
                            <p className="text-[0.625rem] text-slate-500 mt-0.5 whitespace-nowrap">Perform individual checks for every container in a trip.</p>
                        </div>
                        <button
                            onClick={() => handleChange('containerLevel', !formData.survey.containerLevel)}
                            className={`w-12 h-6 rounded-full transition-colors relative ${formData.survey.containerLevel ? 'bg-blue-600' : 'bg-slate-300'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.survey.containerLevel ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Default Surveyor Assignment</label>
                        <select
                            value={formData.survey.surveyorAssignment}
                            onChange={(e) => handleChange('surveyorAssignment', e.target.value)}
                            className="w-full rounded-lg border border-slate-200 p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        >
                            <option value="Auto-assign from pool">Auto-assign from Region Pool</option>
                            <option value="Third-party: SGS Global">Third-party: SGS Global</option>
                            <option value="In-house Team Only">In-house Team Only</option>
                            <option value="Manual Selection per Trip">Manual Selection per Trip</option>
                        </select>
                    </div>

                    <div className="flex items-start space-x-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <Icon name="AlertCircle" size="1rem" className="text-amber-600 mt-0.5" />
                        <p className="text-[0.6875rem] text-amber-800 leading-relaxed font-medium">
                            You have {enabledStages.length} survey stages enabled. System will auto-enforce linear dependency:
                            **{enabledStages.join(' → ')}**.
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Survey Permissions</h5>
                    <div className="space-y-3">
                        {[
                            { key: 'allowMultiple', label: 'Allow Multiple Surveys per Stage', desc: 'Permits re-surveying if initial check fails.' },
                            { key: 'photoMandatory', label: 'Mandatory Photo Upload', desc: 'Requires at least 4 photos for survey approval.' },
                            { key: 'digitalSignature', label: 'Digital Sign-off Required', desc: 'Driver must sign survey report on-site.' }
                        ].map((item) => (
                            <label key={item.key} className="flex items-start space-x-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50/50 cursor-pointer transition-colors group">
                                <input
                                    type="checkbox"
                                    checked={formData.survey?.[item.key]}
                                    onChange={() => handleChange(item.key, !formData.survey?.[item.key])}
                                    className="mt-1 w-4 h-4 rounded text-blue-600 border-slate-300"
                                />
                                <div>
                                    <span className="block text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">{item.label}</span>
                                    <span className="text-[0.625rem] text-slate-400">{item.desc}</span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
                <button
                    onClick={onToggle}
                    className="bg-slate-900 text-white px-8 py-2.5 rounded-lg font-bold text-sm hover:bg-slate-800 transition-all shadow-sm hover:shadow-md"
                >
                    Review Workflow Pipeline
                </button>
            </div>
        </SectionContainer>
    );
};

export default SurveyConfigurationSection;
