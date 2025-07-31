
// Temporary API endpoint provided for testing.
const API_URL = 'https://dhansafar-web-api.vercel.app/api/contacts';

/**
 * Handles the submission for course notifications.
 * This function sends the user's email and the course name to the provided API.
 * @param {string} email - The user's email address.
 * @param {string} courseName - The name of the course the user is interested in.
 * @returns {Promise<boolean>} - A promise that resolves to true on success, false on failure.
 */
async function handleCourseNotification(email, courseName) {
    console.log('--- Sending Course Notification Request ---');
    
    // Adapt the data to match the temporary API's expected format.
    const formData = {
        name: "Course Notification",
        phone_number: "N/A",
        message: `New interest in ${courseName} course from: ${email}`
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        // Check if the request was successful (HTTP status 200-299)
        if (response.ok) {
            console.log('Successfully submitted course interest.');
            const result = await response.json();
            console.log('Server response:', result);
            return true; // Indicate success
        } else {
            // Handle server errors
            console.error('Server responded with an error:', response.status, response.statusText);
            return false; // Indicate failure
        }
    } catch (error) {
        // Handle network errors
        console.error('Network error occurred:', error);
        return false; // Indicate failure
    }
}

/**
 * Handles the submission for newsletter subscriptions.
 * This function sends the user's email to the provided API.
 * @param {string} email - The user's email address.
 * @returns {Promise<boolean>} - A promise that resolves to true on success, false on failure.
 */
async function handleNewsletterSubscription(email) {
    console.log('--- Sending Newsletter Subscription Request ---');

    // Adapt the data to match the temporary API's expected format.
    const formData = {
        name: "Newsletter Subscription",
        phone_number: "N/A",
        message: `New newsletter subscription from: ${email}`
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        // Check if the request was successful
        if (response.ok) {
            console.log('Successfully subscribed to the newsletter.');
            const result = await response.json();
            console.log('Server response:', result);
            return true; // Indicate success
        } else {
            console.error('Server responded with an error:', response.status, response.statusText);
            return false; // Indicate failure
        }
    } catch (error) {
        console.error('Network error occurred:', error);
        return false; // Indicate failure
    }
}
