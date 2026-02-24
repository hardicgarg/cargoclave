import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, item, type }) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <Icon name="AlertTriangle" size="1.5rem" className="text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Confirm Deletion</h2>
              <p className="text-sm text-slate-600">This action cannot be undone</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4">
          <p className="text-slate-700 mb-4">
            Are you sure you want to delete <span className="font-semibold">{item?.name}</span>?
          </p>

          {type === 'commodity' && item?.compatibleContainers > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
              <div className="flex items-start gap-2">
                <Icon name="AlertCircle" size="1rem" className="text-amber-600 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">Warning</p>
                  <p>This commodity is associated with {item?.compatibleContainers} container(s). Deleting it may affect existing configurations.</p>
                </div>
              </div>
            </div>
          )}

          {type === 'container' && item?.compatibleCommodities > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
              <div className="flex items-start gap-2">
                <Icon name="AlertCircle" size="1rem" className="text-amber-600 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">Warning</p>
                  <p>This container is compatible with {item?.compatibleCommodities} commodity(ies). Deleting it may affect existing configurations.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            iconName="Trash2"
            iconPosition="left"
            iconSize={16}
            onClick={() => {
              onConfirm(item?.id);
              onClose();
            }}
          >
            Delete {type === 'commodity' ? 'Commodity' : 'Container'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;