import React from 'react';
import SectionContainer from './SectionContainer';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RoutePlanningSectionV2 = ({ isExpanded, onToggle, formData, setFormData }) => {
    const addRoute = () => {
        setFormData(prev => ({
            ...prev,
            routes: [
                ...prev.routes,
                {
                    id: Date.now(),
                    name: '',
                    containers: 0,
                    source: { name: '', address: '', type: 'Factory', spoc: '', phone: '' },
                    drop: { name: '', address: '', type: 'Port', spoc: '', phone: '' },
                    stops: []
                }
            ]
        }));
    };

    const removeRoute = (id) => {
        setFormData(prev => ({
            ...prev,
            routes: prev.routes.filter(r => r.id !== id)
        }));
    };

    const updateRoute = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            routes: prev.routes.map(r => r.id === id ? { ...r, [field]: value } : r)
        }));
    };

    const addStop = (routeId) => {
        setFormData(prev => ({
            ...prev,
            routes: prev.routes.map(r => r.id === routeId ? {
                ...r,
                stops: [...r.stops, { id: Date.now(), name: '', address: '', type: 'CFS' }]
            } : r)
        }));
    };

    const totalAllocated = formData.routes.reduce((sum, r) => sum + Number(r.containers || 0), 0);
    const totalAllowed = Number(formData.overview.totalContainers || 0);
    const isOverAllocated = totalAllocated > totalAllowed;
    const isCompleted = formData.routes.length > 0 && !isOverAllocated;

    return (
        <SectionContainer
            title="Route Planning"
            icon="Map"
            isExpanded={isExpanded}
            onToggle={onToggle}
            isMandatory={true}
            isCompleted={isCompleted}
        >
            <div className="space-y-8">
                {formData.routes.map((route, index) => (
                    <div key={route.id} className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm relative group animate-fade-in">
                        <button
                            onClick={() => removeRoute(route.id)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
                        >
                            <Icon name="Trash2" size="1.25rem" />
                        </button>

                        <div className="flex items-center space-x-2 mb-6">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                                {index + 1}
                            </div>
                            <h4 className="font-semibold text-slate-900">Route Definition</h4>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <Input
                                label="Route Name"
                                placeholder="e.g. Primary Factory to Port"
                                value={route.name}
                                onChange={(e) => updateRoute(route.id, 'name', e.target.value)}
                            />
                            <Input
                                label="Containers for this Route"
                                type="number"
                                value={route.containers}
                                onChange={(e) => updateRoute(route.id, 'containers', e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Source */}
                            <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100 space-y-4">
                                <div className="flex items-center space-x-2 text-blue-700 font-semibold text-sm">
                                    <Icon name="MapPin" size="1rem" />
                                    <span>Source (Pickup)</span>
                                </div>
                                <Input label="Facility Name" placeholder="e.g. ABC Manufacturing" />
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Location Type</label>
                                    <select className="w-full rounded-md border border-slate-200 p-2 text-sm bg-white outline-none">
                                        <option>Factory</option>
                                        <option>Yard</option>
                                        <option>CFS</option>
                                        <option>Port</option>
                                    </select>
                                </div>
                                <Input label="Address" placeholder="Search with Google Autocomplete..." iconName="Search" />
                            </div>

                            {/* Drop */}
                            <div className="p-4 bg-green-50/50 rounded-lg border border-green-100 space-y-4">
                                <div className="flex items-center space-x-2 text-green-700 font-semibold text-sm">
                                    <Icon name="Navigation" size="1rem" />
                                    <span>Drop (Final delivery)</span>
                                </div>
                                <Input label="Facility Name" placeholder="e.g. Port of Los Angeles" />
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Location Type</label>
                                    <select className="w-full rounded-md border border-slate-200 p-2 text-sm bg-white outline-none">
                                        <option>Port</option>
                                        <option>CFS</option>
                                        <option>Yard</option>
                                        <option>Factory</option>
                                    </select>
                                </div>
                                <Input label="Address" placeholder="Search with Google Autocomplete..." iconName="Search" />
                            </div>
                        </div>

                        {/* Stops */}
                        {route.stops.length > 0 && (
                            <div className="mt-6 pl-4 border-l-2 border-slate-200 space-y-4">
                                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Intermediate Stops</h5>
                                {route.stops.map((stop) => (
                                    <div key={stop.id} className="flex items-center space-x-4 bg-slate-50 p-3 rounded-lg border border-dashed border-slate-300">
                                        <Icon name="Layers" size="1rem" className="text-slate-400" />
                                        <select className="bg-transparent text-sm font-medium border-none outline-none">
                                            <option>CFS</option>
                                            <option>Yard</option>
                                            <option>Weighbridge</option>
                                        </select>
                                        <input className="bg-transparent text-sm flex-1 outline-none" placeholder="Enter facility name..." />
                                        <button className="text-slate-400 hover:text-red-500"><Icon name="X" size="0.875rem" /></button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-4 flex space-x-3">
                            <Button
                                variant="outline"
                                size="sm"
                                iconName="Plus"
                                onClick={() => addStop(route.id)}
                            >
                                Add Intermediate Stop
                            </Button>
                        </div>
                    </div>
                ))}

                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors group cursor-pointer" onClick={addRoute}>
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-blue-500 group-hover:scale-110 transition-all">
                        <Icon name="PlusCircle" size="2rem" />
                    </div>
                    <p className="mt-4 font-medium text-slate-600">Add New Route Segment</p>
                    <p className="text-xs text-slate-400 mt-1">Split contract volume across multiple delivery paths</p>
                </div>

                {isOverAllocated && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-lg flex items-center space-x-3 text-red-600 animate-pulse">
                        <Icon name="AlertCircle" size="1.25rem" />
                        <p className="text-sm font-medium">
                            Attention: Container allocation ({totalAllocated}) exceeds contract total ({totalAllowed}).
                        </p>
                    </div>
                )}
            </div>

            <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${isOverAllocated ? 'bg-red-500' : 'bg-green-500'}`}></div>
                    <span className="text-sm font-medium text-slate-600">
                        Allocation: {totalAllocated} / {totalAllowed} Containers
                    </span>
                </div>
                <Button
                    variant="default"
                    onClick={onToggle}
                    disabled={isOverAllocated || formData.routes.length === 0}
                    iconName="ChevronDown"
                    iconPosition="right"
                >
                    Next: Lifecycle Configuration
                </Button>
            </div>
        </SectionContainer>
    );
};

export default RoutePlanningSectionV2;
