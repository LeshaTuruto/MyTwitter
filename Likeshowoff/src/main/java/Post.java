
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Post {
    String author;
    String photolink;
    List<String> hashTags;
    Date date;
    String id;
    String description;
    List<String>likers;

    public Post(String author1, String photolink1,List<String> hashTags1,Date date1,String id1, String description1) {
        this.author=author1;
        this.date=date1;
        this.description=description1;
        this.hashTags=new ArrayList<>(hashTags1);
        this.id=id1;
        this.likers=new ArrayList<>();
        this.photolink=photolink1;
    }
    public Post(String author1,String id1, String description1) {
        this.author=author1;
        this.date=new Date();
        this.description=description1;
        this.id=id1;
        this.likers=new ArrayList<>();
    }
    public Post(String author1,String id1, String description1,List<String> hashTags1,List<String>likers1){
        this.author=author1;
        this.date=new Date();
        this.description=description1;
        this.id=id1;
        this.likers=new ArrayList<>();
        this.hashTags=new ArrayList<>(hashTags1);
    }
    public Post(String author1, String photolink1,String id1, String description1) {
        this.author=author1;
        this.date=new Date();
        this.description=description1;
        this.id=id1;
        this.likers=new ArrayList<>();
        this.photolink=photolink1;
    }
    public boolean validate(){
        if(this.description!=null){
            return true;
        }
        return false;
    }
}
