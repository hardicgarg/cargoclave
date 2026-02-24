import React from 'react';
import SectionContainer from './SectionContainer';
import Icon from '../../../components/AppIcon';

const WorkflowTimelinePreview = ({ isExpanded, onToggle, formData }) => {
    // Logic to generate the sequence of stages
    const getTimelineSteps = () => {
        const steps = [];

        // 1. Initial Pickup
        steps.push({ label: 'Movement START', type: 'system', icon: 'PlayCircle' });

        // 2. Truck WB (Pickup)
        if (formData.lifecycle.truck.factoryIn.enabled) steps.push({ label: 'Factory WB IN', type: 'check', icon: 'Scale' });
        steps.push({ label: 'LOADING', type: 'op', icon: 'PackageOpen' });
        if (formData.lifecycle.truck.factoryOut.enabled) steps.push({ label: 'Factory WB OUT', type: 'check', icon: 'Scale' });

        // 3. Travel to CFS (if applicable)
        steps.push({ label: 'TRANSIT', type: 'travel', icon: 'Truck' });

        // 4. CFS Stages
        if (formData.lifecycle.truck.cfsIn.enabled) steps.push({ label: 'CFS WB IN', type: 'check', icon: 'Scale' });
        if (formData.lifecycle.trailer.cfsSurvey.enabled) steps.push({ label: 'CFS SURVEY', type: 'survey', icon: 'ClipboardList' });
        if (formData.lifecycle.trailer.cfsWbOut.enabled) steps.push({ label: 'CFS WB OUT', type: 'check', icon: 'Scale' });

        // 5. Final Survey
        if (formData.lifecycle.trailer.portSurvey.enabled) steps.push({ label: 'PORT SURVEY', type: 'survey', icon: 'ClipboardCheck' });

        // 6. Arrival
        steps.push({ label: 'MOVEMENT END', type: 'system', icon: 'CheckCircle2' });

        return steps;
    };

    const steps = getTimelineSteps();

    const getStepColor = (type) => {
        switch (type) {
            case 'system': return 'text-slate-400 bg-slate-100';
            case 'check': return 'text-blue-600 bg-blue-100';
            case 'op': return 'text-amber-600 bg-amber-100';
            case 'survey': return 'text-indigo-600 bg-indigo-100';
            case 'travel': return 'text-slate-600 bg-slate-200';
            default: return 'text-slate-400 bg-slate-100';
        }
    };

    return (
        <SectionContainer
            title="Workflow Preview"
            icon="Workflow"
            isExpanded={isExpanded}
            onToggle={onToggle}
            isCompleted={true}
        >
            <div className="py-6 overflow-x-auto">
                <div className="flex items-center min-w-max pb-8 px-4">
                    {steps.map((step, index) => (
                        <React.Fragment key={index}>
                            <div className="flex flex-col items-center group relative">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 shadow-sm border-2 border-white ${getStepColor(step.type)} transition-transform group-hover:scale-110`}>
                                    <Icon name={step.icon} size="1.25rem" />
                                </div>
                                <div className="text-[0.625rem] font-bold text-slate-800 uppercase tracking-tight text-center w-20 leading-tight">
                                    {step.label}
                                </div>

                                {/* Visual Connector for blocking */}
                                {index < steps.length - 1 && (
                                    <div className="absolute top-6 left-full w-12 h-0.5 bg-slate-200 -translate-y-1/2">
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                                    </div>
                                )}
                            </div>

                            {/* Connector */}
                            {index < steps.length - 1 && (
                                <div className="w-12" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="block text-[0.625rem] text-slate-400 font-bold uppercase mb-1">Total Checkpoints</span>
                    <span className="text-xl font-bold text-slate-900">{steps.filter(s => s.type !== 'system' && s.type !== 'travel').length}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="block text-[0.625rem] text-slate-400 font-bold uppercase mb-1">Mandatory Proofs</span>
                    <span className="text-xl font-bold text-slate-900">{formData.survey.photoMandatory ? 'Required' : 'Optional'}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="block text-[0.625rem] text-slate-400 font-bold uppercase mb-1">Blocking Stages</span>
                    <span className="text-xl font-bold text-amber-600">4</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="block text-[0.625rem] text-slate-400 font-bold uppercase mb-1">Est. Touchpoints</span>
                    <span className="text-xl font-bold text-slate-900">{steps.length}</span>
                </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
                <p className="text-xs text-slate-400">
                    * This preview illustrates a single trip journey lifecycle. Actual multi-trip execution may vary.
                </p>
                <div className="flex space-x-3">
                    <Icon name="Download" size="1rem" className="text-slate-400 cursor-pointer hover:text-slate-600" />
                    <Icon name="Printer" size="1rem" className="text-slate-400 cursor-pointer hover:text-slate-600" />
                </div>
            </div>
        </SectionContainer>
    );
};

export default WorkflowTimelinePreview;
