import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save, X } from 'lucide-react';

const EditableLinkInline = ({ value, onChange, onSave, onCancel, placeholder }) => {
  return (
    <div className="flex items-center gap-2 animate-in fade-in duration-300">
      <Input
        type="url"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="max-w-sm h-9"
      />
      <Button size="icon" className="h-9 w-9" onClick={onSave}>
        <Save size={16} />
      </Button>
      <Button variant="ghost" size="icon" className="h-9 w-9" onClick={onCancel}>
        <X size={16} />
      </Button>
    </div>
  );
};

export default EditableLinkInline;