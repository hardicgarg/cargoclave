import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ContractTable = ({ contracts, selectedIds, onSelect, onSelectAll, onSort, sortConfig, onQuickAction }) => {
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, contractId: null });

  const getStatusColor = (status) => {
    const colors = {
      draft: 'bg-slate-100 text-slate-700 border-slate-300',
      active: 'bg-emerald-100 text-emerald-700 border-emerald-300',
      'in-progress': 'bg-blue-100 text-blue-700 border-blue-300',
      completed: 'bg-green-100 text-green-700 border-green-300',
      cancelled: 'bg-red-100 text-red-700 border-red-300',
      'on-hold': 'bg-amber-100 text-amber-700 border-amber-300'
    };
    return colors?.[status] || 'bg-slate-100 text-slate-700 border-slate-300';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleContextMenu = (e, contractId) => {
    e?.preventDefault();
    setContextMenu({
      show: true,
      x: e?.clientX,
      y: e?.clientY,
      contractId
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ show: false, x: 0, y: 0, contractId: null });
  };

  const handleContextAction = (action) => {
    onQuickAction(action, contextMenu?.contractId);
    handleCloseContextMenu();
  };

  const getSortIcon = (column) => {
    if (sortConfig?.column !== column) {
      return <Icon name="ChevronsUpDown" size="0.875rem" className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' ? (
      <Icon name="ChevronUp" size="0.875rem" className="text-primary" />
    ) : (
      <Icon name="ChevronDown" size="0.875rem" className="text-primary" />
    );
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedIds?.length === contracts?.length && contracts?.length > 0}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary/20"
                />
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/80 transition-colors duration-150"
                onClick={() => onSort('contractId')}
              >
                <div className="flex items-center gap-2">
                  Contract ID
                  {getSortIcon('contractId')}
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/80 transition-colors duration-150"
                onClick={() => onSort('customer')}
              >
                <div className="flex items-center gap-2">
                  Customer
                  {getSortIcon('customer')}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                Commodity
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                Route
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/80 transition-colors duration-150"
                onClick={() => onSort('status')}
              >
                <div className="flex items-center gap-2">
                  Status
                  {getSortIcon('status')}
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/80 transition-colors duration-150"
                onClick={() => onSort('value')}
              >
                <div className="flex items-center gap-2">
                  Value
                  {getSortIcon('value')}
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/80 transition-colors duration-150"
                onClick={() => onSort('createdDate')}
              >
                <div className="flex items-center gap-2">
                  Created
                  {getSortIcon('createdDate')}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                Assigned
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                Sync
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {contracts?.map((contract) => (
              <tr
                key={contract?.id}
                className={`hover:bg-muted/50 transition-colors duration-150 ${
                  selectedIds?.includes(contract?.id) ? 'bg-primary/5' : ''
                }`}
                onContextMenu={(e) => handleContextMenu(e, contract?.id)}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds?.includes(contract?.id)}
                    onChange={() => onSelect(contract?.id)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary/20"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">
                      {contract?.contractId}
                    </span>
                    {contract?.priority === 'high' && (
                      <Icon name="AlertCircle" size="0.875rem" className="text-red-500" />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground">{contract?.customer}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground">{contract?.commodity}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 text-sm text-foreground max-w-xs">
                    <Icon name="MapPin" size="0.75rem" className="text-primary flex-shrink-0" />
                    <span className="truncate">{contract?.origin}</span>
                    <Icon name="ArrowRight" size="0.75rem" className="text-muted-foreground flex-shrink-0" />
                    <span className="truncate">{contract?.destination}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                      contract?.status
                    )}`}
                  >
                    {contract?.status?.charAt(0)?.toUpperCase() + contract?.status?.slice(1)?.replace('-', ' ')}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-foreground">
                    {formatCurrency(contract?.value)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(contract?.createdDate)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src={contract?.assignedDriver?.avatar}
                      alt={contract?.assignedDriver?.avatarAlt}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-foreground">
                      {contract?.assignedDriver?.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {contract?.erpSynced && (
                      <Icon name="Database" size="1rem" className="text-emerald-500" />
                    )}
                    {contract?.accountingSynced && (
                      <Icon name="DollarSign" size="1rem" className="text-blue-500" />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onQuickAction('view', contract?.id)}
                      className="p-1 text-primary hover:bg-primary/10 rounded transition-colors duration-150"
                      title="View details"
                    >
                      <Icon name="Eye" size="1rem" />
                    </button>
                    <button
                      onClick={() => onQuickAction('assign', contract?.id)}
                      className="p-1 text-foreground hover:bg-muted rounded transition-colors duration-150"
                      title="Assign driver"
                    >
                      <Icon name="UserPlus" size="1rem" />
                    </button>
                    <button
                      onClick={() => onQuickAction('flag', contract?.id)}
                      className="p-1 text-foreground hover:bg-muted rounded transition-colors duration-150"
                      title="Flag priority"
                    >
                      <Icon name="Flag" size="1rem" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {contextMenu?.show && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={handleCloseContextMenu}
          />
          <div
            className="fixed bg-card border border-border rounded-lg shadow-lg py-2 z-50 min-w-48 animate-fade-in"
            style={{ top: contextMenu?.y, left: contextMenu?.x }}
          >
            <button
              onClick={() => handleContextAction('view')}
              className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors duration-150 flex items-center gap-2"
            >
              <Icon name="Eye" size="1rem" />
              View Details
            </button>
            <button
              onClick={() => handleContextAction('edit')}
              className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors duration-150 flex items-center gap-2"
            >
              <Icon name="Edit" size="1rem" />
              Edit Contract
            </button>
            <button
              onClick={() => handleContextAction('assign')}
              className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors duration-150 flex items-center gap-2"
            >
              <Icon name="UserPlus" size="1rem" />
              Assign Driver
            </button>
            <button
              onClick={() => handleContextAction('duplicate')}
              className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors duration-150 flex items-center gap-2"
            >
              <Icon name="Copy" size="1rem" />
              Duplicate
            </button>
            <div className="border-t border-border my-1" />
            <button
              onClick={() => handleContextAction('export')}
              className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors duration-150 flex items-center gap-2"
            >
              <Icon name="Download" size="1rem" />
              Export
            </button>
            <button
              onClick={() => handleContextAction('delete')}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 flex items-center gap-2"
            >
              <Icon name="Trash2" size="1rem" />
              Delete
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ContractTable;