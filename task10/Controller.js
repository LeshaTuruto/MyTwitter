class Controller {
    _view;
    _posts;
    _userLogin;

    constructor(view, posts) {
        this._view = view;
        this._posts = posts;
    }
    static signUp() {
        if(document.getElementById('registration').style.display==='none'){
            localStorage.setItem('username','');
        }
        else {
            localStorage.setItem('username', document.getElementById('registration_login').value);
            document.getElementById('registration').style.display = 'none';
            location.reload();
        }
    }
    static logIn(){
        if(document.getElementById('log_in_form').style.display==='none'){
            localStorage.setItem('username','');
        }
        else {
            localStorage.setItem('username', document.getElementById('input_login').value);
            document.getElementById('log_in_form').style.display = 'none';
            location.reload();
        }
    }
    static downloadMorePosts(){
        View.downloadMorePosts();
    }
    registrationForm(){
        View.showRegistrationForm(this);
    }
    hideRegistrationForm(){
        View.hideRegistrationForm();
    }
    static newPost(){
        document.getElementById('new_post_f').style.display = 'none';
        let post={};
        post.author=localStorage.getItem('username');
        post.createAt=new Date();
        if(posts._posts.length>0) {
            post.id = (Number(posts._posts[0].id) + 1).toString();
        }
        else{
            post.id='1';
        }
        post.description=document.getElementById('new_post_input_text').value;
        post.likes=[];
        let str=document.getElementById('new_post_hashTagList').innerText;
        if(str!==null){
            post.hashTags=[];
            let Reg=/#[^#]+/g;
            let strmatch;
            while((strmatch=Reg.exec(str))!==null){
                post.hashTags.push(strmatch[0].substring(0,strmatch[0].length-1));
            }
        }
        posts.add(post);
        localStorage.setItem('posts',JSON.stringify(posts._posts));
        if(posts._posts.length<=10) {
            localStorage.setItem('postCount', JSON.stringify(posts._posts.length));
        }
        else{
            localStorage.setItem('postCount',JSON.stringify(10));
        }
    }
    editPostForm(){

    }
    logOff(){
        localStorage.setItem('username','');
        location.reload();
    }
    static addhashTag(){
        let hashtag=document.getElementById("new_post_input_hashtag").value;
        if(hashtag!==""&& hashtag.length<30) {
            hashtag = "#" + hashtag + ",";
            let hashTagList = document.getElementById("new_post_hashTagList").innerText;
            if (hashTagList.indexOf(hashtag) + 1) {
            } else {
                hashTagList += hashtag;
            }
            document.getElementById("new_post_hashTagList").innerText = hashTagList;
        }
        document.getElementById("new_post_input_hashtag").value = "";
    }
    static addHashtagFiltration(){
        let hashtag=document.getElementById("input_tag_filtration").value;
        if(hashtag!==""&& hashtag.length<30) {
            hashtag = "#" + hashtag + ",";
            let hashTagList = document.getElementById("tags_list").innerText;
            if (hashTagList.indexOf(hashtag) + 1) {
            } else {
                hashTagList += hashtag;
            }
            document.getElementById("tags_list").innerText = hashTagList;
        }
        document.getElementById("input_tag_filtration").value = "";
    }
    static removeLastTag(){
        let hashTagList=document.getElementById("new_post_hashTagList").innerText;
        var re = new RegExp("#[^#]+$");
        document.getElementById("new_post_hashTagList").innerText=hashTagList.replace(re,"");

    }
    static addPhoto(){

    }
    static removeLastTagFiltration(){
        let hashTagList=document.getElementById("tags_list").innerText;
        var re = new RegExp("#[^#]+$");
        document.getElementById("tags_list").innerText=hashTagList.replace(re,"");
    }
    static filtration(){
        let t={};
        if(document.getElementById("filtration_login").value!==""){
            t.author=document.getElementById("filtration_login").value;
        }
        if(document.getElementById("input_day").value!==""&&document.getElementById("input_month").value!==""&&document.getElementById("input_year").value!==""){
            t.createAt=new Date();
            t.createAt.setDate(document.getElementById("input_day").value);
            t.createAt.setMonth(document.getElementById("input_month").value-1);
            t.createAt.setFullYear(document.getElementById("input_year").value);
        }
        if(document.getElementById('tags_list').innerText!==""){
            t.hashTags=[];
            let Reg=/#[^#]+/g;
            let strmatch;
            let str=document.getElementById('tags_list').innerText;
            while((strmatch=Reg.exec(str))!==null){
                t.hashTags.push(strmatch[0].substring(0,strmatch[0].length-1));
            }
        }
        localStorage.setItem('filterConfig',JSON.stringify(t));
    }
    static redact(){
        if(event.target.classList=="delete"){
            posts.remove(event.target.parentElement.id);
            if(posts._posts.length<10){
                let t=JSON.parse(localStorage.getItem('postCount'));
                t--;
                localStorage.setItem('postCount',JSON.stringify(t));
            }
            localStorage.setItem('posts',JSON.stringify(posts._posts));
            location.reload();
        }
        else if(event.target.classList=="edit"){
            editid=event.target.parentElement.id;
            document.getElementById('edit_post_form').style.display="block";
            let post=posts.get(editid);
            document.getElementById("edit_post_hashtag_list").innerText=post.hashTags.toString()+",";
            document.getElementById('edit_post_input_text').value=post.description;
            document.getElementById('btn_close_edit_post').addEventListener('click',View.closeEditForm);
            document.getElementById('edit_post_form').addEventListener('submit',Controller.editPost);
            document.getElementById('edit_post_remove_last_hashtag').addEventListener('click',Controller.removeLastTagEdit);
            document.getElementById('edit_post_add_hashtag').addEventListener('click',Controller.addTagEdit);

        }
        else if(event.target.classList=="like"){
            likeid=event.target.parentElement.id;
            let post=posts.get(likeid);
            let userliked=localStorage.getItem('username');
            if(post.likes.indexOf(userliked)+1){
            }
            else{
                post.likes.push(userliked);
                event.target.innerText=post.likes.length+" "+String.fromCharCode(10084);
            }
            localStorage.setItem('posts',JSON.stringify(posts._posts));
        }
    }
    static removeLastTagEdit(){
        let hashTagList=document.getElementById("edit_post_hashtag_list").innerText;
        var re = new RegExp("#[^#]+$");
        document.getElementById("edit_post_hashtag_list").innerText=hashTagList.replace(re,"");
    }
    static addTagEdit(){
        let hashtag=document.getElementById("edit_post_input_hashtag").value;
        if(hashtag!==""&& hashtag.length<30) {
            hashtag = "#" + hashtag + ",";
            let hashTagList = document.getElementById("edit_post_hashtag_list").innerText;
            if (hashTagList.indexOf(hashtag) + 1) {
            } else {
                hashTagList += hashtag;
            }
            document.getElementById("edit_post_hashtag_list").innerText = hashTagList;
        }
        document.getElementById("edit_post_input_hashtag").value = "";
    }
    static editPost() {
        document.getElementById('edit_post_form').style.display="none";
        let editpost ={};
        editpost.description=document.getElementById('edit_post_input_text').value;
        editpost.hashTags=[];
        let Reg=/#[^#]+/g;
        let strmatch;
        let str=document.getElementById('edit_post_hashtag_list').innerText;
        while((strmatch=Reg.exec(str))!==null){
            editpost.hashTags.push(strmatch[0].substring(0,strmatch[0].length-1));
        }
        posts.edit(editid,editpost);
        localStorage.setItem('posts',JSON.stringify(posts._posts));
        location.reload();
    }
}
document.getElementById('filtration_remove_last_tag').addEventListener('click',Controller.removeLastTagFiltration);
document.getElementById('add_tag_filtration').addEventListener('click',Controller.addHashtagFiltration);
document.getElementById('filtration').addEventListener('submit',Controller.filtration)
let filterConfig=JSON.parse(localStorage.getItem('filterConfig'));
if(filterConfig!=="") {
    if(filterConfig.createAt!==undefined) {
        filterConfig.createAt = new Date(filterConfig.createAt);
    }
}
let array=JSON.parse(localStorage.getItem('posts'));
if(array===null){
	localStorage.setItem('posts',JSON.stringify([]);
	array=[];
}
array.forEach((post)=>{
   post.createAt=new Date(post.createAt);
});
let posts=new PostCollection(array);
let view=new View();
let ctrl=new Controller(view,posts);
let edition={};
if(localStorage.getItem('username')!=='') {
    ctrl._userLogin = localStorage.getItem('username');
}
view.showHeader(ctrl);
let t=JSON.parse(localStorage.getItem('postCount'));
if(filterConfig!=="") {
    view.showPosts(posts, 0, posts._posts.length, filterConfig);
}
else {
    view.showPosts(posts,0,t);
}
document.getElementById('posts').addEventListener('click',Controller.redact);
localStorage.setItem("skip",JSON.stringify(10));
localStorage.setItem('filterConfig',JSON.stringify(""));