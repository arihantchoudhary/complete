document.addEventListener('DOMContentLoaded', function() {
    const scrapeForm = document.getElementById('scrapeForm');
    const resultDiv = document.getElementById('result');
    const calendarResultDiv = document.getElementById('calendarResult');
    const contentPreview = document.getElementById('contentPreview');
    const calendarPreview = document.getElementById('calendarPreview');
    const generateCalendarBtn = document.getElementById('generateCalendar');
    const downloadCSVBtn = document.getElementById('downloadCSV');

    // API endpoint - make sure this matches your backend URL
    const API_URL = 'http://localhost:5000/api';

    // Show loading state
    function showLoading(element) {
        element.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
    }

    // Show error message
    function showError(message) {
        alert(message);
    }

    // Handle form submission
    scrapeForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const url = document.getElementById('url').value;
        const method = document.querySelector('input[name="method"]:checked').value;

        // Show loading state
        showLoading(contentPreview);
        resultDiv.style.display = 'block';
        calendarResultDiv.style.display = 'none';

        try {
            console.log('Sending request to:', `${API_URL}/scrape`);
            const response = await fetch(`${API_URL}/scrape`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ url, method })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Received response:', data);

            if (data.error) {
                showError(data.error);
                return;
            }

            // Show result and content preview
            contentPreview.textContent = data.content;
        } catch (error) {
            console.error('Error:', error);
            showError(`Error scraping website: ${error.message}. Make sure the backend server is running at ${API_URL}`);
        }
    });

    // Handle calendar generation
    generateCalendarBtn.addEventListener('click', async function() {
        showLoading(calendarPreview);
        calendarResultDiv.style.display = 'block';

        try {
            const response = await fetch(`${API_URL}/generate-calendar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    content: contentPreview.textContent
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Calendar response:', data);

            if (data.error) {
                showError(data.error);
                return;
            }

            // Show calendar result
            calendarPreview.textContent = data.content;
        } catch (error) {
            console.error('Error:', error);
            showError(`Error generating calendar: ${error.message}`);
        }
    });

    // Handle CSV download
    downloadCSVBtn.addEventListener('click', function() {
        try {
            // Create CSV content
            const csvContent = calendarPreview.textContent;
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'calendar.csv';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error:', error);
            showError('Error downloading CSV file');
        }
    });
}); 