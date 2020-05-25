class View{
    _userLogin;


    showHeader(controller) {
        const headerView = document.querySelector('#header');
        if (controller._userLogin !== undefined) {
            const newPostBtn = document.createElement('button');
            newPostBtn.id='new_post';
            newPostBtn.classList.add('new_post');
            newPostBtn.innerText = 'New Post';
            newPostBtn.addEventListener('click',View.showNewPostForm);
            headerView.appendChild(newPostBtn);
            const Log_off_btn=document.createElement('button');
            Log_off_btn.classList.add('log_off');
            Log_off_btn.innerText='Log off';
            Log_off_btn.addEventListener('click',controller.logOff);
            headerView.appendChild(Log_off_btn);
            const userLogin = document.createElement('div');
            userLogin.classList.add('username');
            userLogin.innerText = controller._userLogin;
            headerView.appendChild(userLogin);
        }
        else{
            const RegistrationtBtn = document.createElement('button');
            RegistrationtBtn.addEventListener('click',controller.registrationForm);
            RegistrationtBtn.id='registration_btn';
            RegistrationtBtn.classList.add('new_post');
            RegistrationtBtn.innerText='Registration';
            headerView.appendChild(RegistrationtBtn);
            const LogInBtn=document.createElement('button');
            LogInBtn.addEventListener('click',View.showLogInForm);
            LogInBtn.id='log_in_btn';
            LogInBtn.classList.add('log_in_btn');
            LogInBtn.innerText='Log in';
            headerView.appendChild(LogInBtn);
        }
    }
    static showRegistrationForm(controller){
        document.getElementById('registration').style.display='block';
        document.getElementById('authorization_form').addEventListener('submit',Controller.signUp);
        document.getElementById('btn_close').addEventListener('click',View.hideRegistrationForm);
    }
    static hideRegistrationForm(){
        document.getElementById('registration').style.display='none';
    }
    static showLogInForm(){
        document.getElementById('log_in_form').style.display='block';
        document.getElementById('btn_close_log_in').addEventListener('click',View.hideLogInForm);
        document.getElementById('login_form').addEventListener('submit',Controller.logIn)
    }
    static hideLogInForm(){
        document.getElementById('log_in_form').style.display='none';
    }
    showPosts(posts,skip=0,top=10,filterConfig,controller){
        document.getElementById('posts').innerHTML=``;
        let postsView=document.querySelector('#posts');
        if(JSON.parse(localStorage.getItem('posts')).length>0) {
            if (localStorage.getItem('username') !== undefined) {
                posts.getPage(skip, top,filterConfig).forEach((post) => {
                    postsView.appendChild(View.buildPostLogIn(post));
                });
            } else {
                posts.getPage(skip, top,filterConfig).forEach((post) => {
                    postsView.appendChild(View.buildPostNotLogIn(post));
                });
            }
            if (posts.getPosts().length > 10&&filterConfig===undefined) {
                const buttonMorePosts = document.createElement('button');
                buttonMorePosts.addEventListener('click', this.downloadMorePosts);
                buttonMorePosts.addEventListener('click', Controller.downloadMorePosts);
                buttonMorePosts.classList.add('more_posts');
                buttonMorePosts.innerText = 'More Posts';
                buttonMorePosts.id = 'more_posts';
                postsView.appendChild(buttonMorePosts);
            }
        }
    }
    static showNewPostForm(){
        document.getElementById('new_post_f').style.display='block';
        document.getElementById('btn_close_new_post').addEventListener('click',View.hideNewPostForm);
        document.getElementById("new_post_add_hashtag").addEventListener('click',Controller.addhashTag);
        document.getElementById('new_post_form').addEventListener('submit',Controller.newPost);
        document.getElementById('new_post_remove_hashtag').addEventListener('click',Controller.removeLastTag);

    }
    static addhashTag(){
        document.getElementById("new_post_hashTagList").innerText=
            document.getElementById("new_post_hashTagList").innerText+document.getElementById("new_post_input_hashtag").value;

    }
    static hideNewPostForm(){
        document.getElementById('new_post_f').style.display='none';
    }
    static buildPostNotLogIn(post){
        const postEl=document.createElement('div');
        postEl.id=post.id;
        if(post.photoLink!=undefined) {
            postEl.classList.add('post');
            if(post.hashTags!=undefined) {
                postEl.innerHTML = `
<div class="postHeader">${post.author}</div>
<div class="postHeader">${post.createAt.getDate()} ${post.createAt.getMonth()+1} ${post.createAt.getFullYear()}</div>
<div class="postHeader">${post.createAt.getHours()}h ${post.createAt.getMinutes()}m ${post.createAt.getSeconds()}s</div>
<img src=${post.photoLink} class="photo"></img>
<div class="tags">${post.hashTags.join()}</div>
<div class="unique_text">${post.description}</div>
<button class="like">${post.likes.length}&#10084;</button>`;
            }
            else{
                postEl.innerHTML = `
<div class="postHeader">${post.author}</div>
<div class="postHeader">${post.createAt.getDate()} ${post.createAt.getMonth()+1} ${post.createAt.getFullYear()}</div>
<div class="postHeader">${post.createAt.getHours()}h ${post.createAt.getMinutes()}m ${post.createAt.getSeconds()}s</div>
<img src=${post.photoLink} class="photo"></img>
<div class="unique_text">${post.description}</div>
<button class="like">${post.likes.length}&#10084;</button>`;
            }
        }
        else{
            postEl.classList.add('postWithoutPhoto');
            if(post.hashTags!=undefined){
                postEl.innerHTML=`
<div class="postHeader">${post.author}</div>
<div class="postHeader">${post.createAt.getDate()} ${post.createAt.getMonth()+1} ${post.createAt.getFullYear()}</div>
<div class="postHeader">${post.createAt.getHours()}h ${post.createAt.getMinutes()}m ${post.createAt.getSeconds()}s</div>
<div class="tags">${post.hashTags.join()}</div>
<div class="unique_text">${post.description}</div>
<button class="like">${post.likes.length}&#10084;</button>`;
            }
            else{
                postEl.innerHTML=`
<div class="postHeader">${post.author}</div>
<div class="postHeader">${post.createAt.getDate()} ${post.createAt.getMonth()+1} ${post.createAt.getFullYear()}</div>
<div class="postHeader">${post.createAt.getHours()}h ${post.createAt.getMinutes()}m ${post.createAt.getSeconds()}s</div>
<div class="unique_text">${post.description}</div>
<button class="like">${post.likes.length}&#10084;</button>`;
            }
        }
        return postEl;
    }
    static buildPostLogIn(post){
        const postEl=View.buildPostNotLogIn(post);
        if(post.author===localStorage.getItem('username')){
            postEl.innerHTML=postEl.innerHTML+`\n`+`<button class="delete">Delete</button>`+`\n`+`<button class="edit">Change</button>`;
        }
        return postEl;

    }
    static downloadMorePosts(){
        let skip=JSON.parse(localStorage.getItem('skip'));
        if(posts.getPosts().length-skip>0) {
            document.getElementById('posts').removeChild(document.getElementById('more_posts'));
            if(posts.getPosts().length-skip>10) {
                if (localStorage.getItem('username')!=='') {
                    posts.getPage(skip).forEach((post) => {
                        document.getElementById('posts').appendChild(View.buildPostLogIn(post));
                    });
                } else {
                    posts.getPage(skip).forEach((post) => {
                        document.getElementById('posts').appendChild(View.buildPostNotLogIn(post));
                    });
                }
                const buttonMorePosts = document.createElement('button');
                buttonMorePosts.classList.add('more_posts');
                buttonMorePosts.innerText = 'More Posts';
                buttonMorePosts.id = 'more_posts';
                buttonMorePosts.addEventListener('click',Controller.downloadMorePosts);
                document.getElementById('posts').appendChild(buttonMorePosts);
                skip+=10;
                localStorage.setItem('skip',JSON.stringify(skip));
            }
            else{
                localStorage.setItem('skip',JSON.stringify(posts.getPosts().length-skip));
                if (localStorage.getItem('username')!=='') {
                    posts.getPage(skip,posts.getPosts().length-skip).forEach((post) => {
                        document.getElementById('posts').appendChild(View.buildPostLogIn(post));
                    });
                } else {
                    posts.getPage(skip,posts.getPosts().length-skip).forEach((post) => {
                        document.getElementById('posts').appendChild(View.buildPostNotLogIn(post));
                    });
                }
            }
        }
    }
    static closeEditForm(){
        document.getElementById('edit_post_form').style.display="none";
        editid="";
    }
}