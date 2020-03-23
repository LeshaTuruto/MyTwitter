(function() {
	function getPost(id){
	return arr.find(item => item.id===id);
	}
	function validatePost(post){
		if(post.id!==undefined&&post.author!==undefined&&post.createAt!==undefined&&post.description!==undefined&&post.description.length<200){
			return true;
		}
		else{
			return false;
		}
	}
	function addPost(post){
		if(validatePost(post)===true){
			arr.push(post);
			return true;
		}
		else{
			return false;
		}
	}
	function editPost(id,post){
		var i= arr.findIndex(item => item.id === id)
		if(i===-1){
			return false;
		}
		if(validatePost(arr[i]===false)){
			return false;
		}
		for(let key in post){
			arr[i][key]=post[key];
		}
		return true
	}
	function removePost(id){
		var i= arr.findIndex(item => item.id === id);
		var arrtmp=[];
		if(i===-1){
			return false;
		}
		var k=0;
		while(k<i){
			arrtmp.push(arr[k]);
			k++;
		}
		k++
		while(k<arr.length){
			arrtmp.push(arr[k]);
			k++;
		}
		arr=arrtmp;
		return true;
	}
	function getPosts(skip=0,top=10,filterConfig){
		if(skip+top>arr.length){
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
		    var filterarr = arr;
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
		    arr.sort(compareDates);
			return arr.slice(skip,skip+top);
		}
	}
	console.log("source array:");
	console.log(arr);
	console.log("function \"getPost\" work:");
	console.log("correct id:");
	console.log(getPost("1"));
	console.log("incorrect id:");
	console.log(getPost("222"));
	console.log("function \"validatePost\" work:");
	var a={
		id: "1"
	}
	console.log("incorrectPost:");
	console.log(a);
	console.log(validatePost(a));
	console.log("correctPost:");
	console.log(arr[0]);
	console.log(validatePost(arr[0]));
	console.log("function \"editPost\" work:");
	var b={
		photoLink: 'https://delo.ua/files/news/images/3646/4/picture2_koronavirus-poluc_364604_p0.jpg'		
	}
	console.log("change photoLink:");
	console.log(arr[0]);
	console.log(editPost("1",b));
	console.log(arr[0]);
	console.log("incorrect id:");
	console.log(editPost("222",b));
	console.log("function \"removePost\" work:");
	console.log(arr);
	console.log("correct id:");
	console.log(removePost("2"));
	console.log(arr);
	console.log("incorrect id:");
	console.log(removePost("222"));
	console.log(arr);
	console.log("function \"addPost\" work:");
	console.log("I don't check id for uniqueness, because user can't manipulate with id, but if i need it i can easy add this check ");
	var c={
		id: '21',
	    description: 'text text text text text text text text text text text text text text text text text text text text21',
	    author: 'Ivanov Ivan20',
	    photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg'
	}
	console.log("incorrect post:");
	console.log(addPost(c));
	console.log(arr);
	c.createAt=new Date();
	c.createAt.setDate(10);
	console.log("correct post:");
	console.log(addPost(c));
	console.log(arr);
	console.log("function \"getPosts\" work:");
	console.log("getPosts()");
	console.log(getPosts());
	console.log("getPosts(0,10)");
	console.log(getPosts(0,10));
	console.log("getPosts(1,10)");
	console.log(getPosts(1,10));
	console.log("getPosts(10,20)");
	console.log(getPosts(10,20));
	console.log("filter config 1:");
	var d={
		author:'Ivanov Ivan20',
	}
	console.log(d);
	console.log(getPosts(0,20,d));
	console.log("filter config 2:");
	var e={
	}
	e.createAt=new Date();
	console.log(e);
	console.log(getPosts(0,20,e));
	console.log("filter cofig 3:");
	var f={
		hashTags: ["#hash1","#hash3","#hash15"]
	}
	console.log(f);
	console.log(getPosts(0,20,f));
    console.log("filter cofig 4:");
	d.createAt=new Date();
	console.log(d);
	console.log(getPosts(0,20,d));
}());