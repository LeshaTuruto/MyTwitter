class View{
    _UserLogin;
    _View;
    _numberOfPosts;
    showHeader() {
        const headerView = document.querySelector('#header');
        if (this._UserLogin !== undefined) {
            const newPostBtn = document.createElement('button');
            newPostBtn.classList.add('new_post');
            newPostBtn.innerText = 'New Post';
            headerView.appendChild(newPostBtn);
            const userLogin = document.createElement('div');
            userLogin.classList.add('username');
            userLogin.innerText = this._UserLogin;
            headerView.appendChild(userLogin);
        }
    }
    showPosts(posts,skip,top){
        document.getElementById('posts').innerHTML=``;
        if(posts.getPosts().length>10) {
            this._numberOfPosts = 10;
        }
        else{
            this._numberOfPosts=posts.getPosts().length;
        }
        this._View= document.querySelector('#posts');
        if(this._UserLogin!==undefined){
            posts.getPage(0,this._numberOfPosts).forEach((post) => {
                this._View.appendChild(this.buildPostLogIn(post));
            });
        }
        else{
            posts.getPage(0,this._numberOfPosts).forEach((post) => {
                this._View.appendChild(this.buildPostNotLogIn(post));
            });
        }
        if(posts.getPosts().length>10) {
            const buttonMorePosts = document.createElement('button');
            buttonMorePosts.classList.add('more_posts');
            buttonMorePosts.innerText = 'More Posts';
            buttonMorePosts.id = 'more_posts';
            this._View.appendChild(buttonMorePosts);
        }
    }
    showFilteredPosts(posts,filterConfig){
        let filteredposts=new PostCollection(posts.getPage(0,posts.length,filterConfig))
        this.showPosts(filteredposts);
    }
    buildPostNotLogIn(post){
        const postEl=document.createElement('div');
        postEl.id=post.id;
        if(post.photoLink!=undefined) {
            postEl.classList.add('post');
            if(post.hashTags!=undefined) {
                postEl.innerHTML = `
<div class="postHeader">${post.author}</div>
<div class="postHeader">${post.createAt.getDate()} ${post.createAt.getMonth()} ${post.createAt.getFullYear()}</div>
<div class="postHeader">${post.createAt.getHours()}h ${post.createAt.getMinutes()}m ${post.createAt.getSeconds()}s</div>
<img src=${post.photoLink} class="photo"></img>
<div class="tags">${post.hashTags.join()}</div>
<div class="unique_text">${post.description}</div>
<button class="like">&#10084;</button>`;
            }
            else{
                postEl.innerHTML = `
<div class="postHeader">${post.author}</div>
<div class="postHeader">${post.createAt.getDate()} ${post.createAt.getMonth()} ${post.createAt.getFullYear()}</div>
<div class="postHeader">${post.createAt.getHours()}h ${post.createAt.getMinutes()}m ${post.createAt.getSeconds()}s</div>
<img src=${post.photoLink} class="photo"></img>
<div class="unique_text">${post.description}</div>
<button class="like">&#10084;</button>`;
            }
        }
        else{
            postEl.classList.add('postWithoutPhoto');
            if(post.hashTags!=undefined){
                postEl.innerHTML=`
<div class="postHeader">${post.author}</div>
<div class="postHeader">${post.createAt.getDate()} ${post.createAt.getMonth()} ${post.createAt.getFullYear()}</div>
<div class="postHeader">${post.createAt.getHours()}h ${post.createAt.getMinutes()}m ${post.createAt.getSeconds()}s</div>
<div class="tags">${post.hashTags.join()}</div>
<div class="unique_text">${post.description}</div>
<button class="like">&#10084;</button>`;
            }
            else{
                postEl.innerHTML=`
<div class="postHeader">${post.author}</div>
<div class="postHeader">${post.createAt.getDate()} ${post.createAt.getMonth()} ${post.createAt.getFullYear()}</div>
<div class="postHeader">${post.createAt.getHours()}h ${post.createAt.getMinutes()}m ${post.createAt.getSeconds()}s</div>
<div class="unique_text">${post.description}</div>
<button class="like">&#10084;</button>`;
            }
        }
        return postEl;
    }
    buildPostLogIn(post){
        const postEl=this.buildPostNotLogIn(post);
        if(post.author===this._UserLogin){
            postEl.innerHTML=postEl.innerHTML+`\n`+`<button class="delete">Delete</button>`+`\n`+`<button class="edit">Change</button>`;
        }
        return postEl;

    }
    downloadMorePosts(posts,skip){
        skip=this._numberOfPosts;
        if(posts.getPosts().length-skip>0) {
            this._View.removeChild(document.getElementById('more_posts'));
            if(posts.getPosts().length-skip>10) {
                this._numberOfPosts+=10;
                if (this._UserLogin !== undefined) {
                    posts.getPage(skip).forEach((post) => {
                        this._View.appendChild(this.buildPostLogIn(post));
                    });
                } else {
                    posts.getPage(skip).forEach((post) => {
                        this._View.appendChild(this.buildPostNotLogIn(post));
                    });
                }
                const buttonMorePosts = document.createElement('button');
                buttonMorePosts.classList.add('more_posts');
                buttonMorePosts.innerText = 'More Posts';
                buttonMorePosts.id = 'more_posts';
                this._View.appendChild(buttonMorePosts);
            }
            else{
                this._numberOfPosts+=posts.getPosts().length-skip;
                if (this._UserLogin !== undefined) {
                    posts.getPage(skip,posts.getPosts().length-skip).forEach((post) => {
                        this._View.appendChild(this.buildPostLogIn(post));
                    });
                } else {
                    posts.getPage(skip,posts.getPosts().length-skip).forEach((post) => {
                        this._View.appendChild(this.buildPostNotLogIn(post));
                    });
                }
            }
        }
    }
    addPost(post,posts){
        posts.add(post);
        this.showPosts(posts);

    }
    removePost(id,posts){
        this._View.removeChild(document.getElementById(id));
        posts.remove(id);
    }
    editPost(id,post,posts){
        posts.edit(id,post);
        if(this._UserLogin!==undefined) {
            this._View.replaceChild(this.buildPostLogIn(posts.get(id)), document.getElementById(id));
        }
        else{
            this._View.replaceChild(this.buildPostNotLogIn(posts.get(id)),document.getElementById(id));
        }
    }

}
let posts=new PostCollection(arr);
let view=new View();
view.showHeader();
view._UserLogin='Lesha';
view.showHeader();
view.showPosts(posts);
view.removePost('20',posts);
view.downloadMorePosts(posts);
view.downloadMorePosts(posts);
let b={
    photoLink: 'https://delo.ua/files/news/images/3646/4/picture2_koronavirus-poluc_364604_p0.jpg'
}
let c={
    id:'22',
    author: 'Lesha',
    description:'text',
    photoLink: 'https://delo.ua/files/news/images/3646/4/picture2_koronavirus-poluc_364604_p0.jpg'
}
var t={
    author: 'Lesha'
}
c.createAt=new Date();
view.editPost('19',b,posts);
view.addPost(c,posts);
view.showFilteredPosts(posts,t);
var z={
    hashTags: ['#hash1','#hash18']
}
view.showFilteredPosts(posts,z);