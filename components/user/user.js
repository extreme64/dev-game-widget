const user = (function () {
    
    let thisNode
    let logInForm
    let logInStatus

    const html = `
        <div data-ui="user">
            <div class="widget__avatar">
                <img data-ui="avatar" class="widget__avatar__image" />
            </div>
            <!-- user wrap -->
            <div class="widget__user">
                <div>
                    <form name="loginForm">
                        <input type="text" name="email"/>
                        <input type="password" name="bsr"/>
                        <button name="sbmLogInReq">Log In</button>
                        <button>Cancel</button>
                    </form>
                </div>
                <div>
                    <a data-ui="profileLink" href="http://localhost:8000/dash"  title="Visit profile" target="_blank">User name</a>
                    <a data-ui="logOutLink" href="http://localhost:8000/api/remote-logout"  title="Log out">🔌</a>
                </div>
            </div>
        </div>`

    function onReady(parent){
        thisNode = parent
        logInForm = parent.querySelector('[name="loginForm"]');

        handleUserInfoDisplay(localStorage.getItem('name'))
        logInForm.addEventListener('submit', (e) => {
            logIn(e)
        })
    }

    function handleFormDisplay(status) {
        if (status) {
            logInForm.style.display = "none"
        }
    }

    function handleUserInfoDisplay(name="Profile name,...", email='') {
        thisNode.querySelector('[data-ui="profileLink"]').innerHTML = name


    }

    function setBackground(contextEl, url) {
        let bgImgEl = contextEl.querySelector('[data-ui="avatar"]')
        bgImgEl.src = url
    }

    const logIn = (async (e) => {
        e.preventDefault();
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        try{
            let requestBodydata = {}
            e.target.childNodes.forEach((node) =>  {
                if(node.name === "email") {
                    requestBodydata['email'] = node.value
                }
                if (node.name === "bsr") {
                    requestBodydata['password'] = node.value
                }
            })

            let response = await fetch(`http://localhost:8000/api/remote-login?email=${requestBodydata['email']}&password=${requestBodydata['password']}`, {
                method: 'POST',
                headers: headers
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('rlgin', data.token)
                localStorage.setItem('name', data.user.name)
                localStorage.setItem('email', data.user.email)

                logInStatus = true
                
                handleFormDisplay(logInStatus)
                handleUserInfoDisplay(data.user.name, data.user.email)
            } else {
                console.error('Error logging in!', response);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    })

    return {
        html,
        onReady,
        logIn,
        handleFormDisplay,
        setBackground,
        logInStatus
    }

})()