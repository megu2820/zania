import { useState, useEffect, useRef } from 'react';
import { Document } from '../types';

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [timeSinceLastSave, setTimeSinceLastSave] = useState(0); 
  const [hasChanges, setHasChanges] = useState(false); 
  const lastSaveTimeRef = useRef<Date>(new Date()); 

  useEffect(() => {
    fetchDocuments();

    // Poll the server for changes every 5 seconds
    const interval = setInterval(() => {
      if (hasChanges) {
        saveDocuments();
      }
    }, 5000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [hasChanges]);

  // Track the time since the last save in real-time (every second)
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTimeSinceLastSave(Math.floor((new Date().getTime() - lastSaveTimeRef.current.getTime()) / 1000)); // Time in seconds
    }, 1000); // Update every second

    return () => clearInterval(timeInterval);
  }, []);

  const fetchDocuments = async () => {
    const response = await fetch('/api/documents');
    const data = await response.json();
    setDocuments(data.data.documents);
  };

  const saveDocuments = async () => {
    if (isSaving || !hasChanges) return;

    setIsSaving(true);

    try {
      const response = await fetch('/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documents }),
      });

      if (response.ok) {
        const data = await response.json();
        lastSaveTimeRef.current = new Date();
        setHasChanges(false); 
        setDocuments(data.data.documents);
      } else {
        console.error('Failed to save documents');
      }
    } catch (error) {
      console.error('Error saving documents:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDocumentChange = (updatedDocuments: Document[]) => {
    setDocuments(updatedDocuments);
    setHasChanges(true); 
  };

  return {
    documents,
    isSaving,
    timeSinceLastSave,
    handleDocumentChange,
  };
};
