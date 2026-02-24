import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import StatusChip from './StatusChip';

const TripTableRow = ({ trip, isSelected, onSelect }) => {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate('/trip-details-tracking', { state: { tripId: trip?.id } });
  };

  const getDelayIndicator = () => {
    if (trip?.delayMinutes > 0) {
      return (
        <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
          <Icon name="AlertCircle" size="1rem" />
          <span className="text-xs font-medium">+{trip?.delayMinutes}m</span>
        </div>
      );
    }
    return null;
  };

  return (
    <tr
      className={`border-b border-border hover:bg-muted/50 transition-colors cursor-pointer ${
        isSelected ? 'bg-primary/5' : ''
      }`}
      onClick={handleRowClick}
    >
      <td className="px-4 py-3" onClick={(e) => e?.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(trip?.id, e?.target?.checked)}
          className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
        />
      </td>
      <td className="px-4 py-3">
        <div className="font-medium text-foreground">{trip?.id}</div>
        <div className="text-xs text-muted-foreground">{trip?.contractId}</div>
      </td>
      <td className="px-4 py-3">
        <div className="font-medium text-foreground">{trip?.customer}</div>
        <div className="text-xs text-muted-foreground">{trip?.commodity}</div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Image
            src={trip?.driverAvatar}
            alt={trip?.driverAvatarAlt}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <div className="text-sm font-medium text-foreground">{trip?.driver}</div>
            <div className="text-xs text-muted-foreground">{trip?.vehicle}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="text-sm text-foreground">{trip?.origin}</div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Icon name="ArrowDown" size="0.75rem" />
          <span>{trip?.destination}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <StatusChip status={trip?.status} />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full transition-all"
              style={{ width: `${trip?.progress}%` }}
            />
          </div>
          <span className="text-xs font-medium text-foreground">{trip?.progress}%</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {trip?.currentCheckpoint} of {trip?.totalCheckpoints}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="text-sm text-foreground">{trip?.eta}</div>
        {getDelayIndicator()}
      </td>
      <td className="px-4 py-3" onClick={(e) => e?.stopPropagation()}>
        <div className="flex items-center gap-1">
          <button
            className="p-1.5 hover:bg-muted rounded transition-colors"
            title="View details"
            onClick={handleRowClick}
          >
            <Icon name="Eye" size="1rem" className="text-muted-foreground" />
          </button>
          <button
            className="p-1.5 hover:bg-muted rounded transition-colors"
            title="Contact driver"
          >
            <Icon name="Phone" size="1rem" className="text-muted-foreground" />
          </button>
          <button
            className="p-1.5 hover:bg-muted rounded transition-colors"
            title="Track location"
          >
            <Icon name="MapPin" size="1rem" className="text-muted-foreground" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TripTableRow;