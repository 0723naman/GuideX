export const SPECIALIZATIONS = [
    {
        id: 'anxiety',
        name: 'Anxiety & Stress',
        icon: 'Brain',
        description: 'Help managing anxiety disorders and stress-related issues',
        color: '#3b82f6'
    },
    {
        id: 'depression',
        name: 'Depression',
        icon: 'Heart',
        description: 'Support for depressive disorders and mood management',
        color: '#8b5cf6'
    },
    {
        id: 'relationships',
        name: 'Relationship Issues',
        icon: 'Users',
        description: 'Couples therapy and relationship counseling',
        color: '#ec4899'
    },
    {
        id: 'career',
        name: 'Career Counseling',
        icon: 'Briefcase',
        description: 'Career guidance and workplace stress management',
        color: '#10b981'
    },
    {
        id: 'trauma',
        name: 'Trauma & PTSD',
        icon: 'Shield',
        description: 'Trauma-informed therapy and PTSD treatment',
        color: '#f59e0b'
    },
    {
        id: 'addiction',
        name: 'Addiction Recovery',
        icon: 'RefreshCw',
        description: 'Substance abuse and behavioral addiction support',
        color: '#ef4444'
    },
    {
        id: 'family',
        name: 'Family Counseling',
        icon: 'Home',
        description: 'Family therapy and parenting support',
        color: '#14b8a6'
    },
    {
        id: 'child',
        name: 'Child Psychology',
        icon: 'Baby',
        description: 'Child and adolescent mental health',
        color: '#f97316'
    },
    {
        id: 'grief',
        name: 'Grief Counseling',
        icon: 'CloudRain',
        description: 'Support through loss and bereavement',
        color: '#6366f1'
    },
    {
        id: 'sleep',
        name: 'Sleep Disorders',
        icon: 'Moon',
        description: 'Treatment for insomnia and sleep-related issues',
        color: '#a855f7'
    }
]

export const SESSION_DURATIONS = [
    { value: 30, label: '30 minutes', price: 500 },
    { value: 60, label: '60 minutes', price: 900, popular: true },
    { value: 90, label: '90 minutes', price: 1200 }
]

export const USER_ROLES = {
    USER: 'user',
    COUNSELOR: 'counselor',
    ADMIN: 'admin'
}

export const COUNSELOR_STATUS = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected'
}
