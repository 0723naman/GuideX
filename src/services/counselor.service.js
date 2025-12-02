import api from './api';

export const counselorService = {
    getAllCounselors: async (filters) => {
        const response = await api.get('/counselors', { params: filters });
        return response.data;
    },
    getCounselorById: async (id) => {
        const response = await api.get(`/counselors/${id}`);
        return response.data;
    },
    updateProfile: async (data) => {
        const response = await api.put('/counselors/profile', data);
        return response.data;
    },
};
