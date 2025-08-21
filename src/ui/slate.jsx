// SlateEditor.jsx
import React, { useMemo, useCallback } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';

const SlateEditor = ({ value, setValue, error }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const renderLeaf = useCallback(({ attributes, children, leaf }) => {
    if (leaf.bold) children = <strong>{children}</strong>;
    if (leaf.italic) children = <em>{children}</em>;
    if (leaf.underline) children = <u>{children}</u>;
    return <span {...attributes}>{children}</span>;
  }, []);

  return (
    <div className={`rounded border ${error ? 'border-red-500' : 'border-gray-300'}`}>
      <Slate editor={editor} value={value} onChange={setValue}>
        <Editable
          renderLeaf={renderLeaf}
          placeholder="Enter content..."
          style={{ minHeight: '150px', padding: '8px' }}
        />
      </Slate>
    </div>
  );
};

export default SlateEditor;
