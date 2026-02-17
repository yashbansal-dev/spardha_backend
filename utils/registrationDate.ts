export const REGISTRATION_OPEN_DATE = new Date('2026-02-14T14:00:00');

export const isRegistrationOpen = (): boolean => {
    const now = new Date();
    return now >= REGISTRATION_OPEN_DATE;
};
