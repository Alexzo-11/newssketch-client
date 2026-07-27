'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/services/category';
import toast from 'react-hot-toast';

export default function AdminCategories() {
  const { user, loading } = useAuth();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      // redirect handled by layout
    }
  }, [user, loading]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      toast.error('Failed to load categories');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateCategory(editing, { name, description });
        toast.success('Category updated');
      } else {
        await createCategory({ name, description });
        toast.success('Category created');
      }
      setName('');
      setDescription('');
      setEditing(null);
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete category?')) return;
    try {
      await deleteCategory(id);
      toast.success('Category deleted');
      fetchCategories();
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  const startEdit = (cat) => {
    setEditing(cat._id);
    setName(cat.name);
    setDescription(cat.description || '');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      <form onSubmit={handleSubmit} className="mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 flex-1"
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 flex-1"
        />
        <button type="submit" className="bg-deepCrimson text-white px-6 py-3 rounded-lg">
          {editing ? 'Update' : 'Create'}
        </button>
        {editing && (
          <button type="button" onClick={() => { setEditing(null); setName(''); setDescription(''); }} className="bg-gray-500 text-white px-6 py-3 rounded-lg">
            Cancel
          </button>
        )}
      </form>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat._id} className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div>
              <span className="font-bold">{cat.name}</span>
              {cat.description && <span className="ml-4 text-gray-500 text-sm">{cat.description}</span>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(cat)} className="text-blue-600 hover:underline">Edit</button>
              <button onClick={() => handleDelete(cat._id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}