import React from 'react';
import SectionContainer from './SectionContainer';
import Icon from '../../../components/AppIcon';

const LifecycleConfigurationSection = ({ isExpanded, onToggle, formData, setFormData }) => {
    const toggleStage = (cycle, stageKey) => {
        setFormData(prev => {
            const current = prev.lifecycle[cycle][stageKey];
            return {
                ...prev,
                lifecycle: {
                    ...prev.lifecycle,
                    [cycle]: {
                        ...prev.lifecycle[cycle],
                        [stageKey]: { ...current, enabled: !current.enabled }
                    }
                }
            };
        });
    };

    const toggleBlocking = (cycle, stageKey) => {
        setFormData(prev => {
            const current = prev.lifecycle[cycle][stageKey];
            return {
                ...prev,
                lifecycle: {
                    ...prev.lifecycle,
                    [cycle]: {
                        ...prev.lifecycle[cycle],
                        [stageKey]: { ...current, blocking: !current.blocking }
                    }
                }
            };
        });
    };

    const renderStageCard = (cycle, key, label, tooltip) => {
        const stage = formData.lifecycle[cycle][key];
        return (
            <div className={`p-4 rounded-xl border transition-all duration-300 ${stage.enabled ? 'border-blue-200 bg-blue-50/30' : 'border-slate-100 bg-white opacity-60'
                }`}>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center space-x-2">
                            <span className={`font-semibold text-sm ${stage.enabled ? 'text-slate-900' : 'text-slate-400'}`}>
                                {label}
                            </span>
                            <div className="group relative">
                                <Icon name="Info" size="0.75rem" className="text-slate-300 cursor-help" />
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-[0.625rem] rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                    {tooltip}
                                </div>
                            </div>
                        </div>

                        {stage.enabled && (
                            <div className="mt-3 flex items-center space-x-4">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={stage.blocking}
                                        onChange={() => toggleBlocking(cycle, key)}
                                        className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-[0.6875rem] font-bold text-slate-500 uppercase">Blocking Stage</span>
                                </label>
                                {stage.blocking && (
                                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[0.625rem] font-bold rounded-full border border-amber-200">
                                        STOPPER
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => toggleStage(cycle, key)}
                        className={`w-10 h-6 rounded-full relative transition-colors duration-300 ${stage.enabled ? 'bg-blue-600' : 'bg-slate-200'
                            }`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${stage.enabled ? 'left-5' : 'left-1'
                            }`} />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <SectionContainer
            title="Lifecycle Configuration"
            icon="Settings2"
            isExpanded={isExpanded}
            onToggle={onToggle}
            isCompleted={true}
        >
            <div className="space-y-10">
                {/* Truck Cycle */}
                <div>
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                            <Icon name="Truck" size="1rem" />
                        </div>
                        <h4 className="font-bold text-slate-900">Truck Cycle Configuration</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {renderStageCard('truck', 'factoryIn', 'Factory WB IN', 'Mandatory weigh-in at pickup location.')}
                        {renderStageCard('truck', 'factoryOut', 'Factory WB OUT', 'Mandatory weigh-out at pickup location.')}
                        {renderStageCard('truck', 'cfsIn', 'CFS WB IN', 'Mandatory weigh-in at intermediate CFS facility.')}
                        {renderStageCard('truck', 'returnTrip', 'Return Trip', 'Enables tracking for vehicle return leg.')}
                    </div>
                </div>

                {/* Trailer Cycle */}
                <div>
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                            <Icon name="Container" size="1rem" />
                        </div>
                        <h4 className="font-bold text-slate-900">Trailer & Container Cycle</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h5 className="text-[0.6875rem] font-bold text-slate-400 uppercase tracking-widest pl-1">Survey Checkpoints</h5>
                            <div className="grid grid-cols-1 gap-3">
                                {renderStageCard('trailer', 'yardSurvey', 'Yard Survey', 'Quality check at depot/yard.')}
                                {renderStageCard('trailer', 'cfsSurvey', 'CFS Survey', 'Quality check at container freight station.')}
                                {renderStageCard('trailer', 'portSurvey', 'Port Survey', 'Final quality check at export port.')}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h5 className="text-[0.6875rem] font-bold text-slate-400 uppercase tracking-widest pl-1">Weighbridge Checkpoints</h5>
                            <div className="grid grid-cols-1 gap-3">
                                {renderStageCard('trailer', 'cfsWbIn', 'CFS WB IN', 'Mandatory trailer weigh-in at CFS.')}
                                {renderStageCard('trailer', 'cfsWbOut', 'CFS WB OUT', 'Mandatory trailer weigh-out at CFS.')}
                                {renderStageCard('trailer', 'portWbIn', 'Port WB IN', 'Optional weigh-in at port entries.')}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                        <Icon name="Workflow" size="1.25rem" />
                    </div>
                    <div>
                        <h5 className="font-semibold text-blue-900 text-sm">Dynamic Trip Generation</h5>
                        <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                            Based on these rules, the system will automatically generate **Checklist Groups** for every trip. If a stage is marked as "Blocking", the driver will not be able to proceed to the next GPS destination until the stage is cleared.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
                <button className="text-sm font-semibold text-slate-400 mr-6 hover:text-slate-600 transition-colors"> Reset Defaults </button>
                <button
                    onClick={onToggle}
                    className="bg-slate-900 text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-slate-800 transition-all flex items-center space-x-2"
                >
                    <span>Next: Survey Rules</span>
                    <Icon name="ChevronDown" size="1rem" />
                </button>
            </div>
        </SectionContainer>
    );
};

export default LifecycleConfigurationSection;
