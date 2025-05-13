import React, { useState, useEffect } from 'react';
import { useApi } from '../../contexts/ApiContext';
import { useUi, DynamicTable as DynamicTableType } from '../../contexts/UiContext';
import { format } from 'date-fns';
import { Spinner } from '../ui/Spinner';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Pagination } from '../ui/Pagination';
import { Filter, Search, RefreshCw } from 'lucide-react';

interface DynamicTableProps {
  tableId: string;
  onRowClick?: (row: any) => void;
  onActionClick?: (action: string, row: any) => void;
  initialFilters?: Record<string, any>;
}

export const DynamicTable: React.FC<DynamicTableProps> = ({
  tableId,
  onRowClick,
  onActionClick,
  initialFilters = {}
}) => {
  const [tableConfig, setTableConfig] = useState<DynamicTableType | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState(initialFilters);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { getTableConfig, showToast } = useUi();
  const api = useApi();

  const fetchData = async (page: number = 1, pageSize: number = 10) => {
    if (!tableConfig) return;

    setIsLoading(true);
    try {
      const queryParams: Record<string, any> = {
        page,
        pageSize: pageSize || 10,
        ...filters
      };
      
      if (searchTerm) {
        queryParams.search = searchTerm;
      }

      const response = await api.get(tableConfig.fetchUrl, queryParams);
      setData(response.data || []);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      showToast('Failed to fetch data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchTableConfig = async () => {
      try {
        const config = await getTableConfig(tableId);
        setTableConfig(config);
      } catch (error) {
        console.error('Failed to load table config:', error);
        showToast('Failed to load table configuration', 'error');
      }
    };

    fetchTableConfig();
  }, [tableId, getTableConfig, showToast]);

  useEffect(() => {
    if (tableConfig) {
      const pageSize = tableConfig.pagination?.pageSize || 10;
      fetchData(currentPage, pageSize);
    }
  }, [tableConfig, currentPage, filters, searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (id: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [id]: value
    }));
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    const pageSize = tableConfig?.pagination?.pageSize || 10;
    fetchData(currentPage, pageSize);
  };

  const renderCellValue = (row: any, column: any) => {
    const value = row[column.key];
    
    switch (column.type) {
      case 'text':
        return value;
        
      case 'date':
        if (!value) return '-';
        try {
          return format(new Date(value), column.format || 'MMM d, yyyy');
        } catch (e) {
          return value;
        }
        
      case 'status':
        return (
          <Badge 
            variant={
              value === 'active' || value === 'approved' || value === 'completed' ? 'success' :
              value === 'pending' ? 'warning' :
              value === 'rejected' || value === 'inactive' || value === 'failed' ? 'error' :
              'default'
            }
          >
            {value}
          </Badge>
        );
        
      case 'actions':
        return (
          <div className="flex space-x-2">
            {column.actions?.map((action: any) => (
              <Button
                key={action.label}
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onActionClick) {
                    onActionClick(action.action, row);
                  }
                }}
              >
                {action.label}
              </Button>
            ))}
          </div>
        );
        
      default:
        return value !== undefined && value !== null ? String(value) : '-';
    }
  };

  if (!tableConfig) {
    return (
      <div className="flex justify-center p-8">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <h3 className="text-lg font-medium text-gray-900">{tableConfig.title}</h3>
        
        <div className="flex space-x-2">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </form>
          
          {tableConfig.filters && tableConfig.filters.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Filter className="h-4 w-4" />}
              onClick={() => setIsFiltersVisible(!isFiltersVisible)}
            >
              Filters
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            leftIcon={<RefreshCw className="h-4 w-4" />}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </div>
      </div>
      
      {isFiltersVisible && tableConfig.filters && tableConfig.filters.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tableConfig.filters.map(filter => (
              <div key={filter.id} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  {filter.label}
                </label>
                {filter.type === 'select' ? (
                  <select
                    value={filters[filter.id] || ''}
                    onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                    className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  >
                    <option value="">All</option>
                    {filter.options?.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={filter.type}
                    value={filters[filter.id] || ''}
                    onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                    placeholder={filter.placeholder}
                    className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No data available
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {tableConfig.columns.map((column, i) => (
                  <th
                    key={i}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, rowIndex) => (
                <tr 
                  key={rowIndex}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={onRowClick ? "cursor-pointer hover:bg-gray-50" : ""}
                >
                  {tableConfig.columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {renderCellValue(row, column)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      {tableConfig.pagination && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          
          <div className="flex items-center">
            <span className="text-sm text-gray-700 mr-2">Rows per page:</span>
            <select
              value={tableConfig.pagination.pageSize}
              onChange={(e) => {
                const newPageSize = parseInt(e.target.value);
                fetchData(1, newPageSize);
                setCurrentPage(1);
              }}
              className="rounded border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            >
              {tableConfig.pagination.pageSizeOptions.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};