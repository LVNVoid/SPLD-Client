import api from "@/lib/axios";
import { useState, useEffect } from "react";

export default function useCrud(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get(endpoint);
      setData(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Tambah data
  const createData = async (newData) => {
    setLoading(true);
    try {
      const res = await api.post(endpoint, newData);
      setData((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Edit data
  const updateData = async (id, updatedData) => {
    setLoading(true);
    try {
      const res = await api.put(`${endpoint}/${id}`, updatedData);
      setData((prev) => prev.map((item) => (item.id === id ? res.data : item)));
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Hapus data
  const deleteData = async (id) => {
    setLoading(true);
    try {
      await api.delete(`${endpoint}/${id}`);
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch otomatis saat mount
  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return {
    data,
    loading,
    error,
    fetchData,
    createData,
    updateData,
    deleteData,
  };
}
