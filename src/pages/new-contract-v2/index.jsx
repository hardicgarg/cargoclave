import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

import ContractOverviewSection from './components/ContractOverviewSection';
import RoutePlanningSectionV2 from './components/RoutePlanningSectionV2';
import LifecycleConfigurationSection from './components/LifecycleConfigurationSection';
import SurveyConfigurationSection from './components/SurveyConfigurationSection';
import WorkflowTimelinePreview from './components/WorkflowTimelinePreview';
import FormProgressSidebarV2 from './components/FormProgressSidebarV2';

const NewContractV2 = () => {
    const navigate = useNavigate();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const [expandedSections, setExpandedSections] = useState({
        overview: true,
        routes: false,
        lifecycle: false,
        survey: false,
        preview: false
    });

    const [formData, setFormData] = useState({
        contractInfo: {
            customerName: '',
            spoc: { name: '', email: '', phone: '' },
            piNumber: '',
            commodity: '',
            containerCount: 0,
            containerType: '',
            startDate: '',
            endDate: ''
        },
        routes: [
            {
                id: Date.now(),
                name: '',
                containers: 0,
                source: {
                    name: '',
                    address: '',
                    type: 'Factory',
                    spoc: { name: '', email: '', phone: '' }
                },
                drop: {
                    name: '',
                    address: '',
                    type: 'Port',
                    spoc: { name: '', email: '', phone: '' }
                },
                stops: []
            }
        ],
        lifecycle: {
            truck: {
                factoryIn: { enabled: true, blocking: true },
                factoryOut: { enabled: true, blocking: false },
                cfsIn: { enabled: false, blocking: false },
                returnTrip: { enabled: false, blocking: false }
            },
            trailer: {
                yardSurvey: { enabled: false, blocking: false },
                cfsSurvey: { enabled: true, blocking: true },
                portSurvey: { enabled: true, blocking: true },
                cfsWbIn: { enabled: false, blocking: false },
                cfsWbOut: { enabled: true, blocking: true },
                portWbIn: { enabled: false, blocking: false }
            }
        },
        surveyInfo: {
            required: false,
            containers: [
                {
                    id: Date.now(),
                    number: '',
                    type: '',
                    surveys: []
                }
            ]
        }
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => {
            // Simple accordion logic: close others when opening one
            const newState = Object.keys(prev).reduce((acc, key) => {
                acc[key] = key === section ? !prev[key] : false;
                return acc;
            }, {});
            return newState;
        });
    };

    const isSurveyNeeded = useMemo(() => {
        return formData.surveyInfo.required;
    }, [formData.surveyInfo.required]);

    const steps = [
        { label: 'Contract Information', completed: !!formData.contractInfo.customerName, active: expandedSections.overview },
        { label: 'Route Information', completed: formData.routes.length > 0, active: expandedSections.routes },
        { label: 'Lifecycle Config', completed: true, active: expandedSections.lifecycle },
        ...(isSurveyNeeded ? [{ label: 'Surveyor Information', completed: true, active: expandedSections.survey }] : []),
        { label: 'Workflow Preview', completed: false, active: expandedSections.preview }
    ];

    const handleSaveDraft = () => console.log('Draft Saved', formData);
    const handleSubmit = () => navigate('/contracts-management');

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            <MainSidebar
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />

            <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'ml-[3.75rem]' : 'ml-[15rem]'}`}>
                <BreadcrumbNavigation />

                <div className="flex-1 flex overflow-hidden">
                    {/* Main Form Area */}
                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
                        <div className="p-8 max-w-5xl mx-auto pb-24">
                            <div className="mb-10 flex items-start justify-between">
                                <div>
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h1 className="text-3xl font-bold text-slate-900">Create Contract V2</h1>
                                        <span className="bg-blue-600 text-white text-[0.625rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">Enterprise</span>
                                    </div>
                                    <p className="text-slate-500 max-w-2xl leading-relaxed">
                                        Define advanced logistics lifecycles. Configure mandatory weighbridges, surveys, and movement patterns for high-precision supply chain tracking.
                                    </p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Button variant="outline" iconName="X" onClick={() => navigate(-1)}>Cancel</Button>
                                    <Button variant="default" className="shadow-lg shadow-blue-500/20" iconName="Send" onClick={handleSubmit}>Submit Contract</Button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <ContractOverviewSection
                                    isExpanded={expandedSections.overview}
                                    onToggle={() => toggleSection('overview')}
                                    formData={formData}
                                    setFormData={setFormData}
                                />

                                <RoutePlanningSectionV2
                                    isExpanded={expandedSections.routes}
                                    onToggle={() => toggleSection('routes')}
                                    formData={formData}
                                    setFormData={setFormData}
                                />

                                <LifecycleConfigurationSection
                                    isExpanded={expandedSections.lifecycle}
                                    onToggle={() => toggleSection('lifecycle')}
                                    formData={formData}
                                    setFormData={setFormData}
                                />

                                <SurveyConfigurationSection
                                    isExpanded={expandedSections.survey}
                                    onToggle={() => toggleSection('survey')}
                                    formData={formData}
                                    setFormData={setFormData}
                                />

                                <WorkflowTimelinePreview
                                    isExpanded={expandedSections.preview}
                                    onToggle={() => toggleSection('preview')}
                                    formData={formData}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Progress Sidebar */}
                    <FormProgressSidebarV2
                        steps={steps}
                        onSaveDraft={handleSaveDraft}
                        onLoadTemplate={() => console.log('Show Templates')}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewContractV2;
