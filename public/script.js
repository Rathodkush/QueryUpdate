
// the pages which are loadedin different pages

function loadPage(page) {
    const contentDiv = document.getElementById('content');
    let content = '';

    switch (page) {
        case 'home':
            content = `
                <h1>Welcome to the QueryUpdate </h1>
                <form id="queryForm">
                    <input type="text" id="queryText" placeholder="Enter your query" required>
                    <button type="submit">Add Query</button>
                </form>
                <div id="queries"></div>
            `;
            break;
        case 'about':
            content = `
                <h1>About Us</h1>
                <p >  Query Update is a new website  built with the ambition of developing a community that not only favours asking and answering but also encourages collaboration of a number of ways to be able to clear some points away from everyone's individual lives. This web site  will enable people to share knowledge with a possible personal and/or professional aspect. Besides these features that make it unique in the area of problem solving, mentoring, and peer learning, offer its other promises in the best configured user-friendly environment.
The platform offers such facilities as categorizing queries, recognizing user merit, and recommending specific mentors for individuals seeking knowledge. Therefore, the seamless availability of the same tools makes the knowledge-seeking process easier. Query Update stimulates an interactive and collaborative environment and connects the learners to experts in their field to enhance their skills and professionalism.
Conclusion-to-a-Query update: 
A Query updates. It stands as a dynamic platform for easy sharing of knowledge and solving interpersonal problems and developing good relationships. It would provide a collaborative environment for continuous learning and personal growth by creating a simple interface to submit queries and solutions, comments, likes, and mentoring. It has a good sense of community building, mentoring, and engagement. So it can be said called will be one of the finest spaces for best quality relationships and solving real-world problems.
It's a Queries update technology and social media industry. The online users ask questions and share answers through this platform. It makes part of the digital content and social networking.

</p>
            `;
            break;
        case 'contact':
            content = `
                <h1>Contact Us</h1>
                <p>You can contect with us contact@example.com.</p>
            `;
            break;
        case 'mentor':
            content = `
                <h1>Mentor</h1>
                <p>QueryUpdate is platfomre where its provide,the mentor is platfome where you can become the mentor and menti the perosn or student to grow the knowlede to help the perosn .
               we provide the certificate also for you long time future ans stipends </p>
                <p> You can register your self  </p>

            `;
            break;
        case 'meenti':
            content = `
            <h1>Meenti</h1>
                <p> QueryUpdate is platoforme where its provide the Meentiplatfoem where some user need help to connect with you . and also solve the problem each other also provede the schoolership with 65% above in 10th ,12th, and 
                UG(under gradution any stram). also you can gate the cerificate for your better future .</p>
                <p> You can register your self</p>
            `;
            break;
        default:
            content = '<h1>404 - Page Not Found</h1>';
    }

    contentDiv.innerHTML = content;


    // if click on home pages it will loadPage of home
    if (page === 'home') {
        initializeQueryFunctionality();
    }
}


// the functionality of queries
function initializeQueryFunctionality() {
    const queryForm = document.getElementById('queryForm');
    if (queryForm) {
        queryForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const queryText = document.getElementById('queryText').value;

            const response = await fetch('/api/queries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: queryText })
            });

            const newQuery = await response.json();
            displayQueries();
            queryForm.reset();
        });
    }
    displayQueries();
}
// Function to display queries
async function displayQueries() {
    const response = await fetch('/api/queries');
    const queries = await response.json();
    const queriesDiv = document.getElementById('queries');
    queriesDiv.innerHTML = '';

    queries.forEach(query => {
        const queryElement = document.createElement('div');
        const createdAtDate = new Date(query.createdAt).toLocaleString();  // date and time

        // Create the HTML structure for each query
        queryElement.innerHTML = `
            <div class="query">
                <p>${query.text} 
                    <span style="font-size: 0.8em; color: gray;">(Added on: ${createdAtDate})</span>
                    <button onclick="updateQuery('${query._id}')">Update</button>
                    <button onclick="deleteQuery('${query._id}')">Delete</button>
                </p>
                <form onsubmit="addComment(event, '${query._id}')">
                    <input type="text" placeholder="Add a comment" required>
                    <button type="submit">Comment</button>
                </form>
                <div class="comments">
                    ${query.comments.map(comment => `<p class="comment">${comment.text}</p>`).join('')}
                </div>
            </div>
        `;
        queriesDiv.appendChild(queryElement);
    });
}


// Function to add a comment to a query
async function addComment(event, queryId) {
    event.preventDefault();
    const commentText = event.target.querySelector('input').value;

    await fetch(`/api/queries/${queryId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: commentText }) // Send the comment text
    });

    displayQueries(); // Refresh the list of queries to show the new comment
}


//  for referrsh in advcane

// // Function to update a query
// async function updateQuery(id) {
//     const newText = prompt("Enter the new query text:");
//     if (newText) {
//         const response = await fetch(`/api/queries/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ text: newText })
//         });

//         if (response.ok) {
//             displayQueries(); // Refresh the queries after successful update
//         } else {
//             alert("Failed to update the query.");
//         }
//     }
// }



async function updateQuery(id) {
    const newText = prompt("Enter the new query text:");
    if (newText) {
        const response = await fetch(`/api/queries/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: newText })
        });

        const updatedQuery = await response.json(); // updated the querpies
        console.log(updatedQuery); 

        if (response.ok) {
            displayQueries(); 
        } else {
            alert("Failed to update the query.");
        }
    }
}



// Function to delete a query
async function deleteQuery(id) {
    if (confirm("Are you sure you want to delete this query?")) {
        await fetch(`/api/queries/${id}`, {
            method: 'DELETE'
        });
        displayQueries();
    }
}

// Load the home page by default
loadPage('home');