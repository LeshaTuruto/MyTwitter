select datediff(curdate(), (min(created_at))) from myschema.post;