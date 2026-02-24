import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const TimelineStepper = ({ checkpoints, onUpdateStatus, onUploadProof }) => {
  const [expandedCheckpoint, setExpandedCheckpoint] = useState(null);

  const getCheckpointIcon = (status) => {
    const icons = {
      'Completed': 'CheckCircle2',
      'In Progress': 'Clock',
      'Pending': 'Circle',
      'Delayed': 'AlertCircle',
      'Skipped': 'XCircle'
    };
    return icons?.[status] || 'Circle';
  };

  const getCheckpointColor = (status) => {
    const colors = {
      'Completed': 'text-emerald-600 bg-emerald-50 border-emerald-200',
      'In Progress': 'text-blue-600 bg-blue-50 border-blue-200',
      'Pending': 'text-slate-400 bg-slate-50 border-slate-200',
      'Delayed': 'text-amber-600 bg-amber-50 border-amber-200',
      'Skipped': 'text-red-600 bg-red-50 border-red-200'
    };
    return colors?.[status] || 'text-slate-400 bg-slate-50 border-slate-200';
  };

  const getLineColor = (status) => {
    const colors = {
      'Completed': 'bg-emerald-600',
      'In Progress': 'bg-blue-600',
      'Pending': 'bg-slate-200',
      'Delayed': 'bg-amber-600',
      'Skipped': 'bg-red-600'
    };
    return colors?.[status] || 'bg-slate-200';
  };

  const handleToggleExpand = (checkpointId) => {
    setExpandedCheckpoint(expandedCheckpoint === checkpointId ? null : checkpointId);
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Trip Timeline</h2>
        <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
          Refresh
        </Button>
      </div>
      <div className="space-y-0">
        {checkpoints?.map((checkpoint, index) => (
          <div key={checkpoint?.id} className="relative">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${getCheckpointColor(checkpoint?.status)}`}>
                  <Icon name={getCheckpointIcon(checkpoint?.status)} size="1.25rem" />
                </div>
                {index < checkpoints?.length - 1 && (
                  <div className={`w-0.5 h-full min-h-[80px] ${getLineColor(checkpoint?.status)}`} />
                )}
              </div>

              <div className="flex-1 pb-8">
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-1">
                        {checkpoint?.location}
                      </h3>
                      <p className="text-sm text-slate-600 mb-2">
                        {checkpoint?.address}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Icon name="Clock" size="0.875rem" />
                          {checkpoint?.scheduledTime}
                        </span>
                        {checkpoint?.actualTime && (
                          <span className="flex items-center gap-1">
                            <Icon name="CheckCircle2" size="0.875rem" />
                            Actual: {checkpoint?.actualTime}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Icon name="MapPin" size="0.875rem" />
                          {checkpoint?.coordinates}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName={expandedCheckpoint === checkpoint?.id ? "ChevronUp" : "ChevronDown"}
                      onClick={() => handleToggleExpand(checkpoint?.id)}
                    />
                  </div>

                  {expandedCheckpoint === checkpoint?.id && (
                    <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-medium text-slate-700 mb-1 block">
                            Contact Person
                          </label>
                          <p className="text-sm text-slate-900">{checkpoint?.contactPerson}</p>
                          <p className="text-xs text-slate-600">{checkpoint?.contactPhone}</p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-slate-700 mb-1 block">
                            Instructions
                          </label>
                          <p className="text-sm text-slate-900">{checkpoint?.instructions}</p>
                        </div>
                      </div>

                      {checkpoint?.proofImages && checkpoint?.proofImages?.length > 0 && (
                        <div>
                          <label className="text-xs font-medium text-slate-700 mb-2 block">
                            Proof of Completion
                          </label>
                          <div className="grid grid-cols-4 gap-2">
                            {checkpoint?.proofImages?.map((img, idx) => (
                              <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200">
                                <Image
                                  src={img?.url}
                                  alt={img?.alt}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {checkpoint?.notes && (
                        <div>
                          <label className="text-xs font-medium text-slate-700 mb-1 block">
                            Notes
                          </label>
                          <p className="text-sm text-slate-600 bg-white p-3 rounded border border-slate-200">
                            {checkpoint?.notes}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="Upload"
                          iconPosition="left"
                          onClick={() => onUploadProof(checkpoint?.id)}
                        >
                          Upload Proof
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="Edit"
                          iconPosition="left"
                          onClick={() => onUpdateStatus(checkpoint?.id)}
                        >
                          Update Status
                        </Button>
                        {checkpoint?.status === 'Delayed' && (
                          <Button
                            variant="outline"
                            size="sm"
                            iconName="AlertTriangle"
                            iconPosition="left"
                          >
                            Report Issue
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineStepper;