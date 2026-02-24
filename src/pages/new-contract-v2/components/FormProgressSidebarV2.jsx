import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FormProgressSidebarV2 = ({
    steps,
    onSaveDraft,
    onLoadTemplate
}) => {
    const completedCount = steps.filter(s => s.completed).length;
    const progressPercent = (completedCount / steps.length) * 100;

    return (
        <div className="w-80 border-l border-slate-200 bg-white flex flex-col animate-slide-in-right">
            <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-800">Form Progress</h3>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[0.625rem] font-bold rounded uppercase">V2 PRO</span>
                </div>

                <div className="space-y-4">
                    <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-slate-900">{completedCount}<span className="text-slate-300 text-lg">/{steps.length}</span></span>
                        <span className="text-xs font-semibold text-blue-600">{Math.round(progressPercent)}% Complete</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-600 transition-all duration-500 ease-out"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`flex items-start space-x-3 p-3 rounded-lg transition-colors ${step.active ? 'bg-blue-50/50' : ''
                                }`}
                        >
                            <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[0.625rem] font-bold border-2 ${step.completed
                                    ? 'bg-green-600 border-green-600 text-white'
                                    : step.active
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-slate-200 text-slate-400'
                                }`}>
                                {step.completed ? <Icon name="Check" size="0.675rem" /> : index + 1}
                            </div>
                            <div className="flex-1">
                                <span className={`block text-xs font-semibold ${step.completed ? 'text-slate-500 line-through' : 'text-slate-700'
                                    }`}>
                                    {step.label}
                                </span>
                                {step.active && (
                                    <span className="text-[0.625rem] text-blue-500 font-medium">Currently Editing</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-6 border-t border-slate-100 space-y-3 bg-slate-50/50">
                <Button
                    variant="outline"
                    className="w-full justify-center bg-white"
                    iconName="Save"
                    iconPosition="left"
                    onClick={onSaveDraft}
                >
                    Save as Draft
                </Button>
                <button
                    onClick={onLoadTemplate}
                    className="w-full py-2 px-4 rounded-lg bg-slate-800 text-white text-xs font-bold hover:bg-slate-900 transition-all flex items-center justify-center space-x-2"
                >
                    <Icon name="Layout" size="0.875rem" />
                    <span>Apply Template</span>
                </button>
                <p className="text-[0.625rem] text-center text-slate-400">
                    Last auto-saved 14s ago
                </p>
            </div>
        </div>
    );
};

export default FormProgressSidebarV2;
