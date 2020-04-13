class PostCollection{
    _posts=[];
    constructor(initialPosts){
        this._posts=(initialPosts || []);
    }
    get(postId){
        return this._posts.find(item => item.id===postId);
    }
    getPosts(){
        return this._posts;
    }
    static _validatePost(post){
        if(post.id!==undefined&&post.author!==undefined&&post.createAt!==undefined&&post.description!==undefined&&post.description.length<200){
            return true;
        }
        else{
            return false;
        }
    }
    add(newPost){
        if(PostCollection._validatePost(newPost)===true){
            this._posts.push(newPost);
            return true;
        }
        else{
            return false;
        }
    }
    addAll(newPosts){
        let arr=[];
        for(let i=0;i<newPosts.length;i++){
            if(this.add(newPosts[i])===false){
                arr.push(newPosts[i]);
            }
        }
        return arr;

    }
    edit(id,post){
        let i= this._posts.findIndex(item => item.id === id)
        if(i===-1){
            return false;
        }
        let posttmp=this._posts[i];
        for(let key in post){
            posttmp[key]=post[key];
        }
        if(PostCollection._validatePost(posttmp)===false){
            return false;
        }
        this._posts[i]=posttmp;
        return true
    }
    remove(id){
        let i= this._posts.findIndex(item => item.id === id);
        let arrtmp=[];
        if(i===-1){
            return false;
        }
        let k=0;
        while(k<i){
            arrtmp.push(this._posts[k]);
            k++;
        }
        k++
        while(k<this._posts.length){
            arrtmp.push(this._posts[k]);
            k++;
        }
        this._posts=arrtmp;
        return true;
    }
    getPage(skip=0,top=10,filterConfig){
        if(skip+top>this._posts.length){
            return undefined;
        }
        function compareDates(a,b){
            return b.createAt-a.createAt;
        }
        function searchDate(item){
            if(item.createAt.getFullYear()===filterConfig.createAt.getFullYear()){
                if(item.createAt.getMonth()===filterConfig.createAt.getMonth()){
                    if(item.createAt.getDate()===filterConfig.createAt.getDate()){
                        return true;
                    }
                }
            }
            return false;

        }
        function searchHashTags(item){
            for(let i=0; i<filterConfig.hashTags.length; i++){
                if(item.hashTags!=undefined){
                    if(!item.hashTags.includes(filterConfig.hashTags[i])){
                        return false;
                    }
                }
                else{
                    return false;
                }
            }
            return true;
        }
        if(filterConfig!==undefined){
            var filterarr = this._posts;
            for(let key in filterConfig){
                if(key==="createAt"){
                    filterarr=filterarr.filter(searchDate);
                }
                if(key==="author"){
                    filterarr=filterarr.filter(item => item[key] === filterConfig[key]);
                }
                if(key==="hashTags"){
                    filterarr=filterarr.filter(searchHashTags);
                }
            }
            filterarr.sort(compareDates);
            filterarr.slice(skip,skip+top);
            return filterarr;
        }
        else{
            this._posts.sort(compareDates);
            return this._posts.slice(skip,skip+top);
        }
    }
}
/*let posts = new PostCollection(arr);
console.log("source array:");
console.log(arr);
console.log(posts._posts);
console.log("method \"get\" work:");
console.log("correct id:");
console.log(posts.get("1"));
console.log("incorrect id:");
console.log(posts.get("222"));
console.log("method \"validatePost\" work:");
let a={
    id: "1"
}
console.log("incorrectPost:");
console.log(a);
console.log(PostCollection._validatePost(a));
console.log("correctPost:");
console.log(arr[0]);
console.log(PostCollection._validatePost(arr[0]));
console.log("method \"edit\" work:");
let b={
    photoLink: 'https://delo.ua/files/news/images/3646/4/picture2_koronavirus-poluc_364604_p0.jpg'
}
console.log("change photoLink:");
console.log(posts.get("1"));
console.log(posts.edit("1",b));
console.log(posts.get("1"));
console.log("incorrect id:");
console.log(posts.edit("222",b));
console.log("method \"remove\" work:");
console.log(posts.get());
console.log("correct id:");
console.log(posts.remove("2"));
console.log(posts.getPosts());
console.log("incorrect id:");
console.log(posts.remove("222"));
console.log(posts.getPosts());
console.log("function \"add\" work:");
console.log("I don't check id for uniqueness, because user can't manipulate with id, but if i need it i can easy add this check ");
let c={
    id: '21',
    description: 'text text text text text text text text text text text text text text text text text text text text21',
    author: 'Ivanov Ivan20',
    photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg'
}
let massadd=[{
    id: '22',
    description: 'text text text text text text text text text text text text text text text text text text text text21',
    author: 'Ivanov Ivan20',
    photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg'
},
    {
        description: 'text text text text text text text text text text text text text text text text text text text text21',
        author: 'Ivanov Ivan20',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg'
    }]
console.log("incorrect post:");
console.log(posts.add(c));
console.log(posts.getPosts());
c.createAt=new Date();
c.createAt.setDate(10);
console.log("correct post:");
console.log(posts.add(c));
console.log(posts.getPosts());
console.log("function \"getPage\" work:");
console.log("getPage()");
console.log(posts.getPage());
console.log("getPage(0,10)");
console.log(posts.getPage(0,10));
console.log("getPage(1,10)");
console.log(posts.getPage(1,10));
console.log("getPage(10,20)");
console.log(posts.getPage(10,20));
console.log("filter config 1:");
let d={
    author:'Ivanov Ivan20',
}
console.log(d);
console.log(posts.getPage(0,20,d));
console.log("filter config 2:");
let e={
}
e.createAt=new Date();
console.log(e);
console.log(posts.getPage(0,20,e));
console.log("filter cofig 3:");
let f={
    hashTags: ["#hash1","#hash3","#hash15"]
}
console.log(f);
console.log(posts.getPage(0,20,f));
console.log("filter cofig 4:");
d.createAt=new Date();
console.log(d);
console.log(posts.getPage(0,20,d));
console.log("method addAll work:");
console.log(massadd);
console.log(posts.addAll(massadd));
console.log(posts.getPosts());
massadd[0].createAt=new Date();
console.log(massadd);
console.log(posts.addAll(massadd));
console.log(posts.getPosts());*/