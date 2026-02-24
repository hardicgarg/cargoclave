import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const DocumentManagement = ({ documents, onUploadDocument, onDeleteDocument }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Documents', icon: 'FileText' },
    { value: 'pod', label: 'Proof of Delivery', icon: 'CheckCircle2' },
    { value: 'signature', label: 'Signatures', icon: 'PenTool' },
    { value: 'damage', label: 'Damage Reports', icon: 'AlertTriangle' },
    { value: 'other', label: 'Other', icon: 'File' }
  ];

  const filteredDocuments = selectedCategory === 'all'
    ? documents
    : documents?.filter((doc) => doc?.category === selectedCategory);

  const getDocumentIcon = (type) => {
    const icons = {
      'image': 'Image',
      'pdf': 'FileText',
      'signature': 'PenTool'
    };
    return icons?.[type] || 'File';
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-slate-900">Document Management</h3>
        <Button
          variant="default"
          size="sm"
          iconName="Upload"
          iconPosition="left"
          onClick={onUploadDocument}
        >
          Upload Document
        </Button>
      </div>
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories?.map((category) => (
          <button
            key={category?.value}
            onClick={() => setSelectedCategory(category?.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === category?.value
                ? 'bg-blue-600 text-white' :'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Icon name={category?.icon} size="1rem" />
            {category?.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments?.map((document) => (
          <div
            key={document?.id}
            className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            {document?.type === 'image' ? (
              <div className="aspect-video bg-slate-100 overflow-hidden">
                <Image
                  src={document?.url}
                  alt={document?.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video bg-slate-100 flex items-center justify-center">
                <Icon name={getDocumentIcon(document?.type)} size="3rem" className="text-slate-400" />
              </div>
            )}
            <div className="p-3">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900 mb-1">
                    {document?.name}
                  </p>
                  <p className="text-xs text-slate-600">
                    {document?.uploadedBy} • {document?.uploadedAt}
                  </p>
                </div>
                <button
                  onClick={() => onDeleteDocument(document?.id)}
                  className="text-slate-400 hover:text-red-600 transition-colors"
                >
                  <Icon name="Trash2" size="1rem" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" fullWidth iconName="Download" iconPosition="left">
                  Download
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredDocuments?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileX" size="3rem" className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 mb-2">No documents found</p>
          <p className="text-sm text-slate-500">
            Upload documents to get started
          </p>
        </div>
      )}
    </div>
  );
};

export default DocumentManagement;