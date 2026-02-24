import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentsSection = ({ documents, onUpload, onDelete }) => {
  const [dragActive, setDragActive] = useState(false);

  const getFileIcon = (type) => {
    const icons = {
      'pdf': 'FileText',
      'doc': 'FileText',
      'docx': 'FileText',
      'xls': 'Sheet',
      'xlsx': 'Sheet',
      'jpg': 'Image',
      'jpeg': 'Image',
      'png': 'Image'
    };
    return icons?.[type] || 'File';
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024)?.toFixed(1) + ' KB';
    return (bytes / (1024 * 1024))?.toFixed(1) + ' MB';
  };

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      onUpload(e?.dataTransfer?.files);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Paperclip" size="1.25rem" className="text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-900">Documents</h3>
          <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
            {documents?.length}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Upload"
          iconPosition="left"
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          Upload
        </Button>
      </div>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center mb-4 transition-colors ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-slate-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Icon name="Upload" size="2rem" className="text-slate-400 mx-auto mb-2" />
        <p className="text-sm text-slate-600 mb-1">Drag and drop files here</p>
        <p className="text-xs text-slate-500">or click to browse</p>
        <input
          id="file-upload"
          type="file"
          multiple
          className="hidden"
          onChange={(e) => onUpload(e?.target?.files)}
        />
      </div>
      <div className="space-y-2">
        {documents?.map((doc, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center space-x-3 flex-1">
              <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                <Icon name={getFileIcon(doc?.type)} size="1.25rem" className="text-slate-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-900 truncate">{doc?.name}</div>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <span>{formatFileSize(doc?.size)}</span>
                  <span>•</span>
                  <span>{doc?.uploadedDate}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <button
                className="w-8 h-8 rounded-lg hover:bg-slate-200 flex items-center justify-center transition-colors"
                onClick={() => console.log('Download', doc?.name)}
              >
                <Icon name="Download" size="1rem" className="text-slate-600" />
              </button>
              <button
                className="w-8 h-8 rounded-lg hover:bg-red-100 flex items-center justify-center transition-colors"
                onClick={() => onDelete(doc?.id)}
              >
                <Icon name="Trash2" size="1rem" className="text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentsSection;