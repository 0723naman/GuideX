export const applicationService = {
    submitApplication: (data) => {
        const applications = JSON.parse(localStorage.getItem('counselor_applications') || '[]');
        const newApplication = {
            id: Date.now().toString(),
            ...data,
            status: 'pending',
            submittedAt: new Date().toISOString()
        };
        applications.push(newApplication);
        localStorage.setItem('counselor_applications', JSON.stringify(applications));
        return Promise.resolve(newApplication);
    },

    getPendingApplications: () => {
        const applications = JSON.parse(localStorage.getItem('counselor_applications') || '[]');
        return Promise.resolve(applications.filter(app => app.status === 'pending'));
    },

    getApprovedApplications: () => {
        const applications = JSON.parse(localStorage.getItem('counselor_applications') || '[]');
        return Promise.resolve(applications.filter(app => app.status === 'approved'));
    },

    getAllApplications: () => {
        const applications = JSON.parse(localStorage.getItem('counselor_applications') || '[]');
        return Promise.resolve(applications);
    },

    updateStatus: (id, status) => {
        const applications = JSON.parse(localStorage.getItem('counselor_applications') || '[]');
        const index = applications.findIndex(app => app.id === id);
        if (index !== -1) {
            applications[index].status = status;
            localStorage.setItem('counselor_applications', JSON.stringify(applications));
            return Promise.resolve(applications[index]);
        }
        return Promise.reject('Application not found');
    }
};
