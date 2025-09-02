# Server Status Check Implementation

This implementation adds a server status check mechanism to the web application to ensure the backend server is running before allowing access to the application.

## Features

### 1. Automatic Server Status Check
- When users access the website, a loading spinner is displayed
- The application calls `/api/server-status` endpoint to verify server health
- If the server responds correctly, the application loads normally
- If the server is down or returns an invalid response, an error page is shown

### 2. Expected Server Response
The server must return exactly this response format for the status check to pass:
```json
{
  "success": true,
  "status": 200,
  "message": "Server is running",
  "data": "OK"
}
```

### 3. Components Created

#### `ServerStatusChecker.jsx`
- Wrapper component that checks server status before rendering the main application
- Shows loading spinner during check
- Displays error page if server is unavailable
- Includes retry functionality

#### `SpinnerLoading.jsx`
- Reusable loading spinner component
- Customizable message display

#### `ServerStatusIndicator.jsx`
- Small status indicator that can be placed in headers or sidebars
- Shows real-time server status with colored dots
- Click to manually refresh status

### 4. Utilities and Hooks

#### `utils/serverStatus.js`
- Core API call function with timeout handling
- Validates response format
- Handles error cases

#### `hooks/useServerStatus.js`
- React hook for server status management
- Configurable auto-checking and retry intervals
- Returns status state and actions

#### `utils/config.js`
- Centralized configuration for API endpoints
- Environment-specific settings
- Timeout and retry configurations

### 5. API Documentation
Added server status endpoint documentation to `publicEndpoints.js`:
- Endpoint: `/api/server-status`
- Method: GET
- Public access (no authentication required)
- Response format specification

## Implementation Details

### App Structure
```
App.jsx
└── ServerStatusChecker
    └── Router + Routes (only rendered if server is healthy)
```

### Status Flow
1. Application starts
2. `ServerStatusChecker` renders loading spinner
3. API call to `/api/server-status` is made
4. Response is validated against expected format
5. If valid: Application renders normally
6. If invalid/error: Error page with retry option is shown

### Development Configuration
- Vite proxy configured to forward `/api/*` requests to production server
- Timeout handling (10 seconds default)
- Retry mechanism with user-triggered option

## Usage

### Basic Implementation (Already Done)
The server status check is automatically active when the application starts.

### Manual Status Check
```jsx
import { useServerStatus } from './hooks/useServerStatus';

function MyComponent() {
  const { status, checkStatus, isRunning, hasError } = useServerStatus();
  
  return (
    <div>
      <p>Server Status: {status}</p>
      <button onClick={checkStatus}>Check Again</button>
    </div>
  );
}
```

### Status Indicator
```jsx
import ServerStatusIndicator from './components/ServerStatusIndicator';

function Header() {
  return (
    <div>
      <ServerStatusIndicator showText={true} />
    </div>
  );
}
```

## Backend Requirements

The backend must implement a servlet/endpoint that responds to `GET /api/server-status` with:
```json
{
  "success": true,
  "status": 200,
  "message": "Server is running",
  "data": "OK"
}
```

Any deviation from this exact format will be treated as a server error.

## Configuration

### Timeouts and Retries
Edit `utils/config.js` to adjust:
- `CHECK_TIMEOUT`: API call timeout (default: 10 seconds)
- `RETRY_INTERVAL`: Auto-retry interval (default: 5 seconds)
- `MAX_RETRIES`: Maximum retry attempts (default: 3)

### API Base URL
The application automatically uses:
- Production: `https://jamesthewwebapi.onrender.com`
- Development: Proxy to production server (configured in `vite.config.js`)

## Error Handling
- Network errors: "Connection failed" message
- Timeout errors: "Request timeout" message  
- Invalid response: "Invalid server response format" message
- HTTP errors: "HTTP error! status: {code}" message

## Testing
- Test with server running: Normal application access
- Test with server down: Error page with retry option
- Test with invalid response: Error page indicating server issues
- Test retry functionality: Click "Try Again" button
