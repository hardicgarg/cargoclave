import React from 'react';
import Icon from '../../../components/AppIcon';

const SectionContainer = ({
    title,
    icon,
    isExpanded,
    onToggle,
    isMandatory = false,
    isCompleted = false,
    children
}) => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-all duration-300">
            <button
                onClick={onToggle}
                className={`w-full flex items-center justify-between p-5 text-left transition-colors ${isExpanded ? 'bg-slate-50 border-b border-slate-200' : 'hover:bg-slate-50'
                    }`}
            >
                <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                        <Icon name={icon} size="1.25rem" />
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-slate-900">{title}</h3>
                            {isMandatory && !isCompleted && (
                                <span className="text-[0.625rem] font-bold text-red-500 uppercase tracking-wider">Required</span>
                            )}
                            {isCompleted && (
                                <Icon name="CheckCircle2" size="1rem" className="text-green-600" />
                            )}
                        </div>
                    </div>
                </div>
                <Icon
                    name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
                    size="1.25rem"
                    className="text-slate-400"
                />
            </button>

            {isExpanded && (
                <div className="p-6 animate-fade-in">
                    {children}
                </div>
            )}
        </div>
    );
};

export default SectionContainer;
