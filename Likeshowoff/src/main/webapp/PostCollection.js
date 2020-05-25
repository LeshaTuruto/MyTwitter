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