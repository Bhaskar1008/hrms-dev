import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useApi } from '../../contexts/ApiContext';
import { useUi, DynamicForm as DynamicFormType, UiComponent } from '../../contexts/UiContext';
import { Button } from '../ui/Button';
import { FileUpload } from '../ui/FileUpload';
import { DatePicker } from '../ui/DatePicker';
import { CheckboxGroup } from '../ui/CheckboxGroup';
import { Spinner } from '../ui/Spinner';

interface DynamicFormProps {
  formId: string;
  onSuccess?: (data: any) => void;
  onCancel?: () => void;
  initialData?: Record<string, any>;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ 
  formId, 
  onSuccess,
  onCancel,
  initialData = {}
}) => {
  const [formConfig, setFormConfig] = useState<DynamicFormType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getFormConfig, showToast } = useUi();
  const api = useApi();
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData
  });

  useEffect(() => {
    const fetchFormConfig = async () => {
      try {
        const config = await getFormConfig(formId);
        setFormConfig(config);
      } catch (error) {
        console.error('Failed to load form config:', error);
        showToast('Failed to load form configuration', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFormConfig();
  }, [formId, getFormConfig, showToast]);

  const onSubmit = async (data: any) => {
    if (!formConfig) return;
    
    setIsSubmitting(true);
    try {
      const response = await (formConfig.method === 'POST' 
        ? api.post(formConfig.submitUrl, data)
        : api.put(formConfig.submitUrl, data)
      );
      
      showToast('Form submitted successfully', 'success');
      
      if (onSuccess) {
        onSuccess(response);
      }
    } catch (error) {
      showToast('Failed to submit form', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!formConfig) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        Form configuration not found.
      </div>
    );
  }

  const renderField = (field: UiComponent) => {
    const commonProps = {
      id: field.id,
      placeholder: field.placeholder,
      disabled: isSubmitting,
      className: `block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${
        errors[field.id] ? 'border-red-500' : ''
      }`
    };
    
    const errorMessage = errors[field.id]?.message as string;

    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'tel':
      case 'url':
        return (
          <div className="space-y-1">
            <Controller
              name={field.id}
              control={control}
              defaultValue={field.defaultValue || ''}
              rules={{
                required: field.required ? 'This field is required' : false,
                pattern: field.validation?.pattern 
                  ? { 
                      value: new RegExp(field.validation.pattern), 
                      message: field.validation.message || 'Invalid format' 
                    } 
                  : undefined,
                min: field.validation?.min 
                  ? { 
                      value: field.validation.min, 
                      message: `Minimum value is ${field.validation.min}` 
                    } 
                  : undefined,
                max: field.validation?.max 
                  ? { 
                      value: field.validation.max, 
                      message: `Maximum value is ${field.validation.max}` 
                    } 
                  : undefined,
                minLength: field.validation?.minLength 
                  ? { 
                      value: field.validation.minLength, 
                      message: `Minimum length is ${field.validation.minLength}` 
                    } 
                  : undefined,
                maxLength: field.validation?.maxLength 
                  ? { 
                      value: field.validation.maxLength, 
                      message: `Maximum length is ${field.validation.maxLength}` 
                    } 
                  : undefined,
              }}
              render={({ field: formField }) => (
                <input
                  type={field.type}
                  {...formField}
                  {...commonProps}
                />
              )}
            />
            {errorMessage && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}
          </div>
        );
        
      case 'textarea':
        return (
          <div className="space-y-1">
            <Controller
              name={field.id}
              control={control}
              defaultValue={field.defaultValue || ''}
              rules={{
                required: field.required ? 'This field is required' : false,
                minLength: field.validation?.minLength 
                  ? { 
                      value: field.validation.minLength, 
                      message: `Minimum length is ${field.validation.minLength}` 
                    } 
                  : undefined,
                maxLength: field.validation?.maxLength 
                  ? { 
                      value: field.validation.maxLength, 
                      message: `Maximum length is ${field.validation.maxLength}` 
                    } 
                  : undefined,
              }}
              render={({ field: formField }) => (
                <textarea
                  rows={4}
                  {...formField}
                  {...commonProps}
                />
              )}
            />
            {errorMessage && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}
          </div>
        );
        
      case 'select':
        return (
          <div className="space-y-1">
            <Controller
              name={field.id}
              control={control}
              defaultValue={field.defaultValue || ''}
              rules={{
                required: field.required ? 'This field is required' : false,
              }}
              render={({ field: formField }) => (
                <select
                  {...formField}
                  {...commonProps}
                >
                  <option value="">Select an option</option>
                  {field.options?.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            />
            {errorMessage && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}
          </div>
        );
        
      case 'checkbox':
        return (
          <div className="space-y-1">
            <Controller
              name={field.id}
              control={control}
              defaultValue={field.defaultValue || false}
              render={({ field: formField }) => (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={field.id}
                    checked={formField.value}
                    onChange={formField.onChange}
                    disabled={isSubmitting}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  {field.label && (
                    <label htmlFor={field.id} className="ml-2 block text-sm text-gray-700">
                      {field.label}
                    </label>
                  )}
                </div>
              )}
            />
            {errorMessage && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}
          </div>
        );
        
      case 'radio':
        return (
          <div className="space-y-1">
            <Controller
              name={field.id}
              control={control}
              defaultValue={field.defaultValue || ''}
              rules={{
                required: field.required ? 'This field is required' : false,
              }}
              render={({ field: formField }) => (
                <div className="space-y-2">
                  {field.options?.map(option => (
                    <div key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        id={`${field.id}-${option.value}`}
                        value={option.value}
                        checked={formField.value === option.value}
                        onChange={() => formField.onChange(option.value)}
                        disabled={isSubmitting}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <label 
                        htmlFor={`${field.id}-${option.value}`} 
                        className="ml-2 block text-sm text-gray-700"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            />
            {errorMessage && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}
          </div>
        );
      
      case 'date':
        return (
          <div className="space-y-1">
            <Controller
              name={field.id}
              control={control}
              defaultValue={field.defaultValue || ''}
              rules={{
                required: field.required ? 'This field is required' : false,
              }}
              render={({ field: formField }) => (
                <DatePicker
                  value={formField.value}
                  onChange={formField.onChange}
                  disabled={isSubmitting}
                  minDate={field.validation?.min ? new Date(field.validation.min) : undefined}
                  maxDate={field.validation?.max ? new Date(field.validation.max) : undefined}
                />
              )}
            />
            {errorMessage && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}
          </div>
        );
      
      case 'file':
        return (
          <div className="space-y-1">
            <Controller
              name={field.id}
              control={control}
              defaultValue={field.defaultValue || null}
              rules={{
                required: field.required ? 'This file is required' : false,
              }}
              render={({ field: formField }) => (
                <FileUpload
                  value={formField.value}
                  onChange={formField.onChange}
                  disabled={isSubmitting}
                  accept={field.fileTypes}
                  maxSize={field.maxSize}
                />
              )}
            />
            {errorMessage && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}
          </div>
        );
        
      case 'checkboxGroup':
        return (
          <div className="space-y-1">
            <Controller
              name={field.id}
              control={control}
              defaultValue={field.defaultValue || []}
              rules={{
                required: field.required ? 'Please select at least one option' : false,
              }}
              render={({ field: formField }) => (
                <CheckboxGroup
                  options={field.options || []}
                  value={formField.value}
                  onChange={formField.onChange}
                  disabled={isSubmitting}
                />
              )}
            />
            {errorMessage && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}
          </div>
        );
        
      default:
        return <div>Unsupported field type: {field.type}</div>;
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">{formConfig.title}</h3>
        {formConfig.description && (
          <p className="mt-1 text-sm text-gray-600">{formConfig.description}</p>
        )}
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-6 py-5 space-y-6">
          {formConfig.fields.map(field => (
            <div key={field.id} className="space-y-1">
              {field.label && field.type !== 'checkbox' && (
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
              )}
              {renderField(field)}
            </div>
          ))}
        </div>
        
        <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
          {onCancel && (
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            isLoading={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  );
};