import { useState, useEffect, useCallback } from 'react';
import { TokenManager } from '../utils/tokenManager';
import { apiDocs } from '../data/apiDocs';

export const useDocsState = () => {
    const [selectedCategory, setSelectedCategory] = useState('public');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [selectedEndpoint, setSelectedEndpoint] = useState(0);
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [roleTokens, setRoleTokens] = useState({});
    const [requestData, setRequestData] = useState({});
    const [serverUrl] = useState('https://jamesthewwebapi.onrender.com/api');

    // Define role credentials
    const roleCredentials = {
        ADMIN: { username: 'admin_user', password: 'admin123' },
        GENERAL: { username: 'general_user', password: 'general123' },
        SUBSCRIBER: { username: 'Cynthia7126', password: '123456' },
        STAFF: { username: 'staff_user1', password: 'staffuser1' },
        STAFF_LIMITED: { username: 'staff_user2', password: 'staffuser2' },
        WRITER: { username: 'val.goodrich', password: '123456' }
    };

    // Load all tokens from localStorage on component mount
    useEffect(() => {
        const tokens = TokenManager.getAllTokens();
        setRoleTokens(tokens);
    }, []);

    return {
        selectedCategory,
        setSelectedCategory,
        selectedSubcategory,
        setSelectedSubcategory,
        selectedEndpoint,
        setSelectedEndpoint,
        response,
        setResponse,
        loading,
        setLoading,
        roleTokens,
        setRoleTokens,
        requestData,
        setRequestData,
        serverUrl,
        roleCredentials
    };
};

export const useTokenManagement = (setRoleTokens) => {
    // Save token for specific role
    const saveTokenForRole = useCallback((token, role) => {
        if (TokenManager.saveToken(token, role)) {
            setRoleTokens(prev => ({
                ...prev,
                [role]: token
            }));
            return true;
        }
        return false;
    }, [setRoleTokens]);

    // Clear token for specific role
    const clearTokenForRole = useCallback((role) => {
        TokenManager.clearToken(role);
        setRoleTokens(prev => {
            const updated = { ...prev };
            delete updated[role];
            return updated;
        });
    }, [setRoleTokens]);

    // Clear all tokens
    const clearAllTokens = useCallback(() => {
        TokenManager.clearAllTokens();
        setRoleTokens({});
    }, [setRoleTokens]);

    return {
        saveTokenForRole,
        clearTokenForRole,
        clearAllTokens
    };
};

export const useRequestData = (setRequestData) => {
    // Helper function to extract parameters from sample request URL
    const extractParametersFromSampleRequest = (endpoint) => {
        const params = {};
        
        if (endpoint?.sampleRequest && endpoint?.parameters) {
            try {
                // Find URL in the sample request
                const urlMatch = endpoint.sampleRequest.match(/(https?:\/\/[^\s'"]+)/);
                if (urlMatch) {
                    const url = new URL(urlMatch[0]);
                    const searchParams = url.searchParams;
                    
                    // Extract each parameter value from the URL
                    endpoint.parameters.forEach(param => {
                        const value = searchParams.get(param.name);
                        if (value !== null) {
                            params[param.name] = value;
                        }
                    });
                }
            } catch (error) {
                console.log('Could not extract parameters from sample request:', error);
            }
        }
        
        return params;
    };

    // Initialize request data based on current endpoint
    const initializeRequestData = (endpoint) => {
        setRequestData(() => {
            // Clear all previous data and start fresh for new endpoint
            const initialData = {};
            
            // Handle request body for POST/PUT/DELETE methods
            if (endpoint?.requestBody && ['POST', 'PUT', 'DELETE'].includes(endpoint.method)) {
                Object.keys(endpoint.requestBody).forEach(key => {
                    // Only set if not already exists
                    if (!(key in initialData)) {
                        const value = endpoint.requestBody[key];
                        if (typeof value === 'string') {
                            initialData[key] = '';
                        } else if (typeof value === 'number') {
                            initialData[key] = 0;
                        } else if (typeof value === 'boolean') {
                            initialData[key] = false;
                        } else if (Array.isArray(value)) {
                            initialData[key] = [];
                        } else if (typeof value === 'object') {
                            initialData[key] = {};
                        } else {
                            initialData[key] = '';
                        }
                    }
                });
            }
            
            // Handle parameters for GET requests
            if (endpoint?.parameters && endpoint.method === 'GET') {
                // First, try to extract parameter values from the sample request
                const sampleParams = extractParametersFromSampleRequest(endpoint);
                
                endpoint.parameters.forEach(param => {
                    // Always set the parameter value (no "not already exists" check since we cleared data)
                    initialData[param.name] = sampleParams[param.name] || '';
                });
            }
            
            return initialData;
        });
    };

    // Update request data field - wrapped in useCallback for stability
    const updateRequestField = useCallback((field, value) => {
        setRequestData(prev => ({
            ...prev,
            [field]: value
        }));
    }, [setRequestData]);

    // Update nested object field (for complex objects)
    const updateNestedField = useCallback((parentField, nestedField, value) => {
        setRequestData(prev => ({
            ...prev,
            [parentField]: {
                ...prev[parentField],
                [nestedField]: value
            }
        }));
    }, [setRequestData]);

    return {
        initializeRequestData,
        updateRequestField,
        updateNestedField
    };
};

export const useEndpointHelpers = (selectedCategory, selectedSubcategory, selectedEndpoint) => {
    // Helper function to get current data based on selection
    const getCurrentData = useCallback(() => {
        const categoryData = apiDocs[selectedCategory];
        if (!categoryData) return null;
        
        // Check if this category has subcategories
        if (categoryData.subcategories && selectedSubcategory) {
            return categoryData.subcategories[selectedSubcategory];
        }
        
        // For categories without subcategories (like public, staff, writer)
        return categoryData;
    }, [selectedCategory, selectedSubcategory]);

    // Helper function to get current endpoint
    const getCurrentEndpoint = useCallback(() => {
        const currentData = getCurrentData();
        if (!currentData || !currentData.endpoints || currentData.endpoints.length === 0) return null;
        return currentData.endpoints[selectedEndpoint] || null;
    }, [getCurrentData, selectedEndpoint]);

    return {
        getCurrentData,
        getCurrentEndpoint
    };
};
