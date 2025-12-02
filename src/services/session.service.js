import api from './api';

export const sessionService = {
    createSession: async (data) => {
        const response = await api.post('/sessions', data);
        return response.data;
    },
    getSessions: async () => {
        const response = await api.get('/sessions');
        return response.data;
    },
    updateSessionStatus: async (id, status) => {
        const response = await api.patch(`/sessions/${id}/status`, { status });
        return response.data;
    },
};
