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

    const updateLocation = (routeId, type, field, value) => {
        setFormData(prev => ({
            ...prev,
            routes: prev.routes.map(r => {
                if (r.id === routeId) {
                    if (field.startsWith('spoc.')) {
                        const spocField = field.split('.')[1];
                        return {
                            ...r,
                            [type]: {
                                ...r[type],
                                spoc: { ...r[type].spoc, [spocField]: value }
                            }
                        };
                    }
                    return {
                        ...r,
                        [type]: { ...r[type], [field]: value }
                    };
                }
                return r;
            })
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

    const removeStop = (routeId, stopId) => {
        setFormData(prev => ({
            ...prev,
            routes: prev.routes.map(r => r.id === routeId ? {
                ...r,
                stops: r.stops.filter(s => s.id !== stopId)
            } : r)
        }));
    };

    const totalAllocated = formData.routes.reduce((sum, r) => sum + Number(r.containers || 0), 0);
    const totalAllowed = Number(formData.contractInfo.containerCount || 0);
    const isOverAllocated = totalAllocated > totalAllowed;

    const isRouteValid = (route) => {
        return route.name && route.containers > 0 &&
            route.source.name && route.source.address &&
            route.source.spoc.name && route.source.spoc.email && route.source.spoc.phone &&
            route.drop.name && route.drop.address &&
            route.drop.spoc.name && route.drop.spoc.email && route.drop.spoc.phone;
    };

    const isCompleted = formData.routes.length > 0 &&
        formData.routes.every(isRouteValid) &&
        !isOverAllocated;

    return (
        <SectionContainer
            title="Section 2: Route Information"
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

                        <div className="flex items-center space-x-2 mb-6 text-slate-900 font-bold">
                            <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-xs text-white">
                                {index + 1}
                            </div>
                            <h4>Route Configuration</h4>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <Input
                                label="Route Name"
                                placeholder="e.g. Factory to Port Hub"
                                value={route.name}
                                onChange={(e) => updateRoute(route.id, 'name', e.target.value)}
                                required
                            />
                            <Input
                                label="No. of Containers for this Route"
                                type="number"
                                value={route.containers}
                                onChange={(e) => updateRoute(route.id, 'containers', e.target.value)}
                                required
                                error={isOverAllocated ? 'Allocation exceeds contract total' : null}
                            />
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                            {/* Source Location */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2 text-blue-700 font-bold text-sm bg-blue-50 p-2 rounded-lg">
                                    <Icon name="MapPin" size="1rem" />
                                    <span>SOURCE LOCATION</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Location Name"
                                        value={route.source.name}
                                        onChange={(e) => updateLocation(route.id, 'source', 'name', e.target.value)}
                                        required
                                    />
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Type <span className="text-destructive">*</span></label>
                                        <select
                                            value={route.source.type}
                                            onChange={(e) => updateLocation(route.id, 'source', 'type', e.target.value)}
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        >
                                            <option value="Factory">Factory</option>
                                            <option value="Port">Port</option>
                                            <option value="Yard">Yard</option>
                                            <option value="CFS">CFS</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="relative group/search">
                                    <Input
                                        label="Address (Google Search)"
                                        placeholder="Search address..."
                                        iconName="Search"
                                        value={route.source.address}
                                        onChange={(e) => updateLocation(route.id, 'source', 'address', e.target.value)}
                                        required
                                    />
                                    {route.source.address.length >= 3 && (
                                        <div className="absolute z-10 w-full bg-white border border-slate-200 rounded-lg shadow-xl mt-1 py-1 animate-in fade-in slide-in-from-top-2">
                                            {[
                                                '123 Industrial Area, Phase II, Bangalore',
                                                '45 Export Zone, Whitefield, BLR',
                                                'TechHub Logistics Park, Sarjapur, BLR'
                                            ].filter(item => item.toLowerCase().includes(route.source.address.toLowerCase())).map(item => (
                                                <button
                                                    key={item}
                                                    onClick={() => updateLocation(route.id, 'source', 'address', item)}
                                                    className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 text-slate-700"
                                                >
                                                    {item}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                                    <label className="block text-[0.625rem] font-bold text-slate-400 uppercase tracking-widest mb-2">Location SPOC</label>
                                    <div className="grid grid-cols-1 gap-3">
                                        <Input
                                            placeholder="SPOC Name"
                                            className="h-8 text-xs"
                                            value={route.source.spoc.name}
                                            onChange={(e) => updateLocation(route.id, 'source', 'spoc.name', e.target.value)}
                                            required
                                        />
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input
                                                placeholder="Email"
                                                className="h-8 text-xs"
                                                value={route.source.spoc.email}
                                                onChange={(e) => updateLocation(route.id, 'source', 'spoc.email', e.target.value)}
                                                required
                                            />
                                            <Input
                                                placeholder="Phone"
                                                className="h-8 text-xs"
                                                value={route.source.spoc.phone}
                                                onChange={(e) => updateLocation(route.id, 'source', 'spoc.phone', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Drop Location */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2 text-green-700 font-bold text-sm bg-green-50 p-2 rounded-lg">
                                    <Icon name="Navigation" size="1rem" />
                                    <span>DROP LOCATION</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Location Name"
                                        value={route.drop.name}
                                        onChange={(e) => updateLocation(route.id, 'drop', 'name', e.target.value)}
                                        required
                                    />
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Type <span className="text-destructive">*</span></label>
                                        <select
                                            value={route.drop.type}
                                            onChange={(e) => updateLocation(route.id, 'drop', 'type', e.target.value)}
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        >
                                            <option value="Port">Port</option>
                                            <option value="Yard">Yard</option>
                                            <option value="Factory">Factory</option>
                                            <option value="CFS">CFS</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="relative group/search">
                                    <Input
                                        label="Address (Google Search)"
                                        placeholder="Search address..."
                                        iconName="Search"
                                        value={route.drop.address}
                                        onChange={(e) => updateLocation(route.id, 'drop', 'address', e.target.value)}
                                        required
                                    />
                                    {route.drop.address.length >= 3 && (
                                        <div className="absolute z-10 w-full bg-white border border-slate-200 rounded-lg shadow-xl mt-1 py-1 animate-in fade-in slide-in-from-top-2">
                                            {[
                                                'Termianl 2, JNPT Port, Mumbai',
                                                'Gateway CFS, Nhava Sheva, MH',
                                                'Central Maritime Yard, Uran, MH'
                                            ].filter(item => item.toLowerCase().includes(route.drop.address.toLowerCase())).map(item => (
                                                <button
                                                    key={item}
                                                    onClick={() => updateLocation(route.id, 'drop', 'address', item)}
                                                    className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 text-slate-700"
                                                >
                                                    {item}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                                    <label className="block text-[0.625rem] font-bold text-slate-400 uppercase tracking-widest mb-2">Location SPOC</label>
                                    <div className="grid grid-cols-1 gap-3">
                                        <Input
                                            placeholder="SPOC Name"
                                            className="h-8 text-xs"
                                            value={route.drop.spoc.name}
                                            onChange={(e) => updateLocation(route.id, 'drop', 'spoc.name', e.target.value)}
                                            required
                                        />
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input
                                                placeholder="Email"
                                                className="h-8 text-xs"
                                                value={route.drop.spoc.email}
                                                onChange={(e) => updateLocation(route.id, 'drop', 'spoc.email', e.target.value)}
                                                required
                                            />
                                            <Input
                                                placeholder="Phone"
                                                className="h-8 text-xs"
                                                value={route.drop.spoc.phone}
                                                onChange={(e) => updateLocation(route.id, 'drop', 'spoc.phone', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stops */}
                        {route.stops.length > 0 && (
                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <h5 className="text-[0.6875rem] font-black text-slate-400 uppercase tracking-widest mb-4">Intermediate Transit Stops</h5>
                                <div className="grid grid-cols-1 gap-3">
                                    {route.stops.map((stop) => (
                                        <div key={stop.id} className="flex items-center space-x-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
                                            <Icon name="Layers" size="1rem" className="text-slate-400" />
                                            <select className="bg-transparent text-xs font-bold border-none outline-none">
                                                <option>CFS</option>
                                                <option>Yard</option>
                                                <option>Weighbridge</option>
                                            </select>
                                            <input className="bg-transparent text-sm flex-1 outline-none font-medium" placeholder="Enter facility name..." />
                                            <button onClick={() => removeStop(route.id, stop.id)} className="text-slate-400 hover:text-red-500"><Icon name="X" size="1rem" /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-6">
                            <Button
                                variant="outline"
                                size="sm"
                                iconName="Plus"
                                onClick={() => addStop(route.id)}
                            >
                                Add Multiple Stops
                            </Button>
                        </div>
                    </div>
                ))}

                <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 hover:bg-white hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all group cursor-pointer" onClick={addRoute}>
                    <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all">
                        <Icon name="PlusCircle" size="2rem" />
                    </div>
                    <p className="mt-4 font-bold text-slate-600 group-hover:text-blue-600">Add Multiple Routes</p>
                    <p className="text-xs text-slate-400 mt-1">Sum total of containers must match section 1</p>
                </div>

                {isOverAllocated && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center space-x-3 text-red-600 animate-bounce">
                        <Icon name="AlertTriangle" size="1.25rem" />
                        <p className="text-sm font-bold">
                            Logic Error: Total allocated ({totalAllocated}) exceeds contract allowance ({totalAllowed}).
                        </p>
                    </div>
                )}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
                <div className="flex items-center space-x-4 bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
                    <span className="text-[0.625rem] font-black text-slate-400 uppercase tracking-tighter">Container Allocation</span>
                    <div className="flex items-center space-x-2">
                        <span className={`text-sm font-bold ${isOverAllocated ? 'text-red-600' : 'text-slate-900'}`}>
                            {totalAllocated}
                        </span>
                        <span className="text-slate-300 text-xs">/</span>
                        <span className="text-sm font-bold text-slate-400">{totalAllowed}</span>
                    </div>
                </div>
                <Button
                    variant="default"
                    onClick={onToggle}
                    disabled={!isCompleted}
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
