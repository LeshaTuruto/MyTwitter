import java.util.List;

public class PostCollection {
    List<Post> posts;
    public Post get(String id){
        return posts.get(Integer.parseInt(id));
    }
    public List<Post> getPage(int skip, int top, String param){

    }
    public boolean edit(String id, Post newPost){
        if(newPost.validate()){
            posts.set()
        }
        return false;
    }
    public boolean delete(String id){

    }
}
