import React, { useState } from 'react';
import { User } from '../../types';
import { Button } from '../common/Button';
import { Select } from '../common/Select';
import { useAdmin } from '../../context/AdminContext';

interface UserManagementModalProps {
  user: User;
  onClose: () => void;
}

const UserManagementModal: React.FC<UserManagementModalProps> = ({ user, onClose }) => {
  const { updateUserPlan } = useAdmin();
  const [plan, setPlan] = useState<User['plan']>(user.plan);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
        await updateUserPlan(user.uid, plan);
        onClose();
    } catch (error) {
        console.error("Failed to update plan:", error);
        alert("An error occurred while saving.");
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-dark-200 p-8 rounded-2xl shadow-2xl w-full max-w-md m-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-light-100">Manage User</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl">&times;</button>
        </div>
        
        <div className="space-y-4">
            <div>
                <label className="text-sm font-medium text-light-300">Name</label>
                <p className="p-2 bg-dark-300 rounded-md mt-1">{user.name}</p>
            </div>
             <div>
                <label className="text-sm font-medium text-light-300">Email</label>
                <p className="p-2 bg-dark-300 rounded-md mt-1">{user.email}</p>
            </div>
            <div>
                <label className="text-sm font-medium text-light-300">Company</label>
                <p className="p-2 bg-dark-300 rounded-md mt-1">{user.company}</p>
            </div>
            <Select label="Subscription Plan" value={plan} onChange={e => setPlan(e.target.value as User['plan'])}>
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
                <option value="express">Express</option>
            </Select>
        </div>
        
        <div className="flex justify-end space-x-4 mt-8">
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
        </div>
      </div>
    </div>
  );
};

export default UserManagementModal;