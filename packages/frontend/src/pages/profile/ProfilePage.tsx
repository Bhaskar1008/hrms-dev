import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useApi } from '../../contexts/ApiContext';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import { Camera, Save } from 'lucide-react';
import { useUi } from '../../contexts/UiContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const api = useApi();
  const { showToast } = useUi();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // In a real app, this would fetch from an API
        // const data = await api.get('/api/employees/me');
        
        // For demo, we'll use mock data
        const mockProfile = {
          firstName: user?.name.split(' ')[0] || 'John',
          lastName: user?.name.split(' ')[1] || 'Doe',
          email: user?.email || 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          department: 'Engineering',
          position: 'Software Developer',
          hireDate: '2023-01-15',
          address: '123 Main St, Anytown, USA',
          emergencyContact: 'Jane Doe',
          emergencyPhone: '+1 (555) 987-6543',
          bio: 'Experienced software developer with a passion for building user-friendly applications.',
          avatarUrl: user?.avatar || null
        };
        
        setProfile(mockProfile);
        setFormData(mockProfile);
        setIsLoading(false);
      } catch (error) {
        showToast('Failed to load profile data', 'error');
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user, api, showToast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would update via API
      // if (avatar) {
      //   await api.upload('/api/employees/me/avatar', avatar);
      // }
      // await api.put('/api/employees/me', formData);
      
      // For demo, we'll just update the local state
      setProfile({
        ...formData,
        avatarUrl: avatarPreview || profile.avatarUrl
      });
      
      setIsEditing(false);
      showToast('Profile updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update profile', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        ) : (
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsEditing(false);
                setFormData(profile);
                setAvatarPreview(null);
                setAvatar(null);
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              isLoading={isSubmitting}
              leftIcon={<Save className="h-4 w-4" />}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-5 bg-gray-50">
          <div className="flex items-center">
            <div className="relative">
              <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-200">
                {avatarPreview || profile.avatarUrl ? (
                  <img 
                    src={avatarPreview || profile.avatarUrl} 
                    alt={`${profile.firstName} ${profile.lastName}`} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary text-2xl font-bold">
                    {profile.firstName?.charAt(0)}{profile.lastName?.charAt(0)}
                  </div>
                )}
              </div>
              
              {isEditing && (
                <div className="absolute bottom-0 right-0">
                  <label 
                    htmlFor="avatar-upload" 
                    className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white cursor-pointer"
                  >
                    <Camera className="h-4 w-4" />
                  </label>
                  <input 
                    id="avatar-upload" 
                    type="file" 
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>
              )}
            </div>
            
            <div className="ml-6">
              <h2 className="text-xl font-bold text-gray-900">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-sm text-gray-600">{profile.position}</p>
              <p className="text-sm text-gray-600">{profile.department}</p>
            </div>
          </div>
        </div>
        
        {isEditing ? (
          <form className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  disabled // Email is typically not changeable by the user
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700">
                  Emergency Contact
                </label>
                <input
                  type="text"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700">
                  Emergency Phone
                </label>
                <input
                  type="tel"
                  id="emergencyPhone"
                  name="emergencyPhone"
                  value={formData.emergencyPhone || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                value={formData.bio || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
          </form>
        ) : (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">First Name</h3>
                <p className="mt-1 text-base">{profile.firstName}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Last Name</h3>
                <p className="mt-1 text-base">{profile.lastName}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-base">{profile.email}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p className="mt-1 text-base">{profile.phone}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Department</h3>
                <p className="mt-1 text-base">{profile.department}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Position</h3>
                <p className="mt-1 text-base">{profile.position}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Hire Date</h3>
                <p className="mt-1 text-base">{profile.hireDate}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Address</h3>
                <p className="mt-1 text-base">{profile.address}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Emergency Contact</h3>
                <p className="mt-1 text-base">{profile.emergencyContact}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Emergency Phone</h3>
                <p className="mt-1 text-base">{profile.emergencyPhone}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Bio</h3>
              <p className="mt-1 text-base">{profile.bio}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;