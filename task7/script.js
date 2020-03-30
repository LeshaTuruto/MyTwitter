let arr = [];
for (let i = 1; i <= 20; i++){
	let arrHash=[];
	let arrlikes=[];
	let tag="#hash1";
	let like="chel1";
	for(k=1;k<=i;k++){
		arrHash.push(tag.slice(0,tag.length-1)+k);
		arrlikes.push(like.slice(0,like.length-1)+k);
	}
	let post = {
	id: '0',
	description: 'text text text text text text text text text text text text text text text text text text text text0',
	author: 'Ivanov Ivan0',
	photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
	hashTags: arrHash,
	Likes:arrlikes
};
let date=new Date();
post.createAt=date;
post.createAt.setSeconds(i);
post.id=i.toString();
post.description=post.description.slice(0,post.description.length-1)+i;
post.author=post.author.slice(0,post.author.length-1)+i;
arr.push(post);
}
