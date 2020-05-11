select name from myschema.user inner join myschema.post
on myschema.post.user_id = myschema.user.user_id
where date(created_at) = curdate() group by user.user_id
having count(post_id) > 3;