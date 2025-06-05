import api from "@/lib/axios";
import { useState, useEffect, useCallback } from "react";

export default function useCrud(endpoint, options = {}) {
  const { autoFetch = true, initialData = [] } = options;

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Fetch all data (list)
  const fetchData = useCallback(
    async (params = {}) => {
      setLoading(true);
      setError(null);
      try {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;
        const res = await api.get(url);

        // Handle different response structures
        const responseData = res.data?.data || res.data;
        setData(Array.isArray(responseData) ? responseData : []);
        return responseData;
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || err.message || "Gagal memuat data";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [endpoint]
  );

  // Get single data by ID (detail)
  const getData = useCallback(
    async (id, params = {}) => {
      if (!id) {
        throw new Error("ID is required");
      }

      setDetailLoading(true);
      setError(null);
      try {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString
          ? `${endpoint}/${id}?${queryString}`
          : `${endpoint}/${id}`;
        const res = await api.get(url);

        // Handle different response structures
        const responseData = res.data?.data || res.data;
        return responseData;
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Gagal memuat detail data";
        setError(errorMessage);
        throw err;
      } finally {
        setDetailLoading(false);
      }
    },
    [endpoint]
  );

  // Create new data
  const createData = useCallback(
    async (newData) => {
      setCreateLoading(true);
      setError(null);
      try {
        const res = await api.post(endpoint, newData);
        const responseData = res.data?.data || res.data;

        // Update local state if data is array
        if (Array.isArray(data)) {
          setData((prev) => [...prev, responseData]);
        }

        return responseData;
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Gagal menambahkan data";
        setError(errorMessage);
        throw err;
      } finally {
        setCreateLoading(false);
      }
    },
    [endpoint, data]
  );

  // Update existing data
  const updateData = useCallback(
    async (id, updatedData) => {
      if (!id) {
        throw new Error("ID is required");
      }

      setUpdateLoading(true);
      setError(null);
      try {
        const res = await api.put(`${endpoint}/${id}`, updatedData);
        const responseData = res.data?.data || res.data;

        // Update local state if data is array
        if (Array.isArray(data)) {
          setData((prev) =>
            prev.map((item) =>
              item.id === id || item._id === id ? responseData : item
            )
          );
        }

        return responseData;
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || err.message || "Gagal mengupdate data";
        setError(errorMessage);
        throw err;
      } finally {
        setUpdateLoading(false);
      }
    },
    [endpoint, data]
  );

  // Patch data (partial update)
  const patchData = useCallback(
    async (id, patchData) => {
      if (!id) {
        throw new Error("ID is required");
      }

      setUpdateLoading(true);
      setError(null);
      try {
        const res = await api.patch(`${endpoint}/${id}`, patchData);
        const responseData = res.data?.data || res.data;

        // Update local state if data is array
        if (Array.isArray(data)) {
          setData((prev) =>
            prev.map((item) =>
              item.id === id || item._id === id ? responseData : item
            )
          );
        }

        return responseData;
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || err.message || "Gagal mengupdate data";
        setError(errorMessage);
        throw err;
      } finally {
        setUpdateLoading(false);
      }
    },
    [endpoint, data]
  );

  // Delete data
  const deleteData = useCallback(
    async (id) => {
      if (!id) {
        throw new Error("ID is required");
      }

      setDeleteLoading(true);
      setError(null);
      try {
        await api.delete(`${endpoint}/${id}`);

        // Update local state if data is array
        if (Array.isArray(data)) {
          setData((prev) =>
            prev.filter((item) => item.id !== id && item._id !== id)
          );
        }

        return true;
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || err.message || "Gagal menghapus data";
        setError(errorMessage);
        throw err;
      } finally {
        setDeleteLoading(false);
      }
    },
    [endpoint, data]
  );

  // Refresh data (re-fetch)
  const refreshData = useCallback(
    async (params = {}) => {
      return await fetchData(params);
    },
    [fetchData]
  );

  // Reset state
  const resetState = useCallback(() => {
    setData(initialData);
    setError(null);
    setLoading(false);
    setCreateLoading(false);
    setUpdateLoading(false);
    setDeleteLoading(false);
    setDetailLoading(false);
  }, [initialData]);

  // Auto fetch on mount (optional)
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [endpoint, autoFetch, fetchData]);

  return {
    data,
    loading,
    error,
    createLoading,
    updateLoading,
    deleteLoading,
    detailLoading,

    fetchData,
    getData,
    createData,
    updateData,
    patchData,
    deleteData,
    refreshData,
    resetState,
    clearError,

    isEmpty: Array.isArray(data) && data.length === 0,
    hasError: !!error,
    isLoading:
      loading ||
      createLoading ||
      updateLoading ||
      deleteLoading ||
      detailLoading,
  };
}
