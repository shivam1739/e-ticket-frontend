

/**
 * Checks if all required fields in the form data are present.
 * 
 * @param {Object} formData - The form data object to validate.
 * @param {string} formData.name - The name field in the form data.
 * @param {string} formData.venue - The venue field in the form data.
 * @param {string} formData.date - The date field in the form data.
 * @param {string} formData.description - The description field in the form data.
 * @param {number} formData.totalTickets - The total tickets field in the form data.
 * @param {number} formData.ticketPrice - The ticket price field in the form data.
 * @returns {boolean} - Returns `true` if all fields are present and valid, otherwise `false`.
 */
export const checkFormDataField = (formData) => {
    return (
        formData?.name &&
        formData?.venue &&
        formData?.date &&
        formData?.description &&
        formData?.totalTickets &&
        formData?.ticketPrice
    );
};
