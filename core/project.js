const Project = (() => {

    async function getAttributes() {
       
        const token = localStorage.getItem('rlgin')

        try {
            // FIXME: project ID as const
            let response = await fetch(`http://localhost:8000/api/project/1/attributes`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            return data.urls;

        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    }

    return {
        getAttributes: getAttributes
    }
})()