import api from '../services/api'

export const adminApi = {
  login: (payload) => api.post('/auth/login', payload),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
  changePassword: (payload) => api.put('/auth/password', payload),
  content: () => api.get('/admin/content'),
  updateSingleton: (key, payload) => api.put(`/admin/content/${key}`, payload),
  create: (resource, payload) => api.post(`/admin/${resource}`, payload),
  update: (resource, id, payload) =>
    api.put(`/admin/${resource}/${id}`, payload),
  remove: (resource, id) => api.delete(`/admin/${resource}/${id}`),
  upload: (file) => {
    const formData = new FormData()
    formData.append('image', file)
    return api.post('/admin/uploads', formData)
  },
}
