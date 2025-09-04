// // Get access token from session storage
// const getAccessToken = () => {
//   return sessionStorage.getItem('access_token');
// };

// // Get refresh token from session storage
// const getRefreshToken = () => {
//   return sessionStorage.getItem('refresh_token');
// };

// // Generic fetch wrapper for authenticated requests
// export const fetchWithAuth = async (url, options = {}, retryCount = 0) => {
//   const token = getAccessToken();
//   const isFormData = options.body instanceof FormData;

//   const headers = {
//     ...(token && { Authorization: `Bearer ${token}` }),
//     ...(!isFormData && { 'Content-Type': 'application/json' }), // Ensure Content-Type is set for JSON
//     ...(options.headers || {}),
//   };

//   try {
//     const response = await fetch(url, {
//       ...options,
//       headers,
//       signal: AbortSignal.timeout(15000), // 15-second timeout
//     });

//     if (response.status === 401 && retryCount < 1) {
//       console.warn('Unauthorized - attempting to refresh token');

//       const refreshResponse = await fetch('https://api.onestepmedi.com:8000/patient/refresh', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           refresh_token: getRefreshToken(),
//         }),
//       });

//       if (refreshResponse.ok) {
//         const refreshData = await refreshResponse.json();
//         sessionStorage.setItem('access_token', refreshData.access_token);

//         const newHeaders = {
//           ...headers,
//           Authorization: `Bearer ${refreshData.access_token}`,
//         };

//         const retryResponse = await fetch(url, {
//           ...options,
//           headers: newHeaders,
//           signal: AbortSignal.timeout(15000),
//         });

//         return retryResponse;
//       } else {
//         console.warn('Token refresh failed:', await refreshResponse.json());
//         sessionStorage.removeItem('access_token');
//         sessionStorage.removeItem('refresh_token');
//         window.location.href = '/login';
//         return refreshResponse;
//       }
//     }

//     return response;
//   } catch (error) {
//     console.error('Fetch error:', {
//       message: error.message,
//       url,
//       options: { ...options, body: isFormData ? '[FormData]' : options.body },
//       cause: error.cause,
//     });
//     throw error;
//   }
// };




// api.js
// const fetchWithAuth = async (url, options = {}, retries = 3, timeout = 10000) => {
//   const token = sessionStorage.getItem('access_token');
//   const controller = new AbortController();
//   const id = setTimeout(() => controller.abort(), timeout);

//   const headers = {
//     ...options.headers,
//     'Content-Type': 'application/json',
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//   };

//   for (let attempt = 1; attempt <= retries; attempt++) {
//     try {
//       const response = await fetch(url, {
//         ...options,
//         headers,
//         signal: controller.signal,
//       });
//       clearTimeout(id);
//       return response;
//     } catch (error) {
//       clearTimeout(id);
//       if (error.name === 'AbortError') {
//         console.warn(`Request timed out for ${url} on attempt ${attempt}`);
//       } else {
//         console.error(`Fetch error for ${url}:`, error);
//       }
//       if (attempt === retries) {
//         throw new Error('Failed to fetch', {
//           message: error.message,
//           url,
//           options,
//           cause: error,
//         });
//       }
//       // Wait before retrying
//       await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
//     }
//   }
// };

// export { fetchWithAuth };


export const fetchWithAuth = async (url, options = {}) => {
  const token = sessionStorage.getItem('access_token');
  const headers = { ...options.headers };

  // Only set Content-Type for non-FormData requests
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });
    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};